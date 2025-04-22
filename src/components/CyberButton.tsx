'use client';

import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface CyberButtonProps {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const CyberButton = ({
  children,
  className = '',
  isActive = false,
  onClick,
}: CyberButtonProps) => {
  const [showGlitch, setShowGlitch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const glitchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const glitchPositionRef = useRef(Math.floor(Math.random() * 100));

  // 当 isActive 变化时处理故障效果
  useEffect(() => {
    // 立即清除之前的任何动画状态
    if (glitchTimeoutRef.current) {
      clearTimeout(glitchTimeoutRef.current);
    }

    if (isActive) {
      // 更新随机位置
      glitchPositionRef.current = Math.floor(Math.random() * 100);

      // 激活故障效果
      setShowGlitch(true);

      // 设置定时器，800ms 后隐藏故障效果
      glitchTimeoutRef.current = setTimeout(() => {
        setShowGlitch(false);
      }, 800);
    } else {
      // 确保非激活状态下故障效果被关闭
      setShowGlitch(false);
    }

    return () => {
      if (glitchTimeoutRef.current) {
        clearTimeout(glitchTimeoutRef.current);
      }
    };
  }, [isActive]);

  return (
    <button
      className={twMerge(
        'relative cursor-pointer py-4 px-8',
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
    >
      {/* 扫描线效果 - 更加微妙 */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_97%,rgba(255,255,255,0.15)_100%)] bg-[length:100%_3px] opacity-20 pointer-events-none" />

      {/* 噪点纹理 */}
      <div className="absolute inset-0 mix-blend-overlay opacity-5 bg-noise pointer-events-none" />

      {/* 边框效果 - 水平 */}
      <div
        className={twMerge(
          'absolute w-[calc(100%-30px)] h-[calc(100%-20px)] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'border-t border-b border-white/40 transition-all duration-300',
          isActive && 'w-[calc(100%+10px)] h-[calc(100%+5px)] border-white/60'
        )}
      />

      {/* 边框效果 - 垂直 */}
      <div
        className={twMerge(
          'absolute w-[calc(100%-20px)] h-[calc(100%-30px)] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'border-l border-r border-white/40 transition-all duration-300',
          isActive && 'w-[calc(100%+5px)] h-[calc(100%+10px)] border-white/60'
        )}
      />

      {/* 角落装饰 - 只在激活状态下显示 */}
      {isActive && (
        <>
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/80 animate-corner-appear"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/80 animate-corner-appear"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/80 animate-corner-appear"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/80 animate-corner-appear"></div>
        </>
      )}

      {/* 背景效果 - 激活时显示，简化为单一动画 */}
      {isActive && (
        <div className="absolute inset-0 z-[-1] bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.07)_50%,transparent_75%)] animate-sweep opacity-70"></div>
      )}

      {/* 故障效果 - 简化且不使用无限动画，避免卡顿 */}
      {showGlitch && (
        <>
          <div className="absolute top-[30%] left-0 w-full h-[1px] bg-white/70 z-[4] animate-h-glitch-once"></div>
          <div
            className="absolute left-0 top-0 w-[1px] h-full bg-white/70 z-[4] animate-v-glitch-once"
            style={{ left: `${glitchPositionRef.current}%` }}
          ></div>
        </>
      )}

      {/* 按钮文本 */}
      <span
        className={twMerge(
          'relative px-2 inline-block text-lg',
          isActive
            ? 'text-white font-bold tracking-wider'
            : 'text-white/90 tracking-wide',
          showGlitch && 'title-glitch-once',
          'transition-all duration-300'
        )}
        data-content={typeof children === 'string' ? children : undefined}
      >
        {children}
      </span>

      {/* 添加全局动画样式 */}
      <style jsx global>{`
        /* 简化的扫描效果 */
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

        /* 边角出现动画 */
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

        /* 单次执行的水平故障效果 */
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

        /* 单次执行的垂直故障效果 */
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

        /* 噪点纹理 */
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        /* 文字故障效果 - 单次执行版本 */
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
          0%,
          100% {
            transform: translateX(0);
          }
          15% {
            transform: translateX(-2px) skewX(10deg);
          }
          30% {
            transform: translateX(2px) skewX(-5deg);
          }
          45% {
            transform: translateX(-1px);
          }
          60% {
            transform: translateX(1px);
          }
          75% {
            transform: translateX(0);
          }
        }

        @keyframes whiteShadow {
          0% {
            height: 0;
          }
          30% {
            height: 100%;
          }
          70% {
            height: 30%;
          }
          100% {
            height: 0;
          }
        }

        @keyframes whiteHeight {
          0% {
            height: 0;
          }
          40% {
            height: 80%;
          }
          60% {
            height: 40%;
          }
          80% {
            height: 20%;
          }
          100% {
            height: 0;
          }
        }
      `}</style>
    </button>
  );
};

export default CyberButton;
