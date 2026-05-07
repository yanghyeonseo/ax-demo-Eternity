import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  ClipboardEdit,
} from "lucide-react";
import { useAppStore } from "@/store/AppStore";
import masterData from "@/data/masterData.json";
import type { DefectInput, DefectRecord, Severity } from "@/types";

const STEPS = [
  { id: 1, label: "Product / Module", hint: "What was inspected" },
  { id: 2, label: "Process / Defect Type", hint: "Where & what defect" },
  { id: 3, label: "Quantity / Severity", hint: "Submit report" },
] as const;

const INITIAL: DefectInput = {
  product: "",
  module: "",
  process: "",
  defectType: "",
  quantity: 1,
  severity: "Info",
  batchId: "",
  serialRange: "",
  line: "",
  memo: "",
};

export function FieldInputForm({
  onSubmitted,
}: {
  onSubmitted: (record: DefectRecord, draft: DefectInput) => void;
}) {
  const { submitDefect } = useAppStore();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<DefectInput>(INITIAL);

  const stepValid = useMemo(() => {
    if (step === 1) return !!form.product && !!form.module;
    if (step === 2) return !!form.process && !!form.defectType;
    if (step === 3) return form.quantity > 0;
    return false;
  }, [step, form]);

  function update<K extends keyof DefectInput>(key: K, value: DefectInput[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function reset() {
    setForm(INITIAL);
    setStep(1);
  }

  function handleSubmit() {
    const record = submitDefect(form);
    onSubmitted(record, form);
    reset();
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-50 text-navy-600">
            <ClipboardEdit className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Quick Defect Report
            </h2>
            <p className="text-xs text-slate-500">
              3-step flow · in-memory runtime · no backend
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={reset}
          className="text-[11px] font-medium text-slate-500 hover:text-slate-700"
        >
          Reset form
        </button>
      </div>

      {/* Stepper */}
      <div className="grid grid-cols-3 gap-3 border-b border-slate-100 bg-slate-50/60 px-6 py-3">
        {STEPS.map((s) => {
          const done = s.id < step;
          const active = s.id === step;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setStep(s.id)}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-left text-[12px] transition ${
                active
                  ? "border-navy-300 bg-white shadow-sm"
                  : done
                    ? "border-emerald-200 bg-emerald-50/40"
                    : "border-slate-200 bg-white/60 text-slate-500"
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                  active
                    ? "bg-navy-600 text-white"
                    : done
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 text-slate-600"
                }`}
              >
                {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : s.id}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-slate-800">{s.label}</p>
                <p className="text-[10.5px] text-slate-500">{s.hint}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="px-6 py-5">
        {step === 1 && (
          <div className="grid grid-cols-2 gap-4">
            <Field label="Product" required>
              <Select
                value={form.product}
                onChange={(v) => update("product", v)}
                options={masterData.products}
                placeholder="Select product"
              />
            </Field>
            <Field label="Module" required>
              <Select
                value={form.module}
                onChange={(v) => update("module", v)}
                options={masterData.modules}
                placeholder="Select module"
              />
            </Field>
            <Field label="Production Line">
              <Select
                value={form.line}
                onChange={(v) => update("line", v)}
                options={masterData.lines}
                placeholder="Optional"
              />
            </Field>
            <Field label="Batch ID">
              <input
                value={form.batchId}
                onChange={(e) => update("batchId", e.target.value)}
                placeholder="e.g. ET-RP-260507-A03"
                className="input"
              />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-2 gap-4">
            <Field label="Process" required>
              <Select
                value={form.process}
                onChange={(v) => update("process", v)}
                options={masterData.processes}
                placeholder="Select process"
              />
            </Field>
            <Field label="Defect Type" required>
              <Select
                value={form.defectType}
                onChange={(v) => update("defectType", v)}
                options={masterData.defectTypes}
                placeholder="Select defect type"
              />
            </Field>
            <Field label="Serial Range">
              <input
                value={form.serialRange}
                onChange={(e) => update("serialRange", e.target.value)}
                placeholder="e.g. RP-A03-001 ~ RP-A03-500"
                className="input"
              />
            </Field>
            <Field label="Photo Attachment (mock)">
              <button
                type="button"
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 text-[12px] text-slate-500 hover:border-navy-300 hover:text-navy-600"
              >
                <Camera className="h-3.5 w-3.5" />
                Attach photo (placeholder)
              </button>
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="grid grid-cols-2 gap-4">
            <Field label="Quantity" required>
              <input
                type="number"
                min={1}
                value={form.quantity}
                onChange={(e) =>
                  update("quantity", Math.max(1, Number(e.target.value)))
                }
                className="input"
              />
            </Field>
            <Field label="Severity" required>
              <div className="grid grid-cols-3 gap-2">
                {(masterData.severities as Severity[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => update("severity", s)}
                    className={`rounded-lg border px-3 py-2 text-[12px] font-semibold uppercase tracking-wide transition ${
                      form.severity === s
                        ? s === "Critical"
                          ? "border-red-300 bg-red-50 text-red-700"
                          : s === "Warning"
                            ? "border-amber-300 bg-amber-50 text-amber-700"
                            : "border-sky-300 bg-sky-50 text-sky-700"
                        : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Memo" full>
              <textarea
                value={form.memo}
                onChange={(e) => update("memo", e.target.value)}
                placeholder="Optional notes for the quality engineer."
                rows={3}
                className="input resize-none"
              />
            </Field>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(3, s + 1))}
              disabled={!stepValid}
              className="inline-flex items-center gap-1.5 rounded-lg bg-navy-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!stepValid}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Submit Defect Record
            </button>
          )}
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
          background: white;
          padding: 0.5rem 0.75rem;
          font-size: 13px;
          color: #1f2937;
          outline: none;
          transition: border 0.15s, box-shadow 0.15s;
        }
        .input:focus {
          border-color: #4d70b1;
          box-shadow: 0 0 0 3px rgba(77, 112, 177, 0.15);
        }
        .input::placeholder { color: #94a3b8; }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
  required,
  full,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  full?: boolean;
}) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input bg-white"
    >
      <option value="">{placeholder ?? "Select…"}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
