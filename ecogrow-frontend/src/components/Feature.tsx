import Image from "next/image";
import React from "react";

const Feature = () => {
  return (
    <div className="py-[60px] px-10 bg-green-100">
      <div className="py-16  flex justify-center items-center">
        <div className="w-1/2 flex justify-center">
          <Image src="/feature1.jpg" alt="" width={400} height={400} />
        </div>
        <div className=" w-1/2 flex flex-col justify-center items-center gap-y-5">
          <p className="text-3xl font-bold">ECO TIPS AT YOUR FINGERTIPS</p>
          <p className="text-lg text-center">
            Discover daily eco-tips, sustainability insights, and in-depth
            articles on environmental conservation to inspire a greener, more
            sustainable lifestyle
          </p>
        </div>
      </div>
      <div className="py-16 flex justify-center items-center">
        <div className=" w-1/2 flex flex-col justify-center items-center gap-y-5">
          <p className="text-3xl">LET US BUILD A GREEN MAP</p>
          <p className="text-lg text-center">
            Explore a real-time global map showcasing tree planting locations.
            Zoom in, click markers to discover tree species, local projects, and
            contributions to reforestation efforts worldwide.
          </p>
        </div>
        <div className="w-1/2 flex justify-center">
          <Image src="/feature1.jpg" alt="" width={400} height={400} />
        </div>
      </div>
    </div>
  );
};

export default Feature;
