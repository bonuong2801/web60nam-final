import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Play, X } from "lucide-react";
import { useState, useRef } from "react";
import { SafeImage } from "./SafeImage";

// THAY ẢNH CHẠY Ở TRANG CHỦ: Thay các link "https..." bằng link ảnh của bạn (VD: "/images/slide-1.jpg")
const CAROUSEL_IMAGES = [
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg",
  "/images/hero-4.jpg",
  "/images/hero-5.jpg",
  "/images/hero-6.jpg",
  "/images/hero-7.jpg",
  "/images/hero-8.jpg"
];

export function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden pt-20 pb-40 lg:pb-48 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
    >
      {/* Header */}
      <div className="absolute top-20 md:top-24 lg:top-28 left-0 w-full px-4 lg:px-10 flex flex-col md:flex-row justify-between items-center z-30 gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 lg:gap-4"
        >
          <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center overflow-hidden shrink-0">
            <SafeImage src="/images/logon.png?v=20260802" alt="Logo THPT Cẩm Giàng" className="w-full h-full object-cover p-1" decoding="async" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-serif text-lg md:text-xl font-medium tracking-wide drop-shadow-lg">THPT Cẩm Giàng</span>
            <span className="text-white/60 text-[10px] md:text-xs uppercase tracking-widest">Hải Dương • Since 1966</span>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden sm:block"
        >
           <span className="text-amber-400 font-serif italic tracking-wide text-sm md:text-lg opacity-90 drop-shadow-lg">
             "60 Năm Thắp Sáng Một Niềm Tin"
           </span>
        </motion.div>
      </div>

      {/* Floating Elements with Parallax-ish feel */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: y1 }}>
        <div className="absolute inset-0 bg-slate-900/60 transition-opacity" />
        <div className="blob-container">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
          <div className="blob blob-4" />
          <div className="blob blob-5" />
        </div>
      </motion.div>

      <motion.div 
        className="relative z-20 text-center px-4 max-w-6xl mx-auto space-y-12 w-full mt-24 md:mt-16"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col items-center gap-2 mb-10 w-full text-center">
             <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-9xl text-white leading-tight drop-shadow-2xl dark:shadow-black/50">
               Kỷ Niệm <span className="text-amber-400 italic">60</span> Năm
             </h1>
             <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white/90 font-light mt-2">
               Trường THPT Cẩm Giàng
             </h2>
          </div>
          <p className="font-great-vibes text-amber-500/90 tracking-wide text-2xl md:text-3xl lg:text-4xl max-w-4xl mx-auto">
            Dấu ấn 60 năm chặng đường 1966 – 2026
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
        >
          <a
            href="#history"
            className="group relative px-10 py-5 bg-amber-500 text-slate-900 dark:text-slate-50 rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-amber-500/20"
          >
            <span className="relative z-10">Khám Phá Lịch Sử</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          
          <button
            onClick={() => setIsVideoOpen(true)}
            className="group flex items-center gap-3 px-8 py-5 rounded-full border border-white/20 text-white backdrop-blur-sm transition-all hover:bg-white dark:bg-slate-900 hover:text-slate-900 dark:text-slate-50 shadow-lg"
          >
            <Play size={20} className="fill-current group-hover:text-amber-500" />
            <span className="font-bold tracking-tight">
              Video Kỷ Niệm
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Rotating Images Marquee */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-2 left-0 w-full overflow-hidden z-20 flex bg-linear-to-b from-transparent to-slate-900/10 py-2"
      >
         <div className="flex animate-marquee shrink-0">
            {CAROUSEL_IMAGES.map((img, index) => (
              <div 
                key={index} 
                className="w-24 h-16 md:w-32 md:h-20 rounded-xl overflow-hidden shrink-0 border border-white/5 shadow-2xl dark:shadow-black/50 relative mx-2 group cursor-pointer"
              >
                <SafeImage src={img} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="Kỷ niệm" loading="lazy" decoding="async" />
              </div>
            ))}
         </div>
         <div className="flex animate-marquee shrink-0" aria-hidden="true">
            {CAROUSEL_IMAGES.map((img, index) => (
              <div 
                key={index} 
                className="w-24 h-16 md:w-32 md:h-20 rounded-xl overflow-hidden shrink-0 border border-white/5 shadow-2xl dark:shadow-black/50 relative mx-2 group cursor-pointer"
              >
                <SafeImage src={img} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="Kỷ niệm" loading="lazy" decoding="async" />
              </div>
            ))}
         </div>
      </motion.div>

      {/* Video Popup Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/98 p-4 backdrop-blur-2xl"
          >
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-amber-400 transition-colors bg-white/10 p-3 rounded-full backdrop-blur-md z-[110]"
              title="Đóng"
            >
              <X size={28} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-6xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(245,158,11,0.2)] border border-white/10"
            >
              <iframe
                src="https://drive.google.com/file/d/1KbQ9R1K1L5OApv48-oYRx6Xwv2SFbCxy/preview"
                className="w-full h-full"
                allow="autoplay"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
