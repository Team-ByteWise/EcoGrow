'use client';

import React, { useState } from 'react';
import CampaignList from './components/CampaignList';
import TreeList from './components/TreeList';

// Mock data (you'll replace this with actual API calls)
const mockCampaigns = [
  {
    id: 1,
    name: "La Pedregoza",
    description: "Our project focuses on afforestation and reforestation in the Orinoco River basin of Colombia...",
    image: "https://treenation-uploads.s3.eu-central-1.amazonaws.com/project-efa7732a9f5e5bdc2163ac00954b0ded.webp",
    latitude: 6.08824,
    longitude: -67.723885,
    min_price: 3
  }
];

const mockTrees = [
  {
    id: 12,
    name: "Azadirachta indica",
    price: 35,
    stock: 50
  }
];

export default function TokenRedeemPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);
  const [userTokens, setUserTokens] = useState(100); // Mock user tokens

  const handleCampaignSelect = (campaignId: number) => {
    setSelectedCampaign(campaignId);
  };

  const handleTreeOrder = (treeId: number, quantity: number) => {
    // Logic to order trees and deduct tokens
    const tree = mockTrees.find(t => t.id === treeId);
    if (tree && userTokens >= tree.price * quantity) {
      setUserTokens(userTokens - (tree.price * quantity));
      // Here you would also call an API to process the order
      alert(`Ordered ${quantity} ${tree.name} trees!`);
    } else {
      alert('Not enough tokens or tree unavailable');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Token Redeeming</h1>
      <div className="flex">
        <div className="w-1/2 pr-4">
          <h2 className="text-xl mb-2">Available Tokens: {userTokens}</h2>
          <CampaignList 
            campaigns={mockCampaigns} 
            onCampaignSelect={handleCampaignSelect} 
          />
        </div>
        <div className="w-1/2 pl-4">
          {selectedCampaign && (
            <TreeList 
              trees={mockTrees} 
              onTreeOrder={handleTreeOrder} 
              userTokens={userTokens}
            />
          )}
        </div>
      </div>
    </div>
  );
}