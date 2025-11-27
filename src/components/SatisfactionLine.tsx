import React from "react";
import { FaSmile, FaFrown, FaMeh } from "react-icons/fa";
import { motion } from "framer-motion";

interface Props {
  satisfaction: number; // 0-100
}

export default function SatisfactionLine({ satisfaction }: Props) {
  const sentiment = satisfaction > 60 ? "Позитивный" : satisfaction < 40 ? "Негативный" : "Нейтральный";

  const gradient =
    sentiment === "Позитивный"
      ? "linear-gradient(90deg, #33cc6a, #27ae60)"
      : sentiment === "Негативный"
      ? "linear-gradient(90deg, #e74c3c, #ff4d4d)"
      : "linear-gradient(90deg, #f1c40f, #ffc233)";

  const smileAnimation =
    sentiment === "Позитивный"
      ? { scale: [1, 1.1, 1], y: [0, -6, 0] }
      : sentiment === "Негативный"
      ? { scale: [1, 1.05, 1], y: [0, -3, 0] }
      : { scale: [1, 1.05, 1], y: [0, -2, 0] };

  // Цвет смайлика в зависимости от темы
  const smileColor = `var(--smile)`; // в CSS через :root и [data-theme="dark"]

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto py-12">
      <h3 className="text-xl font-semibold mb-6 tracking-wide" style={{ color: "var(--primary)" }}>
        Линия удовлетворенности граждан
      </h3>

      <div className="relative w-full h-12 rounded-full backdrop-blur-xl border border-white/20 overflow-hidden bg-[var(--line-bg)]">
        {/* Градиент линии */}
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{
            background: gradient,
            backgroundSize: "200% 100%",
            filter: "blur(4px)",
            opacity: 0.7,
          }}
        />

        {/* Маска заполнения */}
        <div
          className="absolute inset-0"
          style={{
            mask: `linear-gradient(90deg, white ${satisfaction}%, transparent ${satisfaction}%)`,
            WebkitMask: `linear-gradient(90deg, white ${satisfaction}%, transparent ${satisfaction}%)`,
          }}
        ></div>

        {/* Смайлик */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ left: `${satisfaction}%`, top: "8px", transform: "translateX(-50%)" }}
          animate={smileAnimation}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {sentiment === "Позитивный" && <FaSmile size={36} color={smileColor} />}
          {sentiment === "Нейтральный" && <FaMeh size={36} color={smileColor} />}
          {sentiment === "Негативный" && <FaFrown size={36} color={smileColor} />}
        </motion.div>
      </div>

      {/* Цифры с процентами под шкалой */}
      <div className="w-full flex justify-between px-2 mt-2 text-xs text-[var(--text)]/60 select-none">
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((val) => (
          <span key={val}>{val}%</span>
        ))}
      </div>

      {/* Текущий процент */}
      <p className="mt-4 font-semibold text-[var(--text)]">
        Уровень удовлетворенности: {satisfaction}%
      </p>
    </div>
  );
}
