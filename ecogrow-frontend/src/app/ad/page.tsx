"use client";
import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { AdHeader } from "./components/ad-header";
import Image from "next/image";

const youtubeRegex =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S+)?$/;

function extractVideoId(url: string): string | null {
  const match = url.match(youtubeRegex);
  return match ? match[1] : null;
}

function Page() {
  const [vidLink, setVidLink] = useState("");
  const [actualVideoLink, setActualVideoLink] = useState("");

  useEffect(() => {
    const videoId = extractVideoId(vidLink);
    if (videoId) {
      setActualVideoLink(`https://www.youtube.com/embed/${videoId}`);
    } else {
      setActualVideoLink("");
    }
  }, [vidLink]);


  return (
    <div className="w-screen h-screen bg-green-50 flex flex-col">
      <AdHeader />
      {/* Search Bar */}
      <div className="w-screen flex justify-center items-center p-8">
        <div className="relative w-full max-w-md">
          <input
            type="url"
            placeholder="YouTube Video Link"
            value={vidLink}
            onChange={(e) => setVidLink(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          {vidLink && (
            <button
              onClick={() => setVidLink("")}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Ad and Video Section */}
      <div className="flex flex-1 md:items-center md:justify-center w-full md:flex-row flex-col">
        <div className="basis-1/6 flex justify-center items-center bg-gray-200 h-full">
          <Image src="/ads/adv1.jpg" alt="Ad1" className="w-full h-full" width={100} height={100} />
        </div>
        <div className="basis-4/6 flex justify-center items-center bg-white h-full">
          {actualVideoLink !== "" && <iframe src={actualVideoLink} className="w-full h-full" allowFullScreen={false}></iframe>}
        </div>
        <div className="basis-1/6 flex justify-center items-center bg-gray-200 h-full">
          <Image src="/ads/adv2.jpg" alt="Ad2" className="w-full h-full" width={100} height={100} />
        </div>
      </div>
    </div>
  );
}

export default Page;
