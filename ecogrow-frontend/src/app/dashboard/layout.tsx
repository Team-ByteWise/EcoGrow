import { DashboardHeader } from './components/dashboard-header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-green-50/30">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  )
}

