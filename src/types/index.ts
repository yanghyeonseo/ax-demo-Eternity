export type UserRole =
  | "Production Staff"
  | "Quality Engineer"
  | "Production Manager";

export type ProcessStatus = "active" | "warning" | "critical" | "inactive";

export type Severity = "Info" | "Warning" | "Critical";

export type ProcessNode = {
  id: string;
  name: string;
  group: string;
  status: ProcessStatus;
  productLine?: string;
  defectCount: number;
  defectRate: number;
  mainDefectType?: string;
  estimatedCost?: number;
  affectedBatch?: string;
  currentResponse?: string;
  recommendedAction?: string;
  next: string[];
};

export type DefectRecord = {
  id: string;
  timestamp: string;
  company: string;
  product: string;
  batchId: string;
  serialRange: string;
  line: string;
  process: string;
  module: string;
  defectType: string;
  quantity: number;
  severity: Severity;
  status: string;
  owner: string;
  estimatedCost: number;
  currentResponse?: string;
  recommendedAction?: string;
};

export type Alert = {
  id: string;
  severity: Severity;
  process: string;
  message: string;
  timestamp: string;
};

export type BatchTimelineEvent = {
  time: string;
  event: string;
  status: string;
};

export type ModuleStatus = {
  module: string;
  status: string;
};

export type Batch = {
  batchId: string;
  product: string;
  serialRange: string;
  line: string;
  status: string;
  yieldRate: number;
  defectCount: number;
  owner: string;
  mainIssue: string;
  moduleStatus: ModuleStatus[];
  timeline: BatchTimelineEvent[];
};

export type DefectInput = {
  product: string;
  module: string;
  process: string;
  defectType: string;
  quantity: number;
  severity: Severity;
  batchId: string;
  serialRange: string;
  line: string;
  memo?: string;
};

export type RolePermissions = {
  dashboard: "limited" | "full" | "none" | "view";
  fieldInput: "full" | "view" | "none";
  traceability: "basic" | "full" | "none";
  defectRecords: "own" | "full" | "none";
  settings: "none" | "view" | "full";
};

export type RoleDefinition = {
  role: UserRole;
  description: string;
  permissions: RolePermissions;
};

export type RoleConfig = {
  defaultRole: UserRole;
  roles: RoleDefinition[];
};

export type DefectCodeMapping = {
  defectCode: string;
  defectType: string;
  module: string;
  process: string;
};

export type MasterData = {
  products: string[];
  modules: string[];
  processes: string[];
  defectTypes: string[];
  lines: string[];
  severities: Severity[];
  statuses: string[];
  defectCodeMapping: DefectCodeMapping[];
};

export type DashboardData = {
  company: string;
  industry: string;
  currentYieldRate: number;
  targetYieldRate: number;
  defectRate: number;
  criticalBatches: number;
  avgResponseTime: number;
  inputCompletionRate: number;
  fieldAdoptionRate: number;
  riskLevel: string;
  defectTrend: { date: string; defectRate: number; yieldRate: number }[];
  costByCategory: { category: string; amount: number }[];
  costByLine: { line: string; scrap: number; rework: number; claim: number }[];
  defectByProcess: { process: string; defectCount: number; defectRate: number }[];
};

export type PageId =
  | "dashboard"
  | "field-input"
  | "traceability"
  | "defect-records"
  | "settings";
