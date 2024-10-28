import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogHeader, DialogDescription } from "@/components/ui/dialog"; // Use your custom dialog component
import TimePickerDemo from "./time-picker-demo";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Clock } from "lucide-react";

export default function TimePickerDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Clock />
        </Button>
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
