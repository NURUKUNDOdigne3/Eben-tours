import type { ReactNode } from "react";
import { AdminOpsProvider } from "../components/admin/AdminOpsProvider";
import AdminShell from "../components/admin/AdminShell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminOpsProvider>
      <AdminShell>{children}</AdminShell>
    </AdminOpsProvider>
  );
}
