---
title: promise原理学习
date: 2022-6-2
tags:
 - javascript
categories: 
 - javascript
---
## 前言

- 学习promise原理以及自己实现一个promise的目的主要是为了更好的使用promise（ps：我是不会承认主要目的是为了面试做准备的）。

- promise的出现是为了解决回调地狱、是一种异步编程的解决方案。

- promise有三种状态:**pending(等待态)，fulfiled(成功态)，rejected(失败态)** ，初始状态是**pending(等待态)**，状态一旦改变，就不会再变。

## 1、实现promise对象(resolve， reject)
promise是一个对象，对象里面有一系列变量跟方法，列如：`状态（PromiseState）`、`执行后的值（PromiseResult`）、`失败的方法（reject）`、`成功的方法（resolve）`等。然后根据[Promises/A+规范](https://promisesaplus.com/)得知，状态一经改变就不可再次改变，就可以得出最基础的promise对象，代码如下
```js
class MyPromise {

  constructor(executor) {
  
    // 执行传进来的回调函数
    executor(this.resolve, this.reject)
    
  }
  
  // 状态值pending(等待态)，fulfiled(成功态)，rejected(失败态)，默认为pending
  PromiseState = 'pending'
  
  // 执行后的值
  PromiseResult = null
  
  // 成功的方法
  resolve = value => {
  
    // 如果状态不是pending，则直接返回，因为状态已经改变就不可再次改变
    if(this.PromiseState !== 'pending') return
    
    // 状态置为成功的状态fulfiled
    this.PromiseState = 'fulfiled'
    
    // 执行后的值改为传进来的值
    this.PromiseResult = value
    
    console.log('成功的回调', value)
    
  }
  
  // 失败的方法
  reject = value => {
  
    // 如果状态不是pending，则直接返回，因为状态已经改变就不可再次改变
    if(this.PromiseState !== 'pending') return
    
    // 状态置为失败的状态rejected
    this.PromiseState = 'rejected'
    
    // 执行后的值改为传进来的值
    this.PromiseResult = value
    
    console.log('失败的回调', value)
    
  }
}
```

我相信这点简单的代码大家都可以写出来，那我们就来运行测试以下效果
```js
let p = new MyPromise((resolve, reject) => {
  resolve('成功啦')
  reject('失败啦')
})
let p1 = new MyPromise((resolve, reject) => {
  reject('失败啦111')
  resolve('成功啦111')
})
```
结果

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b120ecca0c184286b23230c9ad25889c~tplv-k3u1fbpfcp-watermark.image?)

## 2、如果使用过程中有throw怎么办
如果在`Promise`中出现了`throw`的话，那就相当于执行了`rejecte`，这样我们就需要用到`try-catch`在执行回调的时候去捕获throw了
```js

try {
  // 执行传进来的回调函数
  executor(this.resolve, this.reject)
} catch (err) {
  // 捕捉到错误直接执行reject
  this.reject(err)
}

```

现在我们在看以下效果

```js
let p = new MyPromise((resolve, reject) => {
  throw('报错了')
})
// 输出结果
// 失败的回调 报错了
```

## 3、实现then方法

- then方法接受两个可选的参数，这两个参数必须是函数，两个参数分别代表两个回调函数：成功的回调跟失败的回调

- 当`PromiseState`为`fulfiled`时执行成功的回调，为`rejected`执行失败的回调

- then方法支持`链式调用`，下一次的then方法的值来自于上一个then方法`执行后的值`

接下来我们实现then方法

```js
  then(onFulfilled, onRejected) {
    // 如果不传，就使用默认函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    const promise2 = new MyPromise((resolve, reject) => {
      // 成功
      const resolveMicrotask = () => {
        queueMicrotask(() => {
          // then执行阶段错误捕获
          try {
            const x = onFulfilled(this.PromiseResult);
            this.resolvePromise(x, promise2, resolve, reject);
          } catch (err) {
            reject(err);
          }
        })
      }
      // 失败
      const rejectMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.PromiseResult);
            this.resolvePromise(x, promise2, resolve, reject);
          } catch (err) {
            reject(err);
          }
        })
      }
      // 如果`PromiseState`为`fulfiled`时执行第一个回调（成功的回调）
      if (this.PromiseState === 'fulfiled') {
        resolveMicrotask()
        // 如果`PromiseState`为`rejected`时执行第二个回调（失败的回调）
      } else if (this.PromiseState === 'rejected') {
        rejectMicrotask()
        // 如果`PromiseState`为`pending`时，暂时保存两个回调
      } else if (this.PromiseState === 'pending') {
        this.onFulfilledCallbacks.push(resolveMicrotask)
        this.onRejectedCallbacks.push(rejectMicrotask)
      }
    })
    return promise2;
  }
  resolvePromise(x, promise, resolve, reject) {
    if (x === promise) {
      return reject(new TypeError('The promise and the return value are the same'));
    }
    // 同我们原来的判断 (x instanceof MyPromise) ，这里只是为了和PromiseA+规范保持统一
    if (typeof x === 'object' || typeof x === 'function') {
      if (x === null) {
        return resolve(x);
      }
      let then;
      try {
        then = x.then;
      } catch (err) {
        return reject(err);
      }

      if (typeof then === 'function') {
        let called = false;
        try {
          then.call(x, y => {
            if (called) return;
            called = true;
            this.resolvePromise(y, promise, resolve, reject);
          }, r => {
            if (called) return;
            called = true;
            reject(r);
          })
        } catch (err) {
          if (called) return;
          reject(err);
        }
      } else {
        resolve(x);
      }
    }
    else {
      resolve(x);
    }
  }
```

测试一下
```js

const promise = new MyPromise((resolve, reject) => {
    resolve('我是promise');
});

promise.then(value => {
    console.log("1111", value);
    return value + '1111';
}).then(value => {
    console.log("2222", value);
    return value + '2222';
}).then(value => {
    console.log("3333", value);
});
```

结果

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8eb33e314d444196b2e634ffcf79ca61~tplv-k3u1fbpfcp-watermark.image?)

## 4、完整的代码
```js
class MyPromise {
  constructor(executor) {
    // 捕获执行器的代码错误
    try {
      // executor执行器，进入会立即执行
      executor(this.resolve, this.reject)
    } catch (err) {
      this.reject(err);
    }
  }
  // 状态值pending(等待态)，fulfiled(成功态)，rejected(失败态)，默认为pending
  PromiseState = 'pending'

  // 成功的回调
  onFulfilledCallbacks = []

  // 失败的回调
  onRejectedCallbacks = []

  // 执行后的值
  PromiseResult = null

  // 成功的方法
  resolve = (value) => {
    // 如果状态不是pending，则直接返回，因为状态已经改变就不可再次改变
    if (this.PromiseState !== 'pending') return
    // 状态置为成功的状态fulfiled
    this.PromiseState = 'fulfiled'
    // 执行后的值改为传进来的值
    this.PromiseResult = value
    // 查看是否存在可执行的回调
    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()()
    }
    console.log('成功的回调', value)
  }
  // 失败的方法
  reject = (value) => {
    // 如果状态不是pending，则直接返回，因为状态已经改变就不可再次改变
    if (this.PromiseState !== 'pending') return
    // 状态置为失败的状态rejected
    this.PromiseState = 'rejected'
    // 执行后的值改为传进来的值
    this.PromiseResult = value
    // 查看是否存在可执行的回调
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()()
    }
    console.log('失败的回调', value)
  }
  then(onFulfilled, onRejected) {
    // 如果不传，就使用默认函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    const promise2 = new MyPromise((resolve, reject) => {
      // 成功
      const resolveMicrotask = () => {
        queueMicrotask(() => {
          // then执行阶段错误捕获
          try {
            const x = onFulfilled(this.PromiseResult);
            this.resolvePromise(x, promise2, resolve, reject);
          } catch (err) {
            reject(err);
          }
        })
      }
      // 失败
      const rejectMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.PromiseResult);
            this.resolvePromise(x, promise2, resolve, reject);
          } catch (err) {
            reject(err);
          }
        })
      }
      // 如果`PromiseState`为`fulfiled`时执行第一个回调（成功的回调）
      if (this.PromiseState === 'fulfiled') {
        resolveMicrotask()
        // 如果`PromiseState`为`rejected`时执行第二个回调（失败的回调）
      } else if (this.PromiseState === 'rejected') {
        rejectMicrotask()
        // 如果`PromiseState`为`pending`时，暂时保存两个回调
      } else if (this.PromiseState === 'pending') {
        this.onFulfilledCallbacks.push(resolveMicrotask)
        this.onRejectedCallbacks.push(rejectMicrotask)
      }
    })
    return promise2;
  }
  resolvePromise(x, promise, resolve, reject) {
    if (x === promise) {
      return reject(new TypeError('The promise and the return value are the same'));
    }
    // 同我们原来的判断 (x instanceof MyPromise) ，这里只是为了和PromiseA+规范保持统一
    if (typeof x === 'object' || typeof x === 'function') {
      if (x === null) {
        return resolve(x);
      }
      let then;
      try {
        then = x.then;
      } catch (err) {
        return reject(err);
      }

      if (typeof then === 'function') {
        let called = false;
        try {
          then.call(x, y => {
            if (called) return;
            called = true;
            this.resolvePromise(y, promise, resolve, reject);
          }, r => {
            if (called) return;
            called = true;
            reject(r);
          })
        } catch (err) {
          if (called) return;
          reject(err);
        }
      } else {
        resolve(x);
      }
    }
    else {
      resolve(x);
    }
  }
  // 静态resolve方法
  static resolve = (value) => {
    if (value instanceof MyPromise) {
      return value;
    }
    // 常规resolve处理
    return new MyPromise((resolve, reject) => {
      resolve(value);
    })
  }
  // 静态reject方法
  static reject = (reason) => {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    })
  }
}
```
## 5、通过Promises/A+规范测试我们手写的promise
- Promise是有多种规范的，除了 Promise A、promise A+ 还有 Promise/B，Promise/D。
- 测试我们的代码是否符合Promises/A+规范可以借助 promises-aplus-tests 来检测。
初始化项目
```js
npm init -y
```
安装promises-aplus-tests
```js
npm install promises-aplus-tests -D
```
在MyPromise.js中添加以下代码
```JS
// 我们手写的promise
MyPromise {
  ......
}
// 测试代码
MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
}
module.exports = MyPromise;
```
最后在修改以下启动命令
```js
{
  "name": "promise",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "promises-aplus-tests MyPromise"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "promises-aplus-tests": "^2.1.2"
  }
}
```
最后执行npm run test

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/563a50a6f3ed4376abc8af1f06db556b~tplv-k3u1fbpfcp-watermark.image?)

## 总结

- promise的中文翻译是承诺，它就像它的名字一样，承诺它过一段时间会给你一个结果。
- 目前我们使用promise都是基于[Promises/A+规范](https://promisesaplus.com/)实现的。
- then方法我参考了《[面试官：能说下promise实现异步的原理吗？](https://juejin.cn/post/7069783225635176455#heading-4)》的代码，我自己实现的代码可以运行，但是跑测试案例的时候会出现部分案例测试不通过，最后借鉴别人的代码，才最终实现。

## 参考资料

- [Promises/A+规范](https://promisesaplus.com/)
- [面试官：能说下promise实现异步的原理吗？](https://juejin.cn/post/7069783225635176455#heading-4)
>博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。
