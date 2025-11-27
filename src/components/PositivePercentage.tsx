import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function NeonRingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const radius = 55;
  const stroke = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const getColor = () => {
    if (progress < 40) return "#e74c3c";
    if (progress < 70) return "#f1c40f";
    return "#27ae60";
  };

  return (
    <div className="w-full h-full p-4 flex items-center justify-center">
      <div
        className="
          w-full h-full
          flex flex-col items-center justify-center
          rounded-2xl p-4
          bg-[var(--card)]
          border border-[var(--border)]
          shadow-[0_0_15px_var(--primary)/10]
        "
      >
        <div className="relative flex items-center justify-center">

          {/* Внешнее кольцо */}
          <motion.div
            className="absolute w-[150px] h-[150px] rounded-full"
            animate={{
              boxShadow: [
                "0 0 8px var(--primary)",
                "0 0 14px var(--primary)",
                "0 0 8px var(--primary)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ border: "3px solid var(--primary)" }}
          />

          {/* Прогресс-рисунок */}
          <svg width="160" height="160" className="rotate-[-90deg]">
            {/* Фоновая линия */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="var(--border)"
              strokeWidth={stroke}
              fill="none"
            />

            {/* Прогресс */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke={getColor()}
              strokeWidth={stroke}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.2s linear" }}
            />
          </svg>

          {/* Значение */}
          <div className="absolute text-center">
            <p className="text-[var(--text)] text-2xl font-bold">{progress}%</p>
          </div>
        </div>

        {/* Подпись под прогрессом */}
        <p className="mt-4 text-sm text-[var(--text)]/70 font-medium">
          Текущий прогресс анализа
        </p>
      </div>
    </div>
  );
}
