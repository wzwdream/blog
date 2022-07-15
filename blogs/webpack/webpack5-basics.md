---
title: webpack5-基础配置优化篇
date: 2022-07-05
tags:
 - javascript
 - webpack5
categories: 
 - javascript
 - webpack5
---
## 1、前言

不知道大家面试的时候有没有遇到过这种情况：

面试官问你：了解过webpack嘛，之前有没有做过webpack的配置或者优化？ 

然后你想半天，回答说：webpack是一个比较流行的打包工具，可以通过配置loader、plugin来优化我们的代码。（ps：当时心想，这面试要凉了，后面果然如此）

最后就诞生了这篇文章。

为了更好的搭建自己的webpack知识体系，我画了一个大概的图，如下：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0cb7a0f41c9645a294018e72b2f9824c~tplv-k3u1fbpfcp-watermark.image?)

## 2、基本配置

首先初始化一下项目，并建立一下文件

现在的文件目录结构

```js
my-webpack
    ├── src
    │   └── main.js
    ├── webpack.config.js # webpack配置文件
    └── package.json
```

在src/main.js中简单写一点代码

```js
const a = 'hello '
const b = 'webpack'
console.log(a + b)
```
> 下面配置文件（babel、eslint、webpack等）都是建立在项目根目录下

### 2.1、安装依赖

在本地安装webpack跟webpack-cli

```js

 npm i webpack webpack-cli -D
 
 // 我安装的版本
 webpack: 5.73.0
 webpack-cli: 4.10.0
 
```
### 2.2、使用webpack

-   开发模式

```
npx webpack ./src/main.js --mode=development
```

-   生产模式

```
npx webpack ./src/main.js --mode=production
```
`npx webpack`: 是用来运行本地安装 `Webpack` 包的。

`./src/main.js`: 指定 `Webpack` 从 `main.js` 文件开始打包，不但会打包 `main.js`，还会将其依赖也一起打包进来。

`--mode=xxx`：指定模式（环境）。

直接运行`npx webpack ./src/main.js --mode=development`打包

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e79eeac7b3224f6d918b091153345556~tplv-k3u1fbpfcp-watermark.image?)

没有报错就表示打包成功，打包后的文件默认输出到dist目录下面

### 2.3、配置文件

**在使用webpack之前先认识一下webpack的一些基本概念（五大核心概念）**

1.  entry（入口）

指示 Webpack 从哪个文件开始打包

2.  output（输出）

指示 Webpack 打包完的文件输出到哪里去，如何命名等

3.  loader（加载器）

webpack 本身只能处理 js、json 等资源，其他资源需要借助 loader，Webpack 才能解析

4.  plugins（插件）

扩展 Webpack 的功能

5.  mode（模式）

主要由两种模式：

-   开发模式：development
-   生产模式：production

**在根目录下新建一个 `webpack.config.js` 配置文件**

```js
// Node.js的核心模块，专门用来处理文件路径
const path = require("path");

module.exports = {
    // 入口
    entry: "./src/main.js",
    // 输出
    output: {
        // path: 文件输出目录，必须是绝对路径
        // path.resolve()方法返回一个绝对路径
        // __dirname 当前文件的文件夹绝对路径
        path: path.resolve(__dirname, "dist"),
        // filename: 输出文件名
        filename: "main.js",
    },
    // 加载器
    module: {
        rules: [],
    },
    // 插件
    plugins: [],
    // 模式
    mode: "development", // 开发模式
}
```
**为了更好的观察我们打包输出的文件，我们先配置一下devServe**
1. 在根目录中新增一个public文件夹，并在其中新建一个index.html
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div class="box1"></div>
    <div class="box2"></div>
    <div class="box3"></div>
</body>
</html>
```
2.安装处理`html`资源的插件

```js
npm i html-webpack-plugin -D
```
3.安装`devServe`
```js
npm i webpack-dev-server -D
```
4.修改配置文件
```js

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // ...
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            // 以 public/index.html 为模板创建文件
            // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
            template: path.resolve(__dirname, "public/index.html"),
        }),
    ],
    // 开发服务器
    devServer: {
        host: "localhost", // 启动服务器域名
        port: "3000", // 启动服务器端口号
        open: true, // 是否自动打开浏览器
    },
    // ...
};
```
> 至此运行命令变为``npx webpack serve

### 2.4、处理样式资源

在src中新建一个`style`文件夹，然后新增一个`index.css`文件，随便在里面写一点样式，并在`main.js`中引用这个文件

只有在入口文件中`引用`的文件才能打包输出
```js
/* index.css */
body, html {
    background-color: yellowgreen;
}
.box1 { 
    width: 200px;
    height: 200px;
    background-color: tomato;
}

/* main.js */
import './style/index.css'
```


**运行`npx webpack serve`**

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/946f05282c0a41c798218c29df2b9282~tplv-k3u1fbpfcp-watermark.image?)

在这里报错了，原因是：**webpack只能处理js和json文件，其它类型的文件不能处理，需要借助loader来处理**

**安装`css-loader`处理css文件**

```js
npm i css-loader -D
```

**修改配置文件**

```js
module.exports = {
    // ...
    // 加载器
    module: {
        rules: [
            // 处理css的loader
            {
                // 正则匹配文件
                test: /\.css$/,
                use: ['css-loader']
            }
        ],
    },
    // ...
};
```

**运行`npx webpack serve`查看效果，发现页面上我们写的样式并没有生效，这是因为`css-loader`只能把css文件编译成webpack能够处理的文件，但是不能把样式引入到页面上**

**安装`style-loader`，把样式引入到页面中**
```js
// 安装
npm i style-loader -D

// 配置文件修改
module: {
    rules: [
        // 处理css的loader
        {
            // 正则匹配文件
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }
    ],
},
```
> use 数组里面 Loader 执行顺序是从右到左

**再次运行就能看到效果了**

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e64d81d58cc4c3f9caf75f81aff5587~tplv-k3u1fbpfcp-watermark.image?)

### 2.5、处理图片、字体等资源

过去在 `Webpack4` 时，我们处理图片资源通过 `file-loader` 和 `url-loader` 进行处理

现在 `Webpack5` 已经将两个 Loader 功能`内置`到 Webpack 里了，即webpack5 新增的`资源模块`(asset module)，允许使用资源文件（图片、字体、图标等）而不需要在借助其它loader来处理这些资源。

1.添加图片资源

- **index.css**
```js
.box1, .box2, .box3 { 
    width: 200px;
    height: 200px;
    background-repeat: no-repeat;
    background-size: contain;
}
.box1 {
    background-image: url('../images/1.webp');
}
.box2 {
    background-image: url('../images/2.webp');
}
.box3 {
    background-image: url('../images/3.webp');
}
```
2.修改配置文件

```js

module.exports = {
    // ...
    module: {
        rules: [
            // ...
            // 处理图片资源
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                type: "asset",
            },
        ],
    },
    // ...
};
```
**运行看效果**

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/654a4d452b034817913b2293dc6d5fb9~tplv-k3u1fbpfcp-watermark.image?)

3.优化图片资源

将小于某个大小的图片转化成 `data URI` 形式（Base64 格式）
-   优点：减少请求数量
-   缺点：体积变得更大
```js

module.exports = {
    // ...
    module: {
        rules: [
            // ...
            // 处理图片资源
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                type: "asset",
                parser: {
                  dataUrlCondition: {
                    maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
                  }
                }
            },
        ],
    },
    // ...
};
```
**重启devserve，就可以看到，小于10kb的图片已经转为`base64`格式了**

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea90ab7e77ce45a29384959a4980436d~tplv-k3u1fbpfcp-watermark.image?)

### 2.6、处理字体、视频、音频等资源

1.添加字体、图标

- 在打开[阿里巴巴矢量图标库open in new window](https://www.iconfont.cn/)下载喜欢的图标到本地
- 把字体文件放入`fonts`中，把`css`放入`style`文件夹中

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff669aff8b124c1999ca7980f5c2fb47~tplv-k3u1fbpfcp-watermark.image?)

2.修改配置文件
```js
/* index.html */
<i class="iconfont icon-bluetoothoff"></i>
<i class="iconfont icon-DND_mode"></i>
<i class="iconfont icon-camera"></i>

/* main.js */
import './style/iconfont.css'

/* webpack.config.js */
module.exports = {
    // ...
    // 加载器
    module: {
        rules: [
            // ...
            // 字体、图标、视频
            {
                test: /\.(ttf|woff2?|mp4|avi)$/,
                type: "asset/resource",
            },
        ],
    },
    // ...
};
```
**刷新页面就可以看到图标了**

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e957732568f34e739a317fe400b93c08~tplv-k3u1fbpfcp-watermark.image?)

### 2.7、自动清空打包目录

只需要在输出配置`clean: true`就可以实现

修改配置文件
```js
module.exports = {
    // ...
    output: {
        // ...
        clean: true
    }
    // ...
};
```
### 2.8、修改输出资源的名称跟路径

- 现在的打包文件都是全部放在dist根目录下面的，看起来比较杂乱

- 我们需要把文件根据文件属性放到不同的目录下面

**修改配置文件**

```js
module.exports = {
    // ...
    // 输出
    output: {
        // ...
        // filename: 输出文件名
        // 将 js 文件输出到 static/js 目录中
        filename: "static/js/main.js",
        // ...
    },
    // 加载器
    module: {
        rules: [
            // ...
            // 处理图片资源
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
                    }
                },
                generator: {
                    // 将图片文件输出到 static/imgs 目录中
                    filename: "static/imgs/[hash:8][ext][query]",
                },
            },
            // 字体、图标、视频
            {
                test: /\.(ttf|woff2?|mp4|avi)$/,
                type: "asset/resource",
                generator: {
                    filename: "static/asset/[hash:8][ext][query]",
                },
            },
        ],
    },
    // ...
};
```

> 命名规则：[hash:8]: hash值的前8位（不然文件名太长了）、[ext]: 使用之前的文件扩展名、[query]: 添加之前的query参数

**运行`npx webpack`打包，查看输出的文件夹dist，可以看到，文件预期的按照我们设置的方式输出**

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a9355f26c8d54c01a516cd13dbd5ac5c~tplv-k3u1fbpfcp-watermark.image?)

### 2.9、处理js（兼容性跟静态检查）

#### 2.9.1、js兼容性处理

浏览器对`JavaScript`的一些`ES6`语法兼容性不太好，所以我们需要借助`Babel`（JavaScript 编译器）来将`ES6`语法转化为`向后兼容`的JavaScript语法，从而能够运行在当前和旧版本的浏览器或其他环境中。

**我们在js中写一些ES6语法的东西，看一下输出的结果**

main.js
```js
function sum(...arg) {
    return arg.reduce((a, b) => a + b, 0)
}
console.log(sum(1,2,3,4,5,6))

class Student {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
}
console.log(new Student('Tom', 18))
```

> 测试的时候，把模式（mode）的值改为`none`，这样就可以比较清晰的看到输出啦

可以看的出来，我们使用的ES6的语法在输出的资源中还是原本的语法，这样的话在低版本浏览器就会出现兼容性的问题。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c14ba0c1777c4cce82f073256f00aa59~tplv-k3u1fbpfcp-watermark.image?)

**安装Babel以及相关依赖**
- `babel-loader`：编译ES6语法转化为ES5的语法
- `@babel/core` Babel 编译的核心包
- `@babel/preset-env` Babel 编译的预设，预设中内置了许多ES5实现ES6语法的方法

```js
npm i babel-loader @babel/core @babel/preset-env -D
```

**配置Babel**
```js
module.exports = {
    // ...
    // 加载器
    module: {
        rules: [
            // ...
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除node_modules代码不编译
                loader: 'babel-loader'
            }
        ],
    },
    // ...
};
```
**Babel的配置有两种方法，一种是在webpack的loader中配置，还有一种是单独的配置文件配置**

- 在webpack中配置

```js
module.exports = {
    // ...
    // 加载器
    module: {
        rules: [
            // ...
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除node_modules代码不编译
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            // 预设
                            presets: [
                                '@babel/preset-env'
                            ],
                        }
                    }
                ]
            }
        ],
    },
    // ...
};
```

- 单独提取出来配置，babel.config.js
```js
module.exports = {
    // 预设
    presets: [],
};
```

**再次运行`npx webpack`, 可以看的出来，经过Babel转化后，输出的文件，把ES6的语法都转化成了ES6之前的语法了**
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d5b2710b1c64e508cf8e8403fc313a8~tplv-k3u1fbpfcp-watermark.image?)

#### 2.9.2、js的静态检查

静态检查是为了统一代码风格，减少bug，节约开发时间。

**安装Eslint**

```js
npm i eslint-webpack-plugin eslint -D
```

**在webpack中使用Eslint**

```js
// 引入Eslint插件
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

module.exports = {
    // ...
    // 插件
    plugins: [
        // ...
        new ESLintWebpackPlugin({
            // 指定检查文件的根目录
            // 主要为了排除检查dist目录下的js文件
            context: path.resolve(__dirname, "src"),
        })
    ],
    // ...
};
```

**Eslint配置**

新建`.eslintrc.js`文件，并根据官网规则配置

比较出名的几个规则：
-   [Eslint 官方的规则open in new window](https://eslint.bootcss.com/docs/rules/)：`eslint:recommended`
-   [Vue Cli 官方的规则open in new window](https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-eslint)：`plugin:vue/essential`
-   [React Cli 官方的规则open in new window](https://github.com/facebook/create-react-app/tree/main/packages/eslint-config-react-app)：`react-app`

```js
module.exports = {
  // 继承 Eslint 规则
  extends: ["eslint:recommended"],
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  rules: {
    "no-var": 2, // 不能使用 var 定义变量
  },
};
```

**如果你是使用vs-code的话，可以配合vs-code的Eslint插件，在没有编译之前就看到错误**

因为默认是检查所有的文件，所以我们打包后的dist目录下的文件就会报错，这时我们就需要配置`.eslintignore`文件来忽略检查dist目录

```js
# 忽略dist目录下所有文件
dist
```
### 2.10、处理css资源

#### 2.10.1、提取css文件

之前我们都是使用`style-loader`来处理css，它把css
打包到js中，在js文件加载的时候，创建一个style标签来生成样式，这样会出现网站的闪屏现象。

为了避免闪屏，我们希望css文件打包成单独的文件，并通过link标签来加载。

**安装`miniCss-extract-plugin`插件**

```js
npm i mini-css-extract-plugin -D
```

**配置**

这里需要注意的是，我们需要把`style-loader`，替换成`miniCss-extract-plugin`插件的loader，并且需要调用插件
```js
// ...
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    // ...
    // 加载器
    module: {
        rules: [
            // 处理css的loader
            {
                // 正则匹配文件
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
           // ...
        ],
    },
    // 插件
    plugins: [
        // ...
        // 提取css成单独文件
        new MiniCssExtractPlugin({
            // 定义输出文件名和目录
            filename: "static/css/index.css",
        }),
    ],
    // ...
```

**运行`npx webpack`打包，查看dist**

不难看出，我们的css文件已经被打包成单独的文件了，并且在打包输出的`index.html`中，css文件也被使用link标签加载了

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91314420d1644f27b957c0e24b1f0d66~tplv-k3u1fbpfcp-watermark.image?)

#### 2.10.2、css兼容性处理

CSS3的一些新特性在有的浏览器中不兼容，需要添加后缀或者前缀才能生效。


**下载依赖**

```js
npm i postcss-loader postcss postcss-preset-env -D
```

**配置**
```js
module.exports = {
    // ...
    // 加载器
    module: {
        rules: [
            // 处理css的loader
            {
                // 正则匹配文件
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "postcss-preset-env", // 能解决大多数样式兼容性问题
                                ],
                            },
                        },
                    }
                ]
            },
            // ...
        ],
    },
    // ...
};
```

**控制兼容性**

我们可以在 `package.json` 文件中添加 `browserslist` 来控制样式的兼容性做到什么程度。

```js
{
  // ...
  "browserslist": ["ie >= 8"]
}
```

想要知道更多的 `browserslist` 配置，查看[browserslist 文档](https://github.com/browserslist/browserslist)

以上为了测试兼容性所以设置兼容浏览器 ie8 以上。

实际开发中我们一般不考虑旧版本浏览器了，所以我们可以这样设置：

```js
{
  // ...
  "browserslist": ["last 2 version", "> 1%", "not dead"]
}
```

**查看效果**

在`index.html`中写一些存在兼容性的样式，比如：`display: flex;`，打包看输出文件；

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b63827afa19404fb7df1683392fa03c~tplv-k3u1fbpfcp-watermark.image?)

#### 2.10.3、压缩CSS

**安装依赖**

```js
npm i css-minimizer-webpack-plugin -D
```

**配置文件**

```js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  //...
  plugins: [
    // ...,
    // css压缩
    new CssMinimizerPlugin(),
  ],
  // ...
};
```

**查看优化**

因为有图片转为`base64`格式了，所以css文件看起来很多

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/adb3fbafc7d248e79fdb00eab74e8b3e~tplv-k3u1fbpfcp-watermark.image?)

#### 2.10.4、引入less或者sass

less跟sass跟css一样不能被webpack识别，需要借助loader来编译

less比起sass要简单许多，只需要配置`less-loader`就可以，sass需要`sass-loader`跟`sass`搭配起来使用

因为less、sass、stylu这些样式的配置基本一致，就不一个一个的去配置了，这里以`sass`为例

**安装依赖**
```js
npm i sass-loader sass -D
```

**配置**

```js
module.exports = {
    // ...
    module: {
        rules: [
            // ...
            // 处理sass
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "postcss-preset-env", // 能解决大多数样式兼容性问题
                                ],
                            },
                        },
                    },
                    "sass-loader"
                ],
            },
            // ...
        ],
    },
    // ...
};
```

### 2.11、区分环境

本地开发和部署线上，各自所看重的点是不一样的

**本地环境：**

-   不需要有输出文件，打包文件都在内存中
-   需要打印 debug 信息
-   需要`热更新`功能
-   错误提示应该使用 cheap-module-source-map
-   ...

**生产环境：**

-   代码压缩（Tree Shaking）、静态资源压缩
-   代码分割
-   需要压缩图片体积
-   错误提示应该使用 source-map
-   ...

根据不同的需求，就需要根据环境来区分不同的配置

1.  本地安装 cross-env [[文档地址](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fcross-env "https://www.npmjs.com/package/cross-env")]

```js
npm install cross-env -D
```

2.  配置启动命令

打开 `./package.json`

```js
"scripts": {
    "dev": "cross-env NODE_ENV=dev webpack serve --mode development", 
    "build": "cross-env NODE_ENV=prod webpack --mode production"
  },
```

3. 在配置文件`webpack.config.js`中获取环境变量

```js
const isProduction = process.env.NODE_ENV === 'prod'
console.log('process.env.NODE_ENV=', process.env.NODE_ENV) // 打印环境变量
```

4. 测试一下

`npm run build`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4904a7534be34363b1ab3ec76fa3602b~tplv-k3u1fbpfcp-watermark.image?)

`npm run dev`

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aac65ad781e04319b97a74205a66d996~tplv-k3u1fbpfcp-watermark.image?)

## 3、优化配置

在前面，我们已经把基本配置都配置好了，现在要对这些配置做一些优化，列如：提升打包构建速度、减少代码体积等

### 3.1、SourceMap

SourceMap（源代码映射）是一个用来生成源代码与构建后代码一一映射的文件的方案。

它会生成一个 xxx.map 文件，里面包含源代码和构建后代码每一行、每一列的映射关系。当构建后代码出错了，会通过 xxx.map 文件，从构建后代码出错位置找到映射后源代码出错位置，从而让浏览器提示源代码文件出错位置，帮助我们更快的找到错误根源。

这里我们就讲SourceMap的两种值（cheap-module-source-map、source-map），其它更多的配置，大家可以查看[Webpack DevTool 文档](https://webpack.docschina.org/configuration/devtool/)

1. cheap-module-source-map

-   主要用于开发模式中
-   优点：打包编译速度快，只包含行映射
-   缺点：没有列映射

新建一个js文件夹，并在文件夹中建立a.js文件，故意写入一点错误代码，然后运行`npm run dev`
```js
/* a.js */
export default function say() {
    console.log1('555')
}

/* main.js */
import say from './js/a'
say()
```

然后在控制台发现报错信息，它不能清晰的反映该错误是在哪一个文件中，因为我们打包后的文件都输出在main.js中

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e479055ce4f64db58b0ff130a71ef34e~tplv-k3u1fbpfcp-watermark.image?)

**配置devtool**

```js
module.exports = {
    // ...
    devtool: "cheap-module-source-map",
};
```

**运行看效果**

它清晰的提示了在`a.js`中的第二行中出现了错误

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d45c2d5d6344dd1a26ea9f53d192b81~tplv-k3u1fbpfcp-watermark.image?)

2. source-map

-   主要用于生产模式
-   优点：包含行/列映射
-   缺点：打包编译速度更慢

**配置devtool**

```js
module.exports = {
    // ...
    devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
};
```

### 3.2、提升打包构建速度

#### 3.2.1、HotModuleReplacement（HMR/热模块替换）

`HotModuleReplacement`（HMR/热模块替换）：在程序运行中，替换、添加或删除模块，而无需重新加载整个页面。

开发时我们修改了其中一个模块代码，`Webpack`默认会将所有模块全部重新打包编译，速度很慢。

所以我们需要做到修改某个模块代码，就只有这个模块代码需要重新打包编译，其他模块不变，这样打包速度就能很快。

**基本配置**
webpack默认是开启HMR功能的，不过此时 css 样式经过 style-loader 处理，已经具备 HMR 功能了。 但是 js 还不行，js需要我们在入口文件`mian.js`中手动配置。

`module.hot.accept`接收两个参数，第一个参数是需要开启HMR功能的模块，第二个参数是一个可选的回调函数（在模块更新前需要做的事情，如果没有可不传）

我们新建一个`sum.js`来测试这个功能

```js
/* webpack.config.js */
module.exports = {
  // 其他省略
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot: true, // 开启HMR功能（只能用于开发环境，生产环境不需要了）
  },
};

/* main.js */
import sum from './js/sum'
sum(5, 6)

// 判断是否支持HMR功能
if (module.hot) {
    module.hot.accept("./js/sum");
}

/* sum.js */
export default function sum(x, y) {
    return x + y
}
```

**随便改变一下sum.js中的值**
```js
export default function sum(x, y) {
    return x + y - 1
}
```

在控制台可以看到页面没有全部刷新，只更新了`sum.js`这一个文件

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/210de9e1d8f14b569782559da3dccb3b~tplv-k3u1fbpfcp-watermark.image?)

这样的方式只能自己一个一个的添加，十分的麻烦，所以在实际项目中，我们一般都是使用其它loader来实现的。比如：[vue-loaderopen in new window](https://github.com/vuejs/vue-loader), [react-hot-loader](https://github.com/gaearon/react-hot-loader)。

#### 3.2.2、OneOf

打包时每个文件都会经过所有 loader 处理，虽然因为 `test` 正则原因实际没有处理上，但是都要过一遍。比较慢。

顾名思义就是只能匹配上一个 loader, 剩下的就不匹配了。

**使用**

使用方法很简单，把loader全部放进`oneOf: []`中就可以了

```js
module.exports = {
    // ...
    // 加载器
    module: {
        rules: [
            {
                oneof: [
                    // ...
                ]
            }
        ]
    },
     // ...
};
```

#### 3.2.3、Include/Exclude

开发时我们需要使用第三方的库或插件，所有文件都下载到 node_modules 中了。而这些文件是不需要编译可以直接使用的。

所以我们在对 js 文件处理时，要排除 node_modules 下面的文件。

-   include

包含，只处理 xxx 文件

-   exclude

排除，除了 xxx 文件以外其他文件都处理

**使用**

```js
module.exports = {
    // ...
    // 加载器
    module: {
        rules: [
            {
                oneof: [
                    // ...
                    {
                        test: /\.js$/,
                        // exclude: /node_modules/, // 排除node_modules代码不编译
                        include: path.resolve(__dirname, "../src"), // 也可以用包含
                        loader: 'babel-loader'
                    }
                ]
            }
        ],
    },
    // 插件
    plugins: [
        new ESLintWebpackPlugin({
            // 指定检查文件的根目录
            context: path.resolve(__dirname, "src"),
            exclude: "node_modules", // 默认值
        }),
        // ...
    ],
    // ...
};
```
#### 3.2.4、缓存（Cache）

`Cache`，利用缓存可以大幅度提高构建速度，

每次打包时 js 文件都要经过 Eslint 检查 和 Babel 编译，速度比较慢。

我们可以缓存之前的 Eslint 检查 和 Babel 编译结果，这样第二次打包时速度就会更快了。

**配置**

开启缓存的配置也很简单，因为babel-loader跟eslint已经内置了缓存功能，只需要开启就好了。

-   babel-loader的缓存位置： `node_modules/.cache/babel-loader`
-   eslint的缓存位置我们可以自己设置
```js
module.exports = {
    // ...
    // 加载器
    module: {
        rules: [
            {
                oneof: [
                    // ...
                    {
                        test: /\.js$/,
                        // exclude: /node_modules/, // 排除node_modules代码不编译
                        include: path.resolve(__dirname, "../src"), // 也可以用包含
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true, // 开启babel编译缓存
                            cacheCompression: false, // 缓存文件不要压缩
                        },
                    }
                ]
            }
        ],
    },
    // 插件
    plugins: [
        new ESLintWebpackPlugin({
            // ...
            cache: true, // 开启缓存
            // 缓存目录
            cacheLocation: path.resolve(
                __dirname,
                "../node_modules/.cache/.eslintcache"
            )
        }),
        // ...
    ],
    // ...
};
```

#### 3.2.5、多进程（Thread）

> 如果项目规模较小或者打包速度还可以的话，不建议配置多进程，因为每一个进程开启和通信都需要耗费一定的时间（每个进程启动就有大约为 600ms 左右开销），这样反而会增加时间成本。

**获取电脑的cpu核心数**
每个电脑`cpu核心数`都不一样，我们启动的进程就是电脑的`cpu核心数`。

```js
// nodejs核心模块，直接使用
const os = require("os");
// cpu核数
const threads = os.cpus().length;
```

**安装依赖**

```js
npm i thread-loader -D
```
**配置**
```js
// nodejs核心模块，直接使用
const os = require("os");

const TerserPlugin = require("terser-webpack-plugin");
// cpu核数
const threads = os.cpus().length;

module.exports = {
    // ...
    // 加载器
    module: {
        rules: [
            {
                oneOf: [
                    // ...
                    {
                        test: /\.js$/,
                        // exclude: /node_modules/, // 排除node_modules代码不编译
                        include: path.resolve(__dirname, "../src"), // 也可以用包含
                        use: [
                            {
                                loader: "thread-loader", // 开启多进程
                                options: {
                                    workers: threads, // 数量
                                },
                            },
                            {
                                loader: "babel-loader",
                                options: {
                                    cacheDirectory: true, // 开启babel编译缓存
                                },
                            },
                        ],
                    }
                ]
            }
        ],
    },
    // 插件
    plugins: [
        // ...
        new ESLintPlugin({
            // 检测哪些文件
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules", // 默认值
            cache: true, // 开启缓存
            cacheLocation: path.resolve(
                __dirname,
                "../node_modules/.cache/eslintcache"
            ),
            threads, // 开启多进程和设置进程数量
        }),
        // 多进程
        new TerserPlugin({
            parallel: threads // 开启多进程
        })
    ],
    // ...
};
```

### 3.3、减少代码体积

#### 3.3.1、Tree Shaking

`Tree Shaking` 是一个术语，通常用于描述移除 JavaScript 中的没有使用上的代码。

 > 注意：它依赖 `ES Module`。

- Webpack 已经默认开启了这个功能，无需其他配置。

#### 3.3.2、Babel

- `@babel/plugin-transform-runtime`: 禁用了 Babel 自动对每个文件的 runtime 注入，而是引入 `@babel/plugin-transform-runtime` 并且使所有辅助代码从这里引用。

Babel 为编译的每个文件都插入了辅助代码，使代码体积过大！

Babel 对一些公共方法使用了非常小的辅助代码，比如 `_extend`。默认情况下会被添加到每一个需要它的文件中。

你可以将这些辅助代码作为一个独立模块，来避免重复引入。

**安装依赖**

```js
npm i @babel/plugin-transform-runtime -D
```

**配置**

配置也相对简单，只需要在`babel-loader`中引用插件就好

```js
module.exports = {
    // ...
    // 加载器
    module: {
        rules: [
            {
                oneOf: [
                    // ...
                    {
                        test: /\.js$/,
                        // exclude: /node_modules/, // 排除node_modules下的文件，其他文件都处理
                        include: path.resolve(__dirname, "../src"), // 只处理src下的文件，其他文件不处理
                        use: [
                            {
                                loader: "thread-loader", // 开启多进程
                                options: {
                                    works: threads, // 进程数量
                                },
                            },
                            {
                                loader: "babel-loader",
                                options: {
                                    // presets: ["@babel/preset-env"],
                                    cacheDirectory: true, // 开启babel缓存
                                    cacheCompression: false, // 关闭缓存文件压缩
                                    plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                                },
                            },
                        ],
                    },
                ]
            }
        ],
    },
    // ...
};
```
#### 3.3.3、图片压缩（Image Minimizer）

开发如果项目中引用了较多图片，那么图片体积会比较大，将来请求速度比较慢。

我们可以对图片进行压缩，减少图片体积。

> 注意：如果项目中图片都是在线链接，那么就不需要了。本地项目静态图片才需要进行压缩。

**安装依赖**

```js
npm i image-minimizer-webpack-plugin imagemin -D
```

这个插件还需要配合其它的包一起使用，它有两种模式可以选择（推荐使用`cnpm`安装，`npm`安装总是失败）

-   无损压缩

```js
cnpm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D
```

-   有损压缩

```js
cnpm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo -D
```

> [有损/无损压缩的区别](https://baike.baidu.com/item/%E6%97%A0%E6%8D%9F%E3%80%81%E6%9C%89%E6%8D%9F%E5%8E%8B%E7%BC%A9)

**配置**

我们以无损压缩配置为例：

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin")
module.exports = {
    // ...
    // 插件
    plugins: [
        // ...
        // 压缩图片
        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminGenerate,
                options: {
                    plugins: [
                        ["gifsicle", { interlaced: true }],
                        ["jpegtran", { progressive: true }],
                        ["optipng", { optimizationLevel: 5 }],
                        [
                            "svgo",
                            {
                                plugins: [
                                    "preset-default",
                                    "prefixIds",
                                    {
                                        name: "sortAttrs",
                                        params: {
                                            xmlnsOrder: "alphabetical",
                                        },
                                    },
                                ],
                            },
                        ],
                    ],
                },
            },
        }),
    ],
    // ...
};
```

**这里存在一个问题，就是webpack给我们提供了一个存放压缩文件的配置项（optimization），我们前面使用了css压缩、js压缩、图片压缩这些，我们需要把他提取到`optimization`中去，这样我们的配置文件才能更加的清晰**

这个配置比较简单，主要是把插件中关于压缩文件的都放进去就行了，记得把插件中的调用删除奥

```js
module.exports = {
    // ...
    // 压缩配置
    optimization: {
        minimize: true, // 开启最小化
        minimizer: [
            // css压缩也可以写到optimization.minimizer里面，效果一样的
            new CssMinimizerPlugin(),
            // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
            new TerserPlugin({
                parallel: threads, // 开启多进程
            }),
            // 压缩图片
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminGenerate,
                    options: {
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 5 }],
                            [
                                "svgo",
                                {
                                    plugins: [
                                        "preset-default",
                                        "prefixIds",
                                        {
                                            name: "sortAttrs",
                                            params: {
                                                xmlnsOrder: "alphabetical",
                                            },
                                        },
                                    ],
                                },
                            ],
                        ],
                    },
                },
            }),
        ]
    },
    // ...
};
```

### 3.4、优化代码运行性能/体验

#### 3.4.1、代码分割（Code Split）

打包代码时会将所有 js 文件打包到一个文件中，体积太大了。我们如果只要渲染首页，就应该只加载首页的 js 文件，其他文件不应该加载。

所以我们需要将打包生成的文件进行代码分割，生成多个 js 文件，渲染哪个页面就只加载某个 js 文件，这样加载的资源就少，速度就更快。

代码分割（Code Split）主要做了两件事：

- 分割文件：将打包生成的文件进行分割，生成多个 js 文件。
- 按需加载：需要哪个文件就加载哪个文件。

**多入口代码分割**

1.新建一个demo演示，目录结构：

```js
├── public
├── src
|   ├── js
|   |   └── sum.js
|   ├── app.js
|   └── main.js
├── package.json
└── webpack.config.js
```
2.  安装依赖

```js
npm i webpack webpack-cli html-webpack-plugin -D
```

3.  新建文件

内容无关紧要，主要观察打包输出的结果

app.js

```js
console.log('app')
import { sum } from './js/sum'
console.log(sum(7,8))
```

main.js

```js
console.log('main')
import { sum } from './js/sum'
console.log(sum(5,6))
```

sum.js
```js
export default function sum(x, y) {
    return x + y
}
```

4.  配置文件
```js
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // 单入口
    // entry: './src/main.js',
    // 多入口
    entry: {
        main: "./src/main.js",
        app: "./src/app.js",
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        // [name]是webpack命名规则，使用chunk的name作为输出的文件名。
        // 什么是chunk？打包的资源就是chunk，输出出去叫bundle。
        // chunk的name是啥呢？ 比如： entry中xxx: "./src/xxx.js", name就是xxx。注意是前面的xxx，和文件名无关。
        // 为什么需要这样命名呢？如果还是之前写法main.js，那么打包生成两个js文件都会叫做main.js会发生覆盖。(实际上会直接报错的)
        filename: "js/[name].js",
        clear: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
    mode: "production",
};
```

5.  运行指令

```js
npx webpack
```

此时在 dist 目录我们能看到输出了两个 js 文件。

总结：配置了几个入口，至少输出几个 js 文件。

6.提取重复文件

通过输出文件，我们可以看出来，如果多入口文件中都引用了同一份代码，我们不希望这份代码被打包到两个文件中，导致代码重复，体积更大。
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc473583af59479a8767f3218e6b2773~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/223dc08cb748416d81593e2d6e7e0736~tplv-k3u1fbpfcp-watermark.image?)

我们需要提取多入口的重复代码，只打包生成一个 js 文件，其他文件引用它就好。

- 修改配置

```js
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 单入口
  // entry: './src/main.js',
  // 多入口
  entry: {
    main: "./src/main.js",
    app: "./src/app.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    // [name]是webpack命名规则，使用chunk的name作为输出的文件名。
    // 什么是chunk？打包的资源就是chunk，输出出去叫bundle。
    // chunk的name是啥呢？ 比如： entry中xxx: "./src/xxx.js", name就是xxx。注意是前面的xxx，和文件名无关。
    // 为什么需要这样命名呢？如果还是之前写法main.js，那么打包生成两个js文件都会叫做main.js会发生覆盖。(实际上会直接报错的)
    filename: "js/[name].js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  mode: "production",
  optimization: {
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 以下是默认值
      // minSize: 20000, // 分割代码最小的大小
      // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
      // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
      // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
      // maxInitialRequests: 30, // 入口js文件最大并行请求数量
      // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      // cacheGroups: { // 组，哪些模块要打包到一个组
      //   defaultVendors: { // 组名
      //     test: /[\/]node_modules[\/]/, // 需要打包到一起的模块
      //     priority: -10, // 权重（越大越高）
      //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
      //   },
      //   default: { // 其他没有写的配置会使用上面的默认值
      //     minChunks: 2, // 这里的minChunks权重更大
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // },
      // 修改配置
      cacheGroups: {
        // 组，哪些模块要打包到一个组
        // defaultVendors: { // 组名
        //   test: /[\/]node_modules[\/]/, // 需要打包到一起的模块
        //   priority: -10, // 权重（越大越高）
        //   reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
        // },
        default: {
          // 其他没有写的配置会使用上面的默认值
          minSize: 0, // 我们定义的文件体积太小了，所以要改打包的最小文件体积
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

- 运行

```js
npx webpack
```

此时我们会发现生成 3 个 js 文件，其中有一个就是提取的公共模块。


**单入口代码分割**

回到我们之前的项目中进行配置，其实一般使用的都是默认值

```js
module.exports = {
    // ...
    // 压缩配置
    optimization: {
        //...
        // 代码分割配置
        splitChunks: {
            chunks: "all", // 对所有模块都进行分割
            // 其他内容用默认配置即可
        }
    }
    // ...
};
```

#### 3.4.2 按需加载

1.新增`count.js`文件

```js
export default function count(x, y) {
    return x - y
}
```

2.配置

main.js
```js
// ...
document.getElementById('btn').onclick = function () {
    console.log('4444')
    // eslint会对动态导入语法报错，需要修改eslint配置文件
    // webpackChunkName: "count"：这是webpack动态导入模块命名的方式
    // "count"将来就会作为[name]的值显示。
    import(/* webpackChunkName: "count" */ "./js/count.js").then((count) => {
        console.log(count.default(5, 2));
    });
}
```

.eslintrc.js
```js
// 需要安装插件：npm i eslint-plugin-import -D

module.exports = {
    // ...
    plugins: ["import"], // 解决动态导入import语法报错问题
    //...
};
```

public/index.html
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div class="box1"></div>
    <div class="box2"></div>
    <div class="box3"></div>
    <i class="iconfont icon-bluetoothoff"></i>
    <i class="iconfont icon-DND_mode"></i>
    <i class="iconfont icon-camera"></i>
    <button id="btn">减法计算</button></button></button>
</body>
</html>
```

3.运行

运行`npm run dev`，就可以在开发服务器上测试了，第一次点击按钮才回去加载`count.js`文件

![6.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/130a500c9f074d48b2e61ad7b56d8d57~tplv-k3u1fbpfcp-watermark.image?)

#### 3.4.3、统一命名

webpack 文件指纹策略是将文件名后面加上 hash 值。例如我们在基础配置中用到的：`filename: "[name][hash:8][ext]"`

这里里面 `[]` 包起来的，就叫占位符，它们都是什么意思呢？请看下面这个表 👇🏻

| 占位符         | 解释                 |
| ----------- | ------------------ |
| ext         | 文件后缀名              |
| name        | 文件名                |
| path        | 文件相对路径             |
| folder      | 文件所在文件夹            |
| fullhash    | 每次构建生成的唯一 hash 值   |
| chunkhash   | 根据 chunk 生成 hash 值 |
| contenthash | 根据文件内容生成hash 值     |

`fullhash`、`chunkhash`、`contenthash`的区别

-   **fullhash（webpack4 是 hash）** ：每次修改任何一个文件，所有文件名的 hash 至都将改变。所以一旦修改了任何一个文件，整个项目的文件缓存都将失效；
-   **chunkhash**：根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的哈希值。我们 js 和 css 是同一个引入，会共享一个 hash 值；
-   **contenthash**：根据文件内容生成 hash 值，只有文件内容变化了，hash 值才会变化。所有文件 hash 值是独享且不同的；

有了以上的知识，我们就可以根据不同的占位符来配置一下了

```js
module.exports = {
    // 输出
    output: {
        // ...
        filename: "static/js/[name].[contenthash:8].js", // 入口文件打包输出资源命名方式
        chunkFilename: "static/js/[name].[contenthash:8].chunk.js", // 动态导入输出资源命名方式
        assetModuleFilename: "static/media/[name].[hash][ext]", // 图片、字体等资源命名方式（注意用hash）
    },
    // 加载器
    module: {
        rules: [
            {
                oneOf: [
                    // ...
                    // 处理图片资源
                    {
                        test: /\.(png|jpe?g|gif|webp)$/,
                        type: "asset",
                        parser: {
                            dataUrlCondition: {
                                maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
                            }
                        },
                        // generator: {
                        //     // 将图片文件输出到 static/imgs 目录中
                        //     // 将图片文件命名 [hash:8][ext][query]
                        //     // [hash:8]: hash值取8位
                        //     // [ext]: 使用之前的文件扩展名
                        //     // [query]: 添加之前的query参数
                        //     filename: "static/imgs/[hash:8][ext][query]",
                        // },
                    },
                    // 字体、图标、视频
                    {
                        test: /\.(ttf|woff2?|mp4|avi)$/,
                        type: "asset/resource",
                        // generator: {
                        //     filename: "static/asset/[hash:8][ext][query]",
                        // },
                    }
                ]
            }
        ],
    },
    // 插件
    plugins: [
        // ...
        // 提取css成单独文件
        new MiniCssExtractPlugin({
            // 定义输出文件名和目录
            filename: "static/css/[name].[contenthash:8].css",
            chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
        }),
    ],
    // ...
};
```

#### 3.4.4、runtime配置

-   问题：

当我们修改 math.js 文件再重新打包的时候，因为 contenthash 原因，math.js 文件 hash 值发生了变化（这是正常的）。

但是 main.js 文件的 hash 值也发生了变化，这会导致 main.js 的缓存失效。明明我们只修改 math.js, 为什么 main.js 也会变身变化呢？

-   原因：

    -   更新前：math.xxx.js, main.js 引用的 math.xxx.js
    -   更新后：math.yyy.js, main.js 引用的 math.yyy.js, 文件名发生了变化，间接导致 main.js 也发生了变化

-   解决：

将 hash 值单独保管在一个 runtime 文件中。

我们最终输出三个文件：main、math、runtime。当 math 文件发送变化，变化的是 math 和 runtime 文件，main 不变。

runtime 文件只保存文件的 hash 值和它们与文件关系，整个文件体积就比较小，所以变化重新请求的代价也小。

```js
module.exports = {
    // ...
    // 压缩配置
    optimization: {
        // ...
        // 提取runtime文件
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}`, // runtime文件命名规则
        },
    },
    // ...
};
```

#### 3.4.5、Preload / Prefetch

-   `Preload`：告诉浏览器立即加载资源。
-   `Prefetch`：告诉浏览器在空闲时才开始加载资源。

它们共同点：

-   都只会加载资源，并不执行。
-   都有缓存。

它们区别：

-   `Preload`加载优先级高，`Prefetch`加载优先级低。
-   `Preload`只能加载当前页面需要使用的资源，`Prefetch`可以加载当前页面资源，也可以加载下一个页面需要使用的资源（浏览器空闲的时候进行资源的拉取）。

总结：

-   当前页面优先级高的资源用 `Preload` 加载。
-   下一个页面需要使用的资源用 `Prefetch` 加载。

它们的问题：兼容性较差。

**安装依赖**

```js
npm i @vue/preload-webpack-plugin -D
```

**配置**
```js
// ...
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");

module.exports = {
    // ...
    // 插件
    plugins: [
        // ...
        new PreloadWebpackPlugin({
            rel: "preload", // preload兼容性更好
            as: "script",
            // rel: 'prefetch' // prefetch兼容性更差
        }),
    ],
    // ...
};
```

#### 3.4.6、Core-js

`core-js` 是专门用来做 ES6 以及以上 API 的 `polyfill`。

`polyfill`翻译过来叫做垫片/补丁。就是用社区上提供的一段代码，让我们在不兼容某些新特性的浏览器上，使用该新特性。

主要是解决一些`babel`无法解决的兼容性问题，如：async函数、promise对象等

**安装依赖**

```js
npm i core-js -D
```

**配置**
babel.config.js
```js
module.exports = {
    // 预设
    presets: [
        [
            "@babel/preset-env",
            // 按需加载core-js的polyfill
            { useBuiltIns: "usage", corejs: { version: "3", proposals: true } },
        ],
    ],
};
```

#### 3.4.7、PWA

提供项目的离线体验，即在离线状态下也可以访问项目

**安装依赖**
```js
npm i workbox-webpack-plugin -D
```

**配置**
```js
// ...
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
    // ...
    // 插件
    plugins: [
        // ...
        new WorkboxPlugin.GenerateSW({
            // 这些选项帮助快速启用 ServiceWorkers
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true,
        }),
    ],
    // ...
};
```

## 系列文章

[webpack原理篇](https://juejin.cn/post/7120505769052602405/)

> 博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。