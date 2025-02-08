import Image from "next/image";
import React from "react";

const Feature = () => {
  return (
    <div className="py-12 px-6 bg-green-100">
      {/* First Feature Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 py-10">
        <div className="w-full md:w-1/2 flex justify-center">
          <Image src="/feature1.jpg" alt="Eco Tips" width={400} height={400} className="max-w-full h-auto rounded-lg shadow-md" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-5">
          <p className="text-3xl font-bold text-center">ECO TIPS AT YOUR FINGERTIPS</p>
          <p className="text-lg text-center">
            Discover daily eco-tips, sustainability insights, and in-depth articles on environmental conservation to inspire a greener, more sustainable lifestyle.
          </p>
        </div>
      </div>

      {/* Second Feature Section */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 py-10">
        <div className="w-full md:w-1/2 flex justify-center">
          <Image src="https://plus.unsplash.com/premium_photo-1681488347845-6e310c3dd682?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/feature1.jpg" alt="Green Map" width={400} height={400} className="max-w-full h-auto rounded-lg shadow-md" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-5">
          <p className=" text-lg md:text-3xl font-bold text-center ">LET US BUILD A GREEN MAP</p>
          <p className="text-lg text-center ">
            Explore a real-time global map showcasing tree planting locations. Zoom in, click markers to discover tree species, local projects, and contributions to reforestation efforts worldwide.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feature;
