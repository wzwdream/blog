---
title: vue3（tsx）-从搭建到实践
date: 2022-08-01
tags:
 - TypeScript
 - vue3
categories: 
 - TypeScript
 - vue3
 - tsx/jsx
---
![1.webp](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0412d846777145109acdfe29cc079689~tplv-k3u1fbpfcp-watermark.image?)

记得第一次写`Vue3`是在2021年了，一直没有很好静下心来好好梳理一下`Vue3`的知识。现在的项目也没用上，只能自己摸索学习啦。

~~学习，学个屁！~~

### 演示地址

**[项目demo](https://wzwdream.github.io/vite3_vue3_ts)**

**[git仓库](https://github.com/wzwdream/vite3_vue3_ts)**

## 学习前的准备

一点点的`Ts`基础，一点点`vue`基础

## 1、搭建项目

> 注意：在 Node.js版本 >= 12 的环境下 `vite` 才能正常运行

### 1.1、创建项目

```
# npm 6.x
npm init vite@latest my-vue-app --template

# npm 7+, 需要额外的双横线：
npm init vite@latest my-vue-app -- --template

# yarn
yarn create vite my-vue-app --template

# pnpm
pnpm create vite my-vue-app -- --template
```

这边我使用`yarn`创建项目

这里选择`vue`
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cdb9bca78d3344b5bd660e5c9dfe08c6~tplv-k3u1fbpfcp-watermark.image?)

因为我们需要集成ts所以这里选择`vue-ts`
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbbe178d02094b02985fe6371e1f363d~tplv-k3u1fbpfcp-watermark.image?)


安装依赖`yarn`，运行项目`yarn dev`，就可以看到这个界面啦

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fee80ca49b5f47e5ba358005de60f600~tplv-k3u1fbpfcp-watermark.image?)


### 1.2、安装vueJsx

`vite`官方现在提供了官方的插件来支持在`vue3`中使用`jsx/tsx`啦，直接安装就行。

```js
yarn add @vitejs/plugin-vue-jsx -D
```

安装完之后在`vite.config.ts`中插入一下代码

```js
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [
    vueJsx(),
  ]
})

```

配置完就可以在项目中使用`jsx/tsx`啦

### 1.3、安装`Element Plus`

```js
# NPM
npm install element-plus --save

# Yarn
yarn add element-plus

# pnpm
pnpm install element-plus
```

如果需要使用`Element Plus`的默认图标库还需要安装图标库

```js
# NPM
$ npm install @element-plus/icons-vue
# Yarn
$ yarn add @element-plus/icons-vue
# pnpm
$ pnpm install @element-plus/icons-vue
```

图标的自动导入需要安装`unplugin-icons`插件

```js
yarn add unplugin-icons -D
```

**自动按需导入**

首先你需要安装`unplugin-vue-components` 和 `unplugin-auto-import`这两款插件

```
npm install -D unplugin-vue-components unplugin-auto-import
```

- `unplugin-auto-import`可以自动导入api，如`vue`、`vue-router`、`elementPlus`这些的api，在使用过程中就不需要我们手动去导入（import）啦

- `unplugin-vue-components` 自动导入组件，只会导入我们使用的组件（按需自动导入）

然后把下列代码插入到你的 `Vite` 的配置文件中

```js
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig({
  // ...
  plugins: [
    // ...
    // 自动引入APi
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        })
      ],
      dts: "src/auto-import.d.ts"
    }),
    // 自动引入组件
    Components({
      dirs: ['src/components'],
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        ElementPlusResolver(),
      ],
      include: [/\.vue$/, /\.tsx$/]
    }),
    Icons({
      autoInstall: true,
    })
  ],
})
```

配置完，大家应该可以看到根目录下新增了两个文件

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4634695d670144ffa991ba0932d2b219~tplv-k3u1fbpfcp-watermark.image?)

为了解决`components.d.ts`中的错误，我们需要在`tsconfig.json`中配置

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a89f0da2184d4ceb80e3ad6e751148ca~tplv-k3u1fbpfcp-watermark.image?)


### 1.4、配置路由

```js
# 安装路由 yarn add vue-router@4
```

在 `src` 文件下新增 `router` 文件夹 => `index.ts` 文件,内容如下:

```
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/pages/login/Login.vue'), // 注意这里要带上 文件后缀.vue
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

```

修改入口文件 `mian.ts` :

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

createApp(App).use(router).mount('#app')
```

到这里路由的基础配置已经完成了,更多配置信息可以查看 [vue-router](https://next.router.vuejs.org/zh/guide/) 官方文档:

`vue-router4.x` 支持 `typescript`，配置路由的类型是 `RouteRecordRaw`，这里 `meta` 可以让我们有更多的发挥空间，比如控制路由权限，添加路由标题等等

### 1.5、安装sass

这里我比较习惯用`scss`，所以安装一下`sass`

```js
yarn add sass -D
```

### 1.6、安装pinia

如果你之前使用过 vuex 进行状态管理的话，那么 pinia 就是一个类似的插件。它是最新一代的轻量级状态管理插件。按照尤雨溪的说法，vuex 将不再接受新的功能，建议将 Pinia 用于新的项目（其实我就是觉得新东西应该去用一下试试看）。

```js
yarn add pinia
```

**挂载`pinia`**

```js
import { createApp } from 'vue'
import App from './App'
import router from './router/index'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './style.scss'
// 引入pinia
import { createPinia } from 'pinia'
// 创建 Pinia 实例
const pinia = createPinia()
createApp(App).use(router).use(pinia).mount('#app')
```

**创建store**

```js
// src/store/index.ts

import { defineStore } from "pinia";
export const useMainStore = defineStore("main", {
    // 类似于Vue2组件中的data，用于存储全局状态数据，但有两个要求
    // 1. 必须是函数，目的是为了在服务端渲染的时候避免交叉请求导致的数据状态污染
    // 2. 必须是箭头函数，这样是为了更好的 TS 类型推导
    state: () => {
        return {
            msg: 'hello word'
        };
    },
    getters: {},
    actions: {}
});
```

**store的基本使用**

```js
// src/views/home.tsx

import { useMainStore } from '@/store/index'
export default defineComponent({
    setup() {
        const store = useMainStore()
        return () => (
            <div>
                <p>Home</p>
                <p>{store.msg}</p>
            </div>
        )
    }
})
```

过多深入的使用，推荐大家自己去[Pinia 中文文档](https://pinia.web3doc.top/)中查看。

### 1.7、vite的一些基础配置

**配置文件别名**

```js
// vite.config.ts

import path from 'path'
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  }
})
```
配置文件路径别名还需要修改一下`tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"],
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue", "auto-imports.d.ts", "components.d.ts"],
  "exclude": ["node_modules"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

```

至此，我们的项目就建好了，我们可以 '开心' 的学习`Vue3`了。

## 2、Vue3新特性

对于`Vue3`的学习，我大部分都是看[官方文档](https://v3.cn.vuejs.org/)学习的，不得不说`vue` 的官方文档真的太 nice 啦。

主要是学习一下`vue3`新特性Composition API

### 2.1、setup

-  `setup()` 函数是 `vue3` 的 `Composition API` 新特性的入口
-  `setup` 函数会在 `beforeCreate` 、`created` 生命周期之前执行
-  可直接写`await语法`

> 在 `setup` 中你应该避免使用 `this`，因为它不会找到组件实例。

**参数**

`setup` 接收两个参数：`props`, `context`

```js
setup(props, context) {
    // Attribute (非响应式对象，等同于 $attrs)
    console.log(context.attrs)

    // 插槽 (非响应式对象，等同于 $slots)
    console.log(context.slots)

    // 触发事件 (方法，等同于 $emit)
    console.log(context.emit)

    // 暴露公共 property (函数)
    console.log(context.expose)
}
```

`setup` 函数中的 `props` 是响应式的，当传入新的 prop 时，它将被更新。

因为 `props` 是响应式的，你**不能使用 ES6 解构**，它会消除 prop 的响应性。

如果需要解构 prop，可以使用 `toRefs`函数来完成此操作，如果结构中存在没有的 `property`，`toRefs` 将不会为 `title` 创建一个 ref

```js
import { toRefs } from 'vue'

setup(props) {
  const { title } = toRefs(props)

  console.log(title.value)
}
```

### 2.2、生命周期

你可以通过在生命周期钩子前面加上 “on” 来访问组件的生命周期钩子。

下表包含如何在 setup () 内部调用生命周期钩子：

| 选项式 API           | Hook inside `setup` |
| ----------------- | ------------------- |
| `beforeCreate`    | Not needed*         |
| `created`         | Not needed*         |
| `beforeMount`     | `onBeforeMount`     |
| `mounted`         | `onMounted`         |
| `beforeUpdate`    | `onBeforeUpdate`    |
| `updated`         | `onUpdated`         |
| `beforeUnmount`   | `onBeforeUnmount`   |
| `unmounted`       | `onUnmounted`       |
| `errorCaptured`   | `onErrorCaptured`   |
| `renderTracked`   | `onRenderTracked`   |
| `renderTriggered` | `onRenderTriggered` |
| `activated`       | `onActivated`       |
| `deactivated`     | `onDeactivated`

```js
<script setup lang="ts">
import { onMounted } from 'vue';
onMounted(console.log('我是onMounted周期'));
</script>
```

### 2.3、ref

-   接受一个内部值并返回一个响应式且可变的 ref 对象。ref 对象仅有一个 `.value` property，指向该内部值。
-   template中可以直接使用，不需要`.value`调用，script和jsx中都需要使用`.value` 调用

**相关api**

-   `unref` 如果参数是一个 `ref`，则返回内部值，否则返回参数本身。这是 `val = isRef(val) ? val.value : val` 的语法糖函数

-   `isRef` 检查值是否为一个 ref 对象。
-  `toRef` 可以用来为源响应式对象上的某个 property 新创建一个 `ref`
-   `toRefs` 将响应式对象（reactive对象）转换为普通对象，解构为单个响应式对象
-   `shallowRef` 创建一个跟踪自身 `.value` 变化的 ref，但不会使其值也变成响应式的。简单理解为创建一个和ref相同结构的非响应式变量
-   `triggerRef` 手动执行与 `shallowRef` 关联的任何作用 (effect)。可以理解为强制更新DOM。
-   `customRef` 创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。提供 get 和 set ，可以自己定义 ref 的响应式操作

### 2.4、reactive

-   返回对象的响应式副本
-   影响所有嵌套 property，将每个 property 都转换成`proxy对象`
-   `直接解构`的话会丢失响应性，如果需要结构的化，需要借助`toRefs`函数转换。

**相关api**

-   `readonly` 接受一个对象 (响应式或纯对象) 或 `ref` 并返回原始对象的只读代理。只读代理是深层的：任何被访问的嵌套 property 也是只读的

-   `isProxy` 检查对象是否是由 `reactive` 创建的响应式代理。
-   `isReactive` 检查对象是否是由 `reactive` 创建的响应式代理。但是该代理是 `readonly` 创建的，但包裹了由 `reactive`) 创建的另一个代理，它也会返回 `true`。
-   `isReadonly` 检查对象是否是由 `readonly` 创建的只读代理。
-   `toRaw` 返回 `reactive` 或 `readonly` 代理的原始对象。用于写入数据而避免触发更改
-   `markRaw` 返回对象本身，标记一个对象，使其永远不会转换为 proxy。
-   `shallowReactive` 创建一个 proxy，使其自身的 property 转换 响应性，但不执行嵌套对象的深度 响应性 转换
-   `shallowReadonly` 创建一个 proxy，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换

### 2.5、computed

-  作用跟vue2无差异
- 接受一个 getter 函数，并根据 getter 的返回值返回一个不可变的响应式 ref 对象。

```js
const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 2

plusOne.value++ // 错误
```

- 或者，接受一个具有 `get` 和 `set` 函数的对象，用来创建可写的 ref 对象。

```js
const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: val => {
    count.value = val - 1
  }
})

plusOne.value = 1
console.log(count.value) // 0
```

### 2.6、watchEffect，watch

**`watchEffect`**

- 立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。
- 自动收集依赖源，当依赖源变化的时候触发。
- 在初始化的时候回执行一次。
- 无法获取依赖源的新旧值。

```js
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> logs 0

setTimeout(() => {
  count.value++
  // -> logs 1
}, 100)
```

**watch**

- `watch` API 与选项式 API this.$watch(以及相应的 watch选项) 完全等效。
- `watch` 需要侦听特定的数据源，并在单独的回调函数中执行副作用。
- 默认情况下，它也是惰性的——即回调仅在侦听源发生变化时被调用。
-   与 watchEffect 相比，`watch` 允许我们：
    -   惰性地执行副作用；
    -   更具体地说明应触发侦听器重新运行的状态；
    -   能够获取依赖源的新旧值。

**侦听单一源**

侦听器数据源可以是一个具有返回值的 getter 函数，也可以直接是一个 ref：

```js
// 侦听一个 getter
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)

// 直接侦听一个 ref
const count = ref(0)
watch(count, (count, prevCount) => {
  /* ... */
})
```

**侦听多个源**

侦听器还可以使用数组以同时侦听多个源：

```js
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
  /* ... */
})
```

## 3、jsx/tsx在 vue3 中的应用

### 3.1、插值

jsx/tsx 的插值与 vue 模板语法中的插值一样，支持有效的 Javascript表达式，比如：`a + b`, `a || 5`...

只不过在 jsx/tsx中 由双大括号`{{}}` 变为了单大括号`{}`

```js
// vue3模板语法
<span>{{ a + b }}</span>

// jsx/tsx
<span>{ a + b }</span>
```

### 3.2、class与style 绑定

class类名绑定有两种方式，使用模板字符串或者使用数组。
- 使用模板字符串两个类名之间使用空格隔开

```js
// 模板字符串
<div className={`header ${ isBg ? 'headerBg' : '' }`}>header</div>
//数组
<div class={ [ 'header', isBg && 'headerBg' ] } >header</div>
```

 style绑定需要使用 双大括号
 
 ```js
const color = 'red'
const element = <sapn style={{ color, fontSize: '16px' }}>style</sapn>
 ```
 
 ### 3.3、条件渲染
 
 - jsx/tsx中只保留了 `v-show`指令，没有 `v-if`指令
 - 使用 `if/else`和三目表达式都可以实现
 
 ```js
    setup() {
        const isShow = false
        const element = () => {
            if (isShow) {
                return <span>我是if</span>
            } else {
                return <span>我是else</span>
            }
        }
        return () => (
            <div>
                <span v-show={isShow}>我是v-show</span>
                {
                    element()
                }
                {
                    isShow ? <p>我是三目1</p> : <p>我是三目2</p>
                }
            <div>
        )
    }
 ```
 
 ### 3.4、列表渲染
 
 同样，jsx/tsx 中也没有 `v-for`指令，需要渲染列表我们只需要使用Js 的数组方法 `map` 就可以了
 
 ```js
 setup() {
    const listData = [
        {name: 'Tom', age: 18},
        {name: 'Jim', age: 20},
        {name: 'Lucy', age: 16}
    ]
    return () => (
        <div>
            <div class={'box'}>
                <span>姓名</span>
                <span>年龄</span>
            </div>
            {
                prop.listData.map(item => {
                    return <div class={'box'}>
                        <span>{item.name}</span>
                        <span>{item.age}</span>
                    </div>
                })
            }
        </div>
    )
 }

 ```
 
 ### 3.5、事件处理
 
- 绑定事件使用的也是 单大括号 `{}`，不过事件绑定不是以 `@`为前缀了，而是改成了 `on`，例如：click 事件是 `onClick`

- 如果需要使用事件修饰符，就需要借助`withModifiers`方法啦，`withModifiers` 方法接收两个参数，第一个参数是绑定的事件，第二个参数是需要使用的事件`修饰符`

```js
setup() {
    const clickBox = val => {
        console.log(val)
    }
    return () => (
        <div class={'box1'} onClick={() => clickBox('box1')}>
            <span>我是box1</span>
            <div class={'box2'} onClick={() => clickBox('box2')}>
                <span>我是box2</span>
                <div class={'box3'} onClick={withModifiers(() => clickBox('box3'), ['stop'])}>我是box3</div>
            </div>
        </div>
    )
}
```

### 3.6、v-model

jsx/tsx是支持v-model语法的

```js
// 正常写法
<input v-model="value" /> // vue
<input v-model={value} /> // jsx

// 指定绑定值写法
<input v-model:modelValue="value" /> // vue
<input v-model={[value,'modelValue']} /> // jsx

// 修饰符写法
<input v-model:modelValue.trim="value" /> // vue
<input v-model={[value,'modelValue',['trim']]} /> // jsx
```

### 3.7、slot插槽

**定义插槽**

jsx/tsx中是没有 `slot` 标签的，定义插槽需要使用`{}`或者使用`renderSlot`函数

setup 函数默认接收两个参数 1. props 2. ctx 上下文 其中包含 slots、attrs、emit 等

```js
import { renderSlot } from "vue"
export default defineComponent({
    // 从ctx中解构出来 slots
    setup(props, { slots }) {
        return () => (
            <div>
                { renderSlot(slots, 'default') }
                { slots.title?.() }
            </div>
        )
    }
})

```

**使用插槽**

可以通过 `v-slots` 来使用插槽

```js
import Vslot from './slotTem'
export default defineComponent({
    setup() {
        return () => (
            <div class={'box'}>
                <Vslot v-slots={{
                    title: () => {
                        return <p>我是title插槽</p>
                    },
                    default: () => {
                        return <p>我是default插槽</p>
                    }
                }} />
            </div>
        )
    }
})

```

## 4、使用tsx实现递归组件-菜单

主要功能就是根据路由信息自动取生成菜单

效果如下

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a71934ee25b34d8f9414e94573579b83~tplv-k3u1fbpfcp-watermark.image?)

代码如下，如果需要控制权限啥的，自己在路由信息的`meta`中添加对应的参数，然后在`menuItem`中自行控制

```js
// index.tsx

import { routes } from '@/router/index'
import MenuItem from './menuItem'
import './index.scss'

export default defineComponent({
    setup() {
        const isShowRoutes = computed(() => {
            return routes
        })
        const currentPath = computed(() => {
            return useRoute().path
        })

        return () => (
            <el-scrollbar class={`menuContent`}>
                <el-menu
                    default-active={currentPath.value}
                    mode="vertical"
                    class={'menu'}
                >
                    {
                        isShowRoutes.value.map((route) => {
                            return <MenuItem item={route} key={route.path}></MenuItem>
                        })
                    }
                </el-menu>
            </el-scrollbar>
        )
    }
})
```

```js
// menuItem.tsx

import { defineComponent, PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import './index.scss'

const MenuItem = defineComponent({
    name: 'MenuItem',
    props: {
        item: {
            type: Object as PropType<RouteRecordRaw>,
            required: true
        }
    },
    setup(props: { item: any }) {
        const router = useRouter()
        const jumpRoute = (path: string) => {
            router.push(path)
        }
        return () => {
            let { item } = props
            if (item.children) {
                const slots = {
                    title: () => {
                        return <div>
                            <span>{item.meta.title}</span>
                        </div>
                    }
                }
                return <el-sub-menu index={item.path} v-slots={slots}>
                    {item.children.map((child: RouteRecordRaw) => {
                        return <MenuItem item={child} key={child.path}></MenuItem>
                    })}
                </el-sub-menu>
            } else {
                return <el-menu-item index={item.path} onClick={() => jumpRoute(item.path)}>{item.meta.title}</el-menu-item>
            }
        }
    }
})

export default MenuItem
```

>博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。