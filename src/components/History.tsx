import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { SafeImage } from "./SafeImage";

interface Milestone {
  period: string;
  title: string;
  desc: string;
  img: string;
  overview: string;
  cohorts: string;
  individualAchievements: string[];
  collectiveAchievements: string[];
  gallery: string[];
}

const MILESTONES: Milestone[] = [
  {
    period: "1966 - 1996",
    title: "Giai Đoạn Kiến Thiết",
    desc: "Những năm tháng đầu tiên đầy gian khó nhưng cũng đầy tự hào, đặt nền móng vững chắc cho nhà trường.",
    img: "/images/history-1.jpg",
    overview: "30 năm đầu tiên là chặng đường đối mặt với muôn vàn khó khăn của chiến tranh và thời kỳ đầu đổi mới. Vượt lên mọi thử thách, thầy và trò nhà trường đã cùng nhau xây dựng nên một nền móng vững chắc, tạo nên truyền thống hiếu học vô giá.",
    cohorts: "Khóa 1 đến Khóa 30",
    individualAchievements: [
      "Nhiều học sinh đạt giải cao trong các kỳ thi học sinh giỏi cấp tỉnh.",
      "Nhiều thế hệ học sinh tham gia kháng chiến và trở thành những cán bộ ưu tú."
    ],
    collectiveAchievements: [
      "Chi bộ Đảng liên tục đạt danh hiệu Trong sạch, vững mạnh.",
      "Tập thể nhà trường được nhận nhiều Bằng khen từ cơ quan đại phương."
    ],
    gallery: [
      "/images/history-2.jpg",
      "/images/history-3.jpg"
    ]
  },
  {
    period: "1996 - 2006",
    title: "Chuyển Mình & Trưởng Thành",
    desc: "Thời kỳ đổi mới mạnh mẽ, đánh dấu sự vươn lên về cơ sở vật chất và chất lượng giáo dục.",
    img: "/images/history-4.jpg",
    overview: "Giai đoạn bản lề khi trường không ngừng mở rộng khuôn viên và nâng cấp hệ thống giảng dạy, đánh dấu kỷ nguyên mới của sự nghiệp giáo dục toàn diện.",
    cohorts: "Khóa 31 đến Khóa 40",
    individualAchievements: [
      "Nhiều học sinh đạt giải Khuyến khích, giải Ba trong các kỳ thi Quốc gia.",
      "Tỷ lệ đỗ Đại học, Cao đẳng tăng mạnh qua các năm."
    ],
    collectiveAchievements: [
      "Trường được công nhận là Trường Chuẩn Quốc Gia giai đoạn 1.",
      "Liên tục đạt danh hiệu Tập thể lao động xuất sắc cấp Tỉnh."
    ],
    gallery: [
      "/images/history-5.jpg",
      "/images/history-6.jpg"
    ]
  },
  {
    period: "2006 - 2016",
    title: "Khẳng Định Vị Thế",
    desc: "10 năm củng cố danh tiếng, trường liên tục ghi danh trong top các trường THPT hàng đầu.",
    img: "/images/history-7.jpg",
    overview: "Trường THPT Cẩm Giàng trở thành cái nôi bồi dưỡng nhân tài, liên tiếp dẫn đầu phong trào thi đua dạy tốt, học tốt và có đóng góp lớn vào sự nghiệp giáo dục chung.",
    cohorts: "Khóa 41 đến Khóa 50",
    individualAchievements: [
      "Có học sinh đạt thủ khoa các trường Đại học danh tiếng.",
      "Nhiều giáo viên đạt danh hiệu Giáo viên dạy giỏi cấp Tỉnh."
    ],
    collectiveAchievements: [
      "Vinh dự nhận Huân chương Lao động hạng Ba.",
      "Được nhận cờ thi đua xuất sắc của Bộ Giáo dục và Đào tạo."
    ],
    gallery: [
      "/images/history-8.jpg",
      "/images/history-9.jpg"
    ]
  },
  {
    period: "2016 - 2026",
    title: "Hội Nhập & Vươn Tầm",
    desc: "Kỷ nguyên công nghệ số và hội nhập quốc tế, sẵn sàng cho những mục tiêu giáo dục vượt bậc.",
    img: "/images/history-10.jpg",
    overview: "Áp dụng mạnh mẽ công nghệ 4.0 vào giáo dục, mở rộng hợp tác chất lượng, nâng tầm vị thế trường lớp hướng đến nền giáo dục chuẩn quốc tế.",
    cohorts: "Khóa 51 đến Khóa 60",
    individualAchievements: [
      "Hàng loạt học sinh đạt học bổng du học quốc tế.",
      "Giành huy chương trong các cuộc thi Khoa học Kỹ thuật cấp Quốc gia."
    ],
    collectiveAchievements: [
      "Vinh dự nhận Huân chương Lao động hạng Nhì.",
      "Lọt top các trường có điểm thi THPT Quốc gia cao nhất toàn Tỉnh."
    ],
    gallery: [
      "/images/history-11.jpg",
      "/images/history-12.jpg"
    ]
  }
];

export function History() {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  return (
    <section id="history" className="py-32 bg-[#F7F5F0] dark:bg-slate-950 transition-colors relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 text-[20rem] font-serif font-black text-slate-200/40 dark:text-slate-800 dark:text-slate-200/40 select-none pointer-events-none -translate-y-1/4 translate-x-1/4">
        60
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-32">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="caps-label dark:text-slate-400"
          >
            Dòng thời gian
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-script text-5xl md:text-7xl mb-6 text-slate-900 dark:text-slate-50"
          >
            Dấu Ấn <span className="italic text-red-800 dark:text-red-500">Thời Gian</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-slate-500 dark:text-slate-400 font-light text-xl max-w-2xl mx-auto"
          >
            Hành trình lịch sử qua những cột mốc đáng nhớ nhất của ngôi trường 60 năm tuổi.
          </motion.p>
        </div>

        <div className="relative">
          <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-[1px] bg-slate-300 dark:bg-slate-800 -translate-x-1/2" />

          {MILESTONES.map((milestone, i) => (
            <motion.div
              key={i}
              className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-0 mb-32 last:mb-0 ${
                i % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute left-[31px] md:left-1/2 top-10 md:top-1/2 w-4 h-4 bg-red-800 dark:bg-red-600 rounded-full border-2 border-[#F7F5F0] dark:border-slate-950 shadow-xl -translate-x-1/2 md:-translate-y-1/2 z-10 ring-8 ring-red-50/50 dark:ring-red-900/30" />

              <div
                className={`w-full md:w-1/2 pl-20 pr-4 md:px-0 flex ${
                  i % 2 === 0 ? "md:justify-end md:pr-20" : "md:justify-start md:pl-20"
                }`}
              >
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="w-full max-w-[520px] aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl dark:shadow-black/50 border border-white dark:border-slate-800 relative group cursor-pointer" 
                  onClick={() => setSelectedMilestone(milestone)}
                >
                  <SafeImage loading="lazy" src={milestone.img}
                     alt={milestone.title}
                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                   />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <p className="text-xs uppercase tracking-[0.2em] mb-2 opacity-80">Chương {i + 1}</p>
                    <h4 className="text-2xl font-serif italic">{milestone.title}</h4>
                  </div>
                </motion.div>
              </div>

              <div
                className={`w-full md:w-1/2 pl-20 pr-4 md:px-0 flex flex-col ${
                  i % 2 === 0 ? "md:pl-20 md:items-start md:text-left" : "md:pr-20 md:items-end md:text-right"
                }`}
              >
                <div className="relative">
                  <span className="font-serif text-5xl md:text-7xl text-red-900 dark:text-red-500 mb-6 block font-bold relative z-10 italic">
                    {milestone.period}
                  </span>
                </div>
                <h3 className="text-3xl font-serif text-slate-900 dark:text-slate-50 mb-6">
                  {milestone.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed text-xl mb-8 max-w-lg">
                  {milestone.desc}
                </p>
                <button
                  onClick={() => setSelectedMilestone(milestone)} 
                  className="group flex items-center gap-3 text-slate-900 dark:text-slate-50 hover:text-red-800 dark:hover:text-red-400 font-bold transition-all px-8 py-3 rounded-full border border-slate-300 dark:border-slate-700 hover:border-red-800 dark:hover:border-red-400 bg-white dark:bg-slate-900"
                >
                  Hồi tưởng chi tiết 
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Detailed Milestone */}
      <AnimatePresence>
        {selectedMilestone && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl dark:shadow-black/50 relative w-full max-w-4xl max-h-[90vh] flex flex-col"
            >
              <button 
                onClick={() => setSelectedMilestone(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white dark:bg-slate-900/80 backdrop-blur p-2 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors z-10 shadow-sm"
              >
                <X size={24} />
              </button>

              <div className="overflow-y-auto w-full h-full p-6 sm:p-10 hide-scrollbar">
                <span className="font-serif text-4xl sm:text-5xl text-red-700 font-bold mb-2 block">{selectedMilestone.period}</span>
                <h3 className="text-3xl sm:text-4xl text-slate-900 dark:text-slate-50 font-serif mb-6">{selectedMilestone.title}</h3>
                
                <div className="w-16 h-1 bg-amber-500 mb-8" />
                
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg sm:text-xl font-light mb-8 shrink-0">
                  {selectedMilestone.overview}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div>
                    <h4 className="text-xl text-slate-900 dark:text-slate-50 font-semibold mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">Khóa học sinh</h4>
                    <p className="text-slate-600 dark:text-slate-400 font-medium text-lg">{selectedMilestone.cohorts}</p>
                  </div>
                  <div>
                    <h4 className="text-xl text-slate-900 dark:text-slate-50 font-semibold mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">Thành tích cá nhân</h4>
                    <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400">
                      {selectedMilestone.individualAchievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="text-xl text-slate-900 dark:text-slate-50 font-semibold mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">Thành tích tập thể nhà trường</h4>
                    <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400">
                      {selectedMilestone.collectiveAchievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <h4 className="text-xl text-slate-900 dark:text-slate-50 font-semibold mb-6">Hình ảnh tư liệu</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="aspect-[4/3] rounded-2xl overflow-hidden sm:col-span-2">
                     <SafeImage loading="lazy" src={selectedMilestone.img} alt={selectedMilestone.title} className="w-full h-full object-cover" />
                   </div>
                   {selectedMilestone.gallery.map((img, idx) => (
                     <div key={idx} className="aspect-square sm:aspect-video rounded-2xl overflow-hidden">
                        <SafeImage loading="lazy" src={img} alt={`Tư liệu ${selectedMilestone.period}`} className="w-full h-full object-cover" />
                     </div>
                   ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
