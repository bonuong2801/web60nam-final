import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, type FormEvent } from "react";
import { Send, Mail, Trash2, LogOut, Settings, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { ref, onValue, push, remove, serverTimestamp, query, orderByChild, limitToLast } from "firebase/database";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, type User } from "firebase/auth";
import { db, auth } from "../lib/firebase";

const COOLDOWN_SECONDS = 60;
const STORAGE_KEY_LAST_TIME = "web60nam_last_wish_time";
const STORAGE_KEY_LAST_CONTENT = "web60nam_last_wish_content";

interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt?: number;
}

export function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isFlying, setIsFlying] = useState(false);
  const [remainingCooldown, setRemainingCooldown] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successNotice, setSuccessNotice] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Khởi tạo cooldown từ localStorage nếu người dùng vừa gửi gần đây
    try {
      const lastTimeStr = localStorage.getItem(STORAGE_KEY_LAST_TIME);
      if (lastTimeStr) {
        const elapsed = Math.floor((Date.now() - parseInt(lastTimeStr, 10)) / 1000);
        if (elapsed < COOLDOWN_SECONDS) {
          setRemainingCooldown(COOLDOWN_SECONDS - elapsed);
        }
      }
    } catch (e) {
      console.warn("Could not read localStorage:", e);
    }
  }, []);

  useEffect(() => {
    if (remainingCooldown <= 0) return;
    const timer = setInterval(() => {
      setRemainingCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [remainingCooldown]);

  useEffect(() => {
    // Auth listener
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const adminRef = ref(db, `admins/${currentUser.uid}`);
        onValue(adminRef, (snapshot) => {
          setIsAdmin(snapshot.exists());
        });
      } else {
        setIsAdmin(false);
      }
    });

    // Wishes listener — lấy 20 lời chúc mới nhất
    const wishesQuery = query(ref(db, "wishes"), orderByChild("createdAt"), limitToLast(20));
    const unsubscribeWishes = onValue(wishesQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const wishesArray: Wish[] = Object.entries(data)
          .map(([id, val]) => ({ id, ...(val as Omit<Wish, "id">) }))
          .reverse(); // mới nhất lên đầu
        setWishes(wishesArray);
      } else {
        setWishes([]);
      }
    }, (error) => {
      console.error("Realtime DB Error:", error);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeWishes();
    };
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAdmin(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDelete = async (wishId: string) => {
    if (!isAdmin) return;
    if (window.confirm("Bạn có chắc chắn muốn xoá lời nhắn này?")) {
      try {
        await remove(ref(db, `wishes/${wishId}`));
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessNotice("");

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    // 1. Kiểm tra rỗng
    if (!trimmedName || !trimmedMessage) {
      setErrorMessage("Vui lòng nhập họ tên và nội dung lời chúc.");
      return;
    }

    // 2. Ràng buộc độ dài
    if (trimmedName.length < 2 || trimmedName.length > 50) {
      setErrorMessage("Họ và tên cần có từ 2 đến 50 ký tự.");
      return;
    }

    if (trimmedMessage.length < 5 || trimmedMessage.length > 500) {
      setErrorMessage("Lời chúc cần có từ 5 đến 500 ký tự.");
      return;
    }

    // 3. Kiểm tra rate limit cooldown
    try {
      const lastTimeStr = localStorage.getItem(STORAGE_KEY_LAST_TIME);
      if (lastTimeStr) {
        const elapsed = Math.floor((Date.now() - parseInt(lastTimeStr, 10)) / 1000);
        if (elapsed < COOLDOWN_SECONDS) {
          const waitTime = COOLDOWN_SECONDS - elapsed;
          setRemainingCooldown(waitTime);
          setErrorMessage(`Bạn đang gửi quá nhanh. Vui lòng chờ ${waitTime}s để gửi tiếp.`);
          return;
        }
      }

      // 4. Kiểm tra spam nội dung trùng lặp
      const lastContent = localStorage.getItem(STORAGE_KEY_LAST_CONTENT);
      if (lastContent && lastContent.toLowerCase() === trimmedMessage.toLowerCase()) {
        setErrorMessage("Bạn vừa gửi lời nhắn này rồi, vui lòng không gửi trùng lặp.");
        return;
      }
    } catch (e) {
      console.warn("Storage check failed:", e);
    }

    setIsFlying(true);

    try {
      await push(ref(db, "wishes"), {
        name: trimmedName,
        message: trimmedMessage,
        createdAt: serverTimestamp()
      });

      // Lưu mốc thời gian và nội dung để kích hoạt rate limit 60s
      try {
        localStorage.setItem(STORAGE_KEY_LAST_TIME, Date.now().toString());
        localStorage.setItem(STORAGE_KEY_LAST_CONTENT, trimmedMessage);
      } catch (e) {
        console.warn("Storage write failed:", e);
      }
      setRemainingCooldown(COOLDOWN_SECONDS);

      setTimeout(() => {
        setName("");
        setMessage("");
        setIsFlying(false);
        setSuccessNotice("Lời chúc của bạn đã được gửi thành công!");
        setTimeout(() => setSuccessNotice(""), 5000);
      }, 1200);
    } catch (error) {
      console.error("Error adding wish:", error);
      setIsFlying(false);
      setErrorMessage("Không thể gửi lúc này. Vui lòng thử lại sau.");
    }
  };

  // always show the 3 sample wishes as the scattered sticky notes
  const fallbackWishes = [
    { id: "1", name: "Thanh Hằng '02", message: "Quá nhiều kỷ niệm thân thương. Chúc mừng sinh nhật trường tròn 60 tuổi!" },
    { id: "2", name: "Minh Quân '10", message: "Gửi lời cảm ơn chân thành đến tất cả thầy cô đã luôn dìu dắt em suốt những năm tháng thanh xuân." },
    { id: "3", name: "Bảo Thy '21", message: "Ba năm gắn bó rực rỡ nhất! Cảm ơn mái trường yêu dấu." },
  ];

  const displayWishes = fallbackWishes;
  const marqueeWishes = [...wishes, ...fallbackWishes];

  const FRAME_POSITIONS = [
    { top: "10%", left: "max(2%, calc(50% - 550px))" }, // Top Left
    { top: "35%", right: "max(2%, calc(50% - 550px))" }, // Top Right - lower
    { bottom: "10%", left: "max(5%, calc(50% - 480px))" }, // Bottom Left
  ];

  return (
    <section id="wishes" className="py-24 bg-white text-slate-900 relative overflow-hidden min-h-[800px] flex flex-col justify-center transition-colors">
      {/* Background decoration */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block overflow-hidden">
        <AnimatePresence>
          {displayWishes.map((wish, index) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              style={{ ...FRAME_POSITIONS[index], zIndex: 0 }}
              className="absolute max-w-[260px] bg-amber-50/90 border border-amber-200/80 shadow-lg shadow-amber-900/5 rounded-2xl p-5 transform w-full"
            >
              <div className="w-6 h-6 bg-amber-50 border-b border-r border-amber-200/80 absolute -bottom-3 left-8 transform rotate-45" />
              <p className="text-slate-700 italic text-sm mb-3 leading-relaxed">"{wish.message}"</p>
              <p className="text-amber-700 font-semibold text-xs text-right">— {wish.name}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-lg mx-auto bg-white/95 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-slate-200/80 border border-slate-200 mt-10 md:mt-16 w-full mb-16">
        <span className="caps-label mb-2 block text-center">Lưu bút thanh xuân</span>
        <h2 className="font-script text-4xl md:text-6xl mb-2 text-slate-900 text-center">Gửi Lời <span className="italic text-red-800">Yêu Thương</span></h2>
        <p className="text-slate-600 font-light text-center mb-8">Chia sẻ những kỷ niệm đẹp hoặc gửi những lời chúc ấm áp nhất.</p>

        <form onSubmit={handleSubmit} className="space-y-4 relative">
          <div>
            <input
              type="text"
              placeholder="Tên của bạn (VD: Quốc Anh '15)"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={isFlying}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>
          <div className="relative">
            <textarea
              placeholder="Lời nhắn hay kỷ niệm bạn muốn chia sẻ..."
              rows={4}
              value={message}
              onChange={e => setMessage(e.target.value)}
              disabled={isFlying}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={!name.trim() || !message.trim() || isFlying || remainingCooldown > 0}
            className="w-full py-4 text-slate-950 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold transition-all shadow-lg shadow-amber-500/20 flex justify-center items-center gap-2 relative overflow-hidden cursor-pointer"
          >
            <span className={isFlying ? "opacity-0" : "opacity-100 flex items-center gap-2"}>
              {remainingCooldown > 0 ? (
                <>
                  <Clock size={18} />
                  Vui lòng chờ ({remainingCooldown}s)
                </>
              ) : (
                <>
                  <Send size={18} />
                  Đăng Dấu Ấn
                </>
              )}
            </span>
          </button>

          {/* Feedback Messages */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex items-center gap-2 text-red-600 text-xs sm:text-sm bg-red-50 p-3 rounded-xl border border-red-200"
              >
                <AlertCircle size={16} className="shrink-0" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            {successNotice && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex items-center gap-2 text-emerald-700 text-xs sm:text-sm bg-emerald-50 p-3 rounded-xl border border-emerald-200"
              >
                <CheckCircle size={16} className="shrink-0" />
                <span>{successNotice}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Flying Winged Letter Animation */}
          <AnimatePresence>
            {isFlying && (
              <motion.div
                initial={{ opacity: 1, y: 0, scale: 0.8, x: "-50%" }}
                animate={{ opacity: 0, y: -400, scale: 0.5, x: "20%", rotate: 20 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute left-1/2 bottom-12 pointer-events-none z-50 flex items-center justify-center drop-shadow-2xl"
              >
                {/* Left Wing */}
                <motion.div
                  animate={{ rotateY: [0, 60, 0] }}
                  transition={{ duration: 0.25, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "right center" }}
                  className="w-8 h-10 bg-white rounded-l-full shadow-inner border border-slate-200 absolute right-full top-1"
                />

                {/* Envelope Body */}
                <div className="bg-amber-400 w-16 h-12 rounded flex items-center justify-center relative z-10 border border-amber-500 shadow-xl overflow-hidden">
                  <div className="absolute top-0 w-0 h-0 border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent border-t-[24px] border-t-amber-300 z-20 shadow-sm" />
                  <div className="absolute inset-0 border-l-[32px] border-l-amber-500/20 border-r-[32px] border-r-amber-500/20 border-b-[24px] border-b-amber-500/20 z-10" />
                  <Mail size={16} className="text-amber-700 relative z-0 mt-3" />
                </div>

                {/* Right Wing */}
                <motion.div
                  animate={{ rotateY: [0, -60, 0] }}
                  transition={{ duration: 0.25, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "left center" }}
                  className="w-8 h-10 bg-white rounded-r-full shadow-inner border border-slate-200 absolute left-full top-1"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      {/* Scrolling Marquee */}
      <div className="absolute bottom-0 left-0 right-0 bg-slate-50/95 backdrop-blur-md border-t border-slate-200 py-4 overflow-hidden z-20 flex group/marquee">
        <div className="flex animate-marquee shrink-0 items-center">
          {marqueeWishes.map((w, index) => (
            <div key={`${w.id}-${index}`} className="flex items-center gap-2 shrink-0 px-6 group/item">
              <span className="text-slate-700 font-serif italic whitespace-nowrap">"{w.message}"</span>
              <span className="text-amber-700 font-semibold text-sm whitespace-nowrap">— {w.name}</span>
              {isAdmin && w.id.length > 5 && (
                <button
                  onClick={() => handleDelete(w.id)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                  title="Xoá lời nhắn"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="flex animate-marquee shrink-0 items-center" aria-hidden="true">
          {marqueeWishes.map((w, index) => (
            <div key={`${w.id}-dup-${index}`} className="flex items-center gap-2 shrink-0 px-6 group/item">
              <span className="text-slate-700 font-serif italic whitespace-nowrap">"{w.message}"</span>
              <span className="text-amber-700 font-semibold text-sm whitespace-nowrap">— {w.name}</span>
              {isAdmin && w.id.length > 5 && (
                <button
                  onClick={() => handleDelete(w.id)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                  title="Xoá lời nhắn"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Admin Access Trigger - Secretly hidden in bottom corner */}
        <div className="absolute right-2 bottom-2 z-50">
          {!user ? (
            <button
              onClick={handleLogin}
              className="opacity-0 hover:opacity-100 p-2 text-slate-400 bg-black/5 hover:bg-black/10 rounded-full transition-opacity"
              title="Admin Login"
            >
              <Settings size={12} />
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-white shadow-sm border border-slate-200 rounded-full px-3 py-1 text-[10px]">
              <span className="text-slate-600 font-medium">{isAdmin ? "ADMIN" : user.displayName}</span>
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-500"
                title="Đăng xuất"
              >
                <LogOut size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
