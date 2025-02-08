"use client";

import { useState, useRef, useEffect } from "react";
import CampaignList from "./components/CampaignList";
import TreeList from "./components/TreeList";
import { RedeemHeader } from "./components/RedeemHeader";

// Mock data (you'll replace this with actual API calls)
const mockCampaigns = [
  {
    id: 1,
    name: "La Pedregoza",
    description:
      "Our project focuses on afforestation and reforestation in the Orinoco River basin of Colombia...",
    image:
      "https://treenation-uploads.s3.eu-central-1.amazonaws.com/project-efa7732a9f5e5bdc2163ac00954b0ded.webp",
    latitude: 6.08824,
    longitude: -67.723885,
    min_price: 3,
  },
  {
    id: 2,
    name: "Amazon Rainforest",
    description:
      "Help us restore and protect the lungs of our planet in the heart of Brazil...",
    image: "/placeholder.svg?height=200&width=300",
    latitude: -3.4653,
    longitude: -62.2159,
    min_price: 5,
  },
  {
    id: 3,
    name: "Amazon Rainforest",
    description:
      "Help us restore and protect the lungs of our planet in the heart of Brazil...",
    image: "/placeholder.svg?height=200&width=300",
    latitude: -3.4653,
    longitude: -62.2159,
    min_price: 5,
  },
];

const mockTrees = [
  {
    id: 12,
    name: "Azadirachta indica",
    price: 35,
    stock: 50,
    campaignId: 1,
  },
  {
    id: 13,
    name: "Eucalyptus globulus",
    price: 40,
    stock: 30,
    campaignId: 1,
  },
  {
    id: 14,
    name: "Ceiba pentandra",
    price: 45,
    stock: 25,
    campaignId: 2,
  },
  {
    id: 15,
    name: "Swietenia macrophylla",
    price: 50,
    stock: 20,
    campaignId: 2,
  },
  {
    id: 15,
    name: "Swietenia macrophylla",
    price: 50,
    stock: 20,
    campaignId: 3,
  },
];

export default function TokenRedeemPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);
  const [userTokens, setUserTokens] = useState(100); // Mock user tokens
  const treeListRef = useRef<HTMLDivElement>(null);
  const campaignListRef = useRef<HTMLDivElement>(null);

  const handleCampaignSelect = (campaignId: number) => {
    setSelectedCampaign((prevSelected) =>
      prevSelected === campaignId ? null : campaignId
    );
  };

  const handleTreeOrder = (treeId: number, quantity: number) => {
    const tree = mockTrees.find((t) => t.id === treeId);
    if (tree && userTokens >= tree.price * quantity) {
      const newTokens = userTokens - tree.price * quantity;
      setUserTokens(newTokens);
      alert(
        `Redeemed ${quantity} ${tree.name} trees! Remaining tokens: ${newTokens}`
      );
    } else {
      alert("Not enough tokens or tree unavailable");
    }
  };

  useEffect(() => {
    if (selectedCampaign && treeListRef.current) {
      treeListRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (!selectedCampaign && campaignListRef.current) {
      campaignListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedCampaign]);

  return (
    <div className="min-h-screen bg-green-50">
      <RedeemHeader userTokens={userTokens} />
      <main className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6 text-green-800">
          Redeem Your Tokens
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          <section ref={campaignListRef}>
            <h2 className="text-2xl font-semibold mb-4 text-green-700">
              Available Campaigns
            </h2>
            <CampaignList
              campaigns={mockCampaigns}
              onCampaignSelect={handleCampaignSelect}
              selectedCampaign={selectedCampaign}
            />
          </section>
          <section ref={treeListRef}>
            <h2 className="text-2xl font-semibold mb-4 text-green-700">
              Available Trees
            </h2>
            {selectedCampaign ? (
              <TreeList
                trees={mockTrees.filter(
                  (tree) => tree.campaignId === selectedCampaign
                )}
                onTreeOrder={handleTreeOrder}
                userTokens={userTokens}
              />
            ) : (
              <p className="text-gray-600">
                Please select a campaign to view available trees.
              </p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
