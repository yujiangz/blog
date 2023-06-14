## 地址

- [GitHub](https://github.com/i5ting/yrm)



## 安装

```shell
$ npm install yrm
```



## 列出镜像源用法

```shell
Usage: yrm [options] [command]

  Commands:

    ls                           列出所有的源
    use <registry>               切换使用的源
    add <registry> <url> [home]  增加一个源
    del <registry>               删除一个源
    home <registry> [browser]    在配置的浏览器打开源的主页
    test [registry]              展示一个或所有源的响应速度
    help                         Print this help

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```



## pnpm 源

使用 `use` 命令后，不会出现在切换列表，会使用 `npm` 源配置。
