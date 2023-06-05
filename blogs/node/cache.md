---
title: http缓存详解
date: 2023-06-05
tags:
 - node
 - http
categories:
 - node
 - http
---


## 引言📇

HTTP缓存是一种用于提高网站性能和减少带宽使用的技术。当用户访问一个网页时，浏览器会下载页面上的所有资源（如HTML、CSS、JavaScript等），这些资源会占用大量的带宽和时间。为了减少这些资源的加载时间，HTTP缓存机制被引入。📚︎

缓存分为**强缓存**和**协商缓存**两种，强缓存不能缓存地址栏访问的文件，协商缓存可以缓存地址栏访问的文件。

## 1、强缓存🛅

由服务器设置过期时间，在该时间到期之前，浏览器会直接从本地缓存中获取资源。

**强缓存**的实现方式有两种：`Expires`和`Cache-Control`。

### 1.1、Expires❤️❤️🤍🤍🤍

`Expires` 是 HTTP 缓存机制中实现强缓存的一种方式，它通过在响应头部中加入一个过期时间来控制缓存。`Expires` 的值是一个日期，格式为：`Wed, 21 Oct 2015 07:28:00 GMT`。它表示该资源的过期时间。当浏览器再次请求该资源时，会判断是否在该过期时间内，如果是则直接从缓存中获取资源，否则重新向服务器请求。

要设置 `Expires` 头部，需要在服务器端进行配置。例如，在 Nginx 中可以使用expires指令来设置过期时间：

```config
location / {
    expires 1h;
}
```

> 注意⚡⚡：由于Expires是基于客户端时间计算的，如果客户端的时间与服务器的时间不一致，则可能会影响缓存效果。

### 1.2、Cache-Control❤️❤️❤️🤍🤍

`Cache-Control` 是通过在响应头部中加入 `Cache-Control` 字段，并设置max-age值来表示该资源在多少秒内有效（即缓存的最大时长）。

`Cache-Control`响应头的最常用格式为：

```js
Cache-Control: max-age=<seconds> // seconds 是缓存的时间，单位是秒
```

当浏览器请求资源得到的响应头中带有 `Cache-Control` 响应头时，浏览器会将该资源缓存到本地。在下一次访问该资源时，同时满足下述条件，浏览器就会使用本地资源（即缓存），而不重新去服务器请求该资源：

1.  缓存时间未过期
2.  URL未发生变化
3.  请求头中没有 `Cache-Control: no-cache` 或 `Pragma: no-cache` 这两个信息（强制刷新会在请求头中添加  `Cache-Control: no-cache`）

> 注意⚡⚡：直接通过浏览器的地址栏访问的资源缓存会失效（跟强制刷新一样会在请求头中添加  `Cache-Control: no-cache`）

接下来我们通过一个简单的页面来实践一下：

目录结构，我们准备两个文件 `index.js` 和 `index.html` ，再准备两张图片：

```yml
http
|--- index.js
|--- index.html
|--- 1.jpg
|___ 2.jpg
```

**index.js**

提供一个 node 服务，用于返回浏览器请求的资源（index.html 和图片）

```js
// index.js
const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {

  let filePath = path.resolve(__dirname, req.url === '/' ? `index.html` : '1.jpg')

  res.writeHead(200, {
    'Content-Type': req.url === '/' ? 'text/html; charset=utf-8' : 'image/png',
    'Cache-Control': 'max-age=86400', // 缓存一天
  })
  const fileStream = fs.createReadStream(filePath)
  return fileStream.pipe(res)
})

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

server.listen(8080, () => {
  console.log(`opened server on http://localhost:${server.address().port}`)
})
```

**index.html**

一个简单的页面，包含一张图片，因为我们会直接通过浏览器的地址栏访问 `html`，所以 `html` 的缓存策略会失效。这里我们判断缓存是否生效是通过页面中的图片去判断的。

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello World</title>
</head>
<body>
  <h1>Hello World!</h1>
  <!-- 别忘记替换成你的图片名称 -->
  <img src="./1.jpg" title="123">
</body>
</html>
```

然后随便准备两张图片就可以了，我们在项目的跟目录使用 `node index.js` 来启动项目。如下图提示，就表示启动成功，然后我们通过浏览器访问 `http://localhost:8080/` 就能看到我们的页面了。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f199b4c404a645f6bf0b9484aa719fd6~tplv-k3u1fbpfcp-watermark.image?)

**首次请求**
我们主要看图片的请求头跟响应头就行（因为html的缓存会失效）。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df08eb2c462f4c6bb2aa6d655653867c~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09c9a387c7db41f5b5ac0ab546cc08f8~tplv-k3u1fbpfcp-watermark.image?)

**刷新页面（非强制刷新）**

第二次的请求可以看到请求的 `Size` 变成了 `memory cache`，并且 `Time` 也变为了 0。再进一步看请求头和响应头，请求头中的 `Cache-Control: no-cache` 属性没有了，并且浏览器会给出一个警告：`Provisional headers are shown. Disable cache to see full headers.`。大致意思就是当前使用的是缓存的临时文件，禁用缓存后才可以查看完整的请求头。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c0d7e374104467c91cd181359bfea6a~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83c66bd8cbef4fccad2cb14467463bab~tplv-k3u1fbpfcp-watermark.image?)

**验证缓存**

上述的方法可能并不一定让你相信我们使用的是缓存文件，而不是重新请求的资源文件。

一开始我们准备了两张图片，现在使用的是 `1.jpg`，还有一个 `2.jpg`，我们把 `1.jpg` 删除了，然后把`2.jpg` 改名成 `1.jpg`，然后刷新页面（非强制刷新），就会发现虽然我们图片更改了，但是图片并不是我们后面改名的那个图片，还是之前的图片。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e882db2f0764e0f864db9a3dfa28d6a~tplv-k3u1fbpfcp-watermark.image?)

强制刷新后就能看到，我们替换的图片生效了，请求头中也带上了 `Cache-Control: no-cache` 属性。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a245f218a424f929fcc10ffb69167f6~tplv-k3u1fbpfcp-watermark.image?)

## 2、协商缓存

利用浏览器和服务器之间的通信来确定是否需要重新获取资源。

协商缓存有两种实现方式：`If-Modified-Since` 和 `ETag`

当浏览器第一次请求资源时，服务器会返回该资源的 `ETag` 值和 `Last-Modified` 时间。当浏览器再次请求该资源时，它会将这些值作为请求头部的 `If-Modified-Since` 和 `If-None-Match` 字段发送给服务器。服务器会比较这些值与资源的当前状态，如果资源没有发生变化，服务器返回 `304 Not Modified` 响应，告诉浏览器可以使用缓存的资源。

如果资源已经发生了变化，服务器会返回新的资源，并更新 `ETag` 和 `Last-Modified` 。

### 2.1、If-Modified-Since ❤️❤️❤️❤️🤍

利用响应头的 `Last-Modified` 来设置缓存，并在下次请求的请求头中携带 `If-Modified-Since` 来判断该资源是否发生变化，如果发生变化则返回新的资源，并更新 `Last-Modified` 属性，如果没有发生变化，则返回 `304` 跟空的 `body`。

对强缓存的例子稍微修改一下

```js
// index.js
const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
  let filePath = path.resolve(__dirname, req.url === '/' ? `index.html` : '1.jpg')
  const stat = fs.statSync(filePath)
  const lastModified = stat.mtime.toUTCString()
  const header = {
    'Content-Type': req.url === '/' ? 'text/html; charset=utf-8' : 'image/png',
    'Last-Modified': lastModified
  }
  // 判断资源是否发生变化
  if (req.headers['if-modified-since'] === lastModified) {
    res.writeHead(304, header)
    res.end()
  } else {
    res.writeHead(200, header)
    const fileStream = fs.createReadStream(filePath)
    return fileStream.pipe(res)
  }
})

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

server.listen(8080, () => {
  console.log(`opened server on http://localhost:${server.address().port}`)
})
```

**首次请求**

响应头携带 `Last-Modified: Mon, 05 Jun 2023 08:57:17 GMT` 属性，告诉浏览器这个文件需要缓存。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da7d7f17126e4edebaa2009cf2f151e2~tplv-k3u1fbpfcp-watermark.image?)

**刷新页面（非强制刷新）**

第二次请求，响应状态码变为 `304`，并在请求头中携带 `If-Modified-Since: Mon, 05 Jun 2023 08:57:17 GMT` 属性，表示浏览器使用缓存文件。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c85f8ade9f5d4e36987ecadf42a90ce5~tplv-k3u1fbpfcp-watermark.image?)

**改变html文件**

把 html 中 的 `Hello World!` 改为 `Web Html`，并刷新页面（非强制刷新），发现响应状态码变为 `200` ，并且更新了页面和响应头的 `Last-Modified` 属性。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ff61f9b6c8f429a8c4ee8c2d7dfad83~tplv-k3u1fbpfcp-watermark.image?)

> 注意⚡⚡：如果资源的修改时间只精确到秒，而不是毫秒，可能会导致缓存失效。此外，如果服务器上的资源被修改了，但修改时间没有更新，也会导致缓存失效

### 2、ETag ❤️❤️❤️❤️❤️

`ETag` 基本上与 `If-Modified-Since` 一致， 利用响应头的 `Etag` 来设置缓存，并在下次请求的请求头中携带 `if-none-match` 来判断该资源是否发生变化，如果发生变化则返回新的资源，并更新 `Etag` 属性，如果没有发生变化，则返回 `304` 跟空的 `body`。

```js
const http = require('http')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const server = http.createServer((req, res) => {
  let filePath = path.resolve(__dirname, req.url === '/' ? `index.html` : '1.jpg')
  const fileContent = fs.readFileSync(filePath)
  const hash = crypto.createHash('md5').update(fileContent).digest('hex')
  const etag = `"${hash}"` // etag需要加双引号
  const header = {
    'Content-Type': req.url === '/' ? 'text/html; charset=utf-8' : 'image/png',
    'Etag': etag
  }
  if (req.headers['if-none-match'] === etag) {
    res.writeHead(304, header)
    res.end()
  } else {
    res.writeHead(200, header)
    const fileStream = fs.createReadStream(filePath)
    return fileStream.pipe(res)
  }
})

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

server.listen(8080, () => {
  console.log(`opened server on http://localhost:${server.address().port}`)
})
```

这里的测试证明就不写，不然这文章的字数就太水了，如果你们有兴趣可以自己尝试一下。

> 博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。