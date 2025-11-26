import React from "react";

interface Props {
    percentage: number;
}

export default function PositivePercentage({ percentage }: Props) {
    return (
        <section className="flex flex-col items-center py-12 px-6 gap-4">
            <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--primary)" }}>Общий процент положительных отзывов</h3>
            <div className="w-32 h-32 rounded-full flex items-center justify-center text-3xl font-bold shadow-md" style={{ backgroundColor: "#43c341", color: "#fff" }}>
                {percentage}%
            </div>
        </section>
    );
}
