import React, { useState } from 'react';
import { EssaySubmission, Badge, SkillProgress } from '../../types';
import { StorageService } from '../../services/storageService';
import { MascotPencil } from '../common/MascotPencil';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  BookOpen, 
  TrendingUp, 
  Sparkles, 
  Award, 
  FileText, 
  ChevronRight, 
  Star,
  Quote,
  Eye,
  Edit3
} from 'lucide-react';

interface StudentJourneyProps {
  onOpenEssay?: (essay: EssaySubmission) => void;
}

export const StudentJourney: React.FC<StudentJourneyProps> = ({ onOpenEssay }) => {
  const [timeFilter, setTimeFilter] = useState<'7days' | '30days' | 'semester' | 'all'>('all');
  const [selectedDetailEssay, setSelectedDetailEssay] = useState<EssaySubmission | null>(null);

  // Load real calculated stats
  const journeyData = StorageService.calculateStudentJourney("HS-3A-01");
  const { completedCount, inProgressCount, averageScore, totalHours, practiceDays, skills, badges, essays } = journeyData;

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* 4.1 Tổng quan Overview Cards */}
      <div className="bg-white border-2 border-amber-200 rounded-3xl p-5 sm:p-7 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-amber-950 font-heading">
              Hành Trình Rèn Luyện Của Em
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Em nghĩ điều hay – Em viết điều đẹp • Học sinh Lê Mai Anh (Lớp 3A)
            </p>
          </div>

          <button
            type="button"
            onClick={triggerConfetti}
            className="p-2 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors cursor-pointer"
            title="Chúc mừng tiến bộ"
          >
            <Sparkles className="w-5 h-5 text-amber-600" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Card 1: Hoàn thành */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-amber-800 text-xs font-bold mb-2">
              <span>Đã hoàn thành</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-950 font-heading">
              {completedCount} <span className="text-xs font-semibold text-slate-500">bài</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Đã được cô chấm điểm</p>
          </div>

          {/* Card 2: Đang viết */}
          <div className="bg-orange-50/70 border border-orange-200 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-orange-800 text-xs font-bold mb-2">
              <span>Đang viết</span>
              <Edit3 className="w-4 h-4 text-orange-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-orange-950 font-heading">
              {inProgressCount} <span className="text-xs font-semibold text-slate-500">bài</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Bản nháp và tìm ý</p>
          </div>

          {/* Card 3: Điểm trung bình */}
          <div className="bg-yellow-50/70 border border-yellow-200 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-yellow-800 text-xs font-bold mb-2">
              <span>Điểm trung bình</span>
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-950 font-heading">
              {averageScore} <span className="text-xs font-semibold text-slate-500">/ 10</span>
            </div>
            <p className="text-[11px] text-emerald-600 font-bold mt-1">Tiến bộ vượt trội</p>
          </div>

          {/* Card 4: Tổng thời gian */}
          <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-sky-800 text-xs font-bold mb-2">
              <span>Thời gian học</span>
              <Clock className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-sky-950 font-heading">
              {totalHours} <span className="text-xs font-semibold text-slate-500">giờ</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Luyện viết tích cực</p>
          </div>

          {/* Card 5: Số ngày luyện viết */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex flex-col justify-between col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-emerald-800 text-xs font-bold mb-2">
              <span>Ngày luyện tập</span>
              <Calendar className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-950 font-heading">
              {practiceDays} <span className="text-xs font-semibold text-slate-500">ngày</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Duy trì thói quen viết</p>
          </div>
        </div>
      </div>

      {/* Grid: 4.2 Biểu đồ tiến bộ & 4.3 Biểu đồ 4 kỹ năng */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 4.2 Biểu đồ tiến bộ điểm số */}
        <div className="bg-white border-2 border-amber-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              <h3 className="text-base sm:text-lg font-black text-slate-800 font-heading">
                4.2. Biểu đồ điểm số theo thời gian
              </h3>
            </div>

            <div className="flex gap-1 text-[11px] font-bold">
              {[
                { k: '7days', l: '7 ngày' },
                { k: '30days', l: '30 ngày' },
                { k: 'semester', l: 'Học kỳ' },
                { k: 'all', l: 'Tất cả' }
              ].map((f) => (
                <button
                  key={f.k}
                  type="button"
                  onClick={() => setTimeFilter(f.k as any)}
                  className={`px-2 py-0.5 rounded-lg transition-all ${
                    timeFilter === f.k
                      ? 'bg-amber-500 text-white font-black'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.l}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Visual Bar Chart */}
          <div className="space-y-3 pt-2">
            {essays.map((essay, idx) => {
              const score = essay.officialFeedback?.officialScore ?? essay.assistantFeedback?.suggestedScore ?? 8.5;
              const percent = (score / 10) * 100;
              return (
                <div key={essay.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span className="truncate max-w-[240px]">{essay.promptTitle}</span>
                    <span className="text-amber-800 font-extrabold">{score} / 10</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4.3 Biểu đồ 4 nhóm kỹ năng */}
        <div className="bg-white border-2 border-amber-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base sm:text-lg font-black text-slate-800 font-heading">
              4.3. Bốn nhóm kỹ năng viết văn
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Chính tả • Bố cục • Từ vựng • Cảm xúc (thang điểm 10)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-amber-50/60 border border-amber-200 p-4 rounded-2xl space-y-2">
              <span className="text-xs font-black text-amber-900 block">1. Chính tả & Ngữ pháp</span>
              <div className="text-2xl font-black text-amber-950 font-heading">{skills.spelling} / 10</div>
              <div className="w-full h-2 bg-amber-200/50 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${skills.spelling * 10}%` }} />
              </div>
              <p className="text-[10px] text-slate-500">Chữ viết nắn nót, viết hoa đầu câu chuẩn.</p>
            </div>

            <div className="bg-orange-50/60 border border-orange-200 p-4 rounded-2xl space-y-2">
              <span className="text-xs font-black text-orange-900 block">2. Bố cục & Trình tự ý</span>
              <div className="text-2xl font-black text-orange-950 font-heading">{skills.structure} / 10</div>
              <div className="w-full h-2 bg-orange-200/50 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: `${skills.structure * 10}%` }} />
              </div>
              <p className="text-[10px] text-slate-500">Mở bài, thân bài, kết bài liên kết chặt chẽ.</p>
            </div>

            <div className="bg-sky-50/60 border border-sky-200 p-4 rounded-2xl space-y-2">
              <span className="text-xs font-black text-sky-900 block">3. Vốn từ & Cách diễn đạt</span>
              <div className="text-2xl font-black text-sky-950 font-heading">{skills.vocabulary} / 10</div>
              <div className="w-full h-2 bg-sky-200/50 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: `${skills.vocabulary * 10}%` }} />
              </div>
              <p className="text-[10px] text-slate-500">Vận dụng nhiều từ láy, từ gợi cảm sinh động.</p>
            </div>

            <div className="bg-rose-50/60 border border-rose-200 p-4 rounded-2xl space-y-2">
              <span className="text-xs font-black text-rose-900 block">4. Cảm xúc & Dấu ấn cá nhân</span>
              <div className="text-2xl font-black text-rose-950 font-heading">{skills.emotion} / 10</div>
              <div className="w-full h-2 bg-rose-200/50 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: `${skills.emotion * 10}%` }} />
              </div>
              <p className="text-[10px] text-slate-500">Giàu tình cảm chân thành, yêu thương.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4.4 Huy hiệu danh dự (Không xếp hạng gây áp lực) */}
      <div className="bg-white border-2 border-amber-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h3 className="text-base sm:text-lg font-black text-amber-950 font-heading">
            4.4. Bộ Huy Hiệu Thành Tích Của Con
          </h3>
        </div>

        <p className="text-xs text-slate-500 font-medium">
          Huy hiệu ghi nhận sự cố gắng bền bỉ của từng học sinh, tôn trọng sự sáng tạo cá nhân và không dùng để tạo bảng xếp hạng ganh đua.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-3 ${
                badge.unlocked
                  ? 'bg-amber-50/80 border-amber-300 shadow-xs'
                  : 'bg-slate-50/70 border-slate-200 opacity-60'
              }`}
            >
              <div className="text-3xl shrink-0 p-2 rounded-xl bg-white shadow-2xs">
                {badge.icon}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-black text-amber-950 font-heading">{badge.name}</h4>
                  {badge.unlocked && <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
                </div>
                <p className="text-[11px] font-bold text-slate-700">{badge.title}</p>
                <p className="text-[10px] text-slate-500 leading-tight">{badge.description}</p>
                {badge.unlocked && (
                  <span className="inline-block text-[9px] font-extrabold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full mt-1">
                    Đã mở khóa
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4.5 Lịch sử học tập (Mở lại bài đã làm) */}
      <div className="bg-white border-2 border-amber-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-800 font-heading">
              4.5. Nhật ký bài tập đã làm
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Lưu giữ toàn bộ hành trình: Đề bài, dàn ý, bản gốc, bản sửa, góp ý và nhận xét của cô giáo.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            {essays.length} bài đã lưu
          </span>
        </div>

        <div className="space-y-3">
          {essays.map((essay) => (
            <div
              key={essay.id}
              className="bg-amber-50/40 hover:bg-amber-50 border border-amber-200 rounded-2xl p-4 transition-all flex flex-wrap items-center justify-between gap-3 group"
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">
                    Lớp {essay.grade} • {essay.category}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(essay.updatedAt).toLocaleDateString('vi-VN')}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    {essay.status === 'da_cham' ? 'Đã chấm điểm' : 'Đang xử lý'}
                  </span>
                </div>

                <h4 className="font-black text-sm text-slate-800 font-heading group-hover:text-amber-900">
                  {essay.promptTitle}
                </h4>

                <p className="text-xs text-slate-600 line-clamp-1 italic">
                  "{essay.revisedContent || essay.originalContent}"
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-base font-black text-amber-950 font-heading">
                    {essay.officialFeedback?.officialScore ?? essay.assistantFeedback?.suggestedScore ?? 9.0} đ
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold">
                    {essay.sentenceCount || 8} câu • {essay.wordCount || 120} từ
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedDetailEssay(essay)}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Mở xem lại</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* History Detail Modal (4.5) */}
      {selectedDetailEssay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border-2 border-amber-300 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative my-8 space-y-4">
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-black text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase">
                  Lớp {selectedDetailEssay.grade} • {selectedDetailEssay.category}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-800 font-heading mt-1">
                  {selectedDetailEssay.promptTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDetailEssay(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                Đóng
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm max-h-[460px] overflow-y-auto pr-2">
              {/* Brainstorm answers */}
              <div>
                <span className="font-black text-amber-950 block mb-1">💡 Các ý tưởng đã tìm:</span>
                <div className="space-y-1 bg-amber-50/60 p-3 rounded-xl border border-amber-200">
                  {selectedDetailEssay.brainstormAnswers?.map((ans, aIdx) => (
                    <div key={aIdx} className="text-xs">
                      <span className="font-bold text-amber-900">• {ans.question}</span>
                      <p className="pl-3 text-slate-700 font-medium">👉 "{ans.answer}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Essay Content */}
              <div>
                <span className="font-black text-amber-950 block mb-1">📝 Bài văn hoàn chỉnh:</span>
                <div className="notebook-paper border border-amber-200 rounded-2xl p-4 leading-[28px] text-slate-800 font-semibold">
                  {selectedDetailEssay.revisedContent || selectedDetailEssay.originalContent}
                </div>
              </div>

              {/* Teacher Comments */}
              {selectedDetailEssay.officialFeedback && (
                <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-indigo-950 text-xs uppercase">
                      Lời nhận xét của Cô giáo:
                    </span>
                    <span className="text-sm font-black text-indigo-700">
                      Điểm: {selectedDetailEssay.officialFeedback.officialScore} / 10
                    </span>
                  </div>
                  <p className="text-xs text-indigo-900 font-medium italic">
                    "{selectedDetailEssay.officialFeedback.teacherNote || selectedDetailEssay.officialFeedback.content}"
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedDetailEssay(null)}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs"
              >
                Đóng lại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
