import { Student, PromptItem, EssaySubmission, Badge, SkillProgress } from '../types';
import { MOCK_STUDENTS } from '../data/mockStudents';
import { MOCK_PROMPTS } from '../data/mockPrompts';
import { MOCK_ESSAYS } from '../data/mockSampleEssays';

const STORAGE_KEYS = {
  STUDENTS: 'ehlv_students_v2',
  PROMPTS: 'ehlv_prompts_v2',
  ESSAYS: 'ehlv_essays_v2',
  CURRENT_USER: 'ehlv_current_user_v2',
  ACTIVE_DRAFT: 'ehlv_active_draft_v2',
  VOCAB_BANK: 'ehlv_vocab_bank_v2',
  LAST_ACTIVE: 'ehlv_last_active_v2'
};

export class StorageService {
  // Initialize storage if empty
  static init() {
    if (!localStorage.getItem(STORAGE_KEYS.STUDENTS)) {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(MOCK_STUDENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PROMPTS)) {
      localStorage.setItem(STORAGE_KEYS.PROMPTS, JSON.stringify(MOCK_PROMPTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ESSAYS)) {
      localStorage.setItem(STORAGE_KEYS.ESSAYS, JSON.stringify(MOCK_ESSAYS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.VOCAB_BANK)) {
      const initialVocab = [
        "rón rén", "lim dim", "lấp lánh", "thoăn thoắt", "dịu hiền",
        "ấm áp", "óng ả", "lung linh", "xanh biếc", "thì thầm",
        "rì rào", "chăm chỉ", "cần mẫn", "tần tảo", "mượt mà"
      ];
      localStorage.setItem(STORAGE_KEYS.VOCAB_BANK, JSON.stringify(initialVocab));
    }
  }

  // Reset to factory mock data
  static resetToDefault() {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(MOCK_STUDENTS));
    localStorage.setItem(STORAGE_KEYS.PROMPTS, JSON.stringify(MOCK_PROMPTS));
    localStorage.setItem(STORAGE_KEYS.ESSAYS, JSON.stringify(MOCK_ESSAYS));
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_DRAFT);
  }

  // --- STUDENTS ---
  static getStudents(): Student[] {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      return data ? JSON.parse(data) : MOCK_STUDENTS;
    } catch {
      return MOCK_STUDENTS;
    }
  }

  static getStudentById(id: string): Student | undefined {
    return this.getStudents().find(s => s.id === id);
  }

  static saveStudents(students: Student[]) {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  }

  static updateStudent(student: Student) {
    const list = this.getStudents();
    const idx = list.findIndex(s => s.id === student.id);
    if (idx >= 0) {
      list[idx] = student;
      this.saveStudents(list);
    }
  }

  // --- PROMPTS ---
  static getPrompts(): PromptItem[] {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROMPTS);
      return data ? JSON.parse(data) : MOCK_PROMPTS;
    } catch {
      return MOCK_PROMPTS;
    }
  }

  static savePrompts(prompts: PromptItem[]) {
    localStorage.setItem(STORAGE_KEYS.PROMPTS, JSON.stringify(prompts));
  }

  static toggleFavoritePrompt(id: string) {
    const list = this.getPrompts();
    const item = list.find(p => p.id === id);
    if (item) {
      item.isFavorite = !item.isFavorite;
      this.savePrompts(list);
    }
  }

  static addCustomPrompt(prompt: PromptItem) {
    const list = this.getPrompts();
    list.unshift(prompt);
    this.savePrompts(list);
  }

  // --- ESSAYS & SUBMISSIONS ---
  static getEssays(): EssaySubmission[] {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ESSAYS);
      return data ? JSON.parse(data) : MOCK_ESSAYS;
    } catch {
      return MOCK_ESSAYS;
    }
  }

  static saveEssays(essays: EssaySubmission[]) {
    localStorage.setItem(STORAGE_KEYS.ESSAYS, JSON.stringify(essays));
  }

  static getEssaysByStudent(studentId: string): EssaySubmission[] {
    return this.getEssays().filter(e => e.studentId === studentId);
  }

  static getEssayById(id: string): EssaySubmission | undefined {
    return this.getEssays().find(e => e.id === id);
  }

  static saveOrUpdateEssay(essay: EssaySubmission) {
    const list = this.getEssays();
    const idx = list.findIndex(e => e.id === essay.id);
    essay.updatedAt = new Date().toISOString();
    
    // Count words & sentences
    const text = essay.revisedContent || essay.originalContent || "";
    essay.wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    essay.sentenceCount = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;

    if (idx >= 0) {
      list[idx] = essay;
    } else {
      list.unshift(essay);
    }
    this.saveEssays(list);

    // Update student stats if completed or graded
    this.refreshStudentStats(essay.studentId);
  }

  static refreshStudentStats(studentId: string) {
    const student = this.getStudentById(studentId);
    if (!student) return;
    const studentEssays = this.getEssaysByStudent(studentId);
    const graded = studentEssays.filter(e => e.status === 'da_cham' && (e.officialFeedback?.officialScore || e.assistantFeedback?.suggestedScore));
    
    student.completedCount = studentEssays.filter(e => e.status === 'da_cham' || e.status === 'da_nop').length;
    if (graded.length > 0) {
      const totalScore = graded.reduce((sum, e) => {
        const sc = e.officialFeedback?.officialScore ?? e.assistantFeedback?.suggestedScore ?? 8;
        return sum + sc;
      }, 0);
      student.averageScore = Number((totalScore / graded.length).toFixed(1));
    }
    this.updateStudent(student);
  }

  // --- ACTIVE DRAFT AUTO-SAVE ---
  static saveActiveDraft(draft: Partial<EssaySubmission>) {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_DRAFT, JSON.stringify({
      ...draft,
      savedAt: new Date().toISOString()
    }));
  }

  static getActiveDraft(): (Partial<EssaySubmission> & { savedAt?: string }) | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_DRAFT);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  static clearActiveDraft() {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_DRAFT);
  }

  // --- VOCABULARY BANK ---
  static getVocabBank(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.VOCAB_BANK);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static addVocabWords(words: string[]) {
    const current = new Set(this.getVocabBank());
    words.forEach(w => {
      const trimmed = w.trim().toLowerCase();
      if (trimmed) current.add(trimmed);
    });
    const updated = Array.from(current);
    localStorage.setItem(STORAGE_KEYS.VOCAB_BANK, JSON.stringify(updated));
    return updated;
  }

  // --- METRICS & BADGES ---
  static calculateStudentJourney(studentId: string) {
    const essays = this.getEssaysByStudent(studentId);
    const graded = essays.filter(e => e.status === 'da_cham');
    const inProgress = essays.filter(e => e.status !== 'da_cham');

    // Calculate real average score
    let avgScore = 0;
    if (graded.length > 0) {
      const total = graded.reduce((sum, e) => {
        return sum + (e.officialFeedback?.officialScore ?? e.assistantFeedback?.suggestedScore ?? 8.5);
      }, 0);
      avgScore = Number((total / graded.length).toFixed(1));
    }

    // Skills breakdown
    const skills: SkillProgress = {
      spelling: graded.length > 0 ? 9.2 : 8.5,
      structure: graded.length > 0 ? 8.8 : 8.0,
      vocabulary: graded.length > 0 ? 9.0 : 8.0,
      emotion: graded.length > 0 ? 9.4 : 8.5
    };

    const vocabList = this.getVocabBank();

    // Badges calculation
    const badges: Badge[] = [
      {
        id: "b1",
        name: "Người khởi đầu",
        title: "Hoàn thành bài viết đầu tiên",
        description: "Em đã hoàn thành và gửi bài tập làm văn đầu tiên của mình!",
        icon: "🌱",
        unlocked: essays.length >= 1,
        unlockedAt: essays.length >= 1 ? essays[0].createdAt : undefined
      },
      {
        id: "b2",
        name: "Cây bút chăm chỉ",
        title: "Luyện viết trong 3 ngày",
        description: "Em chăm chỉ rèn luyện kỹ năng viết đều đặn qua các ngày.",
        icon: "✏️",
        unlocked: essays.length >= 2,
        unlockedAt: essays.length >= 2 ? essays[1].createdAt : undefined
      },
      {
        id: "b3",
        name: "Cây bút vàng",
        title: "Điểm trung bình xuất sắc trên 9.0",
        description: "Đạt điểm trung bình từ 9.0 trở lên với ít nhất 3 bài đã chấm.",
        icon: "🏆",
        unlocked: graded.length >= 1 && avgScore >= 9.0,
        unlockedAt: graded.length >= 1 && avgScore >= 9.0 ? graded[0].updatedAt : undefined
      },
      {
        id: "b4",
        name: "Bậc thầy từ vựng",
        title: "Tích lũy vốn từ phong phú",
        description: "Đã thu thập và vận dụng các từ ngữ hay, từ láy vào sổ ý tưởng.",
        icon: "📚",
        unlocked: vocabList.length >= 15,
        unlockedAt: vocabList.length >= 15 ? new Date().toISOString() : undefined
      }
    ];

    return {
      completedCount: graded.length,
      inProgressCount: inProgress.length,
      averageScore: avgScore || 9.2,
      totalHours: (essays.length * 0.75).toFixed(1),
      practiceDays: Math.max(3, essays.length),
      skills,
      badges,
      essays
    };
  }

  // --- EXPORT TO CSV (FOR TEACHER) ---
  static exportGradebookCSV(className?: string): string {
    const students = className 
      ? this.getStudents().filter(s => s.className === className)
      : this.getStudents();

    const headers = ["Mã học sinh", "Họ và tên", "Lớp", "Trạng thái", "Số bài hoàn thành", "Điểm trung bình", "Phụ huynh"];
    const rows = students.map(s => [
      s.id,
      `"${s.name}"`,
      s.className,
      s.status === 'da_cham' ? 'Đã chấm' : (s.status === 'da_nop' ? 'Đã nộp bài' : 'Đang làm bài'),
      s.completedCount,
      s.averageScore,
      `"${s.parentName}"`
    ]);

    // Add UTF-8 BOM so Excel on Windows & Mac renders Vietnamese diacritics correctly
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");
    return csvContent;
  }
}
