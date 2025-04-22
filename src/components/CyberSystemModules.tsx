'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import '../styles/cyberpunk-modules.css';

// 简化卡片数据，只包含ID、标题、图标和网址
export interface SystemCard {
  id: string;
  title: string;
  icon: string; // 图标名称或代码点
  url: string; // 对应的网址
}

// 添加卡片序列动画变体
const cardVariants = {
  hidden: {
    opacity: 0,
  },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: 0.1 + i * 0.12, // 每张卡片间隔0.08秒出现，整体延迟0.1秒开始
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// 高级图标渲染组件
const CyberIcon = ({
  icon,
  isActive,
  isHologram,
}: {
  icon: string;
  isActive: boolean;
  isHologram: boolean;
}) => {
  return (
    <div
      className={`
        relative w-20 h-20 mr-5 flex items-center justify-center
        ${isHologram ? 'hologram-icon' : ''}
        overflow-visible group
      `}
    >
      {/* 科技感背景 - 六边形或圆形光晕 */}
      <div className="absolute inset-0 cyber-hexagon"></div>

      {/* 旋转光环 */}
      <div className="absolute inset-[-5px] cyber-orbital-ring"></div>
      <div className="absolute inset-[-10px] cyber-orbital-ring-reverse"></div>

      {/* 粒子效果容器 */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <div className="cyber-particles"></div>
      </div>

      {/* 图标主体内容 - 支持SVG图标 */}
      <div
        className={`
          relative z-10 transform transition-all duration-300
          ${isActive ? 'scale-110 text-white' : 'text-white/90'}
          cyber-icon-shadow group-hover:scale-110 w-12 h-12 flex items-center justify-center
        `}
      >
        {icon.startsWith('<svg') ? (
          <div
            className="w-full h-full flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: icon }}
          />
        ) : (
          <span className="text-3xl">{icon}</span>
        )}

        {/* 图标激活时的光晕效果 - 修复居中问题 */}
        {isActive && (
          <div className="absolute top-1/2 left-1/2 inset-0 w-full h-full cyber-glow animate-pulse-slow"></div>
        )}
      </div>

      {/* 悬停/激活时的科技感交互效果 */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="cyber-scan-line"></div>
      </div>

      {/* 图标周围的装饰性数据线 */}
      <div className="absolute -right-2 top-1/2 w-4 h-[1px] bg-white/40 cyber-data-line"></div>
      <div className="absolute -left-2 top-1/2 w-4 h-[1px] bg-white/40 cyber-data-line-reverse"></div>
      <div className="absolute -bottom-2 left-1/2 h-4 w-[1px] bg-white/40 cyber-data-line-vertical"></div>

      {/* 交互提示点 */}
      <div
        className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
          isActive ? 'bg-white' : 'bg-white/50'
        } cyber-pulse`}
      ></div>
    </div>
  );
};

const CyberSystemModules = ({
  title,
  data,
  activeModule,
  onModuleClick,
}: {
  title: string;
  data: SystemCard[];
  activeModule?: string | null;
  onModuleClick?: (card: SystemCard) => void;
}) => {
  // 状态管理
  const [glitchingCards, setGlitchingCards] = useState<Record<string, boolean>>(
    {}
  );
  const [hologramCards, setHologramCards] = useState<Record<string, boolean>>(
    {}
  );
  const [isInitialized, setIsInitialized] = useState(false);

  // 引用
  const timeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // 初始化动画
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [data]);

  // 随机故障效果
  useEffect(() => {
    if (!data || data.length === 0 || !isInitialized) return;

    const triggerRandomGlitch = () => {
      const randomCardIndex = Math.floor(Math.random() * data.length);
      const randomCardId = data[randomCardIndex]?.id;

      if (randomCardId) {
        // 清除之前的计时器
        if (timeoutsRef.current[randomCardId]) {
          clearTimeout(timeoutsRef.current[randomCardId]);
        }

        setGlitchingCards((prev) => ({ ...prev, [randomCardId]: true }));

        // 短暂故障后恢复
        timeoutsRef.current[randomCardId] = setTimeout(() => {
          setGlitchingCards((prev) => ({ ...prev, [randomCardId]: false }));
        }, 800);
      }
    };

    // 设置随机故障触发器
    const glitchInterval = setInterval(triggerRandomGlitch, 6000);

    return () => {
      clearInterval(glitchInterval);
      Object.values(timeoutsRef.current).forEach(clearTimeout);
    };
  }, [data, isInitialized]);

  // 处理卡片点击，对外传递模块点击事件
  const handleCardClick = useCallback(
    (card: SystemCard) => {
      const cardId = card.id;

      if (onModuleClick) {
        onModuleClick(card);
      }

      // 触发卡片故障
      setGlitchingCards((prev) => ({ ...prev, [cardId]: true }));

      // 激活全息效果
      setHologramCards((prev) => ({ ...prev, [cardId]: true }));

      // 清除之前的计时器
      if (timeoutsRef.current[cardId]) {
        clearTimeout(timeoutsRef.current[cardId]);
      }

      // 设置恢复计时器
      timeoutsRef.current[cardId] = setTimeout(() => {
        setGlitchingCards((prev) => ({ ...prev, [cardId]: false }));
        // 全息效果保持到选中状态改变
      }, 800);
    },
    [onModuleClick]
  );

  // 当激活的模块变化时，更新全息效果
  useEffect(() => {
    // 重置全部全息效果
    const newHologramState: Record<string, boolean> = {};

    // 只有激活的模块有全息效果
    if (activeModule) {
      newHologramState[activeModule] = true;
    }

    setHologramCards(newHologramState);
  }, [activeModule]);

  if (!data || data.length === 0) {
    return null;
  }

  // 修复ref回调函数，确保类型正确
  const setCardRef = (cardId: string) => (el: HTMLDivElement | null) => {
    cardRefs.current[cardId] = el;
  };

  return (
    <motion.div
      className="relative w-full max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* 背景网格 - 修改为更浅的白色系风格 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 pointer-events-none" />

      {/* 系统模块头部 */}
      <div className="relative w-full mb-8">
        {/* 模块标题 - 使用白色而非青色 */}
        <h2
          className="cyber-glitch relative text-center text-3xl font-bold tracking-wider uppercase mb-2"
          data-text={title}
        >
          <span className="relative inline-block px-6 py-2 text-white">
            {title}
            <span className="absolute bottom-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"></span>
          </span>
        </h2>

        {/* 动态装饰线 - 修改为白色系 */}
        <div className="flex justify-center items-center space-x-2 mt-3">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-white/70"></div>
          <div className="relative w-3 h-3 flex justify-center items-center">
            <div className="w-1 h-1 bg-white/80"></div>
          </div>
          <div className="w-32 h-[1px] bg-gradient-to-r from-white/70 to-white/70"></div>
          <div className="relative w-3 h-3 flex justify-center items-center">
            <div className="w-1 h-1 bg-white/80"></div>
          </div>
          <div className="w-16 h-[1px] bg-gradient-to-r from-white/70 to-transparent"></div>
        </div>
      </div>

      {/* 模块卡片垂直列表 */}
      <div className="flex flex-col gap-6 px-4">
        {data.map((card, index) => {
          const isActive = activeModule === card.id;
          const isHologram = hologramCards[card.id] || false;

          return (
            <motion.div
              key={card.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className={`
                relative p-5 h-auto min-h-24 flex items-center
                bg-black/40 backdrop-blur-sm border border-white/30
                hover:border-white/60 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]
                hover:-translate-y-1 cursor-pointer transform-gpu transition-all duration-300
                ${
                  isActive
                    ? 'border-white/80 shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                    : ''
                }
                ${glitchingCards[card.id] ? 'cyber-glitch-active' : ''}
                ${isHologram ? 'hologram-active' : ''}
              `}
              onClick={() => handleCardClick(card)}
              ref={setCardRef(card.id)}
              data-text={card.title}
            >
              {/* 扫描线效果 */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_97%,rgba(255,255,255,0.15)_100%)] bg-[length:100%_3px] opacity-20 pointer-events-none" />

              {/* 全息投影效果 - 当卡片激活时显示 */}
              {isHologram && (
                <>
                  <div className="absolute inset-0 cyber-hologram animate-hologram"></div>
                  <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="cyber-rain"></div>
                  </div>
                  {/* 全息投影噪点效果 */}
                  <div className="absolute inset-0 hologram-noise"></div>
                </>
              )}

              {/* 角落装饰 - 增强选中效果 */}
              <div
                className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${
                  isActive ? 'border-white' : 'border-white/30'
                } transition-colors duration-300`}
              ></div>
              <div
                className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${
                  isActive ? 'border-white' : 'border-white/30'
                } transition-colors duration-300`}
              ></div>
              <div
                className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${
                  isActive ? 'border-white' : 'border-white/30'
                } transition-colors duration-300`}
              ></div>
              <div
                className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${
                  isActive ? 'border-white' : 'border-white/30'
                } transition-colors duration-300`}
              ></div>

              {/* 卡片内容 - 改进的布局 */}
              <div className="flex items-center w-full">
                {/* 图标区域 - 使用CyberIcon组件 */}
                <CyberIcon
                  icon={card.icon}
                  isActive={isActive}
                  isHologram={isHologram}
                />

                {/* 标题和URL - 右侧内容区 */}
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center justify-between">
                    <span
                      className={`
                        uppercase tracking-wider font-bold text-white text-lg 
                        ${
                          glitchingCards[card.id]
                            ? 'cyber-glitch cyber-glitch-active'
                            : ''
                        }
                      `}
                      data-text={card.title}
                    >
                      {card.title}
                    </span>

                    {/* 右上角装饰性标签 */}
                    <div className="bg-white/10 backdrop-blur-sm px-2 py-0.5 text-xs text-white/70 border border-white/20 rounded">
                      ID: {card.id}
                    </div>
                  </div>

                  {/* 水平分割线 */}
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent my-2"></div>

                  {/* 网址 */}
                  <div className="flex items-center">
                    <div className="text-white/60 bg-white/5 backdrop-blur-sm border border-white/10 px-2 py-1 rounded text-xs w-full">
                      <span className="mr-1 text-white/70">●</span>
                      <span className="truncate cyber-link">{card.url}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 全息投影和故障特效的样式 */}
      <style jsx global>{`
        /* 全息投影主效果 */
        .hologram-active {
          border-color: rgba(255, 255, 255, 0.7) !important;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.4),
            inset 0 0 15px rgba(255, 255, 255, 0.2) !important;
          transform: translateY(-5px) !important;
          z-index: 10;
        }

        /* 全息图标效果 */
        .hologram-icon {
          animation: float 3s ease-in-out infinite;
        }

        /* 图标阴影效果 */
        .cyber-icon-shadow {
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))
            drop-shadow(0 0 12px rgba(0, 153, 255, 0.5));
        }

        /* 图标光晕效果 */
        .cyber-glow {
          background: radial-gradient(
            circle,
            rgba(0, 195, 255, 0.4) 0%,
            rgba(0, 153, 255, 0.1) 50%,
            transparent 70%
          );
          filter: blur(4px);
        }

        /* 六边形背景 */
        .cyber-hexagon {
          clip-path: polygon(
            50% 0%,
            93% 25%,
            93% 75%,
            50% 100%,
            7% 75%,
            7% 25%
          );
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.4) 0%,
            rgba(33, 107, 165, 0.15) 100%
          );
          transform: scale(0.85);
          transition: transform 0.3s ease;
        }

        div:hover .cyber-hexagon {
          transform: scale(0.95) rotate(30deg);
        }

        /* 旋转光环 */
        .cyber-orbital-ring {
          border: 1px dashed rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: spin 12s linear infinite;
        }

        .cyber-orbital-ring-reverse {
          border: 1px dashed rgba(67, 155, 255, 0.2);
          border-radius: 50%;
          animation: spin 20s linear infinite reverse;
        }

        /* 粒子效果 */
        .cyber-particles {
          background-image: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.3) 1px,
            transparent 1px
          );
          background-size: 10px 10px;
          width: 200%;
          height: 200%;
          left: -50%;
          top: -50%;
          position: absolute;
          animation: particle-move 8s infinite linear;
        }

        /* 扫描线效果 */
        .cyber-scan-line {
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 153, 255, 0.05) 50%,
            transparent 100%
          );
          background-size: 100% 8px;
          animation: scan-line 2s infinite linear;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        div:hover .cyber-scan-line {
          opacity: 1;
        }

        /* 数据线动画 */
        .cyber-data-line {
          animation: data-flow 3s infinite linear;
          opacity: 0.6;
        }

        .cyber-data-line-reverse {
          animation: data-flow 3s infinite linear reverse;
          opacity: 0.6;
        }

        .cyber-data-line-vertical {
          animation: data-flow-vertical 4s infinite linear;
          opacity: 0.6;
        }

        /* 脉冲点 */
        .cyber-pulse {
          box-shadow: 0 0 5px currentColor;
          animation: pulse 2s infinite ease-in-out;
        }

        /* 动画定义 */
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes particle-move {
          0% {
            transform: translateY(0) translateX(0);
          }
          100% {
            transform: translateY(-50px) translateX(50px);
          }
        }

        @keyframes scan-line {
          0% {
            background-position: 0 -100%;
          }
          100% {
            background-position: 0 200%;
          }
        }

        @keyframes data-flow {
          0% {
            opacity: 0;
            transform: scaleX(0);
            transform-origin: left;
          }
          50% {
            opacity: 0.8;
            transform: scaleX(1);
          }
          100% {
            opacity: 0;
            transform: scaleX(0);
            transform-origin: right;
          }
        }

        @keyframes data-flow-vertical {
          0% {
            opacity: 0;
            transform: scaleY(0);
            transform-origin: bottom;
          }
          50% {
            opacity: 0.8;
            transform: scaleY(1);
          }
          100% {
            opacity: 0;
            transform: scaleY(0);
            transform-origin: top;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.5);
            opacity: 1;
          }
        }

        .animate-pulse-slow {
          animation: pulse 3s infinite ease-in-out;
        }

        /* 全息底层效果 */
        .cyber-hologram {
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 40%,
            transparent 70%
          );
          opacity: 0.6;
          mix-blend-mode: screen;
          pointer-events: none;
        }

        /* 全息噪点效果 */
        .hologram-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.07;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        /* 链接样式 */
        .cyber-link {
          position: relative;
          display: inline-block;
          color: rgba(255, 255, 255, 0.8);
        }

        .cyber-link::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          bottom: -2px;
          left: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.6),
            transparent
          );
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.3s ease;
        }

        div:hover .cyber-link::after {
          transform: scaleX(1);
        }
      `}</style>
    </motion.div>
  );
};

export default CyberSystemModules;
