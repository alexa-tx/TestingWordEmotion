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
            satisfaction={satisfaction}
            onAnalyze={() => {}}
          />
        ) : (
          <BatchAnalysis
            file={file}
            setFile={setFile}
            satisfaction={satisfaction}
            onAnalyze={() => {}}
          />
        )}
      </section>

      <ResultCard/>

      {/* Satisfaction / Slider */}
      <section className="mt-12 px-6 lg:px-16">
        <SatisfactionLine satisfaction={satisfaction} />
      </section>

      {/* Tone / Graph Section */}
      <section className="mt-12 px-6 lg:px-16">
        <GraphSection graphData={graphData} />
      </section>

      {/* Positive Reviews */}
      <section className="mt-12 px-6 lg:px-16">
        <NeonRingProgress />
      </section>

      {/* History */}
      <section className="mt-12 px-6 lg:px-16 mb-16">
        <HistorySection />
      </section>

      
    </div>
  );
}
