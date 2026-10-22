import React, { useState } from 'react';
import { Student, EssaySubmission, GradeLevel, SubmissionStatus } from '../../types';
import { StorageService } from '../../services/storageService';
import { 
  Users, 
  GraduationCap, 
  Download, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileCheck, 
  Edit3, 
  MessageSquare, 
  Send, 
  BarChart3, 
  Sparkles, 
  BookOpen, 
  Plus, 
  Eye, 
  ArrowRight,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';

interface TeacherDashboardProps {
  initialSubTab?: string;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ initialSubTab = 'classes' }) => {
  const [activeSubTab, setActiveSubTab] = useState<string>(initialSubTab);
  const [selectedClass, setSelectedClass] = useState<string>('3A');
  const [students, setStudents] = useState<Student[]>(() => StorageService.getStudents());
  const [essays, setEssays] = useState<EssaySubmission[]>(() => StorageService.getEssays());
  const [searchStudent, setSearchStudent] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Selected student for detail inspection
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<Student | null>(null);

  // Grading Modal state
  const [gradingEssay, setGradingEssay] = useState<EssaySubmission | null>(null);
  const [officialScore, setOfficialScore] = useState<number>(9.5);
  const [officialTeacherNote, setOfficialTeacherNote] = useState('');
  const [gradingSuccess, setGradingSuccess] = useState('');

  // Parent Message state
  const [selectedParentStudent, setSelectedParentStudent] = useState<Student | null>(null);
  const [parentMessageText, setParentMessageText] = useState('');
  const [parentMessageSuccess, setParentMessageSuccess] = useState('');

  // Assign prompt state
  const [assignPromptTitle, setAssignPromptTitle] = useState('Tả một cây bóng mát sum suê trên sân trường');
  const [assignTargetClass, setAssignTargetClass] = useState('3A');
  const [assignDeadline, setAssignDeadline] = useState('2026-10-25');
  const [assignSuccess, setAssignSuccess] = useState('');

  // Add student modal
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGender, setNewStudentGender] = useState<'nam' | 'nu'>('nu');
  const [newStudentClass, setNewStudentClass] = useState('3A');

  // Filter students
  const filteredStudents = students.filter((s) => {
    if (selectedClass && s.className !== selectedClass) return false;
    if (statusFilter !== 'all' && s.status !== statusFilter) return false;
    if (searchStudent.trim()) {
      const q = searchStudent.toLowerCase().trim();
      if (!s.name.toLowerCase().includes(q) && !s.id.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  // Export CSV
  const handleExportCSV = () => {
    const csvData = StorageService.exportGradebookCSV(selectedClass);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Bang_Diem_Lop_${selectedClass}_GDPT2018.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Grade an essay submission
  const handleSaveGrade = () => {
    if (!gradingEssay) return;

    const updated: EssaySubmission = {
      ...gradingEssay,
      status: 'da_cham',
      officialFeedback: {
        ...(gradingEssay.officialFeedback || gradingEssay.assistantFeedback || {
          understanding: "Hiểu đúng và làm tốt đề bài.",
          content: "Nội dung phong phú, sinh động.",
          structure: "Bố cục hoàn chỉnh.",
          vocabulary: "Dùng từ ngữ gợi cảm.",
          emotion: "Cảm xúc tự nhiên.",
          goodSentences: [],
          spelling: "Chính tả sạch sẽ.",
          grammar: "Câu văn rõ ràng.",
          specialRequirements: "Đạt chuẩn.",
          improvements: [],
          suggestedScore: 9.0
        }),
        officialScore: officialScore,
        teacherNote: officialTeacherNote || "Cô khen bài viết của em rất tiến bộ và giàu cảm xúc!",
        teacherReviewedAt: new Date().toISOString()
      }
    };

    StorageService.saveOrUpdateEssay(updated);
    setEssays(StorageService.getEssays());
    setStudents(StorageService.getStudents());
    setGradingSuccess(`Đã lưu kết quả chấm điểm ${officialScore}đ cho học sinh ${gradingEssay.studentName}!`);
    setTimeout(() => {
      setGradingSuccess('');
      setGradingEssay(null);
    }, 1800);
  };

  // Send message to parent
  const handleSendParentMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedParentStudent || !parentMessageText.trim()) return;

    setParentMessageSuccess(`Đã gửi lời nhắn thành công đến phụ huynh em ${selectedParentStudent.name}!`);
    setParentMessageText('');
    setTimeout(() => {
      setParentMessageSuccess('');
      setSelectedParentStudent(null);
    }, 2500);
  };

  // Add new student
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    const classGrade = Number(newStudentClass[0]) as GradeLevel;
    const newStudent: Student = {
      id: `HS-${newStudentClass}-${String(students.filter(s => s.className === newStudentClass).length + 1).padStart(2, '0')}`,
      name: newStudentName.trim(),
      grade: classGrade,
      className: newStudentClass,
      username: `hs_${newStudentClass.toLowerCase()}_${Date.now().toString().slice(-4)}`,
      gender: newStudentGender,
      avatar: newStudentGender === 'nu' ? '👧' : '👦',
      parentId: `PH-NEW-${Date.now()}`,
      parentName: `Phụ huynh em ${newStudentName.trim()}`,
      status: 'dang_tim_y',
      averageScore: 8.5,
      completedCount: 1
    };

    const updated = [newStudent, ...students];
    StorageService.saveStudents(updated);
    setStudents(updated);
    setShowAddStudent(false);
    setNewStudentName('');
  };

  // Real class stats
  const classStudents = students.filter(s => s.className === selectedClass);
  const avgClassScore = classStudents.length > 0
    ? (classStudents.reduce((sum, s) => sum + s.averageScore, 0) / classStudents.length).toFixed(1)
    : "8.5";
  const completedRate = classStudents.length > 0
    ? Math.round((classStudents.filter(s => s.status === 'da_cham').length / classStudents.length) * 100)
    : 80;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Teacher Top Info */}
      <div className="bg-white border-2 border-indigo-200 rounded-3xl p-5 sm:p-7 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-2xl font-black text-indigo-950 font-heading">
                Không Gian Quản Lý Lớp Học
              </h2>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                Cô Nguyễn Thu Hà
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Quản lý 5 lớp (1A, 2A, 3A, 4A, 5A) • 175 học sinh giả định theo GDPT 2018
            </p>
          </div>
        </div>

        {/* Export & Action buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            title="Xuất bảng điểm ra file Excel (CSV UTF-8 BOM chuẩn tiếng Việt)"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Xuất Excel lớp {selectedClass}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAddStudent(true)}
            className="px-3.5 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm học sinh</span>
          </button>
        </div>
      </div>

      {/* Class Switcher Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Chọn lớp quản lý:</span>
        {['1A', '2A', '3A', '4A', '5A'].map((cls) => (
          <button
            key={cls}
            type="button"
            onClick={() => setSelectedClass(cls)}
            className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
              selectedClass === cls
                ? 'bg-indigo-600 text-white shadow-xs scale-102'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-indigo-50'
            }`}
          >
            Lớp {cls} (35 học sinh)
          </button>
        ))}
      </div>

      {/* Sub Tabs Bar */}
      <div className="flex space-x-2 border-b-2 border-indigo-100 pb-1 overflow-x-auto">
        {[
          { id: 'classes', label: '1. Danh sách học sinh & Tiến độ' },
          { id: 'submissions', label: '2. Bài các em đã nộp' },
          { id: 'reports', label: '3. Báo cáo kết quả học tập' },
          { id: 'assign', label: '4. Soạn & Giao bài tập' },
          { id: 'messages', label: '5. Trao đổi với cha mẹ' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveSubTab(tab.id)}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
              activeSubTab === tab.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-indigo-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: DANH SÁCH HỌC SINH & TIẾN ĐỘ THỜI GIAN THỰC */}
      {activeSubTab === 'classes' && (
        <div className="space-y-4">
          {/* Quick Metrics Bar for the Class */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white border border-indigo-100 p-4 rounded-2xl shadow-2xs">
              <span className="text-xs text-slate-500 font-bold block">Sĩ số lớp {selectedClass}</span>
              <span className="text-2xl font-black text-indigo-950 font-heading">{classStudents.length} em</span>
            </div>
            <div className="bg-white border border-indigo-100 p-4 rounded-2xl shadow-2xs">
              <span className="text-xs text-slate-500 font-bold block">Điểm trung bình lớp</span>
              <span className="text-2xl font-black text-amber-600 font-heading">{avgClassScore} / 10</span>
            </div>
            <div className="bg-white border border-indigo-100 p-4 rounded-2xl shadow-2xs">
              <span className="text-xs text-slate-500 font-bold block">Tỷ lệ hoàn thành</span>
              <span className="text-2xl font-black text-emerald-600 font-heading">{completedRate}%</span>
            </div>
            <div className="bg-white border border-indigo-100 p-4 rounded-2xl shadow-2xs">
              <span className="text-xs text-slate-500 font-bold block">Cần hỗ trợ tìm ý</span>
              <span className="text-2xl font-black text-rose-600 font-heading">
                {classStudents.filter(s => s.status === 'can_giup_do' || s.status === 'dang_tim_y').length} em
              </span>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="bg-white border-2 border-slate-200/80 rounded-3xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
                placeholder="Tìm tên học sinh hoặc mã học sinh..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Trạng thái:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="dang_tim_y">Đang tìm ý</option>
                <option value="dang_lap_dan_y">Đang lập dàn ý</option>
                <option value="dang_viet">Đang viết bài</option>
                <option value="da_nop">Đã nộp bài</option>
                <option value="da_cham">Đã chấm điểm</option>
                <option value="can_giup_do">Cần giúp đỡ</option>
              </select>
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-white border-2 border-slate-200/80 rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-black uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Mã số</th>
                    <th className="py-3 px-4">Họ và tên</th>
                    <th className="py-3 px-4">Trạng thái hiện tại</th>
                    <th className="py-3 px-4">Bài văn đang thực hiện</th>
                    <th className="py-3 px-4 text-center">Điểm TB</th>
                    <th className="py-3 px-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((s) => {
                    const statusBadge = {
                      da_cham: { text: 'Đã chấm', bg: 'bg-emerald-100 text-emerald-800' },
                      da_nop: { text: 'Đã nộp bài', bg: 'bg-indigo-100 text-indigo-800' },
                      dang_viet: { text: 'Đang viết', bg: 'bg-amber-100 text-amber-800' },
                      dang_lap_dan_y: { text: 'Đang lập dàn ý', bg: 'bg-yellow-100 text-yellow-800' },
                      dang_tim_y: { text: 'Đang tìm ý', bg: 'bg-sky-100 text-sky-800' },
                      can_giup_do: { text: 'Cần giúp đỡ', bg: 'bg-rose-100 text-rose-800' },
                    }[s.status] || { text: 'Đang học', bg: 'bg-slate-100 text-slate-700' };

                    return (
                      <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-slate-500 text-xs">
                          {s.id}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-800 flex items-center gap-2">
                          <span className="text-base">{s.avatar}</span>
                          <span>{s.name}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${statusBadge.bg}`}>
                            {statusBadge.text}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600 font-medium text-xs max-w-[220px] truncate">
                          {s.currentEssayTitle || "Tập làm văn theo đề luyện"}
                        </td>
                        <td className="py-3 px-4 text-center font-black text-amber-600 font-heading">
                          {s.averageScore}
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => setSelectedStudentForDetail(s)}
                            className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all cursor-pointer"
                          >
                            Xem tiến trình
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BÀI CÁC EM ĐÃ NỘP (CHẤM VÀ TRẢ BÀI) */}
      {activeSubTab === 'submissions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-slate-800 font-heading">
              Danh sách bài nộp cần cô chấm điểm & nhận xét
            </h3>
            <span className="text-xs font-bold text-indigo-800 bg-indigo-100 px-3 py-1 rounded-full">
              {essays.length} bài tập
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {essays.map((essay) => (
              <div
                key={essay.id}
                className="bg-white border-2 border-indigo-100 hover:border-indigo-300 rounded-3xl p-5 shadow-xs space-y-3 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-indigo-900 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                      Lớp {essay.grade} • {essay.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      V{essay.version || 1}
                    </span>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    essay.status === 'da_cham' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {essay.status === 'da_cham' ? 'Đã chấm' : 'Chờ cô chấm'}
                  </span>
                </div>

                <div>
                  <h4 className="font-black text-sm sm:text-base text-slate-800 font-heading">
                    {essay.studentName} – {essay.promptTitle}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1 italic">
                    "{essay.revisedContent || essay.originalContent}"
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500 font-medium">
                    {essay.sentenceCount || 8} câu • {essay.wordCount || 130} từ
                    {essay.officialFeedback?.officialScore && (
                      <span className="ml-2 font-black text-indigo-600">
                        ({essay.officialFeedback.officialScore} điểm)
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setGradingEssay(essay);
                      setOfficialScore(essay.officialFeedback?.officialScore ?? essay.assistantFeedback?.suggestedScore ?? 9.5);
                      setOfficialTeacherNote(essay.officialFeedback?.teacherNote || '');
                    }}
                    className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{essay.status === 'da_cham' ? 'Sửa điểm & nhận xét' : 'Chấm bài ngay'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BÁO CÁO KẾT QUẢ HỌC TẬP */}
      {activeSubTab === 'reports' && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-indigo-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
            <h3 className="text-base sm:text-lg font-black text-indigo-950 font-heading">
              Báo cáo chất lượng môn Tiếng Việt – Khối Tiểu Học
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100">
                <span className="text-xs font-bold text-indigo-900 block mb-1">Mức Hoàn thành Tốt (Điểm 9–10)</span>
                <span className="text-3xl font-black text-indigo-950 font-heading">68%</span>
                <p className="text-[11px] text-slate-500 mt-1">Các em biết dùng từ láy và hình ảnh so sánh</p>
              </div>

              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-100">
                <span className="text-xs font-bold text-amber-900 block mb-1">Mức Hoàn thành (Điểm 7–8)</span>
                <span className="text-3xl font-black text-amber-950 font-heading">30%</span>
                <p className="text-[11px] text-slate-500 mt-1">Nắm đúng cấu trúc đoạn, viết rõ ý</p>
              </div>

              <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-100">
                <span className="text-xs font-bold text-rose-900 block mb-1">Cần rèn luyện thêm (Dưới 7)</span>
                <span className="text-3xl font-black text-rose-950 font-heading">2%</span>
                <p className="text-[11px] text-slate-500 mt-1">Cần cô giáo hỗ trợ ở bước tìm ý và chính tả</p>
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="button"
                onClick={handleExportCSV}
                className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Tải bảng điểm tổng hợp môn Tiếng Việt (.CSV)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SOẠN & GIAO BÀI TẬP */}
      {activeSubTab === 'assign' && (
        <div className="bg-white border-2 border-indigo-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4 max-w-2xl">
          <h3 className="text-base sm:text-lg font-black text-indigo-950 font-heading">
            Giao bài luyện viết mới cho học sinh
          </h3>

          {assignSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{assignSuccess}</span>
            </div>
          )}

          <div className="space-y-3 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Đề bài tập:</label>
              <input
                type="text"
                value={assignPromptTitle}
                onChange={(e) => setAssignPromptTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Giao cho lớp:</label>
                <select
                  value={assignTargetClass}
                  onChange={(e) => setAssignTargetClass(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                >
                  {['1A', '2A', '3A', '4A', '5A'].map(cls => (
                    <option key={cls} value={cls}>Lớp {cls}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Hạn nộp bài:</label>
                <input
                  type="date"
                  value={assignDeadline}
                  onChange={(e) => setAssignDeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setAssignSuccess(`Đã giao bài tập thành công cho toàn bộ học sinh lớp ${assignTargetClass}!`);
                  setTimeout(() => setAssignSuccess(''), 3000);
                }}
                className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Giao bài cho cả lớp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: TRAO ĐỔI VỚI CHA MẸ */}
      {activeSubTab === 'messages' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-slate-800 font-heading">
              Sổ liên lạc điện tử & Trao đổi với phụ huynh học sinh
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {classStudents.slice(0, 8).map((st) => (
              <div key={st.id} className="bg-white border-2 border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-black text-slate-800 text-sm">
                    {st.name} <span className="text-xs text-slate-400 font-mono">({st.className})</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Phụ huynh: <span className="font-bold text-indigo-900">{st.parentName}</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedParentStudent(st)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Nhắn phụ huynh</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grading Modal */}
      {gradingEssay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border-2 border-indigo-300 rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl relative my-8 space-y-4">
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-black text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full uppercase">
                  Chấm bài: {gradingEssay.studentName} (Lớp {gradingEssay.grade})
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-800 font-heading mt-1">
                  {gradingEssay.promptTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setGradingEssay(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                Đóng
              </button>
            </div>

            {gradingSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-bold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{gradingSuccess}</span>
              </div>
            )}

            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2 text-xs sm:text-sm">
              <div>
                <span className="font-bold text-slate-700 block mb-1">Nội dung bài viết của học sinh:</span>
                <div className="notebook-paper border border-amber-200 rounded-2xl p-4 leading-[28px] text-slate-800 font-semibold">
                  {gradingEssay.revisedContent || gradingEssay.originalContent}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Điểm chính thức (thang 10):</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    step="0.5"
                    value={officialScore}
                    onChange={(e) => setOfficialScore(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-base text-amber-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Gợi ý từ Bạn Bút Chì:</label>
                  <div className="p-2.5 bg-amber-50 rounded-xl text-xs font-bold text-amber-900 border border-amber-200">
                    {gradingEssay.assistantFeedback?.suggestedScore || 9.0} điểm
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Lời nhắn động viên của cô giáo:</label>
                <textarea
                  value={officialTeacherNote}
                  onChange={(e) => setOfficialTeacherNote(e.target.value)}
                  rows={3}
                  placeholder="Cô khen bài viết của em rất sinh động, có nhiều câu văn hay..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setGradingEssay(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleSaveGrade}
                className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md"
              >
                Lưu điểm & Trả bài cho học sinh
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Parent Message Modal */}
      {selectedParentStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white border-2 border-indigo-300 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
            <h3 className="text-base sm:text-lg font-black text-indigo-950 font-heading">
              Gửi lời nhắn cho {selectedParentStudent.parentName}
            </h3>

            {parentMessageSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-bold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{parentMessageSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSendParentMessage} className="space-y-3 text-xs sm:text-sm">
              <p className="text-slate-600 font-medium">
                Học sinh: <span className="font-bold text-slate-800">{selectedParentStudent.name}</span> (Lớp {selectedParentStudent.className})
              </p>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nội dung tin nhắn:</label>
                <textarea
                  value={parentMessageText}
                  onChange={(e) => setParentMessageText(e.target.value)}
                  rows={4}
                  placeholder="Kính gửi phụ huynh, tuần này em học tập rất tích cực, bài viết văn có nhiều tiến bộ..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedParentStudent(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md"
                >
                  Gửi tin nhắn
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Progress Inspection Modal */}
      {selectedStudentForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border-2 border-indigo-300 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-indigo-950 font-heading">
                  Tiến trình học tập của em {selectedStudentForDetail.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Mã số: {selectedStudentForDetail.id} • Lớp {selectedStudentForDetail.className}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStudentForDetail(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                Đóng
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl">
                <div>
                  <span className="text-slate-500 block text-xs">Trạng thái hiện tại:</span>
                  <span className="font-bold text-indigo-700">
                    {selectedStudentForDetail.status === 'da_cham' ? 'Đã hoàn thành và được chấm điểm' : 'Đang làm bài tập'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Điểm trung bình tích lũy:</span>
                  <span className="font-bold text-amber-600">{selectedStudentForDetail.averageScore} / 10</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">Bài văn gần nhất:</span>
                <p className="p-3 bg-amber-50 rounded-xl text-amber-950 font-semibold border border-amber-200">
                  {selectedStudentForDetail.currentEssayTitle || "Tả chú mèo mướp sưởi nắng bên thềm"}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedStudentForDetail(null)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
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
