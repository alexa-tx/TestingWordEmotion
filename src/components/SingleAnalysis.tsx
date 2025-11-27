import React, { useState } from "react";
import { FaSmile, FaFrown, FaMeh } from "react-icons/fa";

interface Props {
  textInput: string;
  setTextInput: (value: string) => void;
  satisfaction: number; // от 0 до 100
  onAnalyze: () => void;
}

export default function SingleAnalysis({
  textInput,
  setTextInput,
  satisfaction,
  onAnalyze,
}: Props) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [displaySatisfaction, setDisplaySatisfaction] = useState(0);
  const [sentiment, setSentiment] = useState<
    "Негативный" | "Нейтральный" | "Позитивный"
  >("Нейтральный");

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setDisplaySatisfaction(0);

    // Определяем sentiment
    if (satisfaction > 60) setSentiment("Позитивный");
    else if (satisfaction < 40) setSentiment("Негативный");
    else setSentiment("Нейтральный");

    const interval = setInterval(() => {
      setDisplaySatisfaction((prev) => {
        if (prev >= satisfaction) {
          clearInterval(interval);
          setIsAnalyzing(false);
          onAnalyze();
          return satisfaction;
        }
        return prev + 1;
      });
    }, 10);
  };

  // Цвет фона для sentiment
  const sentimentBg = {
    Позитивный: "rgba(39, 174, 96, 0.15)",
    Нейтральный: "rgba(128, 128, 128, 0.15)",
    Негативный: "rgba(231, 76, 60, 0.15)",
  }[sentiment];

  // Серый цвет обводки
  const borderGray = "rgba(187, 184, 184, 0.3)";

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto">
      {/* Левый блок: Input */}
      <div
        className="flex flex-col gap-4 w-full lg:w-1/2 p-6 rounded-3xl border backdrop-blur-xl shadow-[0_0_25px_var(--accent)/15]"
        style={{
          backgroundColor: "var(--background)/40",
          borderColor: borderGray,
        }}
      >
        <textarea
          placeholder="Введите текст для анализа..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="w-full p-5 rounded-2xl border shadow-inner focus:outline-none transition min-h-[220px] resize-none"
          style={{
            backgroundColor: "var(--background)/30",
            borderColor: borderGray,
            color: "var(--text)",
          }}
          onFocus={(e) =>
            (e.currentTarget.style.boxShadow =
              "0 0 8px var(--accent), 0 0 12px var(--accent)/50")
          }
          onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
        />
        <button
          className={`py-4 rounded-2xl text-lg font-semibold tracking-wide text-white shadow-[0_0_20px_var(--primary)/60] hover:shadow-[0_0_35px_var(--primary)/80] hover:-translate-y-1 transition-all ${
            isAnalyzing ? "opacity-70 cursor-not-allowed" : ""
          }`}
          style={{ backgroundColor: "var(--primary)" }}
          onClick={handleAnalyze}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? "Анализ..." : "Проанализировать"}
        </button>
      </div>

      {/* Правый блок: Result */}
      <div
        className="flex flex-col w-full lg:w-1/2 p-6 rounded-3xl border backdrop-blur-xl shadow-[0_0_25px_var(--accent)/15]"
        style={{
          backgroundColor: "var(--background)/40",
          borderColor: borderGray,
        }}
      >
        <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--accent)" }}>
          Результат
        </h3>

        {/* Sentiment */}
        <div
          className="flex items-center justify-center text-xl font-bold py-2 px-4 rounded-xl mb-4"
          style={{ backgroundColor: sentimentBg, color: "var(--text)" }}
        >
          {sentiment === "Позитивный" && (
            <FaSmile className="mr-2" style={{ color: "var(--primary)" }} />
          )}
          {sentiment === "Нейтральный" && (
            <FaMeh className="mr-2" style={{ color: "gray" }} />
          )}
          {sentiment === "Негативный" && (
            <FaFrown className="mr-2" style={{ color: "#e74c3c" }} />
          )}
          {sentiment}
        </div>

        {/* Confidence bar */}
        <div className="mb-4">
          <p className="text-sm mb-1" style={{ color: "var(--accent)" }}>
            Уверенность модели: {displaySatisfaction}%
          </p>
          <div
            className="w-full h-4 rounded-full overflow-hidden"
            style={{ backgroundColor: "var(--secondary)/30" }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${displaySatisfaction}%`,
                background: "linear-gradient(90deg, #e74c3c, #f1c40f, #27ae60)",
                boxShadow: "0 0 10px rgba(39, 174, 96,0.5)",
              }}
            ></div>
          </div>
        </div>

        {/* Additional info */}
        <div
          className="mt-2 p-3 rounded-xl border"
          style={{ backgroundColor: "var(--secondary)/10", borderColor: borderGray }}
        >
          <p className="text-sm" style={{ color: "var(--text)" }}>
            Количество символов: {textInput.length}
          </p>
          <p className="text-sm" style={{ color: "var(--text)" }}>
            Количество слов: {textInput.trim().split(/\s+/).length}
          </p>
        </div>
      </div>
    </div>
  );
}
