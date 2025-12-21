import type { ReactNode } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";
import { AdminOpsProvider } from "../components/admin/AdminOpsProvider";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminOpsProvider>
      <div className="min-h-screen bg-[#f6f8f7]">
        <div className="mx-auto flex min-h-screen max-w-[1400px]">
          <AdminSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <AdminTopbar />
            <main className="min-w-0 flex-1 p-4 sm:p-6">{children}</main>
          </div>
        </div>
      </div>
    </AdminOpsProvider>
  );
}
