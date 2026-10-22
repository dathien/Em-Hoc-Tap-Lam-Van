import React, { useState } from 'react';
import { UserRole } from '../../types';
import { BookPencilLogo } from './BookPencilLogo';
import { 
  Sparkles, 
  MapPin, 
  MessageSquare, 
  Library, 
  Trophy, 
  GraduationCap, 
  Users, 
  LogOut, 
  BookOpen, 
  FileText, 
  BarChart3, 
  HeartHandshake,
  Menu,
  X,
  Home,
  Compass,
  HelpCircle,
  LogIn,
  TrendingUp,
  User
} from 'lucide-react';

interface HeaderProps {
  isLoggedIn: boolean;
  currentRole: UserRole | null;
  currentUsername: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isLoggedIn,
  currentRole,
  currentUsername,
  activeTab,
  onTabChange,
  onOpenLogin,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (tabId: string) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
  };

  // Get user profile badge info
  const getRoleBadge = () => {
    if (currentRole === 'teacher') {
      return {
        bg: 'bg-indigo-100 text-indigo-900 border-indigo-200',
        name: 'Cô Thu Hà',
        roleText: 'Giáo viên',
        tag: 'Khối Tiểu học'
      };
    }
    if (currentRole === 'parent') {
      return {
        bg: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        name: 'Mẹ Thanh Thảo',
        roleText: 'Phụ huynh',
        tag: 'Bé Mai Anh 3A'
      };
    }
    return {
      bg: 'bg-amber-100 text-amber-950 border-amber-200',
      name: 'Lê Mai Anh',
      roleText: 'Học sinh',
      tag: 'Lớp 3A'
    };
  };

  const roleInfo = getRoleBadge();

  // Primary menu items based on user role
  const getMenuItems = () => {
    // 1. Chưa đăng nhập
    if (!isLoggedIn || !currentRole) {
      return [
        { id: 'home', label: 'Trang chủ', icon: Home },
        { 
          id: 'explore', 
          label: 'Khám phá', 
          icon: Compass,
          action: () => {
            if (activeTab !== 'home') handleNavigate('home');
            setTimeout(() => {
              const el = document.getElementById('explore-garden');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 80);
          }
        },
        { id: 'student_library', label: 'Thư viện đề văn', icon: Library },
        { 
          id: 'guide', 
          label: 'Hướng dẫn', 
          icon: HelpCircle,
          action: () => {
            if (activeTab !== 'home') handleNavigate('home');
            setTimeout(() => {
              const el = document.getElementById('guide-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 80);
          }
        },
      ];
    }

    // 2. Học sinh đăng nhập: Logo | Trang chủ | Bản đồ ý tưởng | Cô góp ý | Thư viện đề văn | Tiến bộ | Tài khoản
    if (currentRole === 'student') {
      return [
        { id: 'home', label: 'Trang chủ', icon: Home },
        { id: 'student_ideamap', label: 'Bản đồ ý tưởng', icon: MapPin },
        { id: 'student_feedback', label: 'Cô góp ý', icon: MessageSquare },
        { id: 'student_library', label: 'Thư viện đề văn', icon: Library },
        { id: 'student_journey', label: 'Tiến bộ', icon: TrendingUp },
      ];
    }

    // 3. Giáo viên đăng nhập: Logo | Lớp học | Giao bài | Bài đã nộp | Kết quả | Tài khoản
    if (currentRole === 'teacher') {
      return [
        { id: 'home', label: 'Trang chủ', icon: Home },
        { id: 'teacher_classes', label: 'Lớp học', icon: Users },
        { id: 'teacher_assign', label: 'Giao bài', icon: FileText },
        { id: 'teacher_submissions', label: 'Bài đã nộp', icon: MessageSquare },
        { id: 'teacher_reports', label: 'Kết quả', icon: BarChart3 },
      ];
    }

    // 4. Phụ huynh đăng nhập: Logo | Trang chủ | Học tập của con | Tiến bộ | Nhận xét | Tài khoản
    return [
      { id: 'home', label: 'Trang chủ', icon: Home },
      { id: 'parent_essays', label: 'Học tập của con', icon: FileText },
      { id: 'parent_progress', label: 'Tiến bộ', icon: Trophy },
      { id: 'parent_messages', label: 'Nhận xét', icon: MessageSquare },
    ];
  };

  const menuItems = getMenuItems();

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-b-2 border-amber-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Left: Brand Logo & Title */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none group shrink-0"
          onClick={() => handleNavigate('home')}
        >
          <div className="shrink-0 transition-transform group-hover:scale-105">
            <BookPencilLogo size={40} />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="text-sm sm:text-base lg:text-lg font-black text-[#243B53] tracking-tight font-heading whitespace-nowrap">
                EM HỌC TẬP LÀM VĂN
              </span>
              <span className="hidden xl:inline-block bg-[#DDF4FF] text-[#0284C7] text-[10px] font-extrabold px-1.5 py-0.2 rounded-full border border-sky-200 uppercase">
                GDPT 2018
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-bold text-amber-700 italic hidden sm:flex items-center gap-1">
              <span>Em nghĩ điều hay – Em viết điều đẹp</span>
              <Sparkles className="w-2.5 h-2.5 text-amber-500" />
            </p>
          </div>
        </div>

        {/* Center: Reorganized Clean Navigation Menu */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 flex-1 justify-center max-w-2xl px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    handleNavigate(item.id);
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs lg:text-sm font-black whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-amber-400/90 text-amber-950 shadow-2xs font-extrabold'
                    : 'text-[#243B53] hover:text-amber-800 hover:bg-amber-100/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-950' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: User Role Badge / Login Button */}
        <div className="flex items-center gap-2 shrink-0">
          {!isLoggedIn ? (
            <button
              type="button"
              onClick={onOpenLogin}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white text-xs sm:text-sm font-black shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <LogIn className="w-4 h-4" />
              <span>Đăng nhập</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              {/* User Account Info Tag */}
              <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold ${roleInfo.bg}`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-extrabold text-[#243B53]">{roleInfo.name}</span>
                <span className="text-[10px] text-slate-500 hidden sm:inline">({roleInfo.tag})</span>
              </div>

              {/* Logout Button */}
              <button
                type="button"
                onClick={onLogout}
                className="p-1.5 px-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap"
                title="Đăng xuất khỏi tài khoản"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Đăng xuất</span>
              </button>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-amber-100/70 transition-colors cursor-pointer"
            aria-label="Mở menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF7] border-t border-amber-200 px-4 py-3 space-y-2 shadow-lg animate-fadeIn">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    if (item.action) {
                      item.action();
                      setMobileMenuOpen(false);
                    } else {
                      handleNavigate(item.id);
                    }
                  }}
                  className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold text-left transition-colors ${
                    isActive ? 'bg-amber-200/80 text-amber-950 font-black' : 'text-[#243B53] hover:bg-amber-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-600" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-amber-200/60">
            {isLoggedIn ? (
              <div className="space-y-2 pt-1">
                <div className={`p-2 rounded-xl text-xs font-bold ${roleInfo.bg} flex items-center justify-between`}>
                  <span>{roleInfo.name} ({roleInfo.tag})</span>
                  <span className="text-[10px] text-emerald-700 font-bold bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                    Đang hoạt động
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Đăng xuất tài khoản</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <LogIn className="w-4 h-4" />
                <span>Đăng nhập hệ thống</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
