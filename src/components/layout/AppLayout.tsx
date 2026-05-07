import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { FloatingChatbot } from "@/components/common/FloatingChatbot";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen min-w-[1280px] bg-slate-100">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
          {children}
        </main>
      </div>
      <FloatingChatbot />
    </div>
  );
}
