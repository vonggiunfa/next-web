'use client';

import { useEffect, useState } from 'react';

const CyberLogo = () => {
  // 使用状态管理组件是否已加载
  const [isClient, setIsClient] = useState(false);

  // 组件挂载后设置客户端状态
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 在客户端渲染之前不渲染任何内容
  if (!isClient) {
    return null;
  }

  return (
    <div className="logo-container pointer-events-none">
      <div className="logo-cc">CC</div>
      <div className="logo-text">Chester Charles</div>
      <div className="logo-glow"></div>

      <style jsx>{`
        /* Logo 样式 */
        .logo-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 2rem;
          perspective: 1000px;
          transform-style: preserve-3d;
          animation: float 4s ease-in-out infinite;
          max-height: 160px;
          width: 100%;
          z-index: 1; /* 降低z-index确保不覆盖其他组件 */
          animation: fade-in 0.6s ease-out forwards;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .logo-cc {
          font-size: 5rem;
          font-weight: 900;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.95),
            rgba(139, 255, 235, 0.95)
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 15px rgba(220, 220, 240, 0.8),
            0 0 20px rgba(139, 255, 235, 0.7);
          letter-spacing: 5px;
          position: relative;
          z-index: 2;
          margin-bottom: 0.8rem;
          transform: translateY(-8px);
        }

        .logo-text {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          color: transparent;
          background: linear-gradient(90deg, white, #d0d0d0);
          -webkit-background-clip: text;
          background-clip: text;
          text-transform: uppercase;
          letter-spacing: 10px;
          position: relative;
          z-index: 1;
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.7),
            0 0 16px rgba(200, 200, 240, 0.6);
        }

        .logo-text::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.8),
            transparent
          );
          bottom: -10px;
          left: 0;
          transform: scaleX(0);
          transform-origin: left;
          animation: logo-line-bottom 4s ease-in-out infinite;
        }

        .logo-text::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.8),
            transparent
          );
          top: -10px;
          left: 0;
          transform: scaleX(0);
          transform-origin: right;
          animation: logo-line-top 4s ease-in-out infinite;
        }

        .logo-glow {
          position: absolute;
          width: 350px;
          height: 350px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.35),
            rgba(139, 255, 235, 0.15) 50%,
            transparent 80%
          );
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          filter: blur(25px);
          z-index: 0;
          animation: glow-float 4s ease-in-out infinite;
        }

        @keyframes logo-line-bottom {
          0% {
            transform: scaleX(0);
            transform-origin: left;
          }
          50% {
            transform: scaleX(1);
            transform-origin: left;
          }
          50.1% {
            transform: scaleX(1);
            transform-origin: right;
          }
          100% {
            transform: scaleX(0);
            transform-origin: right;
          }
        }

        @keyframes logo-line-top {
          0% {
            transform: scaleX(0);
            transform-origin: right;
          }
          50% {
            transform: scaleX(1);
            transform-origin: right;
          }
          50.1% {
            transform: scaleX(1);
            transform-origin: left;
          }
          100% {
            transform: scaleX(0);
            transform-origin: left;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotateY(0);
          }
          50% {
            transform: translateY(-10px) rotateY(2deg);
          }
        }

        @keyframes glow-float {
          0%,
          100% {
            opacity: 0.65;
            transform: translate(-50%, -50%) scale(0.9);
          }
          50% {
            opacity: 0.85;
            transform: translate(-50%, -60%) scale(1.1);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.65;
            transform: translate(-50%, -50%) scale(0.9);
          }
          50% {
            opacity: 0.85;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        /* 保留动画定义，但不再应用到元素上 */
        @keyframes flicker {
          0%,
          19.999%,
          22%,
          62.999%,
          64%,
          64.999%,
          70%,
          100% {
            opacity: 1;
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.7),
              0 0 12px rgba(139, 255, 235, 0.6);
          }
          20%,
          21.999%,
          63%,
          63.999%,
          65%,
          69.999% {
            opacity: 0.8;
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.4);
          }
        }
      `}</style>
    </div>
  );
};

export default CyberLogo;
