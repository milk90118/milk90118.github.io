// 目錄增強功能 - 獨立右側版本
(function() {
    'use strict';
    
    // 等待 DOM 載入完成
    function initTOC() {
        // 檢查是否有目錄
        const tocElement = document.querySelector('.toc');
        if (!tocElement) return;
        
        // 移動目錄到右側獨立位置
        moveTOCToRightSide();
        
        // 創建切換按鈕
        createToggleButton();
        
        // 增強目錄功能
        enhanceTOCBehavior();
        
        // 啟用滾動偵測
        enableScrollSpy();
        
        // 平滑滾動
        enableSmoothScroll();
        
        // 添加目錄摺疊功能
        addTOCToggle();
    }
    
    // 移動目錄到右側獨立位置
    function moveTOCToRightSide() {
        const toc = document.querySelector('.toc');
        if (!toc) return;
        
        // 從側邊欄中移除目錄（如果存在）
        const sidebarToc = document.querySelector('.sidebar .toc');
        if (sidebarToc) {
            sidebarToc.remove();
        }
        
        // 從原始位置移除並重新添加到 body
        if (toc.parentNode) {
            toc.remove();
        }
        
        // 將目錄添加到 body，CSS 會處理定位
        document.body.appendChild(toc);
        
        // 添加必要的類名
        toc.classList.add('toc-right-sidebar');
    }
    
    // 創建切換按鈕
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
                
                // 改變按鈕圖示
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
    
    // 增強目錄行為
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
                    
                    // 平滑滾動到目標，考慮固定標題欄的高度
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
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateX(3px)';
                    this.style.backgroundColor = 'var(--current-bg-light)';
                }
            });
            
            link.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateX(0)';
                    this.style.backgroundColor = 'transparent';
                }
            });
        });
    }
    
    // 滾動偵測 - 高亮當前閱讀的章節
    function enableScrollSpy() {
        const tocLinks = document.querySelectorAll('.toc a');
        const headings = Array.from(document.querySelectorAll('.page__content h1, .page__content h2, .page__content h3, .page__content h4, .page__content h5, .page__content h6'))
            .filter(heading => heading.id); // 只選擇有 ID 的標題
        
        if (tocLinks.length === 0 || headings.length === 0) return;
        
        let isScrolling = false;
        
        function updateActiveLink() {
            if (isScrolling) return;
            
            const scrollPosition = window.scrollY + window.innerHeight * 0.3; // 當標題到達視窗上方 30% 時激活
            let activeHeading = null;
            
            // 找到當前應該激活的標題
            for (let i = headings.length - 1; i >= 0; i--) {
                if (headings[i].offsetTop <= scrollPosition) {
                    activeHeading = headings[i];
                    break;
                }
            }
            
            // 更新目錄中的活動狀態
            tocLinks.forEach(link => {
                link.classList.remove('active');
                link.style.transform = 'translateX(0)';
                link.style.backgroundColor = 'transparent';
            });
            
            if (activeHeading) {
                const activeLink = document.querySelector(`.toc a[href="#${activeHeading.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    activeLink.style.transform = 'translateX(3px)';
                    
                    // 確保活動連結在目錄視窗內可見
                    const tocNav = document.querySelector('.toc nav');
                    if (tocNav) {
                        const linkRect = activeLink.getBoundingClientRect();
                        const navRect = tocNav.getBoundingClientRect();
                        
                        if (linkRect.top < navRect.top || linkRect.bottom > navRect.bottom) {
                            activeLink.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            });
                        }
                    }
                }
            }
        }
        
        // 使用 throttle 來優化性能
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(updateActiveLink, 50);
        });
        
        // 初始化時運行一次
        setTimeout(updateActiveLink, 500);
    }
    
    // 平滑滾動功能
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
    
    // 目錄切換功能
    function addTOCToggle() {
        const toc = document.querySelector('.toc');
        if (!toc) return;
        
        // 檢查螢幕大小，決定預設狀態
        function checkScreenSize() {
            if (window.innerWidth < 768) {
                toc.classList.add('hidden');
            } else {
                toc.classList.remove('hidden');
            }
        }
        
        // 初始檢查
        checkScreenSize();
        
        // 視窗大小改變時重新檢查
        window.addEventListener('resize', function() {
            setTimeout(checkScreenSize, 100);
        });
    }
    
    // 鍵盤快捷鍵支援
    function addKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Ctrl + Shift + T 切換目錄
            if (e.ctrlKey && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                const toc = document.querySelector('.toc');
                const toggleButton = document.querySelector('.toc-toggle');
                if (toc && toggleButton) {
                    toggleButton.click();
                }
            }
        });
    }
    
    // 目錄內容優化
    function optimizeTOCContent() {
        const tocNav = document.querySelector('.toc nav');
        if (!tocNav) return;
        
        // 為深層嵌套添加更好的樣式
        const nestedLists = tocNav.querySelectorAll('ul ul ul');
        nestedLists.forEach(list => {
            list.style.borderLeft = '1px dashed var(--current-border)';
            list.style.marginLeft = '8px';
            list.style.paddingLeft = '8px';
        });
        
        // 為目錄項目添加序號（可選）
        const topLevelItems = tocNav.querySelectorAll('nav > ul > li');
        topLevelItems.forEach((item, index) => {
            const link = item.querySelector('a');
            if (link && !link.textContent.match(/^\d+\./)) {
                // 如果還沒有序號，可以添加
                // link.textContent = `${index + 1}. ${link.textContent}`;
            }
        });
    }
    
    // 初始化函數
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(() => {
                    initTOC();
                    addKeyboardShortcuts();
                    optimizeTOCContent();
                }, 100);
            });
        } else {
            setTimeout(() => {
                initTOC();
                addKeyboardShortcuts();
                optimizeTOCContent();
            }, 100);
        }
    }
    
    // 處理頁面切換（如果使用 AJAX 或 SPA）
    function handlePageChange() {
        const observer = new MutationObserver(function(mutations) {
            let shouldReinit = false;
            
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    const addedNodes = Array.from(mutation.addedNodes);
                    const hasContent = addedNodes.some(node => 
                        node.nodeType === 1 && 
                        (node.classList?.contains('page__content') || 
                         node.querySelector?.('.page__content') ||
                         node.classList?.contains('toc'))
                    );
                    
                    if (hasContent) {
                        shouldReinit = true;
                    }
                }
            });
            
            if (shouldReinit) {
                setTimeout(() => {
                    initTOC();
                    optimizeTOCContent();
                }, 200);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // 啟動
    init();
    handlePageChange();
    
    // 調試信息（開發時使用）
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🌸 TOC Enhancement Script Loaded');
        console.log('📖 Use Ctrl+Shift+T to toggle TOC');
    }
    
})();