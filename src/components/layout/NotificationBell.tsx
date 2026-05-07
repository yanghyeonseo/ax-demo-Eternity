import { useEffect, useRef, useState } from "react";
import { Bell, Check } from "lucide-react";
import { useAppStore } from "@/store/AppStore";
import { SeverityBadge } from "@/components/common/SeverityBadge";

export function NotificationBell() {
  const { alerts, processNodes, setSelectedProcessId, setPage } = useAppStore();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const critical = alerts.filter((a) => a.severity === "Critical").length;
  const warning = alerts.filter((a) => a.severity === "Warning").length;
  const total = alerts.length;
  const unread = critical + warning;

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="group flex w-full items-center gap-3 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2.5 text-left text-slate-200 transition hover:border-white/10 hover:bg-white/10 hover:text-white"
      >
        <span className="relative flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-slate-200">
          <Bell className="h-3.5 w-3.5" strokeWidth={2.4} />
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[9.5px] font-bold leading-none text-white shadow ring-2 ring-navy-900">
              {unread}
            </span>
          )}
        </span>
        <span className="flex flex-1 flex-col leading-tight">
          <span className="text-[12.5px] font-semibold">Notifications</span>
          <span className="text-[10.5px] text-slate-400">
            {critical} critical · {warning} warning
          </span>
        </span>
      </button>

      {open && (
        <div className="absolute bottom-0 left-full z-40 ml-3 w-[360px] overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-700 shadow-xl shadow-slate-900/10">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Anomaly Alerts
              </p>
              <p className="text-[11px] text-slate-500">
                {total} total · live process signals
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-[11px] font-semibold text-slate-600 hover:border-emerald-200 hover:text-emerald-700"
            >
              <Check className="h-3 w-3" />
              Mark seen
            </button>
          </div>
          <ul className="max-h-[420px] divide-y divide-slate-100 overflow-y-auto">
            {alerts.map((a) => {
              const matched = processNodes.find((p) => p.name === a.process);
              return (
                <li
                  key={a.id}
                  className="group cursor-pointer px-4 py-3 hover:bg-slate-50"
                  onClick={() => {
                    if (matched) {
                      setPage("dashboard");
                      setSelectedProcessId(matched.id);
                    }
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <SeverityBadge severity={a.severity} />
                    <span className="font-mono text-[10.5px] text-slate-400">
                      {a.timestamp.slice(11)}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12.5px] font-semibold text-slate-800">
                    {a.process}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-[11.5px] leading-snug text-slate-600">
                    {a.message}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
