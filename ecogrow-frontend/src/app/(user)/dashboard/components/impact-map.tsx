"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

interface ImpactMapProps {
  latitude: number;
  longitude: number;
  points: number;
}

export function ImpactMap({ latitude, longitude, points }: ImpactMapProps) {
  const [markers, setMarkers] = useState<{ left: string; top: string }[]>([]);
  function randomPos(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    if (points === 0) return;
    setMarkers(
      Array.from({ length: points }, () => ({
        left: `${randomPos(90, 10)}%`,
        top: `${randomPos(90, 10)}%`,
      }))
    );
  }, [points]);



  return (
    <Card>
      <CardHeader>
        <CardTitle>See Your Impact Around the World</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[400px] rounded-lg bg-green-100">
          <div className="absolute inset-0 flex items-center justify-center ">
            {/* <p className="text-muted-foreground">Interactive map coming soon...</p> */}

            <iframe
              src={generateGoogleMapsEmbedUrl(latitude, longitude)}
              style={{ pointerEvents: "none" }}
              className="w-full h-full"
            ></iframe>
          </div>
          {/* Map markers */}

          {markers.map((marker, index) => (
            <MapMarker key={index} left={marker.left} top={marker.top} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function MapMarker({ left, top }: { left: string; top: string }) {
  return (
    <div className="absolute animate-bounce" style={{ left, top }}>
      <MapPin className="h-6 w-6 text-green-800 font-bold" />
    </div>
  );
}

function generateGoogleMapsEmbedUrl(latitude: number, longitude: number, zoom: number = 15): string {
  return `https://maps.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`;
}

// Example usage:
const embedUrl = generateGoogleMapsEmbedUrl(6.08824, -67.723885, 18);
console.log(embedUrl);
