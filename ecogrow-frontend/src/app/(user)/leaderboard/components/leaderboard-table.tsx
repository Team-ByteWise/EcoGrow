'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Medal } from 'lucide-react'

interface LeaderboardEntry {
  userId: number
  username: string
  totalTrees: number
  totalCo2Offset: number
}

interface LeaderboardTableProps {
  leaderboardData: LeaderboardEntry[]
}

export function LeaderboardTable({ leaderboardData }: LeaderboardTableProps) {
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((user, index) => (
              <TableRow key={user.userId} className='hover:bg-green-50'>
                <TableCell className="font-medium">
                  {index + 1 <= 3 ? (
                    <Medal className={`inline-block mr-2 ${
                      index + 1 === 1 ? 'text-yellow-500' :
                      index + 1 === 2 ? 'text-gray-400' :
                      'text-amber-600'
                    }`} />
                  ) : null}
                  {index + 1}
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.totalTrees}</TableCell>
                <TableCell>{user.totalCo2Offset} tons</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

