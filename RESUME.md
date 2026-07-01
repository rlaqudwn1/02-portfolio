# RESUME — 김병주 포트폴리오 개편 핸드오프

> 다른 컴퓨터/새 세션에서 이어가기 위한 **한 장짜리 인수인계**. 세션 시작 시 이 파일 → `대본.md` → `design-brief.md` 순으로 읽으면 맥락이 복원된다. (프로젝트 루트 `CLAUDE.md`는 **이전 디자인(Mermaid 기반 v0.4.1)** 기준이라 지금 개편과 안 맞음 — 이 파일이 우선.)

## ⭐ 대본 확정 워크플로우 (집에서 할 일)
**`대본.md` ↔ `index.html`(기존 실서술)을 나란히 놓고 대본을 확정한다.**
- **`copy-refine` 브랜치에서 작업** — 여기에 `대본.md` + **실제 콘텐츠 index.html**(280줄, Phase 2에서 backend-portfolio로부터 옮겨온 진짜 서술)이 **같이 있다.**
  ```bash
  git fetch && git checkout copy-refine
  # 대본.md 와 index.html 을 나란히 열고 대조하며 대본 확정
  ```
- **왜 대조하나**: 기존 `index.html`에는 프로젝트별 **문제·나의 역할·트러블슈팅·결과**, **실제 GitHub 링크**, **스킬 인벤토리(맥락 포함)**, **부트캠프 한 줄 설명**이 이미 다 적혀 있다. 대본은 이 실서술을 근거로 다듬으면 된다.
- **⚠️ 아직 대본에 반영 안 함(사용자 지시)**: 기존 실서술을 `대본.md`로 아직 병합하지 않았다. 집에서 두 파일을 보며 손으로 확정할 것.
- 대본 확정 후 → 그 문구를 `design-overhaul`의 노드그래프 `index.html`에 반영(통합 패스, 아래).

## 두 개의 index.html (혼동 주의)
| 브랜치 | index.html | 콘텐츠 | 용도 |
| --- | --- | --- | --- |
| `copy-refine` (=main 기반) | 옛 다단 스크롤 디자인 (280줄) | **실제 서술 완비** (진짜 링크·역할·트러블슈팅) | **대본 확정 대조용** |
| `design-overhaul` | 노드그래프 캔버스 (173줄) | v2 **플레이스홀더** | 최종 사이트 뼈대 (여기에 대본 반영) |

## 지금 어디까지 왔나
- **디자인 뼈대**: 완료. 노드 그래프 캔버스(Claude Design v2 매칭) 순수 HTML/CSS/JS 이식 → `design-overhaul`의 `index.html`/`styles.css`/`main.js`. 자동 레이아웃(카드=`data-col`·`data-row`). 확장법 `EXTENDING.md`.
- **대본**: `대본.md`. 구조·배선 확정, 문구는 index.html 대조로 확정 예정.
- **⚠️ 통합 아직 안 함**: `design-overhaul`의 index는 옛 v2 플레이스홀더 + 옛 토폴로지(단일 JOURNEY→4프로젝트, Book Rating 포함). **아래 "확정 구조"로 재구성이 다음 작업.**

## 인물 / 연락처
- **김병주** — 신입 **백엔드·AI** 개발자, 취업 준비 중(open to work).
- 이메일 `rlaqudwn123456@gmail.com` · GitHub `rlaqudwn1`.
- 단국대학교 컴퓨터공학과 — **학교·전공만 표기, "재학중" 상태는 비노출**.

## 확정 구조 (교통정리 결과) — index.html 재구성 목표
```
trg_intro(소개)
   └─▶ 데브코스 ──────▶ PublicPlus            [PROJECT]
        └─▶ 부스트캠프 ─┬▶ Movie Recommendation [COMPETITION]
        │              └▶ TailorPlay          [PROJECT]
        └─▶ GDG 해커톤 ─▶ 다인가구             [PROJECT]
                                    (4건 전부 ─▶ out_contact)
```
- **여정 = 3노드 체인**: `jny_devcourse → jny_boostcamp → jny_hackathon`, 각 단계가 자기 산출물로 뻗음.
- **산출물 4건**(Book Rating **제외**): PublicPlus / Movie(**COMPETITION 타입** — 새 `i-competition` 아이콘 필요) / TailorPlay / 다인가구.
- LINKS(안): `trg→devcourse`, `devcourse→boostcamp`, `boostcamp→hackathon`(체인), `devcourse→publicplus`, `boostcamp→(movie,tailorplay)`, `hackathon→dain`, 4건 각각 `→out_contact`.
- 여정 매핑은 **실제 repo org로 검증됨**: PublicPlus=`prgrms-web-devcourse-final-project`(데브코스 최종), TailorPlay·Movie=`boostcampaitech8`(부스트캠프).

## 실제 GitHub 링크 (index.html에서 추출 — 대본에 쓸 것)
- PublicPlus → `github.com/prgrms-web-devcourse-final-project/WEB1_2_PublicPlus_BE` (데브코스 최종 프로젝트)
- TailorPlay → `github.com/boostcampaitech8/pro-recsys-finalproject-recsys-05` (부스트캠프 최종 프로젝트)
- Movie → `github.com/boostcampaitech8/pro-recsys-movierecommendation-recsys-05`
- 다인가구 → `github.com/jungwuk-ryu/multi-person-household` (GDG 해커톤, 원본·커밋 3건 검증)
- (제외) Book Rating → `github.com/boostcampaitech8/pro-recsys-bookratingprediction-recsys-05`

## 프로젝트별 내 기여 (확정 3 / 대기 1)
- **PublicPlus** — 백엔드 팀장. 서버 API 설계 · CI/CD 구축 · 프론트엔드 협업 조율. (기존 index엔 "백엔드 API 구현 — 조회·인증·외부연동", 사용자 최신 정보가 팀장으로 상향)
- **TailorPlay** — 백엔드. 자연어 요청 → Agent API → 추천 목록 end-to-end 파이프라인 + CI/CD 배포. (기존 index "응답 경계 정리·컨테이너/CI"와 일치)
- **다인가구** — 백엔드 전반(서버·API 등).
- **Movie Recommendation** — ⏳ *진짜 공백*. 기존 index에도 개인 역할 미기재(brief만). 사용자가 한 줄 정리 예정.

## 부트캠프 한 줄 설명 (기존 index Education — JOURNEY 문구로 활용)
- 프로그래머스 "클라우드 기반 백엔드 엔지니어링 데브코스": Spring Boot API·인증/인가·데이터 접근·외부 연동·실시간 기능.
- 부스트캠프 AI Tech 8기(네이버 커넥트재단): 추천 시스템 실험·LLM 기반 서비스·모델 평가와 실험 관리 흐름.

## 스킬 인벤토리 (기존 index — 칩 세트 선정 근거)
- **Backend**: Spring Boot · JPA/QueryDSL · Security/JWT/OAuth2 · Redis · WebSocket/STOMP
- **AI·RecSys**: PyTorch/SBERT · CNN/ResNet · DeepFM/XGBoost/LightGBM · LightGCN/S3Rec/EASE/MultiVAE · FastAPI/LLM Agent · WandB/Stratified K-Fold
- **Infra·DevOps**: Docker Compose · GitHub Actions · 외부연동(Naver Search·Google Calendar·Firebase)

## 대기 중인 사용자 입력 (2개)
1. **Movie(대회) 내 기여 한 줄** — 기존 index에도 없는 유일한 진짜 공백.
2. **노출할 스킬 칩 세트** — 위 인벤토리에서 대표 몇 개 선정.

## 톤·제약 (반드시 준수)
- 겸손하되 근거 있는 자신감. 팀 프로젝트는 **"내 기여" 중심**. open to work.
- **RMSE 3위 등 수상·순위 전면 배치 금지** (기존 index엔 hero/badge/결과 3곳에 있음 → 개편 시 담담히/제외).
- **사실을 지어내지 않는다** — 미확보는 비워두고 확인.
- **디자인을 Claude 기본/제네릭 AI 미감으로 오염시키지 않는다** (사용자 의도 우선).

## 다음 작업 = 통합 패스 (대본 확정 후)
`대본.md`의 "확정 구조"대로 `design-overhaul`의 `index.html` 재구성:
1. JOURNEY 1개 → 3노드 체인 분리(`jny_devcourse`/`jny_boostcamp`/`jny_hackathon`).
2. `prj_bookrating` 제거, Movie를 COMPETITION 타입으로(스프라이트에 `i-competition` symbol 추가).
3. 4카드에 실제 요약·기여 문구 + 실제 repo 링크 반영.
4. TRIGGER 코드블록에 `education`(단국대 컴공, 재학 표기 X) + statement 반영.
5. `main.js`의 `LINKS`를 위 배선으로 교체. 배치·연결선은 자동(EXTENDING.md).

## 브랜치 / 명령어
- `copy-refine` — **대본 + 실콘텐츠 index (대본 확정은 여기서)**
- `design-overhaul` — 노드그래프 디자인 + 대본 사본 + 문서 (통합·배포는 여기서)
- `main` — 원본(미개편)
- 미리보기: `python3 -m http.server 8010` → http://localhost:8010
- 배포(사용자 로그인 필요): `vercel` / `vercel --prod` — Framework=Other, Build 없음, Output/Root=`.`
