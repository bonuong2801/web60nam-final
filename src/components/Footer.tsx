import { Mail, MapPin, Phone, Facebook, Youtube, Instagram } from "lucide-react";
import { SafeImage } from "./SafeImage";

export function Footer() {
  return (
    <footer className="bg-[#0b1120] text-slate-300 py-32 relative overflow-hidden border-b-[12px] border-amber-600">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-5 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center p-2 shadow-2xl dark:shadow-black/50">
                 <SafeImage loading="lazy" src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-white leading-tight">Trường THPT <br/>Cẩm Giàng</h3>
                <p className="text-amber-500 text-[10px] uppercase tracking-[0.3em] font-bold mt-1">Hải Dương • Since 1966</p>
              </div>
            </div>
            <p className="text-base font-light leading-relaxed text-slate-400 italic">
              "60 năm một chặng đường – nơi thắp sáng tri thức, nuôi dưỡng tâm hồn và gắn kết những thế hệ học trò trưởng thành. Thanh xuân có bạn là thanh xuân tuyệt vời nhất."
            </p>
          </div>

          <div className="md:col-span-4 space-y-8">
             <div>
               <h4 className="caps-label text-white !mb-6">Thông tin liên hệ</h4>
               <ul className="space-y-6 font-light text-sm text-slate-400">
                 <li className="flex items-start gap-4 group">
                   <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-900 dark:text-slate-50 transition-colors">
                     <MapPin size={16} />
                   </div>
                   <span className="leading-relaxed">Thị trấn Lai Cách, Huyện Cẩm Giàng, Tỉnh Hải Dương</span>
                 </li>
                 <li className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-900 dark:text-slate-50 transition-colors">
                      <Phone size={16} />
                    </div>
                   <span>(0220) 3xxx xxx</span>
                 </li>
                 <li className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-900 dark:text-slate-50 transition-colors">
                      <Mail size={16} />
                    </div>
                   <span>alumni@camgiang.edu.vn</span>
                 </li>
               </ul>
             </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="caps-label text-white !mb-6">Kỷ niệm 60 năm</h4>
            <div className="relative aspect-square w-40 mx-auto md:mx-0">
               <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_20s_linear_infinite]">
                 <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                 <text className="text-[7.5px] uppercase tracking-[2px] fill-amber-500 font-bold">
                   <textPath xlinkHref="#circlePath">
                     THPT Cẩm Giàng • 60 Năm Thành Lập • 1966 - 2026 •
                   </textPath>
                 </text>
               </svg>
               <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-4xl font-bold text-white italic">60</span>
               </div>
            </div>
          </div>
        </div>
        
        <div className="mt-24 pt-10 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
          <p>&copy; {new Date().getFullYear()} THPT Cẩm Giàng. All Rights Reserved.</p>
          <p className="flex items-center gap-2">
            Design with <span className="text-red-500">❤️</span> by Anniversary Media Team
          </p>
        </div>
      </div>
    </footer>
  );
}
