import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export function TimelineModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show the modal shortly after the page loads
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-transparent rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 rounded-full flex items-center justify-center text-slate-900 dark:text-white transition-colors backdrop-blur-md"
              aria-label="Đóng popup"
            >
              <X size={20} />
            </button>

            <div className="w-full h-auto max-h-[90vh] bg-transparent relative flex justify-center items-center">
              <img
                src="/images/timeline.jpg"
                alt="Timeline chương trình"
                className="w-full h-auto max-h-[90vh] object-contain rounded-3xl"
                onError={(e) => {
                  // Fallback if image doesn't exist yet
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%25" height="100%25" viewBox="0 0 800 400"%3E%3Crect fill="%23f1f5f9" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" font-family="sans-serif" font-size="24" fill="%2394a3b8" text-anchor="middle" dy=".3em"%3E%C3%81nh Timeline (%2Fimages%2Ftimeline.jpg)%3C%2Ftext%3E%3C%2Fsvg%3E';
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
