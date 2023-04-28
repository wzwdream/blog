---
title: vue3+Ts+grid布局实现的拖拽布局插件
date: 2022-04-28
tags:
 - TypeScript
 - vue3
categories:
 - TypeScript
 - vue3
---
## 💯前言

许多应用程序都需要实现可拖拽的布局以方便用户自定义布局。虽然这似乎是一个简单而基本的功能，但原生拖拽还存在许多问题，如兼容性、用户体验和可访问性等。此外，每次遇到这种需求时，手动实现可能较为麻烦且浪费时间。

因此，在本文中，我们将介绍如何使用 `Vue 3` 和 `Typescript` 开发一个简单的拖拽布局插件，以解决上述问题并巩固 `Vue 3` 的相关知识点。

> [插件github地址](https://github.com/wzwdream/vue3-grid-layout)\
> [预览地址](https://wzwdream.github.io/vue3-grid-layout/)\
> [插件npm地址](https://www.npmjs.com/package/vue3-grid-layout-picker)

## 🔱项目的环境依赖

```json
  "dependencies": {
    "sass": "^1.55.0",
    "vue": "^3.2.37"
  },
  "devDependencies": {
    "@types/node": "^18.11.4",
    "@typescript-eslint/eslint-plugin": "^5.54.0",
    "@typescript-eslint/parser": "^5.54.0",
    "@vitejs/plugin-vue": "^3.1.0",
    "eslint": "^8.26.0",
    "eslint-plugin-vue": "^9.9.0",
    "typescript": "^4.9.5",
    "vite": "^3.1.0",
    "vite-plugin-dts": "^2.3.0",
    "vue-tsc": "^0.40.4"
  }
```

## 🤺插件的特性

-   可拖拽、可调整大小
-   网格吸附
-   碰撞检测
-   兼容移动端（采用 `pointer` 事件编写，兼容移动端）
-   干净的依赖关系，除了 `vue` 和 `sass`，没有其它的依赖项（也就意味着后面兼容其它框架会变得简单）。

## 🤖编写组件

以下组件设计的一些选择和决策：

1.  使用 `provide/inject` 进行组件通信，而不是使用 `vuex` 或者 `pinia`，以减少依赖项。
2.  采用 `grid` 布局作为基础布局，但是方块中的布局使用定位实现，主要是为了实现缩放效果。
3.  使用 `canvas` 进行网格线的绘制，因为暂时没有找到更好的绘制方法。同时，欢迎大家提出更好的建议。
4.  在编写组件时，使用 `defineComponent` 而不是最新的 `setup` 语法糖，以获得更好的 `TypeScript` 支持。
5.  子组件只需要一个 `id` 作为唯一的标识就可以实现数据关联（该灵感来源 `Element-Plus` 的 `table` 组件）。
6.  事件使用 `pointer` 指针事件进行开发，完美适配移动端。

总之，这些选择和决策都是经过慎重考虑的，旨在提高代码质量和效率。如果读者有更好的建议或想法，欢迎提供反馈，共同探讨。


## 📦 安装

```shell
# 使用 npm
npm install vue3-grid-layout --save

# 使用 yarn
yarn add vue3-grid-layout -D

# 使用 pnpm
pnpm add vue3-grid-layout -D
```
## 💡 用法

### 引入
```js
// main.ts
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Vue3GrifLayout from 'vue3-grid-layout-picker'
import "vue3-grid-layout-drop/dist/style.css" // 引入组件样式
createApp(App).use(Vue3GrifLayout).mount('#app')
```

### 组件中使用
```ts
<template>
  <div class="layout-box">
        <grid-layout
            v-model:data="layout"
            @draggableStart="draggableStart"
            @draggableHandle="draggableHandle"
            @draggableEnd="draggableEnd"
            @remove="remove"
        >
          <grid-item v-for="item in layout" :key="item.id" :id="item.id">
              {{ item.id }}
          </grid-item>
      </grid-layout>
      <button @click="layout = []">改变</button>
  </div>
</template>

<script setup lang="ts">
import { Layout, LayoutItem } from 'vue3-grid-layout-drop/dist/Vue3GridLayout/types/index'
import { ref, watch } from 'vue';

const layout = ref([
  { id: '1', x: 1, y: 1, h: 1, w: 1 },
  { id: '2', x: 2, y: 1, h: 1, w: 1 },
  { id: '3', x: 3, y: 1, h: 1, w: 1 },
  { id: '4', x: 4, y: 1, h: 1, w: 1 },
  { id: '5', x: 1, y: 2, h: 1, w: 1 },
  { id: '6', x: 1, y: 3, h: 1, w: 1 },
  { id: '7', x: 1, y: 4, h: 1, w: 1 },
  { id: '8', x: 1, y: 5, h: 4, w: 1 },
  { id: '9', x: 2, y: 2, h: 1, w: 1 },
  { id: '10', x: 2, y: 3, h: 1, w: 1 },
  { id: '11', x: 2, y: 4, h: 1, w: 1 },
  { id: '12', x: 5, y: 5, h: 1, w: 2 },
])
// 验证更新数据是否正确
watch(layout, () => {
  console.log('数据更新', layout.value)
}, {deep: true})

const draggableStart = (id: string) => {
  console.log('拖拽开始', id)
}
const draggableHandle = (id: string, data: LayoutItem) => {
  console.log('拖拽中', id, data)
}
const draggableEnd = (data: Layout) => {
  console.log('拖拽结束', data)
}
const remove = (id: string) => {
  console.log('删除', id)
}
</script>
<style>
.layout-box {
  width: 1000px;
}
</style>
```
> **这里需要注意的一点是，在组件的外层或者组件本身需要指定宽度，不然宽度会计算为0**


## 🎁 Apis

### 🔩 Props
#### GridLayout
```ts
interface LayoutItem {
    id: string,
    x: number,
    y: number,
    h: number,
    w: number
}
type Layout = LayoutItem[]
```
| 名称            | 类型      | 默认值 | 说明                                            |
| --------------- | --------- | ------ | ----------------------------------------------- |
| data            | `Layout`  | `[]`   | 布局数据，支持双向绑定v-model:data="layoutData" |
| col             | `number`  | 12     | 列数                                            |
| rowH            | `number`  | 50     | 行高                                            |
| gutter          | `number`  | 10     | 网格间距                                        |
| drage           | `boolean` | true   | 是否可拖拽                                      |
| resize          | `boolean` | true   | 是否可缩放                                      |
| remove          | `boolean` | true   | 是否可删除                                      |
| isDrawGridLines | `boolean` | true   | 是否绘制网格线                                 |

#### GridItem

| 名称            | 类型      | 默认值 | 说明                                            |
| --------------- | --------- | ------ | ----------------------------------------------- |
| id            | `string`  | ``   | 方块的唯一标识 |

### 🎍 插槽

| 名称        | 说明                           |
| ----------  | ------------------------------ |
| default |  自定义每个方块的内容 |
| resize  | 自定义缩放的图标 |
| remove  | 自定义删除图标 |

### 🪢 事件

| 名称              | 说明               |  回调参数     |
| -------------     | ----------------- | ------------  |
| draggableStart    | 拖拽开始时触发 | 拖拽的方块的id |
| draggableHandle   | 拖拽中触发  | 拖拽方块的id、拖拽方块的数据 |
| draggableEnd      | 拖拽结束时触发 | 拖拽结束后的布局数据 |
| remove            | 删除方块时触发 | 删除的方块的id  |

## 🎡待办事项

-  拖拽算法优化（发生碰撞后的位置计算，用户感知不佳）
-  初始化布局数据计算算法优化（添加紧凑布局？、限定宽高时元素超出范围的处理方法）
-  缩放、删除的图标自适应大小（兼容各种屏幕）
-  还有一些功能暂时没想到，希望大家提出意见跟批评


## 结语
欢迎大家试用，并提出问题。

>博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。