import { motion } from "motion/react";
import { Play, Clock } from "lucide-react";
import { SafeImage } from "./SafeImage";

const PODCASTS = [
  { 
    id: 1, 
    title: "Tập 1: Những ngày đầu gian khó", 
    description: "Ký ức về những ngày đầu thành lập trường, lớp học tranh tre và những viên gạch đầu tiên.", 
    videoSrc: "/videos/podcast-1.mp4", 
    poster: "/images/podcast-1.jpg",
    comingSoon: true
  },
  { 
    id: 2, 
    title: "Tập 2: Tiếng trống trường thời hoa lửa", 
    description: "Những năm tháng vừa dạy học vừa sẵn sàng chiến đấu, tinh thần kiên cường của thầy và trò.", 
    videoSrc: "/videos/podcast-2.mp4", 
    poster: "/images/podcast-2.jpg",
    comingSoon: true
  },
  { 
    id: 3, 
    title: "Tập 3: Vượt khó vươn lên trong đổi mới", 
    description: "Câu chuyện về sự đồng lòng đổi mới phương pháp, vượt qua thử thách để xây dựng ngôi trường.", 
    videoSrc: "/videos/podcast-3.mp4", 
    poster: "/images/podcast-3.jpg",
    comingSoon: true
  },
  { 
    id: 4, 
    title: "Tập 4: Mái trường của những người gieo hạt", 
    description: "Tâm tình của các thầy cô giáo tâm huyết – những người lặng thầm chở con đò tri thức qua sông.", 
    videoSrc: "/videos/podcast-4.mp4", 
    poster: "/images/podcast-4.jpg",
    comingSoon: true
  },
  { 
    id: 5, 
    title: "Tập 5: Đỉnh cao trí tuệ & Bảng vàng danh dự", 
    description: "Hành trình bồi dưỡng học sinh giỏi, những kỳ thi thử thách và niềm tự hào rạng danh mái trường.", 
    videoSrc: "/videos/podcast-5.mp4", 
    poster: "/images/podcast-5.jpg",
    comingSoon: true
  },
  { 
    id: 6, 
    title: "Tập 6: Ký ức thanh xuân dưới tán phượng vĩ", 
    description: "Những kỷ niệm hồn nhiên tuổi học trò, tình bạn trong sáng và những rung động thanh xuân khó phai.", 
    videoSrc: "/videos/podcast-6.mp4", 
    poster: "/images/podcast-6.jpg",
    comingSoon: true
  },
  { 
    id: 7, 
    title: "Tập 7: Khát vọng bay xa từ mái trường Cẩm Giàng", 
    description: "Chia sẻ của các cựu học sinh thành đạt trên mọi nẻo đường đất nước và quốc tế, luôn nhớ về cội nguồn.", 
    videoSrc: "/videos/podcast-7.mp4", 
    poster: "/images/podcast-7.jpg",
    comingSoon: true
  },
  { 
    id: 8, 
    title: "Tập 8: Vững bước tương lai – 60 năm kiến tạo", 
    description: "Khát vọng chuyển mình trong kỷ nguyên mới, tiếp nối truyền thống 60 năm vững bước trên chặng đường giáo dục.", 
    videoSrc: "/videos/podcast-8.mp4", 
    poster: "/images/podcast-8.jpg",
    comingSoon: true
  }
];

export function VideoSection() {
  return (
    <section id="video" className="py-32 bg-white text-slate-900 relative overflow-hidden transition-colors">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pattern-paper pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 flex flex-col items-center"
        >
          {/* Logo chuỗi kỷ niệm / podcast - Giữ vầng hào quang ánh sáng vàng kim phía sau logo */}
          <div className="relative inline-block mb-6 p-4">
            <div className="absolute inset-0 bg-amber-400/25 rounded-full blur-2xl -z-10 scale-125" />
            <img
              src="/images/podcast-logo.png"
              alt="Logo Chuỗi Kỷ Niệm"
              className="max-h-40 sm:max-h-52 md:max-h-60 w-auto object-contain mx-auto filter drop-shadow-[0_8px_20px_rgba(120,53,15,0.18)] transition-transform duration-300 hover:scale-[1.02]"
              onError={(e) => {
                // Tự động ẩn nếu chưa có file ảnh logo trong thư mục public/images
                (e.currentTarget as HTMLElement).style.display = "none";
              }}
            />
          </div>
          <div className="w-24 h-px bg-amber-600/50 mx-auto mb-8" />
          <p className="text-slate-600 font-light text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto italic font-serif">
            Lắng nghe những tâm sự đong đầy cảm xúc, 8 câu chuyện chưa từng kể về mái trường và các thế hệ thầy trò Cẩm Giàng.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
          {PODCASTS.map((podcast, index) => (
            <motion.div
              key={podcast.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group flex flex-col bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:border-amber-500/40 transition-all duration-300"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-md bg-slate-900 w-full aspect-video border border-slate-200/80 mb-6 group cursor-not-allowed">
                {podcast.comingSoon ? (
                  <>
                    <SafeImage 
                      src={podcast.poster} 
                      alt={podcast.title} 
                      className="w-full h-full object-cover relative z-10 transition-all duration-500 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center z-20 transition-all duration-500 group-hover:bg-slate-900/40">
                       <div className="flex flex-col items-center justify-center bg-slate-900/85 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-700/60 transform group-hover:scale-105 transition-transform duration-500 shadow-xl">
                          <Clock className="text-amber-400 mb-2" size={32} />
                          <span className="text-amber-300 font-bold tracking-widest uppercase text-sm">Coming Soon</span>
                       </div>
                    </div>
                  </>
                ) : (
                  <>
                    <video 
                      controls 
                      preload="none"
                      poster={podcast.poster}
                      className="w-full h-full object-cover relative z-10"
                    >
                      <source src={podcast.videoSrc} type="video/mp4" />
                      Trình duyệt của bạn không hỗ trợ thẻ video.
                    </video>
                  </>
                )}
              </div>
              <div className="px-1 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-slate-900 mb-3 group-hover:text-amber-700 transition-colors">
                    {podcast.title}
                  </h3>
                  <p className="text-slate-600 font-light leading-relaxed">
                    {podcast.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
