'use client'

import { motion } from 'framer-motion'
import { Leaf, TreePine, Trophy } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const stats = [
  {
    icon: TreePine,
    label: 'Trees Planted',
    value: '127',
    color: 'text-green-500',
  },
  {
    icon: Leaf,
    label: 'CO₂ Offset',
    value: '2,540 kg',
    color: 'text-emerald-500',
  },
  {
    icon: Trophy,
    label: 'Global Rank',
    value: '#234',
    color: 'text-yellow-500',
  },
]

export function ImpactOverview() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Your Eco Impact at a Glance</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Your Virtual Forest</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative h-[300px] bg-green-900/10">
            <VirtualForest />
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

function VirtualForest() {
  return (
    <div className="absolute inset-0 grid grid-cols-6 gap-4 p-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="relative aspect-square"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <TreePine className="h-full w-full text-green-600" />
        </motion.div>
      ))}
    </div>
  )
}

