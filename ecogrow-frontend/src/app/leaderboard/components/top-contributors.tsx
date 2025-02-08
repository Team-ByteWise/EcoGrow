import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TopContributor {
  username: string
  totalTrees: number
  totalCo2Offset: number
}

interface TopContributorsProps {
  contributors: TopContributor[]
}

export function TopContributors({ contributors }: TopContributorsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Contributors This Month</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-3">
        {contributors.map((contributor, index) => (
          <div key={index} className="flex flex-col items-center text-center bg-green-50 rounded-3xl p-5">
            <Avatar className="h-20 w-20 mb-2">
              <AvatarImage src="/placeholder.svg" alt={contributor.username} />
              <AvatarFallback>{contributor.username[0]}</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold">{contributor.username}</h3>
            <p className="text-sm text-muted-foreground">{contributor.totalTrees} Trees Planted</p>
            <p className="text-sm font-medium text-green-600">{contributor.totalCo2Offset} CO<sub>2</sub> Offset</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

