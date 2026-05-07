import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ChevronUp, ShieldCheck, HardHat, BarChart3 } from "lucide-react";
import { useAppStore } from "@/store/AppStore";
import type { UserRole } from "@/types";

const ROLES: { role: UserRole; description: string; Icon: LucideIcon }[] = [
  {
    role: "Production Staff",
    description: "Quick defect reporting from the floor.",
    Icon: HardHat,
  },
  {
    role: "Quality Engineer",
    description: "Defect analysis · batch traceability.",
    Icon: ShieldCheck,
  },
  {
    role: "Production Manager",
    description: "Yield · risk · cost impact.",
    Icon: BarChart3,
  },
];

export function RoleSwitcher() {
  const { role, setRole } = useAppStore();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const initials = role
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2.5 text-left transition hover:border-white/10 hover:bg-white/10"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-navy-400 text-[11px] font-bold text-navy-900 shadow-inner">
          {initials}
        </span>
        <span className="flex min-w-0 flex-1 flex-col leading-tight">
          <span className="text-[10px] uppercase tracking-widest text-slate-400">
            Logged in
          </span>
          <span className="truncate text-[12.5px] font-semibold text-white">
            {role}
          </span>
        </span>
        <ChevronUp
          className={`h-3.5 w-3.5 shrink-0 text-slate-400 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute bottom-0 left-full z-40 ml-3 w-72 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10">
          <p className="px-3 pb-1.5 pt-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Switch Role (Mock)
          </p>
          <ul className="space-y-0.5">
            {ROLES.map(({ role: r, description, Icon }) => {
              const active = r === role;
              return (
                <li key={r}>
                  <button
                    type="button"
                    onClick={() => {
                      setRole(r);
                      setOpen(false);
                    }}
                    className={`flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left transition ${
                      active
                        ? "bg-navy-50 text-navy-800"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                        active
                          ? "bg-navy-600 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold">{r}</span>
                      <span className="block text-[11px] text-slate-500">
                        {description}
                      </span>
                    </span>
                    {active && (
                      <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-slate-100 px-3 py-2 text-[10.5px] text-slate-500">
            No real authentication. Role only affects emphasis.
          </div>
        </div>
      )}
    </div>
  );
}
