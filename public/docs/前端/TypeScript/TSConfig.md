## 为什么存在？

- [What is a tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- 是 `ts` 项目为 `tsconfig.json` ，`js` 项目则使用 `jsconfig.json`
- 如果在调用 `tsc` 时没有指定文件，将会使用该 `json` 文件

该 `json` 文件指定了编译项目所需的根文件和编译器选项。



## 地址

- [官网](https://www.typescriptlang.org/docs/)

也可以参考 [掘金 DYBOY](https://juejin.cn/post/7039583726375796749#heading-21) 的文章

## 前置

### 通配符

- `*`匹配零个或者多个字符（不包括目录的分隔符）
- `?`匹配任一字符（不包括目录分隔符）
- `**/`匹配任何层级的嵌套目录



## files

指定包含在项目中的文件列表

- 默认值：`false`
- 只有少量文件，且不需要使用 glob 模式引用许多文件时，非常有用
- 如果需要使用 glob 模式匹配多个文件，使用 `include` 选项



## include

指定要包含在项目中的文件或 glob 模式匹配的列表

- 默认值：`[]` 如果 `files` 选项被配置，否则为 `"**"` 

- 支持[通配符](#通配符)

- glob 模式下，不追加扩展名，则默认包含 `.ts`、`.tsx` 和 `.d.ts` 文件

  - [allowJs](#allowJs) 选项为 `true` 时，追加包含 `.js` 和 `.jsx` 文件

  

## exclude

解析 [include](#include) 选项包含的文件时时，需要忽略的文件或匹配模式的列表。

- 默认值：`["node_modules", "bower_components", "jspm_packages"]` 以及 `outDir` 选项指定的值
- 支持[通配符](#通配符)
- 只对 `include` 选项的解析结果有影响
  - 即：`exclude` 指定忽略一个文件， 但是 `include` 选项中的其他文件通过 `import` 或者 `type` 等方式包含了该文件，`exclude` 的选项并不阻止这样的行为



## extends

引入其他配置，新的配置将会覆盖其引用的配置

- 默认值：`false`
- 非默认值时为字符串
- 细节阅读 [extends](https://www.typescriptlang.org/zh/tsconfig#extends)

如果存在一份配置文件，其目录为 `config/base.json`

```json
{
  "compilerOptions": {
      "allowJs": true
  }
}
```

则可在文件 `tsconfig.json` 中引入

```json
{
  "compilerOptions": {},
  "extends": "./config/base"
}
```

如果这时在 `tsconfig.noallowjs.json` 配置中再引入 `tsconfig.json`

```json
{
  "compilerOptions": {
      "allowJs": false
  },
  "extends": "./tsconfig"
}
```



## compilerOptions

- [tsconfig](https://www.typescriptlang.org/tsconfig#Type_Checking_6248)，通过地址栏的 `#` 进行定位
- 体会选项的分类



### Type Checking

#### strict

启动严格的检查类型

- 开启后可以为个别单独关闭
- 因为严格，未来升级可能导致类型出错



### Modules

#### baseUrl

声明一个根目录



#### rootDir

设置用于读取的根目录，



#### module

编译后的模块化方案，

默认值，根据 [target](#target) 选项的值：

- `CommonJS`：如果 [target](#target) 选项的值为 `ES3` 或 `ES5` 
- `ES6/ES2015` ： 其他情况

可以配置的值

- `none`
- `commonjs`
- `amd`
- `umd`
- `system`
- `es6`/`es2015`
- `es2020`
- `es2022`
- `esnext`
- `node16`
- `nodenext`



#### moduleResolution

模块解析策略，一般配置为 `node` 

默认值：根据 [module](#module) 选项决定默认值

可以设置的值：

- `'node'` for Node.js’ CommonJS implementation
- `'node16'` or `'nodenext'` for Node.js’ ECMAScript Module Support [from TypeScript 4.7 onwards](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/#esm-nodejs)
- `'classic'` used in TypeScript before the release of 1.6. You probably won’t need to use `classic` in modern code



#### paths

在导入时，相对于 `baseUrl`， 映射一个位置

- 声明当 `require` / `import` 时，ts 应该如何导入

- 字面意思上与作用上，就是别名

```json
{
  "compilerOptions": {
    "paths": {
      "@": ["src/"]
    }
  }
}
```



#### resolveJsonModule

是否可以导入 `.json` 文件

默认值：`false`



### Emit

#### noEmit

是否要关闭编译器输出文件

- `true`：转交给其他工具转换为 js 环境中可运行的文件，如 Babel
  - 使用 ts 作为提供编辑器集成的工具，并作为源代码类型检查



### JavaScript Support

#### allowJs

允许 ts 文件导入 js 文件，使 ts 文件与 js 文件共存。

将影响 [include](#include) 选项，在 glob 匹配模式下，不指定扩展名时，若 `allowJs` 值为：

- false：默认包含`.ts`、`.tsx`和`.d.ts`类型的文件
- true：默认追加包含 `.js` 和 `.jsx` 文件



### Introp Constraints

#### isolatedModules

在编译过程中，单文件被编译时不能被正确解释，将会出现警告提醒

- 不会改变代码行为
- 不会改变代码的行为，也不会改变 TypeScript 检查和释放过程的行为



#### esModuleInterop

是否严格规范模块编译行为

- `true`：解决 `import` 和 `require` 相互转换时会出现的问题
  - 将通过改变编译行为和利用新函数修复



### Language and Environment

#### jsx

影响 `.tsx` 文件的输出。

可设置以下值：

- `preserve`：生成 `.jsx` 文件，JSX不变
- `react`：生成 `.js` 文件，将JSX更改为等效的 `React.createElement` 调用
- `react-jsx`：生成 `.js` 文件，将JSX更改为 `_jsx` 调用
- `react-jsxdev`：生成 `.js` 文件，将JSX更改为 `_jsx` 调用
- `react-native`：生成 `.js` 文件，JSX 不变



#### lib

某些对象对于 ts 编译来说并不能识别出来，所以需要引入支持的类型声明文件。

比如需要支持 `document` 对象，则需要添加 `DOM`。

```json
{
  "compilerOptions": {
    "lib": ["DOM"]
  }
}
```

**High Level libraries**，完整查看 [Lib - lib](https://www.typescriptlang.org/tsconfig#lib)

| Name         | Contents                                                     |
| :----------- | :----------------------------------------------------------- |
| `ES5`        | Core definitions for all ES3 and ES5 functionality           |
| `ES2015`     | Additional APIs available in ES2015 (also known as ES6) - `array.find`, `Promise`, `Proxy`, `Symbol`, `Map`, `Set`, `Reflect`, etc. |
| `ES6`        | Alias for “ES2015”                                           |
| `ES2016`     | Additional APIs available in ES2016 - `array.include`, etc.  |
| `ES7`        | Alias for “ES2016”                                           |
| `ES2017`     | Additional APIs available in ES2017 - `Object.entries`, `Object.values`, `Atomics`, `SharedArrayBuffer`, `date.formatToParts`, typed arrays, etc. |
| `ES2018`     | Additional APIs available in ES2018 - `async` iterables, `promise.finally`, `Intl.PluralRules`, `regexp.groups`, etc. |
| `ES2019`     | Additional APIs available in ES2019 - `array.flat`, `array.flatMap`, `Object.fromEntries`, `string.trimStart`, `string.trimEnd`, etc. |
| `ES2020`     | Additional APIs available in ES2020 - `string.matchAll`, etc. |
| `ES2021`     | Additional APIs available in ES2021 - `promise.any`, `string.replaceAll` etc. |
| `ESNext`     | Additional APIs available in ESNext - This changes as the JavaScript specification evolves |
| `DOM`        | [DOM](https://developer.mozilla.org/docs/Glossary/DOM) definitions - `window`, `document`, etc. |
| `WebWorker`  | APIs available in [WebWorker](https://developer.mozilla.org/docs/Web/API/Web_Workers_API/Using_web_workers) contexts |
| `ScriptHost` | APIs for the [Windows Script Hosting System](https://wikipedia.org/wiki/Windows_Script_Host) |



#### target

设置编译后的 js 的版本

**更改后，也会更改 [lib](#lib) 选项的默认值，需要进行配置。**

可以设置以下值：

- `es3`：默认值
- `es5`
- `es6` / `es2015`
- `es2016`
- `es2017`
- `es2018`
- `es2019`
- `es2020`
- `es2021`
- `es2022`
- `esnext`：ts 所支持的最高版本，谨慎使用



#### useDefineForClassFields

切换到 ECMA 运行时行为，但语法相同

默认值，根据 [target](#target) 而有不同的值：

- `true`：当 `target` 选项为 `ES2022` 或更高配置时，包括 `ESNext`
- `false`：其他配置



### Completeness

#### skipLibCheck

是否跳过声明文件的类型检查

- `true`：
  - 节省时间
  - 影响准确性

















