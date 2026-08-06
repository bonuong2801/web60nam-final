import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { SafeImage } from "./SafeImage";

const CATEGORIES = ["Tất cả", "Quá khứ", "Hiện tại", "Khoảnh khắc"];

// THAY ẢNH VÀ THÔNG TIN TRONG KÝ ỨC HÌNH ẢNH:
// Thuộc tính 'url' là đường dẫn ảnh. Thay bằng ảnh cục bộ (Ví dụ: "/images/ky-niem-1.jpg")
const PHOTOS = [
  { id: 1, category: "Quá khứ", url: "/images/gallery-1.jpg", description: "Độ tuyển \"HÀNH TRÌNH TRI THỨC\" của nhà trường xuất sắc vượt qua vòng loại" },
  { id: 2, category: "Hiện tại", url: "/images/gallery-2.jpg", description: "Học sinh trao đổi bài trực tuyến trong phòng máy mới." },
  { id: 3, category: "Khoảnh khắc", url: "/images/gallery-3.jpg", description: "Đêm văn nghệ năm ấy." },
  { id: 4, category: "Quá khứ", url: "/images/gallery-4.jpg", description: "Lễ khai giảng năm học 2017-2018 và đón bằng công nhận trường đạt chuẩn quốc gia." },
  { id: 5, category: "Hiện tại", url: "/images/gallery-5.jpg", description: "Buổi lễ chào cờ thứ hai trang nghiêm." },
  { id: 6, category: "Khoảnh khắc", url: "/images/gallery-6.jpg", description: "Những anh tình nguyện viên tốt bụng." },
  { id: 7, category: "Quá khứ", url: "/images/gallery-7.jpg", description: "Lễ khai giảng năm học 2017-2018." },
  { id: 8, category: "Hiện tại", url: "/images/gallery-8.jpg", description: "Hoạt động nhóm sôi nổi trong giờ ngoại khoá." },
  { id: 9, category: "Khoảnh khắc", url: "/images/gallery-9.jpg", description: "Thầy và trò ngày 20/11/2019." },
  { id: 10, category: "Khoảnh khắc", url: "/images/gallery-10.jpg", description: "Đội thi hành trình tri thức năm 2020." },
  { id: 11, category: "Quá khứ", url: "/images/gallery-11.jpg", description: "Văn nghệ ngày 20/11/2019." },
  { id: 12, category: "Hiện tại", url: "/images/gallery-12.jpg", description: "Các học sinh đạt giải cao kỳ thi học sinh giỏi." },
  { id: 13, category: "Khoảnh khắc", url: "/images/gallery-13.jpg", description: "Chuyến thiện nguyện đong đầy tình yêu thương." },
  { id: 14, category: "Quá khứ", url: "/images/gallery-14.jpg", description: "Đội văn nghệ trường mang giải nhất cấp tỉnh về." },
  { id: 15, category: "Hiện tại", url: "/images/gallery-15.jpg", description: "Lớp chuyên toán trong tiết mục văn nghệ." },
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
    <section id="gallery" className="py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-script text-4xl md:text-5xl mb-4 text-slate-900 dark:text-slate-50">Ký Ức Hình Ảnh</h2>
          <p className="text-slate-500 font-light text-lg">Nhìn lại những khoảnh khắc làm nên chúng ta.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => handleFilterChange(c)}
              className={`px-6 py-2 rounded-full border transition-all font-medium ${
                filter === c 
                  ? "bg-slate-900 border-slate-900 text-white" 
                  : "bg-transparent border-slate-300 text-slate-600 hover:border-slate-900 hover:text-slate-900 dark:text-slate-50"
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
                className="bg-white dark:bg-slate-900 p-4 pb-12 shadow-xl hover:shadow-2xl dark:shadow-black/50 transition-shadow cursor-pointer relative group border border-slate-100 dark:border-slate-800"
                onClick={() => setSelectedImage(photo)}
              >
                <div className="aspect-square overflow-hidden mb-4 relative">
                  <SafeImage loading="lazy" src={photo.url} 
                    className="w-full h-full object-cover transition-all duration-700" 
                    alt={photo.description} 
                  />
                  <div className="absolute inset-0 shadow-inner pointer-events-none" />
                </div>
                <div className="px-2">
                   <div className="w-8 h-8 bg-amber-500/50 absolute -top-4 left-1/2 -translate-x-1/2 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div className="h-px w-full bg-slate-100 mb-3" />
                   <p className="font-serif italic text-slate-500 text-sm line-clamp-1">{photo.description}</p>
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
