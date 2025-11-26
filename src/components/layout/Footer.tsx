import React from "react";

export default function Footer() {
    return (
        <footer
            className="w-full py-6 text-center"
            style={{
                backgroundColor: "var(--background)",
                borderTop: "1px solid var(--secondary)",
                borderTopOpacity: 0.3, // слегка видимая обводка
                color: "var(--text)",
            }}
        >
            © {new Date().getFullYear()} Sentiment ML
        </footer>
    );
}
