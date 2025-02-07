import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function GlobalImpactTracker() {
  // This data would be fetched from an API in a real application
  const globalStats = {
    treesPlanted: 1000000,
    co2Offset: 20000000,
    milestones: ["1 Million Trees Planted", "20,000 Tons of CO₂ Offset"]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Our Global Impact</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-green-600">{globalStats.treesPlanted.toLocaleString()}</h3>
          <p className="text-sm text-muted-foreground">Trees Planted</p>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-green-600">{(globalStats.co2Offset / 1000).toLocaleString()} tons</h3>
          <p className="text-sm text-muted-foreground">CO₂ Offset</p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-green-600">Milestones Achieved</h3>
          <ul className="text-sm text-muted-foreground">
            {globalStats.milestones.map((milestone, index) => (
              <li key={index}>{milestone}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

