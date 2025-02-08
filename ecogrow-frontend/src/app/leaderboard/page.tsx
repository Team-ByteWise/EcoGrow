"use client";

import { LeaderboardHeader } from './components/leaderboard-header'
import { UserProfileHighlight } from './components/user-profile-highlight'
import { LeaderboardTable } from './components/leaderboard-table'
import { TopContributors } from './components/top-contributors'
import { GlobalImpactTracker } from './components/global-impact-tracker'
import { LeaderboardFooter } from './components/leaderboard-footer'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '@/lib/constants';

// Mock data - in a real app, this would come from an API
const leaderboardData = [
  { id: 1, rank: 1, username: "EcoWarrior", treesPlanted: 1000, co2Offset: 20000, tokensEarned: 5000 },
  { id: 2, rank: 2, username: "GreenGuru", treesPlanted: 950, co2Offset: 19000, tokensEarned: 4750 },
  { id: 3, rank: 3, username: "TreeHugger", treesPlanted: 900, co2Offset: 18000, tokensEarned: 4500 },
  { id: 4, rank: 4, username: "NatureLover", treesPlanted: 850, co2Offset: 17000, tokensEarned: 4250 },
  { id: 5, rank: 5, username: "EarthGuardian", treesPlanted: 800, co2Offset: 16000, tokensEarned: 4000 },
  // Add more mock data as needed
]

interface LeaderboardEntry {
  userId: number,
  username: string;
  totalTrees: number;
  totalCo2Offset: number;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [randomUser, setRandomUser] = useState<LeaderboardEntry | null>(null);
  const [topContributors, setTopContributors] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/leaderboard`)
      .then((res) => {
        // Sort according to totalCo2Offset
        res.data.sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.totalCo2Offset - a.totalCo2Offset);
        setLeaderboard(res.data);
        setRandomUser(res.data.filter((user: LeaderboardEntry) => user.totalTrees !== 0 && user.totalCo2Offset !== 0)[Math.floor(Math.random() * res.data.length)]);
        setTopContributors(res.data.slice(0, 3));
      });
  }, []);



  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <LeaderboardHeader />
        <div className="mt-8 space-y-8">
          {randomUser && (
            <UserProfileHighlight rank={leaderboard.indexOf(randomUser) + 1} username={randomUser.username} treesPlanted={randomUser.totalTrees} co2Offset={randomUser.totalCo2Offset} />
          )}
          <LeaderboardTable leaderboardData={leaderboard} />
          <TopContributors contributors={topContributors} />
          <GlobalImpactTracker treesPlanted={0} co2Offset={0} />
        </div>
      </main>
      <LeaderboardFooter />
    </div>
  )
}

