import React, { useState } from 'react';
import { HeroIllustration } from './HeroIllustration';
import { BookPencilLogo } from '../common/BookPencilLogo';
import { UserRole, PromptItem, EssaySubmission } from '../../types';
import { StorageService } from '../../services/storageService';
import { 
  Sparkles, 
  MapPin, 
  MessageSquare, 
  Library, 
  Trophy, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  Lightbulb, 
  GraduationCap, 
  HeartHandshake, 
  FileText, 
  ShieldCheck, 
  HelpCircle, 
  ChevronRight,
  Star,
  Compass,
  X,
  Clock,
  Award,
  Sparkle,
  PenTool,
  BookmarkCheck
} from 'lucide-react';

interface HomePageProps {
  isLoggedIn: boolean;
  currentRole: UserRole | null;
  onStartLearning: () => void;
  onOpenFeature: (featureTab: string) => void;
  onOpenLoginWithRole: (role: UserRole) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  isLoggedIn,
  currentRole,
  onStartLearning,
  onOpenFeature,
  onOpenLoginWithRole
}) => {
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Load real student journey & prompts data for dynamic sections
  const journey = StorageService.calculateStudentJourney("HS-3A-01");
  const student = StorageService.getStudentById("HS-3A-01");
  const recentEssays = StorageService.getEssaysByStudent("HS-3A-01");
  const samplePrompts = StorageService.getPrompts().slice(0, 3);

  const scrollToDoors = () => {
    const el = document.getElementById('discovery-doors');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-14 font-sans text-[#243B53]">
      {/* ============================================================
          1. HERO SECTION: KHU VƯỜN Ý TƯỞNG
      ============================================================ */}
      <section className="relative overflow-hidden pt-4 sm:pt-8 pb-6 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Greeting, Main Title & Action CTAs */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Tagline / Greeting pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DDF7E5] border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-extrabold shadow-2xs">
              <span className="text-base">🌱</span>
              <span className="uppercase tracking-wide font-heading">
                CHÀO MỪNG EM ĐẾN VỚI KHU VƯỜN Ý TƯỞNG!
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-[#243B53] tracking-tight leading-[1.18] font-heading">
              MỖI Ý TƯỞNG NHỎ, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700">
                MỘT BÀI VĂN HAY!
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-700 font-semibold max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Cùng Bạn Bút Chì khám phá những điều thú vị, tìm ý tưởng của riêng mình và viết nên những câu chuyện thật đẹp nhé!
            </p>

            {/* Core Pedagogical Principle Note */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm font-bold text-amber-900 bg-[#FFF2BF]/70 border border-amber-300/80 px-4 py-2.5 rounded-2xl max-w-xl mx-auto lg:mx-0 shadow-2xs">
              <span className="text-lg">✏️</span>
              <span>
                Nguyên tắc cốt lõi: <strong>AI không viết bài văn hoàn chỉnh thay học sinh</strong>, em được tự do sáng tạo!
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onStartLearning}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-black text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-102 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>BẮT ĐẦU SÁNG TẠO</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => onOpenFeature('student_library')}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-[#DDF4FF]/60 border-2 border-sky-300 text-sky-950 font-black text-base transition-all shadow-xs hover:shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-5 h-5 text-sky-600" />
                <span>KHÁM PHÁ ĐỀ VĂN</span>
              </button>
            </div>

            {/* Curriculum Stats Pills */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-bold text-slate-600">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>250 Đề Luyện Viết (Lớp 1–5)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>10 Tiêu Chí Góp Ý Chuẩn GDPT 2018</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                <span>Bạn Bút Chì Đồng Hành 24/7</span>
              </div>
            </div>
          </div>

          {/* Right Column: Khu vườn ý tưởng Animated Vector Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroIllustration className="w-full max-w-md lg:max-w-none" />
          </div>
        </div>
      </section>

      {/* ============================================================
          2. BỐN CÁNH CỬA KHÁM PHÁ (4 DISCOVERY DOORS)
      ============================================================ */}
      <section id="discovery-doors" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div id="explore-garden" className="text-center space-y-2 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF2BF] text-amber-900 text-xs font-black uppercase tracking-wider border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>KHÁM PHÁ KHU VƯỜN Ý TƯỞNG</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#243B53] font-heading">
            Hôm Nay Em Muốn Khám Phá Điều Gì?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium">
            Mỗi cánh cửa sẽ dẫn em đến một hoạt động học viết bổ ích và tràn ngập niềm vui!
          </p>
        </div>

        {/* 4 Cards Grid - Equal Height */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Door 1: Bản đồ ý tưởng */}
          <div className="bg-[#DDF4FF]/40 border-2 border-sky-200 hover:border-sky-400 rounded-3xl p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group h-full">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#DDF4FF] border border-sky-300 text-sky-700 flex items-center justify-center font-black group-hover:scale-110 transition-transform shadow-xs">
                <MapPin className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[11px] font-black uppercase text-sky-700 tracking-wider">Cánh cửa 1</span>
                <h3 className="text-lg font-black text-[#243B53] font-heading group-hover:text-sky-800 transition-colors">
                  Bản đồ ý tưởng
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Hiểu đề, tìm ý và lập dàn ý của riêng em. Trả lời các câu hỏi gợi mở ký ức thật và tự tay sắp xếp dàn ý trước khi viết.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onOpenFeature('student_ideamap')}
                className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer group-hover:shadow-md"
              >
                <span>CÙNG TÌM Ý</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Door 2: Cô góp ý bài văn */}
          <div className="bg-[#FFE2EF]/40 border-2 border-pink-200 hover:border-pink-400 rounded-3xl p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group h-full">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FFE2EF] border border-pink-300 text-pink-700 flex items-center justify-center font-black group-hover:scale-110 transition-transform shadow-xs">
                <MessageSquare className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[11px] font-black uppercase text-pink-700 tracking-wider">Cánh cửa 2</span>
                <h3 className="text-lg font-black text-[#243B53] font-heading group-hover:text-pink-800 transition-colors">
                  Cô góp ý bài văn
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Nhận góp ý dịu dàng theo 10 tiêu chí GDPT 2018, trích dẫn đúng câu chữ của em, được quyền trao đổi và tự tay sửa bài.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onOpenFeature('student_feedback')}
                className="w-full py-2.5 px-4 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-black text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer group-hover:shadow-md"
              >
                <span>XEM GÓP Ý</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Door 3: Thư viện đề văn */}
          <div className="bg-[#FFD7B0]/40 border-2 border-orange-200 hover:border-orange-400 rounded-3xl p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group h-full">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FFD7B0] border border-orange-300 text-orange-800 flex items-center justify-center font-black group-hover:scale-110 transition-transform shadow-xs">
                <Library className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[11px] font-black uppercase text-orange-700 tracking-wider">Cánh cửa 3</span>
                <h3 className="text-lg font-black text-[#243B53] font-heading group-hover:text-orange-800 transition-colors">
                  Thư viện đề văn
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Khám phá 250 đề luyện viết phong phú từ Lớp 1 đến Lớp 5 theo SGK Kết nối tri thức, chuyển ngay sang tìm ý trong 1 chạm.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onOpenFeature('student_library')}
                className="w-full py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer group-hover:shadow-md"
              >
                <span>CHỌN ĐỀ VĂN</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Door 4: Hành trình của con */}
          <div className="bg-[#DDF7E5]/40 border-2 border-emerald-200 hover:border-emerald-400 rounded-3xl p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group h-full">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#DDF7E5] border border-emerald-300 text-emerald-800 flex items-center justify-center font-black group-hover:scale-110 transition-transform shadow-xs">
                <Trophy className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[11px] font-black uppercase text-emerald-700 tracking-wider">Cánh cửa 4</span>
                <h3 className="text-lg font-black text-[#243B53] font-heading group-hover:text-emerald-800 transition-colors">
                  Hành trình của con
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Theo dõi tiến bộ, số bài hoàn thành, 4 nhóm kỹ năng (Chính tả, Bố cục, Từ vựng, Cảm xúc) và bộ huy hiệu danh dự.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onOpenFeature('student_journey')}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer group-hover:shadow-md"
              >
                <span>XEM TIẾN BỘ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. QUY TRÌNH 4 BƯỚC: VIẾT VĂN THẬT VUI VỚI 4 BƯỚC!
      ============================================================ */}
      <section id="guide-section" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white border-2 border-amber-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF2BF] text-amber-900 text-xs font-black uppercase tracking-wider border border-amber-300">
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span>QUY TRÌNH HỌC VIẾT THÂN THIỆN</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#243B53] font-heading">
              VIẾT VĂN THẬT VUI VỚI 4 BƯỚC!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-medium">
              Không còn nỗi sợ “ngồi cắn bút không biết viết gì” – Bạn Bút Chì sẽ cùng em từng bước tự tin viết bài!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Step 1 */}
            <div className="bg-[#FFFDF7] border-2 border-amber-200/90 rounded-2xl p-5 space-y-3 relative hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white font-black text-lg flex items-center justify-center shadow-xs">
                1
              </div>
              <h3 className="font-black text-base text-[#243B53] font-heading">
                1. Em chọn đề văn
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Gõ đề bài hoặc chụp ảnh từ trang SGK. Bạn Bút Chì giúp phân tích rõ yêu cầu: viết về ai, số câu gợi ý, các biện pháp tu từ cần dùng.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FFFDF7] border-2 border-orange-200/90 rounded-2xl p-5 space-y-3 relative hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-orange-500 text-white font-black text-lg flex items-center justify-center shadow-xs">
                2
              </div>
              <h3 className="font-black text-base text-[#243B53] font-heading">
                2. Em tìm ý & lập dàn ý
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Bạn Bút Chì hỏi những câu hỏi nhỏ gợi mở kỷ niệm thật. Dàn ý được tạo từ chính câu trả lời của em, em có thể thêm, bớt hoặc sửa ý bất cứ lúc nào.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FFFDF7] border-2 border-sky-200/90 rounded-2xl p-5 space-y-3 relative hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white font-black text-lg flex items-center justify-center shadow-xs">
                3
              </div>
              <h3 className="font-black text-base text-[#243B53] font-heading">
                3. Em tự tin viết bài
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Viết trên trang vở kẻ ô ly học sinh thân thuộc với lưu nháp tự động. Nhận phiếu góp ý 10 tiêu chí trích dẫn đúng câu văn em đã viết.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#FFFDF7] border-2 border-emerald-200/90 rounded-2xl p-5 space-y-3 relative hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center shadow-xs">
                4
              </div>
              <h3 className="font-black text-base text-[#243B53] font-heading">
                4. Em đọc lại & tự sửa bài
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                So sánh bản cũ và bản mới song song, gửi bài cho cô giáo chấm điểm và nhận những huy hiệu danh dự khích lệ sự cố gắng của em.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. BÀI HỌC DÀNH CHO EM (REAL STUDENT STATE / INVITATION)
      ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#DDF4FF]/30 border-2 border-sky-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-sky-800 text-xs font-black uppercase tracking-wider border border-sky-200 mb-1">
                <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                <span>GÓC HỌC TẬP CỦA HỌC SINH</span>
              </div>
              <h2 className="text-2xl font-black text-[#243B53] font-heading">
                BÀI HỌC DÀNH CHO EM
              </h2>
            </div>

            {isLoggedIn && currentRole === 'student' ? (
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300">
                Đang học: {student?.name || "Lê Mai Anh"} (Lớp {student?.className || "3A"})
              </span>
            ) : (
              <button
                type="button"
                onClick={() => onOpenLoginWithRole('student')}
                className="text-xs font-bold text-sky-800 bg-white hover:bg-sky-50 px-3.5 py-1.5 rounded-xl border border-sky-300 shadow-2xs cursor-pointer flex items-center gap-1"
              >
                <span>Đăng nhập để xem trang cá nhân</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {isLoggedIn && currentRole === 'student' ? (
            /* Logged in state: Show ongoing essays & quick start */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Card: Active / Recent essay */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-sky-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                      Bài viết gần đây
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {recentEssays[0]?.updatedAt ? new Date(recentEssays[0].updatedAt).toLocaleDateString('vi-VN') : 'Hôm nay'}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-[#243B53] font-heading mb-1.5">
                    {recentEssays[0]?.promptTitle || "Tả chú mèo mướp bắt chuột tài ba của gia đình em"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {recentEssays[0]?.originalContent || "Nhà em có nuôi một chú mèo mướp rất tinh anh..."}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Trạng thái: {recentEssays[0]?.status === 'da_cham' ? 'Đã được cô chấm điểm' : 'Bản nháp đang rèn luyện'}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenFeature('student_feedback')}
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-xs cursor-pointer flex items-center gap-1"
                  >
                    <span>Xem lại bài & nhận xét</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card: Suggested topics for student's grade */}
              <div className="bg-white rounded-2xl p-5 border border-sky-200 shadow-xs space-y-3">
                <h4 className="text-sm font-black text-[#243B53] font-heading flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Đề tài gợi ý hôm nay</span>
                </h4>
                <div className="space-y-2">
                  {samplePrompts.map((p) => (
                    <div 
                      key={p.id}
                      onClick={() => onOpenFeature('student_library')}
                      className="p-2.5 rounded-xl bg-amber-50/50 hover:bg-amber-100/60 border border-amber-200/70 transition-colors cursor-pointer text-xs"
                    >
                      <p className="font-bold text-[#243B53] line-clamp-1">{p.title}</p>
                      <span className="text-[10px] font-semibold text-slate-500">{p.category} • Lớp {p.grade}</span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => onOpenFeature('student_ideamap')}
                  className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs cursor-pointer text-center block"
                >
                  Bắt đầu bài viết mới
                </button>
              </div>
            </div>
          ) : (
            /* Logged out state: Friendly invitation */
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sky-200 text-center max-w-2xl mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#DDF4FF] text-sky-700 mx-auto flex items-center justify-center font-black">
                <PenTool className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-black text-[#243B53] font-heading">
                  Góc học tập cá nhân hóa của riêng em
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Đăng nhập với tài khoản học sinh để lưu lại dàn ý, tiếp tục các bài viết đang dở dang và nhận những nhận xét yêu thương, chu đáo từ cô giáo nhé!
                </p>
              </div>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenLoginWithRole('student')}
                  className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>ĐĂNG NHẬP HỌC SINH</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================
          5. GÓC THÀNH TÍCH (ACHIEVEMENTS WITH REAL COUNTS & BADGES)
      ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FFF2BF]/30 border-2 border-amber-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF2BF] text-amber-900 text-xs font-black uppercase tracking-wider border border-amber-300">
              <Trophy className="w-3.5 h-3.5 text-amber-700" />
              <span>GHI NHẬN NỖ LỰC & TIẾN BỘ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#243B53] font-heading">
              GÓC THÀNH TÍCH CỦA EM
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-medium">
              Mỗi bài viết hoàn thành là một bông hoa nở rộ trong khu vườn văn học của em!
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs text-center">
              <span className="text-xs font-bold text-slate-500 block mb-1">Số bài đã viết</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-600 font-heading">
                {journey.completedCount + journey.inProgressCount}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">bài tập làm văn</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs text-center">
              <span className="text-xs font-bold text-slate-500 block mb-1">Điểm trung bình</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-heading">
                {journey.averageScore}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">thang điểm 10</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs text-center">
              <span className="text-xs font-bold text-slate-500 block mb-1">Thời gian rèn luyện</span>
              <span className="text-2xl sm:text-3xl font-black text-sky-600 font-heading">
                {journey.totalHours}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">giờ chăm chỉ</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs text-center">
              <span className="text-xs font-bold text-slate-500 block mb-1">Chuỗi ngày viết</span>
              <span className="text-2xl sm:text-3xl font-black text-orange-600 font-heading">
                {journey.practiceDays}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">ngày liên tiếp</span>
            </div>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {journey.badges.map((b) => (
              <div 
                key={b.id}
                className={`p-4 rounded-2xl border transition-all flex items-center gap-3.5 ${
                  b.unlocked 
                    ? 'bg-white border-amber-300 shadow-xs' 
                    : 'bg-slate-50/70 border-slate-200 opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center shrink-0 ${
                  b.unlocked ? 'bg-amber-100 border border-amber-300' : 'bg-slate-200 text-slate-400'
                }`}>
                  {b.icon}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-black text-[#243B53] font-heading truncate">
                    {b.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium line-clamp-1">
                    {b.title}
                  </p>
                  <span className={`text-[10px] font-bold block mt-0.5 ${
                    b.unlocked ? 'text-emerald-700' : 'text-slate-400'
                  }`}>
                    {b.unlocked ? '✓ Đã đạt được' : 'Đang phấn đấu'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          6. DÀNH CHO GIÁO VIÊN & DÀNH CHO CHA MẸ
      ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card: DÀNH CHO GIÁO VIÊN */}
          <div className="bg-[#DDF4FF]/40 border-2 border-indigo-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black shadow-2xs">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase text-indigo-700 tracking-wider">Không gian sư phạm</span>
                  <h3 className="text-xl font-black text-indigo-950 font-heading">
                    DÀNH CHO GIÁO VIÊN
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Hệ thống hỗ trợ thầy cô quản lý học sinh toàn diện theo định hướng phẩm chất và năng lực chương trình GDPT 2018.
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-semibold">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Quản lý 5 lớp học (1A đến 5A, 175 em học sinh).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Giao bài tập viết, chấm bài thang 10 và phản hồi lời nhắn riêng.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Xuất sổ điểm lớp ra file Excel (.CSV UTF-8 BOM chuẩn tiếng Việt).</span>
                </li>
              </ul>
            </div>

            <div>
              <button
                type="button"
                onClick={() => {
                  if (isLoggedIn && currentRole === 'teacher') {
                    onOpenFeature('teacher_classes');
                  } else {
                    onOpenLoginWithRole('teacher');
                  }
                }}
                className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>VÀO LỚP HỌC</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card: DÀNH CHO CHA MẸ */}
          <div className="bg-[#DDF7E5]/40 border-2 border-emerald-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black shadow-2xs">
                  <HeartHandshake className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase text-emerald-700 tracking-wider">Gắn kết gia đình</span>
                  <h3 className="text-xl font-black text-emerald-950 font-heading">
                    DÀNH CHO CHA MẸ
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Đồng hành nhẹ nhàng cùng con tại nhà, không tạo áp lực, khuyến khích con quan sát và yêu thích viết văn.
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-semibold">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Theo dõi việc học mỗi ngày và những bài văn con vừa hoàn thành.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Đọc lời nhắn và đánh giá yêu thương của thầy cô dành riêng cho con.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Tham khảo bộ câu hỏi gợi ý để trò chuyện và trải nghiệm cùng con.</span>
                </li>
              </ul>
            </div>

            <div>
              <button
                type="button"
                onClick={() => {
                  if (isLoggedIn && currentRole === 'parent') {
                    onOpenFeature('parent_overview');
                  } else {
                    onOpenLoginWithRole('parent');
                  }
                }}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>THEO DÕI VIỆC HỌC</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          7. USER GUIDE MODAL
      ============================================================ */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border-2 border-amber-300 rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl relative my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BookPencilLogo size={36} />
                <h3 className="text-lg font-black text-amber-950 font-heading">
                  Hướng Dẫn Sử Dụng Ứng Dụng
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2 text-xs sm:text-sm text-slate-700">
              <div className="bg-[#FFF2BF]/50 p-3.5 rounded-2xl border border-amber-200">
                <span className="font-black text-amber-900 block mb-1">👧 Dành cho Học sinh:</span>
                <p className="leading-relaxed">
                  1. Chọn một đề văn trong Thư viện đề hoặc nhập đề bài từ sách giáo khoa.<br />
                  2. Trả lời các câu hỏi tìm ý của Bạn Bút Chì. Hãy kể những chi tiết thật mà em nhớ nhất.<br />
                  3. Xem lại dàn ý gợi ý, tự do thêm hoặc sửa ý cho thật ưng ý trước khi viết bài.<br />
                  4. Viết bài vào trang vở học sinh, nhấn "Gửi cô góp ý" để nhận nhận xét 10 tiêu chí và lời khen ngợi.<br />
                  5. Tự tay sửa lại bài và theo dõi tiến bộ trong Hành trình của con!
                </p>
              </div>

              <div className="bg-[#DDF4FF]/50 p-3.5 rounded-2xl border border-sky-200">
                <span className="font-black text-sky-900 block mb-1">👩‍🏫 Dành cho Giáo viên:</span>
                <p className="leading-relaxed">
                  1. Quản lý 5 lớp học (1A đến 5A), xem danh sách và trạng thái bài làm của 175 em học sinh.<br />
                  2. Chấm điểm bài nộp theo thang điểm 10, điều chỉnh nhận xét và gửi lời nhắn động viên riêng.<br />
                  3. Giao bài tập luyện viết cho cả lớp và xuất bảng điểm danh sách học sinh ra file Excel (.CSV UTF-8 BOM chuẩn tiếng Việt).
                </p>
              </div>

              <div className="bg-[#DDF7E5]/50 p-3.5 rounded-2xl border border-emerald-200">
                <span className="font-black text-emerald-900 block mb-1">👨‍👩‍👧 Dành cho Phụ huynh:</span>
                <p className="leading-relaxed">
                  1. Xem mục "Hôm nay con học gì" để nắm bắt bài văn con vừa hoàn thành.<br />
                  2. Đọc lời nhắn và đánh giá của cô giáo dành riêng cho con.<br />
                  3. Tham khảo các câu hỏi gợi ý để trò chuyện, quan sát thiên nhiên và đời sống cùng con tại nhà.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          8. PRIVACY POLICY MODAL
      ============================================================ */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border-2 border-emerald-300 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                <h3 className="text-lg font-black text-emerald-950 font-heading">
                  Chính Sách Bảo Vệ Thông Tin Học Sinh
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                <strong>1. Bảo vệ quyền riêng tư của trẻ em:</strong> Ứng dụng "Em Học Tập Làm Văn" tuân thủ nghiêm ngặt các nguyên tắc bảo vệ trẻ em trên môi trường số. Không thu thập thông tin định danh cá nhân thật của học sinh.
              </p>
              <p>
                <strong>2. Dữ liệu thử nghiệm an toàn:</strong> Toàn bộ 175 tài khoản học sinh và bài tập mẫu trong ứng dụng là dữ liệu giả định phục vụ kiểm thử sư phạm, được lưu trữ an toàn trong trình duyệt cục bộ (Local Storage).
              </p>
              <p>
                <strong>3. Không quảng cáo, không theo dõi thương mại:</strong> Môi trường học tập thuần khiết, trong sáng, không có quảng cáo của bên thứ ba, không cài đặt mã theo dõi hành vi thương mại.
              </p>
              <p>
                <strong>4. Định hướng giáo dục lành mạnh:</strong> Toàn bộ phản hồi của Bạn Bút Chì được xây dựng theo chuẩn mực sư phạm, luôn mang tính khích lệ, hướng dẫn tư duy tự lập và không tạo áp lực điểm số.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          9. FOOTER SECTION
      ============================================================ */}
      <footer className="mt-12 pt-8 border-t-2 border-amber-200/80 bg-white/70 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BookPencilLogo size={42} />
            <div>
              <h4 className="text-base font-black text-amber-950 font-heading">
                EM HỌC TẬP LÀM VĂN
              </h4>
              <p className="text-xs font-bold text-amber-700 italic">
                Em nghĩ điều hay – Em viết điều đẹp
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600">
            <button
              type="button"
              onClick={() => setShowGuideModal(true)}
              className="hover:text-amber-800 transition-colors cursor-pointer"
            >
              Hướng dẫn sử dụng
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setShowPrivacyModal(true)}
              className="hover:text-amber-800 transition-colors cursor-pointer"
            >
              Chính sách bảo vệ thông tin
            </button>
            <span>•</span>
            <span className="text-slate-400 font-mono">Phiên bản 2.2 (GDPT 2018)</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 font-medium leading-relaxed border-t border-slate-100 pt-3">
          Ứng dụng phát triển năng lực viết văn cho học sinh tiểu học (Lớp 1–5) theo bộ sách Kết nối tri thức với cuộc sống. Tôn trọng suy nghĩ và sự sáng tạo riêng của từng em; AI đóng vai trò người bạn đồng hành khơi gợi ý tưởng, không viết thay học sinh.
        </p>
      </footer>
    </div>
  );
};
