import { AdminFooter } from "./components/Admin-Footer";
import { AdminHeader } from "./components/header";
import { AdminProvider } from "./context/AdminContext"; // Import UserProvider

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-green-50/30">
        <AdminHeader />
        <main className="container mx-auto px-4 py-6">{children}</main>
        <AdminFooter />
      </div>
    </AdminProvider>
  );
}
