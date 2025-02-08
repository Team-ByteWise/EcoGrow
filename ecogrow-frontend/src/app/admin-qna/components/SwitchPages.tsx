"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function SwitchPages() {
  const pathname = usePathname();

  return (
    <div className="w-screen h-16 flex my-4 justify-around">
      {/* Orders Link */}
      <div className="w-3/12 h-full flex justify-center items-center text-3xl font-bold">
        <Link
          href="/admin"
          className={`w-full py-3 rounded-lg outline outline-green-800 transition text-center hover:scale-105 ease-in-out ${
            pathname === "/admin"
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-green-200 text-green-700 hover:bg-green-300"
          }`}
        >
          Orders
        </Link>
      </div>

      {/* QNA Link */}
      <div className="w-3/12 h-full flex justify-center items-center text-3xl font-bold">
        <Link
          href="/admin-qna"
          className={`w-full py-3 rounded-lg outline outline-green-700 transition text-center hover:scale-105 ease-in-out ${
            pathname === "/admin-qna"
              ? "bg-green-700 text-white hover:bg-green-800"
              : "bg-green-200 text-green-600  hover:bg-green-300"
          }`}
        >
          QNA
        </Link>
      </div>
    </div>
  );
}

export default SwitchPages;
