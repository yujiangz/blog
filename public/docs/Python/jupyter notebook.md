

> 以下内容都是 pip
>
> conda 安装或遇到其他问题，访问 [Jupyter 官网](https://jupyter.org/)



## 安装

##### 更新 pip

> 为避免遇到依赖问题，确保 pip 更新到最新版本

windows

```powershell
py -m pip install --upgrade pip

py -m pip --version
```

Unix / macOS

```powershell
python3 -m pip install --user --upgrade pip

python3 -m pip --version
```



##### pip 安装 jupyter

```shell
pip3 install jupyter
```



## 运行

```shell
jupyter notebook
```



### 指定端口号

如指定端口号 8800

```shell
jupyter notebook --port 8800
```



## 更新

```shell
pip install -U jupyter
```



## 执行 shell 命令

用英文感叹号`!`后接 shell命令 即可

如运行本地 python 文件

```text
!python3 Python文件的绝对路径
```



## 添加虚拟环境

**先主环境安装 jupyter**

```shell
pip3 install jupyter
```



**开启指定的虚拟环境**

> 以下开启命令为 venv 模块创建的虚拟环境

windows

```powershell
./Scripts/activate
```

Unix / macOS

```powershell
source /bin/activate
```



**该虚拟环境下安装 ipykernel 和 ipython**

> 一般情况下，ipykernel 安装后 ipython 也会安装

```shell
pip3 install ipykernel ipython
```



**该虚拟环境**

```shell
ipython kernel install --user --name 虚拟环境名称
```



## 删除虚拟环境

**开启指定的虚拟环境**

> 以下开启命令为
>
>  venv 模块创建的虚拟环境

windows

```powershell
./Scripts/activate
```

Unix / macOS

```powershell
source /bin/activate
```



**删除虚拟环境**

```shell
jupyter kernelspec remove 虚拟环境名称
```



## 插件

> https://mlln.cn/2020/08/12/%E4%BD%BF%E7%94%A8Jupyter%20notebook%E5%88%9B%E5%BB%BAppt/

幻灯片：rise

```shell
pip install rise
```

推荐：写好后直接下载为 reveal.js

播放

```shell
jupyter nbconvert test.ipynb --to slides --post serve
```





