import React from "react";

interface StatCard {
  title: string;
  value: string;
  subtitle: string;
}

const stats: StatCard[] = [
  { title: "Проанализировано отзывов", value: "24,567", subtitle: "+12% за месяц" },
  { title: "Точность модели", value: "94.3%", subtitle: "На тестовой выборке" },
  { title: "Среднее время анализа", value: "0.8 сек", subtitle: "Для одного текста" },
  { title: "Позитивных отзывов", value: "68%", subtitle: "От всех обращений" },
];

const AnalysisStats: React.FC = () => {
  return (
    <section className="mt-12 px-6 lg:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center hover:shadow-[0_0_20px_var(--primary)] transition-all"
          >
            <h4 className="text-lg font-semibold mb-2 text-[var(--accent)]">{stat.title}</h4>
            <p className="text-3xl font-bold text-[var(--primary)] mb-1">{stat.value}</p>
            <span className="text-sm text-[var(--text)] opacity-70">{stat.subtitle}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnalysisStats;
