import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

interface Props {
    graphData: { date: string; score: number }[];
}

const GraphSection: React.FC<Props> = ({ graphData }) => (
    <section className="flex flex-col items-center py-16 px-6 gap-8 w-full max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--primary)" }}>
            Изменение тональности по датам
        </h3>
        <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={graphData}>
                    {/* Градиент для линии */}
                    <defs>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--primary)" />
                            <stop offset="50%" stopColor="var(--accent)" />
                            <stop offset="100%" stopColor="var(--secondary)" />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />

                    {/* Линия с градиентом и плавной анимацией */}
                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke="url(#lineGradient)"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        isAnimationActive={true}
                        animationDuration={1000}
                        animationEasing="ease-out"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </section>
);

export default GraphSection;
