import { AppLayout } from "@/components/layout/AppLayout";
import { AppProvider, useAppStore } from "@/store/AppStore";
import { DashboardPage } from "@/pages/DashboardPage";
import { FieldInputPage } from "@/pages/FieldInputPage";
import { TraceabilityPage } from "@/pages/TraceabilityPage";
import { DefectRecordsPage } from "@/pages/DefectRecordsPage";
import { SettingsPage } from "@/pages/SettingsPage";

function PageRouter() {
  const { page } = useAppStore();
  switch (page) {
    case "dashboard":
      return <DashboardPage />;
    case "field-input":
      return <FieldInputPage />;
    case "traceability":
      return <TraceabilityPage />;
    case "defect-records":
      return <DefectRecordsPage />;
    case "settings":
      return <SettingsPage />;
    default:
      return <DashboardPage />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <AppLayout>
        <PageRouter />
      </AppLayout>
    </AppProvider>
  );
}
