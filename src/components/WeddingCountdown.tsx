import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2026-04-19T12:30:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
}

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      finished: true,
    };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    finished: false,
  };
}

export default function WeddingCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (timeLeft.finished) {
    return (
      <div className="text-center text-3xl font-semibold text-pink-600">
        💖 ¡Hoy es el gran día! 💖
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="flex gap-4">
        <TimeBox label="Días" value={timeLeft.days} />
        <TimeBox label="Horas" value={timeLeft.hours} />
        <TimeBox label="Min" value={timeLeft.minutes} />
        <TimeBox label="Seg" value={timeLeft.seconds} />
      </div>
    </div>
  );
}

interface TimeBoxProps {
  label: string;
  value: number;
}

function TimeBox({ label, value }: TimeBoxProps) {
  return (
    <div className="w-24 h-24 bg-gray-100 backdrop-blur rounded-2xl shadow-md flex flex-col items-center justify-center">
      <span className="text-3xl font-bold text-[#d4af37]">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-sm text-gray-500 uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}
