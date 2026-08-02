import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateWishSuggestion(topic: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Bạn là một cựu học sinh trường THPT Cẩm Giàng đang tham dự lễ kỷ niệm 60 năm ngày thành lập trường. 
      Hãy viết một lời chúc hoặc một kỷ niệm ngắn (khoảng 30-50 từ) về chủ đề: "${topic}". 
      Lời văn cần chân thành, cảm động, mang tính hoài niệm và tự hào. 
      Kết quả chỉ trả về đoạn văn bản lời chúc, không thêm bất kỳ thông tin nào khác.`,
    });

    return response.text?.trim() || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "";
  }
}
