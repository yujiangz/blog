## 安装

### **安装 vite**

```shell
$ npm create vite@latest
# 之后进入选项

$ mkdir parentDir
$ cd parentDir
$ npm init vite@latest
# 之后进入安装选项
# 如果 parentDir 不为空目录，直接 init 安装会失败
```

> [npm init](https://npm.nodejs.cn/cli/v9/commands/npm-init) 或者 `npm help create` 能看到 `create` 是作为 `init` 的别名使用的，但实际上，差别在于从结果上会多一层目录。



### **安装模板**

- 更多模板 [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite)

```shell
$ npm create vite@latest my-vue-app -- --template vue
```





