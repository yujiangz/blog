- [Storage](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage)
- [localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage) 当前源（特定页面协议）的本地存储空间的 Storage 对象
- [sessionStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage) 当前源的 session [`Storage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage) 对象



## [Storage](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage)

### 实例属性

#### [`Storage.length`](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/length) 

返回一个整数，表示存储在 `Storage` 对象中的数据项数量。



### 实例方法

#### [`Storage.key(index)`](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/key)

该方法接受一个数值 n 作为参数，并返回存储中的第 n 个键名。

**参数**

- `index` 一个整数，表示要获取的键名索引。

**返回值**

包含键名称的字符串。如果索引不存在，则返回 `null`。



#### [`Storage.getItem(key)`](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/getItem)

**参数**

- `key` 键名

**返回值**

一个包含键的值的字符串。如果该键名不存在，则返回 `null`。



#### [`Storage.setItem(key, value)`](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/setItem)

**参数**

- `key` 包含要创建或更新的键名字符串。
- `value` 包含要创建或更新的键名对应的值字符串。

**返回值**

无（`undefined`)



#### [`Storage.removeItem(key)`](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/removeItem)

**参数**

- `key` 要删除的键名字符串

**返回值**

无（`undefined`）



#### [`Storage.clear()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/clear)

**参数**

无

**返回值**

无



## [localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)

- 该属性允许访问当前 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 源（origin）的对象 [`Storage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage)。
- 存储的数据可以长期保留。

```js
const myStorage = localStorage;
// 对象： Storage { length: 0 }
```

所以可以使用 `Storage` 实例方法。



## [sessionStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage)

- 该属性允许访问当前源的 session [`Storage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage) 对象。
- 页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。
- 在新标签或窗口打开一个页面时会复制顶级浏览会话的上下文作为新会话的上下文，这点和 session cookie 的运行方式不同。
- 打开多个相同的 URL 的 Tabs 页面，会创建各自的 `sessionStorage`。
- 关闭对应浏览器标签或窗口，会清除对应的 `sessionStorage`。

```js
const myStorage = sessionStorage;
//对象： Storage {length: 0}
```

所以可以使用 `Storage` 实例方法。

