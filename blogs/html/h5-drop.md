---
title: HTML5-拖拽上传文件
date: 2021-10-29
tags:
 - 随笔
 - html
 - javascript
categories: 
 - html
 - javascript
---

## 实现思路
1、利用H5的`拖拽`事件，获取到拖进我们特定区域的文件数据（或者通过`input`元素获取文件）。\
2、通过`FileReader对象`\\`FileList对象`读取文件的文件流数据。
### 基础知识
#### 1、拖拽事件
主要用到的事件有：`drop`、`dragenter`、`dragover`、`dragleave`四个事件。
- `drop`：`当一个元素或是选中的文字被拖拽释放到一个有效的释放目标位置时，drop` 事件被抛出。
- `dragenter`：当拖动的元素或被选择的文本进入有效的放置目标时， `dragenter` 事件被触发。
- `dragover`：当元素或者选择的文本被拖拽到一个有效的放置目标上时，触发 `dragover `事件(每几百毫秒触发一次)。
- `dragleave`：当一个被拖动的元素或者被选择的文本离开一个有效的拖放目标时，将会触发`dragleave` 事件。
#### 2、[FileReader对象](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)
`FileReader` 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 或 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象指定要读取的文件或数据。
其中File对象可以是来自用户在一个[`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input)元素上选择文件后返回的[`FileList`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList)对象,也可以来自拖放操作生成的 [`DataTransfer`](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer "En/DragDrop/DataTransfer")对象,还可以是来自在一个[`HTMLCanvasElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement)上执行`mozGetAsFile()`方法后返回结果。\
`FileReader`的几个相关事件
- `FileReader.onload`：该事件会在文件读取完成后触发，其中event.target.result为文件读取的返回值。

```js
var reader = new FileReader();
reader.onload = event => {
    console.log(event.target.result)
};
```
- `FileReader.onerror`：该事件会在文件读取发生错误的时候触发，并抛出异常状态码值`reader.error.code`，一共有5个码值，分别代表不同的错误，如下：

```js
reader.onerror = () => {
  switch(reader.error.code) {
    case '1':
      alert('未找到文件')
      break
    case '2':
      alert('安全错误')
      break
    case '3':
      alert('读取被中断')
      break
    case '4':
      alert('文件不可读')
      break
    case '5':
      alert('编码错误')
      break
    default: 
      alert('文件读取失败')
  }
}
```
- ``FileReader`.onprogress`：该事件在开始读取文件时每5毫秒触发一次，可以使用该方法获取文件读取的进度，返回值`loaded`为当前已读取的大小，`total`为文件总大小。

```js
reader.onprogress = event => {
  console.log(`${event.loaded}/${event.total}`)
}
```
- 更多的`FileReader`的事件可以查看[`MDN文档`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)
#### 3、[FileList对象](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList)
`FileList`对象通常来自于`<input>`元素的`files`属性或者拖拽操作的元素的`dataTransfer`对象的`files`属性，是存储文件数据的一个对象。
## 具体实现
### 1、定义拖拽文件的特定区域
> 样式文件放在最后

```js
<div class="main">
  <p class="drop-text">拖拽文件到此上传文件/
      <span onclick="upload()">点击上传</span>
   </p>
  <div id="drop" class="drop-box">
  </div>
</div>
```
效果如下
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32e44193a5794578ba6bb60735e0204f~tplv-k3u1fbpfcp-watermark.image?)
### 2、拖拽文件事件-文件获取
> 这里有一个要点，就是拖拽事件需要阻止它的默认行为，不然不会触发后续的事件。

```js
// 获取dom元素
let droptarget = document.getElementById("drop")
// 文件流数组
let fileBlodArr = []
// 文件数组
let fileArr = []
// 拖拽上传事件
function handleEvent(event) {
    // 阻止事件的默认行为
    event.preventDefault();
    if (event.type === 'drop') {
      // 文件进入并松开鼠标,文件边框恢复正常
      droptarget.style.borderColor = '#a89b9b'
      for (let file of event.dataTransfer.files) {
        // 把文件保存到文件数组中
        fileArr.push(file)
        // 初始化文件
        filesToBlod(file)
      }
    } else if (event.type === 'dragleave') {
      // 离开时边框恢复
      droptarget.style.borderColor = '#a89b9b'
    } else {
      // 进入边框变为红色
      droptarget.style.borderColor = 'red'
    }
}
// 拖拽事件绑定
droptarget.addEventListener("dragenter", handleEvent);
droptarget.addEventListener("dragover", handleEvent);
droptarget.addEventListener("drop", handleEvent);
droptarget.addEventListener("dragleave", handleEvent);

```
效果如下：

![gif.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb17c61fe0ad479281c64231e3f0939d~tplv-k3u1fbpfcp-watermark.image?)
### 3、还有点击上传（`input`）上传事件

```js
// 获取input元素
let fileInput = document.getElementById('fileInput')
// 通过input框上传文件
fileInput.addEventListener("change", (event) => {
    // 上传的文件都会保存到文件数组中
    fileArr.push(event.target.files[0])
    filesToBlod(event.target.files[0])
})
// 点击上传-单击事件-通过js触发input事件
function upload() {
    fileInput.click()
}
```
至此，文件拖拽跟input选取文件的事件都做好了，下一步就是实现选中的文件预览以及读取文件
### 4、读取文件并实现上传文件预览
> 通过`FileReader`读取文件数据，把文件跟文件流分别保存在不同的数组中（方便预览文件删除），并且根据文件数组的下标给每个删除按钮都添加对应的id（删除操作），因为主要是学习拖拽上传文件，所以对效率方面没有考虑，如果有不足的地方请多多指教。

```js
// 文件处理函数
function filesToBlod(file) {
    // 创建文件对象
    reader = new FileReader()
    // 文件转为文件流
    reader.readAsDataURL(file)
    // 文件读取完成，根据类型不同显示不同的图标
    reader.onload = e => {
      // 把文件流放入文件流数组中
      fileBlodArr.push(e.target.result)
      // 创建单个文件预览
      let fileDiv = document.createElement('div')
      // 删除按钮
      let removeDiv = document.createElement('div')
      removeDiv.id = 'file' + '-' + fileBlodArr.length
      removeDiv.innerHTML = '×'
      // 文件名
      let fileName = document.createElement('p')
      fileName.innerHTML = file.name
      fileName.title = file.name
      // 缩略图-图片直接展示,其他文件根据文件类型展示不同的缩略图
      let img = document.createElement('img')
      if (/image/.test(file.type)) {
        img.src = e.target.result
      } else {
        switch(file.type) {
          case 'application/msword' :
            img.src = './static/image/word.png'
            break
          case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' :
            img.src = './static/image/word.png'
            break
          case 'application/vnd.ms-powerpoint': 
            img.src = './static/image/ppt.png'
            break
          case 'application/vnd.openxmlformats-officedocument.presentationml.presentation': 
            img.src = './static/image/ppt.png'
            break
          case 'application/vnd.ms-excel': 
            img.src = './static/image/excel.png'
            break
          case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 
            img.src = './static/image/excel.png'
            break
          case 'application/pdf':
            img.src = './static/image/pdf.png'
            break
          case 'text/plain':
            img.src = './static/image/txt.png'
            break
          case 'text/javascript':
            img.src = './static/image/js.png'
            break
          case 'text/html':
            img.src = './static/image/html.png'
          case 'text/css':
            img.src = './static/image/css.png'
            break
          default: 
            img.src = './static/image/other.png'
        }
      }
      // 组合单个文件并放入dom中
      fileDiv.appendChild(img)
      fileDiv.appendChild(removeDiv)
      fileDiv.appendChild(fileName)
      droptarget.appendChild(fileDiv)
    }
    // 文件读取失败的提示
    reader.onerror = () => {
      switch(reader.error.code) {
        case '1':
          alert('未找到文件')
          break
        case '2':
          alert('安全错误')
          break
        case '3':
          alert('读取被中断')
          break
        case '4':
          alert('文件不可读')
          break
        case '5':
          alert('编码错误')
          break
        default: 
          alert('文件读取失败')
      }
    }
    // 文件读取的进度，因为是本地读取所以进度很快，基本看不出来，所以选择打印查看
    reader.onprogress = event => {
      console.log(`${event.loaded}/${event.total}`)
    }
}

```
效果如下（gif动图做的比较粗糙，大家可以自己实现看一下）：

![7b439738-2268-41fa-935f-24481fefbcb4.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0661159b8a22431e9590a2140d7f06e6~tplv-k3u1fbpfcp-watermark.image?)
### 5、删除文件
> 利用事件委托的方法，给整个盒子添加`click`事件，通过对id的检验识别出当前需要删除的文件，目前因为是根据删除按钮的id判断，所以删除一个文件，会重新加载一次dom
```js
// 删除文件操作
droptarget.addEventListener('click', event => {
    if (event.target.id.indexOf('file-') > -1) {
      // 清空整个文件上传盒子
      droptarget.innerHTML = ''
      // 删除文件数组中对应的数据
      fileArr.splice(event.target.id.split('-')[1] - 1, 1)
      // 清空文件流数组
      fileBlodArr = []
      // 重新生成文件上传盒子
      fileArr.map(item => {
        filesToBlod(item)
      })
    }
})
```
最终的效果如下：

![32e82b10-135e-444f-bc5b-53b139225262.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c13dc61f73d744a5afc37c7dd2e07afb~tplv-k3u1fbpfcp-watermark.image?)
### css文件

```css
* {
  margin: 0px;
  padding: 0px;
}
/* 整体盒子 */
.main {
  width: 456px;
  height: 452px;
  overflow: hidden;
  position: relative;
  margin: 100px auto;
  background: #f7f6f6;
}
/* 文件上传盒子 */
.drop-box {
  width: 454px;
  height: 450px;
  border: 1px dashed #a89b9b;
  overflow: hidden;
  overflow-y: auto;
}
/*滚动条样式*/
.drop-box::-webkit-scrollbar {
  width: 4px;    
}
.drop-box::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.2);
}
.drop-box::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}
/* 单个文件 */
.drop-box > div {
  width: 144px;
  height: 170px;
  margin: 1px 3px;
  display: inline-block;
  position: relative;
}
/* 缩略图 */
.drop-box > div > img {
  width: 100%;
  height: 145px;
}
/* 删除按钮 */
.drop-box > div > div {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  background: #347aa5;
  color: red;
  border-radius: 50%;
  text-align: center;
  line-height: 18px;
  /* font-weight: bold; */
  font-size: 25px;
  cursor: pointer;
}
/* 文件名 */
.drop-box > div > p {
  text-align: center;
  width: 100%;
  height: 25px;
  line-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* 提示文字 */
.drop-text {
  position: absolute;
  width: 450px;
  height: 50px;
  top: 200px;
  text-align: center;
  line-height: 50px;
  opacity: 0.3;
}
/* 点击上传字体 */
.drop-text > span {
  color: #347aa5;
  cursor: pointer;
}
```
## 总结
-   **拖拽事件**: `dragenter`、`dragover`、`dragleave` 和`drop`,**在做文件拖拽上传的时候需要将`dragover`的默认行为取消，不然无法触发`drop`事件**。

-   **获取拖拽文件**: 在 `drop` 事件中通过`e.dataTransfer.files`获取拖拽文件列表数据，`length`属性获取文件数量，`type`属性获取文件类型

-   **`FileReader`对象**: 通过`readAsDataURL(file)`方法获取文件二进制流，通过`onload`事件，获取文件数据`e.result`，`onerror`事件监听文件读取的时候发生的错误，`onprogress`事件监听文件读取的进度。

> 博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。