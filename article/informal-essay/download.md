---
title: 关于前端下载的一些问题
date: 2023-01-15
tags:
 - javascript
 - 随笔
categories:
 - javascript
---

## 前言〽️

前端文件下载应该是一个老生常谈的问题了😆，这次主要是结合自己最近在项目中的实践和百度来的一些下载方式，如果有遗漏或者错误的地方，希望大家及时指出🙇。

## 1、a标签🥇

a标签下载应该是目前大家用的最多的下载文件的方式了吧，毕竟它简单明了。

a标签分两种：直接a标签点击下载（download属性）、模拟a标签下载。本质上都是一样的，只是实现方式不一致而已😺。

### 1.1、a标签的download✨✨✨

`download` 属性是HTML5新增的属性，主要解决不能直接下载**浏览器可以打开预览的文件**的问题，例如：txt、png、jpg等文件。接下来看一下兼容性，主流浏览器大部分都支持这个属性，如果要向下兼容建议采用其它的方式进行下载👍。（截图来源于 [Can I use](https://caniuse.com/?search=a%3Adownload)）

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a13ef20e0c9344c69250ab6c1777361a~tplv-k3u1fbpfcp-watermark.image?)

> ⚡注意：下载跨域文件会导致 `download` 属性失效。

- 用法🤪

`download` 属性可以指定下载的文件的文件名，如果有属性值则该属性值就是下载后的文件的文件名。

```js
<a href="test.jpg" download>点击下载</a> // 默认文件名
<a href="test.jpg" download="1.jpg">点击下载</a> // 指定文件名1.jpg
```

## 2、模拟a标签下载✨✨✨✨✨

这里也没什么特别的，就是我们熟知的文件流转 `blob/base64`下载，只不过是为了方便整理才起的这个标题名🙇。

### 2.1、利用blob（URL.createObjectURL）👍

利用 `URL对象` 的 `createObjectURL` 方法去读取文件流，然后通过 `js` 去模拟 `a` 标签点击来下载文件。

兼容性查询，可以看出来主流浏览器基本上都兼容此方法🤪。（截图来源于 [Can I use]( https://caniuse.com/?search=createObjectURL )）

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ab876077bbd4ec3910fe119aebeef86~tplv-k3u1fbpfcp-watermark.image?)

```js
/**
* 下载文件 
* @param {String} blob - 文件流(blob格式)。
* @param {String} fileName - 下载文件的名字（考虑到兼容性问题，最好加上后缀名)
*/
function downloadFile(blob, fileName) {
    // 读取文件流
    const url = window.URL.createObjectURL(blob)
    // 创建a标签并设置属性
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    // 释放之前创建的URL 对象
    window.URL.revokeObjectURL(url)
}
```
### 2.2、使用base64（FileReader.readAsDataURL）👍

`readAsDataURL()` 方法会异步读取指定的 `Blob` 或 `File` 对象，并在读取完成时，通过 `onload` 回调函数的 `result` 属性返回 `data:URL` 格式的字符串（base64编码）。

兼容性查询，可以看出来主流浏览器基本上都兼容此方法🤪。（截图来源于 [Can I use](https://caniuse.com/?search=readAsDataURL)）

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b1f7f4dac5f48989d09b1fc108be59b~tplv-k3u1fbpfcp-watermark.image?)

```js
/**
* 下载文件 
* @param {String} blob - 文件流(blob格式)。
* @param {String} fileName - 下载文件的名字（考虑到兼容性问题，最好加上后缀名)
*/
function downloadFile(blob, fileName) {
    // 读取文件流
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    // 读取完成的回调事件
    reader.onload = (e) => {
        // 创建a标签并设置属性
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = e.target.result
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }
}
```

> ⚡注意：在 `api` 返回 `blob` 的时候需要在请求头中设置 `responseType` 为 `'blob'`。

## 3、open/location.href✨

应该是最简单直接的下载了吧，不过大部分时间都不能满足我们的需求，所以现在用的比较少了。

**用法**

```js
window.open('downloadFile.zip');
location.href = 'downloadFile.zip';
```

> ⚡使用该方法需要注意：URL长度限制、url编码、浏览器可直接浏览的文件类型是不提供下载的，如txt、png、jpg、gif等、不能添加header，也就不能进行鉴权、无法知道下载的进度等问题。

## 4、form表单✨✨

应该是最传统的文件下载方式了吧，很多新特性都是在H5才出的，兼容性应该也是最好的。

实现方式也很简单，通过js动态创建form表单，然后利用form表单的提交来获取文件。

```js
/**
* 下载文件
* @param {String} downloadUrl - 请求的地址
* @param {String} fileName - 文件名
*/
function downloadFile (downloadUrl, fileName) {
    // 创建表单
    const formObj = document.createElement('form')
    formObj.action = downloadUrl
    formObj.method = 'get'
    formObj.style.display = 'none'
    // 创建input，用于传参
    const formItem = document.createElement('input');
    formItem.value = fileName
    formItem.name = 'fileName'
    formObj.appendChild(formItem)
    document.body.appendChild(formObj)
    // 发送请求
    formObj.submit()
    // 清除form表单
    document.body.removeChild(formObj)
}
```

> ⚡注意：浏览器可直接浏览的文件类型如txt、png、jpg、gif等不能通过此方法下载。

## 4、通过iframe下载✨✨✨

`iframe` 下载文件跟 `a` 标签下载文件基本一致，同样不能下载浏览器可以浏览的文件。

**说实话，iframe接触的比较少，如果有错误或者不足的地方请大家补充，谢谢🙏🙏。**

```js
/**
* 下载文件
* @param {String} downloadUrl - 请求的地址
* @param {String} fileName - 文件名
*/
function downloadFile (downloadUrl, fileName) {
    // 创建iframe 
    const iframe = document.createElement("iframe")
    iframe.style.display = "none"
    iframe.src = downloadUrl
    document.body.appendChild(iframe)
    // 异步删除iframe标签
    setTimeout(() => iframe.remove(), 5 * 60 * 1000)
)
```

## 结尾🔚

本文主要是总结自己知道/用过的下载文件的方法，如果有什么不足或者错误之处，请大家及时指正🙏。

> 博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。