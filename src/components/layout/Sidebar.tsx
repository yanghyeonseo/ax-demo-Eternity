import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  ClipboardEdit,
  Search,
  Database,
  Settings as SettingsIcon,
  Factory,
} from "lucide-react";
import { useAppStore } from "@/store/AppStore";
import type { PageId } from "@/types";
import { NotificationBell } from "./NotificationBell";
import { RoleSwitcher } from "./RoleSwitcher";

const NAV: { id: PageId; label: string; icon: LucideIcon; hint?: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, hint: "Process & KPI" },
  { id: "field-input", label: "Field Input", icon: ClipboardEdit, hint: "Quick defect entry" },
  { id: "traceability", label: "Traceability", icon: Search, hint: "Batch · Serial" },
  { id: "defect-records", label: "Defect Records", icon: Database, hint: "Records table" },
  { id: "settings", label: "Settings", icon: SettingsIcon, hint: "Roles · Master data" },
];

export function Sidebar() {
  const { page, setPage } = useAppStore();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-navy-900 text-slate-100">
      <div className="flex items-center gap-2.5 border-b border-white/5 px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-navy-400 text-navy-900 shadow-inner">
          <Factory className="h-5 w-5" strokeWidth={2.4} />
        </div>
        <div>
          <p className="text-[15px] font-semibold leading-tight text-white">
            AX DefectOps
          </p>
          <p className="text-[11px] leading-tight text-slate-400">
            Eternity · EMS / ODM
          </p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          Operations
        </p>
        <ul className="space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = page === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setPage(item.id)}
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    active
                      ? "bg-white/10 text-white shadow-inner"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${active ? "text-sky-300" : "text-slate-400 group-hover:text-slate-200"}`}
                    strokeWidth={2.2}
                  />
                  <span className="flex-1">
                    <span className="block font-medium">{item.label}</span>
                    {item.hint && (
                      <span className="block text-[10.5px] text-slate-400">
                        {item.hint}
                      </span>
                    )}
                  </span>
                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_8px_rgba(125,211,252,0.8)]" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="space-y-2 border-t border-white/5 p-3">
        <NotificationBell />
        <RoleSwitcher />
      </div>
    </aside>
  );
}
