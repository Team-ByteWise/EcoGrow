"use client";
import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { AdHeader } from "./components/ad-header";

function Page() {
  const [vidLink, setvidLink] = useState("");

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
            onChange={(e) => setvidLink(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          {vidLink && (
            <button
              onClick={() => setvidLink("")}
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
          AD
        </div>
        <div className="basis-4/6 flex justify-center items-center bg-white h-full">
          {vidLink !== "" && <iframe src={vidLink} className="w-full h-full" allowFullScreen={false}></iframe>}
        </div>
        <div className="basis-1/6 flex justify-center items-center bg-gray-200 h-full">
          AD
        </div>
      </div>
    </div>
  );
}

export default Page;
