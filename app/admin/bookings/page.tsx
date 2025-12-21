"use client";

import { ColumnDef } from "@tanstack/react-table";
import AdminDataTable from "@/app/components/admin/table/AdminDataTable";

type BookingStatus = "pending" | "confirmed" | "cancelled";

type BookingRow = {
  id: string;
  customer: string;
  packageName: string;
  date: string;
  travellers: number;
  amount: number;
  status: BookingStatus;
};

const bookings: BookingRow[] = [
  {
    id: "BK-1024",
    customer: "Aline M.",
    packageName: "Volcano & Gorilla Trekking",
    date: "2025-01-12",
    travellers: 2,
    amount: 650,
    status: "confirmed",
  },
  {
    id: "BK-1025",
    customer: "John K.",
    packageName: "Akagera Big Five Safari",
    date: "2025-01-15",
    travellers: 4,
    amount: 480,
    status: "pending",
  },
  {
    id: "BK-1026",
    customer: "Fatima S.",
    packageName: "Nyungwe Chimpanzee Trek",
    date: "2025-01-20",
    travellers: 1,
    amount: 420,
    status: "cancelled",
  },
  {
    id: "BK-1027",
    customer: "Moses T.",
    packageName: "Volcano & Gorilla Trekking",
    date: "2025-02-03",
    travellers: 3,
    amount: 650,
    status: "confirmed",
  },
  {
    id: "BK-1028",
    customer: "Grace N.",
    packageName: "Akagera Big Five Safari",
    date: "2025-02-07",
    travellers: 2,
    amount: 480,
    status: "pending",
  },
];

function StatusBadge({ status }: { status: BookingStatus }) {
  const styles =
    status === "confirmed"
      ? "bg-emerald-50 text-emerald-700 border-emerald-900/10"
      : status === "pending"
      ? "bg-amber-50 text-amber-700 border-amber-900/10"
      : "bg-red-50 text-red-700 border-red-900/10";

  const label = status[0].toUpperCase() + status.slice(1);

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-extrabold ${styles}`}
    >
      {label}
    </span>
  );
}

const columns: ColumnDef<BookingRow>[] = [
  {
    accessorKey: "id",
    header: "Booking ID",
    cell: (info) => (
      <span className="font-extrabold">{String(info.getValue())}</span>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "packageName",
    header: "Package",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: (info) => {
      const raw = String(info.getValue());
      return <span className="text-[var(--muted)]">{raw}</span>;
    },
  },
  {
    accessorKey: "travellers",
    header: "Travellers",
    cell: (info) => (
      <span className="text-[var(--muted)]">{Number(info.getValue())}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (info) => {
      const v = Number(info.getValue());
      return <span className="font-extrabold">${v.toFixed(0)}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: (row, id, value) => {
      if (!value || value === "all") return true;
      return row.getValue(id) === value;
    },
    cell: (info) => <StatusBadge status={info.getValue() as BookingStatus} />,
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    cell: () => (
      <button
        type="button"
        className="rounded-xl border border-emerald-900/10 bg-white px-3 py-2 text-xs font-extrabold text-[var(--color-secondary)] hover:bg-emerald-50"
      >
        View
      </button>
    ),
  },
];

export default function AdminBookingsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-[var(--color-secondary)]">
          Bookings
        </h1>
        <p className="mt-1 text-sm font-semibold text-[var(--muted)]">
          View and manage booking requests.
        </p>
      </div>

      <div className="rounded-2xl border border-emerald-900/10 bg-white p-4 shadow-sm sm:p-5">
        <AdminDataTable
          data={bookings}
          columns={columns}
          searchPlaceholder="Search bookings by id, customer, package..."
          pageSize={8}
          renderToolbar={(table) => {
            const statusCol = table.getColumn("status");
            const value = (statusCol?.getFilterValue() as string) ?? "all";

            return (
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-[var(--muted)]">
                    Status
                  </span>
                  <select
                    value={value}
                    onChange={(e) => statusCol?.setFilterValue(e.target.value)}
                    className="rounded-xl border border-emerald-900/10 bg-white px-3 py-2 text-xs font-extrabold text-[var(--color-secondary)]"
                  >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    statusCol?.setFilterValue("all");
                    table.setGlobalFilter("");
                  }}
                  className="rounded-xl border border-emerald-900/10 bg-white px-3 py-2 text-xs font-extrabold text-[var(--color-secondary)] hover:bg-emerald-50"
                >
                  Reset
                </button>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}
