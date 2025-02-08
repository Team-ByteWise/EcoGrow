'use client'

import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const achievements = [
  {
    title: 'Forest Guardian',
    description: 'Plant 100 trees',
    progress: 80,
    icon: '🌳',
  },
  {
    title: 'CO₂ Warrior',
    description: 'Offset 1000kg of CO₂',
    progress: 65,
    icon: '🌿',
  },
  {
    title: 'Community Leader',
    description: 'Invite 10 friends',
    progress: 40,
    icon: '👥',
  },
]

export function Achievements() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your Badges & Milestones</CardTitle>
        <Award className="h-5 w-5 text-yellow-500" />
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <h4 className="font-medium">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              </div>
              <Progress value={achievement.progress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {achievement.progress}% Complete
              </p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

