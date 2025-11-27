import React, { useState } from "react";
import { Upload, FileText } from "lucide-react";
import { FaSmile, FaFrown, FaMeh } from "react-icons/fa";
import { uploadTextAndGetAnalysis } from "../api/groups";
import { GroupResponse } from "../api/client";

interface Props {
  file: File | null;
  setFile: (file: File | null) => void;
  onAnalyze: (data: GroupResponse) => void; // возвращаем результат в Home
}

export default function BatchAnalysis({ file, setFile, onAnalyze }: Props) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileText, setFileText] = useState("");

  const handleAnalyze = async () => {
    if (!file && !fileText) return;

    setIsUploading(true);
    setUploadProgress(0);
    setAnalyzed(false);
    setError(null);

    try {
      const interval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 100);

      let resultFromApi: any;

      if (file) {
        const textFromFile = await file.text();
        resultFromApi = await uploadTextAndGetAnalysis(textFromFile);
      } else {
        resultFromApi = await uploadTextAndGetAnalysis(fileText);
      }

      clearInterval(interval);
      setUploadProgress(100);
      setAnalyzed(true);

      // Преобразуем результат в GroupResponse из client.ts
      const result: GroupResponse = {
        ...resultFromApi,
        timeGenerated: new Date().toISOString(), // добавляем обязательное поле
      };

      onAnalyze(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Ошибка при анализе");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 p-8 rounded-3xl bg-[var(--background)]/40 border border-[var(--border)] shadow-[0_0_35px_var(--accent)/15] backdrop-blur-xl">

      {/* Upload Area */}
      <label
        className={`flex flex-col items-center justify-center w-full p-12 rounded-2xl border-2 border-dashed border-[var(--border)]/40 cursor-pointer hover:shadow-[0_0_15px_var(--accent)] hover:bg-[var(--accent)]/5 transition-all ${isUploading ? 'opacity-60 pointer-events-none' : ''}`}
      >
        <Upload className="w-16 h-16 text-[var(--accent)] transition-transform" />
        <p className="mt-4 text-lg opacity-80 text-[var(--text)]">Перетащите файл сюда или нажмите для выбора</p>
        <input
          type="file"
          accept=".csv,.txt,.json"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="hidden"
        />
      </label>

      {/* File Preview */}
      {file && (
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--secondary)]/10 border border-[var(--border)]/40">
          <FileText className="w-6 h-6 text-[var(--accent)]" />
          <span className="text-sm text-[var(--text)] font-medium">{file.name}</span>
        </div>
      )}

      {/* Text Area */}
      <textarea
        placeholder="Или вставьте текстовые отзывы здесь..."
        value={fileText}
        onChange={(e) => setFileText(e.target.value)}
        style={{
          backgroundColor: "var(--input-bg)",
          color: "var(--text)",
          borderColor: "var(--border)"
        }}
        className="w-full p-6 rounded-2xl focus:outline-none focus:border-[var(--accent)]/80 focus:drop-shadow-[0_0_8px_var(--accent)] shadow-inner min-h-[200px] resize-none transition-colors"
      />

      {/* Supported Formats */}
      <div className="text-sm text-[var(--text)]/70 italic">
        Поддерживаемые форматы: <b>CSV</b> - столбец "text" с отзывами, <b>TXT</b> - один отзыв на строку, <b>JSON</b> - массив объектов с полем "text".
      </div>

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        disabled={isUploading || (!file && !fileText)}
        className={`w-full py-5 rounded-2xl text-lg font-semibold tracking-wide bg-[var(--primary)] text-white shadow-[0_0_22px_var(--primary)/60] hover:shadow-[0_0_35px_var(--primary)/80] hover:-translate-y-1 transition-all active:translate-y-1 active:shadow-[0_0_15px_var(--primary)/40] ${isUploading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {isUploading ? `Загрузка... ${uploadProgress}%` : 'Запустить анализ'}
      </button>

      {/* Progress Bar */}
      {isUploading && (
        <div className="w-full bg-[var(--secondary)]/20 rounded-2xl overflow-hidden h-5 mt-3">
          <div
            className="h-full rounded-2xl transition-all duration-100"
            style={{ width: `${uploadProgress}%`, background: 'linear-gradient(90deg, #e74c3c, #f1c40f, #27ae60)' }}
          ></div>
        </div>
      )}

      {/* Error */}
      {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
    </div>
  );
}
