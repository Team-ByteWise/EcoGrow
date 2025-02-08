import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Campaign {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface CampaignListProps {
  campaigns: Campaign[];
  onCampaignSelect: (campaignId: number) => void;
  selectedCampaign: number | null;
}

export default function CampaignList({
  campaigns,
  onCampaignSelect,
  selectedCampaign,
}: CampaignListProps) {
  return (
    <div className="space-y-6">
      {campaigns.map((campaign) => (
        <Card
          key={campaign.id}
          className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
            selectedCampaign === campaign.id ? "ring-2 ring-green-500" : ""
          }`}
        >
          <div className="relative h-48">
            <Image
              src={campaign.image || "/placeholder.svg"}
              alt={campaign.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-xl text-green-800">
              {campaign.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              {campaign.description}
            </CardDescription>
            <Button
              onClick={() => onCampaignSelect(campaign.id)}
              className={`w-full ${
                selectedCampaign === campaign.id
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              } text-white`}
            >
              {selectedCampaign === campaign.id
                ? "Deselect Campaign"
                : "Select Campaign"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
