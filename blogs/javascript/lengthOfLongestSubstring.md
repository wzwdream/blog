---
title: 每日一道算法题-无重复字符的最长子串
date: 2022-6-26
tags:
 - javascript
 - 算法题
categories: 
 - javascript
 - 每日一道算法题
publish: false
---

### 1、题目

给定一个字符串 s ，请你找出其中不含有`重复字符`的`最长子串`的长度。

 
### 2、示例

- 示例 1:

```js
输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

- 示例 2:

```js
输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```

- 示例 3:

```js
输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 ```

### 3、提示：

```js
0 <= s.length <= 5 * 104
s 由英文字母、数字、符号和空格组成
```

### 4、分析题目

- 给定字符串的长度

### 5、代码实现

#### 5.1、方法一

- 维护一个数组，把不重复的字符按顺序放进去

- 如果出现重复的数组则以当前维护的数组的第一个值为重复值，把这个重复值去除，同时需要把循环中i的值恢复到找到重复字符串的下标（i--）


```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    // 保存最大长度、当前字串
    let len= 0, tempString=[]
    
    for(let i = 0; i < s.length; i ++) {
          
        // 判断当前字符是否在我们保存的字串中存在
        if(tempString.indexOf(s[i]) === -1) {

            // 不存在则把当前字符存入
            tempString.push(s[i])
            
        } else {
        
            // 存在则去除重复的字符
            tempString.shift()
            
            // 维护i，因为这里出现重复字符，所以从这里开始
            i --
            
            // 跳过这次循环，不在改变最大长度的值
            continue
        }
        
        // 获取最大的值
        len = Math.max(len, tempString.length)
        
    }
    
    return len
};
```
- -   [力扣（LeetCode）](https://leetcode.cn/problems/longest-substring-without-repeating-characters)提交用时和内存消耗

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59aa9e7b06c843119b5a32ccd013b4dd~tplv-k3u1fbpfcp-watermark.image?)


#### 5.2、方法二

- 维护两个指针left和right，当发现重复值的时候left向前移，否则right向前移

- right向前移动的时候，去检测最大值

- left向前移动就进入下一个循环

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    // 如果长度为一直接返回 1
    if(s.length === 1) return 1
    
    let left = 0, right = 0, max = 0, temp
    
    // 当right指针大于 s 的长度则表述以及遍历完成
    while(right < s.length) {
    
        // 获取当前的字串，两个指针中间的值
        temp = s.slice(left, right)
        
        // 如果找到重复的字符串就跳过当前循环，left前移
        if(temp.indexOf(s.charAt(right)) > -1) {
            left ++
            continue
        } else {
            right ++
        }
        
        // 找出最大值
        (right - left) > max && (max = (right - left))
    }
    
    return max
};

```
- - -   [力扣（LeetCode）](https://leetcode.cn/problems/longest-substring-without-repeating-characters)提交用时和内存消耗


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4501f463275d4053a012ef7a3109533b~tplv-k3u1fbpfcp-watermark.image?)

### 题目来源

[力扣（LeetCode）](https://leetcode.cn/problems/longest-substring-without-repeating-characters)

> 博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。