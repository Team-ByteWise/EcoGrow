import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface GlobalImpactTrackerProps {
  treesPlanted: number
  co2Offset: number
}

export function GlobalImpactTracker({ treesPlanted, co2Offset }: GlobalImpactTrackerProps) {
  // This data would be fetched from an API in a real application
  const globalStats = {
    treesPlanted,
    co2Offset,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Our Global Impact</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-green-600">{globalStats.treesPlanted.toLocaleString()}</h3>
          <p className="text-sm text-muted-foreground">Trees Planted</p>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-green-600">{(globalStats.co2Offset / 1000).toLocaleString()} tons</h3>
          <p className="text-sm text-muted-foreground">CO₂ Offset</p>
        </div>
      </CardContent>
    </Card>
  )
}

