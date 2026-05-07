import { useAppStore } from "@/store/AppStore";
import { SeverityBadge } from "@/components/common/SeverityBadge";
import { Clock } from "lucide-react";

export function RecentInputs() {
  const { defectRecords } = useAppStore();
  const recent = defectRecords.slice(0, 8);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-slate-500">
            <Clock className="h-3.5 w-3.5" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Recent Inputs
            </h3>
            <p className="text-[11px] text-slate-500">
              {defectRecords.length} total reports today
            </p>
          </div>
        </div>
      </div>
      <ul className="flex-1 divide-y divide-slate-100 overflow-y-auto">
        {recent.map((r) => (
          <li key={r.id} className="flex items-start gap-3 px-5 py-3">
            <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-md bg-navy-50 text-[10.5px] font-mono font-semibold text-navy-700">
              {r.id.replace("DR-", "")}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-[13px] font-semibold text-slate-800">
                  {r.product}
                </p>
                <span className="text-[10.5px] font-mono text-slate-400">
                  {r.timestamp.slice(11)}
                </span>
              </div>
              <p className="mt-0.5 truncate text-[11.5px] text-slate-500">
                {r.process} · {r.defectType}
              </p>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Qty <span className="font-semibold text-slate-700">{r.quantity}</span>{" "}
                  · {r.batchId}
                </span>
                <SeverityBadge severity={r.severity} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
