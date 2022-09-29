---
title: 九宫格抽奖的简单实现
date: 2022-09-29
tags:
 - javascript
 - 随笔
categories:
 - javascript
---

## 前言

对象说晚饭吃什么太难选择，问我能不能做一个九宫格抽奖来决定我们晚上吃什么，emmm😿。

既然对象都开口了，不做也不行啊，最后给大家看一个简化版的（没有美工样式、编辑奖品这些）🙂

![1.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f71edda8b9124a84ace462978e4f8c68~tplv-k3u1fbpfcp-watermark.image?)


## 前期构思

首先是布局，这个比较简单，用弹性布局（flex）就足够了，抽奖盒子固定宽高，奖品项为盒子的1/3，超过换行就行，转动方向是这样的：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6c6e5b0e3484930accd5657f8c5a265~tplv-k3u1fbpfcp-watermark.image?)

抽奖方式主要分为两种，一种是随机抽取（完全随机），还有一种是指定奖品抽取（瞒着女朋友加的功能🫢，为了以后能吃到自己喜欢的东西😆）

转动速度的规则是：加速 -> 匀速 -> 减速🙋。

> 代码实现用了 `vue3`。
## 具体实现

### 1、布局📈

布局采用弹性布局，利用 `vue` 的 `v-for` 动态生成九个 item ，`select` 样式是用来控制转动的时候当前选中的 item。

> 这里循环的`key`值，我使用的索引值，主要是为了后面添加编辑奖品的时候，id不一定能保证按顺序排列，所以用索引值比较直观。

```js
<template>
  <div class="box">
    <div v-for="(item, index) in raffleItem" :key="index" :class="{item: true, select: selectItem === index}">{{ item.name }}</div>
  </div>
  <button @click="startRaffle">开始抽奖</button>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    // 奖品
    const raffleItem = [
      {name: '法拉利', id: 1},
      {name: '兰博基尼', id: 2},
      {name: '保时捷', id: 3},
      {name: '宝马', id: 4},
      {name: '悍马人', id: 5},
      {name: '红旗', id: 6},
      {name: '特斯拉', id: 7},
      {name: '比亚迪', id: 8},
      {name: '奔驰', id: 9}
    ]
    // 选中的item
    const selectItem = ref(0)
    return {
      raffleItem,
      selectItem
    }
  },
});
</script>

<style>
.box {
  width: 300px;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
.item {
  width: 95px;
  height: 95px;
}
.box, .item {
  box-sizing: border-box;
  border: 1px solid;
  border-radius: 5px;
}
.select {
  border-color: red;
  color: red;
  background: #579393;
}
</style>
```

### 2、指定奖品🏆

为每一个 `item` 添加单机事件 `appoint(index)`，传入参数为当前的索引值。

> 做成点击事件指定奖品主要是为了不让对象发现

```js
// 指定的奖品
const appointRaffle = ref(null)
// 指定奖品
const appoint = (index) => {
  appointRaffle.value = index
}
```

### 3、抽奖😳

抽奖的具体实现：
-  利用定时器 `setTimeout` 控制转动速度`speed`
-  转动速度（speed）的规则为，通过圈数跟中奖项计算出总的转动次数，然后先加速再匀速最后减速
-  利用样式规则来控制选中的 item `selectItem`
-  转动的圈数量`activeTurns` 通过随机数取 `10~20`
-  中奖的规则：圈数跟需要转动的总圈数相同并且转到本轮中奖的位置则停止转动表示中奖
-  每次抽奖前需要初始化各种状态值，如：选中的item（selectItem）、当前中奖（activeRaffle）...
-  如果已经在抽奖，开始抽奖按钮就会失效

```js
// 指定的奖品
const appointRaffle = ref(null)
// 指定奖品
const appoint = (index) => {
  appointRaffle.value = index
}
// 当前中奖
const activeRaffle = ref(null)
// 选中的item
const selectItem = ref(0)
// 定时器
const timer = ref(null)
// 圈数
const turnsNumbers = ref(0)
// 转多少圈中奖
const activeTurns = ref(0)
// 初始转动速度
const speed = ref(100)
// 剩余几个中奖
const surplusNum = computed(() => {
  // 剩余圈数 * 9 + 指定中奖的索引
  return (activeTurns.value - turnsNumbers.value) * 9 + appointRaffle.value - selectItem.value
})
// 初始化
const init = () => {
  selectItem.value = 1
  activeTurns.value = 0
  turnsNumbers.value = 0
  speed.value = 100
  activeRaffle.value = null
}
// 开始抽奖
const startRaffle = () => {
  // 如果已经存在定时器则表示已经在转动，不理会
  if(timer.value) return
  // 初始化
  init()
  // 如果没有指定奖品则随机指定一个奖品
  if(!appointRaffle.value) {
    // 取随机数0-8，数组的索引值
    appointRaffle.value = Math.round(Math.random() * 8)
  }
  // 取随机数10~20圈，id > 4时少转一圈
  const num = Math.round(Math.random()*10) + 10
  activeTurns.value = appointRaffle.value > 4 ? num - 1 : num
  // 抽奖
  handleRaffle()
}
```

**转动的方法实现**

这里需要注意的是，我们使用的是索引值，所以转动一圈为`0~8`，而不是`1~9`

```js
// 抽奖方法
const handleRaffle = () => {
  // 每转完一圈
  if (selectItem.value === 8) {
    turnsNumbers.value ++
    selectItem.value = 0
  } else {
    selectItem.value ++
  }
  // 转动速度规则
  speed.value = speedRole()
  // 如果圈数跟需要转动的总圈数相同并且转到本轮中奖的位置则停止转动
  if (activeTurns.value === turnsNumbers.value && selectItem.value === appointRaffle.value) {
    // 中奖
    activeRaffle.value = raffleItem[appointRaffle.value].name 
    // 清除定时器
    clearTimeout(timer.value)
    timer.value = null
    // 清除指定中奖项
    appointRaffle.value = null
  } else {
    // 定时器
    timer.value = setTimeout(handleRaffle, speed.value)
  }
}
```

**转动规则的方法**

转动速度分为4个阶段
1. 前面的 1/3 加速转动
2. 中间的 1/3 是匀速转动
3. 后面的 1/3 是减速转动
4. 最后的 9 个速度降低到 300 转动

> 经过计算，在圈数的分为内，最后的减速转动，不能把速度减少到 300 之上，所以不会出现最后 9 个加速转动的情况
```js
// 转动速度规则-先加速在匀速最后减速
const speedRole = () => {
  const total = activeTurns.value * 9 + appointRaffle.value
  // 剩余最后9个中奖时的时候速度降低到300
  if(surplusNum.value <= 9) return 300
  // 前3/1加速转动
  if(surplusNum.value >=  total * 2 / 3) return speed.value <= 50 ? 50 : speed.value - 2
  // 最后的3/1减速每次+1
  if(surplusNum.value <=  total / 3) return speed.value + 1
  // 剩余的中间匀速
  return speed.value
}
```

### 最终效果

[代码片段](https://code.juejin.cn/pen/7147873811507970082)


> 博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。
