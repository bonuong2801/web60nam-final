import { useState, useRef, type ChangeEvent } from "react";
import { motion } from "motion/react";
import { Upload, Download, RotateCw, ZoomIn, ZoomOut, RefreshCw, Image as ImageIcon, Sparkles } from "lucide-react";

const FRAME_IMAGE_SRC = "/images/avatar-frame.webp";
const EXPORT_SIZE = 1254; // Độ phân giải gốc chuẩn của khung kỷ niệm

export function AvatarFrameSection() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const dragStartRef = useRef({ x: 0, y: 0 });
  const initialPosRef = useRef({ x: 0, y: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setRotation(0);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  // Kéo di chuyển chuột (Mouse Drag)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imageSrc) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    initialPosRef.current = { ...position };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPosition({
      x: initialPosRef.current.x + dx,
      y: initialPosRef.current.y + dy,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Kéo di chuyển cảm ứng trên điện thoại (Touch Drag)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!imageSrc || e.touches.length !== 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    initialPosRef.current = { ...position };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    const dy = e.touches[0].clientY - dragStartRef.current.y;
    setPosition({
      x: initialPosRef.current.x + dx,
      y: initialPosRef.current.y + dy,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Zoom bằng lăn chuột
  const handleWheel = (e: React.WheelEvent) => {
    if (!imageSrc) return;
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 0.08 : -0.08;
    setScale((prev) => Math.min(Math.max(0.3, prev + zoomFactor), 3));
  };

  // Xuất ảnh Canvas độ nét cao 1254x1254px
  const handleExport = async () => {
    if (!imageSrc) return;
    setIsExporting(true);

    try {
      const canvas = document.createElement("canvas");
      canvas.width = EXPORT_SIZE;
      canvas.height = EXPORT_SIZE;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      // 1. Tải ảnh người dùng
      const userImg = new Image();
      userImg.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        userImg.onload = () => resolve();
        userImg.onerror = reject;
        userImg.src = imageSrc;
      });

      // 2. Tải ảnh khung kỷ niệm
      const frameImg = new Image();
      frameImg.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        frameImg.onload = () => resolve();
        frameImg.onerror = reject;
        frameImg.src = FRAME_IMAGE_SRC;
      });

      // Tỉ lệ quy đổi từ kích thước hiển thị sang kích thước canvas
      const viewportElem = viewportRef.current;
      const displaySize = viewportElem ? viewportElem.clientWidth : 400;
      const scaleMultiplier = EXPORT_SIZE / displaySize;

      // 3. Vẽ ảnh người dùng với vị trí, xoay và phóng to
      ctx.save();
      ctx.translate(
        EXPORT_SIZE / 2 + position.x * scaleMultiplier,
        EXPORT_SIZE / 2 + position.y * scaleMultiplier
      );
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(scale * scaleMultiplier, scale * scaleMultiplier);

      const userAspect = userImg.width / userImg.height;
      let drawWidth = displaySize;
      let drawHeight = displaySize;
      if (userAspect > 1) {
        drawWidth = displaySize * userAspect;
      } else {
        drawHeight = displaySize / userAspect;
      }

      ctx.drawImage(userImg, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
      ctx.restore();

      // 4. Vẽ đè khung kỷ niệm 60 năm lên trên
      ctx.drawImage(frameImg, 0, 0, EXPORT_SIZE, EXPORT_SIZE);

      // 5. Tải file về máy
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setIsExporting(false);
            return;
          }
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "avatar-60nam-thpt-camgiang.png";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          setIsExporting(false);
        },
        "image/png",
        1.0
      );
    } catch (err) {
      console.error("Lỗi khi xuất ảnh:", err);
      alert("Đã có lỗi xảy ra khi tạo ảnh. Xin vui lòng thử lại!");
      setIsExporting(false);
    }
  };

  return (
    <section id="avatar-frame" className="py-32 bg-white text-slate-900 relative overflow-hidden transition-colors">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pattern-paper pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="caps-label mb-4">Lan toả niềm tự hào</span>
            <h2 className="font-script text-5xl md:text-7xl mb-6 text-slate-900">
              Khung Avatar <span className="italic text-red-800">Kỷ Niệm</span>
            </h2>
            <div className="w-24 h-px bg-amber-500 mx-auto mb-8" />
            <p className="text-slate-600 font-light text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto italic font-serif">
              "Cùng khoác lên ảnh đại diện chiếc áo mới chào mừng đại lễ 60 năm trường THPT Cẩm Giàng. Hãy cùng lan tỏa tình yêu và niềm tự hào về mái trường thân thương!"
            </p>
          </motion.div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Cột Trái: Trình ghép ảnh Canvas trực quan */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col items-center"
          >
            <div className="w-full max-w-lg bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 flex flex-col items-center">
              {/* Vùng Viewport 1:1 tương tác */}
              <div
                ref={viewportRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onWheel={handleWheel}
                className={`relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden border-2 border-dashed ${
                  imageSrc ? "border-amber-400 bg-slate-950 cursor-grab active:cursor-grabbing" : "border-slate-300 bg-white hover:bg-amber-50/50 cursor-pointer"
                } shadow-inner select-none transition-colors flex items-center justify-center`}
                onClick={() => {
                  if (!imageSrc && fileInputRef.current) {
                    fileInputRef.current.click();
                  }
                }}
              >
                {imageSrc ? (
                  <>
                    {/* Ảnh người dùng */}
                    <div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      style={{
                        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${scale})`,
                        transition: isDragging ? "none" : "transform 0.1s ease-out",
                      }}
                    >
                      <img
                        src={imageSrc}
                        alt="Ảnh đại diện"
                        className="max-w-none w-full h-full object-cover"
                        draggable={false}
                      />
                    </div>

                    {/* Khung kỷ niệm 60 năm overlay */}
                    <img
                      src={FRAME_IMAGE_SRC}
                      alt="Khung kỷ niệm 60 năm THPT Cẩm Giàng"
                      className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10 drop-shadow-sm"
                      draggable={false}
                    />

                    {/* Gợi ý di chuyển */}
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white/90 text-[10px] px-3 py-1 rounded-full z-20 pointer-events-none font-medium">
                      Chạm / Kéo để căn chỉnh khuôn mặt
                    </div>
                  </>
                ) : (
                  <>
                    {/* Giả lập nền chân dung mờ nhẹ ở tâm */}
                    <div className="absolute inset-0 bg-linear-to-b from-slate-100 to-amber-50/40 flex items-center justify-center pointer-events-none">
                      <div className="w-52 h-52 rounded-full border border-dashed border-amber-300/80 bg-white/70 flex items-center justify-center shadow-inner" />
                    </div>

                    {/* Khung kỷ niệm 60 năm hiển thị xem trước trực tiếp trên khung hình */}
                    <img
                      src={FRAME_IMAGE_SRC}
                      alt="Khung xem trước kỷ niệm 60 năm THPT Cẩm Giàng"
                      className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10 drop-shadow-md"
                      draggable={false}
                    />

                    {/* Huy hiệu Khung xem trước */}
                    <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-[10px] font-bold px-2.5 py-1 rounded-full z-20 shadow-sm flex items-center gap-1">
                      <Sparkles size={12} />
                      <span>Khung xem trước</span>
                    </div>
                  </>
                )}

                {/* Input chọn file ẩn */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Thanh điều khiển khi đã tải ảnh */}
              {imageSrc && (
                <div className="w-full max-w-md mt-5 space-y-3">
                  {/* Slider Zoom */}
                  <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-xs">
                    <button
                      onClick={() => setScale((s) => Math.max(0.3, s - 0.1))}
                      className="p-1 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                      title="Thu nhỏ"
                    >
                      <ZoomOut size={16} />
                    </button>
                    <input
                      type="range"
                      min="0.3"
                      max="2.5"
                      step="0.02"
                      value={scale}
                      onChange={(e) => setScale(parseFloat(e.target.value))}
                      className="flex-1 accent-amber-500 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                    />
                    <button
                      onClick={() => setScale((s) => Math.min(2.5, s + 0.1))}
                      className="p-1 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                      title="Phóng to"
                    >
                      <ZoomIn size={16} />
                    </button>
                  </div>

                  {/* Nút xoay, đặt lại, đổi ảnh */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <button
                      onClick={handleRotate}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium rounded-xl transition-colors cursor-pointer"
                    >
                      <RotateCw size={14} />
                      Xoay 90°
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium rounded-xl transition-colors cursor-pointer"
                    >
                      <RefreshCw size={14} />
                      Đặt lại vị trí
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium rounded-xl transition-colors cursor-pointer"
                    >
                      <ImageIcon size={14} />
                      Đổi ảnh
                    </button>
                  </div>
                </div>
              )}

              {/* Nút Tải Ảnh Về Máy */}
              <div className="w-full mt-6">
                {imageSrc ? (
                  <button
                    onClick={handleExport}
                    disabled={isExporting}
                    className="w-full py-4 px-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base rounded-2xl shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-[1.02] active:scale-98"
                  >
                    <Download size={20} />
                    <span>{isExporting ? "Đang xuất ảnh chất lượng cao..." : "Tải Ảnh Avatar Về Máy"}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-4 px-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base rounded-2xl shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-98"
                  >
                    <Upload size={20} />
                    <span>Chọn Ảnh Để Bắt Đầu Ghép Khung</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Cột Phải: Hướng dẫn 3 bước */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-slate-900">Cách Ghép Khung Nhanh Chóng</h3>
                  <p className="text-slate-500 text-xs">Chỉ với 3 bước đơn giản trên điện thoại hoặc máy tính</p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-sm shrink-0 mt-0.5 shadow-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">Tải ảnh chân dung</h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Chọn một bức ảnh chụp rõ mặt, tươi tắn từ thư viện ảnh trên điện thoại hoặc máy tính của bạn.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-sm shrink-0 mt-0.5 shadow-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">Căn chỉnh khuôn mặt</h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Vuốt kéo để đưa khuôn mặt vào giữa tâm vòng tròn, sử dụng thanh trượt để phóng to hoặc thu nhỏ ảnh cho cân đối.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-sm shrink-0 mt-0.5 shadow-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">Tải về & Đổi ảnh đại diện</h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Nhấn <strong>"Tải Ảnh Avatar Về Máy"</strong> để lưu ảnh sắc nét chuẩn 1254 × 1254 px và cập nhật ngay lên Facebook, Zalo!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
