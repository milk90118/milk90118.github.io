// 目錄增強功能
(function() {
    'use strict';
    
    // 等待 DOM 載入完成
    function initTOC() {
        // 檢查是否有目錄
        const tocElement = document.querySelector('.toc');
        if (!tocElement) return;
        
        // 移動目錄到側邊欄
        moveTOCToSidebar();
        
        // 增強目錄功能
        enhanceTOCBehavior();
        
        // 啟用滾動偵測
        enableScrollSpy();
        
        // 平滑滾動
        enableSmoothScroll();
    }
    
    // 移動目錄到側邊欄
    function moveTOCToSidebar() {
        const toc = document.querySelector('.toc');
        const sidebar = document.querySelector('.sidebar');
        const authorProfile = document.querySelector('.author__content');
        
        if (toc && sidebar && authorProfile) {
            // 將目錄插入到作者資訊後面
            authorProfile.parentNode.insertBefore(toc, authorProfile.nextSibling);
            
            // 從原位置移除目錄
            const originalToc = document.querySelector('.page__content .toc');
            if (originalToc && originalToc !== toc) {
                originalToc.remove();
            }
        }
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
                    
                    // 平滑滾動到目標
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
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
    
    // 滾動偵測 - 高亮當前閱讀的章節
    function enableScrollSpy() {
        const tocLinks = document.querySelectorAll('.toc a');
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
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
                            
                            // 確保活動連結在視窗內
                            activeLink.scrollIntoView({
                                behavior: 'smooth',
                                block: 'nearest'
                            });
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
    
    // 平滑滾動功能
    function enableSmoothScroll() {
        // 為所有內部連結添加平滑滾動
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').slice(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // 目錄摺疊功能（手機版）
    function addTOCCollapse() {
        const tocTitle = document.querySelector('.toc .nav__title');
        const tocContent = document.querySelector('.toc nav');
        
        if (tocTitle && tocContent && window.innerWidth < 768) {
            tocTitle.style.cursor = 'pointer';
            tocTitle.addEventListener('click', function() {
                if (tocContent.style.display === 'none') {
                    tocContent.style.display = 'block';
                    this.innerHTML = this.innerHTML.replace('📖', '📕');
                } else {
                    tocContent.style.display = 'none';
                    this.innerHTML = this.innerHTML.replace('📕', '📖');
                }
            });
            
            // 手機版預設摺疊
            tocContent.style.display = 'none';
        }
    }
    
    // 初始化函數
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
    
    // 處理頁面切換（如果使用 AJAX）
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
    
    // 啟動
    init();
    handlePageChange();
    
    // 窗口大小改變時重新檢查摺疊狀態
    window.addEventListener('resize', function() {
        setTimeout(addTOCCollapse, 100);
    });
    
})();