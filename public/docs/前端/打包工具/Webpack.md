

## 关于

本文档目的

- 个人学习使用，来源见下列，不再具体标出
  - [Webpack 英文官网](https://webpack.js.org/)
  - [Webpack 中文网](https://www.webpackjs.com/configuration/module/)
  - [Webpack 5 知识体系](https://gitmind.cn/app/docs/m1foeg1o?view=outline)
  - [[万字总结] 一文吃透 Webpack 核心原理](https://zhuanlan.zhihu.com/p/363928061)



## 核心概念

### 模块（Modules）

在模块化编程中，开发者将程序分解为功能离散的 chunk，并称之为 **模块**。



### 依赖图(dependency graph)

每当一个文件依赖另一个文件时，webpack 都会将文件视为直接存在 *依赖关系*。这使得 webpack 可以获取非代码资源，如 images 或 web 字体等。并会把它们作为 *依赖* 提供给应用程序。

当 webpack 处理应用程序时，它会根据命令行参数中或配置文件中定义的模块列表开始处理。 从 [*入口*](https://www.webpackjs.com/concepts/entry-points/) 开始，webpack 会递归的构建一个 *依赖关系图*，这个依赖图包含着应用程序中所需的每个模块，然后将所有模块打包为少量的 *bundle* —— 通常只有一个 —— 可由浏览器加载。



### Webpack 概念

本质上，**webpack** 是一个用于现代 JavaScript 应用程序的 *静态模块打包工具*。当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个 依赖图，然后将你项目中所需的每一个模块组合成一个或多个 *bundles*，它们均为静态资源，用于展示你的内容。



### 核心流程

Webpack 的过程核心完成了 **内容转换 + 资源合并** 两种功能，实现上包含三个阶段：

1. 初始化阶段：

2. 1. **初始化参数**：从配置文件、 配置对象、Shell 参数中读取，与默认配置结合得出最终的参数
   2. **创建编译器对象**：用上一步得到的参数创建 `Compiler` 对象
   3. **初始化编译环境**：包括注入内置插件、注册各种模块工厂、初始化 RuleSet 集合、加载配置的插件等
   4. **开始编译**：执行 `compiler` 对象的 `run` 方法
   5. **确定入口**：根据配置中的 `entry` 找出所有的入口文件，调用 `compilition.addEntry` 将入口文件转换为 `dependence` 对象

3. 构建阶段：

4. 1. **编译模块(make)**：根据 `entry` 对应的 `dependence` 创建 `module` 对象，调用 `loader` 将模块转译为标准 JS 内容，调用 JS 解释器将内容转换为 AST 对象，从中找出该模块依赖的模块，再 递归 本步骤直到所有入口依赖的文件都经过了本步骤的处理
   2. **完成模块编译**：上一步递归处理所有能触达到的模块后，得到了每个模块被翻译后的内容以及它们之间的 **依赖关系图**

5. 生成阶段：

6. 1. **输出资源(seal)**：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 `Chunk`，再把每个 `Chunk` 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
   2. **写入文件系统(emitAssets)**：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统



## 安装与构建

```shell
$ cd <project-dir>/
$ npm init -y # -y 初始化自动 yes
$ npm install webpack webpack-cli --save-dev # 显然是开发依赖
```

> 不熟悉？[npm package.json#devDependencies](https://npm.nodejs.cn/cli/v9/configuring-npm/package-json#devdependencies)



**目录结构**

```
// 暂时手动创建的目录结构
<project-dir>/
 |- node_modules/
 |- dist/
 	|- index.html // 里面 js 为 ./main.js 什么名都行，注意配置即可
 |- src/
 	|- index.js
 	|- style.css
 |- package.json
 |- package-lock.json
 |- webpack.config.js // 没有就手动放着先
```



**随便放点东西到里面**

```javascript
// index.js
import _ from 'lodash';

 function component() {
   const element = document.createElement('div');

   element.innerHTML = _.join(['Hello', 'webpack'], ' ');

   return element;
 }

 document.body.appendChild(component());
```

意味着需要安装下

```shell
# 管他是什么东西，这不重要
$ npm install lodash -D # 相当于 --save-dev
```



**配置  package.json**

```json
{
    // "type": "cjs", // 注意这里只能是默认的 cjs 规范，esm 会报错
    // "main": "./index.js", // 删除主入口
    "private": true, // 私人所有，npm 拒绝发布
    "script": {
       "test": "echo \"Error: no test specified\" && exit 1",
       "build": "webpack" // 说是为了方便，现在直接使用 npx webpack 也行
    }
}
```

> 不熟悉？[npm package.json#private](https://npm.nodejs.cn/cli/v9/configuring-npm/package-json#private)



**配置 webpack.config.js**

```js
// webpack.config.js
// 没有就手动创建一下，否则可能报错
import * as path from 'path';

module.exports = {
  mode: "development", // 模式要先确定好，否则报错
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'), // resolve 是构建绝对路径
  },
};
```

> 不熟悉？[node Path#resolve](https://nodejs.cn/dist/latest-v20.x/docs/api/path.html#pathresolvepaths)



**构建**

```shell
$ npm run build # 配置了 npm script 就 build
$ npx webpack --config webpack-config.js # 也可以 npx webpack ，参数含义是可以增加其他配置文件
```



## 引入资源

> 也就是依赖图的资源，可以是非代码资源



### css

```shell
$ npm install --save-dev style-loader css-loader
```

配置 webpack-config.js

```javascript
{
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // 这里的顺序不能乱
      },
    ],
  },
}
```

依赖 css 的 js 文件通过 `import 文件名.css` 就可以自动在 `index.html` 的 `<head>` 中。



### 图像

> 内置有 Asset Modules

配置 webpack-config.js

```js
{
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
}
```

在 js 文件中使用

```javascript
import imgUrl from '图像路径.png';
```

在 css 文件中

```css
.hello {
   background: url('./icon.png');
}
```

> 图片的路径也会更正为最终的 url



### 字体

> 内置的 Asset Moduless

配置 webpack-config.js

```javascript
{
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
}
```

css 文件

```css
@font-face {
  font-family: 'MyFont';
  src: url('./my-font.woff2') format('woff2'),
       url('./my-font.woff') format('woff');
  font-weight: 600;
  font-style: normal;
}

.hello {
   color: red;
  font-family: 'MyFont';
   background: url('./icon.png');
}
```



### 数据

- `csv`：``csv-loader`
- `xml`：``xml-loader`

```shell
$ npm install --save-dev csv-loader xml-loader
```

配置 webpack.config.js

```javascript
{
  module: {
    rules: [
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
    ],
  },
}
```

在 js 文件中，正常 `import`

```javascript
import Data from './data.xml';
import Notes from './data.csv';
```



- `toml`：`toml `
- `yamljs`：`yamljs`
- `json5`：`json5`

```shell
$ npm install toml yamljs json5 --save-dev
```

配置 webpack.config.js

```javascript
{
  module: {
    rules: [
      {
        test: /\.toml$/i,
        type: 'json',
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
}
```



## 管理输出

### 多入口输出

配置 webpack-config.js

```javascript
 const path = require('path');

 module.exports = {
  entry: {
    index: './src/index.js',
    print: './src/print.js',
  },
   output: {
    filename: '[name].bundle.js', // 相应地，更改与加入 index.html 中的 js 文件
    path: path.resolve(__dirname, 'dist'),
   },
 };
```



### HtmlWebpackPlugin

默认生成 `index.html`

- 管理 `html.index` ：`html-webpack-plugin`
- [源码](https://github.com/jantimon/html-webpack-plugin)

```shell
$ npm install --save-dev html-webpack-plugin
```

配置 webpack-config.js

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: {
     index: './src/index.js',
     print: './src/print.js',
   },
   
  // 管理插件
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack TEST', // html 的title
   	  filename: 'index.html', // 默认值
      template: './src/index.html', // 模板
    }),
  ],
    
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
};
```

`./src/index.html`

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body></body>
</html>
```



### 清理 dist/

```javascript
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true, // 构建前会清空
   },
```



## 开发环境

### source map

追踪 error 和 warning

- [introduction source maps](http://blog.teamtreehouse.com/introduction-source-maps)



### watch mode

更新一个文件，则代码都会被重新构建。但是，想要在浏览器看到修改后的实际效果，则需要手动刷新。

package.json

```json
   "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
     "watch": "webpack --watch", // 参数 --watch
     "build": "webpack"
   },
```



### webpack-dev-server

- [dev server](https://www.webpackjs.com/configuration/dev-server/)

`webpack-dev-server` 提供了一个基本的 web server，并且具有 live reloading(实时重新加载) 功能。

```shell
$ npm install --save-dev webpack-dev-server
```

webpack.config.js

```javascript
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   mode: 'development',
   entry: {
     index: './src/index.js',
     print: './src/print.js',
   },
   devtool: 'inline-source-map',
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Development',
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
   },
     
   devServer: {
     static: './dist', // 将该文件夹下的资源 server
   },
     
   optimization: { // 优化
     runtimeChunk: 'single', // 位 chunk 生成一个 runtime bundle
   },
 };
```

package.json

```json
{
  "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
     "watch": "webpack --watch",
     "start": "webpack serve --open",
     "build": "webpack"
   }
}
```



## 代码分离

### SplitChunksPlugin

- 开箱即用

[`SplitChunksPlugin`](https://www.webpackjs.com/plugins/split-chunks-plugin) 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。

webpack.config.js

```javascript
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
      index: './src/index.js',
      another: './src/another-module.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clear: true,
    },
    // 这里配置
   optimization: {
     splitChunks: {
       chunks: 'all',
     },
   },
};
```



### 关于动态导入

- 需要 default 属性

```javascript
import ('lodash').then( ({ default: _ }) => {
    // ...
} )

// 其同等的代码
const { default: _ } = await import ('lodash');
```



### 预获取与预加载模块

- **prefetch**(预获取)：将来某些导航下可能需要的资源
- **preload**(预加载)：当前导航下可能需要资源

```javascript
import(/* webpackPrefetch: true */ './path/to/LoginModal.js');
```

这会生成 `<link rel="prefetch" href="login-modal-chunk.js">` 并追加到页面头部，指示着浏览器在闲置时间预取 `login-modal-chunk.js` 文件。

`import` 可以使用 `.catch()` 语法处理加载出错的情况，但是如果其处在模块本身加载出错。可以自己增加 `onerror` 移除该 `<script>` ，避免意外情况。

```html
<script
  src="https://example.com/dist/dynamicComponent.js"
  async
  onerror="this.remove()"
></script>
```



### bundle 分析

一旦开始分离代码，一件很有帮助的事情是，分析输出结果来检查模块在何处结束。 [官方分析工具](https://github.com/webpack/analyse) 是一个不错的开始。还有一些其他社区支持的可选项：

- [webpack-chart](https://alexkuz.github.io/webpack-chart/): webpack stats 可交互饼图。
- [webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/): 可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的。
- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)：一个 plugin 和 CLI 工具，它将 bundle 内容展示为一个便捷的、交互式、可缩放的树状图形式。
- [webpack bundle optimize helper](https://webpack.jakoblind.no/optimize)：这个工具会分析你的 bundle，并提供可操作的改进措施，以减少 bundle 的大小。
- [bundle-stats](https://github.com/bundle-stats/bundle-stats)：生成一个 bundle 报告（bundle 大小、资源、模块），并比较不同构建之间的结果。



## 缓存

### 输出文件的文件名

- [output filename](https://www.webpackjs.com/configuration/output/#outputfilename)

webpack-config.js

```javascript
output: {
  filename: '[name].[contenthash].js', // 根据内容创建唯一 hash
  path: path.resolve(__dirname, 'dist'),
  clean: true,
}
```



### 提取引导模块

[`SplitChunksPlugin`](https://www.webpackjs.com/plugins/split-chunks-plugin/) 可以用于将模块分离到单独的 bundle 中。webpack 还提供了一个优化功能，可使用 [`optimization.runtimeChunk`](https://www.webpackjs.com/configuration/optimization/#optimizationruntimechunk) 选项将 runtime 代码拆分为一个单独的 chunk。将其设置为 `single` 来为所有 chunk 创建一个 runtime bundle：

```javascript
optimization: {
  runtimeChunk: 'single',
}
```

将第三方库(library)（例如 `lodash` 或 `react`）提取到单独的 `vendor` chunk 文件中，是比较推荐的做法，这是因为，它们很少像本地的源代码那样频繁修改。因此通过实现以上步骤，利用 client 的长效缓存机制，命中缓存来消除请求，并减少向 server 获取资源，同时还能保证 client 代码和 server 代码版本一致。 可以通过使用  [`SplitChunksPlugin`](https://www.webpackjs.com/plugins/split-chunks-plugin/) 插件的 [`cacheGroups`](https://www.webpackjs.com/plugins/split-chunks-plugin/#splitchunkscachegroups) 选项来实现。我们在 `optimization.splitChunks` 添加如下 `cacheGroups` 参数并构建：

webpack-config.js

```javascript
optimization: {
  runtimeChunk: 'single',
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
      },
    },
  },
}
```



### 模块标识符

> 一个模块改变了，也会导致其他模块 hash 改变，我们只希望只改变这一个。

因为每个 [`module.id`](https://www.webpackjs.com/api/module-variables/#moduleid-commonjs) 会默认地基于解析顺序(resolve order)进行增量。也就是说，当解析顺序发生变化，ID 也会随之改变。简要概括：

- `main` bundle 会随着自身的新增内容的修改，而发生变化。

- `vendor` bundle 会随着自身的 `module.id` 的变化，而发生变化。

- `manifest` runtime 会因为现在包含一个新模块的引用，而发生变化。

  

将 [`optimization.moduleIds`](https://www.webpackjs.com/configuration/optimization/#optimizationmoduleids) 设置为 `'deterministic'`：

```javascript
optimization: {
    moduleIds: 'deterministic', // 增加此条
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
     },
  },
}
```

