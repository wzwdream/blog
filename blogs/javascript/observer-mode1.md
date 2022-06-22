---
title: js的设计模式（二）
date: 2022-06-22
tags:
 - javascript
 - 设计模式
categories: 
 - javascript
---

### 1、单例模式（Singleton Pattern）

- 又称为单体模式，顾名思义一个类只能存在一个实例。

- 当第二次用相同的类创建实例的时候，得到的应该跟第一次创建的类一模一样的实例。

#### 1.1、列子

- 在项目中的`全局loading`其实就是单例模式，永远只会存在一个`loading`效果，而不会重复出现；

- 浏览器的window/document对象也是单例模式；

- es6新增的模块import/export导出的也是一个单例，其它地方更改了模块中的某些值，那么你再次获取就是更改后的值；

#### 1.2、实现

- 普通单例模式实现
```js
const SingleCase = (function() {

    // 存储单例
    let _example = null
    
    const SingleCase = function() {
    
        // 判断是否存在单例
         if (_example) {
            return _example
        }
        
        // 存储单例
        _example = this
        
        // 初始化
        this.init()
        
        return _example
    }
    
    // 初始化操作
    SingleCase.prototype.init = function() {
        console.log('我是单例')
    }
    
    // 获取实例的静态方法
    SingleCase.getExample = function() {
        if (_example) return _example
        _example = new SingleCase()
        return _example
    }
    
    return SingleCase
    
})()

// 测试
let a = new SingleCase()
let b = new SingleCase()
let c = SingleCase.getExample()
console.log(a === b) // true
console.log(b === c) // true
```

- 符合单一职责的单例模式
把功能函数提取出来，如初始化（init）等操作方法
```js
// 功能类
class FuncClass() {
    constructor(event) {
        this.event = event
        this.init()
    }
    init() {
        console.log('我是单例')
    }
}

// 单例类
const SingleCase = (function() {

    // 存储单例
    let _example = null
    
    const SingleCase = function(event) {
    
        // 判断是否存在单例
         if (_example) {
            return _example
        }
        
        // 存储单例
        _example = new FuncClass(event)
        
        return _example
    }
    
    // 获取实例的静态方法
    SingleCase.getExample = function(event) {
        if (_example) return _example
         _example = new FuncClass(event)
        return _example
    }
    
    return SingleCase
    
})(event)

// 测试
let a = new SingleCase('张三')
let b = new SingleCase('李四')
let c = SingleCase.getExample('王五')
console.log(a === b) // true
console.log(b === c) // true

```
> 单列模式的优点：一个类只存在一个实例，减少内存的占用，节约资源，减少垃圾回收机制的压力；\
> 缺点：扩展性不好,

### 2、工厂模式（Factory Pattern）

- 根据不同的输入值，返回不同的类；
- 分离对象的实现与对象的创建；

#### 2.1、列子

- 使用document.createElement创建DOM元素，就是使用工厂模式的思想实现的
- vue-router的几种模式，history、hash等模式的创建，也是基于工厂模式的思想

#### 2.2、实现
```js
class FactoryMode {

    constructor(type) {
        // 返回实例
        return this.init(type)
    }
    
    // 操作函数
    init(type) {
        let example = null
        switch(type) {
            case 'a':
                example = new Aclass()
                break
            case 'b':
                example = new Bclass()
                break
            defulat:
                example = null
        }
        return example
    }
}

class Aclass {
    say() {
        console.log('我是aClass')
    }
}

class Bclass {
    say() {
        console.log('我是bClass')
    }
}

// 测试
const aClass = new FactoryMode('a')
const bClass = new FactoryMode('b')
aClass.say() // 我是aClass
bClass.say() // 我是bClass

```
> 工厂模式的优点：
> - 解耦了类的实现与创建，不需要直到类是怎么实现的，只需要关心类的创建
> - 扩展性较好，隔离了创建与实现的流程
> - 代码结构清晰
> 缺点：增加了代码量、系统的复杂性，需要酌情使用

### 3、建造者模式（Builder Pattern）

- 又称生成器模式，分步创建一个对象，允许按步骤构造一个复杂对象

- 构建过程可以采用不同的表示，将一个复杂对象的构造层与表示层分离

#### 3.1、例子

- 电脑工厂、汽车工厂类似与这种由多个部件组成的，各个部件由代理商或者外包给其它人员进行生产，最后自己来装配形成完整的产品，在这个过程中，装配的人员不需要知道各个部件是怎么产生的，他只需要按照要求组合不同的部件即可

#### 3.2、实现

- 创建一个学生的对象，包含姓名、年龄、地址等信息，允许按步骤构造这个对象

```js
// 建造者
class CarBuilder {
    constructor(name) {
        this.name = name
    }
    
    /* 部件1 */
    setAge(age) {
        this.age = age
        return this
    }
    
    /* 部件2 */
    setAddress(address) {
        this.address = address
        return this
    }
}
// 链模式使用
const tom = new CarBuilder('Tom')
    .setAge('18')
    .setAddress('China')
console.log(tom) // CarBuilder {name: 'Tom', age: '18', address: 'China'}
```
> 建造者模式的优点：
> - 使用建造者模式可以**使产品的构建流程和产品的表现分离**，访问者不必知道产品部件实现的细节；
> - **扩展方便**；
> - **更好的复用性**，建造者模式将产品的创建算法和产品组成的实现分离，所以产品创建的算法可以复用，产品部件的实现也可以复用，带来很大的灵活性；
> 缺点：产品之间的差异较大时复用性会大大降低，产品之间的粒度较小时，会额外增加一些不必要的结构

### 4、代理模式（Proxy Pattern）
- 又称委托模式，为目标对象创建一个访问对象，从而控制对象的访问

#### 4.1、列子

- HTTP 相关的拦截器、vue-router、react-router路由跳转的拦截器

- 前端框架的数据响应式

#### 4.2、实现

- 一个房东有多套房子，他一个人想要租出去花费的时间跟精力会很大，于是他找了中介帮他把房子租出去，这个中介就相当于房东的代理

```js
// 房东
let landlord = {
    name: '房东',
    houses: [
        {
            name: '一室一厅',
            price: 1500,
            id: 1
        },
        {
            name: '单间配套',
            price: 1200,
            id: 2
        },
        {
            name: '两室一厅',
            price: 1800,
            id: 3
        }
    ],
    lease(id, price) {
        this.houses.map(item => {
            if (item.id === id) {
                if (item.price - price > 200) return console.log('可以出租，什么时候签合同')
                console.log('这个价格你可以看一下其它的房间')
            }
        })
    }
}
// 中介
let intermediary = {
    name: '中介',
    rentHouse: function(id, price) {
        if (price > 1000) {
            landlord.lease(id, price)
        } else {
            console.log('房租较低，没有合适的房源')
        }
    }
}

intermediary.rentHouse(1, 1500) // 可以出租，什么时候签合同
intermediary.rentHouse(3, 1500) // 这个价格你可以看一下其它的

```
> 代理模式的优点：保护目标对象、扩展目标对象的功能；\
> 缺点：使用不当增加了系统的复杂度，需要考虑场景来使用

### 5、享元模式（Flyweight Pattern）

- 运用共享技术来有效地支持大量细粒度对象的复用，以减少创建的对象的数量；

- 如果系统中存在多个相同的对象，那么只需共享一份就可以了，不必每个都去实例化每一个对象，这样来精简内存资源，提升性能和效率

#### 5.1、列子

- 线程池、连接池

- 高考考场、驾校驾考车等，资源可以共享、共同使用的

> 优点：
> - 减少了系统中的对象数量，提高了程序运行效率和性能，精简了内存占用，加快运行速度；
> - 外部状态相对独立，不会影响到内部状态，所以享元对象能够在不同的环境被共享；
> 缺点：
> - 引入了共享对象，使对象结构变得复杂；
> - 共享对象的创建、销毁等需要维护，带来额外的复杂度；

### 参考资料

- [JavaScript设计模式与开发实践](https://link.juejin.cn/?target=https%3A%2F%2Fbook.douban.com%2Fsubject%2F26382780%2F "https://book.douban.com/subject/26382780/")
- [设计模式](https://www.yuque.com/wubinhp/uxiv5i "设计模式")
>博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。
