"use client";
import TimePickerDialog from '@/components/_time-picker/time-picker-dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Dumbbell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Header = () => {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-center w-full relative gap-1">
        <Dumbbell className="h-5 w-5 text-gray-800" />
        <h2 className="pl-1 text-3xl font-semibold text-gray-800 text-center">
          full body
        </h2>
      </div>
      <div className="flex items-center justify-between pb-1">
        <Button onClick={() => router.back()} size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {/* Timer Button with Dialog */}
        <TimePickerDialog />
      </div>
    </div>
  );
};

export default Header;
