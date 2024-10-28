// src/pages/api/workouts.js
import workouts from '@/data/workouts.json';

export default function handler(req, res) {
  res.status(200).json(workouts);
}
