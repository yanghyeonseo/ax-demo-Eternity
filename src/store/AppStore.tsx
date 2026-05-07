import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type {
  Alert,
  DefectInput,
  DefectRecord,
  PageId,
  ProcessNode,
  ProcessStatus,
  UserRole,
} from "@/types";
import initialDefectRecords from "@/data/defectRecords.json";
import initialProcessFlow from "@/data/processFlow.json";
import initialAlerts from "@/data/alerts.json";

const STORAGE_ROLE_KEY = "ax-defectops.role";

type AppState = {
  role: UserRole;
  setRole: (role: UserRole) => void;
  page: PageId;
  setPage: (page: PageId) => void;
  defectRecords: DefectRecord[];
  processNodes: ProcessNode[];
  alerts: Alert[];
  selectedProcessId: string | null;
  setSelectedProcessId: (id: string | null) => void;
  submitDefect: (input: DefectInput) => DefectRecord;
};

const AppContext = createContext<AppState | null>(null);

function estimateMockCost(input: DefectInput): number {
  const base =
    input.severity === "Critical" ? 800 : input.severity === "Warning" ? 350 : 120;
  return base * Math.max(input.quantity, 1);
}

function loadInitialRole(): UserRole {
  if (typeof window === "undefined") return "Quality Engineer";
  const saved = window.localStorage.getItem(STORAGE_ROLE_KEY);
  if (
    saved === "Production Staff" ||
    saved === "Quality Engineer" ||
    saved === "Production Manager"
  ) {
    return saved;
  }
  return "Quality Engineer";
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>(loadInitialRole);
  const [page, setPage] = useState<PageId>("dashboard");
  const [defectRecords, setDefectRecords] = useState<DefectRecord[]>(
    initialDefectRecords as DefectRecord[],
  );
  const [processNodes, setProcessNodes] = useState<ProcessNode[]>(
    initialProcessFlow.processes as ProcessNode[],
  );
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts as Alert[]);
  const [selectedProcessId, setSelectedProcessId] = useState<string | null>(
    "P-502",
  );

  const setRole = useCallback((next: UserRole) => {
    setRoleState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_ROLE_KEY, next);
    }
  }, []);

  const submitDefect = useCallback((input: DefectInput): DefectRecord => {
    const now = new Date();
    const ts = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours(),
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    let createdRecord!: DefectRecord;

    setDefectRecords((prev) => {
      const id = `DR-${String(prev.length + 1).padStart(3, "0")}`;
      const newRecord: DefectRecord = {
        id,
        timestamp: ts,
        company: "Eternity",
        product: input.product,
        batchId: input.batchId,
        serialRange: input.serialRange,
        line: input.line,
        process: input.process,
        module: input.module,
        defectType: input.defectType,
        quantity: input.quantity,
        severity: input.severity,
        status: "Assigned",
        owner: "Production Staff Kim",
        estimatedCost: estimateMockCost(input),
        currentResponse: "Field report submitted. Awaiting quality review.",
        recommendedAction:
          "Trigger quality engineer review and compare with recent normal batches.",
      };
      createdRecord = newRecord;
      return [newRecord, ...prev];
    });

    setProcessNodes((prev) =>
      prev.map((process) => {
        if (process.name !== input.process) return process;
        const nextStatus: ProcessStatus =
          input.severity === "Critical"
            ? "critical"
            : input.severity === "Warning"
              ? process.status === "critical"
                ? "critical"
                : "warning"
              : process.status;
        return {
          ...process,
          defectCount: process.defectCount + input.quantity,
          status: nextStatus,
          mainDefectType: input.defectType,
          affectedBatch: input.batchId || process.affectedBatch,
        };
      }),
    );

    if (input.severity === "Warning" || input.severity === "Critical") {
      setAlerts((prev) => [
        {
          id: `AL-${String(prev.length + 1).padStart(3, "0")}`,
          severity: input.severity,
          process: input.process,
          message: `${input.product} batch ${input.batchId || "(unspecified)"} reported ${input.defectType} (qty ${input.quantity}).`,
          timestamp: ts,
        },
        ...prev,
      ]);
    }

    return createdRecord;
  }, []);

  const value = useMemo<AppState>(
    () => ({
      role,
      setRole,
      page,
      setPage,
      defectRecords,
      processNodes,
      alerts,
      selectedProcessId,
      setSelectedProcessId,
      submitDefect,
    }),
    [
      role,
      setRole,
      page,
      defectRecords,
      processNodes,
      alerts,
      selectedProcessId,
      submitDefect,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppStore must be used within AppProvider");
  }
  return ctx;
}
