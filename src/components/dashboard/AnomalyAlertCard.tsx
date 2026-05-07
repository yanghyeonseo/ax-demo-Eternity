import { useAppStore } from "@/store/AppStore";
import { SeverityBadge } from "@/components/common/SeverityBadge";
import { Bell, ArrowRight } from "lucide-react";

export function AnomalyAlertCard() {
  const { alerts, processNodes, setSelectedProcessId, setPage } = useAppStore();

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-red-50 text-red-600">
            <Bell className="h-3.5 w-3.5" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Anomaly Alerts
            </h3>
            <p className="text-[11px] text-slate-500">
              {alerts.length} open · live process signals
            </p>
          </div>
        </div>
      </div>
      <ul className="flex-1 divide-y divide-slate-100 overflow-y-auto">
        {alerts.map((a) => {
          const matched = processNodes.find((p) => p.name === a.process);
          return (
            <li
              key={a.id}
              className="group flex items-start gap-3 px-5 py-3 hover:bg-slate-50/80"
            >
              <div className="flex flex-col items-center pt-0.5">
                <SeverityBadge severity={a.severity} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {a.process}
                  </p>
                  <span className="shrink-0 text-[10.5px] font-mono text-slate-400">
                    {a.timestamp.slice(11)}
                  </span>
                </div>
                <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-slate-600">
                  {a.message}
                </p>
                {matched && (
                  <button
                    type="button"
                    onClick={() => {
                      setPage("dashboard");
                      setSelectedProcessId(matched.id);
                    }}
                    className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-navy-600 hover:text-navy-800"
                  >
                    View process detail
                    <ArrowRight className="h-3 w-3" />
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
