import React, { useState, useEffect, useRef } from 'react';
import { 
  GradeLevel, 
  EssayCategory, 
  OutlineSection, 
  IdeaItem, 
  EssaySubmission 
} from '../../types';
import { AIService, PromptAnalysisResult } from '../../services/aiService';
import { StorageService } from '../../services/storageService';
import { MascotPencil } from '../common/MascotPencil';
import { 
  Camera, 
  Upload, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Send, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowRight, 
  ArrowLeft, 
  History, 
  BookMarked, 
  Save, 
  Eye, 
  FileCheck,
  RefreshCw,
  Lightbulb,
  MessageCircle,
  Copy
} from 'lucide-react';

interface IdeaMapProps {
  initialPrompt?: {
    title: string;
    grade: GradeLevel;
    category: EssayCategory;
    extraRequirements?: string[];
  } | null;
  onNavigateToFeedback?: (essay: EssaySubmission) => void;
}

export interface CategoryMeta {
  category: EssayCategory;
  name: string;
  grades: GradeLevel[];
  gradesLabel: string;
  icon: string;
  description: string;
}

export const ALL_12_CATEGORIES: CategoryMeta[] = [
  {
    category: 'Viết câu theo tranh',
    name: 'Viết câu theo tranh',
    grades: [1, 2],
    gradesLabel: 'Lớp 1, 2',
    icon: '🖼️',
    description: 'Quan sát tranh, viết các câu đơn giản kể về nhân vật hoặc hoạt động.'
  },
  {
    category: 'Viết đoạn văn',
    name: 'Viết đoạn văn',
    grades: [2, 3],
    gradesLabel: 'Lớp 2, 3',
    icon: '📝',
    description: 'Viết đoạn văn ngắn 3–7 câu có câu mở đoạn, thân đoạn và kết đoạn rõ ràng.'
  },
  {
    category: 'Kể lại sự việc',
    name: 'Kể lại sự việc',
    grades: [2, 3, 4],
    gradesLabel: 'Lớp 2, 3, 4',
    icon: '⏱️',
    description: 'Kể lại sự việc em đã chứng kiến hoặc tham gia theo đúng trình tự thời gian.'
  },
  {
    category: 'Kể chuyện',
    name: 'Kể chuyện',
    grades: [3, 4, 5],
    gradesLabel: 'Lớp 3, 4, 5',
    icon: '📖',
    description: 'Kể lại câu chuyện có mở đầu, diễn biến, nhân vật và bài học ý nghĩa.'
  },
  {
    category: 'Miêu tả',
    name: 'Miêu tả',
    grades: [2, 3, 4, 5],
    gradesLabel: 'Lớp 2, 3, 4, 5',
    icon: '🎨',
    description: 'Tả đồ vật, con vật, cây cối hoặc cảnh vật sinh động với từ láy và so sánh.'
  },
  {
    category: 'Giới thiệu',
    name: 'Giới thiệu',
    grades: [2, 3],
    gradesLabel: 'Lớp 2, 3',
    icon: '👋',
    description: 'Giới thiệu bản thân, bạn bè, đồ dùng học tập hoặc đồ chơi yêu thích.'
  },
  {
    category: 'Nêu tình cảm, cảm xúc',
    name: 'Nêu tình cảm, cảm xúc',
    grades: [3, 4, 5],
    gradesLabel: 'Lớp 3, 4, 5',
    icon: '💖',
    description: 'Bày tỏ tình cảm yêu mến, biết ơn, xúc động trước người thân, thầy cô, quê hương.'
  },
  {
    category: 'Nêu ý kiến',
    name: 'Nêu ý kiến',
    grades: [4, 5],
    gradesLabel: 'Lớp 4, 5',
    icon: '💡',
    description: 'Bày tỏ ý kiến tán thành hoặc không tán thành kèm theo lý lẽ và dẫn chứng thuyết phục.'
  },
  {
    category: 'Viết thư, tin nhắn',
    name: 'Viết thư, tin nhắn',
    grades: [2, 3, 4, 5],
    gradesLabel: 'Lớp 2, 3, 4, 5',
    icon: '✉️',
    description: 'Viết bức thư hoặc tin nhắn hỏi thăm, chúc mừng hoặc cảm ơn người thân, bạn bè.'
  },
  {
    category: 'Viết tưởng tượng, sáng tạo',
    name: 'Viết tưởng tượng, sáng tạo',
    grades: [3, 4, 5],
    gradesLabel: 'Lớp 3, 4, 5',
    icon: '✨',
    description: 'Hóa thân vào sự vật, bước vào thế giới thần tiên hoặc tưởng tượng tương lai.'
  },
  {
    category: 'Văn bản ứng dụng',
    name: 'Văn bản ứng dụng',
    grades: [4, 5],
    gradesLabel: 'Lớp 4, 5',
    icon: '📋',
    description: 'Viết đơn xin phép, thông báo, nhật ký đọc sách hoặc biên bản cuộc họp.'
  },
  {
    category: 'Dạng bài khác',
    name: 'Dạng bài khác',
    grades: [1, 2, 3, 4, 5],
    gradesLabel: 'Tất cả các lớp',
    icon: '🌈',
    description: 'Các đề bài tự do hoặc bài tập sáng tạo đặc biệt của thầy cô giáo giao.'
  }
];

const CATEGORIES: EssayCategory[] = ALL_12_CATEGORIES.map(c => c.category);

const PRESET_EXTRA_REQUIREMENTS = [
  "Viết khoảng 7 - 9 câu",
  "Có sử dụng từ láy",
  "Có ít nhất một hình ảnh so sánh",
  "Có sử dụng nhân hóa",
  "Diễn đạt vui tươi, hồn nhiên",
  "Thể hiện tình cảm chân thành với người thân",
  "Kể theo trình tự thời gian",
  "Dùng từ ngữ gần gũi với lứa tuổi"
];

// Curated Idea Bank for primary writing
const IDEA_BANK: IdeaItem[] = [
  { id: '1', category: 'Từ láy', phrase: 'rì rào, róc rách', explanation: 'Tả âm thanh êm dịu của gió thổi qua tán lá hoặc suối chảy.', example: 'Gió sớm thổi qua rặng tre rì rào như đang thì thầm trò chuyện.' },
  { id: '2', category: 'Từ láy', phrase: 'thoăn thoắt, nhanh nhẹn', explanation: 'Tả động tác dứt khoát, khéo léo của người hoặc con vật.', example: 'Đôi bàn tay mẹ thoăn thoắt nhặt từng ngọn rau xanh non.' },
  { id: '3', category: 'Từ láy', phrase: 'long lanh, lấp lánh', explanation: 'Tả ánh sáng phản chiếu trong trẻo trên giọt sương hoặc đôi mắt.', example: 'Những hạt sương mai lấp lánh trên kẽ lá tựa như những viên pha lê.' },
  { id: '4', category: 'Hình ảnh so sánh', phrase: 'như hai hòn bi ve', explanation: 'So sánh đôi mắt tròn xoe, sáng trong của chú cún hoặc chú mèo.', example: 'Đôi mắt chú mèo tròn xoe và sáng trong như hai hòn bi ve.' },
  { id: '5', category: 'Hình ảnh so sánh', phrase: 'như chiếc ô xanh khổng lồ', explanation: 'So sánh tán cây bàng, cây phượng tỏa bóng mát giữa sân trường.', example: 'Cây bàng xòe rộng tán lá xanh rì như một chiếc ô khổng lồ che rợp sân trường.' },
  { id: '6', category: 'Hình ảnh nhân hóa', phrase: 'ông mặt trời tươi cười thức giấc', explanation: 'Nhân hóa ánh bình minh buổi sáng đem lại niềm vui cho vạn vật.', example: 'Sáng sớm, ông mặt trời tươi cười thức giấc, tỏa muôn vàn tia nắng ấm áp xuống mặt đất.' },
  { id: '7', category: 'Hình ảnh nhân hóa', phrase: 'chị mây nhẹ nhàng bay lượn', explanation: 'Nhân hóa đám mây trôi thảnh thơi trên bầu trời xanh biếc.', example: 'Những chị mây trắng nhẹ nhàng dạo chơi trên nền trời xanh thẳm.' },
  { id: '8', category: 'Mở bài kết bài', phrase: 'Mở bài gợi mở cảm xúc', explanation: 'Cách dẫn dắt tự nhiên từ âm thanh hoặc kỉ niệm gần gũi.', example: 'Mỗi khi nghe tiếng ve kêu râm ran, lòng em lại rộn ràng nhớ về cây phượng vĩ nơi góc sân trường.' },
  { id: '9', category: 'Mở bài kết bài', phrase: 'Kết bài mở rộng tình cảm', explanation: 'Bày tỏ lòng biết ơn và lời hứa của bản thân.', example: 'Em sẽ luôn trân trọng và giữ gìn món quà này như một kỷ niệm đẹp đẽ của tuổi thơ.' }
];

export const IdeaMap: React.FC<IdeaMapProps> = ({ initialPrompt, onNavigateToFeedback }) => {
  // Step state: 1 (Nhập & phân tích đề), 2 (Tìm ý), 3 (Dàn ý của con), 4 (Em bắt đầu viết)
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // 1.1 - 1.4 State
  const [promptText, setPromptText] = useState(initialPrompt?.title || "Tả chú mèo mướp bắt chuột tài ba của gia đình em");
  const [grade, setGrade] = useState<GradeLevel>(initialPrompt?.grade || 3);
  const [category, setCategory] = useState<EssayCategory>(initialPrompt?.category || 'Miêu tả');
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>(
    initialPrompt?.extraRequirements || ["Viết khoảng 7 - 9 câu", "Có sử dụng từ láy", "Có ít nhất một hình ảnh so sánh"]
  );
  const [customReqInput, setCustomReqInput] = useState('');
  const [promptConfirmed, setPromptConfirmed] = useState(false);
  const [categoryViewTab, setCategoryViewTab] = useState<'all' | 'recommended'>('recommended');

  // OCR state
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrResultMsg, setOcrResultMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1.5 Analysis state
  const [analysis, setAnalysis] = useState<PromptAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [understoodPrompt, setUnderstoodPrompt] = useState(false);
  const [explainMore, setExplainMore] = useState(false);

  // 1.6 Brainstorming state
  const [brainstormAnswers, setBrainstormAnswers] = useState<{ question: string; answer: string }[]>([
    { question: "Đối tượng hoặc sự việc em muốn viết là gì?", answer: "Chú mèo mướp tên Miu Miu ở nhà em." },
    { question: "Em nhớ nhất cử chỉ hoặc thói quen đáng yêu nào của đối tượng?", answer: "Chú hay nằm sưởi nắng bên thềm hiên và có tài rình chuột rất êm không tiếng động." }
  ]);
  const [currentQuestion, setCurrentQuestion] = useState("Khi chú mèo rình mồi hoặc khi bắt được chuột, em quan sát thấy chi tiết nào làm em bất ngờ nhất?");
  const [currentAnswerInput, setCurrentAnswerInput] = useState("");
  const [hintOptions, setHintOptions] = useState<string[]>([
    "Chú lao nhanh vút như mũi tên tóm gọn chuột",
    "Đôi mắt chú sáng quắc lên trong đêm tối",
    "Bốn chân có đệm thịt dày bước đi êm ru"
  ]);
  const [isBrainstorming, setIsBrainstorming] = useState(false);

  // 1.7 Outline state
  const [outline, setOutline] = useState<OutlineSection[]>([
    {
      id: "sec-1",
      title: "1. Mở bài / Mở đoạn",
      points: ["Giới thiệu chú mèo Miu Miu thân thiết của gia đình em."]
    },
    {
      id: "sec-2",
      title: "2. Thân bài / Thân đoạn",
      points: [
        "Tả bộ lông màu xám tro mềm mại với những vằn đen như chú hổ con.",
        "Đôi mắt tròn xoe, sáng như hai hòn bi ve lấp lánh trong đêm.",
        "Bước đi rón rén, êm ru nhờ có đệm thịt dưới chân.",
        "Tài bắt chuột cừ khôi: kiên nhẫn rình rồi lao vút tóm gọn chuột."
      ]
    },
    {
      id: "sec-3",
      title: "3. Kết bài / Kết đoạn",
      points: ["Em rất yêu quý chú mèo Miu Miu và luôn chăm sóc chú mỗi ngày."]
    }
  ]);
  const [outlineHistory, setOutlineHistory] = useState<OutlineSection[][]>([]);
  const [isGeneratingOutline, setIsGeneratingOutline] = useState(false);
  const [newPointInput, setNewPointInput] = useState<{ [secId: string]: string }>({});

  // 1.8 Saved ideas in notebook
  const [savedIdeas, setSavedIdeas] = useState<string[]>([
    "rì rào", "thoăn thoắt", "như hai hòn bi ve", "bước chân êm ru", "lao vút như mũi tên"
  ]);

  // 1.9 Creative Chat state
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'pencil'; text: string }[]>([
    { sender: 'pencil', text: 'Chào bạn nhỏ! Tớ là Bạn Bút Chì đây ✏️ Bạn đang cần hỏi cách dùng từ láy, biện pháp so sánh hay cách viết câu mở đoạn thật hay thì cứ nhắn tớ nhé!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatting, setIsChatting] = useState(false);
  const [showChatDrawer, setShowChatDrawer] = useState(false);

  // 1.10 Writing content state & Auto-save
  const [essayContent, setEssayContent] = useState('');
  const [lastSavedTime, setLastSavedTime] = useState<string>('');
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Pre-load draft or active prompt
  useEffect(() => {
    if (initialPrompt) {
      setPromptText(initialPrompt.title);
      setGrade(initialPrompt.grade);
      setCategory(initialPrompt.category);
      if (initialPrompt.extraRequirements) {
        setSelectedRequirements(initialPrompt.extraRequirements);
      }
      setPromptConfirmed(true);
      handleAnalyzePrompt(initialPrompt.title, initialPrompt.grade, initialPrompt.category, initialPrompt.extraRequirements || []);
    } else {
      // Check active draft
      const draft = StorageService.getActiveDraft();
      if (draft && draft.promptTitle) {
        setPromptText(draft.promptTitle);
        if (draft.grade) setGrade(draft.grade);
        if (draft.category) setCategory(draft.category);
        if (draft.originalContent) setEssayContent(draft.originalContent);
        if (draft.currentOutline) setOutline(draft.currentOutline);
        if (draft.brainstormAnswers) setBrainstormAnswers(draft.brainstormAnswers);
        if (draft.savedIdeas) setSavedIdeas(draft.savedIdeas);
        setPromptConfirmed(true);
      }
    }
  }, [initialPrompt]);

  // Auto-save typing into draft
  useEffect(() => {
    if (!essayContent) return;
    const timer = setTimeout(() => {
      StorageService.saveActiveDraft({
        promptTitle: promptText,
        grade,
        category,
        extraRequirements: selectedRequirements,
        originalContent: essayContent,
        currentOutline: outline,
        brainstormAnswers,
        savedIdeas
      });
      const now = new Date();
      setLastSavedTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`);
    }, 1500);

    return () => clearTimeout(timer);
  }, [essayContent, promptText, grade, category, selectedRequirements, outline, brainstormAnswers, savedIdeas]);

  // Handle Prompt Analysis
  const handleAnalyzePrompt = async (text = promptText, gr = grade, cat = category, reqs = selectedRequirements) => {
    setIsAnalyzing(true);
    const res = await AIService.analyzePrompt(text, gr, cat, reqs);
    setAnalysis(res);
    setIsAnalyzing(false);
  };

  // Handle OCR upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOcrLoading(true);
    setOcrResultMsg('Đang nhận diện nội dung từ ảnh...');

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const res = await AIService.recognizeImageText(base64, file.type, 'prompt');
      setPromptText(res.recognizedText);
      setOcrLoading(false);
      setOcrResultMsg(res.note || 'Đã đọc văn bản từ ảnh! Em hãy kiểm tra lại và chỉnh sửa nếu cần nhé.');
    };
    reader.readAsDataURL(file);
  };

  // Add extra requirement
  const toggleRequirement = (req: string) => {
    if (selectedRequirements.includes(req)) {
      setSelectedRequirements(selectedRequirements.filter(r => r !== req));
    } else {
      setSelectedRequirements([...selectedRequirements, req]);
    }
  };

  const handleAddCustomReq = () => {
    if (customReqInput.trim() && !selectedRequirements.includes(customReqInput.trim())) {
      setSelectedRequirements([...selectedRequirements, customReqInput.trim()]);
      setCustomReqInput('');
    }
  };

  // Brainstorm answer submit
  const handleAnswerSubmit = async () => {
    if (!currentAnswerInput.trim()) return;
    const newAnswers = [...brainstormAnswers, { question: currentQuestion, answer: currentAnswerInput.trim() }];
    setBrainstormAnswers(newAnswers);
    setCurrentAnswerInput("");
    setIsBrainstorming(true);

    const nextRes = await AIService.brainstormNextQuestion(
      promptText,
      grade,
      category,
      newAnswers,
      currentAnswerInput.trim()
    );

    setCurrentQuestion(nextRes.nextQuestion);
    setHintOptions(nextRes.hintOptions);
    setIsBrainstorming(false);
  };

  // Generate Outline
  const handleBuildOutline = async () => {
    setIsGeneratingOutline(true);
    // Push current to history
    setOutlineHistory([...outlineHistory, outline]);

    const res = await AIService.generateOutline(
      promptText,
      grade,
      category,
      brainstormAnswers,
      selectedRequirements
    );

    setOutline(res.outline);
    setIsGeneratingOutline(false);
    setStep(3);
  };

  // Outline edits
  const handleAddOutlinePoint = (secId: string) => {
    const pointText = newPointInput[secId]?.trim();
    if (!pointText) return;

    setOutline(prev => prev.map(sec => {
      if (sec.id === secId) {
        return { ...sec, points: [...sec.points, pointText] };
      }
      return sec;
    }));
    setNewPointInput({ ...newPointInput, [secId]: '' });
  };

  const handleDeleteOutlinePoint = (secId: string, ptIndex: number) => {
    setOutline(prev => prev.map(sec => {
      if (sec.id === secId) {
        return { ...sec, points: sec.points.filter((_, idx) => idx !== ptIndex) };
      }
      return sec;
    }));
  };

  const handleUndoOutline = () => {
    if (outlineHistory.length > 0) {
      const prev = outlineHistory[outlineHistory.length - 1];
      setOutline(prev);
      setOutlineHistory(outlineHistory.slice(0, -1));
    }
  };

  // Add idea to saved notebook
  const handleSaveIdea = (phrase: string) => {
    if (!savedIdeas.includes(phrase)) {
      setSavedIdeas([...savedIdeas, phrase]);
      StorageService.addVocabWords([phrase]);
    }
  };

  // Chat with pencil
  const handleSendChatMessage = async () => {
    if (!chatInput.trim() || isChatting) return;
    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setIsChatting(true);

    const reply = await AIService.chatWithPencil(userMsg, {
      promptText,
      grade,
      category,
      selectedRequirements
    });

    setChatMessages(prev => [...prev, { sender: 'pencil', text: reply }]);
    setIsChatting(false);
  };

  // Submit essay to feedback
  const handleSubmitToFeedback = () => {
    if (!essayContent.trim()) {
      alert("Bạn nhỏ ơi, hãy viết một vài câu vào khung bài làm trước khi gửi góp ý nhé!");
      return;
    }

    const currentStudent = StorageService.getStudentById("HS-3A-01") || {
      id: "HS-3A-01",
      name: "Lê Mai Anh",
      className: "3A",
      grade: 3
    };

    const newSubmission: EssaySubmission = {
      id: `ESSAY-${Date.now()}`,
      studentId: currentStudent.id,
      studentName: currentStudent.name,
      className: currentStudent.className,
      grade: grade,
      promptTitle: promptText,
      category: category,
      extraRequirements: selectedRequirements,
      brainstormAnswers,
      outlineHistory,
      currentOutline: outline,
      savedIdeas,
      originalContent: essayContent,
      version: 1,
      status: 'da_nop',
      studentReactions: [],
      teacherMessages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      submittedToTeacherAt: new Date().toISOString(),
      wordCount: essayContent.trim().split(/\s+/).length,
      sentenceCount: essayContent.split(/[.!?]+/).filter(Boolean).length
    };

    StorageService.saveOrUpdateEssay(newSubmission);
    StorageService.clearActiveDraft();

    if (onNavigateToFeedback) {
      onNavigateToFeedback(newSubmission);
    }
  };

  // Word and sentence count calculation
  const wordCount = essayContent.trim() ? essayContent.trim().split(/\s+/).length : 0;
  const sentenceCount = essayContent.trim() ? essayContent.split(/[.!?]+/).filter(Boolean).length : 0;

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Step Indicator */}
      <div className="bg-white border-2 border-amber-200 rounded-3xl p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
          {[
            { num: 1, label: '1. Đề bài & Hiểu đề' },
            { num: 2, label: '2. Em tìm ý' },
            { num: 3, label: '3. Dàn ý của con' },
            { num: 4, label: '4. Em bắt đầu viết' }
          ].map((item) => (
            <button
              key={item.num}
              type="button"
              onClick={() => setStep(item.num as any)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
                step === item.num
                  ? 'bg-amber-500 text-white shadow-xs scale-102'
                  : 'bg-amber-50/80 text-amber-900 hover:bg-amber-100'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                step === item.num ? 'bg-white text-amber-600' : 'bg-amber-200 text-amber-900'
              }`}>
                {item.num}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1: NHẬP ĐỀ BÀI, CHỌN LỚP, DẠNG BÀI & PHÂN TÍCH HIỂU ĐỀ */}
      {step === 1 && (
        <div className="space-y-6">
          <MascotPencil
            message="Bước đầu tiên, chúng mình cùng đọc kỹ đề bài nhé! Đọc kỹ đề sẽ giúp bạn hiểu rõ đề yêu cầu viết về điều gì đấy! ✏️"
            mood="happy"
          />

          <div className="bg-white border-2 border-amber-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
            {/* 1.1: Nhập đề bài */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-black text-slate-800 uppercase tracking-wide flex items-center gap-2">
                  <span>1.1. Nhập đề bài của em</span>
                  <span className="text-xs text-rose-500 font-bold">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={ocrLoading}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-900 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-orange-600" />
                    <span>{ocrLoading ? 'Đang nhận diện...' : 'Chụp / Tải ảnh đề SGK'}</span>
                  </button>
                </div>
              </div>

              <textarea
                value={promptText}
                onChange={(e) => {
                  setPromptText(e.target.value);
                  setPromptConfirmed(false);
                }}
                rows={3}
                className="w-full p-4 bg-amber-50/40 border-2 border-amber-200 rounded-2xl text-sm sm:text-base font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all leading-relaxed"
                placeholder="Gõ hoặc dán đề bài tập làm văn của em vào đây..."
              />

              {ocrResultMsg && (
                <p className="mt-2 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 p-2.5 rounded-xl">
                  {ocrResultMsg}
                </p>
              )}
            </div>

            {/* 1.2: Con đang học lớp mấy? */}
            <div>
              <label className="block text-sm font-black text-slate-800 uppercase tracking-wide mb-2">
                1.2. Con đang học lớp mấy?
              </label>
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {([1, 2, 3, 4, 5] as GradeLevel[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => { setGrade(g); setPromptConfirmed(false); }}
                    className={`py-2.5 sm:py-3 rounded-2xl font-black text-sm sm:text-base transition-all border-2 cursor-pointer ${
                      grade === g
                        ? 'bg-amber-500 border-amber-500 text-white shadow-xs'
                        : 'bg-amber-50/60 border-amber-200 text-amber-950 hover:bg-amber-100'
                    }`}
                  >
                    Lớp {g}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-500 italic">
                {grade === 1 && "💡 Lớp 1: Quan sát, nói ý, viết từ và câu đơn giản (1 - 3 câu)."}
                {grade === 2 && "💡 Lớp 2: Tìm ý và viết đoạn văn ngắn (3 - 5 câu)."}
                {grade === 3 && "💡 Lớp 3: Tìm ý, sắp xếp ý và viết đoạn văn mạch lạc (7 - 9 câu)."}
                {grade >= 4 && "💡 Lớp 4–5: Lập dàn ý chi tiết 3 phần (Mở bài, Thân bài, Kết bài)."}
              </p>
            </div>

            {/* 1.3: Dạng bài con muốn viết */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <label className="block text-sm font-black text-slate-800 uppercase tracking-wide">
                    1.3. Kiểu bài con muốn viết (12 dạng bài GDPT 2018)
                  </label>
                  <p className="text-xs text-slate-500 font-medium">
                    Chọn dạng bài phù hợp với yêu cầu đề bài hoặc mục tiêu luyện viết của em
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setCategoryViewTab('recommended')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      categoryViewTab === 'recommended'
                        ? 'bg-white text-amber-950 shadow-2xs font-extrabold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Khuyên dùng Lớp {grade}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategoryViewTab('all')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      categoryViewTab === 'all'
                        ? 'bg-white text-amber-950 shadow-2xs font-extrabold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Tất cả 12 dạng bài
                  </button>
                </div>
              </div>

              {/* Grid of 12 categories: no clipping, clean cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ALL_12_CATEGORIES
                  .filter((cat) => (categoryViewTab === 'recommended' ? cat.grades.includes(grade) : true))
                  .map((cat) => {
                    const isSelected = category === cat.category;
                    const isRecommendedForGrade = cat.grades.includes(grade);

                    return (
                      <button
                        key={cat.category}
                        type="button"
                        onClick={() => {
                          setCategory(cat.category);
                          setPromptConfirmed(false);
                        }}
                        className={`text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between group h-full ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-400 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-amber-50/30'
                        }`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-xl shrink-0">{cat.icon}</span>
                              <span className={`text-xs sm:text-sm font-black font-heading truncate ${
                                isSelected ? 'text-amber-950' : 'text-slate-800'
                              }`}>
                                {cat.name}
                              </span>
                            </div>
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 text-xs font-black">
                                ✓
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                            {cat.description}
                          </p>
                        </div>

                        <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold">
                          <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                            {cat.gradesLabel}
                          </span>
                          {isRecommendedForGrade && (
                            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                              Trọng tâm Lớp {grade}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
              </div>

              {categoryViewTab === 'recommended' && (
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>💡 Đang hiển thị các dạng bài phù hợp theo chương trình Lớp {grade}.</span>
                  <button
                    type="button"
                    onClick={() => setCategoryViewTab('all')}
                    className="text-amber-700 hover:underline font-bold cursor-pointer"
                  >
                    Xem tất cả 12 dạng bài →
                  </button>
                </div>
              )}
            </div>

            {/* 1.4: Con muốn thêm điều gì? */}
            <div>
              <label className="block text-sm font-black text-slate-800 uppercase tracking-wide mb-2">
                1.4. Yêu cầu thêm (từ láy, so sánh, số câu...)
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {PRESET_EXTRA_REQUIREMENTS.map((req) => {
                  const isChecked = selectedRequirements.includes(req);
                  return (
                    <button
                      key={req}
                      type="button"
                      onClick={() => toggleRequirement(req)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                        isChecked
                          ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isChecked ? 'text-amber-600' : 'text-slate-300'}`} />
                      <span>{req}</span>
                    </button>
                  );
                })}
              </div>

              {/* Add custom requirement */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customReqInput}
                  onChange={(e) => setCustomReqInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomReq(); } }}
                  placeholder="Thêm yêu cầu khác của cô giáo (VD: Dùng từ ngữ gợi cảm...)"
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={handleAddCustomReq}
                  className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm</span>
                </button>
              </div>
            </div>

            {/* Button: Xác nhận đề bài đã đúng */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setPromptConfirmed(true);
                  handleAnalyzePrompt();
                }}
                disabled={isAnalyzing}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>{isAnalyzing ? 'Đang phân tích đề...' : 'Đề bài đã đúng – Cùng hiểu đề nào!'}</span>
              </button>
            </div>
          </div>

          {/* 1.5: Em hiểu đề bài */}
          {analysis && (
            <div className="bg-gradient-to-br from-amber-50/80 via-white to-orange-50/60 border-2 border-amber-300/80 rounded-3xl p-5 sm:p-7 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-amber-950 font-black text-base sm:text-lg font-heading">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span>1.5. Em hiểu đề bài như thế nào?</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs sm:text-sm">
                <div className="bg-white p-3.5 rounded-2xl border border-amber-200">
                  <span className="font-black text-amber-900 block mb-1">🎯 Đề yêu cầu viết về ai/sự vật gì?</span>
                  <p className="text-slate-700 font-semibold">{analysis.target}</p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-amber-200">
                  <span className="font-black text-amber-900 block mb-1">📝 Nhiệm vụ của học sinh:</span>
                  <p className="text-slate-700 font-semibold">{analysis.task}</p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-amber-200">
                  <span className="font-black text-amber-900 block mb-1">🏷️ Thể loại & Độ dài gợi ý:</span>
                  <p className="text-slate-700 font-semibold">Kiểu bài {analysis.category} • Dung lượng {analysis.length}</p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-amber-200">
                  <span className="font-black text-amber-900 block mb-1">✨ Biện pháp nghệ thuật cần có:</span>
                  <p className="text-slate-700 font-semibold">{analysis.techniques}</p>
                </div>
              </div>

              <div className="bg-amber-100/70 border border-amber-300/80 rounded-2xl p-4 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                  <span className="font-black">Lời dặn dò từ Bạn Bút Chì: </span>
                  {analysis.pencilAdvice}
                </div>
              </div>

              {explainMore && (
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-xs sm:text-sm text-orange-950 leading-relaxed space-y-2">
                  <p className="font-bold">💡 Bạn Bút Chì giải thích chi tiết hơn cho bạn nè:</p>
                  <p>Khi viết bài này, bạn hãy nhớ rằng: Văn hay nhất là văn kể đúng những gì mình từng nhìn thấy và cảm nhận được. Bạn không cần dùng những từ ngữ quá xa lạ, chỉ cần dùng những từ thân quen như đang kể chuyện cho mẹ hoặc bạn thân nghe nhé!</p>
                </div>
              )}

              <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setExplainMore(!explainMore)}
                  className="text-xs sm:text-sm font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1.5 underline cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>{explainMore ? 'Thu gọn giải thích' : 'Giải thích thêm cho con'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUnderstoodPrompt(true);
                    setStep(2);
                  }}
                  className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm sm:text-base shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Con đã hiểu đề – Bắt đầu tìm ý!</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 2: EM TÌM Ý (GỢI MỞ THEO TRẢI NGHIỆM THẬT) */}
      {step === 2 && (
        <div className="space-y-6">
          <MascotPencil
            message="Ở bước Tìm ý này, Bạn Bút Chì sẽ hỏi bạn từng câu hỏi nhỏ nhé. Bạn cứ trả lời thật lòng theo những gì mình nhớ và cảm thấy, đừng lo đúng sai nha! 🌟"
            mood="thinking"
          />

          <div className="bg-white border-2 border-amber-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-800 font-heading">
                  1.6. Em cùng Bạn Bút Chì tìm ý
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Đề bài: "{promptText}"
                </p>
              </div>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                Đã thu thập: {brainstormAnswers.length} ý hay
              </span>
            </div>

            {/* List of answered ideas */}
            <div className="space-y-3">
              {brainstormAnswers.map((item, idx) => (
                <div key={idx} className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-xs font-black text-amber-900 mb-1">
                    <span className="w-5 h-5 rounded-full bg-amber-400 text-white flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <span>Câu hỏi: {item.question}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 font-semibold pl-7">
                    👉 Câu trả lời của em: <span className="text-amber-950 font-bold">"{item.answer}"</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Next open question */}
            <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-2 border-amber-300 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-amber-950 font-black text-sm sm:text-base">
                <Sparkles className="w-5 h-5 text-orange-500 animate-spin" style={{ animationDuration: '8s' }} />
                <span>Câu hỏi gợi mở tiếp theo:</span>
              </div>

              <p className="text-sm sm:text-base font-extrabold text-slate-800 bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs">
                {currentQuestion}
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
                  Viết câu trả lời của em (theo đúng trí nhớ hoặc cảm xúc của em nhé):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentAnswerInput}
                    onChange={(e) => setCurrentAnswerInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAnswerSubmit(); } }}
                    placeholder="Em nhớ là..."
                    className="flex-1 px-4 py-3 bg-white border border-amber-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <button
                    type="button"
                    onClick={handleAnswerSubmit}
                    disabled={isBrainstorming || !currentAnswerInput.trim()}
                    className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isBrainstorming ? 'Đang lưu...' : 'Gửi câu trả lời'}</span>
                  </button>
                </div>
              </div>

              {/* Hints if not thought yet */}
              <div>
                <span className="text-xs font-bold text-slate-500 block mb-2">
                  Nếu con chưa nghĩ ra, con có thể tham khảo các gợi ý này:
                </span>
                <div className="flex flex-wrap gap-2">
                  {hintOptions.map((hint, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentAnswerInput(hint)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-amber-200 text-xs text-amber-900 font-semibold hover:bg-amber-100 transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      <span>{hint}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="pt-3 flex items-center justify-between gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Xem lại đề bài</span>
              </button>

              <button
                type="button"
                onClick={handleBuildOutline}
                disabled={isGeneratingOutline || brainstormAnswers.length === 0}
                className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-black text-sm sm:text-base shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGeneratingOutline ? 'Đang tạo dàn ý...' : 'Tạo Dàn ý của con từ các ý này'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: DÀN Ý CỦA CON (CÁ NHÂN HÓA, THÊM SỬA XÓA, LƯU PHIÊN BẢN) */}
      {step === 3 && (
        <div className="space-y-6">
          <MascotPencil
            message="Tuyệt vời quá! Đây là Dàn ý được tạo từ chính những câu trả lời của em đó! Em có thể tự do thêm ý mới, xóa bớt hoặc chỉnh sửa cho thật vừa ý nhé! ✏️"
            mood="cheering"
          />

          <div className="bg-white border-2 border-amber-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-800 font-heading">
                  1.7. Dàn ý của con
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {grade <= 2 ? "Cấu trúc đoạn văn ngắn (Mở đầu - Diễn biến - Kết thúc)" : "Bài văn 3 phần (Mở bài - Thân bài - Kết bài)"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {outlineHistory.length > 0 && (
                  <button
                    type="button"
                    onClick={handleUndoOutline}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    <History className="w-3.5 h-3.5" />
                    <span>Quay lại bản trước ({outlineHistory.length})</span>
                  </button>
                )}
              </div>
            </div>

            {/* Outline Sections */}
            <div className="space-y-4">
              {outline.map((sec) => (
                <div key={sec.id} className="bg-amber-50/40 border border-amber-200 rounded-2xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-sm sm:text-base text-amber-950 font-heading">
                      {sec.title}
                    </h4>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                      {sec.points.length} ý chính
                    </span>
                  </div>

                  {/* Points list */}
                  <ul className="space-y-2">
                    {sec.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start justify-between gap-2 bg-white p-3 rounded-xl border border-amber-100 text-xs sm:text-sm text-slate-800 font-semibold group">
                        <span className="flex-1 leading-relaxed">
                          • {pt}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteOutlinePoint(sec.id, pIdx)}
                          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-opacity p-1"
                          title="Xóa ý này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* Add point input */}
                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      value={newPointInput[sec.id] || ''}
                      onChange={(e) => setNewPointInput({ ...newPointInput, [sec.id]: e.target.value })}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddOutlinePoint(sec.id); } }}
                      placeholder="Thêm một ý mới vào phần này..."
                      className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddOutlinePoint(sec.id)}
                      className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Thêm ý</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="pt-3 flex items-center justify-between gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Tìm thêm ý</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm sm:text-base shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Dàn ý đã chuẩn – Em bắt đầu viết!</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: EM BẮT ĐẦU VIẾT (TRÌNH SOẠN THẢO VỞ KẺ, XEM DÀN Ý, KHO Ý TƯỞNG, GÓC SÁNG TẠO) */}
      {step === 4 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Writing Area (8 cols on desktop) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Writing Header bar */}
            <div className="bg-white border-2 border-amber-200 rounded-3xl p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-800 font-heading">
                  1.10. Em bắt đầu viết bài
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Đề bài: <span className="font-bold text-amber-900">{promptText}</span>
                </p>
              </div>

              {/* Stats & Auto-save status */}
              <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-xl">
                  {sentenceCount} câu
                </span>
                <span className="bg-orange-100 text-orange-900 px-2.5 py-1 rounded-xl">
                  {wordCount} từ
                </span>
                {lastSavedTime && (
                  <span className="text-[11px] text-emerald-600 flex items-center gap-1">
                    <Save className="w-3.5 h-3.5" />
                    Đã lưu: {lastSavedTime}
                  </span>
                )}
              </div>
            </div>

            {/* School Notebook Editor */}
            <div className="bg-white border-2 border-amber-300 rounded-3xl p-5 sm:p-8 shadow-sm">
              <div className="notebook-paper border border-amber-200/60 rounded-2xl p-4 sm:p-6 min-h-[420px] shadow-2xs">
                <textarea
                  value={essayContent}
                  onChange={(e) => setEssayContent(e.target.value)}
                  placeholder={`Hãy bắt đầu viết bài văn của em ở đây nhé...\n\nVí dụ mở bài: Nhà em có nuôi một chú mèo mướp rất đáng yêu...`}
                  className="w-full bg-transparent border-none outline-hidden resize-y min-h-[380px] font-sans text-sm sm:text-base text-slate-800 leading-[28px] focus:ring-0"
                  style={{ lineHeight: '28px' }}
                />
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPreviewModal(true)}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-slate-500" />
                    <span>Đọc lại</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      StorageService.saveActiveDraft({
                        promptTitle: promptText,
                        grade,
                        category,
                        originalContent: essayContent,
                        currentOutline: outline
                      });
                      const now = new Date();
                      setLastSavedTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-4 h-4 text-amber-600" />
                    <span>Lưu bản nháp</span>
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleSubmitToFeedback}
                    className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>Gửi bài để Cô & Bút Chì góp ý</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Side Drawer: Dàn ý, Kho ý tưởng, Chat Bạn Bút Chì (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* 1.7 Dàn ý thu nhỏ để học sinh nhìn theo khi viết */}
            <div className="bg-white border-2 border-amber-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-sm text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <BookMarked className="w-4 h-4 text-amber-600" />
                  <span>Dàn ý của em</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="text-xs font-bold text-amber-600 hover:underline"
                >
                  Sửa dàn ý
                </button>
              </div>

              <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                {outline.map((sec) => (
                  <div key={sec.id} className="bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/70 text-xs">
                    <span className="font-extrabold text-amber-950 block mb-1">{sec.title}</span>
                    <ul className="space-y-1 text-slate-700 pl-1">
                      {sec.points.map((pt, idx) => (
                        <li key={idx} className="leading-snug">• {pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 1.8 Kho ý tưởng hay */}
            <div className="bg-white border-2 border-amber-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-sm text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  <span>1.8. Kho ý tưởng hay</span>
                </h4>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  Gợi ý từ ngữ
                </span>
              </div>

              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                {IDEA_BANK.slice(0, 5).map((item) => (
                  <div key={item.id} className="bg-orange-50/40 p-2.5 rounded-xl border border-orange-200/70 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-orange-950">{item.phrase}</span>
                      <button
                        type="button"
                        onClick={() => handleSaveIdea(item.phrase)}
                        className="text-[10px] font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-1.5 py-0.5 rounded-md transition-colors"
                        title="Lưu vào sổ ý tưởng"
                      >
                        + Lưu sổ
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">{item.explanation}</p>
                  </div>
                ))}
              </div>

              {/* Saved ideas in notebook */}
              {savedIdeas.length > 0 && (
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-extrabold text-slate-600 block mb-1.5">
                    Sổ từ ngữ hay của em:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {savedIdeas.map((w, idx) => (
                      <span key={idx} className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-amber-200">
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 1.9 Góc sáng tạo ý tưởng (Chat cùng Bạn Bút Chì) */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 border-2 border-amber-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-sm text-amber-950 uppercase tracking-wide flex items-center gap-1.5 font-heading">
                  <MessageCircle className="w-4 h-4 text-amber-600" />
                  <span>1.9. Góc sáng tạo ý tưởng</span>
                </h4>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  Bạn Bút Chì
                </span>
              </div>

              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-amber-500 text-white ml-4 font-semibold'
                        : 'bg-white text-slate-800 border border-amber-200 mr-2 font-medium'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <div className="flex gap-1.5 pt-1">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSendChatMessage(); } }}
                  placeholder="Hỏi Bạn Bút Chì từ ngữ, cách tả..."
                  className="flex-1 px-3 py-1.5 bg-white border border-amber-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
                <button
                  type="button"
                  onClick={handleSendChatMessage}
                  disabled={isChatting || !chatInput.trim()}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
                >
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Read again Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white border-2 border-amber-200 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base sm:text-lg font-black text-amber-950 font-heading">
                📖 Đọc lại bài văn của em
              </h3>
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                Đóng
              </button>
            </div>

            <div className="notebook-paper border border-amber-200 rounded-2xl p-6 max-h-[360px] overflow-y-auto leading-[28px] text-slate-800 font-semibold text-sm sm:text-base">
              {essayContent || "(Bài viết của em đang trống)"}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
              <span>Độ dài: {wordCount} từ • {sentenceCount} câu</span>
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs"
              >
                Tiếp tục chỉnh sửa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
