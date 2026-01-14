/**
 * Liquid Glass Dynamic Highlight Effect
 * 动态光影高光效果 - 鼠标跟随光晕
 */
(function() {
  'use strict';

  // 需要应用光影效果的元素选择器
  const SELECTORS = [
    'header#header-desktop',
    '#toc-auto',
    '#toc-dialog',
    '.search-dropdown .dropdown-menu',
    '.admonition',
    '.highlight'
  ].join(', ');

  // 配置
  const CONFIG = {
    highlightSize: 400,      // 光晕大小 (px)
    highlightOpacity: 0.15,  // 光晕透明度
    transitionSpeed: 150     // 过渡速度 (ms)
  };

  /**
   * 初始化光影效果
   */
  function init() {
    // 使用事件委托，监听整个文档
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
  }

  /**
   * 鼠标移动处理
   */
  function handleMouseMove(e) {
    const elements = document.querySelectorAll(SELECTORS);
    
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      
      // 检查鼠标是否在元素范围内或附近
      const isNear = (
        e.clientX >= rect.left - 100 &&
        e.clientX <= rect.right + 100 &&
        e.clientY >= rect.top - 100 &&
        e.clientY <= rect.bottom + 100
      );

      if (isNear) {
        // 计算相对位置
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // 应用光晕效果
        el.style.setProperty('--highlight-x', `${x}px`);
        el.style.setProperty('--highlight-y', `${y}px`);
        el.style.setProperty('--highlight-opacity', CONFIG.highlightOpacity);
      } else {
        // 淡出效果
        el.style.setProperty('--highlight-opacity', '0');
      }
    });
  }

  /**
   * 鼠标离开文档
   */
  function handleMouseLeave() {
    const elements = document.querySelectorAll(SELECTORS);
    elements.forEach(el => {
      el.style.setProperty('--highlight-opacity', '0');
    });
  }

  // DOM 加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
