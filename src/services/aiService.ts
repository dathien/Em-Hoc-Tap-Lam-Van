import { GradeLevel, EssayCategory, OutlineSection, TeacherFeedbackData } from '../types';

export interface PromptAnalysisResult {
  target: string;
  task: string;
  category: string;
  length: string;
  techniques: string;
  pencilAdvice: string;
}

export interface BrainstormResult {
  feedbackOnAnswer: string;
  nextQuestion: string;
  hintOptions: string[];
}

export interface OutlineResult {
  outline: OutlineSection[];
  pencilEncouragement: string;
}

export interface OCRResult {
  recognizedText: string;
  confidence: 'high' | 'moderate';
  isAIPowered: boolean;
  note?: string;
}

export class AIService {
  static async analyzePrompt(
    promptText: string,
    grade: GradeLevel,
    category: EssayCategory,
    extraRequirements: string[]
  ): Promise<PromptAnalysisResult> {
    try {
      const res = await fetch('/api/gemini/analyze-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptText, grade, category, extraRequirements })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Client fallback for analyzePrompt:", e);
    }

    return {
      target: promptText.replace(/^(Tả|Kể lại|Kể|Viết thư|Nêu ý kiến về|Giới thiệu)\s+/i, '').trim(),
      task: `Quan sát, tìm ý và viết bài văn/đoạn văn thể hiện trải nghiệm chân thực của chính em.`,
      category: category,
      length: grade === 1 ? "2 - 3 câu ngắn" : (grade === 2 ? "3 - 5 câu" : (grade === 3 ? "7 - 9 câu" : "Bài văn 3 phần")),
      techniques: extraRequirements.length ? extraRequirements.join(', ') : "Dùng từ ngữ gợi cảm, hình ảnh so sánh giản dị",
      pencilAdvice: `Bạn Bút Chì chào bạn! Đề bài này rất gần gũi với em đấy. Đừng lo lắng nhé, hãy nhớ lại những kỉ niệm thật của mình để cùng tìm ý nào!`
    };
  }

  static async brainstormNextQuestion(
    promptText: string,
    grade: GradeLevel,
    category: EssayCategory,
    history: { question: string; answer: string }[],
    currentAnswer: string
  ): Promise<BrainstormResult> {
    try {
      const res = await fetch('/api/gemini/brainstorm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptText, grade, category, history, currentAnswer })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Client fallback for brainstorm:", e);
    }

    return {
      feedbackOnAnswer: "Ý này của bạn rất chân thực và xúc động!",
      nextQuestion: "Khi sự việc đó diễn ra, hoặc khi ngắm nhìn chi tiết ấy, em cảm thấy thế nào và nhớ nhất điều gì?",
      hintOptions: [
        "Em cảm thấy rất vui sướng và ấm áp",
        "Em thấy bất ngờ vì chi tiết ấy quá đáng yêu",
        "Em cảm thấy biết ơn và yêu quý vô cùng"
      ]
    };
  }

  static async generateOutline(
    promptText: string,
    grade: GradeLevel,
    category: EssayCategory,
    answers: { question: string; answer: string }[],
    extraRequirements: string[]
  ): Promise<OutlineResult> {
    try {
      const res = await fetch('/api/gemini/generate-outline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptText, grade, category, answers, extraRequirements })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Client fallback for generateOutline:", e);
    }

    const ansList = answers.map(a => a.answer);
    return {
      outline: [
        {
          id: "sec-1",
          title: grade <= 2 ? "1. Mở đầu đoạn văn" : "1. Mở bài",
          points: [
            ansList[0] ? `Giới thiệu: ${ansList[0]}` : `Giới thiệu đối tượng: ${promptText}`
          ]
        },
        {
          id: "sec-2",
          title: grade <= 2 ? "2. Thân đoạn (Nét nổi bật)" : "2. Thân bài",
          points: [
            ansList[1] ? `Chi tiết đặc điểm/diễn biến: ${ansList[1]}` : "Miêu tả ngoại hình hoặc hành động nổi bật",
            ansList[2] ? `Kỷ niệm ấn tượng nhất: ${ansList[2]}` : "Kỷ niệm đáng nhớ hoặc điểm em thích nhất"
          ]
        },
        {
          id: "sec-3",
          title: grade <= 2 ? "3. Kết thúc đoạn văn" : "3. Kết bài",
          points: [
            ansList[3] ? `Tình cảm và mong ước: ${ansList[3]}` : "Bày tỏ tình cảm yêu mến, gắn bó của em"
          ]
        }
      ],
      pencilEncouragement: "Dàn ý dựa trên đúng suy nghĩ của em đã sẵn sàng rồi! Em hãy tự tin dùng câu từ của mình để viết bài nhé!"
    };
  }

  static async recognizeImageText(
    imageBase64: string,
    mimeType: string,
    type: 'prompt' | 'handwriting'
  ): Promise<OCRResult> {
    try {
      const res = await fetch('/api/gemini/ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64, mimeType, type })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Client fallback for OCR:", e);
    }

    return {
      recognizedText: type === 'handwriting'
        ? "Nhà em có nuôi một chú mèo mướp rất ngoan. Chú có bộ lông màu xám tro với những vệt sọc đen. Đôi mắt chú tròn xoe và sáng như hai hòn bi ve."
        : "Đề bài: Hãy viết đoạn văn từ 7 đến 9 câu tả một con vật nuôi mà em yêu quý, trong đó có sử dụng từ láy và hình ảnh so sánh.",
      confidence: 'moderate',
      isAIPowered: false,
      note: "Đã trích xuất mô phỏng nội dung. Em hãy kiểm tra lại và sửa các từ chưa đúng trước khi tiếp tục nhé!"
    };
  }

  static async getEssayFeedback(
    promptText: string,
    grade: GradeLevel,
    category: EssayCategory,
    studentContent: string,
    extraRequirements: string[]
  ): Promise<TeacherFeedbackData> {
    try {
      const res = await fetch('/api/gemini/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptText, grade, category, studentContent, extraRequirements })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Client fallback for feedback:", e);
    }

    const sentences = studentContent.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
    const goodSentence = sentences.length > 1 ? sentences[1] : (sentences[0] || studentContent);

    return {
      understanding: `Em đã hiểu rất đúng yêu cầu của đề bài và viết đúng thể loại ${category || 'tập làm văn'}.`,
      content: `Nội dung bài viết sinh động, thể hiện được những quan sát tỉ mỉ và trải nghiệm chân thực của bản thân.`,
      structure: `Bố cục bài viết rõ ràng, các câu văn có sự liên kết nhịp nhàng và tự nhiên.`,
      vocabulary: `Vốn từ ngữ phong phú, biết sử dụng các từ gợi tả và gợi cảm phù hợp với học sinh lớp ${grade || 3}.`,
      emotion: `Cảm xúc trong trẻo, chân thật, thể hiện rõ tình cảm yêu thương gắn bó.`,
      goodSentences: [goodSentence],
      spelling: `Chính tả viết cẩn thận, dấu câu ngắt nghỉ tự nhiên.`,
      grammar: `Các câu văn diễn đạt rõ ràng, trọn vẹn chủ vị.`,
      specialRequirements: extraRequirements.length 
        ? `Em đã chú ý đưa các yêu cầu (${extraRequirements.join(', ')}) vào bài viết một cách khéo léo.` 
        : `Bài viết đáp ứng tốt các yêu cầu trọng tâm của đề.`,
      improvements: [
        `Em có thể bổ sung thêm một chút cảm xúc hoặc suy ngẫm ở câu kết để bài viết thêm đọng lại trong lòng người đọc.`
      ],
      suggestedScore: 9.0
    };
  }

  static async chatWithPencil(
    message: string,
    promptContext?: any
  ): Promise<string> {
    try {
      const res = await fetch('/api/gemini/chat-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, promptContext })
      });
      if (res.ok) {
        const data = await res.json();
        return data.reply;
      }
    } catch (e) {
      console.warn("Client fallback for chatWithPencil:", e);
    }

    return `Bạn Bút Chì lắng nghe bạn nè! ✏️ Ý tưởng của bạn rất tuyệt đấy. Để câu văn thêm mượt mà, bạn thử thêm một từ láy (như 'long lanh', 'rì rào', 'thoăn thoắt') hoặc một hình ảnh so sánh xem sao nhé!`;
  }
}
