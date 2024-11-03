// components/BentoCard.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BentoCardProps {
  title: string;
  description: string;
  onClick: () => void;
  Icon?: LucideIcon;
}

const BentoCard: React.FC<BentoCardProps> = ({ title, description, onClick, Icon }) => (
  <div
    onClick={onClick}
    role="button"
    tabIndex={0}
    className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer hover:shadow-lg p-4 transition-shadow duration-300"
  >
    {Icon && <Icon className="h-8 w-8 text-gray-800 mb-2" />}
    <h3 className="text-lg font-semibold text-gray-800 text-center">{title}</h3>
    <p className="text-sm text-gray-600 text-center">{description}</p>
  </div>
);

export default BentoCard;
