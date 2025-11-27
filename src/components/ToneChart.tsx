import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";

interface Props {
    graphData: { date: string; score: number }[];
}

const GraphSection: React.FC<Props> = ({ graphData }) => (
    <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full h-full p-4"
    >

        <div className="w-full h-60">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={graphData}>

                    {/* Градиент линии */}
                    <defs>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--primary)" />
                            <stop offset="50%" stopColor="var(--accent)" />
                            <stop offset="100%" stopColor="var(--secondary)" />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)" />

                    <XAxis
                        dataKey="date"
                        stroke="var(--text)"
                        tick={{ fill: "var(--text)" }}
                    />

                    <YAxis
                        domain={[0, 100]}
                        stroke="var(--text)"
                        tick={{ fill: "var(--text)" }}
                    />

                    <Tooltip
                        contentStyle={{
                            background: "var(--tooltip-bg)",
                            backdropFilter: "blur(6px)",
                            borderRadius: "10px",
                            border: "1px solid var(--tooltip-border)",
                            color: "var(--text)"
                        }}
                    />

                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke="url(#lineGradient)"
                        strokeWidth={3}
                        dot={{
                            r: 4,
                            fill: "var(--accent)",
                            stroke: "var(--accent)"
                        }}
                        activeDot={{
                            r: 6,
                            fill: "var(--accent)",
                            stroke: "#fff",
                            strokeWidth: 2
                        }}
                        isAnimationActive={true}
                        animationDuration={1000}
                        animationEasing="ease-out"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </motion.section>
);

export default GraphSection;
