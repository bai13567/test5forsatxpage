// 配置文件 (相当于后端数据源)
const siteConfig = {
    en: {
        nav: ["Home", "Explore", "Opportunities", "Docs"],
        hero: {
            title: "satx — 1:1 with every Bitcoin satoshi",
            subtitle: "2,099,999,997,690,000 satoshis. Precise. Finite. Bitcoin-native.",
            ctaPrimary: "Explore satx",
            ctaSecondary: "Read Whitepaper"
        },
        stats: [
            { label: "Supply", value: "2,099,999,997,690,000" },
            { label: "Standard", value: "BRC-20 / Ordinals" },
            { label: "Distribution", value: "Fair / No pre-mine" },
            { label: "Mint completed", value: "2024-01-02" }
        ],
        subHook: {
            title: "Community Opportunities",
            desc: "Opportunities discovered and shared by satx community members.",
            btn: "Explore Opportunities"
        },
        whyCards: [
            { title: "Precision", desc: "1:1 mapping with every satoshi." },
            { title: "Legacy", desc: "Built on Bitcoin's immovable foundation." },
            { title: "Bitcoin-native", desc: "True to Bitcoin's protocol and spirit." }
        ],
        howItWorks: {
            title: "How satx Works",
            steps: "Three layers: Numbering → Inscription → Flow with Satoshi"
        },
        fair: {
            title: "Fair by design",
            points: [
                "No pre-mine",
                "No team allocation",
                "No privileged mint",
                "Mint completed on 2024-01-02"
            ],
            timeline: ["2023-04-24 deployed", "Mint period", "2024-01-02 completed"]
        },
        useCases: {
            title: "Use Cases",
            cards: ["Collectibles", "Store of Value", "DeFi (future cross-chain)", "Identity (DID)"]
        },
        footer: {
            disclaimer: "Community Opportunities are not issued by satx. satx does not guarantee returns and only provides information access."
        },
        docs: {
            title: "Documentation",
            whitepaperEn: "English Whitepaper",
            whitepaperZh: "Chinese Whitepaper",
            faq: "FAQ"
        },
        explore: {
            title: "Explore satx",
            desc: "Key data and external links will be available soon."
        },
        opportunities: {
            title: "Community-discovered Opportunities",
            disclaimer: "The opportunities listed are not issued by satx. satx does not control third-party projects and does not guarantee any returns.",
            empty: "Opportunities will be updated soon. Please bookmark: satx.uk"
        }
    },
    zh: {
        nav: ["首页", "探索", "社区机会", "文档"],
        hero: {
            title: "satx — 与每一个聪 1:1 对应",
            subtitle: "2,099,999,997,690,000 个聪。精确。有限。比特币原生。",
            ctaPrimary: "探索 satx",
            ctaSecondary: "阅读白皮书"
        },
        stats: [
            { label: "总量", value: "2,099,999,997,690,000" },
            { label: "标准", value: "BRC-20 / Ordinals" },
            { label: "分发", value: "公平 / 无预挖" },
            { label: "铸造完成于", value: "2024-01-02" }
        ],
        subHook: {
            title: "社区机会",
            desc: "由 satx 社区成员发现和分享的机会。",
            btn: "探索机会"
        },
        whyCards: [
            { title: "精确", desc: "与每一个聪进行 1:1 映射。" },
            { title: "传承", desc: "建立在比特币不可动摇的基石之上。" },
            { title: "比特币原生", desc: "忠于比特币的协议与精神。" }
        ],
        fair: {
            title: "设计即公平",
            points: [
                "无预挖",
                "无团队分配",
                "无特权铸造",
                "铸造于 2024-01-02 完成"
            ],
            timeline: ["2023-04-24 部署", "铸造期", "2024-01-02 完成"]
        },
        footer: {
            disclaimer: "社区机会并非由 satx 发行。satx 不保证收益，仅提供信息入口。"
        },
        docs: {
            title: "文档",
            whitepaperEn: "英文白皮书",
            whitepaperZh: "中文白皮书",
            faq: "常见问题"
        },
        explore: {
            title: "探索 satx",
            desc: "关键数据和外部链接即将上线。"
        },
        opportunities: {
            title: "社区发现的机会",
            disclaimer: "所列机会并非由 satx 发行。satx 不控制第三方项目，也不保证任何收益。",
            empty: "机会即将更新。请收藏书签：satx.uk"
        }
    }
};

// 当前语言
let currentLang = 'en';
let currentPage = '/';

// 路由映射
const routes = {
    '/': renderHome,
    '/explore': renderExplore,
    '/opportunities': renderOpportunities,
    '/docs': renderDocs
};
