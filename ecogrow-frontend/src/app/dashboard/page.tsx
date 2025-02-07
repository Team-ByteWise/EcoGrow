import { ImpactOverview } from './components/impact-overview'
import { Achievements } from './components/achievements'
import { TokensActivities } from './components/tokens-activities'
import { ImpactMap } from './components/impact-map'
import { Leaderboard } from './components/leaderboard'
import { CommunityBanner } from './components/community-banner'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <ImpactOverview />
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Achievements />
          <TokensActivities />
          <ImpactMap />
        </div>
        <div>
          <Leaderboard />
        </div>
      </div>
      <CommunityBanner />
    </div>
  )
}

