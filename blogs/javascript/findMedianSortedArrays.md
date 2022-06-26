---
title: 每日一道算法题-寻找两个正序数组的中位数
date: 2022-6-26
tags:
 - javascript
 - 算法题
categories: 
 - javascript
 - 每日一道算法题
---

### 1、题目

给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。

算法的时间复杂度应该为 O(log (m+n)) 。

### 2、示例

- 示例 1：

```js
输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2
```

- 示例 2：

```js
输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
```
### 3、提示：

```js
nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-106 <= nums1[i], nums2[i] <= 106
```

### 4、题目分析

- 首先是暴力解题，完全合并两个数组，然后进行排序，最后根据新数组的长度值，奇数就取 leng/2 的那个值，偶数就取 leng/2 + (leng/2-1) 两个值的 和 的平均数

- 第二种方法就是二分查找，拿长度较短的数组进行二分，在用这个二分的位置与两个数组的总长度找到另外一个数组的二分位置，然后比较这两个位置的四个值，循环找到符合`交叉小于等于`的值


### 5、代码实现

#### 5.1、暴力破解

- 时间复杂度不符合题意

```js
/** * @param {number[]} nums1 
* @param {number[]} nums2
* @return {number} 
*/
var findMedianSortedArrays = function(nums1, nums2) {
    // 合并数组并排序
    let newNums = nums1.concat(nums2).sort((a, b) => a -b)
    let len = newNums.length
    let i = len / 2
    if (len % 2 === 0) { 
        return (newNums[i] + newNums[i -1]) / 2
    }
    return newNums[Math.floor(i)]
};
```
- 提交记录


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7318d5d5540d464a912fed0e385db80b~tplv-k3u1fbpfcp-watermark.image?)

#### 5.2、二分查找

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    // 把nums1替换为最小数组
    nums1.length > nums2.length && ([nums1, nums2] = [nums2, nums1])
    let len1 = nums1.length, len2 = nums2.length
    let len = len1 + len2
    let middle = Math.floor(len / 2)
    // 如果最小数组为空的话，直接返回另一个数组的中位值
    if (len1) {
        return len % 2 === 0 ? (nums2[middle] + nums2[middle - 1]) / 2 : nums2[middle]
    }
    let start = 0, end = len1 //进行二分的开始和结束位置
    let partLen1, partLen2

    while (start <= end) {
        partLen1 = (start + end) >> 1//nums1二分的位置
        partLen2 = ((len + 1) >> 1) - partLen1//nums2二分的位置

        //L1:nums1二分之后左边的位置，R1，nums1二分之后右边的位置
        //L2:nums2二分之后左边的位置，R2，nums2二分之后右边的位置

        //如果左边没字符了，就定义成-Infinity，让所有数都大于它，否则就是nums1二分的位置左边一个
        let L1 = partLen1 === 0 ? -Infinity : nums1[partLen1 - 1]
        //如果左边没字符了，就定义成-Infinity，让所有数都大于它，否则就是nums2二分的位置左边一个
        let R1 = partLen2 === 0 ? -Infinity : nums2[partLen2 - 1]
        //如果右边没字符了，就定义成Infinity，让所有数都小于它，否则就是nums1二分的位置
        let L2 = partLen1 === len1 ? Infinity : nums1[partLen1]
        //如果右边没字符了，就定义成Infinity，让所有数都小于它，否则就是nums1二分的位置
        let R2 = partLen2 === len2 ? Infinity : nums2[partLen2]

        if (L1 > R2) {//不符合交叉小于等于 继续二分
            end = partLen1 - 1
        } else if (R1 > L2) {//不符合交叉小于等于 继续二分
            start = partLen1 + 1
        } else { // L1 <= R2 && R1 <= L2 符合交叉小于等于
            return len % 2 === 0 ?
                (Math.max(L1, R1) + Math.min(L2, R2)) / 2 : //长度为偶数返回作左侧较大者和右边较小者和的一半
                Math.max(L1, R1)	//长度为奇数返回作左侧较大者
        }
    }
}
```

- 提交记录

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa6e946a4b3e454a8003bb0dbcc18141~tplv-k3u1fbpfcp-watermark.image?)

### 题目来源

[力扣（LeetCode）- 寻找两个正序数组的中位数](https://leetcode.cn/problems/median-of-two-sorted-arrays)

> 博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。