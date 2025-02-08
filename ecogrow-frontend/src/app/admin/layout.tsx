import { AdminFooter } from "./components/Admin-Footer";
import { AdminHeader } from "./components/header";
import SwitchPages from "./components/SwitchPages";
import { AdminProvider } from "./context/AdminContext"; // Import UserProvider

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>

      <div className="min-h-screen flex flex-col bg-green-50/30">
        <AdminHeader />
        <SwitchPages/>
        
        <main className="container mx-auto px-4 py-6 flex-grow">{children}</main>
        <AdminFooter />
      </div>
    </AdminProvider>
  );
}
