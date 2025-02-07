import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const leaderboardData = [
  { name: 'Sarah K.', trees: 342, rank: 1 },
  { name: 'Mike R.', trees: 315, rank: 2 },
  { name: 'Alex M.', trees: 287, rank: 3 },
  { name: 'Chris P.', trees: 264, rank: 4 },
  { name: 'Emma S.', trees: 251, rank: 5 },
]

export function Leaderboard() {
  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Leaderboard Snapshot</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboardData.map((user) => (
            <div
              key={user.name}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-medium">
                  {user.rank}
                </div>
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {user.trees} trees
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button className="mt-6 w-full">View Full Leaderboard</Button>
      </CardContent>
    </Card>
  )
}

