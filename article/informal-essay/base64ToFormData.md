---
title: 上传文件base64流转formData
date: 2022-08-15
tags:
 - javascript
 - 随笔
categories: 
 - javascript
---

## 前言

前几天在项目中遇到一个以前都没有接触过的问题，觉得很有意思记录一下

场景是这样的

我们项目中有一个语音上传（用的elment的upload组件），这个语音上传有两种方式：

    - 1、直接选择文件上传；

    - 2、输入文字，利用TTS能力转为语音，然后在上传。

是不是看起来都挺正常的🥲，但是问题就出在，TTS能力不是自己公司的，它返回的是一个`base64`流，这样就导致先前的上传接口不支持（因为它是直接接收`FormData`的，不支持`base64`的），经过一段时间的（~~百度~~）思考，得出下列的思路：

1.将base64格式的图片处理为Blob对象。
2.将Blob对象添加到formData对象中。
3.http请求头设置为context-type: multipart/form-data上送到文件服务器。

### 实现


```javascript

/*base64文件流*/
const base64String

// 处理base64文件流
function(base64String) {
    //这里对base64串进行操作，去掉url头，并转换为byte
    const bstr = window.atob(base64String.split(',')[1]) // 使用atob() 将base64 转为文本文件
    let n = bstr.length
    const u8arr = new Uint8Array(n) // 创建一个二进制数据缓冲区，可以理解为一个数组
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n) // 将文本文件转为UTF-16的ASCII, 放到类型化数组对象中
    }
    //Blob对象
    const blob = new Blob([u8arr], { type: 'audio/wav' })
    // FormData对象
    const fd = new FormData()
    // 把文件追加到FormData对象中
    fd.append('autoCall_file', blob, Date.now() + '.wav')
    return fd
}


// 上传到服务器
function httpRequest(formData) {
    return axios({
        method: 'post',
        url: 'xxxxx', // 你的文件服务器地址
        data: formData,
        timeout: formData,
        headers: {
            'Content-Type': 'multipart/form-data', // 请求头要设置为 form-data
            'Cache-Control': 'no-cache',
        },
    });
}
```

不得不说，活到老学到老，每次接触新知识都是满满的动力
