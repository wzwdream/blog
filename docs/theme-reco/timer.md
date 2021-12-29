---
title: 关于定时器的一些知识
date: 2021-12-29
tags:
 - 随笔
 - javascript
categories: 
 - javascript
---

## 1.window.setTimeout

 **`setTimeout()`**方法设置一个定时器，该定时器在定时器到期后执行一个函数或指定的一段代码。

### 语法

```javascript
var timeoutID = setTimeout(function[, delay, arg1, arg2, ...]);
var timeoutID = setTimeout(function[, delay]);
var timeoutID = setTimeout(code[, delay]);
```

#### 参数

- `function`

  `function`是你想要在到期时间(`delay`毫秒)之后执行的函数。

- `code`

  这是一个可选语法，你可以使用字符串而不是`function`，在`delay`毫秒之后编译和执行字符串 (使用该语法是**不推荐的,** 原因和使用 `eval()`一样，有安全风险)。

  ```javascript
  // 示例
  let timer = setTimeout('console.log("定时器")', 4000)
  ```

- `delay` 可选

  延迟的毫秒数 (一秒等于1000毫秒)，函数的调用会在该延迟之后发生。如果省略该参数，delay取默认值0，意味着“马上”执行，或者尽快执行。不管是哪种情况，实际的延迟时间可能会比期待的(delay毫秒数) 值长。

- `arg1, ..., argN` 可选

  附加参数，一旦定时器到期，它们会作为参数传递给`function`

  **备注**：需要注意的是，IE9 及更早的 IE 浏览器不支持向回调函数传递额外参数(第一种语法)

#### 返回值

返回值`timeoutID`是一个正整数，表示定时器的编号。这个值可以传递给`clearTimeout()`来取消该定时器。

需要注意的是`setTimeout()`和`setInterval()`共用一个编号池，技术上，`clearTimeout()`和 `clearInterval()` 可以互换。但是，为了避免混淆，不要混用取消定时函数。

在同一个对象上（一个window或者worker），`setTimeout()`或者`setInterval()`在后续的调用不会重用同一个定时器编号。但是不同的对象使用独立的编号池。

## 2.window.setInterval

**`setInterval()`** 方法重复调用一个函数或执行一个代码段，在每次调用之间具有固定的时间延迟。

**setInterval()**方法重复调用函数或执行代码片段，每次调用之间有固定的时间延迟。它返回一个时间间隔ID，该ID唯一地标识时间间隔，因此您可以稍后通过调用**clearInterval()**来删除它。

### 语法

```javascript
var intervalID = setInterval(func, delay, [arg1, arg2, ...]);
var intervalID = setInterval(code, delay);
```

#### 参数

- `func`

  要重复调用的函数。 每经过指定 `延迟` 毫秒后执行的`函数` 。

- `code`

  这个语法是可选的，你可以传递一个字符串来代替一个函数对象，你传递的字符串会被编译然后每个delay毫秒时间内执行一次。这个语法因为存在安全风险所以不被推荐使用。

- `delay`

  是每次延迟的毫秒数 (一秒等于1000毫秒)，函数的每次调用会在该延迟之后发生。和setTimeout一样，实际的延迟时间可能会稍长一点。这个时间计算单位是毫秒（千分之一秒），这个定时器会使指定方法或者代码段执行的时候进行时间延迟。如果这个参数值小于10，则默认使用值为10。

- `arg1, ..., argN` 可选

  当定时器过期的时候，将被传递给func指定函数的附加参数。

#### 返回值

此返回值`intervalID`是一个非零数值，用来标识通过`setInterval()`创建的计时器，这个值可以用来作为`clearInterval()`的参数来清除对应的计时器 。

值得注意的是，`setInterval()`和`setTimeout()`共享同一个ID池，并且`clearInterval()`和`clearTimeout()`在技术上是可互换使用的。但是，我们必须去匹配`clearInterval()`和`clearTimeout()`对应的`id，以`避免代码杂乱无章，增强代码的可维护性。



## 3.实际延时比设定值更久的原因：

### 最小延迟时间

在浏览器中，`setTimeout()/``setInterval()`的每调用一次定时器的最小间隔是4ms，这通常是由于函数嵌套导致（嵌套层级达到一定深度），或者是由于已经执行的setInterval的回调函数阻塞导致的。

### 超时延迟

除了"最小延时"之外，定时器仍然有可能因为当前页面（或者操作系统/浏览器本身）被其他任务占用导致延时。 需要被强调是， 直到调用 `setTimeout()`的主线程执行完其他任务之后，回调函数和代码段才能被执行。

### 最大延时值

包括 IE, Chrome, Safari, Firefox 在内的浏览器其内部以32位带符号整数存储延时。这就会导致如果一个延时(delay)大于 2147483647 毫秒 (大约24.8 天)时就会溢出，导致定时器将会被立即执行。

## 4.定时器的可靠性

虽说定时器在大部分的情况下都是趋于稳定的，但是定时器在使用的时候也存在着一些误差，可以使用下列代码多测试几次，就会发现，每次的结果都会存有差异。

```javascript
const startTime = new Date().getTime() // 开始时间
let frequency = 0 // 执行次数
// 定时器
const timer = setInterval(() => {
    // 执行十次后停止并清除定时器
    frequency === 9 && clearInterval(timer)
    // 每次定时器执行结束时间
    const endTime = new Date().getTime()
    console.log("setInterval执行的差值时间："+(time2-time1))
    // 没执行一次执行次数自增
    frequency++
},1000)
```

## 5.遇到的关于无法清除定时器的问题
#### 错误示范：
```javascript
// 定义时间
let time = 11
// 定义一个函数，实现倒计时功能
function countDown(){
    time--
    console.log(`倒计时：${time}秒`)
    // 定义定时器，间隔一秒执行一次该函数
　  const timer = setInterval(countDown, 1000)
    // 当时间为0的时候清除定时器
    if(time === 0) {
      clearInterval(timer)
    }
}
// 调用倒计时函数
countDown();
```
#### 改变过后的正确示范：
```javascript
// 定义时间
let time = 11
// 定义一个函数，实现倒计时功能
function countDown(){
    time--
    console.log(`倒计时：${time}秒`)
    // 当时间为0的时候清除定时器
    if(time === 0) {
      clearInterval(timer)
    }
}
// 定义定时器，间隔一秒执行一次该函数
const timer = setInterval(countDown, 1000)
```

``无法清除定时器的原因：在以上函数中，每次调用函数都会创建一个新的定时器，clearInterval()只关闭了其中一个setInterval_id，剩下的setInterval_id还会启动setInterval()。``

## 参考链接
[js的执行机制](https://www.cnblogs.com/echolun/p/10765562.html)

[事件循环](https://juejin.cn/post/7041854119027408909)

[MDN定时器](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout)

> 博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。
