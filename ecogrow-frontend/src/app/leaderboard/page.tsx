import { LeaderboardHeader } from './components/leaderboard-header'
import { UserProfileHighlight } from './components/user-profile-highlight'
import { LeaderboardTable } from './components/leaderboard-table'
import { TopContributors } from './components/top-contributors'
import { GlobalImpactTracker } from './components/global-impact-tracker'
import { LeaderboardFooter } from './components/leaderboard-footer'

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-green-50">
      <main className="container mx-auto px-4 py-8">
        <LeaderboardHeader />
        <div className="mt-8 space-y-8">
          <UserProfileHighlight />
          <LeaderboardTable />
          <TopContributors />
          <GlobalImpactTracker />
        </div>
      </main>
      <LeaderboardFooter />
    </div>
  )
}

