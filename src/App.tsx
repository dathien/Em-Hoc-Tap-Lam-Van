/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserRole, PromptItem, EssaySubmission } from './types';
import { StorageService } from './services/storageService';
import { Header } from './components/common/Header';
import { LoginPage } from './components/auth/LoginPage';
import { HomePage } from './components/home/HomePage';
import { IdeaMap } from './components/student/IdeaMap';
import { TeacherFeedback } from './components/student/TeacherFeedback';
import { PromptLibrary } from './components/student/PromptLibrary';
import { StudentJourney } from './components/student/StudentJourney';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { ParentDashboard } from './components/parent/ParentDashboard';

export default function App() {
  // Authentication & Role state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [currentUsername, setCurrentUsername] = useState('');
  const [loginTargetRole, setLoginTargetRole] = useState<UserRole | null>(null);

  // Active navigation tab (check if initial URL is /login)
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.pathname === '/login') {
      return 'login';
    }
    return 'home';
  });

  // Intended tab after login
  const [intendedTabAfterLogin, setIntendedTabAfterLogin] = useState<string | null>(null);

  // Cross-screen state: Pre-filled prompt when clicking "Cùng tìm ý" from Library
  const [selectedPromptForIdeaMap, setSelectedPromptForIdeaMap] = useState<PromptItem | null>(null);

  // Active essay for Feedback screen
  const [activeEssayForFeedback, setActiveEssayForFeedback] = useState<EssaySubmission | null>(null);

  // Initialize storage on mount
  useEffect(() => {
    StorageService.init();

    // Listen to browser Back/Forward navigation (popstate)
    const handlePopState = () => {
      if (window.location.pathname === '/login') {
        setActiveTab('login');
      } else {
        setActiveTab(prev => (prev === 'login' ? 'home' : prev));
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigate with browser history synchronization
  const navigateTo = (tab: string, path: string = '/') => {
    setActiveTab(tab);
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
  };

  // Navigate to standalone Login Page
  const goToLoginPage = (role: UserRole = 'student', intendedDestination?: string) => {
    setLoginTargetRole(role);
    if (intendedDestination) {
      setIntendedTabAfterLogin(intendedDestination);
    }
    navigateTo('login', '/login');
  };

  // Handle Login completion from LoginPage
  const handleLoginSuccess = (role: UserRole, username: string) => {
    setIsLoggedIn(true);
    setCurrentRole(role);
    setCurrentUsername(username);

    // Target destination
    let nextTab = 'student_ideamap';
    if (intendedTabAfterLogin) {
      nextTab = intendedTabAfterLogin;
      setIntendedTabAfterLogin(null);
    } else {
      if (role === 'teacher') nextTab = 'teacher_classes';
      else if (role === 'parent') nextTab = 'parent_overview';
      else nextTab = 'student_ideamap';
    }

    navigateTo(nextTab, '/');
  };

  // Handle Logout -> returns to Home page and URL '/'
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentRole(null);
    setCurrentUsername('');
    setIntendedTabAfterLogin(null);
    navigateTo('home', '/');
  };

  // CTA button "BẮT ĐẦU HỌC NGAY" on Home Page
  const handleStartLearning = () => {
    if (!isLoggedIn) {
      goToLoginPage('student', 'student_ideamap');
    } else {
      if (currentRole === 'teacher') navigateTo('teacher_classes');
      else if (currentRole === 'parent') navigateTo('parent_overview');
      else navigateTo('student_ideamap');
    }
  };

  // Open feature from Home Page cards
  const handleOpenFeature = (featureTab: string) => {
    // If opening prompt library, user can view directly without login
    if (featureTab === 'student_library') {
      navigateTo('student_library');
      return;
    }

    if (!isLoggedIn) {
      goToLoginPage('student', featureTab);
    } else {
      navigateTo(featureTab);
    }
  };

  // Jump from Prompt Library to Idea Map with pre-filled prompt
  const handleSelectPromptToBrainstorm = (prompt: PromptItem) => {
    setSelectedPromptForIdeaMap(prompt);
    if (!isLoggedIn) {
      goToLoginPage('student', 'student_ideamap');
    } else {
      navigateTo('student_ideamap');
    }
  };

  // Jump from Idea Map to Feedback after submission
  const handleNavigateToFeedback = (essay: EssaySubmission) => {
    setActiveEssayForFeedback(essay);
    navigateTo('student_feedback');
  };

  // ============================================================
  // STANDALONE LOGIN PAGE (FULL SCREEN, NO MODAL, NO POPUP)
  // ============================================================
  if (activeTab === 'login') {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onBackToHome={() => navigateTo('home', '/')}
        initialRole={loginTargetRole}
      />
    );
  }

  // ============================================================
  // MAIN APPLICATION LAYOUT (HEADER + VIEWS)
  // ============================================================
  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 text-slate-800">
      {/* App Header */}
      <Header
        isLoggedIn={isLoggedIn}
        currentRole={currentRole}
        currentUsername={currentUsername}
        activeTab={activeTab}
        onTabChange={(tab) => {
          // If clicking student workspace tab while not logged in, route to /login
          if (!isLoggedIn && (tab === 'student_ideamap' || tab === 'student_feedback' || tab === 'student_journey')) {
            goToLoginPage('student', tab);
            return;
          }
          navigateTo(tab, '/');
        }}
        onOpenLogin={() => goToLoginPage(currentRole || 'student')}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* === HOME PAGE VIEW === */}
        {activeTab === 'home' && (
          <HomePage
            isLoggedIn={isLoggedIn}
            currentRole={currentRole}
            onStartLearning={handleStartLearning}
            onOpenFeature={handleOpenFeature}
            onOpenLoginWithRole={(role) => goToLoginPage(role)}
          />
        )}

        {/* === STUDENT ROLE VIEWS & PUBLIC LIBRARY === */}
        {activeTab === 'student_ideamap' && (
          <IdeaMap
            initialPrompt={selectedPromptForIdeaMap ? {
              title: selectedPromptForIdeaMap.title,
              grade: selectedPromptForIdeaMap.grade,
              category: selectedPromptForIdeaMap.category,
              extraRequirements: selectedPromptForIdeaMap.languageRequirements
            } : null}
            onNavigateToFeedback={handleNavigateToFeedback}
          />
        )}

        {activeTab === 'student_feedback' && (
          <TeacherFeedback
            currentEssay={activeEssayForFeedback}
          />
        )}

        {activeTab === 'student_library' && (
          <PromptLibrary
            onSelectPromptToBrainstorm={handleSelectPromptToBrainstorm}
            isTeacherMode={currentRole === 'teacher'}
          />
        )}

        {activeTab === 'student_journey' && (
          <StudentJourney
            onOpenEssay={(essay) => {
              setActiveEssayForFeedback(essay);
              navigateTo('student_feedback');
            }}
          />
        )}

        {/* === TEACHER ROLE VIEWS === */}
        {(activeTab === 'teacher_classes' || 
          activeTab === 'teacher_prompts' || 
          activeTab === 'teacher_assign' || 
          activeTab === 'teacher_submissions' || 
          activeTab === 'teacher_reports' || 
          activeTab === 'teacher_messages') && (
          <TeacherDashboard
            initialSubTab={
              activeTab === 'teacher_submissions' ? 'submissions' :
              activeTab === 'teacher_reports' ? 'reports' :
              activeTab === 'teacher_assign' ? 'assign' :
              activeTab === 'teacher_messages' ? 'messages' : 'classes'
            }
          />
        )}

        {/* === PARENT ROLE VIEWS === */}
        {(activeTab === 'parent_overview' || 
          activeTab === 'parent_essays' || 
          activeTab === 'parent_progress' || 
          activeTab === 'parent_messages') && (
          <ParentDashboard
            initialSubTab={
              activeTab === 'parent_essays' ? 'essays' :
              activeTab === 'parent_progress' ? 'progress' :
              activeTab === 'parent_messages' ? 'messages' : 'overview'
            }
          />
        )}
      </main>
    </div>
  );
}
