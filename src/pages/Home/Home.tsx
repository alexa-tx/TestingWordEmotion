import React, { useState } from "react";
import HeroSection from "../../components/HeroSection";
import ModeToggle from "../../components/ModeToggle";
import SingleAnalysis from "../../components/SingleAnalysis";
import BatchAnalysis from "../../components/BatchAnalysis";
import SatisfactionLine from "../../components/SatisfactionLine";
import GraphSection from "../../components/ToneChart";
import NeonRingProgress from "../../components/PositivePercentage";
import HistorySection from "../../components/HistorySection";
import ResultCard from "../../components/ResultCard/ResultCard";

export default function Home() {
  const [mode, setMode] = useState<"single" | "batch">("single");
  const [textInput, setTextInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [satisfaction, setSatisfaction] = useState(70);

  const graphData = [
    { date: "2025-11-20", score: 65 },
    { date: "2025-11-21", score: 70 },
    { date: "2025-11-22", score: 55 },
    { date: "2025-11-23", score: 80 },
    { date: "2025-11-24", score: 75 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--text)]">
      {/* Hero Section */}
      <HeroSection />

      {/* Mode Toggle */}
      <ModeToggle mode={mode} setMode={setMode} />

      {/* Analysis Panels */}
      <section className="flex flex-col lg:flex-row justify-center items-start gap-6 px-6 lg:px-16 mt-8">
        {mode === "single" ? (
          <SingleAnalysis
            textInput={textInput}
            setTextInput={setTextInput}
            onAnalyze={() => {}}
          />
        ) : (
          <BatchAnalysis
            file={file}
            setFile={setFile}
            onAnalyze={() => {}}
          />
        )}
      </section>

      <ResultCard />

      {/* Dashboard Overview (2×2 Grid) */}
      <section className="mt-16 px-6 lg:px-16">
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: "var(--primary)" }}
        >
          Общая статистика анализа
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* 📌 Блок 1 — Линия удовлетворённости */}
          <div className="p-4 rounded-3xl bg-[var(--input-bg)] dark:bg-black/20 backdrop-blur-xl shadow-lg border border-[var(--border)]">
            <h3 className="text-center mb-3 font-semibold text-[var(--text)]/80">
              Удовлетворённость граждан
            </h3>
            <SatisfactionLine file={file} />
          </div>

          {/* 📌 Блок 2 — Позитивные отзывы (кольцо) */}
          <div className="p-4 rounded-3xl bg-[var(--input-bg)] dark:bg-black/20 backdrop-blur-xl shadow-lg border border-[var(--border)] flex justify-center items-center">
            <div className="w-full">
              <h3 className="text-center mb-3 font-semibold text-[var(--text)]/80">
                Процент позитивных сообщений
              </h3>
              <NeonRingProgress file={file} />
            </div>
          </div>

          {/* 📌 Блок 3 — График */}
          <div className="p-4 rounded-3xl bg-[var(--input-bg)] dark:bg-black/20 backdrop-blur-xl shadow-lg border border-[var(--border)] col-span-1 md:col-span-2">
            <h3 className="text-center mb-3 font-semibold text-[var(--text)]/80">
              Изменение тональности по времени
            </h3>
            <GraphSection graphData={graphData} />
          </div>
        </div>
      </section>

      <HistorySection />
    </div>
  );
}
