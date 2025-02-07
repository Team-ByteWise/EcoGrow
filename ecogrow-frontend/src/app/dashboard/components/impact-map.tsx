'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin } from 'lucide-react'

export function ImpactMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>See Your Impact Around the World</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[400px] rounded-lg bg-green-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">Interactive map coming soon...</p>
          </div>
          {/* Map markers */}
          <MapMarker left="20%" top="40%" />
          <MapMarker left="60%" top="30%" />
          <MapMarker left="80%" top="50%" />
        </div>
      </CardContent>
    </Card>
  )
}

function MapMarker({ left, top }: { left: string; top: string }) {
  return (
    <div
      className="absolute animate-bounce"
      style={{ left, top }}
    >
      <MapPin className="h-6 w-6 text-green-600" />
    </div>
  )
}

