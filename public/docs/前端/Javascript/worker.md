## 介绍

- 可以完整阅读 [Using Web Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)

- [`Worker`](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker) 接口会生成真正的操作系统级别的线程。
- 对于 web worker 来说，与其他线程的通信点会被很小心的控制，这意味着你很难引起并发问题。你没有办法去访问非线程安全的组件或者是 DOM。
- 可以使用 window 的数据存储机制。



## 检查支持

```js
if (window.Worker) {
    // ...
}
```



## 基本用法

**main.js**

worker 实例使用方法

- `postMessage(['数据'])`
- `terminate()`：终止

```js
const myworker = new Worker('./sw.js', {});
myworker.postMessage(['数据1', '数据2']); // 值将会给 sw 的 event.data

// ...

myworker.terminate(); // 在某个时候中断
// 比如立即中断等于 myworker 没有执行
```

**worker.js**

事件：message、messageerror、error

```js
// 提示：console.log(self);
self.addEventListener('message', event=>{
    console.log(event.data); // ['数据1', '数据2']
})
```



## 完整示例

阅读 [Using Web Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)