module.exports = {
  "title": "树深遇鹿",
  "description": "生活不可能像你想象的那么好，但也不会像你想象的那么糟。",
  "dest": "docs",
  "base": "/blog/",
  "locales": {
    '/': {
      lang: 'zh-CN'
    }
  },
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/avatar.png"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "plugins": [
    [
      '@vuepress/register-components',
    ],
    [
      //先安装在配置， npm install @vuepress-reco/vuepress-plugin-kan-ban-niang --save
      "@vuepress-reco/vuepress-plugin-kan-ban-niang",
      {
        theme: ['haru1', 'blackCat', 'whiteCat', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku', 'z16'],
        clean: true, // 是否显示操作按钮
        messages: {
          welcome: '我是树深遇鹿，欢迎你的关注 ',
          home: '心里的话，我想要带你回家。',
          theme: '好吧，希望你能喜欢我的其他小伙伴。',
          close: '再见哦'
        },
        width: 240,
        height: 352,
        modelStyle: {
          left: '30px',
          bottom: '-20px',
          opacity: '0.8'
        }
      }
    ],
    [
      //鼠标点击特效 先安装在配置， npm install vuepress-plugin-cursor-effects --save
      "cursor-effects",
      {
        size: 3,                    // size of the particle, default: 2
        // shape: ['start'],  // shape of the particle, default: 'star'
        zIndex: 999999999           // z-index property of the canvas, default: 999999999
      }
    ],
    [
      //动态标题 先安装在配置， npm install vuepress-plugin-dynamic-title --save
      "dynamic-title",
      {
        showIcon: "/favicon.ico",
        showText: "(/≧▽≦/)咦！又好了！",
        hideIcon: "/failure.ico",
        hideText: "(●—●)喔哟，崩溃啦！",
        recoverTime: 2000
      }
    ],
    [
      //vuepress复制粘贴提示插件P 先安装在配置 npm install vuepress-plugin-nuggets-style-copy --save
      "vuepress-plugin-nuggets-style-copy", {
        copyText: "复制代码",
        tip: {
          content: "复制成功!"
        }
      }
    ],
  ],
  "theme": "reco",
  "themeConfig": {
    "nav": [
      {
        "text": "主页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "时间轴",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "随笔",
        "icon": "reco-document",
        "link": "/article/informal-essay/"
        // "items": [
        //   {
        //     "text": "随笔",
        //   }
        // ]
      },
      {
        "text": "留言板",
        "icon": "reco-suggestion",
        "link": "/article/message-board.md"
      },
      {
        "text": "关于我",
        "icon": "reco-account",
        "items": [
          {
            "text": "个人信息",
            "link": "/article/about.md",
          },
          {
            "text": "掘金",
            "link": "https://juejin.cn/user/3281394147006381",
            "icon": "reco-juejin"
          }
        ]
      }
    ],
    "subSidebar": "auto",
    "sidebar": {
      "/article/informal-essay/": [
        "",
        "timer",
        "regularExpression",
        "base64ToFormData",
        "luckyDraw9",
        "if-else",
        "download"
      ]
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "分类"
      },
      "tag": {
        "location": 3,
        "text": "标签"
      }
    },
    "friendLink": [
      {
        "title": "午后南杂",
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "1156743527@qq.com",
        "link": "https://www.recoluan.com"
      },
      {
        "title": "vuepress-theme-reco",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      }
    ],
    vssueConfig: {
      platform: 'github',
      owner: 'wzwdream',
      repo: 'blog',
      clientId: '0838dfbdb36f88359fb4',
      clientSecret: '094d643f5595ff8e8c790ea6ff8cce0201891d03',
    },
    "logo": "/avatar.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "wangzw",
    "authorAvatar": "/logo.jpeg",
    "record": "树深遇鹿",
    "startYear": "2021"
  },
  "markdown": {
    "lineNumbers": true
  }
}