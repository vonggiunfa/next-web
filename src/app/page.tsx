'use client';

import CyberButton from '@/components/CyberButton';
import CyberLogo from '@/components/CyberLogo';
import CyberpunkLayout from '@/components/CyberpunkLayout';
import CyberSystemModules from '@/components/CyberSystemModules';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { data1, data2, data3, data4 } from './mock-data';

// 确保数据符合新的 SystemCard 类型
interface RawSystemCard {
  id: string;
  title: string;
  content: string;
  status: string;
  primaryAction: {
    label: string;
    command: string;
  };
  secondaryAction: {
    label: string;
    command: string;
  };
}

// 格式化数据为符合 SystemCard 类型的数据
const formatData = (data: RawSystemCard[]) => {
  return data.map((item) => ({
    id: item.id,
    title: item.title,
    // 使用 Emoji 作为默认图标，您可以根据实际需求调整
    icon: getIconForModule(item.id),
    // 为每个模块生成一个示例URL
    url: getUrlForModule(item.id),
  }));
};

// 根据模块ID获取合适的图标
const getIconForModule = (id: string): string => {
  // 不同模块类别使用不同的图标 - 使用SVG图标
  const category = id.split('-')[0];

  switch (category) {
    case '1':
      // 人事协同图标 - 用户/团队图标
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`;
    case '2':
      // 店铺销售图标 - 店铺图标
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;
    case '3':
      // 采购仓储图标 - 箱子图标
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`;
    case '4':
      // 数据中台图标 - 图表图标
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`;
    default:
      // 默认图标 - 链接图标
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`;
  }
};

// 生成模块URL
const getUrlForModule = (id: string): string => {
  // 为每个模块生成一个示例URL
  // 在实际应用中，这应该来自真实数据
  const baseUrl = 'https://example.com/app/';
  const category = id.split('-')[0];

  switch (category) {
    case '1':
      return `${baseUrl}hr/${id}`;
    case '2':
      return `${baseUrl}sales/${id}`;
    case '3':
      return `${baseUrl}procurement/${id}`;
    case '4':
      return `${baseUrl}data/${id}`;
    default:
      return `${baseUrl}${id}`;
  }
};

const tabs = [
  {
    id: 0,
    label: '人事協同',
    value: 'humanResources',
    data: formatData(data1),
  },
  { id: 1, label: '店舖銷售', value: 'sales', data: formatData(data2) },
  { id: 2, label: '採購倉儲', value: 'procurement', data: formatData(data3) },
  { id: 3, label: '數據中台', value: 'dataCenter', data: formatData(data4) },
];

// 定义logo组件动画
const logoVariants = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// 定义按钮组件的序列动画
const buttonVariants = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15, // 按钮依次出现
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// 定义折线动画
const lineVariants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
};

// 定义模块容器动画
const moduleContainerVariants = {
  hidden: {
    opacity: 0,
    x: 200,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Page = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [lineVisible, setLineVisible] = useState(false);
  const [linePath, setLinePath] = useState('');
  const [animationKey, setAnimationKey] = useState(0);

  // 动画状态控制 - 简化为一个完成状态
  const [initialAnimationsComplete, setInitialAnimationsComplete] =
    useState(false);
  // 首次加载标记
  const isFirstLoad = useRef(true);

  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const moduleRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 计数器，用于跟踪已完成的动画元素数量
  const animationCompletedCount = useRef(0);
  // 需要等待的总动画元素数
  const TOTAL_ANIMATION_ELEMENTS = 3; // Logo, 最后一个按钮, 模块容器

  // 处理动画完成
  const handleAnimationComplete = () => {
    animationCompletedCount.current += 1;

    // 当所有元素都完成动画时
    if (animationCompletedCount.current >= TOTAL_ANIMATION_ELEMENTS) {
      setInitialAnimationsComplete(true);
    }
  };

  // 处理模块点击
  const handleModuleClick = (moduleId: string) => {
    setActiveModuleId(moduleId);

    // 查找当前模块数据
    const moduleData = tabs[activeTabIndex].data.find(
      (item) => item.id === moduleId
    );

    // 如果找到模块数据且有URL，则打开对应的链接
    if (moduleData && moduleData.url) {
      // 延迟执行是为了给UI动画效果留出时间
      setTimeout(() => {
        // window.open(moduleData.url, '_blank');
      }, 800);
    }
  };

  // 使用useCallback缓存计算函数，避免不必要的重渲染
  const calculateLineCoordinates = useCallback(() => {
    const activeIndex = tabs.findIndex((tab) => tab.id === activeTabIndex);
    if (
      activeIndex === -1 ||
      !buttonRefs.current[activeIndex] ||
      !moduleRef.current ||
      !containerRef.current
    ) {
      setLineVisible(false);
      return;
    }

    // 获取容器的位置信息
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerTop = containerRect.top;

    // 获取按钮和模块的位置信息，计算相对于容器的位置
    const buttonRect = buttonRefs.current[activeIndex].getBoundingClientRect();
    const moduleRect = moduleRef.current.getBoundingClientRect();

    const buttonCenterX =
      buttonRect.left + buttonRect.width / 2 - containerRect.left;
    const buttonBottom = buttonRect.bottom - containerTop;

    const moduleCenterX =
      moduleRect.left + moduleRect.width / 2 - containerRect.left;
    const moduleTop = moduleRect.top - containerTop;

    // 计算斜线高度（确保形成45度角）
    const verticalDistance = Math.min((moduleTop - buttonBottom) * 0.3, 60);

    // 第一个斜线：从按钮底部开始的45度线
    const isRightDirection = moduleCenterX > buttonCenterX;
    const diagX1 =
      buttonCenterX + (isRightDirection ? verticalDistance : -verticalDistance);
    const diagY1 = buttonBottom + verticalDistance;

    // 第二个斜线：连接到模块顶部的45度线
    const diagX2 =
      moduleCenterX - (isRightDirection ? verticalDistance : -verticalDistance);

    // 构建完整的路径字符串
    const pathStr = `M${buttonCenterX},${buttonBottom} 
                    L${diagX1},${diagY1} 
                    L${diagX2},${diagY1} 
                    L${moduleCenterX},${moduleTop}`;

    setLinePath(pathStr);

    // 每次重新计算时，增加key值以触发动画重新播放
    setAnimationKey((prev) => prev + 1);
    setLineVisible(true);
  }, [activeTabIndex]);

  // 更新标签和模块，让连接线计算不阻塞UI更新
  const handleTabChange = (tabId: number) => {
    // 立即更新激活的标签页
    setActiveTabIndex(tabId);
    // 清除当前选中的模块
    setActiveModuleId(null);

    // 如果不是首次加载，立即计算折线
    if (!isFirstLoad.current) {
      // 在下一个渲染周期计算，确保DOM更新
      requestAnimationFrame(() => {
        calculateLineCoordinates();
      });
    }
  };

  // 初始动画完成后，计算折线位置
  useEffect(() => {
    if (initialAnimationsComplete && isFirstLoad.current) {
      // 首次加载完成后，设置标记为false
      isFirstLoad.current = false;

      // 使用setTimeout确保DOM完全更新
      const timer = setTimeout(() => {
        calculateLineCoordinates();
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [initialAnimationsComplete, calculateLineCoordinates]);

  // 处理窗口大小变化
  useEffect(() => {
    const handleResize = () => calculateLineCoordinates();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateLineCoordinates]);

  // 标签变化时更新折线
  useEffect(() => {
    // 如果不是首次加载，标签变化时立即计算折线
    if (!isFirstLoad.current) {
      // 稍微延迟以确保DOM更新
      requestAnimationFrame(() => {
        calculateLineCoordinates();
      });
    }
  }, [activeTabIndex, calculateLineCoordinates]);

  return (
    <CyberpunkLayout>
      <div
        ref={containerRef}
        className="flex flex-col relative min-h-screen overflow-hidden"
      >
        <div className="pt-12 pb-12 w-full">
          {/* Logo组件 - 直接执行动画 */}
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            onAnimationComplete={handleAnimationComplete}
          >
            <CyberLogo />
          </motion.div>

          {/* 标签按钮区域 - 直接执行动画，不等待Logo */}
          <div className="flex justify-evenly items-center mt-24 relative">
            {tabs.map((tab, index) => (
              <motion.div
                key={tab.value}
                ref={(el: HTMLDivElement | null) => {
                  buttonRefs.current[index] = el;
                }}
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                onAnimationComplete={() => {
                  // 只有最后一个按钮完成时才增加计数
                  if (index === tabs.length - 1) {
                    handleAnimationComplete();
                  }
                }}
              >
                <CyberButton
                  className="mb-2"
                  isActive={activeTabIndex === tab.id}
                  onClick={() => handleTabChange(tab.id)}
                >
                  {tab.label}
                </CyberButton>
              </motion.div>
            ))}
          </div>

          {/* 连接折线 SVG - 首次加载等待动画完成，之后立即显示 */}
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ overflow: 'visible' }}
          >
            {lineVisible && (
              <motion.path
                key={animationKey}
                d={linePath}
                fill="none"
                stroke="rgba(255, 255, 255, 0.8)"
                strokeWidth="1"
                className="line-path"
                variants={lineVariants}
                initial="hidden"
                animate="visible"
              />
            )}
          </svg>

          {/* 模块容器 - 直接执行动画，不等待其他元素 */}
          <motion.div
            ref={moduleRef}
            className="flex justify-center items-center mt-24"
            variants={moduleContainerVariants}
            initial="hidden"
            animate="visible"
            onAnimationComplete={handleAnimationComplete}
          >
            {/* 模块容器 */}
            <AnimatePresence
              mode="popLayout"
              initial={false}
              presenceAffectsLayout={false}
            >
              <motion.div
                key={activeTabIndex}
                layoutId="module-container"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 1,
                  type: 'spring',
                  stiffness: 400,
                  damping: 35,
                }}
                className="system-module-container w-full"
                onAnimationComplete={handleAnimationComplete}
              >
                <CyberSystemModules
                  title={tabs[activeTabIndex].label}
                  data={tabs[activeTabIndex].data}
                  activeModule={activeModuleId}
                  onModuleClick={handleModuleClick}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* 添加自定义动画 */}
      <style jsx global>{`
        .line-path {
          stroke-linecap: round;
          stroke-linejoin: round;
        }
      `}</style>
    </CyberpunkLayout>
  );
};

export default Page;
