---
title: canvas基础
date: 2022-09-25
tags:
 - javascript
 - canvas
categories: 
 - javascript
---


## 前言

怎么突然提到 `canvas` 呢❓其实是因为工作中有一个小需求，就是给特定的区域做水印😤，思来想去😎就选择使用 `canvas` 去做，简单效果如下：

[代码片段](https://code.juejin.cn/pen/7145712486715490339)

实现思路🤷‍♂️：封装一个全局指令（这里案列是私有指令），利用`canvas`画出一块带水印文字的背景图，然后在需要的地方使用就行（很简单吧🥰）。

不过这个不是重点，这次我们的重点是 `canvas`。

## 1、canvas 简介

`canvas` 即画布的意思，是 `HTML5` 新增的元素🆕，主要用来绘制图形。它可以用来制作照片集或者制作简单(也不是那么简单)的动画，甚至可以进行实时视频处理和渲染😲。

## 2、canvas的基本使用

```js
<canvas id="canvas" width="300" height="300">
    当前的浏览器版本不支持，请升级浏览器
</canvas>
```

`<canvas>` 标签，只有两个可选的属性 `width` 和 `height`，分别设置标签的高度与宽度，默认值为`width` ：300、`height` ： 150。
 
> **注意⚡⚡** \
> 使用 `css` 也可以设置 `<canvas>` 标签的宽高属性。\
> 不过我们不推荐使用 `css` 设置宽高属性，因为当 `css` 设置的宽高属性与初始比例不一致时会出现扭曲。

### 兼容性

可以看得出来，现在流行的浏览器基本都支持 `canvas` 标签，只有 `IE9` （IE应该没有人在用了吧🤢）之下的浏览器不支持，所以我们可以放心的使用。

[can i use兼容性截图](https://caniuse.com/?search=canvas)，感兴趣的可以去看一下， `canvas` 的一些api的兼容性。
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30d0dec7b8274f1d98340835307ec800~tplv-k3u1fbpfcp-watermark.image?)

当浏览器不兼容的时候，就会显示我们标签中的备选文案（`当前的浏览器版本不支持，请升级浏览器`）。

> ⚡⚡需要注意的是 `canvas` 标签的结束标签 `</canvas>` 是不可省略的，如果省略的话，文档的其它内容就会被当成 `备选文案`，而不会显示出来🤦‍♂️。

### 使用canvas画一个简单的矩形

`<canvas>` 会创建一个固定大小的画布，同时会公开一个或多个**画笔**(渲染上下文)，使用**画笔**来绘制和处理要展示的内容。

在这里我们重点研究 2D 渲染上下文。 其他的上下文我们暂不研究，比如， WebGL 使用了基于 OpenGL ES的3D 上下文 ("experimental-webgl") 。

```js
// 获取canvas元素对象
let canvas = document.getElementById('canvas')
// 使用getContext函数来获取画笔
let ctx = canvas.getContext('2d')
// 设置颜色
ctx.fillStyle = 'green'
// 绘制矩形
ctx.fillRect(100, 100, 150, 100)
```

执行上例代码，我们就可以得到如下的一个矩形😲：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f38d6eceacbe4412a3a3873d817772b3~tplv-k3u1fbpfcp-watermark.image?)

我们分析一下上述的代码，以栅格的图来描述可以得到以下图片（一个格子为50）：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef377be3210347c7893cdf53a53913e7~tplv-k3u1fbpfcp-watermark.image?)

可以看得出来，我们`画图`的起点为`画布`的左上角，坐标为 (0,0) 。所有元素的位置都相对于原点来定位。所以图中矩形左上角的坐标为距离左边（X 轴）x 像素，距离上边（Y 轴）y 像素，坐标为 (x,y)😿。

> 绘制矩形的三种api
> -   fillRect(x, y, width, height)：绘制一个填充的矩形。
> -   strokeRect(x, y, width, height)：绘制一个矩形的边框。
> -   clearRect(x, y, widh, height)：清除指定的矩形区域，然后这块区域会变得完全透明。


## 3、绘制路径（path）

`<canvas>` 只支持一种原生的图形绘制：**矩形**。所有其他图形都至少需要生成一种路径 (`path`)🙀。

-  图形的基本元素是路径。
-  路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。
-  一个路径，甚至一个子路径，都是闭合的。

**使用路径绘制图形需要一些额外的步骤：**

1.  创建路径起始点
2.  调用绘制方法去绘制出路径
3.  把路径封闭
4.  一旦路径生成，通过描边或填充路径区域来渲染图形。

下面是需要用到的方法🤱：

-  `beginPath()`：新建一条路径，路径一旦创建成功，图形绘制命令被指向到路径上生成路径。
-  `moveTo(x, y)`：把画笔移动到指定的坐标`(x, y)`。相当于设置路径的起始点坐标
-  `lineTo(x, y)`：绘制一条从当前位置到指定 x 以及 y 位置的直线。
-  `closePath()`：闭合路径之后，图形绘制命令又重新指向到上下文中。
-  `stroke()`：通过线条来绘制图形轮廓。
-  `fill()`：通过填充路径的内容区域生成实心的图形。

接下来就用这些方法随意绘制一个图形📈：

```js
// 获取canvas元素对象
let canvas = document.getElementById('canvas')
// 使用getContext函数来获取画笔
let ctx = canvas.getContext('2d')
// 开启路径绘制
ctx.beginPath();
// 移动画笔起点到(50,50)
ctx.moveTo(50, 50);
// 描述路径的行进
ctx.lineTo(180, 50);
ctx.lineTo(250, 100);
ctx.lineTo(250, 200);
// 封闭路径，closePath会自动封闭路径
ctx.closePath();
// 描边颜色
ctx.strokeStyle = 'red'
 //描边。stroke不会自动closePath()
ctx.stroke();
// 填充颜色
ctx.fillStyle = 'blue'
//描边。fill会自动closePath()
ctx.fill();
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab9209d87edb4a4aa52c00d93b59a482~tplv-k3u1fbpfcp-watermark.image?)

> **⚡⚡需要注意的是：** 在绘制路径的时候选择不关闭路径（closePath），这个时候会实现自封闭现象（只针对fill，stroke不生效）👍。

## 4、绘制圆弧

有两个方法可以绘制圆弧：

1、arc(x, y, r, startAngle, endAngle, anticlockwise)😦

-  以`(x, y)` 为圆心，以`r` 为半径，从 `startAngle` 弧度开始到`endAngle`弧度结束。
-  `anticlosewise` 是布尔值，`true` 表示逆时针，`false` 表示顺时针(默认是顺时针)。

**⚡⚡注意：**

1.  这里的度数都是弧度(在顺时针的情况下，如果两个参数的差为Math.PI * 2，则代表绘制一个圆)。
2.  `0` 弧度是指的 `x` 轴正方向。
```js
radians=(Math.PI/180)*degrees   //角度转换成弧度
```

2、arcTo(x1, y1, x2, y2, radius): 根据给定的控制点和半径画一段圆弧，最后再以直线连接两个控制点。

```js
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

ctx.beginPath();
ctx.arc(50, 50, 40, 0, Math.PI / 2, false);
ctx.stroke()

ctx.beginPath();
ctx.arc(150, 50, 40, 0, -Math.PI / 2, true);
ctx.closePath();
ctx.stroke();

ctx.beginPath();
ctx.arc(50, 150, 40, 0, Math.PI * 2, false);
ctx.closePath();
ctx.stroke();

ctx.beginPath();
ctx.moveTo(200, 200);
//参数1、2：控制点1坐标   参数3、4：控制点2坐标  参数4：圆弧半径
ctx.arcTo(300, 200, 200, 300, 100);
ctx.stroke();
```
😿😿😿

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/399c026b45d44614a1bc2095916591ee~tplv-k3u1fbpfcp-watermark.image?)

~~`canvas` 居然还能画贝塞尔曲线，不对不能画。（其实是我不想学🐶，想了解的去官网看文档啊）~~

## 5、线条

线条有4个属性😲：

### 1、lineWidth（线宽）🤷‍♂️

只能是正值，默认是 1.0。起始点和终点的连线为中心，**上下各占线宽的一半**。

```js
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

// 线宽10
ctx.beginPath();
ctx.moveTo(10, 10);
ctx.lineTo(100, 10);
ctx.lineWidth = 10;
ctx.stroke();

// 线宽20
ctx.beginPath();
ctx.moveTo(110, 10);
ctx.lineTo(160, 10)
ctx.lineWidth = 20;
ctx.stroke()

// 红线，中心线
ctx.beginPath();
ctx.moveTo(0, 10);
ctx.lineTo(200, 10)
ctx.strokeStyle = "red";
ctx.lineWidth = 2;
ctx.stroke()
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/729de5385169480e9f1c954d9947000b~tplv-k3u1fbpfcp-watermark.image?)

### 2、lineCap（线条末端样式）🤖
-  `butt`：线段末端以方形结束
-  `round`：线段末端以圆形结束
-  `square`：线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

```js
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
// 三种样式
let lineCaps = ["butt", "round", "square"];

// 分别绘制三种样式的线条
for (let i = 0; i < 3; i++){
    ctx.beginPath();
    ctx.moveTo(20 + 30 * i, 30);
    ctx.lineTo(20 + 30 * i, 100);
    ctx.lineWidth = 20;
    ctx.lineCap = lineCaps[i];
    ctx.stroke();
}

// 红线
ctx.beginPath();
ctx.moveTo(0, 30);
ctx.lineTo(300, 30);

ctx.moveTo(0, 100);
ctx.lineTo(300, 100)

ctx.strokeStyle = "red";
ctx.lineWidth = 1;
ctx.stroke();
```
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e54b37c5d91f4526a61dcd604b16e59e~tplv-k3u1fbpfcp-watermark.image?)

### 3、lineJoin（线条与线条间接合处的样式）📚
-  `round` 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
-  `bevel` 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
-  `miter`(默认) 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。

```js
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

// 三种连接样式
let lineJoin = ['round', 'bevel', 'miter'];
// 线宽
ctx.lineWidth = 20;
for (var i = 0; i < lineJoin.length; i++){
    ctx.lineJoin = lineJoin[i];
    ctx.beginPath();
    ctx.moveTo(50, 50 + i * 50);
    ctx.lineTo(100, 100 + i * 50);
    ctx.lineTo(150, 50 + i * 50);
    ctx.lineTo(200, 100 + i * 50);
    ctx.lineTo(250, 50 + i * 50);
    ctx.stroke();
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa94255ca95d438bb8cd7e5604f92608~tplv-k3u1fbpfcp-watermark.image?)

### 4、虚线🫥

用 `setLineDash` 方法和 `lineDashOffset` 属性来制定虚线样式。 
-  `setLineDash` 方法接受一个数组，来指定线段与间隙的交替；
-  `lineDashOffset`属性设置起始偏移量。

```js
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

ctx.setLineDash([20, 5]);  // [实线长度, 间隙长度]
ctx.lineDashOffset = 5; // 起始偏移量为5
ctx.strokeRect(50, 50, 100, 100);
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b6c22d045ab4d0a82dcf48030ba24a9~tplv-k3u1fbpfcp-watermark.image?)

## 6、文本绘制

我为了做个水印学了这么多东西！！！🙀🙀

**绘制文本的两种方法**

-  `fillText(text, x, y [, maxWidth])` 在指定的 (x,y) 位置填充指定的文本，绘制的最大宽度是可选的。
-  `strokeText(text, x, y [, maxWidth])` 在指定的 (x,y) 位置绘制文本边框，绘制的最大宽度是可选的。

至于它们两个的区别，大家可以从下列的案例中清晰的看出来🙋

```js
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

ctx.font = "50px sans-serif"
ctx.fillText("我爱学习", 10, 100);
ctx.strokeText("不信你看", 10, 200)
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4692eb60a4424f3ca50b23f28263acb6~tplv-k3u1fbpfcp-watermark.image?)

对了，文本还有一点小知识，就是控制文本的样式🙁：

-  `font = value` 当前我们用来绘制文本的样式。这个字符串使用和 `CSS font` 属性相同的语法。 默认的字体是 `10px sans-serif`。
-  `textAlign = value` 文本对齐选项。 可选的值包括：`start`, `end`, `left`, `right` or `center`。 默认值是 `start`。
-  `textBaseline = value` 基线对齐选项，可选的值包括：`top`, `hanging`, `middle`, `alphabetic`, `ideographic`, `bottom`。默认值是 `alphabetic。`。
-  `direction = value` 文本方向。可能的值包括：`ltr`, `rtl`, `inherit`。默认值是 `inherit`。

## 7、图片绘制📌

~~其实这个我是不喜欢学的，但是想了下以后自己可以画一些😳...~~

绘制图片使用的是 `drawImage()` 方法，这个方法有九个参数‼️😮

drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

-  `image` 参数表示绘制的图片；
-  `sx`,`sy` 表示 `image` 的矩形（裁剪）选择框的左上角 X 轴和 Y 轴坐标；
-  `sWidth`,`sHeight` 表示 `image` 的矩形（裁剪）选择框的宽高（也可以认为是缩放比例）；
-  `dx`,`dy` `image` 的左上角在目标画布上 X 轴和 Y 轴坐标。
-  `dWidth`，`dHeight` 表示`image` 在目标画布上绘制的宽高。

**关于两个不同坐标和宽高的区别，大家可以从下图跟概念结合理解一样😨**

[图片来源：MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3905fcd1576446db137ad305eb1403a~tplv-k3u1fbpfcp-watermark.image?)

**实践**

```js
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let img = new Image();   // 创建img元素
// 防止图片还未加载完成就绘制，从而抛出异常
img.onload = function(){
    ctx.drawImage(img, 0, 0, 300, 200)
}
img.src = 'https://img0.baidu.com/it/u=824605453,878308716&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'; // 设置图片源地址
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e77b5291007e4092b5936590ff43605a~tplv-k3u1fbpfcp-watermark.image?)


## 8、状态

`Canvas` 的状态就是当前画面应用的所有样式和变形的一个快照📷。

`save` 和 `restore` 方法是用来保存和恢复 `canvas` 状态的，都没有参数🔢。

1、关于 save() ：Canvas状态存储在栈中，每当save()方法被调用后，当前的状态就被推送到栈中保存。
 一个绘画状态包括：
-   当前应用的变形（即移动，旋转和缩放）
-    `strokeStyle`, `fillStyle`, `globalAlpha`, `lineWidth`, `lineCap`, `lineJoin`, `miterLimit`, `shadowOffsetX`, `shadowOffsetY`, `shadowBlur`, `shadowColor`, `globalCompositeOperation 的值`
- 当前的裁切路径（`clipping path`）

> **可以调用任意多次 `save`方法**(类似数组的`push()`)。

2、关于restore()：每一次调用 restore 方法，上一个保存的状态就从栈中弹出，所有设定都恢复(类似数组的 `pop()`)。

```js
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

ctx.fillRect(0, 0, 150, 150);   // 使用默认设置绘制一个矩形
ctx.save();                  // 保存默认状态

ctx.fillStyle = 'red'       // 在原有配置基础上对颜色做改变
ctx.fillRect(15, 15, 120, 120); // 使用新的设置绘制一个矩形
ctx.save();                  // 保存当前状态

ctx.fillStyle = '#FFF'       // 再次改变颜色配置
ctx.fillRect(30, 30, 90, 90);   // 使用新的配置绘制一个矩形

ctx.restore();               // 重新加载之前的颜色状态
ctx.fillRect(45, 45, 60, 60);   // 使用上一次的配置绘制一个矩形

ctx.restore();               // 加载默认颜色配置
ctx.fillRect(60, 60, 30, 30);   // 使用加载的配置绘制一个矩形
```

## 9、变形

### 9.1、translate

用来移动 `canvas` 的**原点**到指定的位置。

`translate(x, y)`：接受两个参数。`x` 是左右偏移量，`y` 是上下偏移量。

> 注意⚡⚡：`translate` 移动的是 `canvas` 的坐标原点(坐标变换)。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b514a094c9254e749f765402b50e4c2e~tplv-k3u1fbpfcp-watermark.image?)

```js
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
ctx.save(); // 保存坐原点平移之前的状态
ctx.translate(100, 100);// 平移坐标原点
ctx.strokeRect(0, 0, 100, 100)
ctx.restore(); //恢复到最初状态
ctx.translate(220, 220);
ctx.fillRect(0, 0, 100, 100)
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef399d80bb1e4a76a6edc5b5330ec6de~tplv-k3u1fbpfcp-watermark.image?)

### 9.2、rotate

旋转坐标轴。

`rotate(angle)`：只接受一个参数：旋转的角度(angle)，它是顺时针方向的，以弧度为单位的值。

> 注意⚡⚡：旋转的中心是坐标原点

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d313424fac14470ab9592ae198752fb~tplv-k3u1fbpfcp-watermark.image?)

```js
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
ctx.fillStyle = "red";
ctx.save(); // 保存旋转前的状态

ctx.translate(100, 100); // 平移坐标原点
ctx.rotate(Math.PI / 180 * 45); // 旋转
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, 100, 100);

ctx.restore(); // 恢复到之前的状态
ctx.fillRect(0, 0, 50, 50)
ctx.restore();
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86ef4deba1ee42baa3a2c8088c6fefc4~tplv-k3u1fbpfcp-watermark.image?)

### 9.3、scale

增减图形在 `canvas` 中的像素数目，对形状，位图进行缩小或者放大。

`scale(x, y)`：`x,y` 分别是横轴和纵轴的缩放因子，可以为负数。值默认对 `1.0`，小于`1.0`则缩小，大于则放大。如果参数为负实数，相当于以 x 或 y 轴作为对称轴镜像反转。

> 默认情况下，`canvas` 的 1 单位就是 1 个像素。举例说，如果我们设置缩放因子是 0.5，1 个单位就变成对应 0.5 个像素，这样绘制出来的形状就会是原先的一半。

```js
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
ctx.save() // 保存初始状态
ctx.strokeStyle = "red";
ctx.strokeRect(100, 100, 100, 100);
ctx.scale(1.5, 1.5) // 放大1.5倍
ctx.strokeStyle = "blue";
ctx.strokeRect(100, 100, 100, 100);
ctx.restore() // 回退到初始状态
ctx.scale(-1, 1);
ctx.font = '48px serif';
ctx.fillText('canvas', -200, 50);
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd7de8250ba049b9a9362a3c2dc32e8c~tplv-k3u1fbpfcp-watermark.image?)

### 9.4、transform (变形矩阵)

#### `transform(a, b, c, d, e, f)`😳

这个方法是将当前的变形矩阵乘上一个基于自身参数的矩阵，如下面的矩阵所示：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51dd306662dd418cb48ab750cc3c6ca9~tplv-k3u1fbpfcp-watermark.image?)

如果任意一个参数是 `Infinity`，变形矩阵也必须被标记为无限大，否则会抛出异常。

这个函数的参数各自代表如下：

-   `a (m11)`：水平方向的缩放

-   `b(m12)`：竖直方向的倾斜偏移

-   `c(m21)`：水平方向的倾斜偏移

-   `d(m22)`：竖直方向的缩放

-   `e(dx)`：水平方向的移动

-   `f(dy)`：竖直方向的移动


#### `setTransform(a, b, c, d, e, f)`😮

这个方法会将当前的变形矩阵重置为单位矩阵，然后用相同的参数调用 `transform`方法。如果任意一个参数是无限大，那么变形矩阵也必须被标记为无限大，否则会抛出异常。从根本上来说，该方法是取消了当前变形，然后设置为指定的变形，一步完成。

#### `resetTransform()`🔃

重置当前变形为单位矩阵，它和调用以下语句是一样的：`ctx.setTransform(1, 0, 0, 1, 0, 0);`

一个简单的案例

```js
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
ctx.translate(100, 100);
ctx.transform(1, 1, 0, 1, 0, 0);
ctx.fillRect(0, 0, 100, 10);
ctx.setTransform(-1, 0, 0, 1, 100, 100);
ctx.fillStyle = "rgba(255, 128, 255, 0.5)";
ctx.fillRect(0, 50, 100, 100);
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f7a91945a374ac9bab7a49c712f6368~tplv-k3u1fbpfcp-watermark.image?)

## 10、组合与裁剪

### 10.1、组合

`globalCompositeOperation = type` 这个属性设定了在画新图形时采用的遮盖策略，其值是一个标识 12 种遮盖方式的字符串。

```js
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, 200, 200);

ctx.globalCompositeOperation = "source-over"; //  组合，共12种样式
ctx.fillStyle = "red";
ctx.fillRect(100, 100, 200, 200);
```
> **注**：下面的展示中，蓝色表示旧的（即之前画布中的图形），红色为新的。

-  `source-over` 默认设置，新图像会覆盖在原有图像。😺。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0158d8ae18ad42f4955692579b1ce055~tplv-k3u1fbpfcp-watermark.image?)

-  `source-in` 只绘制新旧图形重叠的部分，其他区域全部透明（绘制新图形）😺。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5aa4c8494c804637a6970dd06cee2609~tplv-k3u1fbpfcp-watermark.image?)

-  `source-out` 只绘制新旧图形没有重叠的部分，其他区域全部透明（绘制新图形）😸。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b20320a644f2464d96d2077d2e8f761d~tplv-k3u1fbpfcp-watermark.image?)

-  `source-atop` 新图形只绘制与旧图形内容重叠的地方，旧图形正常绘制（新图形位于旧图形上方）😹。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d2124a14dc6459da004ccb7162bd775~tplv-k3u1fbpfcp-watermark.image?)

-  `destination-over` 新图像会在老图像的下面😻。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/898199cbbfc144a98c0e3172de746b14~tplv-k3u1fbpfcp-watermark.image?)

-  `destination-in` 只绘制新旧图形重叠的部分，其他区域全部透明（绘制旧图形）😼。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c604236e0c544307904833c0bd0ddb73~tplv-k3u1fbpfcp-watermark.image?)

-  `destination-out` 只绘制新旧图形没有重叠的部分，其他区域全部透明（绘制旧图形）😽。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d15d87b05e54402b571544ba0759007~tplv-k3u1fbpfcp-watermark.image?)

-  `destination-atop` 旧图形只绘制与新图形内容重叠的地方，新图形正常绘制（旧图形位于新图形上方）🙀。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eea57ba2681143cd97bf5f8ce89c4c25~tplv-k3u1fbpfcp-watermark.image?)

-  `lighter`  新老图像都显示，两个重叠图形的颜色是通过颜色值相加来确定的😿。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b303ec05ea96443cb7266dcf2d2523ce~tplv-k3u1fbpfcp-watermark.image?)

-  `darken` 保留重叠部分最黑的像素。(每个颜色位进行比较，得到最小的)😾。
```
blue: #0000ff
red: #ff0000
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bfa5b6ee9e1b47d0936552fa961ecf15~tplv-k3u1fbpfcp-watermark.image?)

-  `lighten`  保证重叠部分最亮的像素。(每个颜色位进行比较，得到最大的)🐈。
 ```
blue: #0000ff
red: #ff0000
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/487251706ef1474986b76cc270ab9a83~tplv-k3u1fbpfcp-watermark.image?)

-  `xor`  重叠部分会变成透明🐈‍⬛。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07ad65ea990e4abfb47cd863ffc037ac~tplv-k3u1fbpfcp-watermark.image?)

-  `copy` 只有新图像会被保留，其余的全部被清除(变透明)🙀。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd4621b2c2cc4c42bd16633c6cdb5480~tplv-k3u1fbpfcp-watermark.image?)

### 10.2、裁切路径

裁切路径和普通的 canvas 图形差不多，不同的是它的作用是遮罩，用来隐藏不需要的部分。

`clip()` 将当前正在构建的路径转换为当前的裁剪路径✂️。

> 默认情况下，canvas 有一个与它自身一样大的裁切路径（也就是没有裁切效果）。

```js
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
ctx.fillRect(50,50,150,150) // 绘制一个矩形
ctx.translate(125,125) // 移动坐标原点到矩形中心点
// 设置一个圆形裁剪路径
ctx.beginPath();
ctx.arc(0,0,60,0,Math.PI*2,true);
ctx.clip();
// 填充圆形路径
ctx.fillStyle = '#143778';
ctx.fillRect(-75,-75,150,150);
// 绘制三角形
for (var j=1;j<50;j++){
    ctx.save();
    ctx.fillStyle = '#fff';
    // 在圆形中随机取坐标原点
    ctx.translate(125-Math.floor(Math.random()*150), 125-Math.floor(Math.random()*150));
    // 绘制三角形
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.lineTo(0,5)
    ctx.lineTo(5,0)
    ctx.closePath()
    ctx.fillStyle = '#e8e8e8'
    ctx.fill();
    ctx.restore();
}
```
首先，我画了一个黑色方形作为背景，然后移动原点至中心点。然后用 `clip` 方法创建一个弧形的裁切路径。裁切路径也属于 canvas 状态的一部分，可以被保存起来。如果我们在创建新裁切路径时想保留原来的裁切路径，我们需要做的就是保存一下 canvas 的状态。

裁切路径创建之后所有出现在它里面的东西才会画出来。然后会绘制出 50 颗随机位置分布（经过缩放）的三角形，当然也只有在裁切路径里面的三角形才会绘制出来。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2942297169234e8dbe975d98c0274bc0~tplv-k3u1fbpfcp-watermark.image?)

## 10、动画

### 10.1、动画的基本步骤：

你可以通过以下的步骤来画出一帧：

1.  **清空 canvas** 除非接下来要画的内容会完全充满 canvas（例如背景图），否则你需要清空所有。最简单的做法就是用 `clearRect` 方法。
2.  **保存 canvas 状态** 如果你要改变一些会改变 canvas 状态的设置（样式，变形之类的），又要在每画一帧之时都是原始状态的话，你需要先保存一下。
3.  **绘制动画图形（animated shapes）**  这一步才是重绘动画帧。
4.  **恢复 canvas 状态** 如果已经保存了 canvas 的状态，可以先恢复它，然后重绘下一帧。

### 10.2、控制动画🦍

在 canvas 上绘制内容是用 canvas 提供的或者自定义的方法，而通常，我们仅仅在脚本执行结束后才能看见结果，比如说，在 for 循环里面做完成动画是不太可能的。

因此，为了实现动画，我们需要一些可以定时执行重绘的方法。我们可以通过以下三种方法来实现定时重绘。
-  `setInterval`
-  `setTimeout`
-  `requestAnimationFrame`

贴一个时钟案例给大家看一下

[代码片段](https://code.juejin.cn/pen/7147863871468863488)


今天的文章就到这里啦，如果需要后续更加深入的`canvas` 知识，大家可以评论，我在去总结🫂。

## 参考

[MDN：canvas教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)

> 博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。
