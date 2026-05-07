import { Search } from "lucide-react";
import { useState } from "react";

export function BatchSearch({
  initial,
  onSearch,
}: {
  initial: string;
  onSearch: (q: string) => void;
}) {
  const [value, setValue] = useState(initial);
  const suggestions = [
    "ET-RP-260507-A03",
    "ET-SW-260507-B01",
    "ET-IP-260507-C02",
    "RP-A03-001",
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch(value)}
            placeholder="Search by Batch ID or Serial Number"
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-navy-400 focus:bg-white focus:ring-2 focus:ring-navy-100"
          />
        </div>
        <button
          type="button"
          onClick={() => onSearch(value)}
          className="rounded-xl bg-navy-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-navy-700"
        >
          Search
        </button>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Try:
        </span>
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setValue(s);
              onSearch(s);
            }}
            className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] text-slate-700 hover:border-navy-300 hover:bg-navy-50 hover:text-navy-700"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
