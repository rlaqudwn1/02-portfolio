# CLAUDE.md — 백엔드 포트폴리오 원페이지 (운영 문서)

> 이 문서는 본 프로젝트의 **단일 운영 기준**이다. 작업 시작 전 이 문서와 `prd.md`를 먼저 읽는다.

## 1. 프로젝트 개요

- 채용담당자 대상 1인 **백엔드·AI 포트폴리오 원페이지** (순수 HTML/CSS/JS, 반응형).
- 설계 단일 출처: **`prd.md` (v0.4)**. 사용자 흐름은 PRD §7.
- 콘텐츠는 **김병주 실데이터**로 교체 완료(Phase 2). 미확보 자산은 §8 참조.

## 2. 핵심 파일

| 파일 | 역할 |
| --- | --- |
| `prd.md` | 제품 요구사항 + User Flow (단일 진실 공급원) |
| `index.html` | 시맨틱 마크업: Nav / Hero / About / Skills / Portfolio / Contact / Footer |
| `styles.css` | 미니멀 라이트 테마, CSS 변수·8pt, 모바일 퍼스트, reduced-motion 대응 |
| `main.js` | 인뷰 애니메이션·활성 메뉴, 시스템 모티프 배경 + 커서 잔상(2D Canvas) |
| `CLAUDE.md` | (본 문서) 운영 계획·명령어·상태 |

## 3. 대상 인물 / 데이터 출처

- 인물: **김병주 (Kim Byeongju)** — 신입 **백엔드·AI** 개발자.
- 실데이터 출처: GitHub **`rlaqudwn1/backend-portfolio`** (private, Next.js). 정형=`data.json`, 서술=`public/markdown/`.
- 확정 사실: 이메일 `rlaqudwn123456@gmail.com`, GitHub `rlaqudwn1`. 프로젝트 4건(PublicPlus·Movie Recommendation·Book Rating Prediction·TailorPlay, 전부 팀), 수상 **Book Rating RMSE 3위**, 학력 3건(단국대 CS 재학·프로그래머스 데브코스·부스트캠프 AI Tech 8).
- **미보유**: 이력서 PDF, LinkedIn, 프로필 사진, 정량 지표(RMSE 외), 아키텍처 다이어그램 실물.
- 사이트 콘텐츠는 위 실데이터로 교체 완료(Phase 2).

---

## 4. 운영 목표 (2단계)

### ✅ Phase 1 — 소스 분석 & 정보 확인 (현재 단계)

목표: `backend-portfolio`를 분석해 **김병주의 실제 정보**를 확정하고, **현재 PRD 형태의 정적 사이트를 Vercel로 배포 가능한지** 판정한다.

1. **클론** — `backend-portfolio`를 작업 위치에 클론 (§6 명령어).
2. **서브에이전트 분석** — 클론본을 읽어 다음을 구조화 추출:
   - 자기소개/이력 단서, 보유 기술 스택(+사용 맥락), 프로젝트(문제·역할·아키텍처·결과·링크), 연락처(이메일·GitHub·LinkedIn), 이력서 PDF 유무.
3. **정보 확인** — 추출 결과를 PRD 콘텐츠 요구(§6, §13 체크리스트)와 대조해 **확보/공백** 목록 작성.
4. **Vercel 적합성 판정** — §7 체크리스트로 배포 가능 여부·조건 결론.

산출물: 김병주 정보 요약표 + 공백 목록 + Vercel 판정.

### ⬜ Phase 2 — PRD 형태로 전환 + 배포 (2차 목표)

목표: 분석한 `backend-portfolio` 콘텐츠를 **현재 PRD 원페이지 형태**로 옮기고 배포한다.

1. 추출 데이터 → 사이트 섹션 매핑(Hero/About/Skills/Portfolio/Contact).
2. mock "김병주" 콘텐츠를 **실제 데이터로 교체** (index.html, 필요 시 데이터 분리).
3. 누락 자산 처리: `resume.pdf` 추가 또는 해당 CTA 제거, LinkedIn 유무 반영.
4. Vercel 배포 (§6 명령어) → URL 확인, Lighthouse·모바일 QA(§PRD 4 지표).
5. PRD를 v0.4로 갱신(전환 결과 반영).

---

## 5. 디렉터리 / 클론 위치 규칙

- 본 사이트 코드는 이 폴더(`02-portfolio`)에만 둔다.
- 분석용 `backend-portfolio` 클론본은 **이 폴더 안에 두지 않는다**(git 중첩 방지). 세션 스크래치패드 또는 별도 작업 폴더에 클론한다.
- 현재 세션 클론 경로: `…/scratchpad/backend-portfolio` (휘발성 — 새 세션에선 재클론).

## 6. 명령어 (운영)

```bash
# 로컬 미리보기
python3 -m http.server 8000        # → http://localhost:8000

# 소스 저장소 클론 (분석용, 스크래치패드)
gh repo clone rlaqudwn1/backend-portfolio "<scratchpad>/backend-portfolio"

# Vercel 배포 (정적 사이트, 빌드 없음)
#  - Framework Preset: Other
#  - Build Command: (없음)
#  - Output Directory: .  (Root Directory를 01-homepage/02-portfolio 로 지정)
vercel            # 프리뷰 배포
vercel --prod     # 프로덕션 배포
```

## 7. Vercel 적합성 체크리스트

| 항목 | 상태/조건 |
| --- | --- |
| 빌드 필요 여부 | 없음 — 순수 정적(HTML/CSS/JS) → Vercel **정적 호스팅으로 즉시 가능** |
| 서버/백엔드 의존 | 없음(mailto만 사용) → OK |
| 외부 런타임/시크릿 | 없음 → OK |
| Root Directory | 모노 구조라 **`01-homepage/02-portfolio`로 지정 필요** |
| 누락 자산 | `resume.pdf` 부재 시 404 → 추가 또는 링크 제거 필요 |
| private 소스 repo | 데이터 출처일 뿐, 정적 산출물은 자체 완결 → 배포에 무관 |

> 결론 가이드: 위에서 **Root Directory 지정 + resume.pdf 처리**만 충족하면 현재 PRD 형태 그대로 Vercel 배포 가능.

## 8. 작업 상태 (Status)

- [x] PRD v0.4 확정 (실데이터 반영, 백엔드·AI 리포지셔닝)
- [x] **Phase 1** 완료: backend-portfolio 분석 + 김병주 정보 확정 + Vercel 판정(가능)
- [x] **Phase 2** 콘텐츠 전환: index/styles 실데이터 교체, `vercel.json` 추가
- [ ] **Phase 2** 배포: 사용자가 Vercel 로그인 후 실행 (Root Directory 지정)
- [ ] Owner 입력 대기: 이력서 PDF·LinkedIn·프로필 사진·정량 지표·아키텍처 다이어그램

## 9. 규칙 (Conventions)

- `prd.md`가 요구사항의 단일 진실 공급원. 구조 변경 시 PRD 먼저 갱신 후 코드 반영.
- 콘텐츠 수정은 `index.html`에서. 전화번호는 페이지에 노출 금지(이력서 PDF만).
- 모션은 `prefers-reduced-motion`·터치 기기에서 비활성 원칙 유지.
- 커밋/푸시·배포는 사용자가 요청할 때만 수행.
