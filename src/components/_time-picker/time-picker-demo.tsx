"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TimePickerInput } from "@/components/_time-picker/time-picker-input";
import { Play, Pause } from "lucide-react"; // Import Play and Pause icons
import useTimerStore from "@/stores/timerStore";

function TimePickerDemo() {
  const { minutes, seconds, isRunning, startTimer, pauseTimer, setMinutes, setSeconds } = useTimerStore();

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinutes(Number(e.target.value));
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeconds(Number(e.target.value));
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-end gap-2">
        <div className="grid gap-1 text-center">
          <Label htmlFor="minutes" className="text-xs">Minutes</Label>
          <TimePickerInput
            picker="minutes"
            value={String(minutes).padStart(2, "0")}
            onChange={handleMinutesChange}
            disabled={isRunning} // Disable input when timer is running
          />
        </div>
        <div className="grid gap-1 text-center">
          <Label htmlFor="seconds" className="text-xs">Seconds</Label>
          <TimePickerInput
            picker="seconds"
            value={String(seconds).padStart(2, "0")}
            onChange={handleSecondsChange}
            disabled={isRunning} // Disable input when timer is running
          />
        </div>
      </div>
      <Button onClick={isRunning ? pauseTimer : startTimer} className="w-full mt-4">
        {isRunning ? <Pause /> : <Play />} {/* Conditional rendering of icon */}
        {isRunning ? "Pause" : "Start"}
      </Button>
    </div>
  );
}

export default TimePickerDemo;
