"use client";

import { UserProfileHighlight } from './components/user-profile-highlight'
import { LeaderboardTable } from './components/leaderboard-table'
import { TopContributors } from './components/top-contributors'
import { GlobalImpactTracker } from './components/global-impact-tracker'
import { LeaderboardFooter } from './components/leaderboard-footer'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '@/lib/constants';

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

