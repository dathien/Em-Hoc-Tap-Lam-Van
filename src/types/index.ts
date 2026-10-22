/**
 * Types and interfaces for "Em Học Tập Làm Văn"
 */

export type UserRole = 'student' | 'teacher' | 'parent';

export type GradeLevel = 1 | 2 | 3 | 4 | 5;

export type EssayCategory = 
  | 'Viết câu theo tranh'
  | 'Viết đoạn văn'
  | 'Kể lại sự việc'
  | 'Kể chuyện'
  | 'Miêu tả'
  | 'Giới thiệu'
  | 'Nêu tình cảm, cảm xúc'
  | 'Nêu ý kiến'
  | 'Viết thư, tin nhắn'
  | 'Viết tưởng tượng, sáng tạo'
  | 'Văn bản ứng dụng'
  | 'Dạng bài khác';

export type SubmissionStatus = 
  | 'dang_tim_y'       // Đang tìm ý
  | 'dang_lap_dan_y'   // Đang lập dàn ý
  | 'dang_viet'        // Đang viết bài
  | 'da_nop'           // Đã nộp cho cô giáo
  | 'can_giup_do'      // Cần giúp đỡ
  | 'da_cham';         // Đã chấm điểm

export interface Student {
  id: string;
  name: string;
  grade: GradeLevel;
  className: string; // e.g. "1A", "2A", "3A", "4A", "5A"
  username: string;
  gender: 'nam' | 'nu';
  avatar: string;
  parentId: string;
  parentName: string;
  status: SubmissionStatus;
  currentEssayTitle?: string;
  averageScore: number;
  completedCount: number;
}

export interface PromptItem {
  id: string;
  grade: GradeLevel;
  title: string;
  category: EssayCategory;
  topic: string;
  requirement: string;
  difficulty: 'Cơ bản' | 'Mở rộng' | 'Sáng tạo';
  lengthSuggestion: string; // e.g. "5 - 7 câu", "7 - 9 câu", "Bài văn 3 phần"
  languageRequirements: string[]; // e.g. ["Từ láy", "So sánh", "Nhân hóa"]
  brainstormQuestions: string[];
  rubric: {
    criteria: string;
    points: number;
  }[];
  isFavorite?: boolean;
}

export interface OutlineSection {
  id: string;
  title: string; // e.g. "Mở bài / Mở đầu", "Thân bài / Diễn biến", "Kết bài / Cảm nghĩ"
  points: string[];
}

export interface IdeaItem {
  id: string;
  category: 'Từ ngữ hay' | 'Từ láy' | 'Hình ảnh so sánh' | 'Hình ảnh nhân hóa' | 'Miêu tả sinh động' | 'Mở bài kết bài';
  phrase: string;
  explanation: string;
  example: string;
}

export interface TeacherFeedbackData {
  understanding: string;       // 1. Em đã hiểu và làm đúng đề chưa?
  content: string;             // 2. Nội dung bài viết
  structure: string;           // 3. Bố cục và trình tự ý
  vocabulary: string;          // 4. Từ ngữ và cách diễn đạt
  emotion: string;             // 5. Cảm xúc và dấu ấn cá nhân
  goodSentences: string[];     // 6. Những câu văn hay (trích dẫn nguyên văn)
  spelling: string;            // 7. Chính tả
  grammar: string;             // 8. Dùng từ, đặt câu
  specialRequirements: string; // 9. Các yêu cầu riêng của đề (từ láy, so sánh...)
  improvements: string[];      // 10. Những điều em nên cải thiện
  suggestedScore: number;      // Thang 10 (tham khảo từ Bạn Bút Chì)
  officialScore?: number;      // Điểm chính thức do Giáo viên chấm
  teacherNote?: string;        // Lời nhắn riêng của cô giáo
  teacherReviewedAt?: string;
}

export interface StudentReaction {
  type: 'agree' | 'disagree' | 'question' | 'keep_sentence' | 'explain';
  comment: string;
  createdAt: string;
  aiResponse?: string;
}

export interface EssaySubmission {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  grade: GradeLevel;
  promptId?: string;
  promptTitle: string;
  category: EssayCategory;
  extraRequirements: string[];
  promptImage?: string; // base64 or URL
  ocrConfirmed?: boolean;
  
  // Idea generation & outline
  brainstormAnswers: { question: string; answer: string }[];
  outlineHistory: OutlineSection[][];
  currentOutline: OutlineSection[];
  savedIdeas: string[]; // From idea bank
  
  // Writing content
  originalContent: string;
  revisedContent?: string;
  version: number;
  handwrittenImage?: string; // OCR scanned handwritten draft
  
  // Feedback & dialogue
  assistantFeedback?: TeacherFeedbackData;
  officialFeedback?: TeacherFeedbackData;
  studentReactions: StudentReaction[];
  teacherMessages: { sender: 'teacher' | 'student'; text: string; time: string }[];
  
  // Progress & timestamps
  status: SubmissionStatus;
  createdAt: string;
  updatedAt: string;
  submittedToTeacherAt?: string;
  wordCount: number;
  sentenceCount: number;
}

export interface SkillProgress {
  spelling: number;    // Chính tả (0-10)
  structure: number;   // Bố cục (0-10)
  vocabulary: number;  // Từ vựng (0-10)
  emotion: number;     // Cảm xúc (0-10)
}

export interface Badge {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}
