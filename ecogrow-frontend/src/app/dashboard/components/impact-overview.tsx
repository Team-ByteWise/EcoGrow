'use client'

import { motion } from 'framer-motion'
import { HeartHandshake, Leaf, TreePine, Trophy } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

interface TreeData {
  treeName: string
  projectName: string
  quantity: number
  date: string
  co2Offset: number
  imageUrl: string
}

export interface ImpactOverviewProps {
  treesPlanted: number
  co2Offset: number
  globalRank: number
  trees: TreeData[]
}

export function ImpactOverview({ treesPlanted, co2Offset, globalRank, trees }: ImpactOverviewProps) {
  const stats = [
    {
      icon: TreePine,
      label: 'Trees Planted',
      value: treesPlanted.toString(),
      color: 'text-green-500',
    },
    {
      icon: Leaf,
      label: 'CO₂ Offset',
      value: co2Offset.toString(),
      color: 'text-emerald-500',
    },
    {
      icon: Trophy,
      label: 'Global Rank',
      value: globalRank.toString(),
      color: 'text-yellow-500',
    },
  ]
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
            <VirtualForest trees={trees} />
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

interface VirtualForestProps {
  trees: TreeData[]
}

function VirtualForest({ trees }: VirtualForestProps) {
  return (
    <div className="absolute inset-0 grid grid-cols-6 gap-4 p-4">
      {trees.map((tree, i) => (
        <motion.div
          key={i}
          className="relative aspect-square"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <TreeCard treeName={tree.treeName} projectName={tree.projectName} co2Offset={tree.co2Offset} quantity={tree.quantity} imageUrl={tree.imageUrl} />
        </motion.div>
      ))}
    </div>
  )
}

interface TreeCardProps {
  treeName: string
  projectName: string
  co2Offset: number
  quantity: number
  imageUrl: string
}

function TreeCard({ treeName, projectName, co2Offset, quantity, imageUrl }: TreeCardProps) {
  return (
    <Card className='h-max'>
      <CardHeader>
        <Image src={imageUrl} alt={treeName} width={650} height={650} className='w-full pb-3' />
        <CardTitle>{treeName}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <div className="flex items-center gap-2">
            <HeartHandshake className="h-4 w-4 text-green-600" />
            <span>Project: {projectName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-green-600" />
            <span>CO2 Offset: {co2Offset}</span>
          </div>
          <div className="flex items-center gap-2">
            <TreePine className="h-4 w-4 text-green-600" />
            <span>Quantity: {quantity}</span>
          </div>
        </CardDescription>
      </CardContent>
    </Card>);
}

