import { useAppStore } from "@/store/AppStore";
import { SeverityBadge } from "@/components/common/SeverityBadge";
import { ArrowUpRight } from "lucide-react";

export function RecentDefectRecords() {
  const { defectRecords, setPage } = useAppStore();
  const recent = defectRecords.slice(0, 6);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Recent Defect Records
          </h3>
          <p className="text-[11px] text-slate-500">
            {defectRecords.length} total · runtime state
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPage("defect-records")}
          className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:border-navy-300 hover:text-navy-700"
        >
          Open table
          <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left text-[12px]">
          <thead className="sticky top-0 z-10 bg-slate-50/95 text-[10.5px] uppercase tracking-wider text-slate-500 backdrop-blur">
            <tr>
              <th className="px-5 py-2 font-semibold">Time</th>
              <th className="px-2 py-2 font-semibold">Product</th>
              <th className="px-2 py-2 font-semibold">Process</th>
              <th className="px-2 py-2 font-semibold">Defect</th>
              <th className="px-2 py-2 text-right font-semibold">Qty</th>
              <th className="px-5 py-2 text-right font-semibold">Severity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recent.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/80">
                <td className="px-5 py-2 font-mono text-[11px] text-slate-500">
                  {r.timestamp.slice(11)}
                </td>
                <td className="px-2 py-2 font-medium text-slate-800">
                  {r.product}
                </td>
                <td className="px-2 py-2 text-slate-600">{r.process}</td>
                <td className="px-2 py-2 text-slate-700">
                  <span className="line-clamp-1">{r.defectType}</span>
                </td>
                <td className="px-2 py-2 text-right font-semibold text-slate-800">
                  {r.quantity}
                </td>
                <td className="px-5 py-2 text-right">
                  <SeverityBadge severity={r.severity} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
