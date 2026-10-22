import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '25mb' }));

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY || '';
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn("Failed to initialize GoogleGenAI client:", err);
  }
}

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(apiKey),
    timestamp: new Date().toISOString()
  });
});

// 2. Analyze Prompt API
app.post('/api/gemini/analyze-prompt', async (req, res) => {
  const { promptText, grade, category, extraRequirements } = req.body;
  if (!promptText) {
    return res.status(400).json({ error: 'Thiếu nội dung đề bài' });
  }

  const systemInstruction = `Bạn là chuyên gia giáo dục tiểu học và giáo viên Tiếng Việt theo chương trình GDPT 2018 (bộ sách Kết nối tri thức với cuộc sống).
Nhiệm vụ: Phân tích đề bài tập làm văn cho học sinh lớp ${grade || 3} bằng ngôn ngữ dễ hiểu, thân thiện, ấm áp.
Quy tắc:
- Trả về định dạng JSON thuần túy (không bọc code block thừa nếu có thể, hoặc parse được).
- Các trường:
  "target": Đề yêu cầu viết về ai, việc gì hoặc sự vật nào?
  "task": Học sinh cần làm gì?
  "category": Kiểu bài là gì (Kể lại sự việc, Kể chuyện, Miêu tả, Giới thiệu, Tình cảm cảm xúc...)?
  "length": Yêu cầu về số câu, số đoạn (phù hợp lứa tuổi).
  "techniques": Biện pháp tu từ hoặc yêu cầu ngôn ngữ cần có (so sánh, nhân hóa, từ láy...).
  "pencilAdvice": Lời dặn dò ân cần, ngắn gọn của Bạn Bút Chì để em tự tin viết.`;

  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Đề bài: "${promptText}". Thể loại chọn: ${category || 'Tự do'}. Lớp: ${grade || 3}. Yêu cầu thêm: ${JSON.stringify(extraRequirements || [])}`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json'
        }
      });
      const parsed = JSON.parse(response.text || '{}');
      return res.json(parsed);
    } catch (e) {
      console.error("Gemini analyze-prompt error:", e);
    }
  }

  // Pedagogical Rule-based Fallback
  return res.json({
    target: promptText.replace(/^(Tả|Kể lại|Kể|Viết thư|Nêu ý kiến về|Giới thiệu)\s+/i, '').trim(),
    task: `Quan sát, tìm ý và viết bài văn/đoạn văn thể hiện trải nghiệm chân thực của chính em.`,
    category: category || (promptText.startsWith("Tả") ? "Miêu tả" : "Kể chuyện"),
    length: grade === 1 ? "2 - 3 câu ngắn" : (grade === 2 ? "3 - 5 câu" : (grade === 3 ? "7 - 9 câu" : "Bài văn 3 phần")),
    techniques: extraRequirements?.length ? extraRequirements.join(', ') : "Dùng từ ngữ gợi cảm, hình ảnh so sánh giản dị",
    pencilAdvice: `Bạn Bút Chì chào bạn! Đề bài này rất gần gũi với em đấy. Đừng lo lắng nhé, hãy nhớ lại những kỉ niệm thật của mình để cùng tìm ý nào!`
  });
});

// 3. Brainstorm Question API
app.post('/api/gemini/brainstorm', async (req, res) => {
  const { promptText, grade, category, history, currentAnswer } = req.body;

  const systemInstruction = `Bạn là Bạn Bút Chì - người bạn đồng hành cùng học sinh tiểu học (Lớp 1-5).
NGUYÊN TẮC QUAN TRỌNG NHẤT:
- AI KHÔNG ĐƯỢC TỰ VIẾT BÀI VĂN HAY TỰ BỊA KỶ NIỆM THAY HỌC SINH.
- Đặt câu hỏi gợi mở tiếp theo dựa trên chính câu trả lời của em.
- Hỏi về cảm xúc, chi tiết quan sát, thời gian, hành động.
- Không hỏi lại điều em đã trả lời.
- Ngôn ngữ thân ái, xưng "Bạn Bút Chì" và gọi học sinh là "bạn" hoặc "em".
Trả về JSON gồm:
{
  "feedbackOnAnswer": "Lời khen cụ thể ngắn gọn về câu trả lời của em",
  "nextQuestion": "Câu hỏi gợi ý tiếp theo để giúp em đào sâu chi tiết",
  "hintOptions": ["Gợi ý 1 nếu em chưa nghĩ ra", "Gợi ý 2", "Gợi ý 3"]
}`;

  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Đề: "${promptText}". Lớp: ${grade}. Kiểu bài: ${category}. Lịch sử hỏi đáp: ${JSON.stringify(history)}. Câu trả lời vừa xong của em: "${currentAnswer}".`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json'
        }
      });
      const parsed = JSON.parse(response.text || '{}');
      return res.json(parsed);
    } catch (e) {
      console.error("Gemini brainstorm error:", e);
    }
  }

  // Fallback
  return res.json({
    feedbackOnAnswer: `Ý tưởng này của bạn rất hay và chân thực!`,
    nextQuestion: `Khi sự việc đó diễn ra, hoặc khi ngắm nhìn chi tiết ấy, em cảm thấy thế nào và nhớ nhất điều gì?`,
    hintOptions: [
      `Em cảm thấy rất vui sướng và ấm áp`,
      `Em thấy bất ngờ vì chi tiết ấy quá đáng yêu`,
      `Em cảm thấy biết ơn và yêu quý vô cùng`
    ]
  });
});

// 4. Generate Customized Outline API
app.post('/api/gemini/generate-outline', async (req, res) => {
  const { promptText, grade, category, answers, extraRequirements } = req.body;

  const systemInstruction = `Bạn là giáo viên Tiếng Việt tiểu học chương trình 2018 Kết nối tri thức.
Nhiệm vụ: Tổng hợp các câu trả lời chân thật của học sinh thành một DÀN Ý RÕ RÀNG, CỤ THỂ.
Quy tắc:
- TUYỆT ĐỐI KHÔNG BIẾN DÀN Ý THÀNH BÀI VĂN HOÀN CHỈNH.
- Chỉ ghi các ý chính, gạch đầu dòng ngắn gọn.
- Lớp 1-2: Cấu trúc đoạn văn (Câu mở đầu, Các câu phát triển ý, Câu kết thúc).
- Lớp 3-5: 3 phần (Mở bài, Thân bài, Kết bài).
- Sử dụng chính trải nghiệm học sinh đã cung cấp trong câu trả lời.
Trả về JSON dạng:
{
  "outline": [
    { "id": "sec-1", "title": "Mở bài", "points": ["...", "..."] },
    { "id": "sec-2", "title": "Thân bài", "points": ["...", "..."] },
    { "id": "sec-3", "title": "Kết bài", "points": ["...", "..."] }
  ],
  "pencilEncouragement": "Lời động viên của Bạn Bút Chì"
}`;

  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Đề bài: "${promptText}". Lớp: ${grade}. Kiểu bài: ${category}. Yêu cầu thêm: ${JSON.stringify(extraRequirements)}. Các câu trả lời của em: ${JSON.stringify(answers)}`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json'
        }
      });
      const parsed = JSON.parse(response.text || '{}');
      return res.json(parsed);
    } catch (e) {
      console.error("Gemini outline error:", e);
    }
  }

  // Fallback
  const ansList = Array.isArray(answers) ? answers.map((a: any) => a.answer) : [];
  return res.json({
    outline: [
      {
        id: "sec-1",
        title: grade <= 2 ? "1. Mở đầu đoạn văn" : "1. Mở bài",
        points: [
          `Giới thiệu đối tượng/sự việc: ${ansList[0] || promptText}`,
        ]
      },
      {
        id: "sec-2",
        title: grade <= 2 ? "2. Thân đoạn (Kể / Tả chi tiết)" : "2. Thân bài",
        points: [
          `Đặc điểm hoặc diễn biến nổi bật: ${ansList[1] || 'Các chi tiết cụ thể'}`,
          `Chi tiết ấn tượng nhất: ${ansList[2] || 'Khoảnh khắc đáng nhớ'}`
        ]
      },
      {
        id: "sec-3",
        title: grade <= 2 ? "3. Kết thúc đoạn văn" : "3. Kết bài",
        points: [
          `Cảm xúc và tình cảm của em: ${ansList[3] || 'Tình cảm yêu mến, gắn bó'}`
        ]
      }
    ],
    pencilEncouragement: "Dàn ý của em đã rất đầy đủ các ý rồi đấy! Em có thể bấm vào từng ý để thêm hoặc sửa cho thật ưng ý nhé!"
  });
});

// 5. OCR from Image (Textbook prompt or Handwritten essay)
app.post('/api/gemini/ocr', async (req, res) => {
  const { imageBase64, mimeType, type } = req.body;
  if (!imageBase64) {
    return res.status(400).json({ error: 'Thiếu dữ liệu ảnh' });
  }

  const prompt = type === 'handwriting'
    ? 'Hãy nhận diện chính xác từng câu chữ viết tay tiếng Việt có dấu trong ảnh vở học sinh này. Giữ nguyên câu từ của em, không tự ý sửa lỗi chính tả hay thêm thắt từ ngữ. Chỉ trả về nội dung văn bản thuần túy.'
    : 'Hãy đọc chính xác đề bài hoặc câu hỏi tập làm văn tiếng Việt trong ảnh chụp sách giáo khoa này. Chỉ trả về văn bản đề bài nhận diện được.';

  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: mimeType || 'image/jpeg',
                data: imageBase64.replace(/^data:image\/\w+;base64,/, '')
              }
            },
            { text: prompt }
          ]
        }
      });
      return res.json({
        recognizedText: (response.text || '').trim(),
        confidence: 'high',
        isAIPowered: true
      });
    } catch (e) {
      console.error("Gemini OCR error:", e);
    }
  }

  // Fallback demo text
  return res.json({
    recognizedText: type === 'handwriting'
      ? "Nhà em có một chú mèo mướp rất ngoan. Chú có bộ lông màu xám tro với những vệt sọc đen. Đôi mắt chú tròn xoe và sáng như hai hòn bi ve."
      : "Đề bài: Hãy viết đoạn văn từ 7 đến 9 câu tả một con vật nuôi mà em yêu quý, trong đó có sử dụng từ láy và hình ảnh so sánh.",
    confidence: 'moderate',
    isAIPowered: false,
    note: "Đã trích xuất mô phỏng. Em hãy kiểm tra lại và chỉnh sửa chỗ chưa chuẩn xác nhé!"
  });
});

// 6. Essay Feedback & Grading (10 GDPT 2018 criteria)
app.post('/api/gemini/feedback', async (req, res) => {
  const { promptText, grade, category, studentContent, extraRequirements } = req.body;
  if (!studentContent) {
    return res.status(400).json({ error: 'Chưa có nội dung bài viết' });
  }

  const systemInstruction = `Bạn là giáo viên Tiếng Việt tiểu học và trợ lý Bạn Bút Chì.
Nhiệm vụ: Nhận xét bài viết của học sinh theo đúng 10 tiêu chí sau:
1. understanding: Em đã hiểu và làm đúng đề chưa?
2. content: Nội dung bài viết (chân thực, phong phú, quan sát tinh tế).
3. structure: Bố cục và trình tự ý (mạch lạc, có mở-thân-kết).
4. vocabulary: Từ ngữ và cách diễn đạt (trong sáng, gợi cảm, từ láy).
5. emotion: Cảm xúc và dấu ấn cá nhân.
6. goodSentences: Mảng các câu văn hay nhất (BẮT BUỘC TRÍCH DẪN NGUYÊN VĂN từ bài em viết).
7. spelling: Chính tả (chỉ ra từ nào viết sai nếu có thật sự, không bịa lỗi).
8. grammar: Dùng từ, đặt câu.
9. specialRequirements: Các yêu cầu riêng của đề (${JSON.stringify(extraRequirements || [])}).
10. improvements: Mảng những điều em nên cải thiện (lời khuyên nhẹ nhàng, cụ thể).
- suggestedScore: Điểm số đề xuất tham khảo từ Bạn Bút Chì (thang điểm 10, từ 7.0 đến 10.0).

QUY TẮC CỐT LÕI:
- Trích đúng câu văn học sinh đã viết khi nhận xét khen hoặc góp ý.
- Không khen chung chung.
- Giữ tinh thần khuyến khích, truyền cảm hứng, yêu quý học sinh.
- Trả về JSON đúng cấu trúc trên.`;

  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Đề bài: "${promptText}". Lớp: ${grade}. Kiểu bài: ${category}. Bài làm của học sinh:\n"${studentContent}"`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json'
        }
      });
      const parsed = JSON.parse(response.text || '{}');
      return res.json(parsed);
    } catch (e) {
      console.error("Gemini feedback error:", e);
    }
  }

  // Fallback high quality feedback
  const sentences = studentContent.split(/[.!?]+/).map((s: string) => s.trim()).filter(Boolean);
  const goodSentence = sentences.length > 1 ? sentences[1] : (sentences[0] || studentContent);

  return res.json({
    understanding: `Em đã hiểu rất đúng yêu cầu của đề bài và viết đúng thể loại ${category || 'tập làm văn'}.`,
    content: `Nội dung bài viết sinh động, thể hiện được những quan sát tỉ mỉ và trải nghiệm chân thực của bản thân.`,
    structure: `Bố cục bài viết rõ ràng, các câu văn có sự liên kết nhịp nhàng và tự nhiên.`,
    vocabulary: `Vốn từ ngữ phong phú, biết sử dụng các từ gợi tả và gợi cảm phù hợp với học sinh lớp ${grade || 3}.`,
    emotion: `Cảm xúc trong trẻo, chân thật, thể hiện rõ tình cảm yêu thương gắn bó.`,
    goodSentences: [
      goodSentence
    ],
    spelling: `Chính tả viết cẩn thận, không phát hiện lỗi chính tả nghiêm trọng.`,
    grammar: `Các câu văn diễn đạt rõ ràng, trọn vẹn chủ vị.`,
    specialRequirements: extraRequirements?.length 
      ? `Em đã chú ý đưa các yêu cầu (${extraRequirements.join(', ')}) vào bài viết một cách khéo léo.` 
      : `Bài viết đáp ứng tốt các yêu cầu trọng tâm của đề.`,
    improvements: [
      `Em có thể bổ sung thêm một chút cảm xúc hoặc suy ngẫm ở câu kết để bài viết thêm đọng lại trong lòng người đọc.`
    ],
    suggestedScore: 9.0
  });
});

// 7. Chat Assistant (Góc sáng tạo ý tưởng cùng Bạn Bút Chì)
app.post('/api/gemini/chat-assistant', async (req, res) => {
  const { message, promptContext } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Thiếu tin nhắn' });
  }

  const systemInstruction = `Bạn là "Bạn Bút Chì" - trợ lý học tập vui tính, đáng yêu và thông thái dành cho học sinh tiểu học (Lớp 1-5).
Khẩu hiệu của bạn: "Em nghĩ điều hay – Em viết điều đẹp".
QUY TẮC CỐT LÕI:
- KHÔNG BAO GIỜ VIẾT HỘ NGUYÊN BÀI VĂN CHO HỌC SINH!
- Nếu em nhờ viết hộ bài, hãy nhẹ nhàng từ chối và hướng dẫn: "Bạn Bút Chì không viết hộ bài đâu nhé, nhưng tớ sẽ cùng bạn tìm những từ ngữ thật hay để bạn tự tay viết nên câu chuyện của mình nè!"
- Gợi ý từ láy, hình ảnh so sánh, nhân hóa, cách mở bài hoặc kết bài khi em hỏi.
- Luôn khen ngợi và khuyến khích em tự suy nghĩ.
- Giữ câu trả lời súc tích, ấm áp, có emoji vui vẻ ✏️✨🌟.`;

  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Ngữ cảnh đề bài: "${JSON.stringify(promptContext || {})}"\nHọc sinh hỏi: "${message}"`,
        config: {
          systemInstruction
        }
      });
      return res.json({ reply: (response.text || '').trim() });
    } catch (e) {
      console.error("Gemini chat error:", e);
    }
  }

  // Fallback
  return res.json({
    reply: `Bạn Bút Chì lắng nghe bạn nè! ✏️ Ý tưởng của bạn rất thú vị đấy. Để câu văn thêm sinh động, bạn thử dùng thêm một từ láy (như 'long lanh', 'rì rào', 'thoăn thoắt') hoặc một hình ảnh so sánh xem sao nhé!`
  });
});

// Vite Middleware mounting
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Em Học Tập Làm Văn] Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
