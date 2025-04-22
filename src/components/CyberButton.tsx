'use client';

import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface CyberButtonProps {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
  icon?: string;
}

const CyberButton = ({
  children,
  className = '',
  isActive = false,
  onClick,
  icon,
}: CyberButtonProps) => {
  const [showGlitch, setShowGlitch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const glitchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const glitchPositionRef = useRef(Math.floor(Math.random() * 100));
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkMobileView();

    window.addEventListener('resize', checkMobileView);

    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, []);

  useEffect(() => {
    if (glitchTimeoutRef.current) {
      clearTimeout(glitchTimeoutRef.current);
    }

    if (isActive) {
      glitchPositionRef.current = Math.floor(Math.random() * 100);

      setShowGlitch(true);

      glitchTimeoutRef.current = setTimeout(() => {
        setShowGlitch(false);
      }, 800);
    } else {
      setShowGlitch(false);
    }

    return () => {
      if (glitchTimeoutRef.current) {
        clearTimeout(glitchTimeoutRef.current);
      }
    };
  }, [isActive]);

  const renderIcon = () => {
    if (!icon) return null;
    return (
      <span
        className="inline-block"
        dangerouslySetInnerHTML={{ __html: icon }}
      />
    );
  };

  return (
    <button
      className={twMerge(
        'relative cursor-pointer',
        isMobileView ? 'py-2 px-2' : 'py-4 px-8',
        'text-[1.2rem] uppercase',
        'border border-white/30 font-black transition-all duration-300',
        'transform-gpu overflow-hidden bg-black/40 backdrop-blur-sm',
        'hover:border-white/50 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]',
        isActive &&
          'border-white/80 shadow-[0_0_15px_rgba(255,255,255,0.5)] -skew-x-2 scale-[1.03]',
        isHovered && !isActive && 'shadow-[0_0_8px_rgba(255,255,255,0.2)]',
        className
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={typeof children === 'string' ? children.toString() : 'Button'}
    >
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_97%,rgba(255,255,255,0.15)_100%)] bg-[length:100%_3px] opacity-20 pointer-events-none" />

      <div className="absolute inset-0 mix-blend-overlay opacity-5 bg-noise pointer-events-none" />

      <div
        className={twMerge(
          'absolute w-[calc(100%-30px)] h-[calc(100%-20px)] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'border-t border-b border-white/40 transition-all duration-300',
          isMobileView
            ? 'w-[calc(100%-10px)] h-[calc(100%-8px)]'
            : 'w-[calc(100%-30px)] h-[calc(100%-20px)]',
          isActive && 'w-[calc(100%+10px)] h-[calc(100%+5px)] border-white/60'
        )}
      />

      <div
        className={twMerge(
          'absolute w-[calc(100%-20px)] h-[calc(100%-30px)] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'border-l border-r border-white/40 transition-all duration-300',
          isMobileView
            ? 'w-[calc(100%-8px)] h-[calc(100%-10px)]'
            : 'w-[calc(100%-20px)] h-[calc(100%-30px)]',
          isActive && 'w-[calc(100%+5px)] h-[calc(100%+10px)] border-white/60'
        )}
      />

      {isActive && (
        <>
          <div
            className={twMerge(
              'absolute top-0 left-0 border-t-2 border-l-2 border-white/80 animate-corner-appear',
              isMobileView ? 'w-2 h-2' : 'w-3 h-3'
            )}
          ></div>
          <div
            className={twMerge(
              'absolute top-0 right-0 border-t-2 border-r-2 border-white/80 animate-corner-appear',
              isMobileView ? 'w-2 h-2' : 'w-3 h-3'
            )}
          ></div>
          <div
            className={twMerge(
              'absolute bottom-0 left-0 border-b-2 border-l-2 border-white/80 animate-corner-appear',
              isMobileView ? 'w-2 h-2' : 'w-3 h-3'
            )}
          ></div>
          <div
            className={twMerge(
              'absolute bottom-0 right-0 border-b-2 border-r-2 border-white/80 animate-corner-appear',
              isMobileView ? 'w-2 h-2' : 'w-3 h-3'
            )}
          ></div>
        </>
      )}

      {isActive && (
        <div className="absolute inset-0 z-[-1] bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.07)_50%,transparent_75%)] animate-sweep opacity-70"></div>
      )}

      {showGlitch && (
        <>
          <div className="absolute top-[30%] left-0 w-full h-[1px] bg-white/70 z-[4] animate-h-glitch-once"></div>
          <div
            className="absolute left-0 top-0 w-[1px] h-full bg-white/70 z-[4] animate-v-glitch-once"
            style={{ left: `${glitchPositionRef.current}%` }}
          ></div>
        </>
      )}

      <span
        className={twMerge(
          'relative inline-block',
          isMobileView ? 'px-1 text-base' : 'px-2 text-lg',
          isActive
            ? 'text-white font-bold tracking-wider'
            : 'text-white/90 tracking-wide',
          showGlitch && 'title-glitch-once',
          'transition-all duration-300'
        )}
        data-content={typeof children === 'string' ? children : undefined}
      >
        {isMobileView ? renderIcon() : children}
      </span>

      <style jsx global>{`
        @keyframes sweep {
          0% {
            background-position: -50% -50%;
          }
          100% {
            background-position: 150% 150%;
          }
        }

        .animate-sweep {
          animation: sweep 1.5s ease-out;
          background-size: 200% 200%;
        }

        @keyframes corner-appear {
          0% {
            width: 0;
            height: 0;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            width: 12px;
            height: 12px;
            opacity: 1;
          }
        }

        .animate-corner-appear {
          animation: corner-appear 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes h-glitch-once {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          20%,
          80% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .animate-h-glitch-once {
          animation: h-glitch-once 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes v-glitch-once {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          20%,
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }

        .animate-v-glitch-once {
          animation: v-glitch-once 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .title-glitch-once {
          position: relative;
          animation: textShift 0.5s ease-out forwards;
        }

        .title-glitch-once::before {
          content: attr(data-content);
          position: absolute;
          top: 0;
          left: 1px;
          height: 0;
          color: rgba(255, 255, 255, 0.9);
          overflow: hidden;
          z-index: 2;
          animation: whiteShadow 0.5s ease-out forwards;
          text-shadow: 1px 0 0 rgba(255, 255, 255, 0.8);
        }

        .title-glitch-once::after {
          content: attr(data-content);
          position: absolute;
          top: 0;
          left: -1px;
          height: 0;
          color: rgba(255, 255, 255, 0.8);
          overflow: hidden;
          z-index: 3;
          animation: whiteHeight 0.6s ease-out forwards;
          text-shadow: -1px 0 0 rgba(255, 255, 255, 0.8);
        }

        @keyframes textShift {
          0% {
            transform: translateX(0);
          }
          10% {
            transform: translateX(-2px);
          }
          20% {
            transform: translateX(2px);
          }
          30% {
            transform: translateX(-1px);
          }
          40% {
            transform: translateX(1px);
          }
          50% {
            transform: translateX(-1px);
          }
          60% {
            transform: translateX(1px);
          }
          70% {
            transform: translateX(-1px);
          }
          80% {
            transform: translateX(0px);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes whiteShadow {
          0% {
            height: 0;
            opacity: 0;
          }
          20% {
            height: 100%;
            opacity: 1;
          }
          40% {
            height: 30%;
            opacity: 1;
          }
          60% {
            height: 100%;
            opacity: 0.5;
          }
          80% {
            height: 30%;
            opacity: 0.2;
          }
          100% {
            height: 0;
            opacity: 0;
          }
        }

        @keyframes whiteHeight {
          0% {
            height: 0;
            opacity: 0;
          }
          20% {
            height: 30%;
            opacity: 1;
          }
          40% {
            height: 60%;
            opacity: 1;
          }
          60% {
            height: 100%;
            opacity: 0.5;
          }
          80% {
            height: 50%;
            opacity: 0.2;
          }
          100% {
            height: 0;
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
};

export default CyberButton;
