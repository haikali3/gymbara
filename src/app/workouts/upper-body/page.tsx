"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "@/components/time-picker-input";

interface TimePickerDemoProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

function TimePickerDemo({ date, setDate }: TimePickerDemoProps) {
  const [minutes, setMinutes] = React.useState(2);
  const [seconds, setSeconds] = React.useState(30);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Function to handle the countdown timer
  const startCountdown = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current); // Clear any existing timer
    }

    timerRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          return 59;
        } else {
          clearInterval(timerRef.current as NodeJS.Timeout);
          return 0;
        }
      });
    }, 1000);
  };

  // Clean up the timer when component unmounts
  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="text-xs">
          Minutes
        </Label>
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          value={String(minutes).padStart(2, "0")}
          onChange={(e) => setMinutes(Number(e.target.value))}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="seconds" className="text-xs">
          Seconds
        </Label>
        <TimePickerInput
          picker="seconds"
          date={date}
          setDate={setDate}
          value={String(seconds).padStart(2, "0")}
          onChange={(e) => setSeconds(Number(e.target.value))}
        />
      </div>
      <div className="flex h-10 items-center">
        <Clock className="ml-2 h-4 w-4 cursor-pointer" onClick={startCountdown} />
      </div>
    </div>
  );
}

export default TimePickerDemo;
