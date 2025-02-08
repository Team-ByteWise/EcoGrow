"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface LeaderboardProps {
  leaderboardData: {
    username: string
    trees: number
    totalCo2Offset: number
  }[]
}

export function Leaderboard({ leaderboardData }: LeaderboardProps) {
  const router = useRouter();
  
  leaderboardData.sort((a, b) => b.totalCo2Offset - a.totalCo2Offset)
  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Leaderboard Snapshot</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboardData.map((user, index) => (
            <div
              key={user.username}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-medium">
                  {index + 1}
                </div>
                <Avatar>
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${user.username}`} />
                  <AvatarFallback>{user.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-muted-foreground">
                    {user.trees} trees
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button className="mt-6 w-full" onClick={() => router.push('/leaderboard')}>View Full Leaderboard</Button>
      </CardContent>
    </Card>
  )
}

