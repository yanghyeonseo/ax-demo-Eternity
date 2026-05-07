import { ChevronsDown } from "lucide-react";
import { useAppStore } from "@/store/AppStore";
import { ProcessNode } from "./ProcessNode";
import type { ProcessNode as ProcessNodeType } from "@/types";

const BRANCH_GROUPS = [
  "PCB Branch",
  "Display Branch",
  "Power Branch",
  "Sensor Branch",
  "Housing Branch",
] as const;

const MAIN_LINE_IDS = [
  "P-601",
  "P-701",
  "P-801",
  "P-901",
  "P-1001",
  "P-1101",
] as const;

export function ProcessFlowMap() {
  const { processNodes, selectedProcessId, setSelectedProcessId } =
    useAppStore();

  const incoming = processNodes.find((n) => n.id === "P-001");
  const branchEntries = BRANCH_GROUPS.map((group) => {
    const nodes = processNodes
      .filter((n) => n.group === group)
      .sort((a, b) => a.id.localeCompare(b.id));
    return { group, nodes };
  });

  const mainLine = MAIN_LINE_IDS.map((id) =>
    processNodes.find((n) => n.id === id),
  ).filter(Boolean) as ProcessNodeType[];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold tracking-tight text-slate-900">
            Branched Manufacturing Process Map
          </h2>
          <p className="text-xs text-slate-500">
            Module branches converge into main assembly · click any node for
            detail
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-500">
          <LegendDot color="bg-emerald-500" label="Active" pulse />
          <LegendDot color="bg-amber-500" label="Warning" />
          <LegendDot color="bg-red-500" label="Critical" />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* LEFT: Incoming */}
        <div className="col-span-2 flex flex-col items-stretch justify-center">
          {incoming && (
            <div className="relative">
              <ProcessNode
                node={incoming}
                selected={selectedProcessId === incoming.id}
                onClick={() => setSelectedProcessId(incoming.id)}
              />
              <p className="mt-1.5 text-center text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Source
              </p>
            </div>
          )}
        </div>

        {/* MIDDLE: Branches */}
        <div className="col-span-7 relative">
          <div className="absolute left-0 top-1/2 hidden h-[2px] w-4 -translate-y-1/2 bg-slate-300 lg:block" />
          <div className="grid grid-cols-1 gap-2.5">
            {branchEntries.map(({ group, nodes }) => (
              <div
                key={group}
                className="flex items-center gap-2 rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-2"
              >
                <div className="w-28 shrink-0 pl-1.5">
                  <p className="text-[10.5px] font-semibold uppercase tracking-widest text-slate-500">
                    {group.replace(" Branch", "")}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {nodes.length} step{nodes.length > 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex flex-1 items-stretch gap-2">
                  {nodes.map((n, i) => (
                    <div
                      key={n.id}
                      className="flex flex-1 items-center gap-2"
                    >
                      <div className="flex-1">
                        <ProcessNode
                          node={n}
                          compact
                          selected={selectedProcessId === n.id}
                          onClick={() => setSelectedProcessId(n.id)}
                        />
                      </div>
                      {i < nodes.length - 1 && (
                        <Connector />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Convergence Indicator */}
        <div className="col-span-3 flex items-center justify-center">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center shadow-inner">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              Module Convergence
            </p>
            <p className="mt-1 text-xs leading-snug text-slate-600">
              All branches merge into Main Assembly downstream.
            </p>
            <ChevronsDown className="mx-auto mt-2 h-5 w-5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* MAIN PIPELINE */}
      <div className="mt-4">
        <div className="mb-2 flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-widest text-slate-500">
          <div className="h-px flex-1 bg-slate-200" />
          Main Assembly Line
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="flex items-stretch gap-2">
          {mainLine.map((n, i) => (
            <div key={n.id} className="flex flex-1 items-center gap-2">
              <div className="flex-1">
                <ProcessNode
                  node={n}
                  compact
                  selected={selectedProcessId === n.id}
                  onClick={() => setSelectedProcessId(n.id)}
                />
              </div>
              {i < mainLine.length - 1 && <Connector />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex h-full items-center">
      <div className="h-[2px] w-3 bg-gradient-to-r from-slate-300 to-slate-200" />
      <div className="h-0 w-0 border-y-[5px] border-l-[6px] border-y-transparent border-l-slate-300" />
    </div>
  );
}

function LegendDot({
  color,
  label,
  pulse = false,
}: {
  color: string;
  label: string;
  pulse?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`h-2 w-2 rounded-full ${color} ${pulse ? "pulse-active" : ""}`}
      />
      {label}
    </span>
  );
}
