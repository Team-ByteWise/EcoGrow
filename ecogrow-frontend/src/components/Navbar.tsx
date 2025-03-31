"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Partners", path: "#" },
    { name: "How it works", path: "#work" },
  ];

  return (
    <>
      <div className="w-11/12 fixed top-0 left-0 md:w-screen md:flex items-center justify-between bg-black/40 text-black backdrop-blur-md shadow-md z-[1000]">
        <div className="w-3/12 md:flex justify-center hidden py-3">
          <Link href="#" className="flex justify-center gap-x-2 items-center">
            <Image src="/logo.png" alt="" width={50} height={50} />
            <p className="text-white text-xl font-bold">EcoGrow</p>
          </Link>
        </div>
        <div className="w-6/12 md:flex hidden justify-evenly items-center">
          <ul className="w-full flex justify-evenly">
            {navItems.map((item) => (
              <li key={item.path} className="relative group">
                <Link href={item.path} className="text-white">
                  {item.name}
                </Link>

                {pathname === item.path && (
                  <span className="absolute left-0 bottom-0 w-full h-[3px] bg-white"></span>
                )}
                {pathname !== item.path && (
                  <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-white transition-all duration-200 group-hover:w-full"></span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className=" w-3/12 md:flex hidden justify-center gap-x-4">
          <Link
            href="/login"
            className="px-3 py-1 rounded-lg border-2 bg-[#35452B]/30 border-white text-white"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="px-3 py-1 rounded-lg bg-green-600 hover:bg-green-600/80 text-white"
          >
            Sign up
          </Link>
        </div>
        {/* Hamburger Button - Only Visible on Mobile */}
        <div className="fixed top-0 left-0 w-screen px-6 py-3 flex flex-col items-start bg-black/40 backdrop-blur-md shadow-md z-[1000]">
          <button
            className="md:hidden rounded focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {!menuOpen ? <Menu color="white" size={28} /> : <></>}
          </button>
          {/* Mobile Menu - Only Visible When Open */}
          {menuOpen && (
            <div className="bg-white/10 w-full flex flex-col items-start p-3">
              <button
                className="md:hidden p-2 rounded focus:outline-none"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X color="white" size={28} /> : <></>}
              </button>
              <ul className=" relative w-full flex flex-col gap-y-3 justify-evenly">
                {navItems.map((item) => (
                  <li key={item.path} className=" w-full relative group">
                    <Link href={item.path} className="text-white">
                      {item.name}
                    </Link>

                    {pathname === item.path && (
                      <span className="absolute left-0 bottom-0 w-full h-[3px] bg-white"></span>
                    )}
                    {pathname !== item.path && (
                      <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-white transition-all duration-200 group-hover:w-full"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
