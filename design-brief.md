# 디자인 방향 — 김병주 백엔드·AI 포트폴리오 (design-overhaul)

## 확정: Claude Design v2 매칭 이식본
사용자 Claude Design 프로젝트 **"Kim Byeongju Portfolio v2.dc.html"**에 정확히 맞춤.
`.dc.html`(Claude Design 전용 런타임)을 **순수 HTML/CSS/JS로 이식** → index.html / styles.css / main.js.

## 스펙
- 컨셉: 노드 그래프 / 자동화 캔버스 (레퍼런스 ozan.at/mar).
- 흐름: 소개(TRIGGER) → 부트캠프 여정(JOURNEY, 세로 타임라인) → 프로젝트(PROJECT ×4) → 연락처(OUTPUT). 프로젝트 4개가 모두 연락처로 수렴.
- 색: 페이퍼 #f3f1ea + 점격자, **앰버 액센트 #c07f36**(연결 점·타임라인)·코드 문자열 #b4482d.
- 폰트: Pretendard Variable + JetBrains Mono (CDN).
- 인터랙션: 드래그-투-팬(grab). 연결선 = JS가 카드 위치 측정 → 베지어 + 이중원 앰버 점. ≤860px 세로 스택.
- 프리뷰: v2식 해치 플레이스홀더("preview · …"), 나중에 스크린샷 교체.
- 크롬: 탑바 없이 플로팅 "BJ." + "drag to pan" 힌트.

## 콘텐츠 주의
- **RMSE 3위 제외**: v2 코드엔 3곳(코드블록·타임라인·프로젝트 메타) 남아있으나 사용자 지시로 이식본에선 뺌. 내용은 대본따라 변경 예정.

## 확장 (카드 추가)
**자동 레이아웃** — 카드는 `data-col`(열)·`data-row`(순서)로 배치되고 연결선·캔버스 크기는 자동. 카드 추가 = HTML 블록 하나 + `LINKS` 한 줄. 부트캠프 2개·해커톤 추가 등 상세는 `EXTENDING.md` 참고.

## 프리뷰
`cd ../02-portfolio-design && python3 -m http.server 8010` → http://localhost:8010
