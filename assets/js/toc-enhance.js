// 目錄增強功能
(function() {
    'use strict';
    
    // 等待 DOM 載入完成
    function initTOC() {
        // 檢查是否有目錄
        const tocElement = document.querySelector('.toc');
        if (!tocElement) return;
        
        // 移動目錄到右側
        moveTOCToRightSide();
        
        // 創建切換按鈕
        createToggleButton();
        
        // 增強目錄功能
        enhanceTOCBehavior();
        
        // 啟用滾動偵測
        enableScrollSpy();
        
        // 平滑滾動
        enableSmoothScroll();
    }
    
    // 修改：移動目錄到右側而不是側邊欄
    function moveTOCToRightSide() {
        const toc = document.querySelector('.toc');
        if (!toc) return;
        
        // 從側邊欄中移除目錄（如果存在）
        const sidebarToc = document.querySelector('.sidebar .toc');
        if (sidebarToc) {
            sidebarToc.remove();
        }
        
        // 從原始位置移除目錄
        const originalToc = document.querySelector('.page__content .toc');
        if (originalToc && originalToc !== toc) {
            originalToc.remove();
        }
        
        // 如果目錄不在 body 中，將其移動到 body
        if (toc.parentNode && toc.parentNode !== document.body) {
            document.body.appendChild(toc);
        }
        
        // 添加必要的類名用於 CSS 樣式
        toc.classList.add('toc-right-sidebar');
    }
    
    // 新增：創建切換按鈕
    function createToggleButton() {
        // 檢查是否已存在按鈕
        if (document.querySelector('.toc-toggle')) return;
        
        const toggleButton = document.createElement('div');
        toggleButton.className = 'toc-toggle';
        toggleButton.setAttribute('title', '切換目錄');
        
        // 添加點擊事件
        toggleButton.addEventListener('click', function() {
            const toc = document.querySelector('.toc');
            if (toc) {
                toc.classList.toggle('hidden');
                
                // 改變按鈕透明度
                if (toc.classList.contains('hidden')) {
                    this.style.opacity = '0.6';
                } else {
                    this.style.opacity = '1';
                }
            }
        });
        
        // 添加 hover 效果
        toggleButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        toggleButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        document.body.appendChild(toggleButton);
    }
    
    // 增強目錄行為（保持原始邏輯）
    function enhanceTOCBehavior() {
        const tocLinks = document.querySelectorAll('.toc a');
        
        tocLinks.forEach(link => {
            // 添加點擊事件
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').slice(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // 移除所有活動狀態
                    tocLinks.forEach(l => l.classList.remove('active'));
                    
                    // 添加活動狀態到當前連結
                    this.classList.add('active');
                    
                    // 平滑滾動到目標，考慮頂部導航欄高度
                    const headerHeight = document.querySelector('.masthead')?.offsetHeight || 60;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
            
            // 添加 hover 效果
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
            });
            
            link.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateX(0)';
                }
            });
        });
    }
    
    // 滾動偵測 - 高亮當前閱讀的章節（保持原始邏輯）
    function enableScrollSpy() {
        const tocLinks = document.querySelectorAll('.toc a');
        const headings = document.querySelectorAll('.page__content h1, .page__content h2, .page__content h3, .page__content h4, .page__content h5, .page__content h6');
        
        if (tocLinks.length === 0 || headings.length === 0) return;
        
        // 建立 Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    if (id) {
                        // 移除所有活動狀態
                        tocLinks.forEach(link => {
                            link.classList.remove('active');
                            link.style.transform = 'translateX(0)';
                        });
                        
                        // 找到對應的目錄連結
                        const activeLink = document.querySelector(`.toc a[href="#${id}"]`);
                        if (activeLink) {
                            activeLink.classList.add('active');
                            activeLink.style.transform = 'translateX(5px)';
                            
                            // 確保活動連結在目錄視窗內
                            const tocNav = document.querySelector('.toc nav');
                            if (tocNav) {
                                activeLink.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'nearest'
                                });
                            }
                        }
                    }
                }
            });
        }, {
            // 當標題進入螢幕上方 20% 時觸發
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        });
        
        // 觀察所有標題
        headings.forEach(heading => {
            if (heading.id) {
                observer.observe(heading);
            }
        });
    }
    
    // 平滑滾動功能（保持原始邏輯）
    function enableSmoothScroll() {
        // 為所有內部連結添加平滑滾動
        const internalLinks = document.querySelectorAll('a[href^="#"]:not(.toc a)');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').slice(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerHeight = document.querySelector('.masthead')?.offsetHeight || 60;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // 目錄摺疊功能（手機版）- 調整為右側目錄
    function addTOCCollapse() {
        const toc = document.querySelector('.toc');
        if (!toc) return;
        
        // 在小螢幕上隱藏目錄
        if (window.innerWidth < 768) {
            toc.classList.add('hidden');
        } else {
            toc.classList.remove('hidden');
        }
    }
    
    // 初始化函數（保持原始邏輯）
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(initTOC, 100); // 稍微延遲確保元素都載入完成
                setTimeout(addTOCCollapse, 200);
            });
        } else {
            setTimeout(initTOC, 100);
            setTimeout(addTOCCollapse, 200);
        }
    }
    
    // 處理頁面切換（如果使用 AJAX）（保持原始邏輯）
    function handlePageChange() {
        // 監聽可能的頁面變化
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    const addedNodes = Array.from(mutation.addedNodes);
                    const hasContent = addedNodes.some(node => 
                        node.nodeType === 1 && 
                        (node.classList.contains('page__content') || 
                         node.querySelector && node.querySelector('.page__content'))
                    );
                    
                    if (hasContent) {
                        setTimeout(initTOC, 100);
                    }
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // 啟動（保持原始邏輯）
    init();
    handlePageChange();
    
    // 窗口大小改變時重新檢查摺疊狀態
    window.addEventListener('resize', function() {
        setTimeout(addTOCCollapse, 100);
    });
    
})();