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
const HONORS: Honor[] = [
{ id: 1, name: "Cô Trần Thị Lam", year: "2025-2026", award: "Giáo viên bồi dưỡng HSG cấp Thành phố - Một giải Nhất, hai giải Nhì, một giải Ba, hai giải Khuyến khích", type: "teacher", subject: "Ngữ Văn", img: "/images/halloffame-1.jpg" },
{ id: 2, name: "Cô Cao Thị Hồng Điệp", year: "2025-2026", award: "Giáo viên bồi dưỡng HSG cấp Thành phố - Hai giải Ba", type: "teacher", subject: "Toán", img: "/images/halloffame-2.jpg" },
{ id: 3, name: "Cô Vương Thị Điệp", year: "2025-2026", award: "Giáo viên bồi dưỡng HSG cấp Thành phố - Hai giải Ba, một giải Khuyến khích", type: "teacher", subject: "Vật Lý", img: "/images/halloffame-3.jpg" },
{ id: 4, name: "Cô Lê Thị Hằng", year: "2025-2026", award: "Giáo viên bồi dưỡng HSG cấp Thành phố - Hai giải Ba, bốn giải Khuyến khích", type: "teacher", subject: "Tiếng Anh", img: "/images/halloffame-4.jpg" },
{ id: 5, name: "Cô Nguyễn Thị Minh Hồng", year: "2025-2026", award: "Giáo viên bồi dưỡng HSG cấp Thành phố - Hai giải Nhì, một giải Ba", type: "teacher", subject: "Tin Học", img: "/images/halloffame-5.jpg" },
{ id: 6, name: "Cô Đỗ Thị Anh Dũng", year: "2025-2026", award: "Giáo viên bồi dưỡng HSG cấp Thành phố - Hai giải Ba, ba giải Khuyến khích", type: "teacher", subject: "Hóa Học", img: "/images/halloffame-6.jpg" },
{ id: 7, name: "Cô Nguyễn Thị Khiêm", year: "2025-2026", award: "Giáo viên bồi dưỡng HSG cấp Thành phố - Một giải Ba, hai giải Khuyến khích", type: "teacher", subject: "Sinh Học", img: "/images/halloffame-7.jpg" },
{ id: 8, name: "Cô Lương Thị Út", year: "2025-2026", award: "Giáo viên bồi dưỡng HSG cấp Thành phố - Một giải Nhất, ba giải Nhì", type: "teacher", subject: "Lịch Sử", img: "/images/halloffame-8.jpg" },
{ id: 9, name: "Cô Vũ Thị Nhuân", year: "2025-2026", award: "Giáo viên bồi dưỡng HSG cấp Thành phố - Hai giải Nhì, một giải Ba, ba giải Khuyến khích", type: "teacher", subject: "Địa Lý", img: "/images/halloffame-9.jpg" },
{ id: 10, name: "Cô Mai Thị Hồng Lựu", year: "2025-2026", award: "Giáo viên bồi dưỡng HSG cấp Thành phố - Hai giải Nhì, một giải Khuyến khích", type: "teacher", subject: "GDKTPL", img: "/images/halloffame-10.jpg" },
{ id: 11, name: "Vũ Tuấn Khang", year: "2025-2026", award: "Giải Nhất HSG bảng B và Giải Khuyến khích HSG bảng A", type: "student", class: "12N", img: "/images/halloffame-11.jpg" },
{ id: 12, name: "Nguyễn Văn Quý", year: "2025-2026", award: "Giải Ba HSG bảng A và Giải Ba HSG bảng B", type: "student", class: "12A", img: "/images/halloffame-12.jpg" },
{ id: 13, name: "Phạm Thùy Linh", year: "2025-2026", award: "Giải Nhất HSG môn Lịch Sử", type: "student", class: "12M", img: "/images/halloffame-13.jpg" },
{ id: 14, name: "Vũ Thị Ngân Hà", year: "2025-2026", award: "Giải Nhì HSG môn Ngữ Văn", type: "student", class: "12M", img: "/images/halloffame-14.jpg" },
{ id: 15, name: "Vũ Thị Lan Anh", year: "2025-2026", award: "Giải Nhì HSG môn Ngữ Văn", type: "student", class: "12N", img: "/images/halloffame-15.jpg" },
{ id: 16, name: "Phạm Huy Dương", year: "2025-2026", award: "Giải Nhì HSG môn Tin Học", type: "student", class: "12A", img: "/images/halloffame-16.jpg" },
{ id: 17, name: "Nguyễn Minh Quý", year: "2025-2026", award: "Giải Nhì HSG môn Tin Học", type: "student", class: "12A", img: "/images/halloffame-17.jpg" },
{ id: 18, name: "Trần Xuân Mạnh", year: "2025-2026", award: "Giải Nhì HSG môn Lịch Sử", type: "student", class: "12M", img: "/images/halloffame-18.jpg" },
{ id: 19, name: "Lê Đình Phúc", year: "2025-2026", award: "Giải Nhì HSG môn Lịch Sử", type: "student", class: "12M", img: "/images/halloffame-19.jpg" },
{ id: 20, name: "Đào Khánh Hòa", year: "2025-2026", award: "Giải Nhì HSG môn Lịch Sử", type: "student", class: "12K", img: "/images/halloffame-20.jpg" },
{ id: 21, name: "Vũ Thị Ngọc Mai", year: "2025-2026", award: "Giải Nhì HSG môn GDKTPL", type: "student", class: "12N", img: "/images/halloffame-21.jpg" },
{ id: 22, name: "Phạm Hà Dung", year: "2025-2026", award: "Giải Nhì HSG môn GDKTPL", type: "student", class: "12M", img: "/images/halloffame-22.jpg" },
{ id: 23, name: "Vũ Ngọc Hà", year: "2025-2026", award: "Giải Nhì HSG môn Địa Lý", type: "student", class: "12M", img: "/images/halloffame-23.jpg" },
{ id: 24, name: "Hoàng Thu Trang", year: "2025-2026", award: "Giải Nhì HSG môn Địa Lý", type: "student", class: "12N", img: "/images/halloffame-24.jpg" },
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
                    <SafeImage loading="lazy" src={item.img} alt={item.name} className="w-full h-full object-cover transition-all duration-700" />
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
