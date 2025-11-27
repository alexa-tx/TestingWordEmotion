// src/pages/Feedback/Feedback.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

interface Feedback {
  id: number;
  user: string;
  comment: string;
  date: string;
}

interface Props {
  feedbacks?: Feedback[];
}

// Пример данных (можно заменить на реальный fetch)
const sampleFeedbacks: Feedback[] = [
  { id: 1, user: "Иван Петров", comment: "Отличный сервис!", date: "2025-11-20" },
  { id: 2, user: "Мария Иванова", comment: "Очень довольна результатом.", date: "2025-11-21" },
  { id: 3, user: "Алексей Сидоров", comment: "Все просто супер!", date: "2025-11-22" },
  { id: 4, user: "Елена Смирнова", comment: "Быстро и удобно.", date: "2025-11-23" },
  { id: 5, user: "Дмитрий Кузнецов", comment: "Рекомендую всем!", date: "2025-11-24" },
  { id: 6, user: "Анна Павлова", comment: "Очень профессионально.", date: "2025-11-25" },
];

const FeedbackPage: React.FC<Props> = ({ feedbacks = sampleFeedbacks }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-6 lg:px-16 py-12 flex flex-col items-center bg-[var(--background)] text-[var(--text)]">
      <h1 className="text-3xl font-bold mb-8 text-center" style={{ color: "var(--primary)" }}>
        Все отзывы пользователей
      </h1>

      <div className="w-full max-w-4xl flex flex-col gap-4">
        {feedbacks.map((fb) => (
          <div
            key={fb.id}
            className="p-4 rounded-2xl backdrop-blur-xl bg-white/20 dark:bg-black/10 
                       border border-white/20 dark:border-white/10 shadow-lg hover:shadow-xl transition"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-[var(--text)]">{fb.user}</span>
              <span className="text-xs text-[var(--text)]/60">{fb.date}</span>
            </div>
            <p className="text-[var(--text)]">{fb.comment}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-8 px-6 py-2 rounded-xl bg-[var(--primary)] text-white font-semibold
                   hover:bg-[var(--accent)] transition"
      >
        Назад
      </button>
    </div>
  );
};

export default FeedbackPage;
