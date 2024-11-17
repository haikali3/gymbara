import { create } from "zustand";

interface TimerState {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  setMinutes: (minutes: number) => void;
  setSeconds: (seconds: number) => void;
  resetTimer: () => void;
}

// Set default initial timer values and limits
const DEFAULT_MINUTES = 2;
const DEFAULT_SECONDS = 30;
const MAX_MINUTES = 10;
const MAX_SECONDS = 59;

const useTimerStore = create<TimerState>((set) => {
  let timerInterval: NodeJS.Timeout | null = null;

  const startTimer = () => {
    set({ isRunning: true });

    if (!timerInterval) {
      timerInterval = setInterval(() => {
        set((state) => {
          // Stop the timer if it reaches 0 : 0
          if (state.minutes === 0 && state.seconds === 0) {
            clearInterval(timerInterval as NodeJS.Timeout);
            timerInterval = null;
            return { minutes: DEFAULT_MINUTES, seconds: DEFAULT_SECONDS, isRunning: false };
          }

          const newSeconds = state.seconds > 0 ? state.seconds - 1 : MAX_SECONDS;
          const newMinutes = state.seconds === 0 ? state.minutes - 1 : state.minutes;

          // Save updated time to sessionStorage (client-side only)
          // ! hydration error typeof window !== "undefined"
          if (typeof window !== "undefined") { 
            sessionStorage.setItem("timerMinutes", String(newMinutes));
            sessionStorage.setItem("timerSeconds", String(newSeconds));
          }

          return {
            minutes: newMinutes < 0 ? 0 : newMinutes,
            seconds: newMinutes < 0 ? 0 : newSeconds,
          };
        });
      }, 1000);
    }
  };

  const pauseTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    set({ isRunning: false });
  };

  // Load values from sessionStorage or set defaults, respecting max limits (client-side only)
  const initialMinutes = typeof window !== "undefined" && sessionStorage.getItem("timerMinutes")
    ? Math.min(Number(sessionStorage.getItem("timerMinutes")), MAX_MINUTES)
    : DEFAULT_MINUTES;
  const initialSeconds = typeof window !== "undefined" && sessionStorage.getItem("timerSeconds")
    ? Math.min(Number(sessionStorage.getItem("timerSeconds")), MAX_SECONDS)
    : DEFAULT_SECONDS;

  return {
    minutes: initialMinutes,
    seconds: initialSeconds,
    isRunning: false,
    startTimer,
    pauseTimer,
    setMinutes: (minutes) => {
      const validMinutes = Math.min(minutes, MAX_MINUTES);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("timerMinutes", String(validMinutes));
      }
      set({ minutes: validMinutes });
    },
    setSeconds: (seconds) => {
      const validSeconds = Math.min(seconds, MAX_SECONDS);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("timerSeconds", String(validSeconds));
      }
      set({ seconds: validSeconds });
    },
    resetTimer: () => {
      // Reset to default values and clear sessionStorage (client-side only)
      if (typeof window !== "undefined") {
        sessionStorage.setItem("timerMinutes", String(DEFAULT_MINUTES));
        sessionStorage.setItem("timerSeconds", String(DEFAULT_SECONDS));
      }
      if (timerInterval) clearInterval(timerInterval);
      set({ minutes: DEFAULT_MINUTES, seconds: DEFAULT_SECONDS, isRunning: false });
    },
  };
});

export default useTimerStore;
