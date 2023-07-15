## 说明

- [IndexedDB API](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)

- 一种底层 API，用于在客户端存储大量的结构化数据（也包括文件/二进制大型对象（blobs））

> 请顺序该文档，虽然标题为对象类型或者方法，但依旧根据 MDN 教程顺序排序，标题可能是我学习过程中产生疑问的答案。



## 检查支持 indexedDB

最新的支持情况请阅读 [IndexedDB API](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API) 。

```js
if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
}
```



## [IDBOpenDBRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBOpenDBRequest) 

其继承自 [IDBRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBRequest) 和 [EventTarget](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget) 。



### 打开 / 创建数据仓库

如果没有，则创建。注意返回值：

```js
const request = window.indexedDB.open(DatabaseName, version);
// 返回值 request 为 IDBOpenDBRequest 对象
```

**参数**

`DatabaseName` 数据库名

`version` 数据库版本，必须为整数。

**返回值**

[IDBOpenDBRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBOpenDBRequest) （其继承 [IDBRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBRequest) 和 [EventTarget](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget)）。



之后突然就是事件，为什么就是事件了？暂时没深究，但目前最重要的是，事件中可以拿到数据。（心理状态：我怎么对数据进行操作呢？急。）



### 事件 upgradeneeded

**当创建一个新的仓库，或者更新版本号的时候，将触发 `updrageneeded` 事件**：

```js
request.onupgradeneeded = function (event) {
	const db = event.target.result;
	// event.target -> IDBOpenDBRequest
    console.log('upgradeneeded:(db)', db);
    // event.target.result -> 
    
    // 以下可先跳过
	// const objectStore = db.createObjectStore("name", { keyPath: "myKey" });
	// console.log("upgradeneeded:", objectStore);
};
```



### 事件 error、success 

**成功与失败，`success` 执行顺序在 `upgradeneeded` 之后**：

```js
const request = window.indexedDB.open('TestDatabse', 1);

request.onerror = function(event) {
    console.log('error:', event.target);
    // IDBOpenDBRequest
}

// 顺利打开或者创建的话
// 但是，如果有 upgradeneeded 事件，则在 upgradeneeded 成功后 执行
request.onsuccess = function(event) {
    console.log('success:', event.target);
    // IDBOpenDBRequest
    // event.target.result -> IDBDatabase
}
```



## [IDBDatabase](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBDatabase)

```js
const request = window.indexedDB.open('TestDatabse', 1);
request.onupgradeneeded = function (event) {
    console.log(event.target.result);
    // IDBDatabase 对象
}
```



### 方法 [createObjectStore()](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBDatabase/createObjectStore)

```js
const objectStore = IDBDatabase.createObjectStore(name, options);
```

**参数**

`name` 被创建的*对象仓库*（注意看返回值类型）的名称，空名称是允许的。

`options` 可选的对象，该对象属性可选：

```js
const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
];
const objectStore = IDBDatabase.createObjec('customers', {
    keyPath: 'ssn', // 这里的数据：ssn 具有唯一性
    // autoIncrement: false, // 默认值，请单独阅读： key generator
});
// 注意，还没有对数据进行操作，还只是在创建空间
```

**返回值**

[IDBObjectStore](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBObjectStore)



### 方法 [transaction()](https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/transaction)

主要为更改 `mode` ，可读或是可读可写，同样，也是为了得到 `transaction` 的事件，确保仓库创建完毕。

```js
transaction(storeNames, mode, options);
```

**参数**

`storeNames`：`string[]`，元素为 对象仓库 的名称。如果只有一个元素，类型可以为 `string`。

`mode`：可选，默认值 `readonly`。 `readonly`, `readwrite` and `readwriteflush`。

`options`：可选。

**返回值**

[IDBTransaction](https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction)



## [IDBTransaction](https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction)

```js
const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
];

let request = indexedDB.open('the_name', 2);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    const objectStore = db.createObjectStore("customers", { keyPath: "ssn" });
    objectStore.createIndex("name", "name", { unique: false });
};

request.onsuccess = function(event) {
    const db = event.target.result;
    
    const transaction = db.transaction(['customers'], 'readwrite');
    // IDBTransaction 对象
}
```



### 事件 [complete](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBTransaction/complete_event)

需要等待对象仓库建立完成：

```js
transaction.addEventListener('complete', function(event) {
    console.log('Transaction was completed');
})
```



### 方法 [objectStore()](https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction/objectStore)

```js
const objStore = transaction.objectStore(name);
// transaction 的类型为 IDBTransaction
```

**参数**

`name`：对象仓库的名字。

**返回值**

[IDBObjectStore](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore) （眼生就再来一遍吧）

```js
const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
];

let request = indexedDB.open('the_name', 2);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    const objectStore = db.createObjectStore("customers", { keyPath: "ssn" });
    objectStore.createIndex("name", "name", { unique: false });
};

request.onsuccess = function(event) {
    const db = event.target.result;
    
    const transaction = db.transaction(['customers'], 'readwrite');
    transaction.addEventListener('complete', function(event) {
        
        const customerObjectStore = db.transaction("customers");
        // IDBObjectStore 对象
        
        // customerData.forEach(customer => {
        //      customerObjectStore.add(customer);
        // })
    })
}
```



## [IDBObjectStore](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBObjectStore)

```js
const request = window.indexedDB.open('TestDatabse', 1);
request.onupgradeneeded = function (event) {
    const db = event.target.result;
    
    const objectStore = db.createObjectStore();
    // IDBOjectStore 对象
}
```



### 方法 [createIndex()](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/createIndex)

```js
createIndex(indexName, keyPath, options)
```

**参数**

`indexName` index 的名字，可以为空名。（索引有多种形式，你可能会为某个索引形式取的名字。）

`keyPath` 可以说成是给 index 的数据项。

`options` 可选的对象参数：

- `unique`：默认false。布尔值，是否具有唯一性；
- `multiEntry`：默认false。如果为 true，则 keyPath 被解析为数组时，将为每个数组元素加入 index（此处不理解 index 为何）。

**返回值**

[IDBIndex](https://developer.mozilla.org/en-US/docs/Web/API/IDBIndex) 新建的键值存储。



```js
const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
];

let request = indexedDB.open('the_name', 2);

request.onerror = function(event) { // 错误处理 };

request.onupgradeneeded = function(event) {
  const db = event.target.result;

  cosnt objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

  objectStore.createIndex("name", "name", { unique: false });
  // 索引类型叫 'name'， 索引指定为数据项 'name'，'name' 不具有唯一性

  objectStore.createIndex("email", "email", { unique: true });

};
```



### 方法 [add()](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBObjectStore/add)

```js
var request = objectStore.add(value, key);
```

**参数**

`value`：需要存储的值。

`key`：可选参数，关键字。

**返回值**

[IDBRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBRequest) 对象（眼生的话重新看一遍吧）。根据返回值，又可以再循环一遍，`success` 等事件。



