import type { DefectRecord } from "@/types";
import { SeverityBadge } from "@/components/common/SeverityBadge";
import { ModuleStatusPill } from "@/components/common/StatusBadge";
import { X, Wrench, ShieldAlert, PackageSearch } from "lucide-react";
import { useEffect } from "react";

export function DefectDetailModal({
  record,
  onClose,
}: {
  record: DefectRecord;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[88vh] w-[720px] max-w-[92vw] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-widest text-slate-500">
              Defect Record · <span className="font-mono">{record.id}</span>
            </p>
            <h3 className="mt-0.5 text-base font-semibold text-slate-900">
              {record.defectType}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <SeverityBadge severity={record.severity} />
              <ModuleStatusPill status={record.status} />
              <span className="text-[11px] text-slate-500">
                Reported{" "}
                <span className="font-mono text-slate-700">{record.timestamp}</span>
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-1 px-6 py-4 text-[13px] text-slate-700">
          <Row k="Product" v={record.product} />
          <Row k="Module" v={record.module} />
          <Row k="Process" v={record.process} />
          <Row k="Line" v={record.line} />
          <Row k="Batch" v={record.batchId} mono />
          <Row k="Serial Range" v={record.serialRange} mono />
          <Row k="Quantity" v={String(record.quantity)} />
          <Row k="Owner" v={record.owner} />
          <Row
            k="Estimated Cost"
            v={`$${record.estimatedCost.toLocaleString()}`}
          />
          <Row k="Related Batch" v={record.batchId} mono />
        </div>

        <div className="space-y-3 border-t border-slate-100 bg-slate-50/40 px-6 py-4 text-sm">
          <Block
            icon={<ShieldAlert className="h-3.5 w-3.5 text-amber-600" />}
            title="Current Response"
            body={record.currentResponse ?? "—"}
          />
          <Block
            icon={<Wrench className="h-3.5 w-3.5 text-navy-600" />}
            title="Recommended Action"
            body={record.recommendedAction ?? "—"}
            highlight
          />
          <Block
            icon={<PackageSearch className="h-3.5 w-3.5 text-slate-500" />}
            title="Related Batch"
            body={`${record.batchId} (${record.product})`}
          />
        </div>

        <div className="flex justify-end border-t border-slate-100 px-6 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-navy-600 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-1.5 last:border-b-0">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        {k}
      </span>
      <span
        className={`font-medium text-slate-800 ${mono ? "font-mono text-[12.5px]" : ""}`}
      >
        {v}
      </span>
    </div>
  );
}

function Block({
  icon,
  title,
  body,
  highlight,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="mb-1 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
        {icon}
        {title}
      </p>
      <p
        className={`rounded-lg border p-3 text-[13px] leading-snug ${
          highlight
            ? "border-navy-100 bg-navy-50/60 text-slate-800"
            : "border-slate-100 bg-white text-slate-700"
        }`}
      >
        {body}
      </p>
    </div>
  );
}
