import { useState } from 'react'
import { Button } from './ui/button';

const Stepper = ({ initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 0 ? count - 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={decrement}>-</Button>
      <span className="text-center w-8">{count}</span>
      <Button variant="outline" size="sm" onClick={increment}>+</Button>
    </div>
  )
}

export default Stepper