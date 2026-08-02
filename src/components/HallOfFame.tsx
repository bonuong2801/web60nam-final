import { useState } from "react";
import { Trophy, Medal, Star, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SafeImage } from "./SafeImage";

interface Honor {
  id: number;
  name: string;
  year: string;
  award: string;
  type: "teacher" | "student";
  img: string;
}

// THAY ẢNH VÀ THÔNG TIN BẢNG VÀNG CÁC THẾ HỆ:
// Thuộc tính 'img' là đường dẫn đến ảnh. Hãy đổi thành ảnh cục bộ (Ví dụ: "/images/hoc-sinh-A.jpg")
const HONORS: Honor[] = [
  { id: 1, name: "Thầy Lê Văn C", year: "2008", award: "Huân chương Lao động hạng Ba", type: "teacher", img: "/images/halloffame-1.jpg" },
  { id: 2, name: "Học sinh Trần Văn B", year: "2015", award: "Huy chương Vàng Olympic Toán Quốc tế", type: "student", img: "/images/halloffame-2.jpg" },
  { id: 3, name: "Cô Phạm Thị D", year: "2012", award: "Giáo viên Dạy giỏi Cấp Quốc gia", type: "teacher", img: "/images/halloffame-3.jpg" },
  { id: 4, name: "Học sinh Nguyễn Văn E", year: "2018", award: "Trạng nguyên Tiếng Việt Cấp Tỉnh", type: "student", img: "/images/halloffame-4.jpg" },
  { id: 5, name: "Tập thể Sư phạm", year: "2020", award: "Cờ Thi đua của Chính Phủ", type: "teacher", img: "/images/halloffame-5.jpg" },
  { id: 6, name: "Học sinh Lê Thị F", year: "2022", award: "Giải Nhất Ngữ Văn Cấp Quốc gia", type: "student", img: "/images/halloffame-6.jpg" },
  { id: 7, name: "Thầy Hoàng Văn G", year: "2010", award: "Bằng khen của Bộ trưởng Bộ GD&ĐT", type: "teacher", img: "/images/halloffame-7.jpg" },
  { id: 8, name: "Học sinh Đặng Văn H", year: "2023", award: "Thủ khoa Kỳ thi THPT Quốc gia Cụm thi", type: "student", img: "/images/halloffame-8.jpg" },
  { id: 9, name: "Trường THPT Cẩm Giàng", year: "2024", award: "Huân chương Lao động hạng Nhì", type: "teacher", img: "/images/halloffame-9.jpg" },
  { id: 10, name: "Thầy Đỗ Văn I", year: "2019", award: "Bằng khen của Thủ tướng Chính phủ", type: "teacher", img: "/images/halloffame-10.jpg" },
  { id: 11, name: "Học sinh Trần Thị K", year: "2021", award: "Giải Nhất Sinh học Cấp Quốc gia", type: "student", img: "/images/halloffame-11.jpg" },
  { id: 12, name: "Tổ Khoa học Tự nhiên", year: "2017", award: "Tập thể Lao động Xuất sắc", type: "teacher", img: "/images/halloffame-12.jpg" },
];

export function HallOfFame() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section id="halloffame" className="py-32 bg-[#0F172A] overflow-hidden relative">
      {/* Cinematic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[150px] opacity-30" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/carbon-fibre.png')]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-block mb-6"
          >
             <div className="relative">
               <Trophy size={48} className="text-amber-500 relative z-10" />
               <motion.div 
                 animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                 transition={{ repeat: Infinity, duration: 3 }}
                 className="absolute inset-0 bg-amber-400 rounded-full blur-xl"
               />
             </div>
          </motion.div>
          
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="caps-label !text-amber-500/80 mb-4"
          >
            Vinh danh truyền thống
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-script text-5xl md:text-7xl lg:text-8xl mb-8 text-white"
          >
            Bảng Vàng <span className="italic text-amber-500">Kỷ Nguyên</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 font-light text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Tôn vinh những cá nhân và tập thể xuất sắc đã làm rạng danh tên tuổi mái trường Cẩm Giàng qua sáu thập kỷ kiến tạo.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HONORS.slice(0, 6).map((item, i) => (
             <motion.div
               key={item.id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
               whileHover={{ y: -10 }}
               className="group relative"
             >
               <div className="absolute inset-0 bg-linear-to-b from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl blur-xl" />
               
               <div className="relative bg-slate-800/40 border border-white/5 backdrop-blur-md p-8 rounded-3xl transition-all group-hover:border-amber-500/50 h-full flex flex-col items-center text-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden mb-6 ring-4 ring-slate-700/50 group-hover:ring-amber-500/30 transition-all shadow-2xl dark:shadow-black/50">
                    <SafeImage loading="lazy" src={item.img} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-amber-500 font-mono text-sm tracking-widest">{item.year}</span>
                      <h3 className="text-2xl font-serif text-white group-hover:text-amber-400 transition-colors leading-tight">{item.name}</h3>
                    </div>
                    <div className="w-8 h-px bg-slate-700 mx-auto group-hover:w-16 group-hover:bg-amber-500 transition-all" />
                    <p className="text-slate-400 font-light text-sm leading-relaxed italic group-hover:text-slate-300 transition-colors">
                      "{item.award}"
                    </p>
                  </div>
                  
                  <div className="absolute top-6 right-6 text-slate-700 group-hover:text-amber-500/20 transition-colors">
                    {item.type === 'student' ? <Star size={40} /> : <Medal size={40} />}
                  </div>
               </div>
             </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <button 
            onClick={() => setShowModal(true)}
            className="group relative px-10 py-4 bg-transparent text-white rounded-full font-bold overflow-hidden transition-all border border-slate-700 hover:border-amber-500"
          >
             <span className="relative z-10 flex items-center gap-3">
               Xem toàn bộ danh sách vinh danh
               <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
             </span>
             <div className="absolute inset-0 bg-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 rounded-3xl w-full max-w-5xl my-8 p-6 md:p-10 shadow-2xl dark:shadow-black/50 relative border border-slate-800"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
              >
                <X size={28} />
              </button>
              
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-3 bg-amber-500/20 text-amber-400 rounded-full mb-4 ring-1 ring-amber-500/50">
                  <Trophy size={28} />
                </div>
                <h3 className="font-script text-3xl md:text-4xl text-white">Bảng Vàng Các Thế Hệ</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {HONORS.map((item) => (
                  <div key={item.id} className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/50 flex gap-4 items-start">
                    <div className="w-12 h-16 rounded-md overflow-hidden shrink-0 border border-slate-700/50 bg-slate-800">
                      <SafeImage loading="lazy" src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg text-white mb-1">{item.name}</h4>
                      <div className="inline-block px-2 py-0.5 bg-slate-800 border border-slate-700 text-slate-400 text-[10px] rounded mb-2 font-medium">Năm {item.year}</div>
                      <p className="text-slate-400 font-light text-xs leading-relaxed">{item.award}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
