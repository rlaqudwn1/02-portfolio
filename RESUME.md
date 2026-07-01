# RESUME — 김병주 포트폴리오 개편 핸드오프

> 다른 컴퓨터/새 세션에서 이어가기 위한 **한 장짜리 인수인계**. 세션 시작 시 이 파일 → `대본.md` → `design-brief.md` 순으로 읽으면 맥락이 복원된다. (프로젝트 루트 `CLAUDE.md`는 **이전 디자인(Mermaid 기반 v0.4.1)** 기준이라 지금 개편과 안 맞음 — 이 파일이 우선.)

## 지금 어디까지 왔나
- **디자인 뼈대**: 완료. 노드 그래프 캔버스(Claude Design v2 매칭)를 순수 HTML/CSS/JS로 이식 → `index.html`/`styles.css`/`main.js`. 자동 레이아웃(카드=`data-col`·`data-row`, 연결선·캔버스 자동). 확장법 `EXTENDING.md`.
- **대본(문구 단일 출처)**: `대본.md`. 구조·문구 대부분 확정, 입력 2개 대기.
- **⚠️ 통합 아직 안 함**: 현재 `index.html`은 **옛 v2 플레이스홀더 콘텐츠 + 옛 토폴로지**(단일 JOURNEY→4프로젝트, Book Rating 포함, 링크 전부 github.com/rlaqudwn1)다. **아래 "확정 구조"로 재구성하는 게 다음 작업.**

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
- **여정 = 3노드 체인**(단일 JOURNEY 노드에서 분리): `jny_devcourse → jny_boostcamp → jny_hackathon`, 각 단계가 자기 산출물로 뻗음.
- **산출물 4건**(Book Rating **제외**): PublicPlus / Movie(**COMPETITION 타입** — 새 `i-competition` 아이콘 필요) / TailorPlay / 다인가구.
- LINKS(안): `trg→devcourse`, `devcourse→boostcamp`, `boostcamp→hackathon`(여정 체인), `devcourse→publicplus`, `boostcamp→(movie,tailorplay)`, `hackathon→dain`, 4건 각각 `→out_contact`.
- 다인가구 링크는 **원본** `github.com/jungwuk-ryu/multi-person-household` (김병주 커밋 3건 검증됨, 포크/클론 불필요).

## 프로젝트별 내 기여 (확정 3 / 대기 1)
- **PublicPlus** — 백엔드 팀장. 서버 API 설계 · CI/CD 구축 · 프론트엔드 협업 조율.
- **TailorPlay** — 백엔드. 자연어 요청 → Agent API 연결 → 추천 목록까지 end-to-end 파이프라인 + CI/CD 배포 환경.
- **다인가구** — 백엔드 전반(서버·API 등).
- **Movie Recommendation** — ⏳ *대기*. 연구·실험 협업 성격, 사용자가 한 줄 정리 예정.

## 대기 중인 사용자 입력 (2개)
1. **Movie(대회) 내 기여 한 줄.**
2. **노출할 스킬 칩 세트** — 초안 `Spring Boot` `JPA/QueryDSL` `FastAPI` `PyTorch` `Redis` `Docker` `GitHub Actions`에서 가감.

## 톤·제약 (반드시 준수)
- 겸손하되 근거 있는 자신감. 팀 프로젝트는 **"내 기여" 중심**. open to work.
- **RMSE 3위 등 수상·순위 전면 배치 금지** (있어도 담담히).
- **사실을 지어내지 않는다** — 미확보는 비워두고 사용자에게 확인.
- **디자인을 Claude 기본/제네릭 AI 미감으로 오염시키지 않는다** (사용자 의도 우선).

## 다음 작업 = 통합 패스
`대본.md`의 "확정 구조"대로 `index.html`을 재구성:
1. JOURNEY 1개 → 3노드 체인으로 분리(`jny_devcourse`/`jny_boostcamp`/`jny_hackathon`).
2. `prj_bookrating` 제거, Movie를 COMPETITION 타입으로(스프라이트에 `i-competition` symbol 추가).
3. 4카드에 실제 요약·기여 문구 반영, 다인가구 원본 링크.
4. TRIGGER 코드블록에 `education`(단국대 컴공, 재학 표기 X) + statement 반영.
5. `main.js`의 `LINKS`를 위 배선으로 교체. 배치·연결선은 자동(EXTENDING.md).

## 브랜치 / 명령어
- `design-overhaul` — **디자인 + 대본 (작업 브랜치, 여기서 진행)** · `copy-refine` — 대본 백업 · `main` — 원본(미개편).
- 미리보기: `python3 -m http.server 8010` → http://localhost:8010
- 배포(사용자 로그인 필요): `vercel` / `vercel --prod` — Framework=Other, Build 없음, Output/Root=`.`
