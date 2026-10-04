import { DashboardShell } from "@/features/dashboard";
import { RequireAuth } from "@/components/auth";

export default function DashboardPage() {
  return (
    <RequireAuth>
      <DashboardShell />
    </RequireAuth>
  );
}
