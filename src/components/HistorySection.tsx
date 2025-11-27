import React from "react";
import { useNavigate } from "react-router-dom";

interface Feedback {
  id: number;
  user: string;
  comment: string;
  date: string;
}

interface Props {
  feedbacks: Feedback[];
}

const HistorySection: React.FC<Props> = ({ feedbacks }) => {
  const navigate = useNavigate();
  const latestFeedbacks = feedbacks.slice(0, 5);

  const handleViewAll = () => {
    navigate("/feedback"); // корректный переход на страницу Feedback
  };

  return (
    <section className="flex flex-col items-center py-16 px-6 gap-8 w-full max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold mb-6" style={{ color: "var(--primary)" }}>
        Последние отзывы
      </h3>

      <div className="w-full flex flex-col gap-2">
        {latestFeedbacks.map((fb, index) => (
          <div
            key={fb.id}
            className={`p-4 rounded-2xl backdrop-blur-xl bg-white/20 dark:bg-black/10
                        border border-white/20 dark:border-white/10
                        shadow-lg hover:shadow-xl transition
                        ${index < latestFeedbacks.length - 1 ? "border-b" : ""}`}
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
        onClick={handleViewAll}
        className="mt-6 px-6 py-2 rounded-xl bg-[var(--primary)] text-white font-semibold
                   hover:bg-[var(--accent)] transition"
      >
        Посмотреть все отзывы
      </button>
    </section>
  );
};

export default HistorySection;
