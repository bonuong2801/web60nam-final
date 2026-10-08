import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { id: "hero", label: "Trang chủ" },
  { id: "history", label: "Lịch sử" },
  { id: "gallery", label: "Kỷ niệm" },
  { id: "halloffame", label: "Bảng vàng" },
  { id: "teachers", label: "Thầy cô" },
  { id: "avatar-frame", label: "Khung avatar" },
  { id: "wishes", label: "Lời chúc" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled down for styling
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = NAV_LINKS.map((link) => document.getElementById(link.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const sectionTop = section.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= sectionTop) {
            setActiveSection(NAV_LINKS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    
    // Use timeout to allow mobile menu to close before calculating position
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
          top: Math.max(0, y),
          behavior: "smooth",
        });
      }
    }, 50);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled || isMobileMenuOpen
            ? "bg-white/95 backdrop-blur-md shadow-sm py-2.5 border-b border-slate-200/80" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between relative min-h-[44px]">
            {/* Logo area - Hiệu ứng mở rộng và trượt mượt mà từ dưới lên khi cuộn trang */}
            <div 
              className={`flex items-center overflow-hidden transition-all duration-500 ease-out ${
                isScrolled || isMobileMenuOpen 
                  ? "max-w-[260px] opacity-100" 
                  : "max-w-0 opacity-0"
              }`}
            >
              <div 
                className={`flex items-center gap-2.5 cursor-pointer shrink-0 transition-all duration-500 ease-out transform ${
                  isScrolled || isMobileMenuOpen
                    ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                    : "opacity-0 translate-y-6 scale-90 pointer-events-none"
                }`} 
                onClick={() => scrollToSection("hero")}
              >
                <div className="w-8 h-8 flex items-center justify-center overflow-hidden shrink-0">
                  <img src="/images/logon.png?v=20260802" alt="Logo" className="w-full h-full object-cover p-1" />
                </div>
                <span className="font-serif font-semibold text-lg tracking-wide text-slate-900 whitespace-nowrap">
                  THPT Cẩm Giàng
                </span>
              </div>
            </div>

            {/* Desktop Navigation - Dàn đều êm ái khi ở đầu trang, tự động thu gọn mượt mà khi cuộn */}
            <div 
              className={`hidden md:flex flex-1 items-center transition-all duration-500 ease-out ${
                isScrolled ? "justify-end" : "justify-center"
              }`}
            >
              <div
                className={`flex items-center transition-all duration-500 ease-out ${
                  isScrolled
                    ? "w-auto justify-end gap-1 lg:gap-1.5 xl:gap-2 px-0 py-0 bg-transparent border-transparent shadow-none"
                    : "w-[820px] lg:w-[940px] justify-between px-8 py-2 rounded-full bg-slate-950/30 backdrop-blur-md border border-white/20 shadow-xl shadow-black/10"
                }`}
              >
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className={`relative rounded-full font-medium whitespace-nowrap shrink-0 transition-all duration-300 ease-out cursor-pointer ${
                        isScrolled
                          ? "px-2.5 lg:px-3.5 py-1 lg:py-1.5 text-xs lg:text-sm"
                          : "px-4 lg:px-5 py-2 text-base lg:text-lg tracking-wide hover:scale-105"
                      } ${
                        isActive 
                          ? (isScrolled ? "text-amber-600 font-semibold" : "text-amber-400 font-semibold")
                          : (isScrolled ? "text-slate-600 hover:text-slate-900" : "text-white/90 hover:text-white")
                      }`}
                    >
                      <span className="whitespace-nowrap inline-block select-none">{link.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className={`absolute inset-0 rounded-full -z-10 ${
                            isScrolled ? "bg-amber-500/10" : "bg-amber-500/20"
                          }`}
                          transition={{ type: "spring", stiffness: 350, damping: 35 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden ml-auto">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  isScrolled || isMobileMenuOpen ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10"
                }`}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[60px] left-0 right-0 z-40 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden md:hidden"
          >
            <div className="flex flex-col py-4 px-4 space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
