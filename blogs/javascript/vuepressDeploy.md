---
title: vuepress部署博客
date: 2021-10-30
tags:
 - javascript
categories: 
 - javascript
---
## 前言

作为一个前端怎么能没有属于自己的博客呢，但是平常忙于工作中，难以抽出很多时间去搭建自己的博客。\
不知道大家有没有听说过[vuepress](https://vuepress.vuejs.org/zh/theme/)，一个可以快速搭建类似于vue官方文档一样的文档，还提供博客主题让我们快速搭建自己的博客，其中还内置评论、tag墙、时间轴等等功能，以下就是我自己部署博客的一些心得。

## 预览
个人博客的搭建主要是[vuepress](https://vuepress.vuejs.org/zh/theme/) + [reco](https://vuepress-theme-reco.recoluan.com/)主题
- [个人博客预览地址](https://wzwdream.github.io/blog/)
- [vuepress官方文档](https://vuepress.vuejs.org/zh/theme/)
- [reco主题文档](https://vuepress-theme-reco.recoluan.com/)

## 初始化
- 创建项目文件夹`blog`，并进行初始化

```
npm init -y
```

- 安装`Vuepress`

```
npm install -D vuepress
```

- 在`package.json`中添加启动/编译命令，建议在启动命令添加上`-temp .temp`，这样我们更改配置文件后就不需要重新启动项目也能看到效果啦。

```
{
  "scripts": {
    "dev": "vuepress dev docs -temp .temp",
    "build": "vuepress build docs"
  }
}
```
- 创建`docs`文件夹，并在`docs`文件夹中创建README.md文档。

```
# Hello VuePress
```
- 运行`npm run dev`命令，就可以通过本地访问我们的第一篇文档（README.md）。
## 目录结构
官方推荐的目录结构，大家可以按照这个结构去构建
```
.
├── docs
│   ├── .vuepress (可选的)
│   │   ├── components (可选的)
│   │   ├── theme (可选的)
│   │   │   └── Layout.vue
│   │   ├── public (可选的)
│   │   ├── styles (可选的)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates (可选的, 谨慎配置)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (可选的)
│   │   └── enhanceApp.js (可选的)
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json
```
主要注意这两个文件：
-   `docs/README.md`: 首页。
-   `docs/.vuepress/config.js`: 配置文件。
## 首页
复制下面内容至`docs/README.md`文件下，`home`标识是否开启首页，也可以给标题、副标题设置null来禁用。
```
---
home: true
heroImage: /hero.png
heroText: Hero 标题
tagline: Hero 副标题
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
---
```
## 配置文件
`docs/.vuepress/config.js`，配置主题的导航栏、侧边栏、搜索、logo... \
可以参考下列文件的配置
```js
module.exports = {
  "title": "树深遇鹿", // 网站标题
  "description": "生活不可能像你想象的那么好，但也不会像你想象的那么糟。", // 网站描述
  "dest": "docs/.vuepress/dist", // 打包后的文件存放路径
  "base": "/blog/", // 打包后的静态资源的路径
  // 网站的图标
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/avatar.png"
      }
    ]
  ],
  // 插件
  "plugins": [
    [
      '@vuepress/register-components', // 评论插件
    ]
  ],
  // 主题-reco
  "theme": "reco",
  // 导航栏/侧边栏配置，时间轴是自带的，只需要配置路由，link就是文档的路径。相当于vue中的路由
  "themeConfig": {
    // 导航栏
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
      },
      {
        "text": "留言板",
        "icon": "reco-suggestion",
        "link": "/theme-reco/message-board.md"
      },
      {
        "text": "关于我",
        "icon": "reco-account",
        "items": [
          {
            "text": "个人信息",
            "link": "/theme-reco/about.md",
          },
          {
            "text": "掘金",
            "link": "https://juejin.cn/user/3281394147006381",
            "icon": "reco-juejin"
          }
        ]
      }
    ],
    // 侧边栏，auto标识自动生成，每个文档都会根据标题生成目录，也可以自己配置
    // "sidebar": "auto",
    "sidebar": {
      "/theme-reco/theme-reco/": [
        "",
        "timer"
      ]
    },
    // 评论插件的配置
    "valineConfig": {
      "appId": '',// your appId
      "appKey": '', // your appKey
    },
    // 网站logo
    "logo": "/avatar.png",
    // 是否开启搜索
    "search": true,
  }
}
```
## 部署
- 新建一个git仓库blog（仓库需要是public，不然pages需要收费）
- 在仓库的setting中找到pages，开启pages，默认为main分支，保存，因为我的自动部署是在gh-pages分支，所以我的pages的source为gh-pages分支。
- 自动部署主要是利用GitHub的action实现，具体的可以看[仓库](https://github.com/wzwdream/blog)里面的代码

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a487dfab9a949f49d1ff4925ee6d0f8~tplv-k3u1fbpfcp-watermark.image?)
> 博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。