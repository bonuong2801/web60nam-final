import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { SafeImage } from "./SafeImage";

const CATEGORIES = ["Tất cả", "Quá khứ", "Hiện tại", "Khoảnh khắc"];

// THAY ẢNH VÀ THÔNG TIN TRONG KÝ ỨC HÌNH ẢNH:
// Thuộc tính 'url' là đường dẫn ảnh. Thay bằng ảnh cục bộ (Ví dụ: "/images/ky-niem-1.jpg")
const PHOTOS = [
  { id: 1, category: "Quá khứ", url: "/images/gallery-1.jpg", description: "Độ tuyển \"HÀNH TRÌNH TRI THỨC\" của nhà trường xuất sắc vượt qua vòng loại" },
  { id: 2, category: "Hiện tại", url: "/images/gallery-2.jpg", description: "Cuộc thi STEM cấp trường năm học 2025-2026." },
  { id: 3, category: "Khoảnh khắc", url: "/images/gallery-3.jpg", description: "Đêm văn nghệ năm ấy." },
  { id: 4, category: "Quá khứ", url: "/images/gallery-4.jpg", description: "Lễ khai giảng năm học 2017-2018 và đón bằng công nhận trường đạt chuẩn quốc gia." },
  { id: 5, category: "Hiện tại", url: "/images/gallery-5.jpg", description: "Thầy cô và học sinh nhà trường đạt giải ba cuộc thi \"Tuổi trẻ chung tay đẩy lùi ma túy\" năm 2025." },
  { id: 6, category: "Khoảnh khắc", url: "/images/gallery-6.jpg", description: "Những anh tình nguyện viên tốt bụng." },
  { id: 7, category: "Quá khứ", url: "/images/gallery-7.jpg", description: "Lễ khai giảng năm học 2017-2018." },
  { id: 8, category: "Hiện tại", url: "/images/gallery-8.jpg", description: "Thầy và trò nhà trường đạt giải tại cuộc thi \"Ngày hội STEM\"\ cấp tỉnh năm học 2024-2025." },
  { id: 9, category: "Khoảnh khắc", url: "/images/gallery-9.jpg", description: "Thầy và trò ngày 20/11/2019." },
  { id: 10, category: "Khoảnh khắc", url: "/images/gallery-10.jpg", description: "Đội thi hành trình tri thức năm 2020." },
  { id: 11, category: "Quá khứ", url: "/images/gallery-11.jpg", description: "Văn nghệ ngày 20/11/2019." },
  { id: 12, category: "Hiện tại", url: "/images/gallery-12.jpg", description: "HĐTN: Tìm hiểu truyền thống hiếu học, khoa bảng Xứ Đông." },
  { id: 13, category: "Khoảnh khắc", url: "/images/gallery-13.jpg", description: "Một góc sân trường." },
  { id: 14, category: "Quá khứ", url: "/images/gallery-14.jpg", description: "Học sinh nahf trường tham gia lao động công ích dọn dẹp nghĩa trang liệt sĩ." },
  { id: 15, category: "Hiện tại", url: "/images/gallery-15.jpg", description: "Cuộc thi trang phụ tái chế năm học 2025-2026." },
];

export function Gallery() {
  const [filter, setFilter] = useState("Tất cả");
  const [selectedImage, setSelectedImage] = useState<typeof PHOTOS[0] | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const filtered = filter === "Tất cả" ? PHOTOS : PHOTOS.filter(p => p.category === filter);
  const visiblePhotos = filtered.slice(0, visibleCount);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
         setVisibleCount(c => c >= filtered.length ? c : c + 6);
      }
    });
    if (sentinelRef.current) obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [filtered.length]);

  const handleFilterChange = (c: string) => {
    setFilter(c);
    setVisibleCount(6); // Reset count when changing filter
  };

  return (
    <section id="gallery" className="py-32 bg-white text-slate-900 relative overflow-hidden transition-colors">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="caps-label mb-4">Kho báu kỷ niệm</span>
          <h2 className="font-script text-5xl md:text-7xl mb-4 text-slate-900">Ký Ức <span className="italic text-red-800">Hình Ảnh</span></h2>
          <p className="text-slate-600 font-light text-lg">Nhìn lại những khoảnh khắc làm nên chúng ta.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-14">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => handleFilterChange(c)}
              className={`px-6 py-2.5 rounded-full border transition-all text-sm font-medium ${
                filter === c 
                  ? "bg-amber-500 border-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/25" 
                  : "bg-slate-100 border-slate-200 text-slate-700 hover:border-amber-400 hover:text-slate-950 hover:bg-slate-50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {visiblePhotos.map((photo, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20, rotate: idx % 2 === 0 ? -1 : 1 }}
                animate={{ opacity: 1, y: 0, rotate: idx % 2 === 0 ? -2 : 2 }}
                whileHover={{ rotate: 0, scale: 1.05, y: -10, zIndex: 10 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                key={photo.id}
                className="bg-white border border-slate-200/90 p-4 pb-12 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:border-amber-500/50 transition-all cursor-pointer relative group rounded-2xl"
                onClick={() => setSelectedImage(photo)}
              >
                <div className="aspect-square overflow-hidden mb-4 relative rounded-xl bg-slate-100">
                  <SafeImage loading="lazy" src={photo.url} 
                    className="w-full h-full object-cover transition-all duration-700" 
                    alt={photo.description} 
                  />
                  <div className="absolute inset-0 shadow-inner pointer-events-none" />
                </div>
                <div className="px-2">
                   <div className="w-8 h-8 bg-amber-500/30 absolute -top-4 left-1/2 -translate-x-1/2 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div className="h-px w-full bg-slate-100 mb-3" />
                   <p className="font-serif italic text-slate-700 text-sm line-clamp-1 group-hover:text-amber-800 transition-colors">{photo.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length > visibleCount && (
          <div ref={sentinelRef} className="h-20 w-full" />
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm" 
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white hover:text-amber-400 transition-colors z-10 p-2">
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              src={selectedImage.url} 
              className="max-w-full max-h-[75vh] w-auto h-auto rounded-lg shadow-2xl dark:shadow-black/50 object-scale-down mb-6" 
              alt={selectedImage.description} 
              onClick={(e) => e.stopPropagation()}
            />
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white text-center text-lg md:text-xl font-light max-w-2xl px-6"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedImage.description}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
