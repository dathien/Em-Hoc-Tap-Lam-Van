import React, { useState, useEffect, useRef } from 'react';
import { EssaySubmission, TeacherFeedbackData, StudentReaction } from '../../types';
import { StorageService } from '../../services/storageService';
import { AIService } from '../../services/aiService';
import { MascotPencil } from '../common/MascotPencil';
import { 
  Camera, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  MessageCircle, 
  Edit3, 
  History, 
  Award, 
  FileCheck, 
  GraduationCap, 
  ArrowRight, 
  AlertCircle,
  Columns,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  Quote
} from 'lucide-react';

interface TeacherFeedbackProps {
  currentEssay?: EssaySubmission | null;
  onSelectEssay?: (essay: EssaySubmission) => void;
}

export const TeacherFeedback: React.FC<TeacherFeedbackProps> = ({ currentEssay, onSelectEssay }) => {
  const [essayList, setEssayList] = useState<EssaySubmission[]>([]);
  const [selectedEssay, setSelectedEssay] = useState<EssaySubmission | null>(null);

  // Handwriting OCR state
  const [handwritingLoading, setHandwritingLoading] = useState(false);
  const [ocrReviewText, setOcrReviewText] = useState('');
  const [showOcrConfirmation, setShowOcrConfirmation] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Review & revision state
  const [isReviewing, setIsReviewing] = useState(false);
  const [activeTab, setActiveTab] = useState<'feedback' | 'revise' | 'compare' | 'chat'>('feedback');
  const [revisedText, setRevisedText] = useState('');
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState('');

  // Student reaction state (2.4 Con muốn nói thêm)
  const [reactionType, setReactionType] = useState<'agree' | 'disagree' | 'question' | 'keep_sentence' | 'explain'>('agree');
  const [reactionText, setReactionText] = useState('');
  const [isSubmittingReaction, setIsSubmittingReaction] = useState(false);

  // Chat with teacher (2.5 Trò chuyện cùng cô)
  const [teacherMsgInput, setTeacherMsgInput] = useState('');

  // Load essays on mount
  useEffect(() => {
    const list = StorageService.getEssaysByStudent("HS-3A-01");
    setEssayList(list);
    if (currentEssay) {
      setSelectedEssay(currentEssay);
      setRevisedText(currentEssay.revisedContent || currentEssay.originalContent || '');
    } else if (list.length > 0) {
      setSelectedEssay(list[0]);
      setRevisedText(list[0].revisedContent || list[0].originalContent || '');
    }
  }, [currentEssay]);

  // Request AI Feedback if not yet reviewed
  const handleRequestFeedback = async () => {
    if (!selectedEssay) return;
    setIsReviewing(true);
    const feedback = await AIService.getEssayFeedback(
      selectedEssay.promptTitle,
      selectedEssay.grade,
      selectedEssay.category,
      selectedEssay.revisedContent || selectedEssay.originalContent,
      selectedEssay.extraRequirements
    );

    const updated: EssaySubmission = {
      ...selectedEssay,
      assistantFeedback: feedback,
      status: selectedEssay.officialFeedback ? 'da_cham' : 'da_nop'
    };

    StorageService.saveOrUpdateEssay(updated);
    setSelectedEssay(updated);
    setIsReviewing(false);
  };

  // OCR for handwritten essay
  const handleHandwritingUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setHandwritingLoading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const res = await AIService.recognizeImageText(base64, file.type, 'handwriting');
      setOcrReviewText(res.recognizedText);
      setShowOcrConfirmation(true);
      setHandwritingLoading(false);
    };
    reader.readAsDataURL(file);
  };

  // Confirm OCR text
  const handleConfirmOcrText = () => {
    if (!selectedEssay) return;
    const updated: EssaySubmission = {
      ...selectedEssay,
      originalContent: ocrReviewText,
      ocrConfirmed: true
    };
    setRevisedText(ocrReviewText);
    StorageService.saveOrUpdateEssay(updated);
    setSelectedEssay(updated);
    setShowOcrConfirmation(false);
    handleRequestFeedback();
  };

  // Submit Student Reaction (2.4 Con muốn nói thêm)
  const handleSubmitReaction = async () => {
    if (!selectedEssay || !reactionText.trim() || isSubmittingReaction) return;
    setIsSubmittingReaction(true);

    const newReaction: StudentReaction = {
      type: reactionType,
      comment: reactionText.trim(),
      createdAt: new Date().toISOString(),
      aiResponse: reactionType === 'keep_sentence'
        ? `Bạn Bút Chì rất tôn trọng phong cách riêng của bạn! Nếu bạn thấy câu văn đó bộc lộ đúng nhất cảm xúc chân thật của mình thì bạn hoàn toàn nên giữ lại nhé! Tự tin lên nào! ✏️✨`
        : reactionType === 'disagree'
        ? `Cảm ơn bạn đã thẳng thắn chia sẻ suy nghĩ! Viết văn là hành trình sáng tạo của chính em, mọi góp ý của Bút Chì chỉ là gợi ý tham khảo thôi nè!`
        : `Bạn Bút Chì đã đọc kỹ ý kiến của bạn rồi nhé! Rất khen ngợi tinh thần học hỏi và đối thoại của bạn nhỏ!`
    };

    const updated: EssaySubmission = {
      ...selectedEssay,
      studentReactions: [...selectedEssay.studentReactions, newReaction]
    };

    StorageService.saveOrUpdateEssay(updated);
    setSelectedEssay(updated);
    setReactionText('');
    setIsSubmittingReaction(false);
  };

  // Send message to teacher (2.5 Trò chuyện cùng cô)
  const handleSendMessageToTeacher = () => {
    if (!selectedEssay || !teacherMsgInput.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newMsg = { sender: 'student' as const, text: teacherMsgInput.trim(), time: timeStr };

    const updated: EssaySubmission = {
      ...selectedEssay,
      teacherMessages: [...(selectedEssay.teacherMessages || []), newMsg]
    };

    StorageService.saveOrUpdateEssay(updated);
    setSelectedEssay(updated);
    setTeacherMsgInput('');
  };

  // Save revised version (2.6 Em sửa bài)
  const handleSaveRevisedVersion = () => {
    if (!selectedEssay) return;
    const updated: EssaySubmission = {
      ...selectedEssay,
      revisedContent: revisedText,
      version: (selectedEssay.version || 1) + 1,
      status: 'da_nop',
      updatedAt: new Date().toISOString()
    };

    StorageService.saveOrUpdateEssay(updated);
    setSelectedEssay(updated);
    setSubmitSuccessMsg('Đã lưu bản sửa lần 2 thành công! Cô giáo đã nhận được bản cập nhật.');
    setTimeout(() => setSubmitSuccessMsg(''), 4000);
  };

  // Send to teacher officially
  const handleSendToTeacher = () => {
    if (!selectedEssay) return;
    const updated: EssaySubmission = {
      ...selectedEssay,
      submittedToTeacherAt: new Date().toISOString(),
      status: 'da_nop'
    };
    StorageService.saveOrUpdateEssay(updated);
    setSelectedEssay(updated);
    setSubmitSuccessMsg('Đã gửi toàn bộ quá trình và bài văn đến Cô giáo Nguyễn Thu Hà!');
    setTimeout(() => setSubmitSuccessMsg(''), 4000);
  };

  if (!selectedEssay) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center space-y-4">
        <MascotPencil message="Bạn nhỏ ơi, hiện tại em chưa có bài viết nào cần góp ý. Hãy sang mục 'Bản đồ ý tưởng' để cùng viết một bài văn thật hay nhé!" />
      </div>
    );
  }

  const feedbackData = selectedEssay.officialFeedback || selectedEssay.assistantFeedback;

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Top Banner & Essay Selector */}
      <div className="bg-white border-2 border-amber-200 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-black text-amber-950 font-heading">
              Cô Góp Ý Bài Văn
            </h2>
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
              Học sinh: {selectedEssay.studentName} (Lớp {selectedEssay.grade})
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
            Đề bài: <span className="text-amber-900 font-bold">"{selectedEssay.promptTitle}"</span>
          </p>
        </div>

        {/* Upload handwritten photo option */}
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleHandwritingUpload}
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={handwritingLoading}
            className="px-3.5 py-2 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-950 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Camera className="w-4 h-4 text-orange-600" />
            <span>{handwritingLoading ? 'Đang đọc chữ viết tay...' : 'Tải ảnh bài viết tay trong vở'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {submitSuccessMsg && (
        <div className="bg-emerald-50 border-2 border-emerald-300 text-emerald-950 p-4 rounded-2xl flex items-center gap-2 text-xs sm:text-sm font-bold shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{submitSuccessMsg}</span>
        </div>
      )}

      {/* OCR Review Confirmation Modal (2.1) */}
      {showOcrConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white border-2 border-amber-300 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-amber-600" />
              <h3 className="text-base sm:text-lg font-black text-amber-950 font-heading">
                Kiểm tra văn bản nhận diện từ ảnh bài viết tay
              </h3>
            </div>

            <p className="text-xs text-slate-500">
              Bạn Bút Chì đã đọc văn bản từ ảnh chụp của bạn. Xin bạn hãy đọc kỹ và chỉnh sửa các từ đọc chưa đúng dấu hoặc sai chữ trước khi xác nhận nhé!
            </p>

            <textarea
              value={ocrReviewText}
              onChange={(e) => setOcrReviewText(e.target.value)}
              rows={8}
              className="w-full p-4 bg-amber-50/40 border-2 border-amber-200 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setShowOcrConfirmation(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs"
              >
                Hủy bỏ
              </button>

              <button
                type="button"
                onClick={handleConfirmOcrText}
                className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Xác nhận văn bản đã đúng – Gửi góp ý</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs Bar inside Feedback Area */}
      <div className="flex space-x-2 border-b-2 border-amber-100 pb-1 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('feedback')}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeTab === 'feedback'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-amber-50'
          }`}
        >
          2.2. Phiếu góp ý 10 tiêu chí
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('revise')}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeTab === 'revise'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-amber-50'
          }`}
        >
          2.6. Em sửa bài (Bản V{selectedEssay.version || 1})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('compare')}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeTab === 'compare'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-amber-50'
          }`}
        >
          So sánh hai bản (Bản gốc vs Bản sửa)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('chat')}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeTab === 'chat'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-amber-50'
          }`}
        >
          2.5. Trò chuyện cùng cô & Bút Chì
        </button>
      </div>

      {/* TAB 1: PHIẾU GÓP Ý 10 TIÊU CHÍ (2.2 & 2.3) */}
      {activeTab === 'feedback' && (
        <div className="space-y-6">
          {/* Header Score Card & Distinction */}
          <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-300 rounded-3xl p-5 sm:p-7 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex flex-col items-center justify-center font-black shadow-md">
                  <span className="text-lg leading-none">
                    {selectedEssay.officialFeedback?.officialScore ?? selectedEssay.assistantFeedback?.suggestedScore ?? 9.0}
                  </span>
                  <span className="text-[10px] opacity-80 mt-0.5">/ 10</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-800 uppercase tracking-wide flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>
                      {selectedEssay.officialFeedback?.officialScore 
                        ? 'Điểm chính thức do Cô giáo chấm' 
                        : 'Điểm tham khảo từ Bạn Bút Chì'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    {selectedEssay.officialFeedback?.officialScore
                      ? 'Cô giáo Nguyễn Thu Hà đã xem xét và đánh giá chính thức.'
                      : 'Lưu ý: Điểm số của Bạn Bút Chì chỉ mang tính tham khảo động viên. Cô giáo sẽ là người quyết định điểm chính thức.'}
                  </p>
                </div>
              </div>

              {!feedbackData && (
                <button
                  type="button"
                  onClick={handleRequestFeedback}
                  disabled={isReviewing}
                  className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${isReviewing ? 'animate-spin' : ''}`} />
                  <span>{isReviewing ? 'Đang chấm bài...' : 'Nhận góp ý ngay'}</span>
                </button>
              )}
            </div>

            {/* Official Teacher Note if exists */}
            {selectedEssay.officialFeedback?.teacherNote && (
              <div className="mt-4 pt-4 border-t border-amber-200/80 bg-white/80 rounded-2xl p-4 border border-amber-200">
                <div className="flex items-center gap-2 text-xs font-black text-indigo-950 uppercase tracking-wide mb-1">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  <span>Lời nhắn yêu thương từ Cô giáo:</span>
                </div>
                <p className="text-xs sm:text-sm text-indigo-900 font-semibold italic leading-relaxed">
                  "{selectedEssay.officialFeedback.teacherNote}"
                </p>
              </div>
            )}
          </div>

          {/* 10 Criteria Feedback Cards */}
          {feedbackData && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. Em đã hiểu và làm đúng đề chưa? */}
              <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 space-y-1.5">
                <span className="text-xs font-black text-amber-900 uppercase tracking-wide block">
                  1. Em đã hiểu và làm đúng đề chưa?
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                  {feedbackData.understanding}
                </p>
              </div>

              {/* 2. Nội dung bài viết */}
              <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 space-y-1.5">
                <span className="text-xs font-black text-amber-900 uppercase tracking-wide block">
                  2. Nội dung bài viết
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                  {feedbackData.content}
                </p>
              </div>

              {/* 3. Bố cục và trình tự ý */}
              <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 space-y-1.5">
                <span className="text-xs font-black text-amber-900 uppercase tracking-wide block">
                  3. Bố cục và trình tự ý
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                  {feedbackData.structure}
                </p>
              </div>

              {/* 4. Từ ngữ và cách diễn đạt */}
              <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 space-y-1.5">
                <span className="text-xs font-black text-amber-900 uppercase tracking-wide block">
                  4. Từ ngữ và cách diễn đạt
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                  {feedbackData.vocabulary}
                </p>
              </div>

              {/* 5. Cảm xúc và dấu ấn cá nhân */}
              <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 space-y-1.5">
                <span className="text-xs font-black text-amber-900 uppercase tracking-wide block">
                  5. Cảm xúc và dấu ấn cá nhân
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                  {feedbackData.emotion}
                </p>
              </div>

              {/* 6. Những câu văn hay (Trích dẫn nguyên văn) */}
              <div className="bg-amber-50/80 border-2 border-amber-300 rounded-2xl p-4 space-y-1.5 md:col-span-2">
                <span className="text-xs font-black text-amber-950 uppercase tracking-wide flex items-center gap-1.5">
                  <Quote className="w-4 h-4 text-amber-600" />
                  <span>6. Những câu văn hay trong bài (Trích dẫn nguyên văn)</span>
                </span>
                <div className="space-y-1.5 pt-1">
                  {feedbackData.goodSentences?.map((sentence, sIdx) => (
                    <blockquote key={sIdx} className="bg-white border-l-4 border-amber-500 p-3 rounded-r-xl text-xs sm:text-sm font-bold text-amber-950 italic">
                      "{sentence}"
                    </blockquote>
                  ))}
                </div>
              </div>

              {/* 7. Chính tả */}
              <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 space-y-1.5">
                <span className="text-xs font-black text-amber-900 uppercase tracking-wide block">
                  7. Chính tả
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                  {feedbackData.spelling}
                </p>
              </div>

              {/* 8. Dùng từ, đặt câu */}
              <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 space-y-1.5">
                <span className="text-xs font-black text-amber-900 uppercase tracking-wide block">
                  8. Dùng từ, đặt câu
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                  {feedbackData.grammar}
                </p>
              </div>

              {/* 9. Các yêu cầu riêng của đề */}
              <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 space-y-1.5">
                <span className="text-xs font-black text-amber-900 uppercase tracking-wide block">
                  9. Các yêu cầu riêng của đề
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                  {feedbackData.specialRequirements}
                </p>
              </div>

              {/* 10. Những điều em nên cải thiện */}
              <div className="bg-orange-50/70 border-2 border-orange-200 rounded-2xl p-4 space-y-1.5">
                <span className="text-xs font-black text-orange-950 uppercase tracking-wide block">
                  10. Những điều em nên cải thiện
                </span>
                <ul className="space-y-1 text-xs sm:text-sm text-orange-900 font-semibold">
                  {feedbackData.improvements?.map((imp, iIdx) => (
                    <li key={iIdx}>• {imp}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* 2.4 CON MUỐN NÓI THÊM (Học sinh phản hồi với góp ý) */}
          <div className="bg-white border-2 border-amber-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-base font-black text-amber-950 font-heading">
              <MessageCircle className="w-5 h-5 text-amber-600" />
              <span>2.4. Con muốn nói thêm (Học sinh phản hồi)</span>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              Sau khi nhận góp ý, con có đồng ý không hay có câu văn nào con muốn giữ lại? Hãy chia sẻ với Bạn Bút Chì nhé!
            </p>

            {/* Reaction Options */}
            <div className="flex flex-wrap gap-2">
              {[
                { type: 'agree' as const, label: 'Con đồng ý với góp ý', icon: ThumbsUp },
                { type: 'keep_sentence' as const, label: 'Con muốn giữ câu văn này', icon: Quote },
                { type: 'disagree' as const, label: 'Con chưa đồng ý', icon: ThumbsDown },
                { type: 'explain' as const, label: 'Con muốn giải thích ý của mình', icon: Edit3 },
                { type: 'question' as const, label: 'Con chưa hiểu chỗ này', icon: HelpCircle }
              ].map((opt) => (
                <button
                  key={opt.type}
                  type="button"
                  onClick={() => setReactionType(opt.type)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    reactionType === opt.type
                      ? 'bg-amber-500 border-amber-500 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50'
                  }`}
                >
                  <opt.icon className="w-3.5 h-3.5" />
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>

            {/* Input reaction */}
            <div className="flex gap-2">
              <input
                type="text"
                value={reactionText}
                onChange={(e) => setReactionText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSubmitReaction(); } }}
                placeholder="Ý kiến hoặc câu hỏi của con..."
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white"
              />
              <button
                type="button"
                onClick={handleSubmitReaction}
                disabled={isSubmittingReaction || !reactionText.trim()}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Gửi phản hồi</span>
              </button>
            </div>

            {/* Reaction History */}
            {selectedEssay.studentReactions.length > 0 && (
              <div className="space-y-3 pt-2">
                {selectedEssay.studentReactions.map((rec, rIdx) => (
                  <div key={rIdx} className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                      <span>👦 Ý kiến của em ({rec.type === 'keep_sentence' ? 'Muốn giữ câu' : 'Phản hồi'}):</span>
                      <span className="text-[10px] text-slate-400">{new Date(rec.createdAt).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 italic">
                      "{rec.comment}"
                    </p>
                    {rec.aiResponse && (
                      <div className="bg-white p-3 rounded-xl border border-amber-200 text-xs text-amber-950 font-medium">
                        <span className="font-bold text-amber-700">✏️ Bạn Bút Chì phản hồi: </span>
                        {rec.aiResponse}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action button: Tiến hành sửa bài */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setActiveTab('revise')}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm sm:text-base shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Em xem góp ý và bắt đầu sửa bài</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleSendToTeacher}
              className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Gửi bài cho cô giáo</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: EM SỬA BÀI (2.6) */}
      {activeTab === 'revise' && (
        <div className="space-y-6">
          <MascotPencil
            message="Em hãy đọc lại những câu được Bạn Bút Chì khen và những chỗ cần bổ sung, sau đó tự tay chỉnh sửa lại bài văn của mình cho thật hoàn hảo nhé! ✏️"
            mood="happy"
          />

          <div className="bg-white border-2 border-amber-300 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-800 font-heading">
                  2.6. Khung sửa bài (Bản chỉnh sửa lần 2)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Đề bài: "{selectedEssay.promptTitle}"
                </p>
              </div>

              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                Phiên bản V{selectedEssay.version || 1}
              </span>
            </div>

            <div className="notebook-paper border border-amber-200/60 rounded-2xl p-4 sm:p-6 min-h-[360px]">
              <textarea
                value={revisedText}
                onChange={(e) => setRevisedText(e.target.value)}
                className="w-full bg-transparent border-none outline-hidden resize-y min-h-[320px] font-sans text-sm sm:text-base text-slate-800 leading-[28px] focus:ring-0"
                style={{ lineHeight: '28px' }}
                placeholder="Nhập nội dung chỉnh sửa của em..."
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveTab('compare')}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Columns className="w-4 h-4 text-slate-500" />
                <span>So sánh hai bản</span>
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSaveRevisedVersion}
                  className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Lưu bản sửa lần 2</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendToTeacher}
                  className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Nộp bản sửa cho cô giáo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SO SÁNH HAI BẢN (BẢN GỐC VS BẢN SỬA) */}
      {activeTab === 'compare' && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-amber-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
            <h3 className="text-base sm:text-lg font-black text-slate-800 font-heading">
              So sánh Bản gốc (Lần 1) và Bản chỉnh sửa (Lần 2)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Original version */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-2">
                <span className="text-xs font-black text-slate-700 uppercase tracking-wide block border-b border-slate-200 pb-2">
                  📝 Bản viết ban đầu (Lần 1)
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed whitespace-pre-wrap">
                  {selectedEssay.originalContent || "(Trống)"}
                </p>
              </div>

              {/* Revised version */}
              <div className="bg-amber-50/60 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 space-y-2">
                <span className="text-xs font-black text-amber-900 uppercase tracking-wide block border-b border-amber-200 pb-2">
                  ✨ Bản đã chỉnh sửa (Lần 2)
                </span>
                <p className="text-xs sm:text-sm text-amber-950 font-semibold leading-relaxed whitespace-pre-wrap">
                  {selectedEssay.revisedContent || revisedText || "(Chưa có bản sửa)"}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveTab('revise')}
                className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md"
              >
                Tiếp tục hoàn thiện bản sửa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: TRÒ CHUYỆN CÙNG CÔ & BẠN BÚT CHÌ (2.5) */}
      {activeTab === 'chat' && (
        <div className="bg-white border-2 border-amber-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base sm:text-lg font-black text-slate-800 font-heading">
              2.5. Trò chuyện và trao đổi bài viết
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Phân biệt rõ: <span className="font-bold text-amber-700">Bạn Bút Chì</span> (hướng dẫn tự động) và <span className="font-bold text-indigo-700">Lời cô giáo</span> (cô giáo thật gửi tin nhắn).
            </p>
          </div>

          {/* Teacher Message Area */}
          <div className="bg-indigo-50/60 border border-indigo-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-black text-indigo-900 uppercase">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Hộp thư trao đổi cùng Cô giáo Nguyễn Thu Hà</span>
            </div>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {(selectedEssay.teacherMessages || []).length > 0 ? (
                selectedEssay.teacherMessages.map((msg, mIdx) => (
                  <div
                    key={mIdx}
                    className={`p-3 rounded-xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'teacher'
                        ? 'bg-white border border-indigo-200 text-indigo-950 font-semibold mr-6'
                        : 'bg-indigo-600 text-white font-medium ml-6 text-right'
                    }`}
                  >
                    <div className="text-[10px] opacity-75 mb-0.5">
                      {msg.sender === 'teacher' ? 'Cô giáo' : 'Học sinh'} • {msg.time}
                    </div>
                    <div>{msg.text}</div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic p-3">
                  Chưa có tin nhắn nào. Em có thể gửi câu hỏi hoặc lời nhắn trực tiếp đến cô giáo dưới đây nhé!
                </p>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={teacherMsgInput}
                onChange={(e) => setTeacherMsgInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSendMessageToTeacher(); } }}
                placeholder="Gửi câu hỏi hoặc lời nhắn cho cô giáo..."
                className="flex-1 px-4 py-2.5 bg-white border border-indigo-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="button"
                onClick={handleSendMessageToTeacher}
                disabled={!teacherMsgInput.trim()}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Gửi cô</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
