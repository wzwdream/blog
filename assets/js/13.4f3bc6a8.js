(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{570:function(t,s,a){"use strict";a.r(s);var r=a(6),e=Object(r.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"_1、什么是正则表达式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、什么是正则表达式"}},[t._v("#")]),t._v(" 1、什么是正则表达式")]),t._v(" "),a("p",[t._v("正则表达式就是专门规定一个字符串中字符出现的规律的一套规则。")]),t._v(" "),a("h2",{attrs:{id:"_2、创建正则表达式的2种方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2、创建正则表达式的2种方法"}},[t._v("#")]),t._v(" 2、创建正则表达式的2种方法")]),t._v(" "),a("p",[t._v("1.标准写法：使用new关键字创建 --- var 变量 = new RegExp('正则表达式', 'ig');\n2.简写：var 变量 = / 正则表达式 / ig;")]),t._v(" "),a("blockquote",[a("p",[t._v("注意:"),a("br"),t._v("\n（1）如果想要在正则表达式使用js的变量或者js函数处理后返回的字符串，则只能使用标准写法创建正则表达式"),a("br"),t._v("\n（2）' i '表示忽略大小写，' g '表示匹配所有")])]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 匹配数组中包含的字符")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" arr "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'国'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'人'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" str "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'我是中国人，我爱中国!'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// var reg = /arr.join('|')/g; // 错误的方法")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" reg "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("join")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'|'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'g'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" str "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("replace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'*'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br")])]),a("h2",{attrs:{id:"_3、正则表达式的基本语法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3、正则表达式的基本语法"}},[t._v("#")]),t._v(" 3、正则表达式的基本语法")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("字符")]),t._v(" "),a("th",[t._v("描述")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("' \\ '")]),t._v(" "),a("td",[t._v("转义特殊字符")])]),t._v(" "),a("tr",[a("td",[t._v("' ^ '")]),t._v(" "),a("td",[t._v("匹配字符串的开头")])]),t._v(" "),a("tr",[a("td",[t._v("' $ '")]),t._v(" "),a("td",[t._v("匹配字符串的结尾")])]),t._v(" "),a("tr",[a("td",[t._v("' * '")]),t._v(" "),a("td",[t._v("匹配前面的子表达式零次或多次")])]),t._v(" "),a("tr",[a("td",[t._v("' + '")]),t._v(" "),a("td",[t._v("至少匹配前面的子表达式一次")])]),t._v(" "),a("tr",[a("td",[t._v("' ? '")]),t._v(" "),a("td",[t._v("只能匹配前面的子表达式零次或一次")])]),t._v(" "),a("tr",[a("td",[t._v("{n}")]),t._v(" "),a("td",[t._v("n是一个非负整数。匹配确定的n次")])]),t._v(" "),a("tr",[a("td",[t._v("{n,}")]),t._v(" "),a("td",[t._v("n是一个非负整数。至少匹配n次")])]),t._v(" "),a("tr",[a("td",[t._v("{n,m}")]),t._v(" "),a("td",[t._v("m和n均为非负整数，其中n<=m。最少匹配n次且最多匹配m次")])]),t._v(" "),a("tr",[a("td",[t._v(".")]),t._v(" "),a("td",[t._v("匹配除“\\n”之外的任何单个字符")])]),t._v(" "),a("tr",[a("td",[t._v("' | '")]),t._v(" "),a("td",[t._v("表示或")])]),t._v(" "),a("tr",[a("td",[t._v("\\d")]),t._v(" "),a("td",[t._v("匹配一个数字字符")])]),t._v(" "),a("tr",[a("td",[t._v("\\D")]),t._v(" "),a("td",[t._v("匹配一个非数字字符")])]),t._v(" "),a("tr",[a("td",[t._v("\\f")]),t._v(" "),a("td",[t._v("匹配一个换页符")])]),t._v(" "),a("tr",[a("td",[t._v("\\n")]),t._v(" "),a("td",[t._v("匹配一个换行符")])]),t._v(" "),a("tr",[a("td",[t._v("\\r")]),t._v(" "),a("td",[t._v("匹配一个回车符")])]),t._v(" "),a("tr",[a("td",[t._v("\\s")]),t._v(" "),a("td",[t._v("匹配任何空白字符")])]),t._v(" "),a("tr",[a("td",[t._v("\\S")]),t._v(" "),a("td",[t._v("匹配任何非空白字符")])]),t._v(" "),a("tr",[a("td",[t._v("\\t")]),t._v(" "),a("td",[t._v("匹配一个制表符")])]),t._v(" "),a("tr",[a("td",[t._v("\\v")]),t._v(" "),a("td",[t._v("匹配一个垂直制表符")])]),t._v(" "),a("tr",[a("td",[t._v("\\w")]),t._v(" "),a("td",[t._v("匹配包括下划线的任何单词字符")])]),t._v(" "),a("tr",[a("td",[t._v("\\W")]),t._v(" "),a("td",[t._v("匹配任何非单词字符")])])])]),t._v(" "),a("h2",{attrs:{id:"_4、何时使用正则表达式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4、何时使用正则表达式"}},[t._v("#")]),t._v(" 4、何时使用正则表达式")]),t._v(" "),a("h3",{attrs:{id:"_1-验证字符串格式-手机号验证、邮箱验证等。"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-验证字符串格式-手机号验证、邮箱验证等。"}},[t._v("#")]),t._v(" 1.验证字符串格式 --- 手机号验证、邮箱验证等。")]),t._v(" "),a("h3",{attrs:{id:"_2-查找敏感词-弹幕敏感词等。"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-查找敏感词-弹幕敏感词等。"}},[t._v("#")]),t._v(" 2.查找敏感词 --- 弹幕敏感词等。")]),t._v(" "),a("h5",{attrs:{id:"_2-1-验证字符串"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-验证字符串"}},[t._v("#")]),t._v(" 2.1 验证字符串")]),t._v(" "),a("blockquote",[a("p",[t._v("以下用reg表示正则表达式")])]),t._v(" "),a("h5",{attrs:{id:"_2-1-1-res-test-字符串"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-1-res-test-字符串"}},[t._v("#")]),t._v(" 2.1.1 res.test('字符串');")]),t._v(" "),a("p",[t._v("（1）只要字符串格式满足正则表达式的规则就会返回true，否则返回false。\n（2）缺点：只要字符串中含有符合规则的内容，正则表达式就会匹配，返回true。\n（3）解决：配合' ^ ' 和  ' $ ' 一起使用，表示从头到尾匹配。")]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 匹配六位数字")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" reg "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v("\\d{6}")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" result "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("test")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'abc123456'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 返回结果为true")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" reg1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v("^\\d{6}$")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" result "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("test")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'abc123456'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 返回结果为false")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br")])]),a("h5",{attrs:{id:"_2-2-查找敏感词"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-查找敏感词"}},[t._v("#")]),t._v(" 2.2 查找敏感词")]),t._v(" "),a("blockquote",[a("p",[t._v("以下reg表示正则表达式")])]),t._v(" "),a("h4",{attrs:{id:"_2-2-1-reg-search-敏感词"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-1-reg-search-敏感词"}},[t._v("#")]),t._v(" 2.2.1 reg.search('敏感词');")]),t._v(" "),a("p",[t._v("查找模式匹配,只要找到第一个匹配然后返回，如果字符串没有匹配，则返回null。")]),t._v(" "),a("h5",{attrs:{id:"_2-2-2-reg-match-敏感词"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-2-reg-match-敏感词"}},[t._v("#")]),t._v(" 2.2.2 reg.match('敏感词')")]),t._v(" "),a("p",[t._v("缺点：只能获得敏感词的内容，不能获得敏感词的位置。")]),t._v(" "),a("h5",{attrs:{id:"_2-2-3-reg-exec-字符串"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-3-reg-exec-字符串"}},[t._v("#")]),t._v(" 2.2.3 reg.exec('字符串');")]),t._v(" "),a("p",[t._v("缺点：如果只调用一次exec()函数，即使正则表达式后加了' g '，也只会获得第一个敏感词的内容和位置。\n解决：如果想要获取所有敏感词的位置和内容，必须反复调用exec，直到找不到，返回null为止。")]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 示例")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" reg "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v("正则表达式")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-flags"}},[t._v("g")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("do")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\nresult "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("test")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'敏感词'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'敏感词的内容：'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" result"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'敏感词的位置'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" result"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("index"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("result "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br")])]),a("h5",{attrs:{id:"_2-2-4-reg-findall-敏感词"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-4-reg-findall-敏感词"}},[t._v("#")]),t._v(" 2.2.4 reg.findall('敏感词');")]),t._v(" "),a("p",[t._v("遍历匹配，可以获取字符串中所有匹配的字符串，返回一个列表。")]),t._v(" "),a("h5",{attrs:{id:"_2-3-零宽断言"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-零宽断言"}},[t._v("#")]),t._v(" 2.3 零宽断言")]),t._v(" "),a("p",[t._v("给指定位置添加一个限定条件，用来规定此位置之前或之后的字符必须满足限定条件才可以使正则表达式匹配成功。")]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 示例1：数字三位一逗(千分符)")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" str "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'1234567890.25'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" reg "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v("(\\d)(?=(\\d{3})+(\\.|$))")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-flags"}},[t._v("g")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nstr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("replace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'$1,'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])]),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 示例2：使用0宽断言切割url")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" url"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://localhost:8080/public/index.html?uname=zhongguo&upwd=zhongguo123'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" reg "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v(" [a-z]+(?:\\/\\/) | (?<=:\\/\\/)[a-z0-9. )+(?=:) | (?<=:)\\d+(?=\\/) | \\/[a-z/.]+(?=\\?)|(?<=\\?)[a-z0-9=&]+(?=#)|")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-flags"}},[t._v("ig")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" arr "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("match")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n结果：arr "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'localhost'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'8080'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/public/index.html'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'uname=zhongguo&upwd=zhongguo123'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br")])]),a("h2",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),a("ul",[a("li",[t._v("创建正则表达式有两种方法：new关键字创建跟字面量方法")]),t._v(" "),a("li",[t._v("验证字符串的方法是test()")]),t._v(" "),a("li",[t._v("查找字符串的方法有多个：search()、match()、exec()、findall()，每个方法都有自己的优缺点")]),t._v(" "),a("li",[t._v("零宽断言：主要是在指定的位置添加限制条件，在这个位置之前或之后的字符满足条件才匹配成功")])]),t._v(" "),a("blockquote",[a("p",[t._v("博客主要记录一些学习的文章，如有不足，望大家指出，谢谢。")])])])}),[],!1,null,null,null);s.default=e.exports}}]);