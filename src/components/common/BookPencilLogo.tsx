import React from 'react';

interface BookPencilLogoProps {
  size?: number;
  className?: string;
}

export const BookPencilLogo: React.FC<BookPencilLogoProps> = ({ size = 48, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-sm select-none ${className}`}
    >
      {/* Glow / Sparkle backdrop */}
      <circle cx="50" cy="50" r="44" fill="#FEF3C7" opacity="0.6" />

      {/* Open Book Base */}
      {/* Book Cover Backing */}
      <path
        d="M16 68C26 63 38 63 50 67C62 63 74 63 84 68V34C74 29 62 29 50 33C38 29 26 29 16 34V68Z"
        fill="#3B82F6"
      />
      {/* Book Pages */}
      <path
        d="M18 65C28 60 40 60 50 64C60 60 72 60 82 65V32C72 27 60 27 50 31C40 27 28 27 18 32V65Z"
        fill="#FEFDF8"
      />
      {/* Page Shading (spine) */}
      <path d="M49 32V65H51V32H49Z" fill="#CBD5E1" />
      {/* Decorative Text lines on pages */}
      <line x1="24" y1="39" x2="42" y2="39" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="24" y1="46" x2="44" y2="46" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="24" y1="53" x2="38" y2="53" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />

      <line x1="56" y1="39" x2="76" y2="39" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="56" y1="46" x2="74" y2="46" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="56" y1="53" x2="70" y2="53" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />

      {/* Pencil Slanted Across the Book */}
      <g transform="rotate(-32 58 46)">
        {/* Eraser */}
        <rect x="52" y="10" width="12" height="7" rx="2" fill="#F472B6" />
        <rect x="51" y="17" width="14" height="4" rx="1" fill="#94A3B8" />
        {/* Body */}
        <rect x="52" y="21" width="12" height="34" fill="#FBBF24" />
        <rect x="56" y="21" width="4" height="34" fill="#F59E0B" />
        {/* Wood collar */}
        <polygon points="52,55 64,55 58,68" fill="#FED7AA" />
        {/* Lead */}
        <polygon points="56,64 60,64 58,68" fill="#334155" />
      </g>

      {/* Sparkles */}
      <path d="M78 18L80 23L85 25L80 27L78 32L76 27L71 25L76 23L78 18Z" fill="#F59E0B" />
      <circle cx="20" cy="22" r="3" fill="#60A5FA" />
      <circle cx="82" cy="74" r="2.5" fill="#34D399" />
    </svg>
  );
};
