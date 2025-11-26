import React from "react";

interface Props {
    file: File | null;
    setFile: (file: File | null) => void;
    satisfaction: number;
    onAnalyze: () => void;
}

const BatchAnalysis: React.FC<Props> = ({ file, setFile, satisfaction, onAnalyze }) => {
    return (
        <div className="flex flex-col w-full max-w-3xl gap-4">
            <input
                type="file"
                accept=".csv,.txt,.json"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="w-full p-4 rounded-xl border-2 border-[var(--secondary)] bg-[var(--background)] text-[var(--text)]"
            />
            {file && <p className="text-sm text-[var(--accent)]">Файл выбран: {file.name}</p>}
            <textarea
                placeholder="Или вставьте текстовые отзывы здесь..."
                className="w-full p-4 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
                style={{ background: "var(--background)", border: "1px solid var(--secondary)", minHeight: "200px", color: "var(--text)" }}
            />
            <button
                className="px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:brightness-105 transition"
                style={{ background: "var(--primary)", color: "var(--background)" }}
                onClick={onAnalyze}
            >
                Загрузить и проанализировать
            </button>
            <div className="flex flex-col p-4 rounded-xl shadow-md border-2 mt-4" style={{ borderColor: "var(--accent)", backgroundColor: "var(--background)" }}>
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--accent)" }}>Результат</h3>
                <p style={{ opacity: 0.85 }}>Здесь появятся результаты пакетного анализа.</p>
            </div>
        </div>
    );
};

export default BatchAnalysis;
