module.exports = {
  "title": "树深遇鹿",
  "description": "生活不可能像你想象的那么好，但也不会像你想象的那么糟。",
  "dest": "docs",
  "base": "/blog/",
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
        "link": "/theme-reco/theme-reco/"
        // "items": [
        //   {
        //     "text": "随笔",
        //   }
        // ]
      },
      {
        "text": "关于我",
        "icon": "reco-account",
        "items": [
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
      "/theme-reco/theme-reco/": [
        "",
        "timer"
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