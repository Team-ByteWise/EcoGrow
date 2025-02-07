'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Play, Share2, Clock } from 'lucide-react'
import Link from 'next/link'

export function TokensActivities() {
  const [activeTab, setActiveTab] = useState('earn')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tokens & Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="earn">Earn Tokens</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>
          <TabsContent value="earn" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className='col-span-2'>
                <CardContent className="pt-6 ">
                  <div className="flex items-center justify-center gap-4">
                    <Play className="h-8 w-8 text-green-500" />
                    <div>
                      <h4 className="font-medium">Watch Ads</h4>
                      <p className="text-sm text-muted-foreground">
                        Earn 10 tokens per ad
                      </p>
                    </div>
                  </div>
                  <Link href="/ad"><Button className="mt-4 w-full">Watch Now</Button></Link>
                  
                </CardContent>
              </Card>
              
            </div>
          </TabsContent>
          <TabsContent value="activity">
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

const activities = [
  {
    description: 'Planted 3 trees in Brazil',
    time: '2 hours ago',
  },
  {
    description: 'Watched 2 ads',
    time: '5 hours ago',
  },
  {
    description: 'Earned Forest Guardian badge',
    time: '1 day ago',
  },
]

