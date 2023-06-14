## 来源

- [Vim help files](https://vimhelp.org/)
- 知乎：[2021年了，如何上手VIm？](https://www.zhihu.com/question/449635303) 学习 [刘志军](https://www.zhihu.com/people/zhijun-liu) 的回答
- 知乎：[VIM这么难用，为啥这么多人热衷？](https://www.zhihu.com/question/437735833) 学习 [废物程序员](https://www.zhihu.com/people/hu-chuan-gang-58) 的回答



## 安装

- [vim](https://www.vim.org/)



## 初识

```shell
# 进入一个目录，创建任意文件
$ cd <你的目录>
$ touch test.c
$ vim test
```

- 将进入 vim ，窗口最底下为当前的 vim 模式，现在的模式被称为 Normal 模式，该模式下不能输入，但能使用快捷命令。
- Normal 模式：非 Noraml 模式下按 `esa` 切换为 Normal 模式
- Visual 模式：Normal 模式下按 `v` 将进入 Visual 模式。
- Insert 模式：Normal 模式下按 `i` 将进入 Insert 模式。
- Command-line 模式：Normal 模式下 按 `:` 将进入 Command-line 模式

在 Normal 模式下输入 `:help <x|v|i|c>` 可以分别了解 Normal、Insert、Visual、Command-line 模式和在该模式下可以使用的命令的详情。

> 如 Command-line 的命令 `:<command>` ，会带有 `:` 作为切换模式按键，如这样自带切换的操作，本文档在输入命令或使用快捷处都会标注是在 Normal 模式下。



## 初级

### 打开、保存、退出、切换

Normal 模式下

- `:e <path>` —— 打开
- `:q` —— 退出
- `:w <path>` —— 保存
- `:saveas <path>` —— 另存为
- `:wq` —— 保存退出
- `:q!` —— 强制退出，不保存（谨慎使用）
- `:bn` —— 向下切换文件
- `:bp` —— 向上切换文件



### 光标移动

Normal 模式下

- `h`：向左
- `j`：向下
- `k`：向上
- `l`：向右



### 复制、剪切与粘贴

Normal 模式下

- `y`：复制所选内容
- `yy`：复制当前行
- `d`：剪切所选内容
- `dd`：剪切当前行
- `p`：粘贴在当前位置之后
- `P`：粘贴在当前位置之前

> 选中，在 Nomal 模式下
>
> - `v`：进入 Visual 模式，配合 `h|j|k|l` 选中



### 撤销与恢复

Normal 模式下

- `u`：撤销
- `ctrl + r`：恢复撤销



## 中级

### 插入模式

Normal 模式下，切换到 Insert 模式

- `a`：在光标之后插入
- `o`：在当前行后插入
- `O`：在当前行前插入
- `c w`：删除当前行光标之后的的内容，并插入



### 正则查找

Normal 模式下

- `/<pattern>`：匹配，`n` 为 下一个



### 重复命令

Normal 模式下

- `.`：重复上一个命令
- `[N] <command>` ：重复命令 N 次
  - `2dd`：删除两行
  - `2.`：重复两次上一次的操作
  - `2itext [EAC]`：插入 text 两次



### 光标移动

- `[N]gg` / `[N]G`：到第 N 行
- `gg`：到第一行
- `G`：到末行
- `w` 、`W`：按单词移动，移动到单词开头（单词若为 blank 字符分开，则大写）
- `e` 、`E`：按单词移动，移动到单词末尾（单词若为 blank 字符分开，则大写）
- `%`：移动到与当前光标所在括号相匹配的括号的位置
- `#` / `*`：快速匹配光标所在位置的单词，切换时，`#`  为到上一个，`*` 为到下一个



### 联动

光标配合其他命令：`<start position><command><end position>`



## 高级

### 光标移动

- `0`：移动当前行开头
- `^`：移动到当前行非 blank 字符开头
- `$`：移动到当前行尾
- `g_`：移动到当前行非 blank 字符行尾
- `f[字符]` 、`F[字符]`：移动到当前行 `字符` 的位置，`F` 方向相反
  - `[N]f[字符]`：移动到当前行 `字符` 出现为 `N` 的位置
- `t[字符]` 、`T[字符]`：移动到 `字符` 前的第一个字符



### 选择



