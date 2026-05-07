import { Bell, Search } from "lucide-react";
import { RoleSwitcher } from "./RoleSwitcher";
import { useAppStore } from "@/store/AppStore";
import type { PageId } from "@/types";

const TITLES: Record<PageId, { title: string; subtitle: string }> = {
  dashboard: {
    title: "Quality Control Tower",
    subtitle: "Eternity EMS / ODM · Live process monitoring",
  },
  "field-input": {
    title: "Field Defect Input",
    subtitle: "3-step quick entry from the production floor",
  },
  traceability: {
    title: "Batch Traceability",
    subtitle: "One-click product · module · serial history",
  },
  "defect-records": {
    title: "Defect Records",
    subtitle: "Standardized defect history table",
  },
  settings: {
    title: "Settings",
    subtitle: "Roles · process master · defect code mapping",
  },
};

export function Header() {
  const { page, alerts } = useAppStore();
  const meta = TITLES[page];
  const criticalCount = alerts.filter((a) => a.severity === "Critical").length;
  const warnCount = alerts.filter((a) => a.severity === "Warning").length;

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-6">
      <div>
        <h1 className="text-base font-semibold leading-tight text-slate-900">
          {meta.title}
        </h1>
        <p className="text-[12px] text-slate-500">{meta.subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:flex">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Quick search · batch, process, defect…"
            className="h-9 w-72 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-navy-400 focus:bg-white focus:ring-2 focus:ring-navy-100"
          />
        </div>

        <button
          type="button"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm hover:border-navy-300 hover:text-navy-700"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          {(criticalCount > 0 || warnCount > 0) && (
            <span className="absolute -right-1 -top-1 inline-flex min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white shadow">
              {criticalCount + warnCount}
            </span>
          )}
        </button>

        <RoleSwitcher />
      </div>
    </header>
  );
}
