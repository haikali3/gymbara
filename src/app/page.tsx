"use client";
import { useRouter } from "next/navigation";
import Footer from "../components/_layout/footer";
import {
  Accessibility,
  ChartNoAxesCombined,
  ChevronRight,
  CircleUserRound,
  Dumbbell,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserDetails } from "./types/type";
import { useQuery } from "@tanstack/react-query";
import { fetchUserDetails } from "@/utils/services/api";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in using TanStack Query v5
  const { data, isLoading, isError, refetch } = useQuery<UserDetails>({
    queryKey: ["userDetails"],
    queryFn: fetchUserDetails,
    enabled: !isLoggedIn, // Only run the query if the user is not already logged in
  });

  // Update the login state based on the query result
  if (data && !isLoggedIn) {
    setIsLoggedIn(true);
  } else if (isError && isLoggedIn) {
    setIsLoggedIn(false);
  }

  // console.log(data?.picture)

  return (
    <div className="min-h-screen bg-gray-50 p-2 pt-4 pb-4 flex flex-col">
      <div className="flex items-center justify-center w-full relative gap-1 pb-4">
        <Dumbbell className="h-5 w-5 text-gray-800" />
        <h2 className="pl-1 text-3xl font-semibold text-gray-800 text-center">
          gymbara
        </h2>
      </div>

      <main className="w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-2">
        <div className="flex-grow bg-white border border-gray-200 rounded-lg col-span-2 shadow-md hover:shadow-lg p-4">
          {isLoggedIn && data ? (
            <div className="flex flex-row items-center justify-between">
              <div className="flex items-center">
                <div>
                  <img
                    src={data.picture}
                    alt="User Profile"
                    className="rounded-full w-10 h-10"
                  />
                </div>
                <div className="flex flex-col pl-4">
                  <h3 className="text-lg font-semibold text-gray-800">{data.name}</h3>
                  <p className="text-sm text-gray-600">{data.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex gap-1 items-center pb-2">
                <CircleUserRound className="h-5 w-5 text-gray-800" />
                <h3 className="text-lg font-semibold text-gray-800">Profile</h3>
              </div>
              <p className="text-sm text-gray-600 pb-2">
                Customize your settings and view personal stats.
              </p>
              <Button onClick={() => router.push(`${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth/login`)}>
                Google Sign-in
              </Button>
            </div>
          )}
        </div>

        <div
          className="bg-white border border-gray-200 rounded-lg shadow-md er hover:shadow-lg p-4"
        >
          <div className="flex gap-1 items-center pb-2">
            <ChartNoAxesCombined className="h-5 w-5 text-gray-800" />
            <h3 className="text-lg font-semibold text-gray-800">Progress</h3>
          </div>
          <p className="text-sm text-gray-600 pb-2">
            Track your fitness journey with detailed workout logs.
          </p>
          <Button disabled onClick={() => router.push("/progress")} >
            <Lock className="h-4 w-4" />
            Soon!
          </Button>
        </div>

        <div
          className="bg-white border border-gray-200 rounded-lg shadow-md er hover:shadow-lg p-4 row-span-2"
        >
          <div className="flex gap-1 items-center pb-2">
            <Accessibility className="h-5 w-5 text-gray-800" />
            <h3 className="text-lg font-semibold text-gray-800">Workouts</h3>
          </div>
          <p className="text-sm text-gray-600 pb-2">
            Explore various workout plans for different fitness goals.
          </p>
          <Button onClick={() => router.push("/workouts")} className="w-full">
            Start now!
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div
          className="flex-grow bg-white border border-gray-200 rounded-lg shadow-md er hover:shadow-lg p-4"
        >
          <div className="flex gap-1 items-center pb-2">
            <CircleUserRound className="h-5 w-5 text-gray-800" />
            <h3 className="text-lg font-semibold text-gray-800">Profile</h3>
          </div>
          <p className="text-sm text-gray-600 pb-2">
            Customize your settings and view personal stats.
          </p>
          <Button disabled onClick={() => router.push("/profile")} >
            <Lock className="h-4 w-4" />
            Soon!
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
