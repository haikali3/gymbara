import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogHeader, DialogDescription } from "@/components/ui/dialog"; // Use your custom dialog component
import TimePickerDemo from "./time-picker-demo";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TimePickerDialog() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Timer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] justify-center">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        {/* Timer */}
        <TimePickerDemo />
        <DialogDescription>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
