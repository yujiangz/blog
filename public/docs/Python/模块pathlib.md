> 官网说明：[`pathlib`](https://docs.python.org/zh-cn/3/library/pathlib.html?highlight=path#module-pathlib) --- 面向对象的文件系统路径
>
> 直接看方法部分



## 导入



```python
from pathlib import Path
```



## 常用方法

> ps：
>
> Path 能用，实例一样能用
>
> 注意这里都是方法，路径对象.方法()



### Path.cwd()



### Path.home()



### Path.parent



### Path.exists()

> 此路径是否指向一个已存在的文件或目录



### Path.is_dir()



### Path.is_file()



### Path.name

一个表示最后路径组件的字符串，排除了驱动器与根目录



### PurePath.stem

name 且 去除后缀，返回 str



### Path.suffix

获取后缀



### Path.iterdir()

```python
[x for x in p.iterdir if x.is_file()]
# 生成器，该语句返回目录下的所有对象文件
```



### Path.glob()

```python
p.glob('**/*.py') # 当前【目录树】下的所有 .py 文件
p.glob('*.py') # 当前【目录】下的所有 .py 文件
```



### Path.mkdir()

> 注意用法，详细参数见官网

```python
(p / 'newFile').mkdir(parent=True)
```



### Path.rmdir()

> 此目录必须为空

```python
(p / 'newFile').rmdir()
```



### Path.touch()

```python
(p / 'newFile,json').touch()
```



### Path.unlink()

> 移除此文件或符号链接。



### Path.rename(target)

```python
(p / 'test.json').rename('newfile.json')
```



### PurePath.as_posix()

返回使用正斜杠（`/`）的路径字符串



### PurePath.as_uri()

将路径表示为 `file` URL。如果并非绝对路径，抛出 [`ValueError`](https://docs.python.org/zh-cn/3/library/exceptions.html#ValueError)。



### Path.open()

> 打开路径指向的文件，就像内置的 [`open()`](https://docs.python.org/zh-cn/3/library/functions.html#open) 函数所做的一样

```python
Path.open(mode='r', buffering=- 1, encoding=None, errors=None, newline=None)
```

```python
with (p / 'test.json').open() as f:
    f.readline()
```



### Path.write_text()

```python
(p / 'test.json').write_text('Text file contents')
```



### Path.read_text()

> 以字符串形式返回路径指向的文件的解码后文本内容

```python
Path.read_text(encoding=None, errors=None)
```

```python
(p / 'test.json').write_text('Text file contents')

(p / 'test.json').read_text()
```



### Path.resolve()

> 将路径绝对化，解析任何符号链接。返回新的路径对象