"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useEffect,useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export function ImpactMap() {
  const [markers, setMarkers] = useState<{ left: string; top: string }[]>([]);
  function randomPos(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    // Generate positions only on the client
    setMarkers([
      { left: `${randomPos(90, 10)}%`, top: `${randomPos(90, 10)}%` },
      { left: `${randomPos(90, 10)}%`, top: `${randomPos(90, 10)}%` },
      { left: `${randomPos(90, 10)}%`, top: `${randomPos(90, 10)}%` },
    ]);
  }, []);
  

  
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
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d229.6115853154371!2d88.37187317106272!3d22.958130464055607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1738968132137!5m2!1sen!2sin"
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
