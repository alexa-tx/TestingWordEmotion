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
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#43c341" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </section>
);

export default GraphSection;
