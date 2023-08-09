## 介绍

- [IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)

个人理解：观察给定 元素与视口（或给定的祖先元素）的位置关系，可以触发一个给定的函数。进入视口时处理的事件可以使用到该 api。

```js
const intersectionObserver = new IntersectionObserver(
    function(entries){
		// 处理监听的对象
	}, 
     {   // 该对象为可选参数
         // root: Element, // 其边界将视作视口
         // rootMargin: "0px 0px 0px 0px", // 添加给根边界的偏移量
         // thresholds: [0.1, 0.5], // 监听元素的与边界盒交叉区域的比例值（可见比例）
     });
```



## 回调函数中的 entries

该 entries 出现在回调函数中，作为参数传递，可以尝试运

entries 为一个数组，其元素的类型为 [IntersectionObserverEntry](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserverEntry)。其有以下属性

- `boundingClientRect`：[`DOMRectReadOnly`](https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly) 对象，可看成  [`Element.getBoundingClientRect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)。
- `intersectionRect`：同样是 [`DOMRectReadOnly`](https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly) 对象，元素与其属于的目标元素的一个交集所形成的（被裁剪的）。
- `intersectionRatio`：``boundingClientRect` 与 `intersectionRect` 的比例。
- `target`：指定的元素。
- `time`：[`DOMHighResTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp)
- `isIntersecting`：元素与视口是否有交集，如果 `true`，就认为出现在了视口中（个人简单理解）



## 属性

可以获得实例的 `options`

- `root`
- `rootMargin`
- `thresholds`





## observe(Element)

监视某个元素

```js
const intersectionObserver = new IntersectionObserver((entries)=>{
	for (let i=0; i<entries.length; i++) {
        if (entries[i].intersectionRatio <= 0) continue;
        console.log(entries[i].target); // 能拿到 observe 时的元素
    }
});

const IMGS = document.querrySeletorAll('img');
IMGS.forEarch(IMG=>{
    // 监视某个元素
    intersectionObserver.observe(IMG);
});
```



## unobserve(Element)

取消对某个元素的监视

```js
const intersectionObserver = new IntersectionObserver((entries)=>{
	for (let i=0; i<entries.length; i++) {
        if (entries[i].intersectionRatio <= 0) continue;
        
        // ...
        
        // 比如在此处取消监视，注意传入值是类型 Element
        intersectionObserver.unobserve(entries[i].target);
    }
});

const IMGS = document.querrySeletorAll('img');
IMGS.forEarch(IMG=>{
    intersectionObserver.observe(IMG);
});
```



## disconnect()

终止对所有目标的监视

```js
const intersectionObserver = new IntersectionObserver((entries)=>{});
const IMGS = document.querrySeletorAll('img');
IMGS.forEarch( IMG => intersectionObserver.observe(IMG) );

// ...

// 终止所有监视
intersectionObserver.unobserve();
```



## takeRecords()

元素被视口的相交信息的数组。

```js
let intersectionObserverEntries = intersectionObserver.takeRecords();
```

