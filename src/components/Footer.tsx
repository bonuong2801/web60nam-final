import { Mail, MapPin, Phone, Facebook, Youtube, Instagram } from "lucide-react";
import { SafeImage } from "./SafeImage";

export function Footer() {
  return (
    <footer className="bg-[#0b1120] text-slate-300 py-14 md:py-16 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-red-500/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 flex items-center justify-center overflow-hidden shrink-0">
                 <SafeImage loading="lazy" src="/images/logon.png?v=20260802" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-white leading-tight">Trường THPT <br className="hidden sm:inline" />Cẩm Giàng</h3>
                <p className="text-amber-500 text-[10px] uppercase tracking-[0.25em] font-bold mt-0.5">Hải Dương • Since 1966</p>
              </div>
            </div>
            <p className="text-sm font-light leading-relaxed text-slate-400 italic">
              "60 năm một chặng đường – nơi thắp sáng tri thức, nuôi dưỡng tâm hồn và gắn kết những thế hệ học trò trưởng thành. Thanh xuân có bạn là thanh xuân tuyệt vời nhất."
            </p>
          </div>

          <div className="md:col-span-4 space-y-4">
             <div>
               <h4 className="caps-label text-white !mb-4">Thông tin liên hệ</h4>
               <ul className="space-y-3 font-light text-sm text-slate-400">
                 <li className="flex items-start gap-3 group">
                   <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-900 transition-colors shrink-0 mt-0.5">
                     <MapPin size={14} />
                   </div>
                   <span className="leading-snug">Xã Mao Điền, TP.Hải Phòng</span>
                 </li>
                 <li className="flex items-center gap-3 group">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-900 transition-colors shrink-0">
                      <Phone size={14} />
                    </div>
                   <span>0865860336</span>
                 </li>
                 <li className="flex items-center gap-3 group">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-900 transition-colors shrink-0">
                      <Mail size={14} />
                    </div>
                   <span className="break-all sm:break-normal">thpt-camgiang@haiphong.edu.vn</span>
                 </li>
               </ul>
             </div>
          </div>

          <div className="md:col-span-3 flex flex-col items-start md:items-center">
            <h4 className="caps-label text-white !mb-4">Kỷ niệm 60 năm</h4>
            <div className="relative aspect-square w-28 md:w-32">
               <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_20s_linear_infinite]">
                 <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                 <text className="text-[7.5px] uppercase tracking-[2px] fill-amber-500 font-bold">
                   <textPath xlinkHref="#circlePath">
                     THPT Cẩm Giàng • 60 Năm Thành Lập • 1966 - 2026 •
                   </textPath>
                 </text>
               </svg>
               <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-3xl font-bold text-white italic">60</span>
               </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
          <p>&copy; {new Date().getFullYear()} THPT Cẩm Giàng. All Rights Reserved.</p>
          <p className="flex items-center gap-2">
            Design by <span className="text-red-500">tunggduongg</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
