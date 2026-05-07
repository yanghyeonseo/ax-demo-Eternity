import { useMemo, useState } from "react";
import { useAppStore } from "@/store/AppStore";
import {
  EMPTY_FILTERS,
  FilterBar,
} from "@/components/records/FilterBar";
import type { RecordFilters } from "@/components/records/FilterBar";
import { DefectRecordTable } from "@/components/records/DefectRecordTable";
import { DefectDetailModal } from "@/components/records/DefectDetailModal";
import type { DefectRecord } from "@/types";

export function DefectRecordsPage() {
  const { defectRecords } = useAppStore();
  const [filters, setFilters] = useState<RecordFilters>(EMPTY_FILTERS);
  const [open, setOpen] = useState<DefectRecord | null>(null);

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return defectRecords.filter((r) => {
      if (filters.product && r.product !== filters.product) return false;
      if (filters.module && r.module !== filters.module) return false;
      if (filters.process && r.process !== filters.process) return false;
      if (filters.severity && r.severity !== filters.severity) return false;
      if (filters.status && r.status !== filters.status) return false;
      if (filters.line && r.line !== filters.line) return false;
      if (q) {
        const hay =
          `${r.id} ${r.batchId} ${r.serialRange} ${r.defectType} ${r.owner}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [defectRecords, filters]);

  return (
    <div className="flex flex-col gap-4 pb-8">
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        total={defectRecords.length}
        filtered={filtered.length}
      />
      <DefectRecordTable records={filtered} onRowClick={setOpen} />
      {open && (
        <DefectDetailModal record={open} onClose={() => setOpen(null)} />
      )}
    </div>
  );
}
