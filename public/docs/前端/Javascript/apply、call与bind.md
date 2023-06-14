## 方法

当存在对象 A 与对象 B，对象 A 中有一个通用方法（如果该方法中又使用到了对象 A 的属性，这时候就是出现了 `this`），既然通用，则 B 中可以不再单独设计，而是重用，也就用到了下列的方法。参数 `this` 的位置是否严格传递 `this` 指向，要看该方法是否用到了传递对象的属性。

- `apply(thisArg, [arg1, arg2, ...])` 
  - 调用一个具有给定 `this` 值的函数，以及以一个数组（或一个[类数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#working_with_array-like_objects)）的形式提供的参数。
  - 返回调用有指定 **`this`** 值和参数的函数的结果。
- `call(thisArg, arg1, arg2, ...)` 
  - 使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。
  - 返回使用调用者提供的 `this` 值和参数调用该函数的返回值。若该方法没有返回值，则返回 `undefined`。
- `bind(thisArg, arg1, arg2, ...)` 
  - 创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
  - 返回一个原函数的拷贝，并拥有指定的 **`this`** 值和初始参数。



**区别**

- `apply()` 与 `call()` 的区别：参数的形式不同，`apply()` 实际上只有两个参数，第二个参数为数组；`call()` 的第 2 个以及第 2 个参数以上的参数，可以看作是 `apply()` 第 2 个参数的元素。
- `call()` 与 `bind()` 的区别：`call()` 和 `apply()` 都是使用后便立即执行，而`bind()` 则返回原函数的拷贝且拥有初始参数，可以在之后调用。



## apply()

```javascript
const a = {
  name: "a",
  print(...args) {
    console.log(this.name, ...args);
  },
};

const b = {
  name: "b",
  print(...args) {
    a.print.apply(this, args);
  },
};

b.print("hello", "world");
```



## call()

除了传参形式不一样，其余相同

```javascript
const a = {
  name: "a",
  print(...args) {
    console.log(this.name, ...args);
  },
};

const b = {
  name: "b",
  print(...args) {
    a.print.call(this, ...args); // 仅此处不同
  },
};

b.print("hello", "world");
```



## bind()

```javascript
const a = {
  name: "a",
  age: "18",
  print(...args) {
    console.log(this.name, ...args);
  },
};

const b = {
  name: "b",
  print(...args) {
    const awaitPrint = a.print.bind(this, ...args);
    awaitPrint(); // 绑定后需要手动执行
  },
};

b.print("hello", "world");
```

