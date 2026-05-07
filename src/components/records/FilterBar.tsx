import { Filter, X } from "lucide-react";
import masterData from "@/data/masterData.json";

export type RecordFilters = {
  product: string;
  module: string;
  process: string;
  severity: string;
  status: string;
  line: string;
  query: string;
};

export const EMPTY_FILTERS: RecordFilters = {
  product: "",
  module: "",
  process: "",
  severity: "",
  status: "",
  line: "",
  query: "",
};

export function FilterBar({
  filters,
  setFilters,
  total,
  filtered,
}: {
  filters: RecordFilters;
  setFilters: (next: RecordFilters) => void;
  total: number;
  filtered: number;
}) {
  const update = <K extends keyof RecordFilters>(k: K, v: RecordFilters[K]) =>
    setFilters({ ...filters, [k]: v });

  const hasFilters = Object.entries(filters).some(([, v]) => v !== "");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-navy-50 text-navy-600">
            <Filter className="h-3.5 w-3.5" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Filters</h3>
            <p className="text-[11px] text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">{filtered}</span> of{" "}
              {total} records
            </p>
          </div>
        </div>
        {hasFilters && (
          <button
            type="button"
            onClick={() => setFilters(EMPTY_FILTERS)}
            className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-600 hover:border-red-200 hover:text-red-600"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-7 gap-2">
        <SelectFilter
          label="Product"
          value={filters.product}
          onChange={(v) => update("product", v)}
          options={masterData.products}
        />
        <SelectFilter
          label="Module"
          value={filters.module}
          onChange={(v) => update("module", v)}
          options={masterData.modules}
        />
        <SelectFilter
          label="Process"
          value={filters.process}
          onChange={(v) => update("process", v)}
          options={masterData.processes}
        />
        <SelectFilter
          label="Severity"
          value={filters.severity}
          onChange={(v) => update("severity", v)}
          options={masterData.severities}
        />
        <SelectFilter
          label="Status"
          value={filters.status}
          onChange={(v) => update("status", v)}
          options={masterData.statuses}
        />
        <SelectFilter
          label="Line"
          value={filters.line}
          onChange={(v) => update("line", v)}
          options={masterData.lines}
        />
        <div>
          <p className="mb-1 text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">
            Search
          </p>
          <input
            value={filters.query}
            onChange={(e) => update("query", e.target.value)}
            placeholder="Batch · Serial · Defect…"
            className="h-9 w-full rounded-md border border-slate-200 bg-white px-2.5 text-[12.5px] text-slate-800 outline-none placeholder:text-slate-400 focus:border-navy-400 focus:ring-2 focus:ring-navy-100"
          />
        </div>
      </div>
    </div>
  );
}

function SelectFilter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <div>
      <p className="mb-1 text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-full rounded-md border border-slate-200 bg-white px-2 text-[12.5px] text-slate-800 outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-100"
      >
        <option value="">All</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
