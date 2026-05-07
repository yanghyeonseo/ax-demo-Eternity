import type { DefectRecord } from "@/types";
import { SeverityBadge } from "@/components/common/SeverityBadge";
import { ModuleStatusPill } from "@/components/common/StatusBadge";

export function DefectRecordTable({
  records,
  onRowClick,
}: {
  records: DefectRecord[];
  onRowClick: (r: DefectRecord) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[12.5px]">
          <thead className="bg-slate-50/80 text-[10.5px] uppercase tracking-wider text-slate-500">
            <tr>
              <Th>Record ID</Th>
              <Th>Timestamp</Th>
              <Th>Product</Th>
              <Th>Batch</Th>
              <Th>Serial Range</Th>
              <Th>Line</Th>
              <Th>Process</Th>
              <Th>Module</Th>
              <Th>Defect Type</Th>
              <Th align="right">Qty</Th>
              <Th>Severity</Th>
              <Th>Status</Th>
              <Th>Owner</Th>
              <Th align="right">Cost (USD)</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {records.map((r) => (
              <tr
                key={r.id}
                onClick={() => onRowClick(r)}
                className="cursor-pointer hover:bg-navy-50/40"
              >
                <Td mono className="text-navy-700 font-semibold">
                  {r.id}
                </Td>
                <Td mono className="text-slate-500">
                  {r.timestamp}
                </Td>
                <Td className="font-semibold text-slate-800">{r.product}</Td>
                <Td mono className="text-slate-700">{r.batchId}</Td>
                <Td mono className="text-slate-500">
                  {r.serialRange}
                </Td>
                <Td>{r.line}</Td>
                <Td>{r.process}</Td>
                <Td>{r.module}</Td>
                <Td className="max-w-[220px] truncate" title={r.defectType}>
                  {r.defectType}
                </Td>
                <Td align="right" className="font-semibold text-slate-800">
                  {r.quantity}
                </Td>
                <Td>
                  <SeverityBadge severity={r.severity} />
                </Td>
                <Td>
                  <ModuleStatusPill status={r.status} />
                </Td>
                <Td>{r.owner}</Td>
                <Td align="right" className="font-semibold text-slate-800">
                  ${r.estimatedCost.toLocaleString()}
                </Td>
              </tr>
            ))}
            {records.length === 0 && (
              <tr>
                <td
                  colSpan={14}
                  className="px-6 py-12 text-center text-sm text-slate-500"
                >
                  No records match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({
  children,
  align,
}: {
  children: React.ReactNode;
  align?: "right";
}) {
  return (
    <th
      className={`whitespace-nowrap px-3 py-2.5 font-semibold ${align === "right" ? "text-right" : "text-left"}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  mono,
  align,
  className = "",
  title,
}: {
  children: React.ReactNode;
  mono?: boolean;
  align?: "right";
  className?: string;
  title?: string;
}) {
  return (
    <td
      title={title}
      className={`whitespace-nowrap px-3 py-2 ${align === "right" ? "text-right" : ""} ${mono ? "font-mono text-[11.5px]" : ""} ${className}`}
    >
      {children}
    </td>
  );
}
