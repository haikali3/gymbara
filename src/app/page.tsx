"use client";
import { useRouter } from "next/navigation";
import Footer from "../components/_layout/footer";
import Header from "@/components/_layout/header";
import TimePickerDialog from "@/components/_time-picker/time-picker-dialog";
import { Button } from "@/components/ui/button";
import { Dumbbell, ChevronLeft } from "lucide-react";
import { title } from "process";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-2 pt-4 pb-4 flex flex-col">
      <div className="flex items-center justify-center w-full relative gap-1 pb-4">
        <Dumbbell className="h-5 w-5 text-gray-800" />
        <h2 className="pl-1 text-3xl font-semibold text-gray-800 text-center">
          gymbara
        </h2>
      </div>

      <main className="w-full max-w-5xl">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div
            onClick={() => router.push("/workouts")}
            className="bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer hover:shadow-lg p-4"
          >
            <h3 className="text-lg font-semibold text-gray-800">Workouts</h3>
            <p className="text-sm text-gray-600">
              Explore various workout plans for different fitness goals.
            </p>
          </div>

          <div
            onClick={() => router.push("/progress")}
            className="bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer hover:shadow-lg p-4"
          >
            <h3 className="text-lg font-semibold text-gray-800">Progress Tracking</h3>
            <p className="text-sm text-gray-600">
              Track your fitness journey with detailed workout logs.
            </p>
          </div>

          <div
            onClick={() => router.push("/profile")}
            className="bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer hover:shadow-lg p-4"
          >
            <h3 className="text-lg font-semibold text-gray-800">Profile</h3>
            <p className="text-sm text-gray-600">
              Customize your settings and view personal stats.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
