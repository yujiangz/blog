

> Python官网：[使用 pip 和虚拟环境安装包](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/#creating-a-virtual-environment)



## pip

### 换源

> 使用帮助：[清华源](https://mirrors.tuna.tsinghua.edu.cn/help/pypi/)

### **升级 pip**

建议：

```
python -m pip install --upgrade pip
```

不建议：

```shell
pip install pip -U
```

可能会失败，导致 pip 丢失，可

```shell
python -m ensurepip
```

升级失败，则使用镜像站升级 pip

```shell
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pip -U
```

**更改默认配置**

```
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

**临时使用**

```powershell
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple some-package
```



### 更新

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



### 安装包

```shell
pip3 install package==2.0
```



### 升级包

```shell
pip3 install --upgrade package
```



### 卸载包

```shell
pip3 uninstall package
```



### 搜索包

```shell
pip3 seatch package
```



### 已安装包

```shell
pip3 list
```



## venv

> 参数 env 为虚拟环境的名称



### **创建虚拟环境**

windows

```powershell
python -m venv env
```

Unix / macOS

```powershell
python3 -m venv env
```



### **启动**

windows

```powershell
./env/Scripts/activate
```

Unix / macOS

```powershell
source env/bin/activate
```



### **退出**

windows

```powershell
deactivate
```

Unix / macOS

```powershell
deactivate
```



## 扩展

> Python官网：[`venv`](https://docs.python.org/zh-cn/3/library/venv.html?highlight=venv#module-venv) --- 创建虚拟环境

虚拟环境是一个 Python 环境，安装到其中的 Python 解释器、库和脚本与其他虚拟环境中的内容是隔离的，且（默认）与“系统级” Python（操作系统的一部分）中安装的库是隔离的。