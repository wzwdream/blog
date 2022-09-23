---
title: 一些手写的源码解析
date: 2022-06-15
tags:
 - javascript
 - 源码
categories: 
 - javascript
---

### 1、手写instanceof
- `instanceof`主要判断一个实例是否`属于`某种类型；
- 实现原理就是只要右边`类型`的`prototype`在左边`实例`的`原型链`上即可；

```js

// L代表左侧的实列，R代表右侧的类型
function instance_of(L, R) {
    // 获取类型的原型对象prototype
    let rPrototype = R.prototype
    // 获取实例的隐式原型__proto__
    L = L.__proto__
    // 循环判断，直到最顶层null或者找到为止
    while(true) {
        if(L === null) return false
        if(L === R) return true
        L = L.__proto__
    }
}

// 测试
let arr = []
let obj = {}
let fn = function() {}
class Father {}
let father1 = new Father()

console.log(instance_of(arr, Array)) // true
console.log(instance_of(obj, Object)) // true
console.log(instance_of(fn, Function)) // true
console.log(instance_of(father1, Father)) // true
console.log(instance_of(father1, Array)) // false

```

### 2、手写new关键词
使用new关键词执行构造函数，主要过程为：
- 1、`创建`一个新对象；
- 2、将第一步的空对象链接到另一个对象（new操作符后面跟着的构造函数的`原型对象`）
- 3、将第一步创建的对象作为构造函数的`this上下文`；
- 4、返回对象`实例`，如果构造函数有返回对象，则对象实例就是构造函数返回的对象，否则就返回this作为对象实例

```js

function myNew(fn) {

    // fn必须是一个函数
    if(typeof fn !== 'function') {
        throw 'fn must be a function'
    }
    
    return function(...arg) {
    
        // 完成前两步，创建新对象，链接原型
        let newObj = Object.create(fn.prototype)
        
        // 第三步，改变构造函数的this指向
        let result = fn.apply(newObj, [...arg])
        
        // 第四步，判断返回值
        return result || newObj;
    }
}

// 测试
function Student(name, age) {
    this.name = name
    this.age = age
}

let tom = myNew(Student)('Tom', 18)
console.log(tom) // Student {name: 'Tom', age: 18}
console.log(tom.__proto__ === Student.prototype) // true
console.log(tom instanceof Student) // true

function Pepol(name) {
    this.name = name
    return {age: '18'}
}

let jim = myNew(Pepol)('Jim')
// 返回对象实例，如果构造函数有返回对象，则对象实例就是构造函数返回的对象
// 否则就返回this作为对象实例
console.log(jim) // {age: '18'}

```

### 3、手写call
- 改变函数的`this`指向
- 第一个参数为`this`要指向的对象，如果没有或者参数为undefined/null则默认指向`window`
- 参数传递是以参数列表传递，需要一个一个的列举出来
- 函数`立即执行`

```js

Function.prototype.myCall = function(context, ...arg) {

    // 如果context不存在/undefined/nul，则指向window
    if(!context) context = window
    
    // 使用符号确保属性名唯一
    let fn = Symbol()
    
    // this指向传入对象
    context[fn] = this
    
    // 带参数执行函数
    const result = context[fn](...arg)
    
    // 删除fn，确保不会污染原对象
    delete context[fn]
    
    return result
}

// 测试
let a = {
    name: 'Tom',
    age: 18
}
function fn(add, hobby) {
    console.log(`my name is ${this.name}, I\`m ${this.age}, I come from ${add}, I like playing ${hobby}`)
}
fn.myCall(a, 'America', 'basketball') // my name is Tom, I`m 18, I come from America, I like playing basketball

```

### 4、手写apply
- 跟call基本是一样的，只是call的剩余参数是参数列表（call的参数需要一个一个在后面列举出来），而apply的第二个参数必须是`数组`(apply的参数是以`参数数组`的形式传递的)

```js
Function.prototype.myApply = function(context, arg) {

    // 如果context不存在/undefined/nul，则指向window
    if(!context) context = window
    
    // 使用符号确保属性名唯一
    let fn = Symbol()
    
    // this指向传入对象
    context[fn] = this
    
    // 带参数执行函数
    const result = context[fn](...arg)
    
    // 删除fn，确保不会污染原对象
    delete context[fn]
    
    return result
}

// 测试
let a = {
    name: 'Tom',
    age: 18
}
function fn(add, hobby) {
    console.log(`my name is ${this.name}, I\`m ${this.age}, I come from ${add}, I like playing ${hobby}`)
}
fn.myApply(a, ['America', 'basketball']) // my name is Tom, I`m 18, I come from America, I like playing basketball

```

### 5、手写bind
- bind函数也改变`this`的指向
- 传入的函数不会`立即执行`，而是`返回`一个永久改变this指向的`函数`
- 参数传递跟call一样使用`参数列表`，需要一个一个的列举出来传递
- 绑定过后的函数被`new`实例化之后，需要继承原函数的`原型链`方法，且绑定过程中提供的this被忽略（继承原函数的this对象），但是参数还是会使用

```js
Function.prototype.myBind = function(context) {

    // this必须是一个函数
    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    // 保存this，方便后续执行的时候使用
    let self = this;
    
    // 获取参数列表除第一个this之外的参数
    let args = Array.prototype.slice.call(arguments, 1);
    
    let fNOP = function () {};
    
    // 绑定后生成的函数
    let fBound = function () {
    
        let bindArgs = Array.prototype.slice.call(arguments);
        
        // 使用apply改变调用时的this指向
        // this只和运行的时候有关系，所以这里的this和上面的self不是一样的
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }
    
    // 继承原型
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    
    return fBound;
}

// 测试
let a = {
    name: 'Tom',
    age: 18
}
function fn(add, hobby) {
    console.log(`my name is ${this.name}, I\`m ${this.age}, I come from ${add}, I like playing ${hobby}`)
}
let fnBind = fn.myBind(a)
fnBind('America', 'basketball') // my name is Tom, I`m 18, I come from America, I like playing basketball
```

### 6、防抖
- 在事件触发的一段时间后执行该事件，如果这期间再次触发事件，则重新计时

```js
function debounce(fn, delay) {

    // 保存一个timer
    let timer
    
    return function(...args) {
    
        // 如果以及存在则清除
        if(timer) clearTimeout(timer)
        
        // 延迟执行函数
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

// 测试
function task() {
    console.log('滚动')
}
const debounceTask = debounce(task, 100)
window.addEventListener('scroll', debounceTask)

```

### 7、节流
- 事件在一定时间内只能触发一次

```js
function throttle(fn, delay) {

    // 保存timer
    let timer
    
    return function(...args) {
    
        // 如果存在timer则返回
        if(timer) return
        
        timer = setTimeout(() => {
        
            fn.apply(this, args)
            
            // 清除定时器
            clearTimeout(timer)
            timer = null
            
        }, delay)
    }
}

// 测试
function task() {
    console.log('滚动')
}
const throttleTask = throttle(task, 100)
window.addEventListener('scroll', throttleTask)
```

### 8、深克隆
- 创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象；

- 使用JSON.stringify和JSON.parse也可以实现深拷贝：JSON.stringify把对象转成字符串，再用JSON.parse把字符串转成新的对象


```js
function deepClone(obj, cache = new WeakMap()) {

    // 判断是否是引用类型，如果不是则直接返回
    if(obj === null || typeof obj !== 'object') return obj
    
    // 判断是否是特殊的对象类型（Date/RegExp）
    if(obj instanceof Date) return new Date(obj)
    if(obj instanceof RegExp) return new RegExp(obj)
    
    // 如果出现循环引用，则返回缓存的对象，防止递归进入死循环
    if (cache.has(obj)) return cache.get(obj) 
    
    // 使用原对象的构造函数创建一个新对象
    let newObj = new obj.constructor()
    
    // 缓存对象，用于循环引用的情况
    cache.set(obj, newObj)
    
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            // 递归克隆
            newObj[key] = deepClone(obj[key], cache)
        }
    }
    
    return newObj
}

// 测试

let obj = {
    name: '111',
    a: [1,2,3],
    b: new Date(),
    c: {
        h: 111
    }
}
 let newObj = deepClone(obj)
 console.log(newObj === obj) // false
 console.log(newObj.__proto__ === obj.__proto__) // true
 newObj.a[2] = 10
 console.log(obj.a[2]) // 3
```

### 9、手写promise

-   promise的出现是为了解决回调地狱、是一种异步编程的解决方案。

-   promise有三种状态:**pending(等待态)，fulfiled(成功态)，rejected(失败态)**  ，初始状态是**pending(等待态)** ，状态一旦改变，就不会再变。

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

### 10、发布订阅

一种对象间一对多的依赖关系，当一个对象的状态发送改变时，所有依赖于它的对象都将得到状态改变的通知。

```js
// 调度中心
class PubSub {
  constructor() {
    this.subscribers = new Set();  // 缓存列表
  }
  // 添加订阅
  subscribe(ob) {
    this.subscribers.add(ob);
  }
  // 移除订阅
  unsubscribe(ob) {
    this.subscribers.delete(ob);
  }
  // 发布消息
  publish(topic, params) {
    for (let ob of this.subscribers) {  // 遍历缓存列表
      ob.update(topic, params)
    }
  }
}

// 发布者
class EventBus {
  constructor(topic) {
    this.topic = topic;
  }
  // 推送消息
  pushArticle(pubSub, val) {
    pubSub.publish(this.topic, val)
  }
}

// 订阅者
class Event {
  constructor(name) {
    this.name = name;
  }
  update(topic, val) {
    console.log(`${topic}给${this.name}发送消息：${val}`)
  }
}

// 测试

const pubSub = new PubSub();
const eventBus = new EventBus("老师");
const tom = new Event('Tom');
const jim = new Event('Jim');

pubSub.subscribe(tom);
pubSub.subscribe(jim);
eventBus.pushArticle(pubSub, '今天下午放学留下来背书');
// 老师给Tom发送消息：今天下午放学留下来背书
// 老师给Jim发送消息：今天下午放学留下来背书

```
> 博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。