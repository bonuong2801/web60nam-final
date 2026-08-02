import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { SafeImage } from "./SafeImage";

interface Memory {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  year: string;
  img: string;
}

// THAY ẢNH VÀ THÔNG TIN PHẦN CÂU CHUYỆN KÝ ỨC:
// 'img' thay bằng dẫn ảnh cục bộ (Ví dụ: "/images/cau-chuyen-1.jpg")
const MEMORIES: Memory[] = [
  { 
    id: 1, 
    title: "Trận Bóng Rổ Lịch Sử Cuối Cấp", 
    excerpt: "Hôm đó trời mưa rào, tưởng chừng giải đấu đã bị hủy bỏ, nhưng cuối cùng cả trường lại đứng dưới mưa...", 
    content: "Đó là một buổi chiều tháng 5, chỉ còn vài tuần nữa là kết thúc năm học cuối cấp. Cả đội bóng rổ đã tập luyện ròng rã suốt một năm chỉ chờ ngày tranh cúp khối 12. Khi tiếng còi khai cuộc chuẩn bị vang lên thì trời bỗng đổ mưa rào tơi tả. Tưởng chừng mọi thứ khép lại, cả giải đấu bị hủy bỏ. Thế nhưng, cô hiệu trưởng đã bước ra, nở một nụ cười ấm áp: 'Thanh xuân đôi khi cần một chút mưa'. Cả sân trường vỡ òa, chúng tôi đã vắt kiệt sức mình dưới gầm trời mịt mù mưa đó. Dù kết quả có ra sao, đó mới là trận đấu vĩ đại nhất của tuổi thanh xuân.",
    author: "Quốc Tuấn", 
    year: "1999",
    img: "/images/memories-1.jpg"
  },
  { 
    id: 2, 
    title: "Đêm Văn Nghệ Chào Tân Học Sinh", 
    excerpt: "Màn nhung đỏ từ từ kéo lên, tim tôi đập thình thịch. Ban nhạc của lớp đã luyện tập cật lực hàng tháng trời...", 
    content: "Lần đầu tiên đứng trên sân khấu lớn trước cả ngàn người. Dưới ánh đèn sân khấu chói lọi, mọi thứ dường như nhòa đi. Chỉ còn tiếng trống nhịp vang lên và tiếng hát đồng thanh của cả lớp. Chúng tôi đã cùng nhau đi qua những buổi trưa không ngủ, cãi vã, rồi lại làm hòa chỉ vì một phần bè sai nốt. Màn đêm hôm ấy, những tiếng vỗ tay cuồng nhiệt đã khẳng định sức mạnh của tuổi trẻ, đúc kết lại bằng một cái ôm thật chặt sau cánh gà.",
    author: "Mai Linh", 
    year: "2012",
    img: "/images/memories-2.jpg"
  },
  { 
    id: 3, 
    title: "Lễ Tri Ân Đầy Nước Mắt", 
    excerpt: "Khoảnh khắc trao tay nhau những nhánh bằng lăng tím ngắt, không ai bảo ai, những giọt nước mắt cứ thế rơi...", 
    content: "Buổi sáng ngày bế giảng cuối cùng, sân trường không còn tiếng đùa giỡn, chỉ có những dòng lưu bút viết vội nhòe đi vì nước mắt. Cô chủ nhiệm đứng lặng lẽ ở góc sân, nhìn những đứa học trò trưởng thành mà cô đã dìu dắt suốt 3 năm. Khoảnh khắc ôm lấy cô, trao nhau những nhánh hoa bằng lăng tím ngắt, chúng tôi nhận ra mình đã thực sự phải nói lời chào tạm biệt khoảng trời đẹp nhất. Chuyến bay thanh xuân mang theo biết bao ký ức ngọt ngào vào một đời rộng lớn.",
    author: "Hải Yến", 
    year: "2005",
    img: "/images/memories-3.jpg"
  },
  { 
    id: 4, 
    title: "Chuyến Đi Thực Tế Không Quên", 
    excerpt: "Lần đầu tiên cả lớp cùng trải nghiệm một ngày ở vùng cao, nơi mà những ánh lửa bập bùng thắp sáng thanh xuân...", 
    content: "Lần đầu tiên cả lớp cùng trải nghiệm chuyến hành trình 3 ngày về những vùng đất hoang sơ. Chúng tôi đã cùng nấu ăn trong ánh lửa bập bùng, đàn hát những bài ca tuổi trẻ và ngắm bầu trời đầy sao. Những rắc rối nho nhỏ như việc dựng lều bị hỏng hay bữa cơm rát khói vụng về lại hóa ra là kỷ niệm đáng nhớ nhất. Những trải nghiệm ấy gắn kết từng thành viên, giúp chúng tôi nhận ra tình bạn đẹp và chân quý biết bao.",
    author: "Hoàng Phong", 
    year: "2018",
    img: "/images/memories-4.jpg"
  },
];

export function Memories() {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [showAll, setShowAll] = useState(false);
  
  const displayedMemories = showAll ? MEMORIES : MEMORIES.slice(0, 2);

  return (
    <section id="memories" className="py-32 bg-[#F7F5F0] dark:bg-slate-950 transition-colors overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="text-left">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="caps-label"
            >
              Góc lưu bút
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-script text-5xl md:text-7xl text-slate-900 dark:text-slate-50 mb-6"
            >
              Ký Ức <span className="italic text-red-800">Học Trò</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 font-light text-xl max-w-xl"
            >
              Những câu chuyện chưa từng kể, được lưu giữ qua tháng năm nơi góc sân trường đầy nắng.
            </motion.p>
          </div>
          {!showAll && MEMORIES.length > 2 && (
            <button 
              onClick={() => setShowAll(true)}
              className="group flex items-center gap-3 text-slate-900 dark:text-slate-50 hover:text-red-800 font-bold transition-all px-8 py-4 rounded-full border border-slate-300 hover:border-red-800 bg-white dark:bg-slate-900 shadow-sm"
            >
              Xem tất cả kỉ niệm
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          )}
        </div>

        <div className="columns-1 md:columns-2 gap-12 space-y-12">
           {displayedMemories.map((story, i) => (
             <motion.div
               key={story.id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
               className="break-inside-avoid group cursor-pointer"
               onClick={() => setSelectedMemory(story)}
             >
               <div className="bg-white dark:bg-slate-900 p-6 pb-12 shadow-xl hover:shadow-2xl dark:shadow-black/50 transition-all rounded-sm border border-slate-100 dark:border-slate-800 relative rotate-[-1deg] group-hover:rotate-0">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-amber-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="w-full aspect-[4/3] overflow-hidden mb-6 rounded-sm relative">
                    <SafeImage loading="lazy" src={story.img} 
                      alt={story.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute top-4 right-4 bg-white dark:bg-slate-900/90 backdrop-blur px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest text-red-900 shadow-sm">
                      {story.year}
                    </div>
                  </div>
                  
                  <div className="px-2">
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2 block">Ký ức của {story.author}</span>
                    <h3 className="text-2xl font-serif text-slate-900 dark:text-slate-50 mb-4 group-hover:text-red-800 transition-colors leading-tight italic">
                      {story.title}
                    </h3>
                    <p className="text-slate-500 font-light text-lg mb-8 line-clamp-3 leading-relaxed">
                      "{story.excerpt}"
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                       <span className="text-xs font-serif italic text-slate-400">— Nhấn để đọc tiếp</span>
                       <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-red-800 group-hover:text-white transition-all">
                         <ArrowRight size={16} />
                       </div>
                    </div>
                  </div>
               </div>
             </motion.div>
           ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F7F5F0] w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl dark:shadow-black/50 relative max-h-[90vh] flex flex-col"
            >
              <button 
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-full flex items-center justify-center text-slate-700 hover:bg-white dark:bg-slate-900 hover:text-red-700 transition-colors shadow-sm"
              >
                <X size={20} />
              </button>
              
              <div className="h-64 md:h-80 w-full relative flex-shrink-0">
                <SafeImage loading="lazy" src={selectedMemory.img} alt={selectedMemory.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                  <span className="text-amber-400 font-semibold tracking-wider font-mono text-sm uppercase">Niên Khóa {selectedMemory.year}</span>
                </div>
              </div>
              
              <div className="p-8 md:p-12 overflow-y-auto hide-scrollbar">
                <h3 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-slate-50 mb-4">{selectedMemory.title}</h3>
                <p className="text-sm text-slate-500 font-medium mb-8">Bài viết bởi: <span className="text-slate-800 dark:text-slate-200">{selectedMemory.author}</span></p>
                <div className="prose prose-slate prose-lg font-light leading-relaxed text-slate-700">
                  <p>{selectedMemory.content}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
