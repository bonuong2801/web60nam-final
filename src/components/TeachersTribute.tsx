import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { SafeImage } from "./SafeImage";

interface Teacher {
  id: number;
  name: string;
  subject: string;
  years: string;
  achievements: string;
  img: string;
}

// THAY ẢNH VÀ THÔNG TIN PHẦN TRI ÂN THẦY CÔ:
// Thuộc tính 'img' là đường dẫn ảnh. Đổi bằng ảnh cục bộ (Ví dụ: "/images/thay-hieu.jpg")
const TEACHERS: Teacher[] = [
 { id: 1, name: "Thầy Đặng Văn Cừ", subject: "Hiệu Trưởng", years: "1966 - 1968", achievements: "Nhà giáo Ưu tú, Bằng khen của Thủ tướng Chính phủ, Đào tạo nhiều học sinh giỏi quốc gia.", img: "/images/dangvancu.png" },
  { id: 2, name: "Thầy Lê Mạnh Đạt", subject: "Hiệu Trưởng", years: "1968 - 1997", achievements: "Giáo viên dạy giỏi cấp Tỉnh nhiều năm liền, Giải thưởng Viên phấn vàng.", img: "/images/lemanhdat.png" },
  { id: 3, name: "Thầy Phạm Văn Quyết", subject: "Hiệu Trưởng", years: "1997 - 2007", achievements: "Bằng khen của Bộ GD&ĐT, Tổ trưởng chuyên môn xuất sắc.", img: "/images/phamvanquyet.png" },
  { id: 4, name: "Thầy Nguyễn Đức Đấu", subject: "Hiệu Trưởng", years: "2007 - 2015", achievements: "Chiến sĩ thi đua cấp Tỉnh, Giáo viên truyền cảm hứng.", img: "/images/nguyenđucau.png" },
  { id: 5, name: "Thầy Trần Văn Ta", subject: "Hiệu Trưởng", years: "2016 - 2025", achievements: "Kỷ niệm chương vì sự nghiệp giáo dục, Nhiều sáng kiến kinh nghiệm cấp Tỉnh.", img: "/images/tranvanta.png" },
];

export function TeachersTribute() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  return (
    <section id="teachers" className="py-32 bg-white text-slate-900 transition-colors overflow-hidden relative">
      
      <div className="max-w-5xl mx-auto px-4 text-center relative z-10 mb-24">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="caps-label mb-4">Tri ân người khai sáng</span>
          <h2 className="font-script text-5xl md:text-7xl mb-8 text-slate-900 dark:text-slate-50">Người Đưa Đò <span className="italic text-red-800">Thầm Lặng</span></h2>
          <div className="w-24 h-px bg-amber-500 mx-auto mb-10" />
          <p className="text-slate-500 font-light text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto italic font-serif">
            "Phía sau mỗi thế hệ trưởng thành là những con người thầm lặng đã trọn đời gieo những mầm xanh hy vọng. Thầy cô không chỉ truyền thụ kiến thức, mà còn dạy chúng em cách dám ước mơ và kiên định với con đường mình đã chọn."
          </p>
        </motion.div>
      </div>

      {/* Teachers Marquee */}
      <div className="w-full overflow-hidden relative flex py-4 mb-20 group">
        <div className="flex w-max animate-marquee shrink-0 group-hover:[animation-play-state:paused]">
          {TEACHERS.map((teacher, index) => (
             <div 
               key={`1-${teacher.id}-${index}`}
               onClick={() => setSelectedTeacher(teacher)}
               className="w-64 shrink-0 cursor-pointer mx-4 group/card"
             >
               <div className="aspect-[3/4] rounded-3xl overflow-hidden mb-6 relative shadow-2xl dark:shadow-black/50 transition-transform duration-500 group-hover/card:-translate-y-4">
                 <SafeImage loading="lazy" src={teacher.img} 
                   alt={teacher.name} 
                   className="w-full h-full object-cover transition-all duration-700"
                 />
                 <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <p className="text-amber-400 text-[10px] uppercase tracking-widest font-bold mb-1">{teacher.subject}</p>
                    <h4 className="text-white text-lg font-serif italic">{teacher.name}</h4>
                 </div>
               </div>
               <div className="text-center transition-opacity group-hover/card:opacity-0">
                 <h4 className="font-serif text-lg text-slate-900 dark:text-slate-50">{teacher.name}</h4>
                 <p className="text-slate-500 font-light text-sm uppercase tracking-widest text-[10px]">{teacher.subject}</p>
               </div>
             </div>
          ))}
        </div>
        
        {/* Duplicate for Marquee effect */}
        <div className="flex w-max animate-marquee shrink-0 group-hover:[animation-play-state:paused]" aria-hidden="true">
          {TEACHERS.map((teacher, index) => (
             <div 
               key={`2-${teacher.id}-${index}`}
               onClick={() => setSelectedTeacher(teacher)}
               className="w-64 shrink-0 cursor-pointer mx-4 group/card"
             >
               <div className="aspect-[3/4] rounded-3xl overflow-hidden mb-6 relative shadow-2xl dark:shadow-black/50 transition-transform duration-500 group-hover/card:-translate-y-4">
                 <SafeImage loading="lazy" src={teacher.img} 
                   alt={teacher.name} 
                   className="w-full h-full object-cover transition-all duration-700"
                 />
                 <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <p className="text-amber-400 text-[10px] uppercase tracking-widest font-bold mb-1">{teacher.subject}</p>
                    <h4 className="text-white text-lg font-serif italic">{teacher.name}</h4>
                 </div>
               </div>
               <div className="text-center transition-opacity group-hover/card:opacity-0">
                 <h4 className="font-serif text-lg text-slate-900 dark:text-slate-50">{teacher.name}</h4>
                 <p className="text-slate-500 font-light text-sm uppercase tracking-widest text-[10px]">{teacher.subject}</p>
               </div>
             </div>
          ))}
        </div>
      </div>

      <div className="text-center">
         <p className="text-slate-400 font-light flex items-center justify-center gap-3">
           <span className="w-12 h-px bg-slate-200" />
           Cùng hàng trăm thầy cô tâm huyết khác qua các thời kỳ
           <span className="w-12 h-px bg-slate-200" />
         </p>
      </div>

      {/* Teacher Detail Modal */}
      <AnimatePresence>
        {selectedTeacher && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTeacher(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl dark:shadow-black/50 relative flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedTeacher(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center text-slate-700 transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="w-full md:w-2/5 aspect-[3/4] md:aspect-auto">
                 <SafeImage loading="lazy" src={selectedTeacher.img} alt={selectedTeacher.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                <span className="text-amber-600 font-medium tracking-wide text-sm mb-2 uppercase">Giáo viên {selectedTeacher.subject}</span>
                <h3 className="text-3xl font-serif text-slate-900 dark:text-slate-50 mb-6">{selectedTeacher.name}</h3>
                
                <div className="space-y-4 font-light text-slate-600">
                  <div>
                    <h5 className="font-medium text-slate-900 dark:text-slate-50 mb-1">Thời gian công tác:</h5>
                    <p>{selectedTeacher.years}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-900 dark:text-slate-50 mb-1">Thành tích nổi bật:</h5>
                    <p className="leading-relaxed">{selectedTeacher.achievements}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
