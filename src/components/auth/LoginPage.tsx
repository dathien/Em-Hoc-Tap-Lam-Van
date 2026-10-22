import React, { useState, useEffect } from 'react';
import { UserRole } from '../../types';
import { BookPencilLogo } from '../common/BookPencilLogo';
import { PencilSVG } from '../common/MascotPencil';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  ShieldAlert, 
  ArrowLeft, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Sparkles, 
  UserCheck, 
  Home, 
  Lock, 
  User
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (role: UserRole, username: string) => void;
  onBackToHome: () => void;
  initialRole?: UserRole | null;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onBackToHome,
  initialRole
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole || 'student');
  const [username, setUsername] = useState('hocsinh01');
  const [password, setPassword] = useState('Demo@123');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync initial role when passed
  useEffect(() => {
    const role = initialRole || 'student';
    setSelectedRole(role);
    if (role === 'teacher') setUsername('giaovien');
    else if (role === 'parent') setUsername('phuhuynh01');
    else setUsername('hocsinh01');
    setPassword('Demo@123');
    setErrorMsg('');
  }, [initialRole]);

  // Handle Role selection
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'teacher') setUsername('giaovien');
    else if (role === 'parent') setUsername('phuhuynh01');
    else setUsername('hocsinh01');
    setPassword('Demo@123');
    setErrorMsg('');
  };

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMsg('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
      return;
    }

    // Validation for demo credentials
    if (selectedRole === 'teacher' && username !== 'giaovien') {
      setErrorMsg('Tài khoản giáo viên thử nghiệm hợp lệ là: giaovien');
      return;
    }
    if (selectedRole === 'student' && !username.startsWith('hocsinh') && !username.startsWith('hs_')) {
      setErrorMsg('Tài khoản học sinh thử nghiệm hợp lệ là: hocsinh01');
      return;
    }
    if (selectedRole === 'parent' && !username.startsWith('phuhuynh')) {
      setErrorMsg('Tài khoản phụ huynh thử nghiệm hợp lệ là: phuhuynh01');
      return;
    }
    if (password !== 'Demo@123') {
      setErrorMsg('Mật khẩu thử nghiệm là: Demo@123');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    // Brief realistic processing feedback
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(selectedRole, username.trim());
    }, 450);
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col lg:flex-row">
      {/* ========================================================= */}
      {/* CỘT TRÁI (40% trên Desktop) - Giới thiệu, Logo & Mascot    */}
      {/* ========================================================= */}
      <div className="w-full lg:w-[40%] bg-gradient-to-br from-sky-100/80 via-amber-50/70 to-sky-50 p-6 sm:p-10 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-amber-200/80">
        <div className="space-y-6">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <BookPencilLogo size={48} />
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg sm:text-xl font-black text-amber-950 font-heading tracking-tight">
                  EM HỌC TẬP LÀM VĂN
                </h1>
                <span className="bg-orange-100 text-orange-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-orange-200 uppercase">
                  GDPT 2018
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-amber-700 italic">
                Em nghĩ điều hay – Em viết điều đẹp
              </p>
            </div>
          </div>

          {/* Friendly Mascot & Illustration Card */}
          <div className="bg-white/80 backdrop-blur-xs border-2 border-amber-200/80 rounded-3xl p-5 shadow-xs flex items-center gap-4">
            <div className="animate-pencil-bob shrink-0">
              <PencilSVG size={58} mood="happy" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-800 uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Bạn Bút Chì Chào Em!</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed mt-1">
                "Hãy cùng Bạn Bút Chì khám phá những câu chuyện thú vị và tự tay viết nên những bài văn thật hay nhé!"
              </p>
            </div>
          </div>

          {/* 3 Short Benefit Highlights */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-black text-slate-600 uppercase tracking-wider">
              Lợi ích khi học tập cùng ứng dụng:
            </h3>

            <div className="space-y-2.5">
              <div className="flex items-start gap-3 bg-white/60 p-3 rounded-2xl border border-sky-200/60">
                <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  1
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    Khơi gợi ý tưởng tự nhiên
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-snug">
                    AI không viết bài thay học sinh; gợi mở kỷ niệm và trải nghiệm để em tự tin diễn đạt.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/60 p-3 rounded-2xl border border-sky-200/60">
                <div className="w-7 h-7 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  2
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    10 tiêu chí góp ý chuẩn GDPT 2018
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-snug">
                    Trích dẫn câu văn của em, khen ngợi cụ thể và hướng dẫn sửa bài nhẹ nhàng, đúng trọng tâm.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/60 p-3 rounded-2xl border border-sky-200/60">
                <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  3
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    Đồng hành ba bên toàn diện
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-snug">
                    Học sinh học viết chủ động – Thầy cô chấm điểm tận tâm – Cha mẹ theo dõi tiến bộ tại nhà.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-6 mt-6 border-t border-amber-200/60 text-[11px] text-slate-500 font-medium hidden lg:block">
          Bộ sách Tiếng Việt Kết nối tri thức với cuộc sống (Lớp 1–5). Môi trường giáo dục an toàn, không quảng cáo.
        </div>
      </div>

      {/* ========================================================= */}
      {/* CỘT PHẢI (60% trên Desktop) - Form Đăng nhập độc lập      */}
      {/* ========================================================= */}
      <div className="w-full lg:w-[60%] p-6 sm:p-10 lg:p-16 flex flex-col justify-between bg-white">
        {/* Top bar with Back to Home button */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-100">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:text-amber-900 hover:bg-amber-50 border border-slate-200 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-amber-600" />
            <span>Về trang chủ</span>
          </button>

          <span className="text-xs font-semibold text-slate-400">
            Hệ thống đăng nhập độc lập
          </span>
        </div>

        {/* Form Container */}
        <div className="my-auto py-6 max-w-xl w-full mx-auto space-y-6">
          {/* Header Title */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Chào mừng trở lại!
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
              Chọn vai trò của bạn để bắt đầu học tập và làm việc.
            </p>
          </div>

          {/* Testing Disclaimer Banner */}
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3.5 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-950 leading-relaxed font-medium">
              <span className="font-bold text-amber-900">Ghi chú thử nghiệm:</span> Đây là trang đăng nhập thử nghiệm phục vụ kiểm thử trong Google AI Studio. Các tài khoản mẫu có sẵn mật khẩu là <code className="font-mono bg-white px-1.5 py-0.5 rounded-md border border-amber-200 text-amber-800 font-bold">Demo@123</code>.
            </div>
          </div>

          {/* 3 Role Selection Cards (Same Height, perfectly aligned) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
              Chọn vai trò đăng nhập:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Role 1: Học sinh */}
              <button
                type="button"
                onClick={() => handleRoleSelect('student')}
                className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between items-center text-center cursor-pointer min-h-[110px] ${
                  selectedRole === 'student'
                    ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm scale-102 ring-2 ring-amber-400/30'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-1">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-black">Học sinh</div>
                  <div className="text-[10px] text-slate-400 font-medium">Lớp 1 – 5</div>
                </div>
              </button>

              {/* Role 2: Giáo viên */}
              <button
                type="button"
                onClick={() => handleRoleSelect('teacher')}
                className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between items-center text-center cursor-pointer min-h-[110px] ${
                  selectedRole === 'teacher'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-950 shadow-sm scale-102 ring-2 ring-indigo-400/30'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-1">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-black">Giáo viên</div>
                  <div className="text-[10px] text-slate-400 font-medium">Cô Thu Hà</div>
                </div>
              </button>

              {/* Role 3: Phụ huynh */}
              <button
                type="button"
                onClick={() => handleRoleSelect('parent')}
                className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between items-center text-center cursor-pointer min-h-[110px] ${
                  selectedRole === 'parent'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-sm scale-102 ring-2 ring-emerald-400/30'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-black">Phụ huynh</div>
                  <div className="text-[10px] text-slate-400 font-medium">Đồng hành</div>
                </div>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            {/* Username Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tên đăng nhập
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-24 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                  placeholder="Nhập tên đăng nhập"
                  required
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-mono">
                  {selectedRole === 'teacher' ? 'giaovien' : selectedRole === 'parent' ? 'phuhuynh01' : 'hocsinh01'}
                </span>
              </div>
            </div>

            {/* Password Input with Show/Hide Toggle */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-20 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                  placeholder="Nhập mật khẩu"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition-colors p-1"
                  title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 p-3 rounded-xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit Button with Processing State */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Đang đăng nhập...</span>
                  </>
                ) : (
                  <>
                    <UserCheck className="w-5 h-5" />
                    <span>Đăng Nhập Ngay</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick presets for evaluator testing */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
            <span className="font-medium">Chuyển nhanh tài khoản mẫu:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleRoleSelect('student')}
                className="text-amber-600 font-bold hover:underline cursor-pointer"
              >
                Học sinh
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleRoleSelect('teacher')}
                className="text-indigo-600 font-bold hover:underline cursor-pointer"
              >
                Giáo viên
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleRoleSelect('parent')}
                className="text-emerald-600 font-bold hover:underline cursor-pointer"
              >
                Phụ huynh
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Back to Home Link */}
        <div className="pt-6 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={onBackToHome}
            className="text-xs sm:text-sm font-bold text-slate-600 hover:text-amber-800 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Home className="w-4 h-4 text-amber-600" />
            <span>Quay lại màn hình trang chủ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
