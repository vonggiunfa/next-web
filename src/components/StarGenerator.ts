interface StarConfig {
  count?: number;
  minSize?: number;
  maxSize?: number;
  container: HTMLElement | null;
}

/**
 * 生成星空背景的工具函数
 */
export const generateStars = ({
  count = 200,
  minSize = 0.5,
  maxSize = 3,
  container,
}: StarConfig) => {
  if (!container) return;

  // 清空已有的星星，防止重复渲染
  container.innerHTML = '';

  // 生成随机星星
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');

    // 随机位置
    const left = Math.random() * 100;
    const top = Math.random() * 100;

    // 随机大小
    const size = minSize + Math.random() * (maxSize - minSize);

    // 随机动画延迟
    const delay = Math.random() * 5;

    star.style.position = 'absolute';
    star.style.backgroundColor = 'white';
    star.style.borderRadius = '50%';
    star.style.left = `${left}%`;
    star.style.top = `${top}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animation = 'twinkle 3s infinite alternate';
    star.style.animationDelay = `${delay}s`;

    container.appendChild(star);
  }
};
