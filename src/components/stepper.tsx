// Stepper.tsx
import { Button } from "./ui/button";

interface StepperProps {
  value: number;
  onChange: (value: number) => void;
}

const Stepper = ({ value, onChange }: StepperProps) => {
  const increment = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    onChange(value + 1);
  };

  const decrement = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    onChange(value > 0 ? value - 1 : 0);
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={decrement}>
        -
      </Button>
      <span className="text-center w-8">{value}</span>
      <Button variant="outline" size="sm" onClick={increment}>
        +
      </Button>
    </div>
  );
};

export default Stepper;
