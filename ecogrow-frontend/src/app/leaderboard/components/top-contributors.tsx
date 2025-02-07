import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const topContributors = [
  { username: "EcoWarrior", treesPlanted: 1000, reward: "Golden Leaf Badge" },
  { username: "GreenGuru", treesPlanted: 950, reward: "Silver Leaf Badge" },
  { username: "TreeHugger", treesPlanted: 900, reward: "Bronze Leaf Badge" },
]

export function TopContributors() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Contributors This Month</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-3">
        {topContributors.map((contributor, index) => (
          <div key={index} className="flex flex-col items-center text-center bg-green-50 rounded-3xl p-5">
            <Avatar className="h-20 w-20 mb-2">
              <AvatarImage src="/placeholder.svg" alt={contributor.username} />
              <AvatarFallback>{contributor.username[0]}</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold">{contributor.username}</h3>
            <p className="text-sm text-muted-foreground">{contributor.treesPlanted} Trees Planted</p>
            <p className="text-sm font-medium text-green-600">{contributor.reward}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

