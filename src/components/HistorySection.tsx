import React from "react";
import HistoryList from "./History/HistoryList";

interface Props {
    onClickItem: (id: number) => void;
}

const HistorySection: React.FC<Props> = ({ onClickItem }) => (
    <section className="flex flex-col items-center py-16 px-6 gap-8 w-full max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold mb-6" style={{ color: "var(--primary)" }}>
            История отправки групп отзывов
        </h3>
        <HistoryList onClickItem={onClickItem} />
    </section>
);

export default HistorySection;
