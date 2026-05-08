# AX DefectOps · Eternity EMS / ODM

러기드폰, 산업용 스마트폰, 스마트워치, 특수 목적 웨어러블을 생산하는 EMS / ODM 제조사 **Eternity** 의 품질 컨트롤 타워를 표현한 **데스크톱 전용 · 프론트엔드 전용 인터랙티브 mockup** 입니다.

> 이 mockup 은 결함 데이터가 표준화된 **이후** 생산팀과 품질팀이 실제로 어떻게 일하게 될지를 보여줍니다 — Eternity 의 AX 전략 중 Phase 2 ("System Building") 단계에 해당합니다.

---

## 목적 (Purpose)

Eternity 의 결함 관련 비용 (스크랩, 재작업, 클레임 페널티) 은 결함 데이터, 공정 데이터, 대응 이력이 팀과 시스템에 흩어져 있어 구조적으로 통제되지 않습니다. 이 사이트는 **그 워크플로우를 단일 표준 운영 인터페이스로 묶으면 어떻게 보일지** 를 시각화한 데모입니다.

뷰어에게 전달하려는 메시지는 세 가지입니다.

1. **공정 가시성 (Process visibility)** — Eternity 의 제조 공정은 PCB · Display · Battery · Camera/Sensor · Housing 의 모듈 단위 분기로 시작해, Main Assembly → Firmware → RF Test → Aging → Final QA → Packaging 으로 합류합니다. 대시보드는 모든 노드의 상태를 한눈에 읽을 수 있게 만듭니다.
2. **운영 표준화 (Standardized operation)** — 일관된 공정명, 결함 코드, 심각도, 상태 배지를 통해 결함 보고 · 배치 추적 · 기록 검토 · KPI 모니터링을 한 곳에서 처리합니다.
3. **Phase 2 ≠ AI** — 우하단 플로팅 AI 어시스턴트는 의도적으로 가벼운 placeholder 입니다. 데모의 핵심은 향후 Phase 3 의 AI 가 그 위에 얹힐 **표준화된 운영 데이터** 입니다.

모든 데이터는 더미이며, 런타임 React state 로만 동작합니다. 백엔드, DB, MES/SAP 연동, 실제 AI 호출은 일체 없습니다.

---

## 사이트 설명 (What's in it)

| 페이지                    | 설명                                                                                                                                                                                                                  |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dashboard**             | KPI 스트립 (yield · defect rate · critical batches · response time · risk level), 분기형 제조 공정 맵, 노드 클릭 시 상세 패널, 결함 추세 차트, 라인별 비용 차트, 이상 알림, 최근 결함 기록.                            |
| **Field Input**           | 3-step 결함 보고 폼. 제출 시 새 레코드가 런타임 state 에 추가되며, Dashboard · Defect Records 테이블 · Recent Inputs 패널로 즉시 전파됩니다. 심각도에 따라 공정 맵의 상태가 갱신되고 새로운 알림이 발생합니다.       |
| **Traceability**          | Batch ID 또는 Serial Number 로 검색. 배치 요약, 모듈별 품질 판정, 이벤트 타임라인, 대응 트래킹을 보여줍니다. 기본 검색 결과는 `ET-RP-260507-A03`.                                                                      |
| **Defect Records**        | 모든 결함 기록의 필터링 가능한 테이블 (product · module · process · severity · status · line · 자유 텍스트 검색). 행 클릭 시 현재 대응 사항과 권장 조치가 포함된 상세 모달이 열립니다.                                |
| **Settings**              | 역할 권한 매트릭스, 표준 공정 마스터 리스트, 결함 코드 ↔ 공정 매핑. 보기 전용입니다.                                                                                                                                  |
| **Sidebar**               | 내비게이션, 인앱 **Notifications** 드롭다운 (실시간 알림 피드), **Role Switcher** (Production Staff / Quality Engineer / Production Manager). 역할 변경은 콘텐츠 강조점을 바꾸며 선택은 `localStorage` 에 저장됩니다. |
| **Floating AI Assistant** | 우하단 `?` 버튼. 고정된 인사말, 추천 질문, 단일 고정 응답이 포함된 채팅 패널이 열립니다.                                                                                                                              |

---

## 데모 시나리오 (5 단계)

1. **Dashboard** — 대부분의 공정 노드는 녹색이며, `Housing Fit Check` 가 빨강, `PCB SMT Line` 과 `RF / Connectivity Test` 가 황색입니다.
2. **공정 상세 (Process detail)** — `Housing Fit Check` 클릭 → 우측 패널에 Rugged Phone 배치 `ET-RP-260507-A03`, 추정 비용 영향 $12,400, 권장 조치가 표시됩니다.
3. **Field Input** — 사이드바에서 역할을 _Production Staff_ 로 변경 후 결함 제출 → 새 레코드가 Recent Inputs · Dashboard · Defect Records 테이블에 동시에 반영됩니다.
4. **Traceability** — `ET-RP-260507-A03` 을 검색하여 해당 배치의 전체 모듈 상태와 이벤트 타임라인을 확인합니다.
5. **AX Assistant** — 우하단 `?` 버튼을 눌러 Phase 3 placeholder 의 고정 응답을 확인합니다.

---

## 실행법 (Running it locally)

요구 사항: **Node.js 18 이상** 및 **npm**.

```bash
npm install
npm run dev
```

Vite 가 출력하는 URL (기본 `http://localhost:5173`) 을 브라우저에서 엽니다.

본 앱은 **데스크톱 전용** 이며, 뷰포트 너비 ≥ 1280px 를 가정합니다.

### 그 외 스크립트

```bash
npm run build      # 타입 체크 + 프로덕션 빌드 (./dist)
npm run preview    # 빌드된 결과물을 로컬에서 서빙
npm run lint       # ESLint
```

### 배포 (GitHub Pages)

Vite 설정이 빌드 모드에 따라 `base` 를 자동 전환하므로, 동일한 소스로 로컬 서빙과 Pages 서브패스 서빙을 모두 지원합니다.

```bash
npm run build -- --mode=pages
```

`.github/workflows/` 의 GitHub Actions 워크플로우가 push 시 자동으로 배포합니다.

---

## 기술 스택 (Tech stack)

- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite` 플러그인)
- **Recharts** — 추세 / 비용 차트
- **Lucide React** — 아이콘
- 런타임 상태는 React Context 로 관리 (Redux / Zustand / router 미사용)

---

## 프로젝트 구조 (Project structure)

```
src/
├── App.tsx                     # 스토어 기반 페이지 스위칭
├── main.tsx
├── index.css                   # Tailwind v4 + 테마 토큰 + 애니메이션
│
├── data/                       # 시드 더미 데이터 (JSON, 직접 수정 X)
│   ├── dashboard.json
│   ├── processFlow.json
│   ├── defectRecords.json
│   ├── batches.json
│   ├── alerts.json
│   ├── masterData.json
│   └── roles.json
│
├── store/AppStore.tsx          # role · page · records · process nodes ·
│                               # alerts · selected node 를 관리하는 Context.
│                               # `submitDefect` 가 새 레코드를 records,
│                               # process map, alerts 로 전파합니다.
│
├── components/
│   ├── layout/                 # Sidebar, NotificationBell, RoleSwitcher, AppLayout
│   ├── common/                 # KpiCard, StatusBadge, SeverityBadge, FloatingChatbot
│   ├── dashboard/              # ProcessFlowMap, ProcessNode, ProcessDetailPanel,
│   │                           # DefectTrendChart, CostByLineChart,
│   │                           # AnomalyAlertCard, RecentDefectRecords
│   ├── field-input/            # FieldInputForm, RecentInputs, SubmissionSuccessCard
│   ├── traceability/           # BatchSearch, BatchSummary, ModuleQualityStatus,
│   │                           # BatchTimeline, ResponseTracking
│   └── records/                # FilterBar, DefectRecordTable, DefectDetailModal
│
├── pages/                      # DashboardPage, FieldInputPage, TraceabilityPage,
│                               # DefectRecordsPage, SettingsPage
└── types/index.ts              # 공용 TS 타입
```

---

## 이 mockup 이 _아닌_ 것 (What this mockup is _not_)

- 실제 운영 시스템이 아닙니다.
- 백엔드, DB, 인증, 영속성 모두 없습니다 (역할 선택만 `localStorage` 에 저장).
- MES, SAP, 협력사 시스템 연동 없음.
- 실제 AI 없음 — 어시스턴트는 고정된 응답 하나만 반환합니다.
- 모바일 / 태블릿 레이아웃 없음 — 데스크톱 전용입니다.
