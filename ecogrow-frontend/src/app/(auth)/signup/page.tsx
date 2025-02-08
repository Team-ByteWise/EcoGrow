"use client"

import { type FormEvent, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { BASE_URL } from "@/lib/constants"
import axios from "axios"

const SignUpPage = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isMobile, setIsMobile] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    if (!email || !password || !username) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    try {
      axios.post(`${BASE_URL}/auth/signup`, {
        username,
        email,
        password,
      }).then((res) => {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        router.push("/dashboard");
      })
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (

    <main className="relative h-screen w-full overflow-hidden">

      {/* Base white section */}
      <div className="absolute inset-0 bg-[#FFFFFF]" />

      {/* Dark section with curved boundary for non-mobile */}
      {!isMobile && (
        <div className="absolute inset-0">
          <svg
            className="h-full w-full"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 0 C 70 40, 40 50, 50 100 L 100 100 L 100 0 Z"
              fill="#11231B"
              className="transition-all duration-500 ease-in-out"
            />
          </svg>
        </div>
      )}

      {/* Content container */}
      <div className="relative">
        <img src="assets/Logo.png" className="absolute top-0 left-0 mt-1 ml-1 scale-50"></img>
      </div>
      <div className="relative h-full w-full">
        <div className="grid h-full grid-cols-1 md:grid-cols-2">
          {/* Left section - Sign Up form */}
          <div className="flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6 text-center text-[#11231B]">Sign Up</h2>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[#11231B]">Username</label>
                  <input
                    type="text"
                    className="w-full p-2 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#11231B]">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#11231B]">Password</label>
                  <input
                    type="password"
                    className="w-full p-2 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#11231B]">Confirm Password</label>
                  <input
                    type="password"
                    className="w-full p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white p-2 rounded-full hover:bg-green-800 transition mt-10"
                >
                  Sign Up
                </button>
                <p className="text-center text-[#11231B]">
                  Already have an account?{" "}
                  <Link href="/login" className="text-green-700">
                    Log In
                  </Link>
                </p>
              </form>
            </div>

          </div>

          {/* Right section - Image */}
          <div className="hidden md:flex items-center justify-center p-8">
            <div className="relative w-full h-full max-w-md max-h-96 scale-110">
              <Image
                src="/assets/log-in-sign-up.png"
                alt="Login illustration"
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignUpPage

