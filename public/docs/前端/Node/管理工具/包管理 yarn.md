## 为什么使用

解决一些 `npm` 可能会出现的 bug，如果 `npm` 安装会出现错误，那可以使用 `yarn` 看看。



## 地址

- [GitHub](https://github.com/yarnpkg/berry)
- [官网](https://yarnpkg.com/)



## 安装

### 安装 Corepack

**Node.js >= 16.10** 的情况下：

```shell
$ corepack enable
```

**Node.js < 16.10** 的情况下：

```
npm i -g corepack
```



### 更新 Yarn 版本

**Node.js ^16.17 or >=18.6** 的情况下：

```shell
$ corepack prepare yarn@stable --activate
```

**Node.js <16.17 or <18.6** 的情况下：

[查看版本](https://github.com/yarnpkg/berry/releases/latest)

```shell
$ corepack prepare yarn@<version> --activate
```



### 初始化项目

```shell
$ yarn init -2
```



### 更新稳定版本

```shell
$ yarn set version stable
```



## 使用

### 帮助

```shell
$ yarn help
```



### 初始化项目

```shell
$ yarn init
```



### 安装所有依赖

```shell
$ yarn
$ yarn install
```



### 添加依赖

```shell
$ yarn add [package]
$ yarn add [package]@[version]
$ yarn add [package]@[tag]
```



### 添加依赖

```
$ yarn add [package] --dev  # 开发依赖
$ yarn add [package] --peer # 同行依赖
```



### 升级依赖

```shell
$ yarn up [package]
$ yarn up [package]@[version]
$ yarn up [package]@[tag]
```



### 移除依赖

```shell
$ yarn remove [package]
```



### 升级 Yarn

```shell
$ yarn set version latest
$ yarn set version from sources
```



