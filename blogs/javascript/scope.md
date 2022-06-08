---
title: 作用域跟作用域链
date: 2022-06-08
tags:
 - javascript
categories: 
 - javascript
---
### 1、什么是作用域？

- 作用域就是代码执行的环境，在程序运行时代码中的某些特定部分中变量、函数和对象的**可访问性**。

- 作用域分为全局作用域跟函数作用域，js中没有**块级作用域**（ES6的let、const出现才实现了块级作用域）；

#### 1.1 全局作用域

- 在任何地方都能访问到的对象称之为全局作用域；

- window对象下的所有属性和方法都有全局作用域；

- 最外层定义的变量跟方法具有全局作用据；

- 所有未定义直接赋值的变量拥有全局作用域；

#### 1.2 函数作用域

- 定义函数时的花括号`{}`为函数作用域；

- 在函数作用域定义的变量、方法，在函数作用域外部无法访问；

```js
var a = '外层变量'
function fn() {
    // 函数作用域
    var b = '内层变量'
    c = '未定义直接赋值'
    console.log(a)
}
fn() // 外层变量
console.log(c) // 未定义直接赋值
console.log(b) // Uncaught ReferenceError: b is not defined
    at <anonymous>:10:13
```
> 代码解析: 
> - a变量定义在最外层，拥有全局作用域，所以在函数fn里面可以访问到a，所以执行函数时，输出`外层变量`；
>
> - b变量的定义在函数fn的作用域下，在作用域外时不能访问到b的，所以在外层访问b变量就会报错；
> - c变量没有定义直接赋值，所以c变量变成了全局作用域下的变量，所以在外部可以直接使用，输出`未定义直接赋值`；

#### 1.3 块级作用域

- 在 `{}`中的内容就被认为块级作用域；

- 只有使用let声明的变量、方法才具备块级作用域；

- if块、while块、function块、单独的块都可以被认为时let声明的块级作用域；

```js
if (true) { let a; }
console.log(a); // ReferenceError: a 没有定义
while (true) { let b; } 
console.log(b); // ReferenceError: b 没有定义
function foo() { let c; }
console.log(c); // ReferenceError: c 没有定义
// 这不是对象字面量，而是一个独立的块，JavaScript 解释器会根据其中内容识别出它来
{
    let d;
}
console.log(d); // ReferenceError: d 没有定义
```

> let与var的区别
> - let声明的变量不存在变量提升（严谨的说，let声明的变量会产生'暂时性死区'），不能在声明变量之前使用变量；
>
> - let定义的变量不能重复声明，否则会报错；

```js
function fn() {
    console.log(a) // undefined
    // 不能在变量声明前使用变量
    console.log(b) // Uncaught ReferenceError: Cannot access 'b' before initialization
    var a = 1
    let b = 2
    // 如果重复声明同名变量会报错
    let b = 5 // // Uncaught SyntaxError: Identifier 'b' has already been declared
}
fn()
```

### 2、作用域链

- 各个作用域访问变量和方法的顺序；

- 当我们使用一个变量时，js会顺着作用域链一层一层的像上查找，直到最顶层的全局作用域，如果在全局作用域中没有找到该变量或者方法，就返回undefined；

- 作用域链的存在，使得内部作用域可以顺着作用域链访问到外部作用域的变量或者方法，但是外部作用域去不能访问到内部作用域的变量或者方法；

```js
var a = 10
var b = 20
var c = 30
function fn() {
    var b = 40
    function bar() {
        c = 50
        console.log(a + b + c)
    }
    return bar
}
var x = fn(),
b = 200
x() // 100
console.log(b) // 200
console.log(c) // 50
```
分析这个试题前，大家可以先看一下这个图

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/540c500e67554aa1b70f65d9558f5fb0~tplv-k3u1fbpfcp-watermark.image?)

从图中可以看出，当前试题中存在三个嵌套的作用域
- 执行`fn()`时，创建了一个局部变量`b`且值为40，同时把`bar`函数返回，赋值给`x`；
- 执行`x()`，即执行`bar`函数代码，这里的`c`并没有`声明`，直接赋值，所以顺着`作用域链`向上查找，在fn中没有找到`c`，继续向上查找，在全局作用域中找到了`c`，所以全局作用域下的`c`变量的值被改变为50；
- 接下来输出a+b+c，同理，`b`变量在fn中找到，使用就是fn中的`b`，而不是全局作用域下的`b`，所以a+b+c就是全局作用域下的a、c加上fn中的b，最后输出200；
- 在全局作用域下打印`b`，使用的全局作用域的`b`，所以输出200

3、试题
```js
var a="aa";
function test(){
 console.log(a) // undefined
 var a = "bb"
 console.log(a) // “bb”
}
test()
console.log(a) // "aa"
```
```js
var a = 1
var b = 2
var c = 3
function fn(a) {
    a = 4
    return a + b
}
function sum(a) {
    var b = 10
    a = c
    c = 12
    return a + b
}
b = 8
c = 9
var d = fn(6)
var e = sum(6)
console.log(c) // 12
console.log(d) // 12
console.log(e) // 19
```
### 参考资料
[JavaScript高级程序设计（第4版） (豆瓣) (douban.com)](https://book.douban.com/subject/35175321/)

> 博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。