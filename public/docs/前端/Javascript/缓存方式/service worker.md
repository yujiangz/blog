## 介绍

- [Using Service Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers)
- [通过 Service workers 让 PWA 离线工作](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps/Tutorials/js13kGames/Offline_Service_workers)
- [Service Worker API](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)
- [`Cache`](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache) 缓存请求和响应对象的存储方式，被定义在 `Service Worker` 中，但不必一定和 `Service Worker` 一起使用。



## 推荐

- [网易云课堂 Service Worker 运用与实践](https://mp.weixin.qq.com/s/3Ep5pJULvP7WHJvVJNDV-g)
- [Vite PWA](https://vite-pwa-org.netlify.app/)



## 例子

详细的策略请在其他文档查看。



**index.html**

```js
  <body>
    <main id="main">
      <section>
        <h2>1</h2>
        <img src="/assets/原神 (1).jpg" alt="" />
      </section>
      <section>
        <h2>2</h2>
        <img src="/assets/原神 (2).jpg" alt="" />
      </section>
      <section>
        <h2>3</h2>
        <img src="/assets/原神 (3).jpg" alt="" />
      </section>
    </main>
    <script src="./index.js"></script>
  </body>
```



**index.js**

```js
if ('serviceWorker' in navigator) {
    try {
      const registration = navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      if (registration.installing) {
        console.log("正在安装");
      } else if (registration.waiting) {
        console.log("已安装");
      } else if (registration.active) {
        console.log("已激活");
      }
    } catch (error) {
      console.log("注册失败", error);
    }
}
```



**service-worker.js**

```js
const Resources = [
  "/",
  "/index.html",
  "/assets/原神 (1).jpg",
  "/assets/原神 (2).jpg",
  "/assets/原神 (3).jpg",
];

/**
 * 缓存给定的资源，请查阅 caches
 * @param {string[]} resources
 */
function addResourcesToCache(resources) {
  caches.open("v1").then((cache) => {
    cache.addAll(resources);
    console.log("资源已缓存");
  });
}
self.addEventListener("install", function (event) {
  console.log("正在 install");
  event.waitUntil(addResourcesToCache(Resources));
});

/**
 * 请求时的策略，请查看其他文档
 * @param {Request} request
 */
function cachesMethod(request) {
  console.log(request);
  if (Resources.some((r) => request.url.includes(r))) {
    console.log("返回缓存");
    return caches.match(request);
  } else {
    return fetch(request);
  }
}
self.addEventListener("fetch", function (event) {
  console.log("fetch 请求资源");
  event.respondWith(cachesMethod(event.request));
  // 不论是何策略，event.respondWidth() 都接收一个 Promise
});

/**
 * 删除旧的缓存
 * @param {Request} request
 */
function deleteOldCaches(request) {
  caches.keys().then((cache) => {
    console.log("已缓存的", cache);
  });
  caches.delete(request).then(function (res) {
    console.log("为 true", res);
  });
}
self.addEventListener("activate", function (event) {
  console.log("worker 被激活");
  event.waitUntil(deleteOldCaches);
});

```

