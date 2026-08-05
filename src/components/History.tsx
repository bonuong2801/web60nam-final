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
    title: "Giai Đoạn Kiến Thiết & Đặt Nền Móng",
    desc: "Khởi đầu gian khó trong bom đạn chiến tranh, di dời sơ tán nhiều lần nhưng thầy và trò vẫn thi đua dạy tốt - học tốt và lao động xây dựng quê hương.",
    img: "/images/history-1.jpg",
    overview: "30 năm đầu tiên là chặng đường đối mặt với muôn vàn khó khăn của chiến tranh phá hoại và thời kỳ đầu đổi mới. Thầy và trò trường cấp III Cẩm Giàng đã vượt qua gian khổ, vừa bám lớp học tập xuất sắc vừa đóng góp hàng vạn ngày công đào mương, đắp đường kiến thiết địa phương và thực nghiệm các đề tài khoa học kỹ thuật nông nghiệp hữu ích.",
    cohorts: "Khóa 1 đến Khóa 30",
    individualAchievements: [
      "Đào tạo thành công 10.846 học sinh tốt nghiệp phổ thông (giai đoạn 1968-1975 đạt tỷ lệ 75%, giai đoạn 1976-1996 đạt tỷ lệ 92%).",
      "Đưa 1.086 học sinh thi đỗ vào các trường Đại học, Cao đẳng; hàng nghìn học sinh lên đường nhập ngũ bảo vệ Tổ quốc, nhiều người trở thành cán bộ lãnh đạo ưu tú, sĩ quan cao cấp.",
      "Bồi dưỡng 76 học sinh đạt giải trong các kỳ thi học sinh giỏi cấp tỉnh giai đoạn 1991-1996 (trong đó có 5 giải Nhất)."
    ],
    collectiveAchievements: [
      "Vinh dự được Thủ tướng Chính phủ tặng Bằng khen vào năm 1996 và Bộ Giáo dục và Đào tạo tặng Bằng khen vào năm 1976.",
      "Được Ty Giáo dục Hải Hưng tặng cờ 'Đơn vị tiên tiến xuất sắc thứ nhì tỉnh 2 năm 1974-1976' và cờ 'Trường xếp thứ 2 phổ thông cấp II, 5 năm thi đua hai tốt 1971-1976'.",
      "Chi bộ Đảng nhà trường liên tục được công nhận 'Trong sạch vững mạnh', được Tỉnh ủy tặng cờ thi đua năm 1982; tổ Văn của trường đạt danh hiệu tổ 'Lao động Xã hội Chủ nghĩa' năm học 1981-1982."
    ],
    gallery: [
      "/images/history-2.jpg",
      "/images/history-3.jpg"
    ]
  },
  {
    period: "1996 - 2006",
    title: "Chuyển Mình & Trưởng Thành",
    desc: "Thời kỳ đổi mới mạnh mẽ, mở rộng quy mô lớp học kỷ lục, xây dựng hạ tầng kiên cố và đẩy mạnh phong trào thi đua 'Học tập để ngày mai lập nghiệp'.",
    img: "/images/history-4.png",
    overview: "Giai đoạn phát triển mạnh mẽ theo Nghị quyết Trung ương 2 khóa VIII. Nhà trường không ngừng đổi mới phương pháp giảng dạy, mở rộng thêm cơ sở 2 tại xã Cẩm Vũ năm 1997 (tiền thân trường THPT Tuệ Tĩnh ngày nay) và nâng cao vững chắc tỷ lệ đỗ đại học toàn trường.",
    cohorts: "Khóa 31 đến Khóa 40",
    individualAchievements: [
      "Đào tạo 7.012 học sinh tốt nghiệp phổ thông đạt tỷ lệ trung bình 95%.",
      "Có 1.577 học sinh đỗ vào các trường Đại học, Cao đẳng (đạt tỷ lệ bình quân 22,5%)], liên tục đứng thứ hạng cao trong tỉnh (xếp thứ 3 toàn tỉnh năm 2002).",
      "Đạt 295 giải trong các kỳ thi học sinh giỏi cấp tỉnh (trong đó có 11 giải Nhất)."
    ],
    collectiveAchievements: [
      "Nhà trường liên tục đạt danh hiệu Tập thể Lao động tiên tiến; Công đoàn trường và Đoàn TNCS Hồ Chí Minh liên tục nhận nhiều Bằng khen vững mạnh xuất sắc của cấp tỉnh và Trung ương.",
      "Năm học 1998-1999 ghi nhận quy mô lớn kỷ lục trong lịch sử nhà trường với tổng số 48 lớp học.",
      "Xây dựng và khánh thành nhà lớp học 3 tầng gồm 12 phòng học kiên cố (Nhà A2) vào năm 2002."
    ],
    gallery: [
      "/images/history-5.png",
      "/images/history-6.png"
    ]
  },
  {
    period: "2006 - 2016",
    title: "Khẳng Định Vị Thế & Đỉnh Cao Thành Tích",
    desc: "10 năm khẳng định vị thế toàn diện, trường liên tục ghi danh trong tốp 200 trường THPT có điểm thi Đại học cao nhất cả nước.",
    img: "/images/history-7.jpg",
    overview: "Mốc son kỷ niệm 50 năm ngày thành lập trường ghi nhận sự bứt phá vượt bậc về chất lượng giáo dục đại trà lẫn chất lượng mũi nhọn, bồi dưỡng thành công nhiều Thủ khoa, Á khoa Đại học, xây dựng đội ngũ giáo viên có trình độ trên chuẩn ngày càng cao.",
    cohorts: "Khóa 41 đến Khóa 50",
    individualAchievements: [
      "Đào tạo 4.470 học sinh tốt nghiệp phổ thông đạt tỷ lệ 98,8%; khoảng 3.058 học sinh đỗ Đại học, Cao đẳng (tỷ lệ bình quân đạt 71,6%)]. Đỉnh cao năm 2016, điểm trung bình thi THPT Quốc gia của trường xuất sắc xếp thứ Nhì toàn tỉnh Hải Dương].",
      "Ghi nhận các tấm gương học tập xuất sắc: Phùng Thị Ngọc Yến (Thủ khoa khối C ĐH Luật Hà Nội năm 2009), Vũ Hồng Phong (Á khoa khối B ĐH Y Dược Hải Phòng năm 2011)] và Nguyễn Hữu Đức (Á khoa khối A ĐH Dược Hà Nội năm 2014) [19].",
      "Học sinh đạt 337 giải học sinh giỏi cấp tỉnh (gồm 2 giải Nhất); giáo viên đạt giải cao cuộc thi Dạy học theo chủ đề tích hợp cấp Bộ (01 giải Nhì năm học 2015-2016, 01 giải Khuyến khích năm học 2014-2015) cùng nhiều giải giáo viên dạy giỏi cấp tỉnh."
    ],
    collectiveAchievements: [
      "Vinh dự nhận danh hiệu 'Tập thể Lao động xuất sắc' cấp Tỉnh vào năm học 2015-2016; Đoàn trường vinh dự nhận Bằng khen của Trung ương Đoàn liên tục năm 2015, 2016.",
      "Khánh thành Nhà lớp học bộ môn 3 tầng (nhà A3) năm 2013, xây mới hoàn toàn dãy nhà 3 tầng 15 phòng học kiên cố thay thế nhà A1 đã xuống cấp và lát gạch đỏ toàn bộ 2.600 m2 sân trường.",
      "Cán bộ, giáo viên thực hiện nghiên cứu và ứng dụng thành công hơn 100 đề tài, sáng kiến kinh nghiệm phục vụ công tác giảng dạy."
    ],
    gallery: [
      "/images/history-8.jpg",
      "/images/history-9.jpg"
    ]
  },
  {
    period: "2016 - 2026",
    title: "Sứ mệnh & Tầm nhìn",
    desc: "Kỷ nguyên đạt chuẩn quốc gia, đẩy mạnh ứng dụng công nghệ thông tin, đổi mới căn bản toàn diện và thắp sáng ngọn lửa truyền thống.",
    img: "/images/history-10.jpg",
    overview: "Định hướng phát triển trường học nề nếp, kỷ cương, tích hợp các phương pháp giáo dục hiện đại nhằm phát triển năng lực toàn diện của người học, nâng tầm cơ sở vật chất hướng đến chuẩn hóa và hiện đại hóa.",
    cohorts: "Khóa 51 đến Khóa 60",
    individualAchievements: [
      "Đặt mục tiêu duy trì tỷ lệ học sinh khá, giỏi trên 90%, tỷ lệ đỗ Đại học, Cao đẳng đạt trên 80% và xếp thứ hạng học sinh giỏi tỉnh từ thứ 10 đến thứ Nhất toàn tỉnh.",
      "Phấn đấu xây dựng đội ngũ cán bộ, giáo viên với trên 30% trình độ trên chuẩn (Thạc sĩ, sau đại học) và 100% giáo viên tham gia hội thi Giáo viên dạy giỏi cấp tỉnh đều đạt giải."
    ],
    collectiveAchievements: [
      "Đón nhận bước ngoặt lịch sử: Trường THPT Cẩm Giàng chính thức được UBND tỉnh Hải Dương trao Quyết định công nhận trường đạt chuẩn quốc gia vào năm 2017.",
      "Định hướng quy hoạch phát triển quy mô trường lớp đạt số lượng ổn định 33 lớp nhằm đáp ứng nhu cầu giáo dục gia tăng tại địa phương.",
      "Huy động nguồn lực xây dựng mới khu nhà Hiệu bộ hiện đại, nhà đa năng, quy hoạch ao phía trước trường; phấn đấu đưa Thư viện nhà trường đạt danh hiệu Thư viện Xuất sắc và phát triển Thư viện điện tử."
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
        <div className="text-center mb-20">
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
              className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 mb-20 last:mb-0 ${
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
                  className="w-full max-w-[560px] aspect-video rounded-[2rem] overflow-hidden shadow-2xl dark:shadow-black/50 border border-white dark:border-slate-800 relative group cursor-pointer" 
                  onClick={() => setSelectedMilestone(milestone)}
                >
                  <SafeImage loading="lazy" src={milestone.img}
                     alt={milestone.title}
                     className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
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
