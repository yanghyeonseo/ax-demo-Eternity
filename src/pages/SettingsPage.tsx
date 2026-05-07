import { Database, GitBranch, ShieldCheck } from "lucide-react";
import roles from "@/data/roles.json";
import masterData from "@/data/masterData.json";
import processFlow from "@/data/processFlow.json";
import { useAppStore } from "@/store/AppStore";

const PERM_LABEL: Record<string, { label: string; cls: string }> = {
  full: { label: "Full", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  view: { label: "View", cls: "bg-sky-50 text-sky-700 border-sky-200" },
  basic: { label: "Basic", cls: "bg-slate-100 text-slate-700 border-slate-200" },
  limited: { label: "Limited", cls: "bg-slate-100 text-slate-700 border-slate-200" },
  own: { label: "Own", cls: "bg-violet-50 text-violet-700 border-violet-200" },
  none: { label: "—", cls: "bg-slate-50 text-slate-400 border-slate-200" },
};

export function SettingsPage() {
  const { role } = useAppStore();
  const features = ["dashboard", "fieldInput", "traceability", "defectRecords", "settings"] as const;

  return (
    <div className="flex flex-col gap-4 pb-8">
      <Section
        icon={<ShieldCheck className="h-3.5 w-3.5 text-navy-600" />}
        title="Role Permission Preview"
        hint="Visual preview of each role's access. No changes are persisted."
      >
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-[10.5px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Feature</th>
                {roles.roles.map((r) => (
                  <th
                    key={r.role}
                    className={`px-4 py-2 text-center font-semibold ${
                      role === r.role ? "text-navy-700" : ""
                    }`}
                  >
                    {r.role}
                    {role === r.role && (
                      <span className="ml-1 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {features.map((f) => (
                <tr key={f}>
                  <td className="px-4 py-2 font-medium text-slate-700 capitalize">
                    {f.replace(/([A-Z])/g, " $1")}
                  </td>
                  {roles.roles.map((r) => {
                    const v = (r.permissions as Record<string, string>)[f] ?? "none";
                    const cfg = PERM_LABEL[v] ?? PERM_LABEL.none;
                    return (
                      <td key={r.role} className="px-4 py-2 text-center">
                        <span
                          className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold ${cfg.cls}`}
                        >
                          {cfg.label}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7">
          <Section
            icon={<GitBranch className="h-3.5 w-3.5 text-navy-600" />}
            title="Process Master"
            hint={`${processFlow.processes.length} standardized process nodes`}
          >
            <div className="grid grid-cols-2 gap-2">
              {processFlow.processes.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2 text-[12.5px]"
                >
                  <div>
                    <p className="font-mono text-[10.5px] text-slate-500">
                      {p.id}
                    </p>
                    <p className="font-semibold text-slate-800">{p.name}</p>
                  </div>
                  <span className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10.5px] text-slate-600">
                    {p.group}
                  </span>
                </div>
              ))}
            </div>
          </Section>
        </div>
        <div className="col-span-5 flex flex-col gap-4">
          <Section
            icon={<Database className="h-3.5 w-3.5 text-navy-600" />}
            title="Defect Code Mapping"
            hint={`${masterData.defectCodeMapping.length} mapped codes`}
          >
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-[12px]">
                <thead className="bg-slate-50 text-[10.5px] uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">Code</th>
                    <th className="px-3 py-2 text-left font-semibold">
                      Defect Type
                    </th>
                    <th className="px-3 py-2 text-left font-semibold">
                      Process
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {masterData.defectCodeMapping.map((d) => (
                    <tr key={d.defectCode}>
                      <td className="px-3 py-2 font-mono text-navy-700">
                        {d.defectCode}
                      </td>
                      <td className="px-3 py-2 text-slate-700">
                        {d.defectType}
                      </td>
                      <td className="px-3 py-2 text-slate-500">{d.process}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section
            icon={<Database className="h-3.5 w-3.5 text-navy-600" />}
            title="Master Data Summary"
          >
            <div className="grid grid-cols-2 gap-2 text-[12.5px]">
              <Stat label="Products" value={masterData.products.length} />
              <Stat label="Modules" value={masterData.modules.length} />
              <Stat label="Processes" value={masterData.processes.length} />
              <Stat label="Defect Types" value={masterData.defectTypes.length} />
              <Stat label="Lines" value={masterData.lines.length} />
              <Stat label="Statuses" value={masterData.statuses.length} />
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  hint,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-navy-50">
          {icon}
        </span>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          {hint && <p className="text-[11px] text-slate-500">{hint}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2">
      <p className="text-[10.5px] font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </p>
      <p className="text-base font-semibold text-slate-800">{value}</p>
    </div>
  );
}
