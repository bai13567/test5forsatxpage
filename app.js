// ==========================
// 全局配置与状态
// ==========================

// 当前语言，默认英文
let currentLang = 'en';

// 路由映射表
const routes = {
    '/': renderHome,
    '/explore': renderExplore,
    '/opportunities': renderOpportunities,
    '/docs': renderDocs
};

// ==========================
// 核心路由与初始化
// ==========================

// 切换语言
function switchLang(lang) {
    currentLang = lang;
    // 保存语言偏好到 localStorage
    localStorage.setItem('satx_lang', lang);
    // 重新渲染当前页面
    route();
}

// 路由控制
function route() {
    const path = window.location.hash.slice(1) || '/';
    currentPage = path;
    const app = document.getElementById('app');
    
    if (routes[path]) {
        app.innerHTML = routes[path]();
        // 页面加载后初始化动画和交互
        setTimeout(() => {
            initAnimations();
            initPageLogic(path);
        }, 100);
    } else {
        app.innerHTML = `
        <div style="text-align:center; padding:100px 20px;">
            <h2>404</h2>
            <p>Page not found</p>
            <a href="#/" onclick="route()" class="btn btn-secondary" style="margin-top:20px;">Back to Home</a>
        </div>`;
    }
    
    // 滚动到顶部
    window.scrollTo(0, 0);
}

// 初始化页面特定逻辑
function initPageLogic(path) {
    if (path === '/docs') {
        initFAQ();
    }
}

// ==========================
// 动画系统 (克制的动效)
// ==========================

// 初始化动画（数字滚动、淡入）
function initAnimations() {
    // 1. 数字滚动动画 (仅执行一次)
    // 检查是否已经动画过，防止重复触发
    const statElement = document.querySelector('.stats-grid');
    if (statElement && !statElement.dataset.animated) {
        statElement.dataset.animated = true;
        // 移除千分位逗号以便计算
        const cleanValue = statElement.querySelector('.value').innerText.replace(/,/g, '');
        const targetValue = parseInt(cleanValue);
        
        // 防止 NaN
        if (isNaN(targetValue)) return;

        let start = 0;
        const duration = 2000; // 动画持续时间 (毫秒)
        const incrementTime = 16; // 约等于 60fps
        const totalSteps = duration / incrementTime;
        let currentStep = 0;

        const counter = document.querySelector('.stats-grid .value');
        if (!counter) return;

        const step = () => {
            currentStep++;
            // 使用缓动函数 (先快后慢)
            const progress = currentStep / totalSteps;
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            start = targetValue * easeOutProgress;

            if (currentStep <= totalSteps) {
                counter.innerText = Math.floor(start).toLocaleString();
                requestAnimationFrame(step);
            } else {
                // 确保最终显示精确的数字
                counter.innerText = targetValue.toLocaleString();
            }
        };
        step();
    }

    // 2. 滚动淡入效果 (Fade In on Scroll)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 触发后取消观察以避免性能浪费
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

    // 为所有需要动画的模块添加类
    document.querySelectorAll('.section, .card, .stat-card, .timeline-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ==========================
// 页面渲染函数 (续)
// ==========================

// 渲染首页
function renderHome() {
    const t = siteConfig[currentLang];
    return `
    <section class="hero">
        <h1>${t.hero.title}</h1>
        <p>${t.hero.subtitle}</p>
        
        <div class="btn-group">
            <a href="#/explore" onclick="route()" class="btn btn-primary">${t.hero.ctaPrimary}</a>
            <a href="#/docs" onclick="route()" class="btn btn-secondary">${t.hero.ctaSecondary}</a>
        </div>

        <div class="stats-grid">
            ${t.stats.map(stat => `
                <div class="stat-card">
                    <div class="value">${stat.value}</div>
                    <div class="label">${stat.label}</div>
                </div>
            `).join('')}
        </div>
    </section>

    <!-- Community Opportunities Hook -->
    <section class="section">
        <h2>${t.subHook.title}</h2>
        <p style="text-align:center; color:var(--text-secondary);">${t.subHook.desc}</p>
        <div style="text-align:center; margin-top:20px;">
            <a href="#/opportunities" onclick="route()" class="btn btn-secondary" style="border-color:var(--text-secondary); color:var(--text-secondary);">${t.subHook.btn}</a>
        </div>
    </section>

    <!-- Why satx -->
    <section class="section">
        <h2>Why satx Exists</h2>
        <div class="cards-3">
            ${t.whyCards.map(card => `
                <div class="card">
                    <h3>${card.title}</h3>
                    <p>${card.desc}</p>
                </div>
            `).join('')}
        </div>
    </section>

    <!-- How it works -->
    <section class="section">
        <h2>How satx Works</h2>
        <div class="card" style="text-align: left; max-width: 800px; margin: 0 auto;">
            <p><strong>Four-layer structure:</strong></p>
            <ol style="margin: 20px 0 20px 20px;">
                <li>Bitcoin</li>
                <li>Ordinals</li>
                <li>Inscriptions</li>
                <li>Applications</li>
            </ol>
            <p><strong>Three steps:</strong> Numbering → Inscription → Flow with Satoshi (Traceable)</p>
        </div>
    </section>

    <!-- Fair Distribution -->
    <section class="section">
        <h2>${t.fair.title}</h2>
        <ul style="list-style:none; text-align:center; max-width:600px; margin:0 auto 40px;">
            ${t.fair.points.map(p => `<li style="margin:10px 0; color:var(--text-secondary); font-size: 1.1rem;">${p}</li>`).join('')}
        </ul>
        <div class="timeline">
            ${t.fair.timeline.map(item => `<div class="timeline-item">${item}</div>`).join('')}
        </div>
    </section>

    <!-- Use Cases -->
    <section class="section">
        <h2>Use Cases</h2>
        <div class="cards-4">
            ${t.useCases.cards.map(card => `
                <div class="card">
                    <h3>${card}</h3>
                </div>
            `).join('')}
        </div>
    </section>
    `;
}

// 渲染 /explore
function renderExplore() {
    const t = siteConfig[currentLang];
    return `
    <section class="section">
        <h2>${t.explore.title}</h2>
        <p style="text-align:center; color:var(--text-secondary);">${t.explore.desc}</p>
        
        <!-- 预留 Search / Lookup UI 位置 -->
        <div style="margin-top:40px; text-align:center; opacity: 0.6;">
            <p>Search / Lookup UI (Coming soon)</p>
            <p style="margin-top: 10px;">Blockchain explorers and data lookup tools will be integrated here.</p>
        </div>
    </section>
    `;
}

// 渲染 /opportunities
function renderOpportunities() {
    const t = siteConfig[currentLang];
    return `
    <section class="section">
        <h2>${t.opportunities.title}</h2>
        <div class="disclaimer-text">
            ${t.opportunities.disclaimer}
        </div>
        <div style="text-align:center; margin-top:40px;">
            <p>${t.opportunities.empty}</p>
        </div>
    </section>
    `;
}
// ==========================
// 文档与 FAQ 逻辑
// ==========================

// 渲染 /docs
function renderDocs() {
    const t = siteConfig[currentLang];
    return `
    <section class="section">
        <h2>${t.docs.title}</h2>
        
        <div style="margin:40px 0; text-align:center;">
            <h3>Whitepaper</h3>
            <div>
                <a href="https://share.weiyun.com/lHcJNJqO" target="_blank" class="btn btn-primary" style="margin:10px;">${t.docs.whitepaperEn}</a>
                <a href="https://share.weiyun.com/WYtdE2vt" target="_blank" class="btn btn-primary" style="margin:10px;">${t.docs.whitepaperZh}</a>
            </div>
        </div>

        <div style="margin:40px 0;">
            <h3>${t.docs.faq}</h3>
            <div class="faq-container" id="faq-container">
                <!-- 占位 FAQ，后续可通过 JS 动态加载或手动添加 -->
                <!-- 初始化时为空，由 initFAQ() 填充 -->
            </div>
        </div>
    </section>
    `;
}

// 初始化 FAQ 列表
function initFAQ() {
    const faqContainer = document.getElementById('faq-container');
    if (!faqContainer) return;

    // 这里可以模拟从配置文件加载 FAQ 数据
    const faqData = [
        { q: "What is satx?", a: "satx is a Bitcoin-native project that maps 1:1 with every satoshi on the Bitcoin blockchain." },
        { q: "How was satx distributed?", a: "satx was distributed fairly through a public mint with no pre-mine and no team allocation." },
        { q: "Is there an airdrop?", a: "There is no official satx airdrop. Please be cautious of scams. The project focuses on community-discovered opportunities." },
        { q: "What is the total supply?", a: "The total supply is precisely 2,099,999,997,690,000, matching the total number of satoshis." },
        { q: "How can I participate?", a: "You can explore the ecosystem, check community opportunities, or view the code on GitHub." }
    ];

    // 生成 FAQ HTML
    faqData.forEach(item => {
        const details = document.createElement('details');
        details.innerHTML = `<summary>${item.q}</summary><p>${item.a}</p>`;
        faqContainer.appendChild(details);
    });
}

// ==========================
// 启动应用
// ==========================

// 初始化
window.addEventListener('hashchange', route);
window.addEventListener('load', () => {
    // 从 localStorage 恢复语言设置
    const savedLang = localStorage.getItem('satx_lang');
    if (savedLang && (savedLang === 'en' || savedLang === 'zh')) {
        currentLang = savedLang;
    }
    
    // 监听配置文件加载完成 (由于 config.js 是 script 标签引入，需要确保它先加载)
    // 这里简单处理，稍微延迟以确保 config.js 执行完毕
    setTimeout(() => {
        route();
    }, 50);
});
