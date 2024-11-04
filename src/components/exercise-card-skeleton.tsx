"use client";
import React from 'react';

const ExerciseCardSkeleton: React.FC = () => {
  return (
    <>
      {/* initiate 5 array to of loading card */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="bg-white border border-gray-200 pt-2 rounded-lg shadow-sm w-full max-w-md mx-auto flex flex-col gap-2 sm:gap-6 animate-pulse">
          {/* Exercise name skeleton */}
          <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mt-2"></div>

          <div className="flex items-center justify-between w-full p-2">
            {/* Reps skeleton */}
            <div className="flex flex-col items-center sm:flex-row gap-2">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
              <div className="h-8 bg-gray-200 rounded w-12"></div>
            </div>
            {/* Sets skeleton */}
            <div className="flex flex-col items-center sm:flex-row gap-2">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
              <div className="h-8 bg-gray-200 rounded w-12"></div>
            </div>
            {/* Weight skeleton */}
            <div className="flex flex-col items-center sm:flex-row gap-2">
              <div className="h-4 bg-gray-300 rounded w-20"></div>
              <div className="h-8 bg-gray-200 rounded w-12"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ExerciseCardSkeleton;
