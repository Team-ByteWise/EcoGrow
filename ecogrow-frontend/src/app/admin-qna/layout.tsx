
import { QnaHeader } from "./components/QnaHeader";
import SwitchPages from "./components/SwitchPages";
import { UserProvider } from "./context/UserContext"; 

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <div className="min-h-screen w-screen bg-green-50/30">
        <QnaHeader />
        <SwitchPages/>
        <main className="container mx-auto px-4 py-6 w-full">{children}</main>
      </div>
    </UserProvider>
  );
}
