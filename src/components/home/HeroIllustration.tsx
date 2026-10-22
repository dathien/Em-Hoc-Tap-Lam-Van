import React from 'react';

export const HeroIllustration: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background Soft Pastel Garden Glows */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-tr from-sky-200/50 via-emerald-100/60 to-amber-200/50 rounded-full blur-3xl -z-10" />

      <svg
        viewBox="0 0 540 430"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-lg lg:max-w-xl h-auto select-none drop-shadow-md"
      >
        {/* Soft Idea Garden Mound / Hills */}
        <path
          d="M30 380C120 340 220 345 310 365C390 380 470 370 510 380V420H30V380Z"
          fill="#DDF7E5"
        />
        <path
          d="M10 400C140 370 260 380 380 395C440 400 480 395 530 400V425H10V400Z"
          fill="#BBF7D0"
          opacity="0.7"
        />

        {/* Garden Trees & Flowers (Khu vườn ý tưởng) */}
        {/* Left Tree */}
        <g transform="translate(30, 240)">
          <path d="M45 130V90" stroke="#78350F" strokeWidth="8" strokeLinecap="round" />
          <circle cx="45" cy="70" r="32" fill="#86EFAC" />
          <circle cx="30" cy="65" r="24" fill="#4ADE80" />
          <circle cx="60" cy="65" r="24" fill="#4ADE80" />
          <circle cx="45" cy="50" r="22" fill="#22C55E" opacity="0.8" />
          {/* Fruit / Idea Apple */}
          <circle cx="36" cy="68" r="4.5" fill="#EF4444" />
          <circle cx="54" cy="60" r="4" fill="#F59E0B" />
        </g>

        {/* Right Garden Bush & Flowers */}
        <g transform="translate(430, 270)">
          <path d="M40 100V75" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="40" cy="65" rx="36" ry="26" fill="#86EFAC" />
          <ellipse cx="50" cy="55" rx="26" ry="22" fill="#4ADE80" />
          {/* Cute Yellow Flower */}
          <circle cx="22" cy="70" r="5" fill="#FBBF24" />
          <circle cx="22" cy="70" r="2.5" fill="#F59E0B" />
          <circle cx="48" cy="62" r="5" fill="#F472B6" />
          <circle cx="48" cy="62" r="2.5" fill="#DB2777" />
        </g>

        {/* Floating Letters & Idea Sparks (A, B, C, Ô, Ơ) */}
        <g className="animate-gentle-pulse">
          {/* Letter A bubble */}
          <circle cx="95" cy="150" r="18" fill="#FFF2BF" stroke="#FDE68A" strokeWidth="2" />
          <text x="95" y="156" textAnchor="middle" fill="#D97706" fontSize="16" fontWeight="900" fontFamily="sans-serif">
            A
          </text>

          {/* Letter B bubble */}
          <circle cx="470" cy="150" r="17" fill="#FFE2EF" stroke="#FBCFE8" strokeWidth="2" />
          <text x="470" y="156" textAnchor="middle" fill="#DB2777" fontSize="15" fontWeight="900" fontFamily="sans-serif">
            B
          </text>

          {/* Letter C star */}
          <circle cx="435" cy="85" r="16" fill="#DDF4FF" stroke="#BAE6FD" strokeWidth="2" />
          <text x="435" y="91" textAnchor="middle" fill="#0284C7" fontSize="14" fontWeight="900" fontFamily="sans-serif">
            C
          </text>

          {/* Floating Lightbulb of Ideas */}
          <circle cx="240" cy="70" r="24" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="2" />
          <path d="M240 56C234 56 229 60 229 66C229 70 232 73 234 76H246C248 73 251 70 251 66C251 60 246 56 240 56Z" fill="#F59E0B" />
          <rect x="236" y="77" width="8" height="3" rx="1.5" fill="#94A3B8" />
          <circle cx="240" cy="65" r="2.5" fill="#FFF" />
          {/* Lightbulb rays */}
          <line x1="240" y1="48" x2="240" y2="52" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <line x1="225" y1="56" x2="229" y2="59" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <line x1="255" y1="56" x2="251" y2="59" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Floating Paper Sheets & Stars */}
        <g>
          {/* Flying Sheet 1 */}
          <rect x="135" y="95" width="26" height="32" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" transform="rotate(-15 135 95)" />
          <line x1="140" y1="105" x2="155" y2="101" stroke="#93C5FD" strokeWidth="1.5" />
          <line x1="142" y1="112" x2="154" y2="109" stroke="#93C5FD" strokeWidth="1.5" />

          {/* Flying Sheet 2 */}
          <rect x="360" y="80" width="24" height="30" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" transform="rotate(18 360 80)" />
          <line x1="365" y1="92" x2="378" y2="96" stroke="#F472B6" strokeWidth="1.5" />
          <line x1="363" y1="98" x2="376" y2="102" stroke="#F472B6" strokeWidth="1.5" />

          {/* Little Stars */}
          <path d="M190 120L192 125L197 127L192 129L190 134L188 129L183 127L188 125L190 120Z" fill="#FBBF24" />
          <path d="M320 65L322 69L326 70L322 71L320 75L318 71L314 70L318 69L320 65Z" fill="#38BDF8" />
          <path d="M495 220L497 223L500 224L497 225L495 228L493 225L490 224L493 223L495 220Z" fill="#F472B6" />
        </g>

        {/* Cheerful Speech Bubble */}
        <g>
          <rect x="270" y="105" width="150" height="36" rx="18" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="2" />
          <polygon points="300,141 315,141 305,152" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="2" />
          <polygon points="301,140 314,140 305,150" fill="#FFFFFF" />
          <text x="345" y="128" textAnchor="middle" fill="#0369A1" fontSize="12" fontWeight="800" fontFamily="sans-serif">
            Mỗi ý tưởng – Một bài văn hay!
          </text>
        </g>

        {/* --- WOODEN SCHOOL DESK --- */}
        <path d="M85 285C85 278 90 274 98 274H382C390 274 395 278 395 285V298C395 301 392 304 389 304H91C88 304 85 301 85 298V285Z" fill="#FDE68A" />
        <path d="M85 298H395V304H85V298Z" fill="#F59E0B" opacity="0.6" />
        <rect x="110" y="304" width="12" height="90" rx="3" fill="#94A3B8" />
        <rect x="365" y="304" width="12" height="90" rx="3" fill="#94A3B8" />
        <rect x="110" y="365" width="267" height="8" rx="2" fill="#CBD5E1" />

        {/* Notebook open on desk */}
        <g transform="rotate(-5 200 268)">
          <rect x="150" y="248" width="90" height="62" rx="4" fill="#3B82F6" />
          <rect x="153" y="250" width="84" height="58" rx="3" fill="#FEFDF8" />
          <line x1="160" y1="262" x2="228" y2="262" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
          <line x1="160" y1="272" x2="224" y2="272" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
          <line x1="160" y1="282" x2="216" y2="282" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
          <line x1="160" y1="292" x2="228" y2="292" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
          {/* Bookmark */}
          <path d="M192 248V272L196 268L200 272V248H192Z" fill="#EF4444" />
        </g>

        {/* Colorful pencils and books beside desk */}
        <rect x="115" y="280" width="38" height="9" rx="2" fill="#34D399" />
        <rect x="255" y="280" width="16" height="9" rx="2" fill="#F472B6" />

        {/* --- STUDENT WRITING --- */}
        <g>
          {/* Chair */}
          <rect x="150" y="215" width="60" height="40" rx="8" fill="#FBBF24" />
          <rect x="165" y="255" width="6" height="60" fill="#94A3B8" />
          <rect x="190" y="255" width="6" height="60" fill="#94A3B8" />

          {/* Student Body */}
          <path d="M152 225C158 200 198 200 206 225L214 274H144L152 225Z" fill="#38BDF8" />
          {/* White Collar */}
          <polygon points="180,205 170,217 180,221 190,217" fill="#FFFFFF" />
          {/* Red Scarf */}
          <polygon points="180,220 173,241 180,237 187,241" fill="#EF4444" />

          {/* Left Arm Resting */}
          <path d="M152 225C144 240 146 260 169 265" stroke="#38BDF8" strokeWidth="16" strokeLinecap="round" />
          {/* Right Arm Writing */}
          <path d="M206 225C219 240 214 257 199 269" stroke="#38BDF8" strokeWidth="16" strokeLinecap="round" />
          {/* Hands */}
          <circle cx="169" cy="265" r="7" fill="#FED7AA" />
          <circle cx="199" cy="269" r="7" fill="#FED7AA" />
          {/* Writing Pencil */}
          <line x1="198" y1="265" x2="194" y2="279" stroke="#475569" strokeWidth="3" strokeLinecap="round" />

          {/* Head & Neck */}
          <rect x="175" y="193" width="10" height="14" fill="#FED7AA" />
          <circle cx="180" cy="173" r="26" fill="#FED7AA" />

          {/* Hair */}
          <path d="M154 170C154 149 165 145 180 145C195 145 206 149 206 170C206 160 200 151 180 151C161 151 155 160 154 170Z" fill="#1E293B" />
          <path d="M154 170C157 157 170 157 175 163C180 157 195 155 205 167C207 173 207 180 205 183C203 183 201 171 195 167C189 163 180 165 177 171C175 165 163 163 157 173L154 170Z" fill="#0F172A" />

          {/* Smiling Face */}
          <path d="M169 173C171 170 175 170 177 173" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M183 173C185 170 189 170 191 173" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="167" cy="179" r="4" fill="#FDA4AF" opacity="0.8" />
          <circle cx="193" cy="179" r="4" fill="#FDA4AF" opacity="0.8" />
          <path d="M175 181C177 186 183 186 185 181" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* --- BẠN BÚT CHÌ (MASCOT IN ACTION) --- */}
        <g className="animate-pencil-bob" transform="translate(370, 140)">
          {/* Shadow */}
          <ellipse cx="40" cy="175" rx="30" ry="8" fill="#CBD5E1" opacity="0.6" />

          {/* Shoes */}
          <ellipse cx="28" cy="170" rx="9" ry="5" fill="#EF4444" />
          <ellipse cx="52" cy="170" rx="9" ry="5" fill="#EF4444" />

          {/* Body */}
          <rect x="25" y="10" width="30" height="18" rx="5" fill="#F472B6" />
          <rect x="23" y="27" width="34" height="12" rx="2" fill="#CBD5E1" />
          <line x1="23" y1="33" x2="57" y2="33" stroke="#94A3B8" strokeWidth="2" />

          <path d="M24 39H56L53 130H27L24 39Z" fill="#FBBF24" />
          <path d="M36 39H44L43 130H37L36 39Z" fill="#F59E0B" />

          <polygon points="27,130 40,165 53,130" fill="#FED7AA" />
          <polygon points="36,155 40,165 44,155" fill="#334155" />

          {/* Scholar Cap */}
          <polygon points="40,0 72,12 40,20 8,12" fill="#2563EB" />
          <rect x="30" y="12" width="20" height="7" rx="1.5" fill="#1D4ED8" />
          <circle cx="40" cy="11" r="3" fill="#FCD34D" />
          <path d="M66 14L70 28" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />
          <circle cx="70" cy="29" r="2.5" fill="#FCD34D" />

          {/* Joyful Face */}
          <circle cx="33" cy="65" r="4.5" fill="#1E293B" />
          <circle cx="47" cy="65" r="4.5" fill="#1E293B" />
          <circle cx="34.5" cy="63" r="1.5" fill="#FFFFFF" />
          <circle cx="48.5" cy="63" r="1.5" fill="#FFFFFF" />
          <ellipse cx="28" cy="73" rx="3.5" ry="2" fill="#FDA4AF" />
          <ellipse cx="52" cy="73" rx="3.5" ry="2" fill="#FDA4AF" />
          <path d="M33 73Q40 82 47 73" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="#EF4444" />

          {/* Animated Waving Hand */}
          <path d="M24 72C12 65 6 78 14 85" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="12" cy="84" r="5" fill="#FED7AA" />
          {/* Hand Pointing to Notebook */}
          <path d="M56 72C68 76 72 90 62 96" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="62" cy="96" r="5" fill="#FED7AA" />

          {/* Mascot Label Tag */}
          <rect x="8" y="102" width="64" height="18" rx="9" fill="#EA580C" />
          <text x="40" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="800" fontFamily="sans-serif">
            Bạn Bút Chì
          </text>
        </g>
      </svg>
    </div>
  );
};
