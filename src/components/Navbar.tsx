import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { id: "hero", label: "Trang chủ" },
  { id: "history", label: "Lịch sử" },
  { id: "gallery", label: "Hình ảnh" },
  { id: "halloffame", label: "Kỷ yếu" },
  { id: "alumni", label: "Cựu học sinh" },
  { id: "teachers", label: "Thầy cô" },
  { id: "memories", label: "Kỷ niệm" },
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
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm py-3 border-b border-slate-200/50 dark:border-slate-800/50" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo area */}
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => scrollToSection("hero")}
            >
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm">
                <img src="/images/logo1.jpg" alt="Logo" className="w-full h-full object-cover p-1" />
              </div>
              <span className={`font-serif font-semibold text-lg tracking-wide transition-colors ${
                isScrolled || isMobileMenuOpen ? "text-slate-900 dark:text-white" : "text-white"
              }`}>
                THPT Cẩm Giàng
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`relative px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive 
                        ? (isScrolled ? "text-amber-600 dark:text-amber-400" : "text-amber-400")
                        : (isScrolled ? "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white" : "text-white/80 hover:text-white")
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-amber-500/10 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  isScrolled || isMobileMenuOpen ? "text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800" : "text-white hover:bg-white/10"
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
