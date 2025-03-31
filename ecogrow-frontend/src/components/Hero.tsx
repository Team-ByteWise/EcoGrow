"use client";

import Navbar from "./Navbar";

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col justify-start items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1505635725851-c2cfe9e29112?q=80&w=1965&auto=format&fit=crop"
          alt="Mystical forest path"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="relative  flex justify-center w-full ">
        <Navbar />
      </div>

      <div className=" h-full flex justify-center items-center">
        <div className="relative z-10 text-center text-white">
          <h1 className="md:text-7xl text-4xl font-bold mb-4">
            Turn Ads Into Forests
          </h1>
          <h2 className="md:text-3xl text-xl mb-8">
            Plant Real Trees from Anywhere!
          </h2>
          <p className="md:text-xl  text-center mb-8 max-w-2xl">
            Watch ads, earn tokens, and fund real-world reforestation projects.
            Join us in making the planet greener!
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
              Get Started
            </button>
            <button className="bg-transparent hover:bg-white hover:text-green-900 text-white font-bold py-2 px-4 rounded border border-white transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
