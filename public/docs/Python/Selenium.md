> [官网](https://www.selenium.dev/selenium/docs/api/py/api.html)
>
> [中文文档](https://selenium-python-zh.readthedocs.io/en/latest/index.html)



## 安装

##### 安装类库

```shell
pip3 install selenium
```



##### 下载驱动

需要下载浏览器对应的驱动，以 windows 下的 chrome 为例

1. 查看 chrome 版本：浏览器地址栏输入`chrome://version`
2. 下载对应版本驱动：[chrome驱动](https://chromedriver.storage.googleapis.com/index.html) - [其他浏览器驱动](https://www.selenium.dev/zh-cn/documentation/webdriver/getting_started/install_drivers/)
3. 解压存放驱动
   - 一般推荐放到与 python.exe 同级的目录下 `../Python39/`
   - 如果用虚拟环境：也是一样与 python 同级，一般在 `../Scripts/`

> 驱动存放位置说明：无所谓，明确放在哪里就好了，区别要是使用时是否传入位置参数
>
> ```python
> # 不放在与 python 同级目录，指定路径
> driver = webdriver.Chrome(r"详细路径\chromedriver.exe")
> 
> # 放在与 python 同级目录
> driver = webdriver.Chrome()
> ```



##### 测试

> 看到 浏览器自动打开到 selenium 网址又退出 即成功

**一般情况**

即用 推荐路径 并且都是正确的

```python
from selenium import webdriver

driver = webdriver.Chrome()

driver.get("http://selenium.dev")

driver.quit()
```



**其他情况**

> 报错信息：
>
> chrome 启动问题：selenium.common.exceptions.WebDriverException: Message: unknown error: cannot find Chrome binary
>
> 驱动 路径问题：selenium.common.exceptions.WebDriverException: Message: 'chromedriver.exe' executable needs to be in PATH.

> chrome 默认安装在 C 盘，如果改过 chrome 的位置，（我）是要加上启动路径的

需要：

- 指定 chrome 的启动路径
- 指定 驱动 路径

**chrome 地址栏输入，可以看到 chrome.exe 启动路径：`chrome://version`**

```python
from selenium import webdriver

option = webdriver.ChromeOptions()
option.binary_location = r'Z:\..\chrome.exe' # chrome 浏览器启动地址

driver = webdriver.Chrome(r'Z:\..\Scripts\chromedriver.exe', options=option) # 驱动 地址，并传入 option

driver.get("http://selenium.dev")

driver.quit()
```



## 获取节点

> 官网[API](https://www.selenium.dev/selenium/docs/api/py/webdriver_remote/selenium.webdriver.remote.webelement.html)



##### 获取网页源代码

> 看情况使用，不一定用得上，有时候又只用获得源代码就可

driver.page_source

- 返回值：str

```python
res = driver.page_source
```



##### 获取节点

find_element( by='id' , value=None )

```python
element = element.find_element(By.ID, 'foo')
```

理解上面的，则以下通用

> find_element_by_xpath(xpath)
>
> find_element_by_tag_name(name)
>
> find_element_by_class_name(name)
>
> find_element_by_id( id_ )
>
> find_element_by_css_selector(css_selector)
>
> find_element_by_name(name)
>
> find_element_by_link_text(link_text)
>
> find_element_by_partial_link_text(link_text)



##### 获取节点列表

获取节点的 element 为 elements 时返回数组



## 操作元素

> 找到 element 后操作



##### 输入表单

```python
element.send_keys('text')
```



##### 清除元素内容

```python
element.clear()
```



##### 点击元素

```python
element.send_keys('text')
```

