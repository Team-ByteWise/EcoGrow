import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Campaign {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface CampaignListProps {
  campaigns: Campaign[];
  onCampaignSelect: (campaignId: number) => void;
}

export default function CampaignList({ campaigns, onCampaignSelect }: CampaignListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Ongoing Afforestation Campaigns</h2>
      {campaigns.map(campaign => (
        <Card 
          key={campaign.id} 
          onClick={() => onCampaignSelect(campaign.id)}
          className="cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <CardHeader>
            <CardTitle>{campaign.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Image 
              src={campaign.image} 
              alt={campaign.name} 
              width={300} 
              height={200} 
              className="rounded-lg mb-2"
            />
            <CardDescription>{campaign.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}