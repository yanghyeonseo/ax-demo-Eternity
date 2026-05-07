import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import batches from "@/data/batches.json";
import type { Batch } from "@/types";
import { BatchSearch } from "@/components/traceability/BatchSearch";
import { BatchSummary } from "@/components/traceability/BatchSummary";
import { ModuleQualityStatus } from "@/components/traceability/ModuleQualityStatus";
import { BatchTimeline } from "@/components/traceability/BatchTimeline";
import { ResponseTracking } from "@/components/traceability/ResponseTracking";

const DEFAULT_QUERY = "ET-RP-260507-A03";

export function TraceabilityPage() {
  const [query, setQuery] = useState(DEFAULT_QUERY);

  const result = useMemo<Batch | null>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    const list = batches as Batch[];
    const direct = list.find((b) => b.batchId.toLowerCase() === q);
    if (direct) return direct;
    const partial = list.find(
      (b) =>
        b.batchId.toLowerCase().includes(q) ||
        b.serialRange.toLowerCase().includes(q),
    );
    return partial ?? null;
  }, [query]);

  return (
    <div className="flex flex-col gap-4 pb-8">
      <BatchSearch initial={query} onSearch={setQuery} />

      {result ? (
        <>
          <BatchSummary batch={result} />
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-7">
              <BatchTimeline batch={result} />
            </div>
            <div className="col-span-5 flex flex-col gap-4">
              <ModuleQualityStatus batch={result} />
              <ResponseTracking batch={result} />
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <SearchX className="mx-auto h-8 w-8 text-slate-300" />
          <p className="mt-3 text-sm font-semibold text-slate-700">
            No batch matches "{query}"
          </p>
          <p className="mt-1 text-[12px] text-slate-500">
            Try a known batch like{" "}
            <span className="font-mono text-slate-700">ET-RP-260507-A03</span>
          </p>
        </div>
      )}
    </div>
  );
}
