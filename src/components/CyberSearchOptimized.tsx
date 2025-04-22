'use client';

import { useEffect, useRef, useState } from 'react';

const CyberSearchOptimized = () => {
  // 使用客户端检测，确保所有相关代码仅在客户端执行
  const [isMounted, setIsMounted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const effectsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 组件挂载后标记为已挂载，避免初始动画和闪现
  useEffect(() => {
    setIsMounted(true);
    // 添加一点延迟以确保所有状态和样式已正确应用
    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.opacity = '1';
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleFocus = () => {
    if (isMounted) {
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // 当焦点状态改变时，更新效果
  useEffect(() => {
    if (!effectsRef.current || !isMounted) return;
    effectsRef.current.style.opacity = isFocused ? '1' : '0';
  }, [isFocused, isMounted]);

  if (!isMounted) {
    // 服务端渲染或初始化阶段返回占位符
    return <div className="h-10 w-[200px] m-6"></div>;
  }

  return (
    <div className="m-6">
      <div
        ref={containerRef}
        className="relative opacity-0 transition-opacity duration-300"
      >
        {/* 搜索图标 */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 z-[1]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </div>

        {/* 输入框 - 增加圆角并修复初始化闪现问题 */}
        <input
          type="text"
          placeholder="Search..."
          className={`
            py-2 pl-10 pr-4 
            text-white font-sans outline-none w-[200px]
            transition-all duration-300 ease-in-out backdrop-blur-md
            rounded-md
            ${isFocused ? 'w-[250px]' : ''}
            ${
              isFocused
                ? 'shadow-[0_0_15px_rgba(220,220,250,0.5)]'
                : 'border-b border-gray-400'
            }
          `}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {/* 动态边框效果 - 仅在获得焦点时显示 */}
        {isFocused && (
          <div className="border-animation absolute inset-0 pointer-events-none rounded-md overflow-hidden">
            <div className="left-border"></div>
            <div className="top-border"></div>
            <div className="right-border"></div>
            <div className="bottom-border"></div>
          </div>
        )}

        {/* 波纹效果容器 */}
        <div ref={effectsRef} className="search-effects"></div>
      </div>

      {/* 内联样式 */}
      <style jsx>{`
        /* 波纹效果 */
        .search-effects {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .search-effects::before {
          content: '';
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          border: 1px solid rgba(220, 220, 240, 0.6);
          border-radius: 8px;
          animation: search-pulse 2s infinite;
          z-index: -1;
        }

        /* 边框动画样式 */
        .border-animation {
          z-index: 0;
          border-radius: 6px;
          overflow: hidden;
        }

        .left-border,
        .top-border,
        .right-border,
        .bottom-border {
          position: absolute;
          background-color: rgba(220, 220, 240, 0.8);
        }

        /* 左边框 - 从底部向上滑动 */
        .left-border {
          width: 1px;
          height: 0;
          left: 0;
          bottom: 0;
          animation: slideLeft 0.5s cubic-bezier(0.85, 0, 0.15, 1) forwards;
        }

        /* 上边框 - 从左向右滑动 */
        .top-border {
          height: 1px;
          width: 0;
          top: 0;
          left: 0;
          animation: slideTop 0.5s cubic-bezier(0.85, 0, 0.15, 1) forwards;
        }

        /* 右边框 - 从上向下滑动 */
        .right-border {
          width: 1px;
          height: 0;
          right: 0;
          top: 0;
          animation: slideRight 0.5s cubic-bezier(0.85, 0, 0.15, 1) forwards;
        }

        /* 下边框 - 已经存在，无需动画 */
        .bottom-border {
          height: 1px;
          width: 100%;
          bottom: 0;
          left: 0;
          background-color: rgba(220, 220, 240, 0.8);
        }

        /* 定义滑动动画 */
        @keyframes slideLeft {
          0% {
            height: 0;
          }
          100% {
            height: 100%;
          }
        }

        @keyframes slideTop {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes slideRight {
          0% {
            height: 0;
          }
          100% {
            height: 100%;
          }
        }

        @keyframes search-pulse {
          0% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0;
            transform: scale(1.05);
          }
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default CyberSearchOptimized;
