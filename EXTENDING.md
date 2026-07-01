# 카드 추가 / 확장 가이드 (design-overhaul)

노드 그래프 캔버스는 **자동 레이아웃**이라, 카드를 늘려도 좌표·겹침·연결선을 직접 계산할 필요가 없다.

## 원리
- **배치**: `main.js`의 `layout()`이 각 카드의 `data-col`(열)·`data-row`(순서)를 읽어, 열마다 세로로 쌓고(열은 세로 중앙 정렬) **캔버스 크기를 자동 계산**한다. 좌표 하드코딩 없음.
- **연결선**: `draw()`가 카드 위치를 **실측**해 베지어로 그린다. 한 변에 선이 여러 개면 모서리를 따라 **자동 분산**(뭉치지 않음).
- **열 규칙**: 0 = 소개(TRIGGER) · 1 = 여정(JOURNEY) · 2 = 프로젝트(PROJECT) · 3 = 연락처(OUTPUT). 같은 열에 여러 개면 `data-row`로 순서.

## 카드 하나 추가하기 (3단계)
1. **HTML**: `index.html`에서 `.node` 섹션을 복사해 붙이고 —
   - `id`(고유), `data-col`(열), `data-row`(열 내 순서), `style="--w:너비px"` 지정.
2. **연결**: `main.js`의 `LINKS`에 한 줄 —
   - `["출발id", "right", "도착id", "left"]` (side는 left/right/top/bottom).
3. 끝. 위치·캔버스 크기·연결선은 자동으로 맞춰진다.

## 예시 — 부트캠프 2개 + 해커톤
- **두 번째 부트캠프(JOURNEY)**: 여정 열에 카드 추가 → `data-col="1" data-row="1"`.
  - LINKS: 체인이면 `["jny_1","right","jny_2","left"]` 후 `jny_2 → 프로젝트들`. 병렬이면 트리거에서 두 여정으로 각각.
- **해커톤**: 프로젝트 열에 카드 추가(`data-col="2"`)하거나, 새 타입 `EVENT`로.
  - LINKS: `["jny_...","right","prj_hackathon","left"]`, `["prj_hackathon","right","out_contact","left"]`.
- 프로젝트가 5·6개가 돼도 프로젝트 열(`data-col="2"`)에 `data-row`만 이어 붙이면 됨.

## 새 열이 필요하면
`data-col` 숫자를 늘리면 자동으로 오른쪽에 새 열이 생긴다(캔버스도 넓어짐).

## 새 노드 타입 아이콘
`index.html` 상단 `<svg class="sprite">`에 `<symbol id="i-이름">` 추가 → 카드에서 `<use href="#i-이름"/>`.

## 간격 조절 (main.js 상단 노브)
`LEFT_PAD`·`RIGHT_PAD`·`V_PAD`(캔버스 여백) · `COL_GAP`(열 간격) · `ROW_GAP`(카드 세로 간격).

## 콘텐츠 주의
- 문구는 `copy-refine` 워크트리에서 대본에 맞춰 다듬어 교체 예정.
- **RMSE 3위 등 수상·순위는 전면에 내세우지 않음** (겸손 톤 유지).
