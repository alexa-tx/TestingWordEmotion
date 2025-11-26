import React from "react";
import { useTheme } from "./hooks/useTheme";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home/Home";

function App() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--text)" }}>
            <Header theme={theme} toggleTheme={toggleTheme} />
            <main className="flex-1">
                <Home />
            </main>
            <Footer />
        </div>
    );
}

export default App;
