import type { Batch } from "@/types";
import { ModuleStatusPill } from "@/components/common/StatusBadge";
import { Clock4 } from "lucide-react";

export function BatchTimeline({ batch }: { batch: Batch }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-navy-50 text-navy-600">
          <Clock4 className="h-3.5 w-3.5" />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Quality Timeline
          </h3>
          <p className="text-[11px] text-slate-500">
            Inspection · defect · response · verification events
          </p>
        </div>
      </div>

      <ol className="relative ml-3 border-l border-dashed border-slate-200 pl-5">
        {batch.timeline.map((t, i) => {
          const lower = t.status.toLowerCase();
          const dot = lower.includes("critical")
            ? "bg-red-500"
            : lower.includes("warning")
              ? "bg-amber-500"
              : lower.includes("rework")
                ? "bg-violet-500"
                : lower.includes("info")
                  ? "bg-sky-500"
                  : lower.includes("verified") ||
                      lower.includes("passed") ||
                      lower.includes("closed")
                    ? "bg-emerald-500"
                    : "bg-slate-400";
          return (
            <li key={i} className="group relative pb-4 last:pb-0">
              <span
                className={`absolute -left-[27px] top-1 h-3 w-3 rounded-full ring-4 ring-white ${dot}`}
              />
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[11px] font-semibold text-slate-500">
                  {t.time}
                </p>
                <ModuleStatusPill status={t.status} />
              </div>
              <p className="mt-1 text-sm text-slate-700">{t.event}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
