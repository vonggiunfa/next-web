'use client';

import { ReactNode } from 'react';
import GridFloor from './GridFloor';
import StarsBackground from './StarsBackground';

interface CyberpunkLayoutProps {
  children: ReactNode;
}

/**
 * 赛博朋克风格的布局组件，包含星空背景和网格地板
 */
const CyberpunkLayout = ({ children }: CyberpunkLayoutProps) => {
  return (
    <div className="relative w-full min-h-screen bg-dark text-white">
      {/* 星空背景 */}
      <StarsBackground />

      {/* 网格地板 */}
      <GridFloor />

      {/* 内容区域 */}
      <main className="relative z-10 w-full h-full">
        {/* 搜索组件 - 改为流式布局 */}
        {/* <div className="flex justify-end w-full">
          <CyberSearchOptimized />
        </div> */}

        {children}
      </main>
    </div>
  );
};

export default CyberpunkLayout;
