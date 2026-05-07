import type { Batch } from "@/types";
import { ModuleStatusPill } from "@/components/common/StatusBadge";
import { Boxes } from "lucide-react";

export function ModuleQualityStatus({ batch }: { batch: Batch }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-navy-50 text-navy-600">
          <Boxes className="h-3.5 w-3.5" />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Module Quality Status
          </h3>
          <p className="text-[11px] text-slate-500">
            {batch.moduleStatus.length} modules · per-module verdict
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {batch.moduleStatus.map((m) => (
          <div
            key={m.module}
            className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2"
          >
            <span className="truncate text-[12.5px] font-semibold text-slate-700">
              {m.module}
            </span>
            <ModuleStatusPill status={m.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
