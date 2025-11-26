import React from "react";
import { FaSmile, FaFrown } from "react-icons/fa";

interface Props {
    satisfaction: number;
}

const SatisfactionLine: React.FC<Props> = ({ satisfaction }) => (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto py-8">
        <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--primary)" }}>
            Линия удовлетворенности граждан
        </h3>
        <div className="w-full h-8 rounded-full relative" style={{ background: "linear-gradient(to right, #e74c3c, #27ae60)" }}>
            <div className="absolute top-0" style={{ left: `${satisfaction}%`, transform: "translateX(-50%)" }}>
                {satisfaction > 50 ? <FaSmile size={32} color="#27ae60" /> : <FaFrown size={32} color="#e74c3c" />}
            </div>
        </div>
    </div>
);

export default SatisfactionLine;
