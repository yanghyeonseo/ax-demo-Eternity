import { useState } from "react";
import type { DefectInput, DefectRecord } from "@/types";
import { FieldInputForm } from "@/components/field-input/FieldInputForm";
import { RecentInputs } from "@/components/field-input/RecentInputs";
import { SubmissionSuccessCard } from "@/components/field-input/SubmissionSuccessCard";
import { useAppStore } from "@/store/AppStore";
import { Eye } from "lucide-react";

type LastSubmit = { record: DefectRecord; draft: DefectInput };

export function FieldInputPage() {
  const { role } = useAppStore();
  const [last, setLast] = useState<LastSubmit | null>(null);

  const viewOnly = role === "Production Manager";

  return (
    <div className="grid grid-cols-12 gap-4 pb-8">
      <div className="col-span-8 flex flex-col gap-4">
        {viewOnly && (
          <div className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-[12.5px] text-slate-600 shadow-sm">
            <Eye className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <span>
              <span className="font-semibold text-slate-800">View-only</span> for
              Production Manager. Switch role to submit reports.
            </span>
          </div>
        )}
        {last && (
          <SubmissionSuccessCard
            record={last.record}
            draft={last.draft}
            onDismiss={() => setLast(null)}
          />
        )}
        <FieldInputForm
          onSubmitted={(record, draft) => setLast({ record, draft })}
        />
      </div>
      <div className="col-span-4">
        <RecentInputs />
      </div>
    </div>
  );
}
