import React, { useState } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import HeroSection from "../../components/HeroSection";
import ModeToggle from "../../components/ModeToggle";
import SingleAnalysis from "../../components/SingleAnalysis";
import BatchAnalysis from "../../components/BatchAnalysis";
import SatisfactionLine from "../../components/SatisfactionLine";
import ToneChart from "../../components/ToneChart";
import PositivePercentage from "../../components/PositivePercentage";
import HistorySection from "../../components/HistorySection";

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
        <div className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--text)" }}>
            <HeroSection />
            <ModeToggle mode={mode} setMode={setMode} />
            <section className="flex flex-col lg:flex-row justify-center items-start gap-6 px-6">
                {mode === "single" ? (
                    <SingleAnalysis textInput={textInput} setTextInput={setTextInput} satisfaction={satisfaction} setSatisfaction={setSatisfaction} />
                ) : (
                    <BatchAnalysis file={file} setFile={setFile} satisfaction={satisfaction} setSatisfaction={setSatisfaction} />
                )}
            </section>
            <SatisfactionLine satisfaction={satisfaction} />
            <ToneChart graphData={graphData} />
            <PositivePercentage percentage={70} />
            <HistorySection />
        </div>
    );
}
