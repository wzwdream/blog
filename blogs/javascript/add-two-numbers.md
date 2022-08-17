---
title: 每日一道算法题-两数相加
date: 2022-6-24
tags:
 - javascript
 - 算法题
categories: 
 - javascript
 - 每日一道算法题
publish: false
---

### 1、题目

给你两个`非空`的链表，表示两个非负的整数。它们每位数字都是按照`逆序`的方式存储的，并且每个节点只能存储` 一位`数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

### 2、示例 

- 示例 1：

```js
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.
```

- 示例 2：

```js
输入：l1 = [0], l2 = [0]
输出：[0]
```

- 示例 3：

```js
输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]
```
 
### 3、提示：

```js
每个链表中的节点数在范围 [1, 100] 内
0 <= Node.val <= 9
题目数据保证列表表示的数字不含前导零
```

### 4、分析题目

- 由`示例1`不难看出，我们需要得到值就是两个输入值`倒序`后相加的值，但是由于输入值并`不是数组`，而是`ListNode`，类似于树结构的数据，我们倒序的话，需要花费大量的操作来实现

- 所以我们换一个角度来看，结合`示例1`跟`示例3`中得出

- - 输出值对应的位置就是输入值对应位置相加的值，如果相加的值大于10则向后`进位`1，在下次相加的时候在把进位值也加进去

- - 如果相加到最后还有进位的话，则新建一个节点保存


### 5、代码实现

#### 5.1、while循环实现

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {

    // 创建一个空节点作为返回值
    let result = new ListNode()
    
    // 保存进位的值
    let temp = 0
    
    // 临时节点
    let tempNode = result
    
    // 循环加值
    while(l1 !== null || l2 !== null) {
        
        // 保存当前节点的值
        let val1 = l1 !== null && l1.val || 0
        let val2 = l2 !== null && l2.val || 0
        
        // 保存当前节点的下一个值
        let next1 = l1 !== null && l1.next || null
        let next2 = l2 !== null && l2.next || null
        
        // 保存当前两个节点的和
        // temp是上一个节点的进位值
        let total = val1 + val2 + temp
        
        // 保存当前节点计算后的值，取余数是为了得到进位后的值
        // 因为节点的值的取值范围在0-9，所以进位只能是1/0
        // 和的值大于10的话，我们就进位1
        tempNode.val = total % 10
        temp = Math.floor(total/10)
        
        // 如果当前两个节点的一个next值存在，则创建一个节点保存在临时节点的next中
        // 同时把临时节点更改为上一个临时节点的next
        if(next1 || next2) {
            tempNode.next = new ListNode()
            tempNode = tempNode.next
        }
        
        // 如果当前节点已经是两个链表的最后一个值，并且进位不为0，那么就创建一个新节点来保存进位值
        if(!next1 && !next2 && temp !==0) {
            tempNode.next = new ListNode(temp)
        }
        
        // 置换l1/l2的值，剔除以及遍历过的节点
        if(l1) l1 = l1.next
        if(l2) l2 = l2.next
    }
    
    return result
    
};
```
- - [力扣（LeetCode）](https://leetcode.cn/problems/add-two-numbers/submissions/)提交用时和内存消耗

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb6cdcd4981240c89b3c2c92e620e763~tplv-k3u1fbpfcp-watermark.image?)

#### 5.2、递归实现
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    // 进位值
    let temp = 0
    // 保存结果
    let tempNode = new ListNode()
    let addNums = function(l1, l2, tempNode) {
        // 当节点都为null时结束递归
        if(!l1 && !l2) {
            return
        }
        // 保存一些节点值
        let val1 = l1 && l1.val || 0
        let val2 = l2 && l2.val || 0
        let addNum = val1 + val2 + temp
        temp = Math.floor(addNum/10)
        tempNode.val = addNum % 10
        // 创建节点的next值
        if ((l1 && l1.next) || (l2 && l2.next)) tempNode.next = new ListNode()
        if(!(l1 && l1.next) && !(l2 && l2.next) && temp) tempNode.next = new ListNode(temp)
        // 递归创建
        addNums(l1 && l1.next || null, l2 && l2.next || null, tempNode.next || null)
    }
    addNums(l1,l2,tempNode)
    return tempNode
};
```

- [力扣（LeetCode）](https://leetcode.cn/problems/add-two-numbers/submissions/)提交用时和内存消耗

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9dbf4d5deda846fcb9746452aa32c145~tplv-k3u1fbpfcp-watermark.image?)

### 题目来源
[力扣（LeetCode）- 两数相加](https://leetcode.cn/problems/add-two-numbers)

> 博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。
