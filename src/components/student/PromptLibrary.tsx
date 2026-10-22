import React, { useState } from 'react';
import { PromptItem, GradeLevel, EssayCategory } from '../../types';
import { StorageService } from '../../services/storageService';
import { MascotPencil } from '../common/MascotPencil';
import { 
  Search, 
  Filter, 
  Heart, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Layers,
  ChevronRight,
  Eye,
  Plus
} from 'lucide-react';

interface PromptLibraryProps {
  onSelectPromptToBrainstorm: (prompt: PromptItem) => void;
  isTeacherMode?: boolean;
}

const CATEGORIES: (EssayCategory | 'Tất cả')[] = [
  'Tất cả',
  'Miêu tả',
  'Kể lại sự việc',
  'Kể chuyện',
  'Giới thiệu',
  'Nêu tình cảm, cảm xúc',
  'Nêu ý kiến',
  'Viết thư, tin nhắn',
  'Viết tưởng tượng, sáng tạo'
];

export const PromptLibrary: React.FC<PromptLibraryProps> = ({ 
  onSelectPromptToBrainstorm,
  isTeacherMode = false 
}) => {
  const [prompts, setPrompts] = useState<PromptItem[]>(() => StorageService.getPrompts());
  const [selectedGrade, setSelectedGrade] = useState<number>(0); // 0 = Tất cả
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [detailModalPrompt, setDetailModalPrompt] = useState<PromptItem | null>(null);

  // New prompt modal for teacher
  const [showAddPromptModal, setShowAddPromptModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newGrade, setNewGrade] = useState<GradeLevel>(3);
  const [newCategory, setNewCategory] = useState<EssayCategory>('Miêu tả');
  const [newRequirement, setNewRequirement] = useState('');
  const [newLength, setNewLength] = useState('7 - 9 câu');

  // Filter logic
  const filteredPrompts = prompts.filter((p) => {
    if (selectedGrade !== 0 && p.grade !== selectedGrade) return false;
    if (selectedCategory !== 'Tất cả' && p.category !== selectedCategory) return false;
    if (onlyFavorites && !p.isFavorite) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchTopic = p.topic.toLowerCase().includes(q);
      const matchReq = p.requirement.toLowerCase().includes(q);
      const matchId = p.id.toLowerCase().includes(q);
      if (!matchTitle && !matchTopic && !matchReq && !matchId) return false;
    }
    return true;
  });

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    StorageService.toggleFavoritePrompt(id);
    setPrompts(StorageService.getPrompts());
  };

  const handleCreatePrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newPrompt: PromptItem = {
      id: `TV${newGrade}-NEW-${Date.now().toString().slice(-4)}`,
      grade: newGrade,
      title: newTitle.trim(),
      category: newCategory,
      topic: "Đời sống & Học tập",
      requirement: newRequirement.trim() || `Viết bài theo chủ đề ${newTitle.trim()}`,
      difficulty: "Mở rộng",
      lengthSuggestion: newLength,
      languageRequirements: ["Dùng từ ngữ gợi cảm", "Có hình ảnh so sánh"],
      brainstormQuestions: [
        "Em muốn viết về đối tượng nào?",
        "Chi tiết nổi bật nhất là gì?",
        "Cảm nghĩ của em ra sao?"
      ],
      rubric: [
        { criteria: "Đúng chủ đề đề bài", points: 4 },
        { criteria: "Bố cục rõ ràng", points: 4 },
        { criteria: "Chính tả, từ ngữ", points: 2 }
      ]
    };

    StorageService.addCustomPrompt(newPrompt);
    setPrompts(StorageService.getPrompts());
    setShowAddPromptModal(false);
    setNewTitle('');
    setNewRequirement('');
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border-2 border-amber-200 rounded-3xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-2xl font-black text-amber-950 font-heading">
                Thư Viện 250 Đề Văn Tiểu Học
              </h2>
              <span className="bg-amber-100 text-amber-900 text-xs font-black px-2.5 py-0.5 rounded-full border border-amber-200">
                Lớp 1 – 5
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Hệ thống đề luyện tập biên soạn công phu theo định hướng chương trình GDPT 2018 (bộ sách Kết nối tri thức).
            </p>
          </div>

          {isTeacherMode && (
            <button
              type="button"
              onClick={() => setShowAddPromptModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm đề bài mới</span>
            </button>
          )}
        </div>

        {/* Disclaimer label */}
        <div className="mt-3 py-1.5 px-3 bg-amber-50 rounded-xl border border-amber-200/70 text-[11px] text-amber-900/80 italic font-medium">
          📌 Lưu ý: Các đề bài dưới đây là hệ thống bài luyện tập biên soạn bám sát chuẩn kiến thức kĩ năng, không tự nhận là văn bản nguyên văn SGK.
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border-2 border-amber-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm đề bài theo tên, từ khóa (mèo, mẹ, cây bàng, mưa rào, quê hương...)"
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
          />
        </div>

        {/* Grade Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Chọn khối lớp:</span>
          {[
            { g: 0, label: 'Tất cả các lớp' },
            { g: 1, label: 'Lớp 1 (50 đề)' },
            { g: 2, label: 'Lớp 2 (50 đề)' },
            { g: 3, label: 'Lớp 3 (50 đề)' },
            { g: 4, label: 'Lớp 4 (50 đề)' },
            { g: 5, label: 'Lớp 5 (50 đề)' }
          ].map((item) => (
            <button
              key={item.g}
              type="button"
              onClick={() => setSelectedGrade(item.g)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                selectedGrade === item.g
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Kiểu bài:</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
              onlyFavorites
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            <Heart className="w-3 h-3 fill-current" />
            <span>Yêu thích</span>
          </button>
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
        <span>Hiển thị: {filteredPrompts.length} / {prompts.length} đề</span>
        {filteredPrompts.length === 0 && <span className="text-rose-500">Không tìm thấy đề bài phù hợp</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrompts.map((prompt) => (
          <div
            key={prompt.id}
            className="bg-white border-2 border-amber-200/90 hover:border-amber-400 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group space-y-4"
          >
            <div className="space-y-2.5">
              {/* Badges row */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-black bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                    Lớp {prompt.grade}
                  </span>
                  <span className="text-[10px] font-bold bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                    {prompt.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 font-semibold">
                    {prompt.id}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => handleToggleFavorite(prompt.id, e)}
                  className="p-1 text-slate-300 hover:text-rose-500 transition-colors"
                  title="Đánh dấu yêu thích"
                >
                  <Heart className={`w-4 h-4 ${prompt.isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              {/* Title */}
              <h3 className="font-black text-sm sm:text-base text-slate-800 font-heading leading-snug group-hover:text-amber-800 transition-colors">
                {prompt.title}
              </h3>

              {/* Requirement preview */}
              <p className="text-xs text-slate-600 font-medium line-clamp-2 leading-relaxed">
                {prompt.requirement}
              </p>

              {/* Length & Language Tags */}
              <div className="pt-1 flex flex-wrap gap-1.5 text-[10px] font-bold text-slate-500">
                <span className="bg-slate-100 px-2 py-0.5 rounded-md">
                  📏 {prompt.lengthSuggestion}
                </span>
                {prompt.languageRequirements?.slice(0, 2).map((lr, lIdx) => (
                  <span key={lIdx} className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md border border-amber-200/60">
                    ✨ {lr}
                  </span>
                ))}
              </div>
            </div>

            {/* Buttons: Xem chi tiết & Cùng tìm ý */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setDetailModalPrompt(prompt)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Xem chi tiết</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectPromptToBrainstorm(prompt)}
                className="px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-xs transition-all flex items-center gap-1 cursor-pointer group-hover:scale-102"
              >
                <span>Cùng tìm ý</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {detailModalPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border-2 border-amber-300 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative my-8 space-y-4">
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-black text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase">
                  Lớp {detailModalPrompt.grade} • {detailModalPrompt.category} • Mã {detailModalPrompt.id}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-800 font-heading mt-1.5">
                  {detailModalPrompt.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDetailModalPrompt(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                Đóng
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <span className="font-black text-amber-950 block mb-1">📝 Yêu cầu cụ thể:</span>
                <p className="text-slate-700 font-semibold leading-relaxed bg-amber-50/60 p-3 rounded-xl border border-amber-200/70">
                  {detailModalPrompt.requirement}
                </p>
              </div>

              <div>
                <span className="font-black text-amber-950 block mb-1">📏 Độ dài gợi ý & Kỹ năng ngôn ngữ:</span>
                <p className="text-slate-700 font-semibold">
                  • Dung lượng: {detailModalPrompt.lengthSuggestion}
                  <br />
                  • Biện pháp tu từ: {detailModalPrompt.languageRequirements?.join(', ')}
                </p>
              </div>

              <div>
                <span className="font-black text-amber-950 block mb-1">💡 Các câu hỏi tìm ý gợi ý:</span>
                <ul className="space-y-1 text-slate-700 font-medium pl-2">
                  {detailModalPrompt.brainstormQuestions?.map((q, qIdx) => (
                    <li key={qIdx}>• {q}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-black text-amber-950 block mb-1">🎯 Tiêu chí đánh giá (Rubric):</span>
                <div className="space-y-1">
                  {detailModalPrompt.rubric?.map((r, rIdx) => (
                    <div key={rIdx} className="flex justify-between bg-slate-50 p-2 rounded-lg text-xs font-semibold">
                      <span>{r.criteria}</span>
                      <span className="text-amber-800 font-bold">{r.points} điểm</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setDetailModalPrompt(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs"
              >
                Đóng lại
              </button>

              <button
                type="button"
                onClick={() => {
                  const p = detailModalPrompt;
                  setDetailModalPrompt(null);
                  onSelectPromptToBrainstorm(p);
                }}
                className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md"
              >
                <span>Cùng tìm ý với đề này ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Teacher Add Prompt Modal */}
      {showAddPromptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border-2 border-indigo-300 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative my-8 space-y-4">
            <h3 className="text-base sm:text-lg font-black text-indigo-950 font-heading">
              Soạn và thêm đề văn mới vào thư viện
            </h3>

            <form onSubmit={handleCreatePrompt} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tên đề bài:</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ví dụ: Tả giàn mướp hoa vàng trước sân nhà em..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Dành cho khối lớp:</label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(Number(e.target.value) as GradeLevel)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    {[1, 2, 3, 4, 5].map(g => (
                      <option key={g} value={g}>Lớp {g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kiểu bài:</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as EssayCategory)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    {CATEGORIES.filter(c => c !== 'Tất cả').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Yêu cầu cụ thể:</label>
                <textarea
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  rows={2}
                  placeholder="Yêu cầu chi tiết về số câu, hình ảnh miêu tả..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPromptModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md"
                >
                  Lưu đề bài
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
