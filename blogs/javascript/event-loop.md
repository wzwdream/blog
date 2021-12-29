---
title: Event-Loop(事件循环)
date: 2021-11-29
tags:
 - javascript
categories: 
 - javascript
---

## 1、什么是EventLoop？

- EvnetLoop是js的运行机制，也就是`事件循环`，我个人的理解就是`为了使单线程的js在执行的时候不发生阻塞`。
- EventLoop有两种：`浏览器的EventLoop`和`nodeJs的EventLoop`，这篇文章主要记录`浏览器的EventLoop`的学习。
## 2、学习EventLoop前需要知道的一些知识
- `同步任务`：在主线程上排队执行的任务。只有前一个任务执行完毕，才能执行后一个任务。
- `异步任务`：不进入主线程、而进入任务队列的任务。只有引擎认为某个异步任务可以执行了(比如 Ajax 操作从服务器得到了结果)，该任务(采用回调函数的形式)才会进入主线程执行。排在异步任务后面的代码，不用等待异步任务结束会马上运行，也就是说，异步任务不具有“堵塞”效应。
 - `调用栈/执行栈（Stack）`：执行栈会将当前的执行上下文(通俗一点可以理解成当前的函数调用)压入到执行栈当中，执行完成后就会把它弹出去。
- `任务队列(Queue)`：任务队列通俗的讲就是存放异步任务的队列，js的任务队列有两种，`宏任务队列（MacroTask queue）`跟`微任务队列（MicroTask queue）`
    > `宏任务(MacroTask)`：`script`全部代码、`setTimeout`、`setInterval`、`UI渲染`...
    
    > `微任务（MicroTask）`：`Promise`、`Process.nextTick`、`Object.observe(废弃)`、`MutationObserver`...

## 3、EventLoop（事件循环）执行过程

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9da2fa26db4a42828718f2a345ab257d~tplv-k3u1fbpfcp-watermark.image?)
- 具体过程可以理解为：
>- 1、主线程执行全局同步代码，该过程可能产生一系列异步任务，这些异步任务分别进入对应的任务队列（`宏任务队列（MacroTask queue）`跟`微任务队列（MicroTask queue）`）
>- 2、同步代码执行完毕，`调用栈（Stack）`清空
>- 3、检查是否存在`微任务(MicroTask)`，如果存在则按顺序执行，直至清空`微任务队列(MicroTask Queue)`，如果在执行过程中产生了新的`微任务（MicroTask）`，则把该任务放入队列的队尾，在当前周期执行
>- 4、`微任务（MicroTask）`执行完毕，`微任务队列（MicroTask queue）`为空，`调用栈（Stack）`清空
>- 5、取出`宏任务队列（MacroTask queue）`中位于队首的任务，放入`调用栈（Stack）`中执行
>- 6、当前`宏任务(MacroTask)`执行完毕，`调用栈（Stack）`清空
>-   重复3-6步骤...直至`宏任务队列（MacroTask queue）`中的任务全部执行完毕
## 4、概念性的东西都说完了，做几个题目校验一下学习成果
### 第一题

```js
console.log('javaScript start')

setTimeout(() => {
    console.log('setTimeout1')
}, 0)

new Promise((resolve, reject) => {
    console.log('promise1')
    resolve('promise2')
}).then((data) => {
    console.log(data);
})

setTimeout(() => {
    new Promise((resolve, reject) => {
        console.log('promise3')
        resolve()
    }).then(() => {
        console.log('promise4')
    })
    console.log('setTimeout2')
}, 0)

console.log('javaScript end')
```
这里的结果是什么呢？不妨结合上面简述的知识看一下


```js
javaScript start
promise1
javaScript end
promise2
setTimeout1
promise3
setTimeout2
promise4
```

相信这样简单的题目，对于正在看文章的你来说是轻而易举的

我们来分析一下具体的流程：
- 1.执行全局同步代码
- - 顺序执行输出
- - javaScript start
- - promise1
- - javaScript end
- - 把promise的回调函数放入微任务队列，等待执行
- - 把setTimeout放入宏任务队列，等待执行
- 2.存在微任务队列，执行微任务
- - 顺序执行微任务输出
- - promise2
- 3.把宏任务队列的第一个宏任务（即第一个定时器）放入调用栈执行
- - 输出
- - setTimeout1
- - 因为当前宏任务没有产生微任务，所以把下一个宏任务（第二个定时器）放入调用栈执行
- 4.第二个宏任务执行
- - 顺序执行输出
- - promise3
- - setTimeout2
- - 把promise的回调放入微任务队列，等待执行
- - 执行微任务
- - 输出
- - promise4

### 第二题
```js
console.log('javaScript start')

async function fn1() {
    console.log('fn1')
}

async function fn2() {
    await fn1()
    setTimeout(() => {
        console.log('setTimeout1')
    })
    console.log('fn2')
}

setTimeout(() => {
    console.log('setTimeout2')
}, 0)

new Promise((resolve, reject) => {
    console.log('promise1')
    resolve()
}).then(() => {
    fn2()
}).then(() => {
    console.log('promise2')
})


console.log('javaScript end')
```
这里结果又会是什么呢？


```js
javaScript start
promise1
javaScript end
fn1
fn2
promise2
setTimeout2
setTimeout1
```
相信大家都答对了，这里的关键在前面已经提过：

- **在执行微任务队列中任务的时候，如果又产生了微任务，那么会继续添加到队列的末尾，也会在这个周期执行，直到微任务队列为空。**
还有一个关键点是`async/await`：\
- `async/await` 在底层转换成了 `promise` 和 `then` 回调函数，是 `promise` 的语法糖。\
- 在使用 `await`的时候, 解释器都会先创建一个 `promise` 对象，然后把剩下的 `async` 函数中的操作放到 `then` 回调函数中。


## 参考链接
[带你彻底弄懂EventLoop](https://juejin.cn/post/6844903670291628046#heading-10)
[# 看完一定懂的 Event Loop](https://juejin.cn/post/7008844477314334734#heading-4)


> 博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。