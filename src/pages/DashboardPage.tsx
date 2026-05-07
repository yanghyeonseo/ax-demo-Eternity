import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  Gauge,
  Target,
} from "lucide-react";
import dashboardData from "@/data/dashboard.json";
import { KpiCard } from "@/components/common/KpiCard";
import { ProcessFlowMap } from "@/components/dashboard/ProcessFlowMap";
import { ProcessDetailPanel } from "@/components/dashboard/ProcessDetailPanel";
import { DefectTrendChart } from "@/components/dashboard/DefectTrendChart";
import { CostByLineChart } from "@/components/dashboard/CostByLineChart";
import { AnomalyAlertCard } from "@/components/dashboard/AnomalyAlertCard";
import { RecentDefectRecords } from "@/components/dashboard/RecentDefectRecords";
import { useAppStore } from "@/store/AppStore";

export function DashboardPage() {
  const { role } = useAppStore();

  const isLimited = role === "Production Staff";

  return (
    <div className="flex flex-col gap-4 pb-8">
      {/* KPI ROW */}
      <div className="sticky top-[-1.5rem] z-20 -mx-6 -mt-6 border-b border-slate-300 bg-white/96 backdrop-blur">
        <div className="grid grid-cols-5 divide-x divide-slate-200">
          <KpiCard
            label="Yield Rate"
            value={dashboardData.currentYieldRate.toFixed(1)}
            unit="%"
            hint={`Target ${dashboardData.targetYieldRate.toFixed(1)}%`}
            tone="good"
            trend="down"
            trendValue="-0.2%"
            icon={<Gauge className="h-3.5 w-3.5" />}
            layout="strip"
          />
          <KpiCard
            label="Defect Rate"
            value={dashboardData.defectRate.toFixed(1)}
            unit="%"
            hint="Last 24h"
            tone="warning"
            trend="up"
            trendValue="+0.3%"
            icon={<AlertTriangle className="h-3.5 w-3.5" />}
            layout="strip"
          />
          <KpiCard
            label="Critical Batches"
            value={dashboardData.criticalBatches}
            hint="Urgent review"
            tone="critical"
            icon={<AlertOctagon className="h-3.5 w-3.5" />}
            layout="strip"
          />
          <KpiCard
            label="Avg Response Time"
            value={dashboardData.avgResponseTime}
            unit="min"
            hint="Open defects"
            trend="down"
            trendValue="-8 min"
            icon={<Clock className="h-3.5 w-3.5" />}
            layout="strip"
          />
          <KpiCard
            label="Risk Level"
            value={dashboardData.riskLevel}
            hint={`Input ${dashboardData.inputCompletionRate}%`}
            trend="flat"
            trendValue={`Adopt ${dashboardData.fieldAdoptionRate}%`}
            tone="warning"
            icon={<Target className="h-3.5 w-3.5" />}
            layout="strip"
          />
        </div>
      </div>

      {/* PROCESS MAP + DETAIL */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <ProcessFlowMap />
        </div>
        <div className="col-span-4">
          <ProcessDetailPanel />
        </div>
      </div>

      {/* CHARTS + ALERTS + RECORDS */}
      {!isLimited ? (
        <>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-7">
              <DefectTrendChart />
            </div>
            <div className="col-span-5 h-full">
              <AnomalyAlertCard />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-7">
              <CostByLineChart />
            </div>
            <div className="col-span-5 h-full">
              <RecentDefectRecords />
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-7">
            <RecentDefectRecords />
          </div>
          <div className="col-span-5 h-full">
            <AnomalyAlertCard />
          </div>
          <div className="col-span-12 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-4 text-center text-[12.5px] text-slate-500">
            <Activity className="mx-auto mb-1 h-4 w-4 text-slate-400" />
            Production Staff view: cost & yield trend charts are limited.
            Switch role to see full dashboard.
            <CheckCircle2 className="ml-1 inline h-3 w-3 text-emerald-500" />
            <DollarSign className="ml-0.5 inline h-3 w-3 text-emerald-500" />
          </div>
        </div>
      )}
    </div>
  );
}
