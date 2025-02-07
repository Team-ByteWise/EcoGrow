import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function UserProfileHighlight() {
  // This would be fetched from an API in a real application
  const currentUser = {
    rank: 42,
    username: "GreenThumb",
    treesPlanted: 127,
    co2Offset: 2540,
  }

  return (
    <Card className="bg-green-100 border-green-300">
      <CardContent className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="md:h-16 md:w-16 h-12 w-12">
            <AvatarImage src="/placeholder.svg" alt={currentUser.username} />
            <AvatarFallback className="text-lg md:3xl">{currentUser.username[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-base md:text-2xl font-bold text-green-800">{currentUser.username}</h2>
            <p className="text-green-600 text-sm md:text-xl">Rank: #{currentUser.rank}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-green-800 md:text-base">{currentUser.treesPlanted} Trees Planted</p>
          <p className="text-green-600 text-sm md:text-base">{currentUser.co2Offset}kg CO₂ Offset</p>
        </div>
      </CardContent>
    </Card>
  )
}

