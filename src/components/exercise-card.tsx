"use client"
import React, { useState } from 'react';
import Stepper from './stepper';
import { Input } from './ui/input';

interface Exercise {
  name: string;
  defaultSets: number;
}

interface ExerciseCardProps {
  exercise: Exercise;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const [weight, setWeight] = useState(0);
  const [sets, setSets] = useState(exercise.defaultSets);

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(e.target.value));
  };

  const handleSetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSets(Number(e.target.value));
  };

  return (
    <div className="bg-white border border-gray-200 pt-2 rounded-lg shadow-sm w-full max-w-md mx-auto flex flex-col gap-2 sm:gap-6">
      <h2 className="text-base font-normal text-gray-800 text-center">
        {exercise.name}
      </h2>
      <div className="flex items-center justify-between w-full p-2">
        <div className="flex flex-col items-center sm:flex-row gap-2">
          <label className="text-sm text-gray-600">Reps</label>
          <Stepper />
        </div>
        <div className="flex flex-col items-center sm:flex-row gap-2">
          <label className="text-sm text-gray-600">Sets</label>
          <Input
            type="number"
            value={sets}
            onChange={handleSetsChange}
            className="w-20 p-1 border-gray-300 rounded text-center"
            min="1"
          />
        </div>
        <div className="flex flex-col items-center sm:flex-row gap-2">
          <label className="text-sm text-gray-600">Weight (kg)</label>
          <Input
            type="number"
            value={weight}
            onChange={handleWeightChange}
            className="w-20 p-1 border-gray-300 rounded text-center"
            min="0"
          />
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
