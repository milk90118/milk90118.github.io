// 日夜切換功能 JavaScript
(function() {
    'use strict';
    
    // 創建切換按鈕
    function createThemeToggle() {
        // 檢查是否已存在按鈕
        if (document.querySelector('.theme-toggle')) {
            return;
        }
        
        const toggle = document.createElement('button');
        toggle.className = 'theme-toggle';
        toggle.setAttribute('aria-label', 'Day/Night Mode');
        toggle.innerHTML = 'Light';
        
        // 插入到頁面
        document.body.appendChild(toggle);
        
        // 添加點擊事件
        toggle.addEventListener('click', toggleTheme);
        
        return toggle;
    }
    
    // 獲取當前主題
    function getCurrentTheme() {
        return localStorage.getItem('theme') || 'light';
    }
    
    // 設定主題
    function setTheme(theme) {
        const html = document.documentElement;
        const toggle = document.querySelector('.theme-toggle');
        
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
            if (toggle) {
                toggle.innerHTML = 'Dark';
            }
        } else {
            html.removeAttribute('data-theme');
            if (toggle) {
                toggle.innerHTML = 'Light';
            }
        }
        
        // 保存到 localStorage
        localStorage.setItem('theme', theme);
        
        // 觸發自定義事件
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }
    
    // 切換主題
    function toggleTheme() {
        const currentTheme = getCurrentTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }
    
    // 根據時間自動設定主題（可選功能）
    function autoSetTheme() {
        const hour = new Date().getHours();
        const savedTheme = localStorage.getItem('theme');
        
        // 如果用戶沒有手動設定過，根據時間自動切換
        if (!savedTheme) {
            // 晚上 7 點到早上 7 點使用夜間模式
            if (hour >= 19 || hour < 7) {
                setTheme('dark');
            } else {
                setTheme('light');
            }
        } else {
            setTheme(savedTheme);
        }
    }
    
    // 監聽系統主題變化（可選）
    function listenToSystemTheme() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            mediaQuery.addEventListener('change', function(e) {
                // 只有在用戶沒有手動設定時才跟隨系統
                if (!localStorage.getItem('theme')) {
                    setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }
    
    // 初始化
    function init() {
        // 等待 DOM 載入完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                createThemeToggle();
                autoSetTheme();
                listenToSystemTheme();
            });
        } else {
            createThemeToggle();
            autoSetTheme();
            listenToSystemTheme();
        }
    }
    
    // 為了確保在 Jekyll 環境中正常工作，添加多重初始化檢查
    function ensureInitialization() {
        let attempts = 0;
        const maxAttempts = 10;
        
        function tryInit() {
            attempts++;
            
            if (document.body && !document.querySelector('.theme-toggle')) {
                createThemeToggle();
                autoSetTheme();
                listenToSystemTheme();
            } else if (attempts < maxAttempts) {
                setTimeout(tryInit, 100);
            }
        }
        
        tryInit();
    }
    
    // 啟動初始化
    init();
    ensureInitialization();
    
    // 導出函數供外部使用（可選）
    window.themeToggle = {
        setTheme: setTheme,
        getCurrentTheme: getCurrentTheme,
        toggleTheme: toggleTheme
    };
    
})();