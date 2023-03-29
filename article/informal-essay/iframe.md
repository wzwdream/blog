---
title: iframe之间的通信
date: 2023-02-15
tags:
 - javascript
 - 随笔
categories:
 - javascript
---

## 前言

`iframe` 想必大家都挺熟悉的了，就不多说了👍👍。写这篇文章的初衷主要是丰富自己的知识和解决遇到的问题。因为我基本上没接触过 `iframe` ，所以对它的通信方式不是很了解。前几天，跟我的一个朋友（[在下杨公子](https://juejin.cn/user/2032320262973112)）聊天时，他提到了 `iframe` 的通信方式，我觉得很有意思，就开始了解和学习。在这篇文章中，我将分享我所学到的内容，希望对大家有所帮助🤪🤪。

接下来我们就一起来学习一下关于 `iframe` 通信的相关知识吧😁

## iframe通信的几种方式😶‍🌫️😶‍🌫️

1. **URL 传参**：父窗口可以通过在 iframe 的 src 属性后添加参数来向子窗口传递数据，子窗口可以通过 `location.search` 或 `location.hash` 来获取参数✨✨。

- 使用 `?` 拼接参数，子页面使用 `location.search` 接收参数
```js
// parent.html
<iframe id="iframe1" src="./child1.html?name=来自parent的消息" frameborder="0"></iframe>

// child1.html
<script>
  console.log(window.decodeURIComponent(location.search)) // ?name=来自parent的消息
</script>
```
- 使用 `#` 拼接参数，子页面使用 `location.hash` 接收参数，同时还可以使用 `window.onhashchange` 来监听参数的变化。
```js
// parent.html
<iframe id="iframe1" src="./child1.html#name=来自parent的消息" frameborder="0"></iframe>
<script>
const iframe1 = document.getElementById('iframe1')
// 在2s后更改hash
setTimeout(() => {
    iframe1.src = './child1.html#age=12'
}, 2000)
</script>

// child1.html
<script>
console.log('hash', window.decodeURIComponent(location.hash)) // #name=来自parent的消息
window.onhashchange = () => {
    console.log('hashchange', window.location.hash) // #age=12
}
</script>
```

>⚡⚡需要注意的是通过 `URL 传参` 的时候，传输携带中文的话，记得使用 `decodeURIComponent` 进行解码。


2. **window.postMessage**：安全、可靠且支持跨域的 iframe 通信方式，它可以在两个窗口之间异步传递消息✨✨✨✨✨。

- 在发送方中，使用 `window.postMessage()` 方法向另一个窗口发送消息。该方法接收两个参数：要发送的消息和目标窗口的源（例如，`"http://127.0.0.1:5500/child.html"` 或 `"*"`）。

```js
window.postMessage('Hello world!', 'http://127.0.0.1:5500/child.html')
```

- 在接收方中，使用 `window.addEventListener()` 方法监听 `message` 事件。该事件对象包含三个属性：`data` 表示接收到的数据，`origin` 表示发送方的源，`source` 表示发送方窗口的引用。

```js
window.addEventListener('message', function(event) {
  // 判断消息是否来自可信任的源
  if (event.origin === 'http://127.0.0.1:5500/child.html') {
    console.log('message: ' + event.data)
  }
})
```
**兼容性**，来自 [window.postMessage | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f49102949b224b579f43b71e7e0f5aba~tplv-k3u1fbpfcp-watermark.image?)

3. **window.name**：可以使用一个隐藏的iframe和window.name属性在不同的窗口之间共享数据✨✨。

-  在子页面中，将要传递给父页面的数据保存在 `window.name` 属性中。

例如

```js
window.name = 'Hello Parent!';
```

-  在父页面中，创建一个隐藏的 iframe 元素，并且将其源设置为`子页面的 URL`。

```js
const iframe = document.createElement('iframe');
iframe.style.display = 'none';
iframe.src = 'http://127.0.0.1:5500/child1.html';
document.body.appendChild(iframe);
```

-  在父页面中，等待 iframe 加载完成后，通过访问 `iframe.contentWindow.name` 属性来获取子页面中保存的数据。

```js
iframe.onload = function() {
  const childData = iframe.contentWindow.name;
   onsole.log('message:', childData); // 输出：message: Hello Parent!
};
```

> ⚡⚡注意：使用 `window.name` 进行跨域 iframe 通信存在安全性问题，因为所有具有相同名称的窗口都可以访问和修改 `window.name`。

4. **服务器端转发**：可以将消息从一个iframe发送到服务器，然后再由服务器将其转发到另一个iframe。✨✨✨

> 博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。