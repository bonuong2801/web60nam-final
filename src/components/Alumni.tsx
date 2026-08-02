import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ArrowRight, Briefcase, Award, X } from "lucide-react";
import { SafeImage } from "./SafeImage";

interface Alumnus {
  id: number;
  name: string;
  year: string;
  location: string;
  currentJob: string;
  achievements: string;
  quote: string;
  img: string;
}

const ALUMNI: Alumnus[] = [
  { 
    id: 1, 
    name: "Nguyễn Văn A", 
    year: "1998", 
    location: "Hà Nội",
    currentJob: "Giám đốc điều hành VNPT",
    achievements: "Giải thưởng Doanh nhân trẻ xuất sắc 2020.",
    quote: "Trường THPT Cẩm Giàng là nơi tôi bắt đầu những ước mơ lớn nhất đời mình.", 
    img: "/images/alumni-1.jpg" 
  },
  { 
    id: 2, 
    name: "Trần Thị B", 
    year: "2005", 
    location: "TP. Hồ Chí Minh",
    currentJob: "Bác sĩ Chuyên khoa II",
    achievements: "Bác sĩ tiêu biểu bệnh viện Chợ Rẫy 2022.",
    quote: "Nhớ mãi những bài giảng của thầy cô đã truyền cảm hứng cho tôi theo đuổi ngành Y.", 
    img: "/images/alumni-2.jpg" 
  },
  { 
    id: 3, 
    name: "Lê Văn C", 
    year: "2010", 
    location: "Đà Nẵng",
    currentJob: "Kỹ sư phần mềm cao cấp tại FPT",
    achievements: "Quán quân hackathon công nghệ toàn quốc.",
    quote: "Tự hào là học sinh Cẩm Giàng, nơi rèn luyện bản lĩnh và tư duy độc lập.", 
    img: "/images/alumni-3.jpg" 
  },
  { 
    id: 4, 
    name: "Hoàng Minh", 
    year: "2002", 
    location: "Hải Phòng",
    currentJob: "Thuyền trưởng tàu viễn dương",
    achievements: "Hoàn thành chuyến hành trình vòng quanh thế giới an toàn.",
    quote: "Kỷ luật thép ở Cẩm Giàng đã rèn dũa nên một tôi kiên cường của hiện tại.", 
    img: "/images/alumni-4.jpg" 
  },
  { 
    id: 5,
    name: "Thanh Trúc", 
    year: "2018", 
    location: "Tokyo, Nhật Bản",
    currentJob: "Kỹ sư AI tại TechJapan",
    achievements: "Học bổng MEXT, Quán quân cuộc thi lập trình quốc tế.",
    quote: "Trường THPT Cẩm Giàng đã cho tôi nền tảng vững chắc để tự tin bước ra thế giới.", 
    img: "/images/alumni-5.jpg" 
  },
  { 
    id: 6,
    name: "Quốc Huy", 
    year: "2012", 
    location: "California, Mỹ",
    currentJob: "Nhà khoa học dữ liệu tại Silicon Valley",
    achievements: "Tiến sĩ ngành Khoa học Máy tính đại học Stanford.",
    quote: "Dù đi đâu, những bài học đầu tiên từ các thầy cô luôn là hành trang quý giá nhất.", 
    img: "/images/alumni-6.jpg" 
  },
  { 
    id: 7,
    name: "Bích Ngọc", 
    year: "2016", 
    location: "London, Anh",
    currentJob: "Chuyên gia phân tích tài chính",
    achievements: "Thủ khoa đầu ra đại học Kinh tế Quốc dân, Thạc sĩ tài chính London School of Economics.",
    quote: "Những kỷ niệm tuyệt vời tại Cẩm Giàng là động lực để tôi vươn tới những ước mơ lớn hơn.", 
    img: "/images/alumni-7.jpg" 
  },
];

export const Alumni = () => {
  const [selectedAlumnus, setSelectedAlumnus] = useState<Alumnus | null>(null);

  return (
    <section id="alumni" className="py-32 bg-slate-50 dark:bg-slate-900 transition-colors overflow-hidden relative">
      <div className="max-w-5xl mx-auto px-4 text-center relative z-10 mb-24">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="caps-label mb-4">Tự hào</span>
          <h2 className="font-script text-5xl md:text-7xl mb-8 text-slate-900 dark:text-slate-50">Mạng Lưới <span className="italic text-amber-600">Cựu Học Sinh</span></h2>
          <div className="w-24 h-px bg-amber-500 mx-auto mb-10" />
          <p className="text-slate-500 font-light text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto italic font-serif whitespace-nowrap">
            Từ mái trường Cẩm Giàng, các thế hệ học sinh đã vươn xa và tỏa sáng trên khắp năm châu.
          </p>
        </motion.div>
      </div>

      {/* Alumni Marquee */}
      <div className="w-full overflow-hidden relative flex py-4 mb-20 group">
        <div className="flex w-max animate-marquee shrink-0 group-hover:[animation-play-state:paused]">
          {ALUMNI.map((alumnus, index) => (
             <div 
               key={`1-${alumnus.id}-${index}`}
               onClick={() => setSelectedAlumnus(alumnus)}
               className="w-64 shrink-0 cursor-pointer mx-4 group/card"
             >
               <div className="aspect-[3/4] rounded-3xl overflow-hidden mb-6 relative shadow-2xl dark:shadow-black/50 transition-transform duration-500 group-hover/card:-translate-y-4">
                 <SafeImage loading="lazy" src={alumnus.img} 
                   alt={alumnus.name} 
                   className="w-full h-full object-cover transition-all duration-700"
                 />
                 <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <p className="text-amber-400 text-[10px] uppercase tracking-widest font-bold mb-1">Khóa {alumnus.year}</p>
                    <h4 className="text-white text-lg font-serif italic">{alumnus.name}</h4>
                 </div>
               </div>
               <div className="text-center transition-opacity group-hover/card:opacity-0">
                 <h4 className="font-serif text-lg text-slate-900 dark:text-slate-50">{alumnus.name}</h4>
                 <p className="text-slate-500 font-light text-sm uppercase tracking-widest text-[10px]">{alumnus.currentJob}</p>
               </div>
             </div>
          ))}
        </div>
        
        {/* Duplicate for Marquee effect */}
        <div className="flex w-max animate-marquee shrink-0 group-hover:[animation-play-state:paused]" aria-hidden="true">
          {ALUMNI.map((alumnus, index) => (
             <div 
               key={`2-${alumnus.id}-${index}`}
               onClick={() => setSelectedAlumnus(alumnus)}
               className="w-64 shrink-0 cursor-pointer mx-4 group/card"
             >
               <div className="aspect-[3/4] rounded-3xl overflow-hidden mb-6 relative shadow-2xl dark:shadow-black/50 transition-transform duration-500 group-hover/card:-translate-y-4">
                 <SafeImage loading="lazy" src={alumnus.img} 
                   alt={alumnus.name} 
                   className="w-full h-full object-cover transition-all duration-700"
                 />
                 <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <p className="text-amber-400 text-[10px] uppercase tracking-widest font-bold mb-1">Khóa {alumnus.year}</p>
                    <h4 className="text-white text-lg font-serif italic">{alumnus.name}</h4>
                 </div>
               </div>
               <div className="text-center transition-opacity group-hover/card:opacity-0">
                 <h4 className="font-serif text-lg text-slate-900 dark:text-slate-50">{alumnus.name}</h4>
                 <p className="text-slate-500 font-light text-sm uppercase tracking-widest text-[10px]">{alumnus.currentJob}</p>
               </div>
             </div>
          ))}
        </div>
      </div>

      <div className="text-center">
         <p className="text-slate-400 font-light flex items-center justify-center gap-3">
           <span className="w-12 h-px bg-slate-200" />
           Cùng hàng ngàn cựu học sinh khác đang cống hiến cho xã hội
           <span className="w-12 h-px bg-slate-200" />
         </p>
      </div>

      {/* Alumni Detail Modal */}
      <AnimatePresence>
        {selectedAlumnus && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAlumnus(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl dark:shadow-black/50 relative flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedAlumnus(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center text-slate-700 transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="w-full md:w-2/5 aspect-[3/4] md:aspect-auto">
                 <SafeImage loading="lazy" src={selectedAlumnus.img} alt={selectedAlumnus.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                <span className="text-amber-600 font-medium tracking-wide text-sm mb-2 uppercase">Khóa {selectedAlumnus.year}</span>
                <h3 className="text-3xl font-serif text-slate-900 dark:text-slate-50 mb-6">{selectedAlumnus.name}</h3>
                
                <div className="space-y-4 font-light text-slate-600">
                  <div>
                    <h5 className="font-medium text-slate-900 dark:text-slate-50 mb-1 flex items-center gap-2">
                      <Briefcase size={16} className="text-amber-500" />
                      Công việc hiện tại:
                    </h5>
                    <p>{selectedAlumnus.currentJob} - {selectedAlumnus.location}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-900 dark:text-slate-50 mb-1 flex items-center gap-2">
                      <Award size={16} className="text-amber-500" />
                      Thành tích nổi bật:
                    </h5>
                    <p className="leading-relaxed">{selectedAlumnus.achievements}</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <p className="italic text-slate-500 dark:text-slate-400">
                    "{selectedAlumnus.quote}"
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
