"use client";

import { ImpactOverview } from './components/impact-overview'
import { ImpactMap } from './components/impact-map'
import { Leaderboard } from './components/leaderboard'
import { CommunityBanner } from './components/community-banner'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { BASE_URL } from '@/lib/constants';

type TreeApiData = {
  treeName: string,
  projectName: string,
  latitude: number,
  longitude: number,
  quantity: number,
  date: string,
  co2Offset: number,
  imageUrl: string
}

type LeaderboardApiData = {
  userId: number,
  username: string,
  totalTrees: number,
  totalCo2Offset: number
}

export default function DashboardPage() {
  const router = useRouter();
  const [impactOverviewData, setImpactOverviewData] = useState({ treesPlanted: 0, co2Offset: 0, globalRank: 0 });
  const [trees, setTrees] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ latitude: 0, longitude: 0, points: 0 });

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login");
    } else {
      axios.get(`${BASE_URL}/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        const { treesPlanted, totalCo2Offset, rank } = res.data;
        setImpactOverviewData({ treesPlanted, co2Offset: totalCo2Offset, globalRank: rank });
        setTrees(res.data.lastTreesPlanted.map((tree: TreeApiData) => ({
          treeName: tree.treeName,
          projectName: tree.projectName,
          quantity: tree.quantity,
          date: tree.date,
          co2Offset: tree.co2Offset,
          imageUrl: tree.imageUrl
        })));

        const randomNumber = Math.floor(Math.random() * res.data.lastTreesPlanted.length);
        setMapCenter({
          latitude: res.data.lastTreesPlanted[randomNumber].latitude,
          longitude: res.data.lastTreesPlanted[randomNumber].longitude,
          points: res.data.lastTreesPlanted[randomNumber].quantity
        });
        setLeaderboardData(res.data.leaderboard.map((leaderboardData: LeaderboardApiData) => ({
          username: leaderboardData.username,
          trees: leaderboardData.totalTrees,
          totalCo2Offset: leaderboardData.totalCo2Offset
        })));
      });
    }
  }, [router]);

  useEffect(() => {
    console.log(trees);
  }, [trees]);

  return (
    <div className="space-y-6">
      <ImpactOverview {...impactOverviewData} trees={trees} />
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <ImpactMap latitude={mapCenter.latitude} longitude={mapCenter.longitude} points={mapCenter.points} />
        </div>
        <div>
          <Leaderboard leaderboardData={leaderboardData} />
        </div>
      </div>
      <CommunityBanner />
    </div>
  )
}

