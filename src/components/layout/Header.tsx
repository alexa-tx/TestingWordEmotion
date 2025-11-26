import React from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

interface Props {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: Props) {
    return (
        <header
            className="w-full py-4 px-8 flex justify-between items-center shadow-md sticky top-0 z-50"
            style={{
                backgroundColor: "var(--background)",
                borderBottom: "1px solid var(--secondary)",
                borderBottomOpacity: 0.3,
            }}
        >
            {/* Логотип */}
            <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold" style={{ color: "var(--primary)" }}>
                    Анализ тональности
                </h1>
            </div>

            {/* Навигация + ThemeToggle */}
            <nav className="flex gap-6 items-center text-lg font-medium">
                <a href="#analysis" className="hover:text-[var(--accent)] transition-colors">
                    Анализ
                </a>
                <a href="#how-it-works" className="hover:text-[var(--accent)] transition-colors">
                    Как это работает
                </a>

                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </nav>
        </header>
    );
}
