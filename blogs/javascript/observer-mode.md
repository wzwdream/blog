---
title: js的设计模式（一）-观察者模式跟发布订阅者模式
date: 2022-05-30
tags:
 - javascript
categories: 
 - javascript
---
## 设计模式的概念
#### 1、什么是设计模式
- 设计模式（Design pattern）是一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结。使用设计模式是为了可重用代码、让代码更容易被他人理解、保证代码可靠性。
- 设计模式更加通俗的说它是一种思维方式，一种解决问题的方案，当我们在合适的场景或者特定的问题，会自然的想到使用这种方式解决是最优雅的。
#### 2、设计模式的原则
-   **S – Single Responsibility Principle 单一职责原则**
    -   一个程序只做好一件事
    -   如果功能过于复杂就拆分开，每个部分保持独立
-   **O – OpenClosed Principle 开放/封闭原则**
    -   对扩展开放，对修改封闭
    -   增加需求时，扩展新代码，而非修改已有代码

-   **L – Liskov Substitution Principle 里氏替换原则**
    -   子类能覆盖父类
    -   父类能出现的地方子类就能出现
-   **I – Interface Segregation Principle 接口隔离原则**
    -   保持接口的单一独立
    -   类似单一职责原则，这里更关注接口
-   **D – Dependency Inversion Principle 依赖倒转原则**
    -   面向接口编程，依赖于抽象而不依赖于具体
    -   使用方只关注接口而不关注具体类的实现
    
> 这里提一下我为什么要先学习观察者模式跟发布订阅者这两个模式
> - 我的理解中这两个设计模式的思想其实是一致的，可以理解为**同样的思想**，但是实现或者使用的场景不同，
> - 这两个设计模式最大的区别就在于需不需要第三方来辅助完成当前工作
> - 大家可以通过以下图片来看一下它们之间的区别
> ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93539c25edd640dcb8a22180bee10f9f~tplv-k3u1fbpfcp-watermark.image?)

## 观察者者模式
#### 1、概念
- 发布-订阅模式其实是一种对象间一对多的依赖关系，当一个对象的状态发送改变时，所有依赖于它的对象都将得到状态改变的通知。
#### 2、列子
想必大家应该都经常会接触到这个模式，比如：
- 我们使用原生DOM事件绑定的时候
```js
window.addEventListener('load', function () {
    console.log('loaded!')
})
```
- vue中`$on` 和 `$emit` 的方法实现，直接看源码

```js
function eventsMixin (Vue) {
    var hookRE = /^hook:/;
    Vue.prototype.$on = function (event, fn) {
        var this$1 = this;

        var vm = this;
        // event 为数组时，循环执行 $on
        if (Array.isArray(event)) {
            for (var i = 0, l = event.length; i < l; i++) {
                this$1.$on(event[i], fn);
            }
        } else {
            (vm._events[event] || (vm._events[event] = [])).push(fn);
            // optimize hook:event cost by using a boolean flag marked at registration 
            // instead of a hash lookup
            if (hookRE.test(event)) {
                vm._hasHookEvent = true;
            }
        }
        return vm
    };

    Vue.prototype.$once = function (event, fn) {
        var vm = this;
        // 先绑定，后删除
        function on () {
        	vm.$off(event, on);
            fn.apply(vm, arguments);
        }
        on.fn = fn;
        vm.$on(event, on);
        return vm
    };

    Vue.prototype.$off = function (event, fn) {
        var this$1 = this;

        var vm = this;
        // all，若没有传参数，清空所有订阅
        if (!arguments.length) {
            vm._events = Object.create(null);
            return vm
        }
        // array of events，events 为数组时，循环执行 $off
        if (Array.isArray(event)) {
            for (var i = 0, l = event.length; i < l; i++) {
                this$1.$off(event[i], fn);
            }
            return vm
        }
        // specific event
        var cbs = vm._events[event];
        if (!cbs) {
        	// 没有 cbs 直接 return this
            return vm
        }
        if (!fn) {
        	// 若没有 handler，清空 event 对应的缓存列表
            vm._events[event] = null;
            return vm
        }
        if (fn) {
            // specific handler，删除相应的 handler
            var cb;
            var i$1 = cbs.length;
            while (i$1--) {
                cb = cbs[i$1];
                if (cb === fn || cb.fn === fn) {
                    cbs.splice(i$1, 1);
                    break
                }
            }
        }
        return vm
    };

    Vue.prototype.$emit = function (event) {
        var vm = this;
        {
        	// 传入的 event 区分大小写，若不一致，有提示
            var lowerCaseEvent = event.toLowerCase();
            if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
                tip(
                    "Event \"" + lowerCaseEvent + "\" is emitted in component " +
                    (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
                    "Note that HTML attributes are case-insensitive and you cannot use " +
                    "v-on to listen to camelCase events when using in-DOM templates. " +
                    "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
                );
            }
        }
        var cbs = vm._events[event];
        if (cbs) {
            cbs = cbs.length > 1 ? toArray(cbs) : cbs;
            // 只取回调函数，不取 event
            var args = toArray(arguments, 1);
            for (var i = 0, l = cbs.length; i < l; i++) {
                try {
                    cbs[i].apply(vm, args);
                } catch (e) {
                    handleError(e, vm, ("event handler for \"" + event + "\""));
                }
            }
        }
        return vm
    };
}

/***
   * Convert an Array-like object to a real Array.
   */
function toArray (list, start) {
    start = start || 0;
    var i = list.length - start;
    var ret = new Array(i);
    while (i--) {
      	ret[i] = list[i + start];
    }
    return ret
}

```
#### 3、自己实现一个简化版的evenetBus

```js
// 被观察者
class EventBus {
  constructor(topic) {
    this.topic = topic; // 事件标识
    this.observers = new Set();  // 缓存列表
  }
  // 添加观察
  addObserver(ob) {
    this.observers.add(ob);
  }
  // 取消观察
  removeObserver(ob) {
    this.observers.delete(ob);
  }
  // 推送消息
  pushArticle(val) {
    for (let ob of this.observers) {  // 遍历缓存列表
      ob.update(this.topic, val)  // 触发观察者的回调函数
    }
  }
}

// 观察者
class Event {
  constructor(name) {
    this.name = name;
  }
  update(topic, val) {
    console.log(`${topic}给${this.name}发送消息：${val}`)
  }
}

const eventBus = new EventBus("老师");
const tom = new Event('Tom');
const jim = new Event('Jim');
eventBus.addObserver(tom);
eventBus.addObserver(jim);
eventBus.pushArticle('今天下午放学留下来背书');
// 老师给Tom发送消息：今天下午放学留下来背书
// 老师给Jim发送消息：今天下午放学留下来背书

// 取消观察
eventBus.removeObserver(jim);
eventBus.pushArticle('今天下午放学留下来背书');
// 老师给Tom发送消息：今天下午放学留下来背书
```
## 发布-订阅模式
#### 1、概念
- 相对于观察者模式，发布-订阅模式相对于观察者模式是面向调度中心编程的，他以调度中心为连接来管理发布者跟订阅者，发布者跟订阅者都不需要知道彼此的存在。
#### 2、列子
- Vue 响应式原理
```js
class Dep {
  constructor() {
    // 观察者列表
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    })
  }
}

// 观察者
class Watcher {
  constructor() {
    // 将 Dep.target 指向当前观察者
    Dep.target = this;
  }

  update() {
    // do something
    console.log("re render view");
  }
}

function defineReactive(obj, key, val) {
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      // Dep.target 指向观察者，收集 watcher
      Dep.target && dep.addSub(Dep.target);
      return val;
    },
    set: function (newVal) {
      // 新值与旧值相等，或新值与旧值都为NaN
      if (newVal === val || (newVal !== newVal && value !== value)) return;
      val = newVal;
      dep.notify();
    }
  });
}

// 将对象处理为可被观察的（暂时只处理对象第一层属性）
function observer(value) {
  if (!value || (typeof value !== 'object')) {
    return;
  }
  Object.keys(value).forEach((key) => {
    defineReactive(value, key, value[key]);
  });
}

// 简单的Vue构造函数
class Vue {
  constructor(options) {
    this._data = options.data;
    observer(this._data);
    new Watcher();
    console.log('render:', this._data.test);  // 触发 get > dep.addSub(Dep.target)
  }
}

const o = new Vue({
  data: {
    test: "init test."
  }
});
o._data.test = "Hello world.";  // 变更后触发 set > dep.notify()

Dep.target = null;

```
#### 3、改写EventBus简化版，添加调度中心后
```js
// 调度中心
class PubSub {
  constructor() {
    this.subscribers = new Set();  // 缓存列表
  }
  subscribe(ob) {
    this.subscribers.add(ob);
  }
  unsubscribe(ob) {
    this.subscribers.delete(ob);
  }
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

## 总结
- 观察者模式跟发布订阅者模式，都是为了实现一对多的依赖关系，都是为了实现一个状态的改变触发回调函数进行通知。
- 发布订阅者模式比观察者模式多了一个调度中心，也就是通过第三方来管理发布者跟订阅者。

### 参考资料

- [JavaScript设计模式与开发实践](https://link.juejin.cn/?target=https%3A%2F%2Fbook.douban.com%2Fsubject%2F26382780%2F "https://book.douban.com/subject/26382780/")
- [设计模式](https://www.yuque.com/wubinhp/uxiv5i "设计模式")
>博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。
