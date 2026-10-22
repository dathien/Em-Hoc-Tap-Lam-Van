import React, { useState } from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';

export type PencilMood = 'happy' | 'waving' | 'thinking' | 'pointing' | 'cheering' | 'encouraging' | 'celebrating';

interface MascotPencilProps {
  message?: string;
  mood?: PencilMood;
  onAskHelp?: () => void;
  compact?: boolean;
  className?: string;
}

export const MascotPencil: React.FC<MascotPencilProps> = ({
  message = "Chào bạn nhỏ! Bạn Bút Chì luôn ở đây để đồng hành cùng bạn tìm ý và viết nên những câu văn thật đẹp nhé! ✏️✨",
  mood = 'happy',
  onAskHelp,
  compact = false,
  className = ""
}) => {
  if (compact) {
    return (
      <div className={`flex items-center gap-3 bg-amber-50/95 border border-amber-200/80 rounded-2xl p-3 shadow-xs ${className}`}>
        <div className="relative shrink-0">
          <PencilSVG mood={mood} size={48} />
        </div>
        <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
          {message}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="bg-gradient-to-r from-amber-50/90 via-orange-50/70 to-yellow-50/90 border-2 border-amber-200/90 rounded-3xl p-4 sm:p-5 shadow-xs transition-all hover:shadow-md">
        <div className="flex items-start gap-4">
          {/* Animated Pencil Character */}
          <div className="relative shrink-0 pt-1 group">
            <div className="animate-pencil-bob cursor-pointer transition-transform group-hover:scale-105">
              <PencilSVG mood={mood} size={68} />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-amber-600 text-[10px] font-black text-white px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap">
              Bạn Bút Chì
            </div>
          </div>

          {/* Speech Bubble */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-900 uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Lời nhắn từ Bạn Bút Chì</span>
              </div>
              {onAskHelp && (
                <button
                  type="button"
                  onClick={onAskHelp}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3 h-3" />
                  Hỏi Bút Chì
                </button>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed mt-1">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PencilSVG: React.FC<{ mood?: PencilMood; size?: number }> = ({ mood = 'happy', size = 56 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 110 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-md select-none"
    >
      {/* Little Shoes / Feet */}
      <ellipse cx="44" cy="98" rx="8" ry="4.5" fill="#EF4444" />
      <ellipse cx="66" cy="98" rx="8" ry="4.5" fill="#EF4444" />
      <circle cx="42" cy="97" r="1.5" fill="#FFFFFF" />
      <circle cx="68" cy="97" r="1.5" fill="#FFFFFF" />

      {/* Pencil Eraser (Top) */}
      <rect x="41" y="8" width="28" height="14" rx="4" fill="#F472B6" />
      {/* Ferrule (Metal band) */}
      <rect x="39" y="20" width="32" height="8" rx="2" fill="#CBD5E1" />
      <line x1="39" y1="24" x2="71" y2="24" stroke="#94A3B8" strokeWidth="1.5" />

      {/* Pencil Body */}
      <path d="M40 28H70L67 76H43L40 28Z" fill="#FBBF24" />
      {/* Facet shading */}
      <path d="M49 28H61L60 76H50L49 28Z" fill="#F59E0B" />

      {/* Wood collar */}
      <path d="M43 76L55 94L67 76H43Z" fill="#FED7AA" />
      {/* Lead Tip */}
      <path d="M51 88L55 94L59 88H51Z" fill="#334155" />

      {/* Graduation / Scholar Cap */}
      <polygon points="55,2 78,10 55,16 32,10" fill="#3B82F6" />
      <rect x="47" y="10" width="16" height="5" rx="1" fill="#1D4ED8" />
      <circle cx="55" cy="9" r="2.5" fill="#FCD34D" />
      <path d="M74 11L77 22" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />
      <circle cx="77" cy="23" r="2" fill="#FCD34D" />

      {/* Eyes & Eyebrows based on Mood */}
      {mood === 'thinking' ? (
        <>
          {/* Eyes looking up curiously */}
          <circle cx="48" cy="45" r="3.5" fill="#1E293B" />
          <circle cx="62" cy="45" r="3.5" fill="#1E293B" />
          <circle cx="49" cy="43.5" r="1.3" fill="#FFFFFF" />
          <circle cx="63" cy="43.5" r="1.3" fill="#FFFFFF" />
          {/* Inquisitive eyebrow */}
          <path d="M44 39Q48 37 52 39" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M58 40Q62 38 66 40" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          {/* Wondering small mouth */}
          <circle cx="55" cy="54" r="2" fill="#1E293B" />
        </>
      ) : mood === 'celebrating' ? (
        <>
          {/* Cheerful curved crescent eyes */}
          <path d="M45 44C47 41 51 41 53 44" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M57 44C59 41 63 41 65 44" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Big open joyful mouth */}
          <path d="M49 52Q55 60 61 52Z" fill="#EF4444" stroke="#1E293B" strokeWidth="1.5" />
          {/* Little celebratory stars around */}
          <path d="M30 22L32 25L35 26L32 27L30 30L28 27L25 26L28 25L30 22Z" fill="#F59E0B" />
          <path d="M80 20L82 23L85 24L82 25L80 28L78 25L75 24L78 23L80 20Z" fill="#3B82F6" />
        </>
      ) : (
        <>
          {/* Standard happy eyes with white reflections */}
          <circle cx="48" cy="45" r="3.5" fill="#1E293B" />
          <circle cx="62" cy="45" r="3.5" fill="#1E293B" />
          <circle cx="49" cy="43.5" r="1.3" fill="#FFFFFF" />
          <circle cx="63" cy="43.5" r="1.3" fill="#FFFFFF" />
          {/* Cheerful Smile */}
          <path d="M50 52Q55 58 60 52" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        </>
      )}

      {/* Rosy Cheeks */}
      <ellipse cx="43" cy="51" rx="3.5" ry="2" fill="#FDA4AF" opacity="0.85" />
      <ellipse cx="67" cy="51" rx="3.5" ry="2" fill="#FDA4AF" opacity="0.85" />

      {/* Little Arms & Hands Gestures based on Mood */}
      {mood === 'waving' ? (
        <>
          {/* Left hand waving high */}
          <path d="M40 54C28 46 24 35 28 28" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="28" cy="28" r="4.5" fill="#FED7AA" />
          {/* Right hand on hip */}
          <path d="M70 54C78 58 78 64 72 68" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="71" cy="68" r="4" fill="#FED7AA" />
        </>
      ) : mood === 'pointing' ? (
        <>
          {/* Left hand on hip */}
          <path d="M40 54C32 58 32 64 38 68" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="39" cy="68" r="4" fill="#FED7AA" />
          {/* Right arm pointing forward/right */}
          <path d="M70 52C82 48 88 44 94 40" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="94" cy="40" r="4.5" fill="#FED7AA" />
        </>
      ) : mood === 'thinking' ? (
        <>
          {/* Left arm resting on body */}
          <path d="M40 56C34 60 34 68 42 70" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="42" cy="70" r="4" fill="#FED7AA" />
          {/* Right hand touching chin thoughtfully */}
          <path d="M70 56C76 60 70 56 62 55" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="62" cy="55" r="4.5" fill="#FED7AA" />
        </>
      ) : mood === 'cheering' || mood === 'celebrating' ? (
        <>
          {/* Both arms raised enthusiastically */}
          <path d="M40 52C28 44 26 34 32 26" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="32" cy="26" r="4.5" fill="#FED7AA" />
          <path d="M70 52C82 44 84 34 78 26" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="78" cy="26" r="4.5" fill="#FED7AA" />
        </>
      ) : (
        <>
          {/* Natural happy arms */}
          <path d="M40 52C32 56 30 64 36 68" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="36" cy="68" r="4" fill="#FED7AA" />
          <path d="M70 52C78 56 80 64 74 68" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="74" cy="68" r="4" fill="#FED7AA" />
        </>
      )}
    </svg>
  );
};
