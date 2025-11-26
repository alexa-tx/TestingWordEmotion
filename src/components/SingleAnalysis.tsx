import React from "react";
import { FaSmile, FaFrown } from "react-icons/fa";

interface Props {
    textInput: string;
    setTextInput: (value: string) => void;
    satisfaction: number;
    onAnalyze: () => void;
}

const SingleAnalysis: React.FC<Props> = ({ textInput, setTextInput, satisfaction, onAnalyze }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-6 w-full">
            {/* Левый ввод */}
            <div className="flex flex-col gap-4 w-full lg:w-1/2">
                <textarea
                    placeholder="Введите текст для анализа..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="w-full p-4 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
                    style={{ background: "var(--background)", border: "1px solid var(--secondary)", minHeight: "200px", color: "var(--text)" }}
                />
                <button
                    className="px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:brightness-105 transition"
                    style={{ background: "var(--primary)", color: "var(--background)" }}
                    onClick={onAnalyze}
                >
                    Проанализировать
                </button>
            </div>

            {/* Правый результат */}
            <div className="flex flex-col w-full lg:w-1/2 p-4 rounded-xl shadow-md border-2" style={{ borderColor: "var(--accent)", backgroundColor: "var(--background)" }}>
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--accent)" }}>Результат</h3>
                <p style={{ opacity: 0.85 }}>Здесь появится тональность текста.</p>
                <div className="w-full h-6 mt-4 rounded-full relative" style={{ background: "linear-gradient(to right, #e74c3c, #27ae60)" }}>
                    <div className="absolute top-0" style={{ left: `${satisfaction}%`, transform: "translateX(-50%)" }}>
                        {satisfaction > 50 ? <FaSmile size={24} color="#27ae60" /> : <FaFrown size={24} color="#e74c3c" />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleAnalysis;
