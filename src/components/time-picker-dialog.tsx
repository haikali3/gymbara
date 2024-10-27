import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogHeader } from "@/components/ui/dialog"; // Use your custom dialog component
import TimePickerDemo from "./time-picker-demo";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TimePickerDialog() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const startTimer = () => {
    setIsTimerRunning(true);
    // Additional logic to start the timer countdown if needed
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Timer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] justify-center">
        <DialogHeader>
          <DialogTitle>Set Timer</DialogTitle>
        </DialogHeader>
        {/* Timer */}
        <TimePickerDemo date={date} setDate={setDate} />
        <Button onClick={startTimer} className="mt-4 w-full">
          Start
        </Button>
      </DialogContent>
    </Dialog>
  );
}
