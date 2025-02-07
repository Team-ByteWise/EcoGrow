'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Medal } from 'lucide-react'

// Mock data - in a real app, this would come from an API
const leaderboardData = [
  { id: 1, rank: 1, username: "EcoWarrior", treesPlanted: 1000, co2Offset: 20000, tokensEarned: 5000 },
  { id: 2, rank: 2, username: "GreenGuru", treesPlanted: 950, co2Offset: 19000, tokensEarned: 4750 },
  { id: 3, rank: 3, username: "TreeHugger", treesPlanted: 900, co2Offset: 18000, tokensEarned: 4500 },
  { id: 4, rank: 4, username: "NatureLover", treesPlanted: 850, co2Offset: 17000, tokensEarned: 4250 },
  { id: 5, rank: 5, username: "EarthGuardian", treesPlanted: 800, co2Offset: 16000, tokensEarned: 4000 },
  // Add more mock data as needed
]

export function LeaderboardTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const [timeFilter, setTimeFilter] = useState('all-time')

  const filteredData = leaderboardData.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-time">All Time</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="this-week">This Week</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Trees Planted</TableHead>
              <TableHead>CO₂ Offset</TableHead>
              <TableHead>Tokens Earned</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user.rank <= 3 ? (
                    <Medal className={`inline-block mr-2 ${
                      user.rank === 1 ? 'text-yellow-500' :
                      user.rank === 2 ? 'text-gray-400' :
                      'text-amber-600'
                    }`} />
                  ) : null}
                  {user.rank}
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.treesPlanted}</TableCell>
                <TableCell>{user.co2Offset}kg</TableCell>
                <TableCell>{user.tokensEarned}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

