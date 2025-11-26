import React from "react";

export default function HeroSection() {
    return (
        <section className="flex flex-col items-center text-center py-32 px-6 bg-gradient-to-b from-[var(--secondary)]/10 to-[var(--background)]">
            <h2 className="text-5xl lg:text-6xl font-extrabold mb-6" style={{ color: "var(--primary)" }}>
                Анализ тональности текста
            </h2>
            <p className="text-lg lg:text-xl max-w-3xl mb-8" style={{ color: "var(--text)", opacity: 0.85, lineHeight: 1.8 }}>
                Автоматический анализ сообщений горожан для быстрого и точного понимания их настроений.
            </p>
        </section>
    );
}