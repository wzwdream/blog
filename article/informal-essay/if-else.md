---
title: 减少if-else，提高代码可读性
date: 2022-10-12
tags:
 - javascript
 - 随笔
categories:
 - javascript
---

## 前言💁‍♂️

相信大家或多或少都接触过拥有庞大 `if else` 的项目代码吧，多重嵌套的 `if else` 在维护的时候真的让人很恼火😡，有时候一个 bug 排查下来，严重感觉身体被掏空😿。

本文并未有消灭或歧视 `if else`的意思，`if else` 的好用都知道，这里只是在某些特定场景为大家额外提供一种思路，增加我们代码的可读性🐳。

## 短路运算💻

Javascript 的逻辑或 `||` 的短路运算有时候可以用来代替一些比较简单的 `if else`
-  逻辑或 `||` 的短路运算：若左边能转成true，返回左边式子的值，反之返回右边式子的值。

下面用一个简单的案例来表述

```js
let c
if(a){
    c = a
} else {
    c = b
}
```

大家看着上面的代码会难受嘛（本人有一丢丢的强迫症🤦），明明就是一个很简单的判断却需要写好几行代码才能实现。这个时候我们就可以用短路运算去简化我们的代码啦🙂。

```js
let c = a || b
```

这样看起来是不是就简洁了很多😕。

## 三元运算符🎶

三元运算符我觉得大家应该都很熟悉吧，很多时候简单的一些判断我们都可以使用三元运算符去替代 `if else`，这里只推荐 **一层** 三元运算符，因为多层嵌套的三元运算符也不具备良好的可读性🥹。

例子：条件为 true 时返回1，反之返回0：

```js
const fn = (nBoolean) {
    if (nBoolean) {
        return 1
    } else {
        return 0
    }
    
}

// 使用三元运算符
const fn = (nBoolean) {
    return nBoolean ? 1 : 0
}
```

三元运算符使用的地方也比较多，比如：条件赋值，递归...

```js
// num值在nBoolean为true时为10，否则为5
let num = nBoolean ? 10 : 5

// 求0-n之间的整数的和
let sum = 0;
function add(n){
    sum += n
    return n >= 2 ? add(n - 1) : result;
};
let num = add(10);//55
```

## switch case🖥️

上述的两种方式：短路运算跟三元运算虽然很好用，代码也很简洁，不过都只能用于简单的判断，遇到多重条件判断就不能使用了😭。

对于 `switch case`，虽然它的可读性确实比 `else if` 更高，但是我想大家应该都觉得它写起来比较麻烦吧😣（反正我觉得很麻烦😺）。

例：有A、B、C、D四种种类型，在A、B的时候输出1，C输出2、D输出3，默认输出0。

```js
let type = 'A'

//if else if
if (type === 'A' || type === 'B') {
    console.log(1);
} else if (type === 'C') {
    console.log(2);
} else if(type === 'D') {
    console.log(3);
} else {
    console.log(0)
}

//switch case
switch (type) {
    case 'A':
    case 'B':
        console.log(1)
        break
    case 'C':
        console.log(2)
        break
    case 'D':
        console.log(3);
        break;
    default:
        console.log(0)
}
```

## 对象配置/策略模式📑

对象配置看起来跟 `策略模式` 差不多，都是根据不同得参数使用不同得数据/算法/函数。😺

策略模式就是将一系列算法封装起来，并使它们相互之间可以替换。被封装起来的算法具有独立性，外部不可改变其特性。

接下来我们用对象配置的方法实现一下上述的例子

```js
let type = 'A'

let tactics = {
    'A': 1,
    'B': 1,
    'C': 2,
    'D': 3,
    default: 0
}
console.log(tactics[type]) // 1
```

接下来用几个例子让大家更加熟悉一点。

### 案例1 商场促销价🙋

根据不同的用户使用不同的折扣，如：普通用户不打折，普通会员用户9折，年费会员8.5折，超级会员8折。

使用`if else`实现😢
```js
// 获取折扣 --- 使用if else
const getDiscount = (userKey) => {
    if (userKey === '普通会员') {
        return 0.9
    } else if (userKey === '年费会员') {
        return 0.85
    } else if (userKey === '超级会员') {
        return 0.8
    } else {
        return 1
    }
}
console.log(getDiscount('普通会员')) // 0.9

```

使用对象配置/策略模式实现🙂
```js
// 获取折扣 -- 使用对象配置/策略模式
const getDiscount = (userKey) => {
    // 我们可以根据用户类型来生成我们的折扣对象
    let discounts = {
        '普通会员': 0.9,
        '年费会员': 0.85,
        '超级会员': 0.8,
        'default': 1
    }
    return discounts[userKey] || discounts['default']
}
console.log(getDiscount('普通会员')) // 0.9
```

从上面的案列中可以明显看得出来，使用对象配置比使用if else可读性更高，后续如果需要添加用户折扣也只需要修改折扣对象就行👍。


对象配置不一定非要使用对象去管理我们键值对，还可以使用 `Map`去管理🦋，如：
```js
// 获取折扣 -- 使用对象配置/策略模式
const getDiscount = (userKey) => {
    // 我们可以根据用户类型来生成我们的折扣对象
    let discounts = new Map([
        ['普通会员', 0.9],
        ['年费会员', 0.85],
        ['超级会员', 0.8],
        ['default', 1]
    ])
    return discounts.get(userKey) || discounts.get('default')
}
console.log(getDiscount('普通会员')) // 0.9
```

### 案例2 年终奖🏆

公司的年终奖根据员工的工资基数和绩效等级来发放的。例如，绩效为A的人年终奖有4倍工资，绩效为B的有3倍，绩效为C的只有2倍。

假如财务部要求我们提供一段代码来实现这个核算逻辑，我们要怎么实现呢？

这不是很简单嘛，一个函数就搞定了。

```js
const calculateBonus = (performanceLevel, salary) => { 
    if (performanceLevel === 'A'){
        return salary * 4
    }
    if (performanceLevel === 'B'){
        return salary * 3
    }
    if (performanceLevel === 'C'){
        return salary * 2
    }
}
calculateBonus( 'B', 20000 ) // 输出：60000
```

可以发现，这段代码十分简单，但是 `calculateBonus`函数比较庞大，所有的逻辑分支都包含在`if else`语句中，如果增加了一种新的绩效等级D，或者把A等级的倍数改成5，那我们必须阅读所有代码才能去做修改🙇‍♂️。

所以我们可以用对象配置/策略模式去简化这个函数😺

```js
let strategies = new Map([
    ['A', 4],
    ['B', 3],
    ['C', 2]
])
const calculateBonus = (performanceLevel, salary) => { 
    return strategies.get(performanceLevel) * salary
}
calculateBonus( 'B', 20000 ) // 输出：60000
```

至此，这个需求做完了，然后产品经理说要加上一个部门区分，假设公司有两个部门D和F，D部门的业绩较好，所以年终奖翻1.2倍😄，F部门的业绩较差，年终奖打9折😭。

改造以上代码，把状态值拼接，然后存入Map中

```js
// 以绩效_部门的方式拼接键值存入
let strategies = new Map([
    ['A_D', 4 * 1.2],
    ['B_D', 3 * 1.2],
    ['C_D', 2 * 1.2],
    ['A_F', 4 * 0.9],
    ['B_F', 3 * 0.9],
    ['C_F', 2 * 0.9]
])
const calculateBonus = (performanceLevel, salary, department) => { 
    return strategies.get(`${performanceLevel}_${department}`) * salary
}
calculateBonus( 'B', 20000, 'D' ) // 输出：72000
```
## 结尾🔚

本文主要是向大家传递一种思想，我们有很多的方法去优化我们的代码，提高我们代码的可读性。

对`if else`并没有歧视的意思，只是希望在大家以后的代码中不仅仅只有`if else`😨。


> 博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。