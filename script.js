/**
 * Transformer 介紹網頁互動與滾動連動腳本
 * 作者：白羽墨影 (jerry880904)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. 固定式目錄高亮邏輯 (Sticky TOC Active Tracking via IntersectionObserver)
       ========================================================================== */
    const sections = document.querySelectorAll('.article-section, #intro');
    const tocLinks = document.querySelectorAll('.toc-link');

    // 配置 Intersection Observer
    const observerOptions = {
        root: null, // 預設為瀏覽器視窗
        rootMargin: '-20% 0px -60% 0px', // 聚焦在螢幕中上段區塊
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // 移除所有 active 類別
                tocLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));


    /* ==========================================================================
       2. 自我注意力機制互動體驗 (Self-Attention Interactive Visualizer)
       ========================================================================== */
    const attentionDemo = document.getElementById('attentionDemo');
    
    if (attentionDemo) {
        const tokens = attentionDemo.querySelectorAll('.token');
        const triggerToken = attentionDemo.querySelector('.highlight-trigger');

        // 當滑鼠移入關鍵指代字 "it" 時
        triggerToken.addEventListener('mouseenter', () => {
            tokens.forEach(token => {
                if (token === triggerToken) return;
                
                // 讀取預設權重分佈
                const weight = parseFloat(token.getAttribute('data-weight') || '0.1');
                
                if (weight >= 0.5) {
                    // 高權重單字（如 animal）
                    token.classList.add('attention-active');
                } else if (weight <= 0.2) {
                    // 低權重單字，稍微淡化
                    token.classList.add('attention-low');
                }
            });
        });

        // 當滑鼠移出時恢復原狀
        triggerToken.addEventListener('mouseleave', () => {
            tokens.forEach(token => {
                token.classList.remove('attention-active');
                token.classList.remove('attention-low');
            });
        });
    }


    /* ==========================================================================
       3. 行動端目錄抽屜切換 (Mobile TOC Menu Drawer)
       ========================================================================== */
    const mobileToggle = document.querySelector('.mobile-toc-toggle');
    const sidebar = document.querySelector('.toc-sidebar');

    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', (e) => {
            sidebar.classList.toggle('open');
            mobileToggle.textContent = sidebar.classList.contains('open') ? '✕ 關閉' : '☰ 目錄';
            e.stopPropagation();
        });

        // 點擊目錄任何連結後自動收起側邊欄（行動端優化）
        tocLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    sidebar.classList.remove('open');
                    mobileToggle.textContent = '☰ 目錄';
                }
            });
        });

        // 點擊空白處關閉
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                sidebar.classList.remove('open');
                mobileToggle.textContent = '☰ 目錄';
            }
        });
    }
});
