---
title: typeScript基础学习
date: 2022-9-10
tags:
 - typeScript
categories:
 - typeScript
---

## 前言

都2022年了😎，我才开始学习 `TypeScript`，也不知道还能不能跟上时代的脚步，看来是舒适的工作环境让我逐渐失去了前进的动力🤦‍♂️。

这篇文章主要是我总结的一些 `TypeScript`的基础知识，如果有什么不对的地方，欢迎大家指出来😤。

## 一、Typescript 简介

从官网的描述来看，`TypeScript` 是 `JavaScript` 的超集，也就是说`TypeScript`拥有 `JavaScript` 的所有功能，并且提供了可选的静态类型和基于类的面向对象编程。

同时 `TypeScript` 还可以提供最新的和不断发展的JavaScript特性，包括那些来自2015年的ECMAScript和未来的提案中的特性，比如异步功能和Decorators，以帮助建立健壮的组件。

### 1、Typescript 值得学吗？

我想很多人都跟我一样存在这样的疑问吧，下面我列举几个我们需要学习 `TypeScript` 的理由📚

-   更好的开发体验，可以清晰的知道值的类型。
-   提前发现类型相关的代码错误。
-   `TypeScript` 编写的代码，具有更高的可读性，更加容易重构。
-   `TypeScript` 越来越受欢迎，大部分前端开源库、框架都逐步支持 `TypeScript`。
-   `TypeScript` 是 **JavaScript 超集**，**完全兼容**所有 JavaScript 语法规则。

当然，使用 `Typescript` 也有一些缺点：

-   引入了太多的新概念，类似泛型、枚举等等。不过好在ts 是渐进式的，就是你完全不会直接写 JS 代码也是完全没有问题的，后面学习一个就可以用一个。
-   不适用于小型项目，有可能会增加开发成本，因为在开发时会有很多的类型声明。
-   `TypeScript` 需要编译，项目越大消耗时间越长。但是，编译花费的那点时间跟后期排错的时间比起来不值一提。。

### 2、获取 TypeScript

命令行的 TypeScript 编译器可以使用 Node.js 包来安装。

**1.安装 TypeScript**

```js
npm install -g typescript
```

**2.编译 TypeScript 文件**

```js
tsc helloworld.ts
# helloworld.ts => helloworld.js
```

TypeScript 官方还提供了一个在线的学习网站 [TypeScript Playground](https://www.typescriptlang.org/play) 来学习新的语法或新特性。

## 二、TypeScript 中的基础类型

在 `TypeScript` 中，我们可以在声明一个变量之后设置我们想要添加的类型 `:type` 🤖(我们一般称之为“类型注释”或“类型签名”)

```
let nunm: number = 0
let name: string = 'Lucy'
let isBoolean: boolean = true
let unit: number // 声明变量而不赋值
unit = 5
```

### 1、布尔值（boolean）
```js
let isBoolean: boolean = false
```

### 2、数字（number）
除了支持十进制和十六进制字面量，TypeScript还支持ECMAScript 2015中引入的二进制和八进制字面量。
```js
let num: number = 0
let hexLiteral: number = 0xf00d
let binaryLiteral: number = 0b1010
let octalLiteral: number = 0o744
```

### 3、字符串(string)
跟JavaScript一样，可以使用双引号（ `"`）或单引号（`'`）表示字符串，也可以使用 `模板字符串` 。
```js
let name: string = 'Lucy'
let age: number = 18
let word = `My name is ${name}, My age is ${18}`
```
### 4、数组(Array)

`TypeScript`定义数组类型有两种方式
- 在元素类型后面接上 `[]`，表示由此类型元素组成的一个数组
```js
let numArr: number[] = [1,2,3,4]
```
- 使用数组泛型，`Array<元素类型>`
```js
let strArr: Array<string> = ['a', 'b', 'c']
```

### 5、元组 Tuple

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。也就是初始化的时候类型和`大小`以及确定的，如果后续赋值类型`大小`不匹配就会抛出异常。 

比如，你可以定义一对值分别为 `string`和`number`类型的元组。

```js
let x: [string, number];
x = ["a", 0];
```

与数组一样，我们可以通过下标来访问元组中的元素：

```js
console.log(x[0]); // a
console.log(x[1]); // 0
```

在元组初始化的时候，如果出现类型和`大小`不匹配的话，比如：

```
// 类型不匹配
x = [0, "a"];
// error
// Type 'number' is not assignable to type 'string'.
// Type 'string' is not assignable to type 'number'.

// 大小不匹配
x =  ['a']
// error
// Type '[string]' is not assignable to type '[string, number]'. Source has 1 element(s) but target requires 2.
```

### 6、枚举类型(enum)
它是一种可以将多个常量分组为一个并附加一系列值的类型，使用枚举定义的常量称为枚举器列表，默认情况下，枚举器从零开始按顺序编号。

```js
// 数字枚举，默认从0开始
enum Direction { NORTH, SOUTH, EAST, WEST, }
// 指定开始值
enum Color {Red = 1, Green, Blue}
// 字符串枚举
enum Direction { NORTH = "NORTH", SOUTH = "SOUTH" }
```

### 7、Any类型

`any类型`可以是任意的一种类型。在不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查就可以使用`any类型`进行标记。

```js
let notSure: any = 4
notSure = "maybe a string instead"
notSure = false
```
> 应该尽量避免使用 `any类型` ，因为它会让我们的类型变得不确定，不利于后期的维护。

### 8、Void类型

`void`类型表示没有任何类型。 通常当一个函数没有返回值时，它的返回值类型是 `void`：

```js
function warnUser(): void {
    console.log("This is my warning message");
}
```

一个`void`类型的变量只能为它赋予`undefined`和`null`：

```js
let unusable: void = undefined;
```

### 9、Null 和 Undefined

TypeScript里，`undefined`和`null`两者各自有自己的类型分别叫做`undefined`和`null`。

```js
let u: undefined = undefined;
let n: null = null;
```
> 默认情况下`null`和`undefined`是所有类型的子类型。 就是说你可以把 `null`和`undefined`赋值给`number`类型的变量。然而，当你指定了`--strictNullChecks`标记，`null`和`undefined`只能赋值给`void`和它们各自。


### 10、Never

`never`类型表示的是那些永不存在的值的类型。 例如， `never`类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型.

`never`类型是任何类型的子类型，也可以赋值给任何类型；然而，*没有*类型是`never`的子类型或可以赋值给`never`类型（除了`never`本身之外）。 即使 `any`也不可以赋值给`never`。

下面是一些返回`never`类型的函数：

```
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {
    }
}
```

## 三、类型断言

有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

通过*类型断言*这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。

类型断言有两种形式。 其一是“尖括号”语法：

```js
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```

另一个为`as`语法：

```js
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```

> 两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用JSX时，只有 `as`语法断言是被允许的。

## 四、类型推断

如果变量有默认值的话，一般我们也不需要显式声明类型，`TypeScript`  会自动推断变量的类型（类型推断）：

```
let id = 5; // number 类型
let firstname = 'ConardLi'; // string 类型
let hasDog = true; // boolean 类型

hasDog = 'yes'; // ERROR
```

## 五、 联合类型

我们还可以将变量设置为联合类型（联合类型是可以分配多个类型的变量）：

```
let age: string | number;
age = 17;
age = '17';
```

## 六、交叉类型

交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。

```
interface Person {
  name: string;
  age: number;
}

interface Family {
  father: string;
}

type FamilyPerson = Person & Family;

const familyPerson: FamilyPerson = {
  name: 'Lucy',
  age: 18,
  father: 'Tom'
};

```

我们定义了两个类型 `Person` 和 `Family`，然后使用 `&` 创建了交叉类型 `FamilyPerson`，这个类型同时拥有前两个类型的所有特性。


## 七、TypeScript 中的接口

接口定义了对象的外观：

```
interface Person {
  name: string;
  age: number;
}

let lucy: Person = { name: 'Lucy', age: 18 }
```

**可选属性和只读属性**
```js
interface Person { 
    readonly name: string; // 只读属性
    age?: number; // 可选属性
}
```

只读属性只能在对象刚刚创建的时候修改其值。

```js
let lucy: Person = { name: 'Lucy', age: 18 }
lucy.name = 'Tom' // error:Cannot assign to 'name' because it is a read-only property.
```

## 八、TypeScript 中的函数

我们可以定义函数参数和返回值的类型：

```js
// 定义一个名为 add 的函数，它接受两个类型为 number 的变量，并返回一个 number
function add(x: number, y: number): number {
  return x + y
}

console.log(add(1, 2)); // 3
```

ES6 箭头函数的写法：

```js
 const add = (x: number, y: number): number => {
  return x + y
};
```

如果函数没有返回值，在 `TS` 里表示为返回 `void`，你也不需要显式声明，`TS` 一样可以进行类型推断：

```js
const log = (msg: string): void => {
  console.log('打印一些内容: ' + msg);
};
```

## 九、TypeScript 中的类


跟 `JavaScript` 一样，我们可以使用 `class` 关键字创建对象，并且可以定义类中每条数据的类型。

```js
class Person {
  name: string;
  isCool: boolean;
  age: number;

  constructor(n: string, c: boolean, a: number) {
    this.name = n;
    this.isCool = c;
    this.age = a;
  }

  sayHello() {
    return `Hi，我是 ${this.name} ，我今年 ${this.age} 岁了`;
  }
}
const person1 = new Person('ConardLi', true, 17);
```

我们可以通过下面的写法，属性会在构造函数中自动分配，我们类会更加简洁：

```js
class Person {
  constructor(
    readonly name: string,
    private isCool: boolean,
    protected email: string,
    public age: number
  ) {}
}
```

> - 如果我们省略访问修饰符，默认情况下属性都是 `public`
> - 和 JavaScript 一样，类也是可以 `extends` 的。


### 1、类的 interface

可以通过接口来规定一个类它必须包含某些属性和方法：

```
interface HasFormatter {
  format(): string;
}

class Person implements HasFormatter {
  constructor(public username: string, protected password: string) {}

  format() {
    return this.username.toLocaleLowerCase();
  }
}

let person1: HasFormatter;

person1 = new Person('ConardLi', 'admin123');

console.log(person1.format()); // conardli
```

### 2、把类当做接口使用

类定义会创建两个东西：类的实例类型和一个构造函数。

```js
class Point { 
    x: number;
    y: number;
}
interface Point3d extends Point { 
    z: number;
}
let point3d: Point3d = {x: 1, y: 2, z: 3};
```

## 十、泛型

泛型指的是在定义函数/接口/类型时，**不预先指定具体的类型，而是在使用的时候在指定类型限制**的一种特性。

```js
function identity<T>(arg: T): T { return arg; }
```

我们给identity添加了类型变量`T`。 `T`帮助我们捕获用户传入的类型（比如：`number`），之后我们就可以使用这个类型。

> 上述中的 `T` 并没有什么特别的含义，只不过是一个约定好的规范而已。也就是说使用大写字母 A-Z 定义的类型变量都属于泛型，把 T 换成 A，也是一样的。

下面我们介绍一下一些常见泛型变量代表的意思：

-   T（Type）：表示一个 TypeScript 类型
-   K（Key）：表示对象中的键类型
-   V（Value）：表示对象中的值类型
-   E（Element）：表示元素类型

### 1、泛型接口

当我们不知道对象中的某个值是什么类型时，可以使用泛型来传递该类型：

```
interface Person<T> {
  name: string;
  age: number;
  documents: T;
}

const person1: Person<string[]> = {
  name: 'ConardLi',
  age: 17,
  documents: ['passport', 'bank statement', 'visa'],
};

const person2: Person<string> = {
  name: 'Tom',
  age: 20,
  documents: 'passport, P45',
};
```

### 2、泛型类

泛型类看上去与泛型接口差不多。 泛型类使用（ `<>`）括起泛型类型，跟在类名后面。

```js
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```


## 十一、TypeScript 中的类型收窄

在 `TypeScript` 中，变量可以从不太精确的类型转移到更精确的类型，这个过程称为类型收窄。

下面是一个简单的例子，展示了当我们使用带有 `typeof` 的 `if` 语句时，`TypeScript` 如何将不太特定的 `string | number` 缩小到更特定的类型：

```
function addAnother(val: string | number) {
  if (typeof val === 'string') {
    // ts 将 val 视为一个字符串
    return val.concat(' ' + val);
  }

  // ts 知道 val 在这里是一个数字
  return val + val;
}

console.log(addAnother('哈哈')); // 哈哈 哈哈
console.log(addAnother(17)); // 34
```

另一个例子：下面，我们定义了一个名为 `allVehicles` 的联合类型，它可以是 `Plane` 或 `Train` 类型。

```
interface Vehicle {
  topSpeed: number;
}

interface Train extends Vehicle {
  type: 'Train';
  carriages: number;
}

interface Plane extends Vehicle {
  type: 'Plane';
  wingSpan: number;
}

type PlaneOrTrain = Plane | Train;

function getSpeedRatio(v: PlaneOrTrain) {
  if (v.type === 'Train') {
    return v.topSpeed / v.carriages;
  }
  // 如果不是 Train，ts 就知道它是 Plane
  return v.topSpeed / v.wingSpan;
}
let bigTrain: Train = {
  type: 'Train',
  topSpeed: 100,
  carriages: 20,
};
```

## 参考

-   https://www.typescriptlang.org/docs/

> 博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。
