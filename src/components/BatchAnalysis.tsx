import React, { useState } from "react";
import { Upload, FileText } from "lucide-react";
import { FaSmile, FaFrown, FaMeh } from "react-icons/fa";

interface Props {
  file: File | null;
  setFile: (file: File | null) => void;
  satisfaction: number; // 0-100 для демонстрации
  onAnalyze: () => void;
}

export default function BatchAnalysis({ file, setFile, satisfaction, onAnalyze }: Props) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [sentiment, setSentiment] = useState<"Негативный" | "Нейтральный" | "Позитивный">("Нейтральный");
  const [analyzed, setAnalyzed] = useState(false);
  const [fileText, setFileText] = useState("");

  const handleAnalyze = () => {
    if (!file && !fileText) return;
    setIsUploading(true);
    setUploadProgress(0);
    setAnalyzed(false);

    // Определяем sentiment
    if (satisfaction > 60) setSentiment("Позитивный");
    else if (satisfaction < 40) setSentiment("Негативный");
    else setSentiment("Нейтральный");

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setAnalyzed(true);
          onAnalyze();
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  // Цвет фона для sentiment
  const sentimentBg = {
    "Позитивный": "bg-green-500/20",
    "Нейтральный": "bg-gray-500/20",
    "Негативный": "bg-red-500/20"
  }[sentiment];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 p-8 rounded-3xl bg-[var(--background)]/40 border border-[var(--border)] shadow-[0_0_35px_var(--accent)/15] backdrop-blur-xl">
      
      {/* Upload Area */}
      <label
        className={`flex flex-col items-center justify-center w-full p-12 rounded-2xl border-2 border-dashed border-[var(--border)]/40 cursor-pointer hover:shadow-[0_0_15px_var(--accent)] hover:bg-[var(--accent)]/5 transition-all ${isUploading ? 'opacity-60 pointer-events-none' : ''}`}
      >
        <Upload className="w-16 h-16 text-[var(--accent)] group-hover:scale-110 transition-transform" />
        <p className="mt-4 text-lg opacity-80 text-[var(--text)]">Перетащите файл сюда или нажмите для выбора</p>
        <input
          type="file"
          accept=".csv,.txt,.json"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="hidden"
        />
      </label>

      {/* File preview */}
      {file && (
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--secondary)]/10 border border-[var(--border)]/40">
          <FileText className="w-6 h-6 text-[var(--accent)]" />
          <span className="text-sm text-[var(--text)] font-medium">{file.name}</span>
        </div>
      )}

      {/* Text area */}
      <textarea
        placeholder="Или вставьте текстовые отзывы здесь..."
        value={fileText}
        onChange={(e) => setFileText(e.target.value)}
        style={{
            backgroundColor: "var(--input-bg)",  // Используем отдельную переменную для textarea
            color: "var(--text)",
            borderColor: "var(--border)"
        }}
        className="w-full p-6 rounded-2xl focus:outline-none focus:border-[var(--accent)]/80 focus:drop-shadow-[0_0_8px_var(--accent)] shadow-inner min-h-[200px] resize-none transition-colors"
        />

      {/* Supported formats */}
      <div className="text-sm text-[var(--text)]/70 italic">
        Поддерживаемые форматы: <b>CSV</b> - столбец "text" с отзывами, <b>TXT</b> - один отзыв на строку, <b>JSON</b> - массив объектов с полем "text".
      </div>

      {/* Analyze button */}
      <button
        onClick={handleAnalyze}
        className={`w-full py-5 rounded-2xl text-lg font-semibold tracking-wide bg-[var(--primary)] text-white shadow-[0_0_22px_var(--primary)/60] hover:shadow-[0_0_35px_var(--primary)/80] hover:-translate-y-1 transition-all active:translate-y-1 active:shadow-[0_0_15px_var(--primary)/40] ${isUploading ? 'opacity-70 cursor-not-allowed' : ''}`}
        disabled={isUploading}
      >
        {isUploading ? `Загрузка... ${uploadProgress}%` : 'Запустить анализ'}
      </button>

      {/* Progress bar */}
      {isUploading && (
        <div className="w-full bg-[var(--secondary)]/20 rounded-2xl overflow-hidden h-5 mt-3">
          <div
            className="h-full rounded-2xl transition-all duration-100"
            style={{ width: `${uploadProgress}%`, background: 'linear-gradient(90deg, #e74c3c, #f1c40f, #27ae60)', boxShadow: '0 0 10px rgba(39,174,96,0.5)' }}
          ></div>
        </div>
      )}

      {/* Result block */}
      {analyzed && (
        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--background)]/40 shadow-[0_0_25px_var(--accent)/15]">
          <h3 className="text-2xl font-bold mb-3 text-[var(--accent)]">Результат</h3>

          {/* Sentiment */}
          <div className={`flex items-center justify-center text-xl font-bold py-2 px-4 rounded-xl mb-4 ${sentimentBg} text-[var(--text)]`}>
            {sentiment === "Позитивный" && <FaSmile className="mr-2 text-green-400" />}
            {sentiment === "Нейтральный" && <FaMeh className="mr-2 text-gray-400" />}
            {sentiment === "Негативный" && <FaFrown className="mr-2 text-red-400" />}
            {sentiment}
          </div>

          {/* Confidence bar */}
          <div className="mb-4">
            <p className="text-sm text-[var(--accent)] mb-1">Уверенность модели: {satisfaction}%</p>
            <div className="w-full h-4 rounded-full bg-[var(--secondary)]/30 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${satisfaction}%`,
                  background: 'linear-gradient(90deg, #e74c3c, #f1c40f, #27ae60)',
                  boxShadow: '0 0 10px rgba(39,174,96,0.5)'
                }}
              ></div>
            </div>
          </div>

          {/* Additional info */}
          <div className="mt-2 p-3 rounded-xl bg-[var(--secondary)]/10 border border-[var(--border)]/30">
            <p className="text-sm text-[var(--text)]">Файл: {file?.name ?? "–"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
