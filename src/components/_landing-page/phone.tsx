"use client";

import { useState, useEffect } from "react";
import { Battery, Signal, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";
import { Typography } from "../ui/typography";

export default function Phone() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const apps = [
    {
      name: "Messages",
      color: "bg-gradient-to-br from-green-400 to-green-600",
      icon: "M",
    },
    {
      name: "Calendar",
      color: "bg-gradient-to-br from-gray-200 to-gray-400",
      icon: "C",
    },
    {
      name: "Photos",
      color: "bg-gradient-to-br from-pink-400 to-orange-300",
      icon: "P",
    },
    {
      name: "Camera",
      color: "bg-gradient-to-br from-zinc-700 to-zinc-900",
      icon: "C",
    },
    {
      name: "Weather",
      color: "bg-gradient-to-br from-sky-400 to-sky-600",
      icon: "W",
    },
    {
      name: "Clock",
      color: "bg-gradient-to-br from-black to-gray-800",
      icon: "T",
    },
    {
      name: "Maps",
      color: "bg-gradient-to-br from-slate-200 to-slate-400",
      icon: "M",
    },
    {
      name: "Notes",
      color: "bg-gradient-to-br from-amber-100 to-amber-300",
      icon: "N",
    },
  ];

  return (
    <div className="flex items-center justify-center pt-10 w-full p-1 [mask-image:linear-gradient(black_50%,transparent_90%)]">
      <div className="relative w-[320px] h-[220px] bg-black rounded-t-[45px] overflow-hidden border-[8px] border-black shadow-lg">
        {/* Dynamic Island */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[95px] h-[25px] bg-black rounded-full z-10"></div>

        {/* Screen */}
        <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-8 pt-4 text-black text-xs h-8 z-20">
            <div className="font-medium">{formattedTime}</div>
            <div className="flex items-center gap-1">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4" />
            </div>
          </div>
          <Typography variant="h2" className="mt-4">
            gymbara
          </Typography>

          {/* App Grid */}
          <div className="grid grid-cols-4 gap-5 p-8">
            {apps.map((app, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center text-lg font-medium shadow-sm",
                    app.color
                  )}
                >
                  {app.icon}
                </div>
                <span className="text-xs mt-1.5 text-gray-800">{app.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
