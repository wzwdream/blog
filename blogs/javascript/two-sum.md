---
title: 每日一道算法题-两数之和
date: 2022-6-23
tags:
 - javascript
 - 算法题
categories: 
 - javascript
 - 每日一道算法题
---
### 1、题目

给定一个整数数组`nums`和一个整数目标值`target`，请你在该数组中找出 和为目标值`target`的那`两个`整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

 
### 2、示例
- 示例 1：
```js
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```
- 示例 2：
```js
输入：nums = [3,2,4], target = 6
输出：[1,2]
```
- 示例 3：
```js
输入：nums = [3,3], target = 6
输出：[0,1]
```

### 3、提示：
```js
2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
只会存在一个有效答案
```
### 4、解题

#### 4.1、暴力解题

- 众所周知，很多算法题如果不考虑空间复杂度跟时间复杂度的话都是可以暴力解题的，虽然不够优雅，但是也是可以解出来的

- 这个题目相对来说比较简单，就是指定一个值，然后在数组中找出相加等于这个值的两个数的下标，然后以数组的形式返回

- 这样的话，我们就可以双重循环遍历数组来找出这两个数值，在第一个循环中遍历所有的值，在第二个循环（内部循环）中以当前值的下标为起始值，遍历之后的值，然后相加这两个值，从中找出符合要求的值

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
 for(let i = 0; i < nums.length; i ++) {
     // 第二次循环的起始值是第一次循环的起始值+1，即从第一个起始值的下标之后的值中寻找符合的数
     for(let j = i + 1; j < nums.length; j ++) {
         if(nums[i] + nums[j] == target) {
             return [i, j]
         }
     }
 }
};

// 测试
let nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50]

let taget = 99

twoSum(nums, target) // [47, 48]

```

- [力扣（LeetCode）](https://leetcode.cn/problems/two-sum)提交用时和内存消耗

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9263fd2501c9481ebf47af788ed874fe~tplv-k3u1fbpfcp-watermark.image?)

#### 4.2、使用ES6中的Map解题

- Map数据结构是一个键值对的集合，其取值效率较高

- 解题的思路就是取`差值`，通过指定的值与之前的值的差值来获取第二个数，这样的话就会少一层循环

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {

    // 存储数据的map
    let numsMap = new Map()
    
    for(let i = 0; i < nums.length; i ++) {
    
        let num = nums[i]
        let difference = target - num
        
        // 如果差值在map中找到，则表示我们找到我们需要的值了，直接返回
        if(numsMap.has(difference)) return [numsMap.get(difference), i]
        
        // 存储当前数值以 值:下标 的键值对存存储
        numsMap.set(num, i)
        
    }
};

// 测试
let nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50]

let taget = 99

twoSum(nums, target) // [47, 48]
```

- [力扣（LeetCode）](https://leetcode.cn/problems/two-sum)提交用时和内存消耗

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e510b4103c44d38af3de22f6961af8a~tplv-k3u1fbpfcp-watermark.image?)
### 题目来源
[力扣（LeetCode）- 两数之和](https://leetcode.cn/problems/two-sum)

> 博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。
