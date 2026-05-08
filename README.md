# AX DefectOps · Eternity EMS / ODM

A desktop-only, frontend-only interactive **mockup** of a quality-control tower for **Eternity**, an EMS / ODM manufacturer of rugged phones, industrial smartphones, smart watches, and special-purpose wearables.

> The mockup demonstrates how production and quality teams could work day-to-day **after** defect data has been standardized — the Phase 2 ("System Building") slice of Eternity's broader AX strategy.

---

## Purpose

Eternity's defect-related costs (scrap, rework, claim penalties) are structurally uncontrolled because defect data, process data, and response history are fragmented across teams and systems. This site shows **what a single, standardized operation interface would look like** for that workflow.

It is built to communicate three things to a viewer:

1. **Process visibility** — Eternity's manufacturing flow has multiple module-level branches (PCB, Display, Battery, Camera/Sensor, Housing) that converge into Main Assembly → Firmware → RF Test → Aging → Final QA → Packaging. The dashboard makes the live status of every node legible at a glance.
2. **Standardized operation** — One place to report defects, trace batches, review records, and monitor KPIs, using consistent process names, defect codes, severities, and status badges.
3. **Phase 2 ≠ AI** — The floating AI assistant is a deliberately lightweight placeholder. The point of the demo is the structured operational data that future Phase 3 AI would sit on top of.

Everything is dummy data and runtime React state. There is no backend, no database, no MES/SAP integration, and no real AI call.

---

## What's in it

| Page                      | What it shows                                                                                                                                                                                                                                               |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dashboard**             | KPI strip (yield, defect rate, critical batches, response time, risk level), branched manufacturing process map, click-through process detail panel, defect trend chart, cost-by-line chart, anomaly alerts, recent defect records.                         |
| **Field Input**           | 3-step quick defect report form. On submit, a new record is appended to runtime state and propagates to the Dashboard, the records table, and the Recent Inputs panel. Severity-driven status updates flow into the process map and a new alert is emitted. |
| **Traceability**          | Search by Batch ID or Serial Number. Returns batch summary, per-module quality verdicts, an event timeline, and response tracking. Default search returns `ET-RP-260507-A03`.                                                                               |
| **Defect Records**        | Filterable table of all defect records (product, module, process, severity, status, line, free-text search). Row click opens a detail modal with current response and recommended action.                                                                   |
| **Settings**              | Role permission matrix, the standardized process master list, and defect-code-to-process mapping. View-only.                                                                                                                                                |
| **Sidebar**               | Navigation, in-app **Notifications** dropdown (live alert feed), and **Role Switcher** (Production Staff / Quality Engineer / Production Manager). Role choice changes content emphasis; selection is persisted to `localStorage`.                          |
| **Floating AI Assistant** | Bottom-right `?` button. Opens a small chat panel with a fixed greeting, suggested questions, and a single fixed response.                                                                                                                                  |

---

## Demo flow (5 steps)

1. **Dashboard** — Most process nodes are green; `Housing Fit Check` is red, `PCB SMT Line` and `RF / Connectivity Test` are amber.
2. **Process detail** — Click `Housing Fit Check` → right-side panel shows Rugged Phone batch `ET-RP-260507-A03`, $12,400 estimated cost impact, and a recommended action.
3. **Field Input** — Switch role to _Production Staff_ in the sidebar, submit a new defect; the new record appears in Recent Inputs, on the Dashboard, and in the Defect Records table.
4. **Traceability** — Search `ET-RP-260507-A03` to see the full module status and event timeline for that batch.
5. **AX Assistant** — Bottom-right `?` button opens a chat panel with a fixed Phase 3 placeholder response.

---

## Running it locally

Requirements: **Node.js 18+** and **npm**.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (defaults to `http://localhost:5173`).

The app is **desktop-only** and assumes a viewport ≥ 1280 px wide.

### Other scripts

```bash
npm run build      # Type-check + production build into ./dist
npm run preview    # Serve the production build locally
npm run lint       # ESLint
```

### Deployment (GitHub Pages)

The Vite config switches `base` based on the build mode so the same source can serve both locally and from a Pages subpath:

```bash
npm run build -- --mode=pages
```

A GitHub Actions workflow in `.github/workflows/` automates this on push.

---

## Tech stack

- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Recharts** for trend / cost charts
- **Lucide React** for icons
- React Context for runtime state — no Redux / Zustand / router

---

## Project structure

```
src/
├── App.tsx                     # Page switch driven by the store
├── main.tsx
├── index.css                   # Tailwind v4 + theme tokens + animations
│
├── data/                       # Seed dummy data (JSON, never mutated)
│   ├── dashboard.json
│   ├── processFlow.json
│   ├── defectRecords.json
│   ├── batches.json
│   ├── alerts.json
│   ├── masterData.json
│   └── roles.json
│
├── store/AppStore.tsx          # Context + reducer for role, page, records,
│                               # process nodes, alerts, selected node.
│                               # `submitDefect` propagates a new record into
│                               # records, the process map, and alerts.
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
└── types/index.ts              # Shared TS types
```

---

## What this mockup is _not_

- Not a real production system.
- No backend, database, authentication, or persistence beyond `localStorage`-stored role.
- No MES, SAP, or supplier-system integration.
- No real AI — the assistant returns one canned response.
- No mobile or tablet layout — desktop only.
