import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface StepperProps {
  initialCount?: number;
  onChange?: (value: number) => void;
}

const Stepper = ({ initialCount = 0, onChange }: StepperProps) => {
  const [count, setCount] = useState(initialCount);

  const setAndNotify = (value: number) => {
    setCount(value);
    if (onChange) onChange(value);
  };

  const increment = () => setAndNotify(count + 1);
  const decrement = () => setAndNotify(count > 0 ? count - 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={decrement}>
        -
      </Button>
      <span className="text-center w-8">{count}</span>
      <Button variant="outline" size="sm" onClick={increment}>
        +
      </Button>
    </div>
  );
};

export default Stepper;
