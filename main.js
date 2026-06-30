/* ============================================================
   포트폴리오 인터랙션
   - 모바일 네비 토글
   - 스크롤 인뷰 애니메이션 + 활성 섹션 하이라이트
   - 시스템 모티프 배경(노드 네트워크) + 커서 추적 잔상
   순수 JS · 외부 의존성 없음
   ============================================================ */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------------- 모바일 네비 토글 ---------------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      const open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- 활성 섹션 하이라이트 ---------------- */
  const sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  const navLinkFor = function (id) {
    return document.querySelector('.nav-links a[href="#' + id + '"]');
  };
  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            document.querySelectorAll(".nav-links a").forEach(function (a) {
              a.classList.remove("active");
            });
            const link = navLinkFor(e.target.id);
            if (link) link.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) { navObserver.observe(s); });

    /* ---------------- 인뷰 등장 애니메이션 ---------------- */
    const revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(function (el) { revealObserver.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("visible"); });
  }

  /* ============================================================
     시스템 모티프 배경 + 커서 잔상 (2D Canvas)
     ============================================================ */
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const ACCENT = "37, 99, 235";
  const animate = !prefersReduced;   // 모션 비선호 시 정지(1프레임)
  const enableTrail = animate && canHover; // 잔상은 데스크톱 + 모션 허용 시

  let w = 0, h = 0, dpr = 1;
  let nodes = [];
  let trail = [];
  let rafId = null;
  let running = false;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initNodes();
    if (!animate) drawScene(); // 정적 1회 렌더
  }

  function initNodes() {
    // 화면 면적에 비례하되 상한을 둬 성능 보호
    const count = Math.max(18, Math.min(70, Math.round((w * h) / 20000)));
    const speed = 0.22;
    nodes = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
      });
    }
  }

  function drawScene() {
    ctx.clearRect(0, 0, w, h);
    const LINK = 130;

    // 노드 위치 갱신 (정적 모드에선 호출 안 함)
    // 연결선
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK) {
          ctx.strokeStyle = "rgba(" + ACCENT + "," + ((1 - d / LINK) * 0.10).toFixed(3) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    // 노드 점
    ctx.fillStyle = "rgba(" + ACCENT + ", 0.30)";
    for (let k = 0; k < nodes.length; k++) {
      ctx.beginPath();
      ctx.arc(nodes[k].x, nodes[k].y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function step() {
    // 노드 이동
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }
    drawScene();

    // 커서 잔상
    if (enableTrail) {
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.life -= 1;
        p.x += p.vx;
        p.y += p.vy;
        if (p.life <= 0) { trail.splice(i, 1); continue; }
        const alpha = (p.life / p.max) * 0.5;
        ctx.fillStyle = "rgba(" + ACCENT + "," + alpha.toFixed(3) + ")";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    rafId = window.requestAnimationFrame(step);
  }

  function start() {
    if (running || !animate) return;
    running = true;
    rafId = window.requestAnimationFrame(step);
  }
  function stop() {
    running = false;
    if (rafId) window.cancelAnimationFrame(rafId);
    rafId = null;
  }

  if (enableTrail) {
    window.addEventListener("mousemove", function (e) {
      for (let k = 0; k < 2; k++) {
        trail.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          r: Math.random() * 2 + 1,
          life: 38,
          max: 38,
        });
      }
      // 입자 수 상한
      if (trail.length > 180) trail.splice(0, trail.length - 180);
    }, { passive: true });
  }

  // 탭이 보이지 않으면 렌더 정지(성능/배터리)
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop();
    else start();
  });

  let resizeTimer = null;
  window.addEventListener("resize", function () {
    if (resizeTimer) window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resize, 150);
  });

  resize();
  start();
})();
