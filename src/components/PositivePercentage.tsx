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

  const radius = 70;
  const stroke = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex items-center justify-center w-full h-full p-10">
      
      {/* 🌫️ Glassmorphism Container */}
      <motion.div
        className="
          relative p-10 rounded-3xl 
          backdrop-blur-xl bg-white/10 
          shadow-[0_0_25px_rgba(255,255,255,0.15)] 
          border border-white/20
        "
        animate={{
          boxShadow: [
            "0 0 25px rgba(255,255,255,0.1)",
            "0 0 35px rgba(255,255,255,0.15)",
            "0 0 25px rgba(255,255,255,0.1)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >

        {/* Искусственный блеск стекла сверху */}
        <div className="absolute top-0 left-0 w-full h-full rounded-3xl overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 blur-xl" />
        </div>

        <div className="relative flex items-center justify-center">
          
          {/* Неоновое кольцо вокруг */}
          <motion.div
            className="absolute w-[180px] h-[180px] rounded-full"
            animate={{
              boxShadow: [
                "0 0 15px var(--primary)",
                "0 0 25px var(--primary)",
                "0 0 15px var(--primary)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ border: "4px solid var(--primary)" }}
          />

          {/* Circular Progress */}
          <svg width="200" height="200" className="rotate-[-90deg]">

            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="transparent"
              strokeWidth={stroke}
              fill="none"
            />

            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="var(--primary)"
              strokeWidth={stroke}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.2s linear" }}
            />
          </svg>

          {/* Text */}
          <div className="absolute text-center">
            <p className="text-white text-3xl font-bold drop-shadow-lg">
              {progress}%
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
