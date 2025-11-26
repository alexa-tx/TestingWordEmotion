import React from "react";

interface Props {
    mode: "single" | "batch";
    setMode: (mode: "single" | "batch") => void;
}

export default function ModeToggle({ mode, setMode }: Props) {
    const buttonBg = "var(--secondary)";

    return (
        <section className="flex justify-center py-8">
            <div className="flex rounded-2xl overflow-hidden shadow-md">
                <button
                    onClick={() => setMode("single")}
                    className={`px-6 py-2 transition font-semibold ${
                        mode === "single" ? "bg-[var(--primary)] text-[var(--background)]" : `bg-[${buttonBg}] text-[var(--text)]`
                    }`}
                >
                    Одиночный анализ
                </button>
                <button
                    onClick={() => setMode("batch")}
                    className={`px-6 py-2 transition font-semibold ${
                        mode === "batch" ? "bg-[var(--primary)] text-[var(--background)]" : `bg-[${buttonBg}] text-[var(--text)]`
                    }`}
                >
                    Пакетный анализ
                </button>
            </div>
        </section>
    );
}
