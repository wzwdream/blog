---
title: 原型与原型链
date: 2022-06-07
tags:
 - javascript
categories: 
 - javascript
---
### 1、什么是原型？

-   原型分为显式原型（`prototype`）和隐式原型（`__proto__`）；
-   显式原型（`prototype`）也称作构造函数的原型对象；
-   构造函数具有显式原型（`prototype`），实例具有隐式原型（`__proto__`），构造函数的显式原型（`prototype`）和其实例的隐式原型（`__proto__`）都指向同一个地方（原型对象）；
-   同一个构造函数创建的实例的隐式原型（`__proto__`）相同，并且都跟该构造函数的显式原型（`prototype`）一致

验证一下：
``` js
// 构造函数
function Person(name, age) { this.name = name this.age = age }
Person.prototype.sayName = function() { consle.log(this.name) }
// 实例
const person1 = new Person('Tom', '22')
const person2 = new Person('Jim', '18')
// 构造函数具有显式原型（prototype），实例具有隐式原型（__proto__） console.log(Person.prototype) // {sayName: ƒ, constructor: ƒ} console.log(person1.__proto__) // {sayName: ƒ, constructor: ƒ}
// 同一个构造函数创建的实例的隐式原型（__proto__）相同，并且都跟该构造函数的显式原型（prototype）一致
console.log(person1.__proto__ === person2.__proto__) // true
console.log(person1.__proto__ === Person.prototype) // true
console.log(person2.__proto__ === Person.prototype) // true
```
关系图

![截图.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f114b4dc81db487b899e72c4995361b6~tplv-k3u1fbpfcp-watermark.image?)

### 2、函数与对象

#### 1、函数

-   创建函数的两种方法：字面量跟`new Function()`，字面量方法的本质其实还是`new Function(`)， 也就是说Function也是一个构造函数，函数是其实例；
-   构造函数也是一个函数，可以通过new关键字创建一个实例的函数就是构造函数；
-   Function的本质也是一个函数，Function是它自己的实例；
-   `constructor`存在于function的显式原型（`prototype`）中，保存了指向function的一个`引用`。

验证
```js
const fn = function() {}
const fn1 = function(name) { consle.log(name) }
// Function也是一个构造函数，函数是其实例
console.log(fn.__proto__ === fn1.__proto__) // true
console.log(fn.__proto__ === Function.prototype) // true
console.log(fn1.__proto__ === Function.prototype) // true
console.log(fn.__proto__ === Function.__proto__) // true
// Function的本质也是一个函数，也就是说Function是它自己的实例
console.log(Function.__proto__ === Function.prototype) // true
// constructor存在于function的显式原型（prototype）中，保存了指向function的一个引用。
console.log(fn.prototype) // {constructor: ƒ}
console.log(fn.prototype.constructor === fn) // true
```

关系图

![截图 (1).png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80724f9d09d54da4839008b44aa0b15e~tplv-k3u1fbpfcp-watermark.image?)

#### 2、对象

-   对象的创建方法：字面量、new Object、Object.create()、构造函数创建，跟函数一样，字面量方法的本质是new Object；
-   Object.create()创建的是一个没有原型的对象，构造函数创建的对象的原型都指向其构造函数；
-   Object也是一个构造函数，那它也是`Function`的实例，Object的`__proto__`也指向Function的`prototype`，通过`new Object`创建的对象就是Object的实例；

验证
```js
const people = { name: 'Lucy' }
const people1 = { name: 'Juli' }
// 通过new Object创建的对象就是Object的实例；
console.log(people.__proto__ === people.__proto__) // true
console.log(people.__proto__ === Object.prototype) // true
// Object也是一个构造函数，那它也是Function的实例，Object的__proto__也指向Function的prototype 
console.log(Object.__proto__ === Function.prototype) // true
```
关系图

![截图 (2).png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa0e4745e1e64f9faa5b44a502a40a3e~tplv-k3u1fbpfcp-watermark.image?)

### 3、什么是原型链？

-   通俗的说原型链就是多个`__proto__`相连形成的一个有层级的 ' 依赖关系 ' ；
-   构造函数的原型对象（`prototype`）是一个对象，那这个对象的隐式原型（`__proto__`）应该指向Object构造函数的原型对象/显式原型（`prototype`），也就是说构造函数的`原型对象`（`prototype`）是Object构造函数的一个实例；
-   原型链的终点是null，Object的原型对象（`prototype`）的隐式原型（`__proto__`）就是null；

验证
```js
// Person构造函数
function Person(name, age) { this.name = name this.age = age }
Person.prototype.sayName = function() { console.log(this.name) }
const person1 = new Person('Tom', '22')
const person2 = new Person('Jim', '18')
// 函数
const fn1 = function() {}
const fn2 = function(name) { consle.log(name) }
// 对象
const people1 = { name: 'Lucy' }
const people2 = { name: 'Juli' }
// 构造函数的原型对象（prototype）是Object构造函数的一个实例
console.log(Person.prototype.__proto__ === Object.prototype) // true
console.log(Function.prototype.__proto__ === Object.prototype) // true
// 原型链的终点是null，Object的隐式原型（__proto__）就是null
console.log(Object.prototype.__proto__ === null) // true
```
关系图

![截图 (3).png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17136bf600ed43158800796977a087a9~tplv-k3u1fbpfcp-watermark.image?)

### 4、原型继承

-   实例可以使用来自构造函数的`属性`与`方法`，也就是`继承`了构造函数的`属性`与`方法`；
-   实例本身没有这个属性或者方法，那js会沿着`原型链`向上`查找`，直到找到或者到`null`为止；

验证
```js
// Person构造函数
function Person(name, age) {
    this.name = name
    this.age = age
    this.class = '123'
}
Person.prototype.sayName = function() {
    console.log(this.name, this.class)
}
const person1 = new Person('Tom', 18)
console.log(person1.class) // '123'
person1.sayName() // 'Tom' , '123'
```
### 5、原型相关的方法

#### 1. Object.prtotype.isPrototype()方法

判断一个对象是否是另外一个对象的原型，但是需要注意只要某个对象存在原型链上，就会返回true

```js
function Person() {}
const person1 = new Person()
const person2 = {}
Person.prototype.isPrototypeOf(person1) // true
Person.prototype.isPrototypeOf(person2) // false
Object.prototype.isPrototypeOf(person2) // true
// 只要某个对象存在原型上，就会返回true
Object.prototype.isPrototypeOf([]) // true
```

#### 2. Object.setPrototypeOf()方法

该方法接收两个参数，第一个是现有对象，第二个是新设置的原型对象，为现有对象设置原型，返回一个新对象。

```js
var a = {x: 1}
var b = Object.setPrototypeOf({}, a)
// 等同于
// var b = {__proto__: a}
b.x // 1
```

#### 3. instanceof方法

判断一个对象是否在另一个对象的原型链上

```js
function Person() {}
const person1 = new Person()
const person2 = {}
person1 instanceof Person // true
person2 instanceof Person // false
```

>博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。