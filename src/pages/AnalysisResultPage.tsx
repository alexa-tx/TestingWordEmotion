// src/components/AnalysisResultPage.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GroupResponse, Group, Review } from "../api/client";
import NeonRingProgress from "../components/PositivePercentage"; // твой компонент для процента позитивных
import SatisfactionLine from "../components/SatisfactionLine";
import ToneChart from "../components/ToneChart"; 

export default function AnalysisResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as { data?: GroupResponse; file?: File } | undefined;
  const data = state?.data;
  const file = state?.file || null; // если хочешь использовать файл для прогресса

  if (!data) {
    return (
      <div className="p-8 max-w-7xl mx-auto text-center text-[var(--text)]">
        <h1 className="text-3xl font-bold mb-4">Нет данных для отображения</h1>
        <p>Пожалуйста, вернитесь на главную страницу и выполните анализ.</p>
        <button
          className="mt-4 px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-semibold"
          onClick={() => navigate("/")}
        >
          На главную
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">

      <h1 className="text-3xl font-bold text-center mb-6">Результаты анализа</h1>

      {/* Верхний блок с NeonRingProgress и SatisfactionLine */}
      <div className="grid lg:grid-cols-2 gap-6">
        <NeonRingProgress file={file} />
        <SatisfactionLine file={file} />
      </div>

      {/* График тональности */}
      <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--input-bg)] shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">График тональности</h2>
        <ToneChart />
      </div>

      {/* Детальные отзывы */}
      {data.result.groups.map((group: Group) => (
        <div
          key={group.id}
          className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--input-bg)] shadow-sm"
        >
          <h2 className="font-semibold text-lg">{group.name}</h2>
          <p>Дата: {new Date(group.date).toLocaleString()}</p>
          <p>Общий балл: {(group.generalScore * 100).toFixed(1)}%</p>
          <div className="mt-2">
            <h3 className="font-medium">Отзывы:</h3>
            <ul className="list-disc ml-5">
              {group.reviews.map((review: Review) => (
                <li key={review.id}>
                  {review.text} — {review.label} ({(review.confidence * 100).toFixed(1)}%)
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

    </div>
  );
}
