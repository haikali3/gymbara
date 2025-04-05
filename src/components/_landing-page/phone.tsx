"use client";

import { useState, useEffect, useRef } from "react";
import { Battery, Signal, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";
import { Typography } from "../ui/typography";
import {
  MessageCircle,
  Calendar,
  Image,
  Camera,
  Cloud,
  Clock,
  MapPin,
  FileText,
} from "lucide-react";

export default function Phone({
  className,
  zIndex = 3,
  rotation = 0,
  offsetX = 0,
  offsetY = 0,
  scale = 1,
  isInteractive = true,
}: {
  className?: string;
  zIndex?: number;
  rotation?: number;
  offsetX?: number;
  offsetY?: number;
  scale?: number;
  isInteractive?: boolean;
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.0 });
  const phoneRef = useRef<HTMLDivElement>(null);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isInteractive) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isInteractive, isHovered]);

  // Handle mouse movement for tilt
  const handleMouseMove = (e: MouseEvent) => {
    if (!phoneRef.current || !isHovered) return;

    const rect = phoneRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setMousePosition({ x, y });
  };

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // Tilt effect
  const tiltX = isHovered ? (mousePosition.x - 0.5) * 5 : 0;
  const tiltY = isHovered ? (mousePosition.y - 0.5) * -5 : 0;

  const shadowFilter = isHovered
    ? "drop-shadow(rgba(82, 66, 81, 0.1) 0px 3px 6px) drop-shadow(rgba(82, 66, 81, 0.09) 0px 12px 12px) drop-shadow(rgba(82, 66, 81, 0.05) 0px 26px 16px) drop-shadow(rgba(82, 66, 81, 0.01) 0px 47px 19px) drop-shadow(rgba(82, 66, 81, 0) 0px 73px 20px)"
    : "drop-shadow(rgba(0, 0, 0, 0.1) 0px 4px 6px)";

  return (
    <div className="flex items-center justify-center pt-10 w-full p-1 [mask-image:linear-gradient(black_20%,transparent_90%)]">
      <div
        ref={phoneRef}
        className={cn(
          "relative w-[320px] h-[200px] bg-black rounded-t-[45px] overflow-hidden border-8  border-black duration-300",
          isInteractive && "cursor-pointer",
          className
        )}
        style={{
          zIndex: isHovered ? 10 : zIndex,
          transform: `
          rotate(${rotation}deg)
          translateX(${offsetX + tiltX * 5}px)
          translateY(${offsetY + tiltY * 5}px)
          scale(${isHovered ? scale * 1.05 : scale})
        `,
          filter: shadowFilter,
          // transition: "transform 0.3s ease, filter 0.3s ease",
          transition: "transform 0.5s ease, filter 0.5s ease",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
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
          <Typography variant="h2" className="mt-6">
            gymbara
          </Typography>
          {/* App Grid */}
          {/* <div className="grid grid-cols-4 gap-5 p-8">
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
          </div> */}
        </div>
      </div>
    </div>
  );
}
