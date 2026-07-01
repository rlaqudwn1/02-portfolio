/* ============================================================
   노드 그래프 캔버스 — Claude Design v2 매칭 + 자동 레이아웃
   - layout(): 카드를 data-col(열)·data-row(순서)로 자동 배치, 캔버스 크기 자동 계산
   - draw():   베지어 연결선 + 이중원 앰버 점 (카드 위치 실측)
   - 드래그-투-팬 / 이메일 복사
   카드 추가법은 EXTENDING.md 참고. 순수 바닐라 JS.
   ============================================================ */
(function () {
  "use strict";

  var stage = document.getElementById("stage");
  var canvas = document.getElementById("canvas");
  var svg = document.getElementById("wires");
  if (!stage || !canvas || !svg) return;

  var NS = "http://www.w3.org/2000/svg";
  var nodes = Array.prototype.slice.call(canvas.querySelectorAll(".node"));
  var wideMQ = window.matchMedia("(min-width: 861px)");

  /* ---------------- 레이아웃 노브 ---------------- */
  var LEFT_PAD = 60, RIGHT_PAD = 60, V_PAD = 60, COL_GAP = 130, ROW_GAP = 40;

  /* ---------------- 연결 (from-id, side, to-id, side) ---------------- */
  var LINKS = [
    ["trg_intro", "right", "jny_boostcamp", "left"],
    ["jny_boostcamp", "right", "prj_tailorplay", "left"],
    ["jny_boostcamp", "right", "prj_bookrating", "left"],
    ["jny_boostcamp", "right", "prj_publicplus", "left"],
    ["jny_boostcamp", "right", "prj_movie", "left"],
    ["prj_tailorplay", "right", "out_contact", "left"],
    ["prj_bookrating", "right", "out_contact", "left"],
    ["prj_publicplus", "right", "out_contact", "left"],
    ["prj_movie", "right", "out_contact", "left"]
  ];

  function n(v) { return Math.round(v * 10) / 10; }

  /* ============================================================
     자동 레이아웃 — 열(data-col)로 묶고, 열마다 세로로 쌓아 배치.
     각 열은 세로 중앙 정렬. 캔버스 크기는 내용에서 계산.
     ============================================================ */
  function layout() {
    if (!wideMQ.matches) {
      // 좁은 화면: JS 배치 해제 → CSS 세로 스택이 담당
      nodes.forEach(function (el) { el.style.left = ""; el.style.top = ""; });
      canvas.style.width = ""; canvas.style.height = "";
      return;
    }

    var cols = {};
    nodes.forEach(function (el) {
      var c = +(el.getAttribute("data-col") || 0);
      (cols[c] = cols[c] || []).push(el);
    });
    var keys = Object.keys(cols).map(Number).sort(function (a, b) { return a - b; });

    var colW = {}, colH = {};
    keys.forEach(function (c) {
      cols[c].sort(function (a, b) {
        return (+(a.getAttribute("data-row") || 0)) - (+(b.getAttribute("data-row") || 0));
      });
      var w = 0, h = 0;
      cols[c].forEach(function (el, i) {
        w = Math.max(w, el.offsetWidth);
        h += el.offsetHeight + (i > 0 ? ROW_GAP : 0);
      });
      colW[c] = w; colH[c] = h;
    });

    var contentH = 0;
    keys.forEach(function (c) { contentH = Math.max(contentH, colH[c]); });

    var x = LEFT_PAD, colX = {};
    keys.forEach(function (c) { colX[c] = x; x += colW[c] + COL_GAP; });

    canvas.style.width = (x - COL_GAP + RIGHT_PAD) + "px";
    canvas.style.height = (contentH + V_PAD * 2) + "px";

    keys.forEach(function (c) {
      var y = V_PAD + (contentH - colH[c]) / 2;   // 열 세로 중앙 정렬
      cols[c].forEach(function (el) {
        el.style.left = colX[c] + "px";
        el.style.top = Math.round(y) + "px";
        y += el.offsetHeight + ROW_GAP;
      });
    });
  }

  /* ---------------- 연결선 렌더 ---------------- */
  function groups() {
    var g = {};
    function add(id, s) { var k = id + "|" + s; (g[k] = g[k] || { total: 0 }).total++; }
    LINKS.forEach(function (l) { add(l[0], l[1]); add(l[2], l[3]); });
    return g;
  }
  function anchor(el, side, frac) {
    var r = el.getBoundingClientRect(), c = canvas.getBoundingClientRect();
    var x = r.left - c.left, y = r.top - c.top;
    if (side === "left") return [x, y + r.height * frac];
    if (side === "right") return [x + r.width, y + r.height * frac];
    if (side === "top") return [x + r.width * frac, y];
    return [x + r.width * frac, y + r.height];
  }
  function bez(a, b, fs, ts) {
    var sx = a[0], sy = a[1], ex = b[0], ey = b[1];
    var k = Math.max(24, Math.min(90, Math.abs(ex - sx) * 0.45));
    var sd = fs === "right" ? 1 : -1, ed = ts === "left" ? -1 : 1;
    return "M" + n(sx) + " " + n(sy) + " C" + n(sx + sd * k) + " " + n(sy) +
      " " + n(ex + ed * k) + " " + n(ey) + " " + n(ex) + " " + n(ey);
  }
  function dot(pt) {
    var out = [];
    [["wire-dot-o", 5.5], ["wire-dot-i", 3.4]].forEach(function (d) {
      var c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", n(pt[0])); c.setAttribute("cy", n(pt[1]));
      c.setAttribute("r", d[1]); c.setAttribute("class", d[0]);
      out.push(c);
    });
    return out;
  }
  function draw() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    if (!wideMQ.matches) return;
    svg.setAttribute("viewBox", "0 0 " + canvas.scrollWidth + " " + canvas.scrollHeight);

    var g = groups(), seen = {}, dots = [];
    LINKS.forEach(function (l) {
      var from = document.getElementById(l[0]), to = document.getElementById(l[2]);
      if (!from || !to) return;
      var fk = l[0] + "|" + l[1], tk = l[2] + "|" + l[3];
      seen[fk] = (seen[fk] || 0) + 1; seen[tk] = (seen[tk] || 0) + 1;
      var a = anchor(from, l[1], seen[fk] / (g[fk].total + 1));
      var b = anchor(to, l[3], seen[tk] / (g[tk].total + 1));
      var p = document.createElementNS(NS, "path");
      p.setAttribute("d", bez(a, b, l[1], l[3])); p.setAttribute("class", "wire");
      svg.appendChild(p);
      dots.push(a, b);
    });
    dots.forEach(function (pt) { dot(pt).forEach(function (el) { svg.appendChild(el); }); });
  }

  /* ---------------- 렌더 파이프라인 ---------------- */
  var panInit = false;
  function render() {
    layout();
    draw();
    if (!panInit && wideMQ.matches) { stage.scrollLeft = 0; stage.scrollTop = 180; panInit = true; }
  }
  var t = null;
  function schedule() { if (t) clearTimeout(t); t = setTimeout(render, 100); }

  window.addEventListener("resize", schedule);
  window.addEventListener("load", render);
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(render); }
  render();

  /* ---------------- 드래그-투-팬 ---------------- */
  function interactive(el) { return el && el.closest && el.closest("a,button,input,textarea,[data-no-pan]"); }
  var down = false, sx = 0, sy = 0, sl = 0, st = 0;
  stage.addEventListener("pointerdown", function (e) {
    if (!wideMQ.matches || interactive(e.target)) return;
    down = true; sx = e.clientX; sy = e.clientY; sl = stage.scrollLeft; st = stage.scrollTop;
    stage.classList.add("grabbing");
  });
  window.addEventListener("pointermove", function (e) {
    if (!down) return;
    stage.scrollLeft = sl - (e.clientX - sx);
    stage.scrollTop = st - (e.clientY - sy);
  });
  function endPan() { down = false; stage.classList.remove("grabbing"); }
  window.addEventListener("pointerup", endPan);
  window.addEventListener("pointercancel", endPan);

  /* ---------------- 이메일 복사 ---------------- */
  var copyBtn = document.querySelector("[data-copy]");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var val = copyBtn.getAttribute("data-copy");
      var done = function () {
        copyBtn.classList.add("copied");
        copyBtn.textContent = "copied ✓";
        setTimeout(function () { copyBtn.classList.remove("copied"); copyBtn.textContent = "copy"; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(val).then(done, done);
      } else { done(); }
    });
  }
})();
