import { Noto_Sans_SC } from 'next/font/google';

// 配置思源黑体（Google Fonts）- 带有备用方案
export const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
});

// CSS变量作为字体回退
export const fallbackVariable = '--font-fallback';
