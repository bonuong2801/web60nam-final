/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { History } from "./components/History";
import { Gallery } from "./components/Gallery";
import { VideoSection } from "./components/VideoSection";
import { Alumni } from "./components/Alumni";
import { TeachersTribute } from "./components/TeachersTribute";
import { Memories } from "./components/Memories";
import { Wishes } from "./components/Wishes";
import { Footer } from "./components/Footer";
import { HallOfFame } from "./components/HallOfFame";
import { TimelineModal } from "./components/TimelineModal";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function App() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowTopBtn(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <ErrorBoundary><Navbar /></ErrorBoundary>
      <ErrorBoundary><TimelineModal /></ErrorBoundary>
      <main className="min-h-screen bg-transparent transition-colors">
        <ErrorBoundary><Hero /></ErrorBoundary>
        <ErrorBoundary><History /></ErrorBoundary>
        <ErrorBoundary><Gallery /></ErrorBoundary>
        <ErrorBoundary><VideoSection /></ErrorBoundary>
        <ErrorBoundary><HallOfFame /></ErrorBoundary>
        <ErrorBoundary><Alumni /></ErrorBoundary>
        <ErrorBoundary><TeachersTribute /></ErrorBoundary>
        <ErrorBoundary><Memories /></ErrorBoundary>
        <ErrorBoundary><Wishes /></ErrorBoundary>
        <ErrorBoundary><Footer /></ErrorBoundary>
      </main>

      {/* Back to top button */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            title="Về đầu trang"
            className="fixed bottom-6 right-6 z-50 p-3 bg-amber-500 text-white rounded-full shadow-lg shadow-amber-500/30 hover:bg-amber-400 hover:scale-110 active:scale-95 transition-all outline-none"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

