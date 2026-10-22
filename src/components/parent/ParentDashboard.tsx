import React, { useState } from 'react';
import { EssaySubmission, Student } from '../../types';
import { StorageService } from '../../services/storageService';
import { MascotPencil } from '../common/MascotPencil';
import { 
  HeartHandshake, 
  Sparkles, 
  BookOpen, 
  Star, 
  Trophy, 
  Calendar, 
  Eye, 
  GraduationCap, 
  Lightbulb, 
  CheckCircle2, 
  MessageSquare
} from 'lucide-react';

interface ParentDashboardProps {
  initialSubTab?: string;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({ initialSubTab = 'overview' }) => {
  const [activeTab, setActiveTab] = useState<string>(initialSubTab);
  const [selectedEssayDetail, setSelectedEssayDetail] = useState<EssaySubmission | null>(null);

  // Student linked to parent (Lê Mai Anh - HS-3A-01)
  const student = StorageService.getStudentById("HS-3A-01") || {
    id: "HS-3A-01",
    name: "Lê Mai Anh",
    grade: 3,
    className: "3A",
    avatar: "👧",
    parentName: "Nguyễn Thanh Thảo",
    averageScore: 9.2,
    completedCount: 3
  };

  const essays = StorageService.getEssaysByStudent(student.id);
  const journey = StorageService.calculateStudentJourney(student.id);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border-2 border-emerald-200 rounded-3xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black shadow-md shrink-0">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-2xl font-black text-emerald-950 font-heading">
                  CÙNG CON HỌC TỐT
                </h2>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Dành riêng cho Phụ huynh
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Đồng hành cùng bé <span className="font-bold text-slate-800">{student.name}</span> ({student.className}) • Phụ huynh: {student.parentName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 px-3.5 py-2 rounded-2xl border border-emerald-200 text-xs font-bold text-emerald-900">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>Điểm TB của con: {journey.averageScore} / 10</span>
          </div>
        </div>

        {/* Protection Note */}
        <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-[11px] text-slate-600 font-medium flex items-center gap-2">
          <span>🛡️</span>
          <span>
            Khu vực phụ huynh chỉ xem tiến trình và nhận xét. Nhằm tôn trọng sự phát triển tự lập của trẻ, phụ huynh không thể sửa bài hay thay đổi điểm số của con.
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b-2 border-emerald-100 pb-1 overflow-x-auto">
        {[
          { id: 'overview', label: '1. Hôm nay con học gì' },
          { id: 'essays', label: '2. Các bài viết của con' },
          { id: 'progress', label: '3. Tiến bộ & Huy hiệu' },
          { id: 'advice', label: '4. Góc đồng hành cùng con' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-emerald-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: HÔM NAY CON HỌC GÌ */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <MascotPencil
            message={`Chào bác ${student.parentName}! Hôm nay bé Mai Anh đã hoàn thành bài tập miêu tả chú mèo mướp rất sinh động và được cô giáo khen ngợi đấy ạ! ✏️🌟`}
            mood="happy"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border-2 border-emerald-100 rounded-3xl p-5 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Bài gần nhất của con</span>
              <h4 className="text-base font-black text-slate-800 font-heading">
                {essays[0]?.promptTitle || "Tả chú mèo mướp bắt chuột tài ba"}
              </h4>
              <p className="text-xs text-slate-600 font-medium line-clamp-2 italic">
                "{essays[0]?.revisedContent || essays[0]?.originalContent}"
              </p>
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                  Đã được cô chấm
                </span>
                <span className="font-black text-amber-600 font-heading text-sm">
                  {essays[0]?.officialFeedback?.officialScore || 9.5} / 10
                </span>
              </div>
            </div>

            <div className="bg-white border-2 border-emerald-100 rounded-3xl p-5 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Lời cô giáo gửi gắm</span>
              <div className="bg-indigo-50/70 p-3 rounded-2xl border border-indigo-100 text-xs text-indigo-900 font-medium italic leading-relaxed">
                "{essays[0]?.officialFeedback?.teacherNote || "Cô khen Mai Anh viết văn rất giàu cảm xúc, dùng từ láy và hình ảnh so sánh tinh tế!"}"
              </div>
              <span className="text-[10px] text-slate-400 font-semibold block text-right">
                Cô Nguyễn Thu Hà • Giáo viên chủ nhiệm
              </span>
            </div>

            <div className="bg-white border-2 border-emerald-100 rounded-3xl p-5 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Kỹ năng nổi bật</span>
              <div className="space-y-1.5 pt-1 text-xs font-bold text-slate-700">
                <div className="flex justify-between">
                  <span>Cảm xúc chân thực</span>
                  <span className="text-emerald-600">9.4 / 10</span>
                </div>
                <div className="flex justify-between">
                  <span>Chính tả & câu từ</span>
                  <span className="text-emerald-600">9.2 / 10</span>
                </div>
                <div className="flex justify-between">
                  <span>Vốn từ láy & so sánh</span>
                  <span className="text-emerald-600">9.0 / 10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CÁC BÀI VIẾT CỦA CON */}
      {activeTab === 'essays' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-slate-800 font-heading">
              Nhật ký các bài viết của con
            </h3>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              {essays.length} bài
            </span>
          </div>

          <div className="space-y-3">
            {essays.map((essay) => (
              <div
                key={essay.id}
                className="bg-white border-2 border-emerald-100 rounded-3xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-4"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-md">
                      Lớp {essay.grade} • {essay.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(essay.updatedAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>

                  <h4 className="font-black text-sm sm:text-base text-slate-800 font-heading">
                    {essay.promptTitle}
                  </h4>

                  <p className="text-xs text-slate-600 italic line-clamp-1">
                    "{essay.revisedContent || essay.originalContent}"
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-base font-black text-amber-600 font-heading">
                      {essay.officialFeedback?.officialScore ?? 9.5} đ
                    </div>
                    <span className="text-[10px] text-slate-400">Cô đã chấm</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedEssayDetail(essay)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Xem bài của con</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TIẾN BỘ & HUY HIỆU */}
      {activeTab === 'progress' && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-emerald-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
            <h3 className="text-base sm:text-lg font-black text-emerald-950 font-heading">
              Bộ Huy hiệu và Thành tích của con
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {journey.badges.map((b) => (
                <div key={b.id} className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                  <span className="text-3xl p-2 bg-white rounded-xl shadow-2xs">{b.icon}</span>
                  <div>
                    <h4 className="text-xs font-black text-emerald-950 font-heading">{b.name}</h4>
                    <p className="text-[11px] text-slate-600 font-medium">{b.title}</p>
                    {b.unlocked && (
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-200/60 px-2 py-0.5 rounded-full inline-block mt-1">
                        Đã đạt được
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: GÓC ĐỒNG HÀNH CÙNG CON */}
      {activeTab === 'advice' && (
        <div className="bg-white border-2 border-emerald-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-base font-black text-emerald-950 font-heading">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span>Gợi ý cho cha mẹ: Cùng con bồi dưỡng vốn sống và vốn từ</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 space-y-2">
              <span className="font-black text-amber-950 block">🌱 1. Cùng con quan sát thiên nhiên và đời sống:</span>
              <p className="leading-relaxed">
                Khi dạo chơi công viên hoặc nhìn ngắm cây hoa ngoài ban công, ba mẹ có thể hỏi con: "Con thấy cánh hoa màu gì? Lá cây lay động ra sao?". Những câu hỏi nhỏ sẽ khơi gợi trí tò mò và khả năng dùng từ ngữ miêu tả của con.
              </p>
            </div>

            <div className="bg-orange-50/60 p-4 rounded-2xl border border-orange-200 space-y-2">
              <span className="font-black text-orange-950 block">🐱 2. Đặt câu hỏi cảm xúc thay vì làm hộ con:</span>
              <p className="leading-relaxed">
                Khi con viết văn, thay vì đọc cho con chép, ba mẹ hãy hỏi: "Con nhớ nhất lúc chú cún làm gì? Lúc đó con cảm thấy thế nào?". Bài văn hay nhất luôn là bài văn xuất phát từ chính trái tim của con.
              </p>
            </div>

            <div className="bg-sky-50/60 p-4 rounded-2xl border border-sky-200 space-y-2">
              <span className="font-black text-sky-950 block">📚 3. Đọc sách cùng con mỗi tối 15 phút:</span>
              <p className="leading-relaxed">
                Đọc các mẩu truyện ngắn thiếu nhi và cùng con tìm những từ láy hay (như 'thì thầm', 'rì rào', 'thoăn thoắt') để con ghi vào sổ từ ngữ riêng.
              </p>
            </div>

            <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 space-y-2">
              <span className="font-black text-emerald-950 block">👏 4. Khen ngợi cụ thể và chân thành:</span>
              <p className="leading-relaxed">
                Khen một câu văn hay cụ thể mà con tự nghĩ ra sẽ giúp con cảm thấy tự tin và yêu thích môn Tiếng Việt hơn rất nhiều so với lời khen chung chung.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Parent Essay Detail Modal */}
      {selectedEssayDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border-2 border-emerald-300 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative my-8 space-y-4">
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase">
                  Bài của bé {selectedEssayDetail.studentName} (Lớp {selectedEssayDetail.grade})
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-800 font-heading mt-1">
                  {selectedEssayDetail.promptTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEssayDetail(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                Đóng
              </button>
            </div>

            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2 text-xs sm:text-sm">
              <div>
                <span className="font-bold text-slate-700 block mb-1">Nội dung bài con viết:</span>
                <div className="notebook-paper border border-amber-200 rounded-2xl p-4 leading-[28px] text-slate-800 font-semibold">
                  {selectedEssayDetail.revisedContent || selectedEssayDetail.originalContent}
                </div>
              </div>

              {selectedEssayDetail.officialFeedback && (
                <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-2xl space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-indigo-950 uppercase text-xs">
                      Nhận xét của Cô giáo:
                    </span>
                    <span className="font-black text-indigo-700 text-sm">
                      {selectedEssayDetail.officialFeedback.officialScore} điểm
                    </span>
                  </div>
                  <p className="text-xs text-indigo-900 italic font-medium leading-relaxed">
                    "{selectedEssayDetail.officialFeedback.teacherNote || selectedEssayDetail.officialFeedback.content}"
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedEssayDetail(null)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
