import { motion } from "motion/react";
import { Play, Clock } from "lucide-react";
import { SafeImage } from "./SafeImage";

const PODCASTS = [
  { 
    id: 1, 
    title: "Giai đoạn 1: Những ngày đầu gian khó", 
    description: "Tâm sự về những năm tháng thành lập trường, những viên gạch đầu tiên.", 
    videoSrc: "/videos/podcast-1.mp4", 
    poster: "/images/podcast-1.jpg",
    comingSoon: true
  },
  { 
    id: 2, 
    title: "Giai đoạn 2: Vượt khó vươn lên", 
    description: "Câu chuyện về sự đồng lòng đổi mới, vượt qua thử thách để xây dựng ngôi trường.", 
    videoSrc: "/videos/podcast-2.mp4", 
    poster: "/images/podcast-2.jpg",
    comingSoon: true
  },
  { 
    id: 3, 
    title: "Giai đoạn 3: Chuyển mình mạnh mẽ", 
    description: "Những trang sử vẻ vang, thành tích đáng tự hào của nhiều thế hệ thầy trò.", 
    videoSrc: "/videos/podcast-3.mp4", 
    poster: "/images/podcast-3.jpg",
    comingSoon: true
  },
  { 
    id: 4, 
    title: "Giai đoạn 4: Hướng tới tương lai", 
    description: "Tiếp nối truyền thống 60 năm, vững bước trên chặng đường giáo dục mới.", 
    videoSrc: "/videos/podcast-4.mp4", 
    poster: "/images/podcast-4.jpg",
    comingSoon: true
  }
];

export function VideoSection() {
  return (
    <section id="video" className="py-32 bg-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-800/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <span className="caps-label mb-4 text-amber-500 border-amber-500/30">Chuỗi Podcast</span>
          <h2 className="font-script text-5xl md:text-7xl mb-8 text-white">Chuyện Đời - <span className="italic text-amber-500">Chuyện Nghề</span></h2>
          <div className="w-24 h-px bg-amber-500/50 mx-auto mb-8" />
          <p className="text-slate-400 font-light text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto italic font-serif">
            Lắng nghe những tâm sự đong đầy cảm xúc, những câu chuyện chưa từng kể qua 4 giai đoạn lịch sử của mái trường Cẩm Giàng.
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
              className="group flex flex-col"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-800 w-full aspect-video border border-slate-700/50 mb-6 group cursor-not-allowed">
                {podcast.comingSoon ? (
                  <>
                    <SafeImage 
                      src={podcast.poster} 
                      alt={podcast.title} 
                      className="w-full h-full object-cover relative z-10 transition-all duration-500 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center z-20 transition-all duration-500 group-hover:bg-slate-900/40">
                       <div className="flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm px-6 py-4 rounded-2xl border border-slate-700/50 transform group-hover:scale-105 transition-transform duration-500">
                          <Clock className="text-amber-500 mb-2" size={32} />
                          <span className="text-amber-400 font-bold tracking-widest uppercase text-sm">Coming Soon</span>
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
              <div className="px-2">
                <h3 className="font-serif text-2xl text-amber-400 mb-3 group-hover:text-amber-300 transition-colors">
                  {podcast.title}
                </h3>
                <p className="text-slate-400 font-light leading-relaxed">
                  {podcast.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
