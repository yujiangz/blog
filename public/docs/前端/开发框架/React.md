- [React](https://react.docschina.org/learn/your-first-component)
- [create react app](https://create-react-app.dev/)

如果熟悉 vue，感到困惑时，试着抛开 vue 中的一些相关联的概念，创建属于 react 自己的记忆空间，或许能帮助你走近 react。



## 描述 UI

### 组件

#### 定义组件

```react
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>了不起的科学家</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

- 组件以大写字母开头
- 标签如果和 `return` 不在同一行，就需要一对括号，否则将被忽略。所以，`return ()` 是一个好习惯。



#### 不要在组件中定义组件

组件在使用时可以嵌套使用，但是不要在一个组件中定义一个组件，如下例子将产生 `bug`：

```react
export default function Gallery() {
  // 在组件中定义组件会产生 bug
  function Profile() {
      // ...
  }
  return (
      // ...
  );
}
```

> **为什么？**
>
> 组件中的 state 被更新时，将会导致该组件函数被重新执行，意味着组件中定义的组件也会被重新定义，两次定义后已经不算是同一个组件，被定义的组件的 state 将被重置。同时，也影响了性能。



### 导入和导出组件

像普通函数一样，可以使用默认导出（导入）或是具名导出（导入）做的是思考如何使组件更加模块化。

为了减少混淆，保持同一个导出（导入）风格是一个良好的习惯。



### JSX 标签

> [JSX and React 是相互独立的](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform) 东西。但它们经常一起使用，但你 **可以** 单独使用它们中的任意一个，JSX 是一种语法扩展，而 React 则是一个 JavaScript 的库。

- JSX 规则只能返回一个根元素，如果组件包含多个标签，需要用一个父标签包裹起来，包括可以使用空标签  `<>` 和 `</>` 元素来代替。
- 标签必须闭合。
- 使用驼峰式命名法给大部分属性命名。



### 在 `{}` 中使用 `js`

```react
export default function Avatar() {
  const avatar = '....url';
  const description = '...';
  return (
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}
```

以下的例子传递了一个对象，也就出现了双括号的情况。

```react
export default function TodoList() {
  return (
    <ul style={{
      backgroundColor: 'black', // 内联 style 属性使用的是驼峰命名法
      color: 'pink'
    }}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
```



### 将 Props 传递给组件

`Props` 是传递给 JSX 标签的信息。例如，`className`、`src`、`alt` 等 `props`

```react
// 像子组件传递 props
export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}
```

```react
// 子组件中读取 props
function Avatar({ person, size }) {
  // 在这里 person 和 size 是可访问的
}
```

实际上， 组件只有一个参数 `props`，上述的例子是 `js` 的解构，以下是参数 `props` 对象：

```react
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```



#### 解构传递

可以对 props 使用展开语法，但不要过度使用。

```react
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```



#### 传递组件

传递给 `props.children`， 即 `{ children }`

```react
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <div>
       // ...   
      </div>
    </Card>
  );
}
```



#### props 不可改变

Props 是只读的时间快照：每次渲染都会收到新版本的 props。



### 条件渲染

```react
function Item({ name, isPacked }) {
  // 但这样的写法并不利于维护，仅为演示
  if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="宇航服" 
        />
        <Item 
          isPacked={false} 
          name="Tam 的照片" 
        />
      </ul>
    </section>
  );
}
```



#### 选择性地返回 `null`

在一些情况下，你不想有任何东西进行渲染。比如，你不想显示已经打包好的物品。但一个组件必须返回一些东西。这种情况下，你可以直接返回 `null`。

实际上，在组件里返回 `null` 并不常见，因为这样会让想使用它的开发者感觉奇怪。通常情况下，你可以在父组件里选择是否要渲染该组件。让我们接着往下看吧！



#### 三目运算符（`? :`）

```react
return (
  <li className="item">
    {isPacked ? name + ' ✔' : name}
  </li>
);
```



#### 与运算符（`&&`）

会遇到的另一个常见的快捷表达式是 [JavaScript 逻辑与（`&&`）运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_AND#:~:text=The logical AND ( %26%26 ) operator,it returns a Boolean value.)。在 React 组件里，通常用在当条件成立时，想渲染一些 JSX，**或者不做任何渲染**。使用 `&&`，也可以实现仅当 `isPacked` 为 `true` 时，渲染勾选符号。

```react
return (
  <li className="item">
    {name} {isPacked && '✔'}
  </li>
);
```

> **切勿将数字放在 `&&` 左侧**
>
> JavaScript 会自动将左侧的值转换成布尔类型以判断条件成立与否。然而，如果左侧是 `0`，整个表达式将变成左侧的值（`0`），React 此时则会渲染 `0` 而不是不进行渲染。



#### 选择性地将 JSX 赋值给变量 

```react
if (isPacked) {
  itemContent = name + " ✔";
}
```



### 渲染列表

#### 对数组项进行过滤



#### 用 `key` 保持列表项的顺序 

- **key 值在兄弟节点之间必须是唯一的。** 不过不要求全局唯一，在不同的数组中可以使用相同的 key。
- **key 值不能改变**，否则就失去了使用 key 的意义！所以千万不要在渲染时动态地生成 key。





## 添加交互

### 响应事件

#### 事件处理函数

传递给事件处理函数的函数应直接传递，而非调用。调用时，将在每次渲染时触发。

```react
export default function Button() {
  function handleClick() {
    alert('你点击了我！');
  }

  return (
    <button onClick={handleClick}>
      点我
    </button>
  );
}
```



#### 将事件处理函数作为 props 传递

```react
function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

function PlayButton({ movieName }) {
  function handlePlayClick() {
    alert(`正在播放 ${movieName}！`);
  }

  return (
    <Button onClick={handlePlayClick}>
      播放 "{movieName}"
    </Button>
  );
}

function UploadButton() {
  return (
    <Button onClick={() => alert('正在上传！')}>
      上传图片
    </Button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <PlayButton movieName="魔女宅急便" />
      <UploadButton />
    </div>
  );
}
```



#### 命名事件处理函数 prop

- 内置组件（`<button>` 和 `<div>`）仅支持 [浏览器事件名称](https://react.docschina.org/reference/react-dom/components/common#common-props)，例如 `onClick`。但是，当构建自己的组件时，可以按个人喜好命名事件处理函数的 prop。
- 按照惯例，事件处理函数 props 应该以 `on` 开头，后跟一个大写字母。

```react
function Button({ onSmash, children }) {
  return (
    <button onClick={onSmash}>
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div>
      <Button onSmash={() => alert('正在播放！')}>
        播放电影
      </Button>
      <Button onSmash={() => alert('正在上传！')}>
        上传图片
      </Button>
    </div>
  );
}
```



#### 事件传播

在 React 中所有事件都会传播，除了 `onScroll`，它仅适用于附加到的 JSX 标签。

事件处理函数接收一个 **事件对象** 作为唯一的参数。按照惯例，它通常被称为 `e` ，代表 “event”（事件）。可以使用此对象来读取有关事件的信息。

这个事件对象还允许阻止传播。如果想阻止一个事件到达父组件，需要像下面 `Button` 组件那样调用 `e.stopPropagation()` ：

```react
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('你点击了 toolbar ！');
    }}>
      <Button onClick={() => alert('正在播放！')}>
        播放电影
      </Button>
      <Button onClick={() => alert('正在上传！')}>
        上传图片
      </Button>
    </div>
  );
}
```



#### 阻止默认行为 

```react
export default function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert('提交表单！');
    }}>
      <input />
      <button>发送</button>
    </form>
  );
}
```



#### 事件函数执行副作用

事件处理函数是执行副作用的最佳位置，子组件保持自身的纯粹，但处理函数可以不是纯函数。



### State

组件需要“记住”某些东西：当前输入值、当前图片、购物车。在 React 中，这种组件特有的记忆被称为 **state**。局部变量不会渲染出这样的变化：

```react
export default function Gallery() {
  let index = 0;

  function handleClick() {
    index = index + 1;
  }

  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <div>
          { index }
      </div>
    </>
  );
}
```

`handleClick()` 事件处理函数正在更新局部变量 `index`。但存在两个原因使得变化不可见：

1. **局部变量无法在多次渲染中持久保存。** 当 React 再次渲染这个组件时，它会从头开始渲染——不会考虑之前对局部变量的任何更改。
2. **更改局部变量不会触发渲染。** React 没有意识到它需要使用新数据再次渲染组件。

要使用新数据更新组件，需要做两件事：

1. **保留** 渲染之间的数据。
2. **触发** React 使用新数据渲染组件（重新渲染）。

[`useState`](https://react.docschina.org/reference/react/useState) Hook 提供了这两个功能：

1. **State 变量** 用于保存渲染间的数据。
2. **State setter 函数** 更新变量并触发 React 再次渲染组件。



#### 使用 `useState`

```react
import { useState } from 'react';

export default function Gallery() {
  const [index, setIndex] = useState(0)

  function handleClick() {
    setIndex(index + 1)
  }

  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <div>
          { index }
      </div>
    </>
  );
}
```



#### `useState` 是一个 Hook

在 React 中，`useState` 以及任何其他以“`use`”开头的函数都被称为 **Hook**。

Hook 是特殊的函数，只在 React [渲染](https://react.docschina.org/learn/render-and-commit#step-1-trigger-a-render)时有效。

**Hooks ——以 `use` 开头的函数——只能在组件或[自定义 Hook](https://react.docschina.org/learn/reusing-logic-with-custom-hooks) 的最顶层调用。** 不能在条件语句、循环语句或其他嵌套函数内调用 Hook。Hook 是函数，但将它们视为关于组件需求的无条件声明会很有帮助。在组件顶部 “use” React 特性，类似于在文件顶部“导入”模块。



### 渲染和提交

#### 触发一次渲染

重点是 **触发**

**初次渲染**

当应用启动时，会触发初次渲染。框架和沙箱有时会隐藏这部分代码，但它是通过调用目标 DOM 节点的 [`createRoot`](https://react.docschina.org/reference/react-dom/client/createRoot)，然后用组件调用 `render` 函数完成的：

```react
import { createRoot } from 'react-dom/client';

function Image() {
  return (
    <img
      src=" ... "
      alt=“ ... ”
    />
  );
}

const root = createRoot(document.getElementById('root'))
root.render(<Image />);
```



**状态更新时重新渲染**

一旦组件被初次渲染，就可以通过使用 [`set` 函数](https://react.docschina.org/reference/react/useState#setstate) 更新其状态来触发之后的渲染。



#### React 渲染组件

在触发渲染后，React 会调用组件来确定要在屏幕上显示的内容。**“渲染中” 即 React 在调用组件。**

- **在进行初次渲染时,** React 会调用根组件。
- **对于后续的渲染,** React 会调用内部状态更新触发了渲染的函数组件。

这个过程是递归的：如果更新后的组件会返回某个另外的组件，那么 React 接下来就会渲染 *那个* 组件，而如果那个组件又返回了某个组件，那么 React 接下来就会渲染 *那个* 组件，以此类推。这个过程会持续下去，直到没有更多的嵌套组件并且 React 确切知道哪些东西应该显示到屏幕上为止。



**渲染必须始终是一次 [纯计算](https://react.docschina.org/learn/keeping-components-pure):**

- **输入相同，输出相同。** 给定相同的输入，组件应始终返回相同的 JSX。（当有人点了西红柿沙拉时，他们不应该收到洋葱沙拉！）
- **只做它自己的事情。** 它不应更改任何存在于渲染之前的对象或变量。（一个订单不应更改其他任何人的订单。）

否则，随着代码库复杂性的增加，您可能会遇到令人困惑的错误和不可预测的行为。在 “严格模式” 下开发时，React 会调用每个组件的函数两次，这可以帮助发现由不纯函数引起的错误。



#### React 把更改提交到 DOM 上

在渲染（调用）您的组件之后，React 将会修改 DOM。

- **对于初次渲染，** React 会使用 [`appendChild()`](https://developer.mozilla.org/docs/Web/API/Node/appendChild) DOM API 将其创建的所有 DOM 节点放在屏幕上。
- **对于重渲染，** React 将应用最少的必要操作（在渲染时计算！），以使得 DOM 与最新的渲染输出相互匹配。

**React 仅在渲染之间存在差异时才会更改 DOM 节点。** 例如，有一个组件，它每秒使用从父组件传递下来的不同属性重新渲染一次。注意，您可以添加一些文本到 `<input>` 标签，更新它的 `value`，但是文本不会在组件重渲染时消失：



#### 浏览器绘制

在渲染完成并且 React 更新 DOM 之后，浏览器就会重新绘制屏幕。尽管这个过程被称为“浏览器渲染”（“browser rendering”），但我们还是将它称为“绘制”（“painting”），以避免在这些文档的其余部分中出现混淆。



### State 的快照机制

当 React 重新渲染一个组件时：

1. React 会再次调用组件函数
2. 组件函数会返回新的 JSX 快照
3. React 会更新界面来匹配返回的快照

整个组件都被执行完之后，才产生快照，下次快照的产生将在下一次组件函数被执行完毕时。如下，多次操作，多次读取的值都是上一次的快照：

```react
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
```



### 重新渲染前多次操作 state 值

根据 State 的快照机制，在下次渲染前，操作的 state 值都是上一次的快照，但这并不意味着 React 在一次渲染中只更新一个 state，同次操作多个 state 可以渲染一次。批处理可以更新多个 state ，更新函数执行完之后再处理 state 的更新，而避免多次重新渲染。



#### 同次操作多次更新 state 值

直接传递一个函数，在渲染期间遍历这些加入到队列的函数，从而得到最新的 state。

```react
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}
```



如果混用，需要理解替换操作和更新函数的区别

> 个人理解上，文档上说：
>
> ```
> setState(x) 实际上会像 setState(n => x) 一样运行，只是没有使用 n！
> ```
>
> 这只是为了让你能够理解这句话所在的例子，那个例子中它们的执行效果是相同的，并没有告诉你说在其他例子中是等价的。应该还是要强调：一个为 **传递值** ，一个是 **传递函数**。
>
> 传递函数时，将可以得到该次操作的最新 state 值（不能说是快照值，快照值是渲染完毕之后能得到的），但如果是传递了 state 的值，则遵循 state 的快照机制，使用的依然是上次的快照。

```react
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(1);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5); // 替换操作 加入队列
        setNumber(n => n + 1); // 更新函数 加入队列
        setNumber(42);		   // 替换操作 加入队列
      }}>增加数字</button>
    </>
  )
}
```



#### 命名惯例

```react
// 通常通过相应 state 变量的第一个字母来命名更新函数的参数
setEnabled(e => !e);
setLastName(ln => ln.reverse());
setFriendCount(fc => fc * 2);

// 完整的变量名
setEnabled(enabled => !enabled);

// 加前缀且完整的变量名
setEnabled(prevEnabled => !prevEnabled)
```



### Object 的 state

引用类型，就是需要完整替换，React 没有针对其类型做多余的比较处理。

虽然没有像 vue 中的 reactive，但也更容易理解，可以愉快的使用 `...` 展开语法。

如果很讨厌深度嵌套带来的麻烦可以了解 [Immer](https://github.com/immerjs/use-immer) 。

> #### How does Immer work? 
>
> The `draft` provided by Immer is a special type of object, called a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), that “records” what you do with it. This is why you can mutate it freely as much as you like! Under the hood, Immer figures out which parts of the `draft` have been changed, and produces a completely new object that contains your edits.



### Array 的 state

同样，更新 state 需要完整替换该数据，或者[使用 Immer](https://react.docschina.org/learn/updating-arrays-in-state#write-concise-update-logic-with-immer) 

下面是常见数组操作的参考表。当操作 React state 中的数组时，需要避免使用左列的方法，而首选右列的方法：

|          | 避免使用 (会改变原始数组)     | 推荐使用 (会返回一个新数组）                                 |
| -------- | ----------------------------- | ------------------------------------------------------------ |
| 添加元素 | `push`，`unshift`             | `concat`，`[...arr]` 展开语法（[例子](https://react.docschina.org/learn/updating-arrays-in-state#adding-to-an-array)） |
| 删除元素 | `pop`，`shift`，`splice`      | `filter`，`slice`（[例子](https://react.docschina.org/learn/updating-arrays-in-state#removing-from-an-array)） |
| 替换元素 | `splice`，`arr[i] = ...` 赋值 | `map`（[例子](https://react.docschina.org/learn/updating-arrays-in-state#replacing-items-in-an-array)） |
| 排序     | `reverse`，`sort`             | 先将数组复制一份（[例子](https://react.docschina.org/learn/updating-arrays-in-state#making-other-changes-to-an-array)） |



如果元素是对象，则也需要把对象解构为新的对象，否则，新的列表元素只是对原对象的引用。





## 状态管理

### 选择 state 结构

#### 避免矛盾的 state

```react
// 单独设置增加了代码复杂性
// let isLoading = false;
// let isSent = false;

// 可以设置为一个状态
const [status, setStatus] = useState('');
setStatus('loading'); 

// 也可以扩展为
const isLoading = status == 'loading'; // 因为每次渲染后，该行都会被重新执行
const isSent = status == 'sent';
```



#### 避免冗余的 state

```react
import { useState } from 'react';

export default function Form() {
	const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    
    // const [fullName, setFullName] = useState(''); // 这样就多此一举
    const fullName = firstName + ' ' + lastName;
    
    // ...
    
}
```

每当 state 值改变，都将重新渲染，即函数将重新执行，`fullName` 每次都能正确得到其值。



#### 避免深度嵌套的 state



### 组件间共享 state

将 state 设置在他们共同的父组件中。



### state 重置 和 保存

- 只要在相同位置渲染的是相同组件， React 就会保留状态。
- state 不会被保存在 JSX 标签里。它与你在树中放置该 JSX 的位置相关联。
- 可以通过为一个子树指定一个不同的 key 来重置它的 state。
- 不要嵌套组件的定义，否则你会意外地导致 state 被重置。



### Reducer

- 为什么叫 Reducer？实际上是以数组上的 [`reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 方法命名的。

- 就是一个单独管理 state 的函数。

  - 如：要对 state （如 [{}, {}, … ] 进行增、删、改查，那就可以单独写一份函数。

- `useReducer` 钩子接受 2 个参数：

  1. 一个 reducer 函数
  2. 一个初始的 state

  它返回如下内容：

  1. 一个有状态的值
  2. 一个 dispatch 函数（用来 “派发” 用户操作给 reducer）

```react
import { useReducer } from 'react';

// 如 tasks 是 state
// 第 1 个参数：该参数根据实际情况而定，同时也是 useReducer(tasksducer, 参数位置)
// 第 2 个参数：action 是在被调用时所需要的参数，即 dispatch(action)
function tasksducer(tasks, action) {
  //  action 是在被调用时所需要的参数，即 dispatch(action)
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          // ...
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
          // ...
      });
    }
    case 'deleted': {
      return tasks.filter((t) => {
          // ... 
      });
    }
    default: {
      throw Error('未知 action: ' + action.type);
    }
  }
}

// 逻辑上：tasks.reduce(tasksReducer, []);

export default Test() {
    const [tasks, setTasks] = useState(initialTasks);
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
}
```



#### 编写一个好的 reducers

- **reducers 必须是纯粹的。** 这一点和 [状态更新函数](https://react.docschina.org/learn/queueing-a-series-of-state-updates) 是相似的，`reducers` 在是在渲染时运行的！（actions 会排队直到下一次渲染)。 这就意味着 `reducers` [必须纯净](https://react.docschina.org/learn/keeping-components-pure)，即当输入相同时，输出也是相同的。它们不应该包含异步请求、定时器或者任何副作用（对组件外部有影响的操作）。它们应该以不可变值的方式去更新 [对象](https://react.docschina.org/learn/updating-objects-in-state) 和 [数组](https://react.docschina.org/learn/updating-arrays-in-state)。
- **每个 action 都描述了一个单一的用户交互，即使它会引发数据的多个变化。** 举个例子，如果用户在一个由 `reducer` 管理的表单（包含五个表单项）中点击了 `重置按钮`，那么 dispatch 一个 `reset_form` 的 action 比 dispatch 五个单独的 `set_field` 的 action 更加合理。如果你在一个 `reducer` 中打印了所有的 `action` 日志，那么这个日志应该是很清晰的，它能让你以某种步骤复现已发生的交互或响应。这对代码调试很有帮助！



#### state 对比 reducers

`useReducer()` 给了 state 多一些可能，起码 dispath 的自定义程度很高。



#### 使用 Immer 简化 reducers

- 注意 reducer 的写法。

与在平常的 state 中 [修改对象](https://react.docschina.org/learn/updating-objects-in-state#write-concise-update-logic-with-immer) 和 [数组](https://react.docschina.org/learn/updating-arrays-in-state#write-concise-update-logic-with-immer) 一样，你可以使用 `Immer` 这个库来简化 `reducer`。在这里，[`useImmerReducer`](https://github.com/immerjs/use-immer#useimmerreducer) 让你可以通过 `push` 或 `arr[i] =` 来修改 state 。

```react
import { useImmerReducer } from 'use-immer';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

function tasksReducer(draft, action) {
  switch (action.type) {
    case 'added': {
      draft.push({
        id: action.id,
        text: action.text,
        done: false,
      });
      break;
    }
    case 'changed': {
      const index = draft.findIndex((t) => t.id === action.task.id);
      draft[index] = action.task;
      break;
    }
    case 'deleted': {
      return draft.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('未知 action：' + action.type);
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: '参观卡夫卡博物馆', done: true},
  {id: 1, text: '看木偶戏', done: false},
  {id: 2, text: '打卡列侬墙', done: false},
];

```



### 使用 Context 深层传递参数

#### Context：传递 props 的另一种方法

可以穿透中间件

`LevelContext.js`：

```react
import { createContext } from 'react';

export const LevelContext = createContext(1);
```

`Section.js` ：

```react
import { LevelContext } from './LevelContext.js';

// Section 把它的子元素包在 <LevelContext.Provider value={level}> 里面。
// 这个例子中，Heading 件使用 useContext(LevelContext) 获得该层的 LevelContext 提供的值。
export default function Section({ level, children }) {
  return (
    <section className="section">
      <LevelContext.Provider value={level}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}

```

`Heading.js`：

```react
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('未知的 level：' + level);
  }
}
```

`App.js`

```react
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section level={1}>
      <Heading>主标题</Heading>
      <Section level={2}>
        <Heading>副标题</Heading>
        <Section level={3}>
          <Heading>子标题</Heading>
          <Section level={4}>
            <Heading>子子标题</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```



#### 不要过度使用 Context

在使用 context 之前，你可以考虑以下几种替代方案：

1. **从 [传递 props](https://react.docschina.org/learn/passing-props-to-a-component) 开始。** 如果你的组件看起来不起眼，那么通过十几个组件向下传递一堆 props 并不罕见。这有点像是在埋头苦干，但是这样做可以让哪些组件用了哪些数据变得十分清晰！维护你代码的人会很高兴你用 props 让数据流变得更加清晰。
2. **抽象组件并 [将 JSX 作为 `children` 传递](https://react.docschina.org/learn/passing-props-to-a-component#passing-jsx-as-children) 给它们。** 如果你通过很多层不使用该数据的中间组件（并且只会向下传递）来传递数据，这通常意味着你在此过程中忘记了抽象组件。举个例子，你可能想传递一些像 `posts` 的数据 props 到不会直接使用这个参数的组件，类似 `<Layout posts={posts} />`。取而代之的是，让 `Layout` 把 `children` 当做一个参数，然后渲染 `<Layout><Posts posts={posts} /></Layout>`。这样就减少了定义数据的组件和使用数据的组件之间的层级。

如果这两种方法都不适合你，再考虑使用 context。



#### Context 的使用场景

- **主题：** 如果你的应用允许用户更改其外观（例如暗夜模式），你可以在应用顶层放一个 context provider，并在需要调整其外观的组件中使用该 context。
- **当前账户：** 许多组件可能需要知道当前登录的用户信息。将它放到 context 中可以方便地在树中的任何位置读取它。某些应用还允许你同时操作多个账户（例如，以不同用户的身份发表评论）。在这些情况下，将 UI 的一部分包裹到具有不同账户数据的 provider 中会很方便。
- **路由：** 大多数路由解决方案在其内部使用 context 来保存当前路由。这就是每个链接“知道”它是否处于活动状态的方式。如果你创建自己的路由库，你可能也会这么做。
- **状态管理：** 随着你的应用的增长，最终在靠近应用顶部的位置可能会有很多 state。许多遥远的下层组件可能想要修改它们。通常 [将 reducer 与 context 搭配使用](https://react.docschina.org/learn/scaling-up-with-reducer-and-context)来管理复杂的状态并将其传递给深层的组件来避免过多的麻烦。

Context 不局限于静态值。如果你在下一次渲染时传递不同的值，React 将会更新读取它的所有下层组件！这就是 context 经常和 state 结合使用的原因。



#### 使用 Reducer 和 Context

[Scaling Up with Reducer and Context](https://react.docschina.org/learn/scaling-up-with-reducer-and-context)



## 应急方案

### useRef

以下是这些罕见情况中的几个：

- 存储 [timeout ID](https://developer.mozilla.org/docs/Web/API/setTimeout)
- 存储和操作 [DOM 元素](https://developer.mozilla.org/docs/Web/API/Element)
- 存储不需要被用来计算 JSX 的其他对象。

如果你的组件需要存储一些值，但不影响渲染逻辑，请选择 ref。



### ref 操作 dom

```react
import { useRef } from 'react';

const myRef = useRef(null);

<div ref={myRef}></div>

// dom 节点创建时，该节点的引用会放入 myref.current
myRef.current.scrollIntoView();
```



获取自己的组件时，需要 forwardRef 声明：

```react
import { forwardRef, useRef } from 'react';

const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});
```



在一些不常见的情况下，你可能希望限制暴露的功能。你可以用 `useImperativeHandle` 做到这一点：

```react
import {
  forwardRef, 
  useRef, 
  useImperativeHandle
} from 'react';

const MyInput = forwardRef((props, ref) => {
  const realInputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    // 只暴露 focus，没有别的
    focus() {
      realInputRef.current.focus();
    },
  }));
  return <input {...props} ref={realInputRef} />;
});

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        聚焦输入框
      </button>
    </>
  );
}

```



在 React 中，每次更新都分为 [两个阶段](https://react.docschina.org/learn/render-and-commit#step-3-react-commits-changes-to-the-dom)：

- 在 **渲染** 阶段， React 调用你的组件来确定屏幕上应该显示什么。
- 在 **提交** 阶段， React 把变更应用于 DOM。

React 在提交阶段设置 `ref.current`。在更新 DOM 之前，React 将受影响的 `ref.current` 值设置为 `null`。更新 DOM 后，React 立即将它们设置到相应的 DOM 节点。



如果想要设置完 state 之后马上获得 dom，可以使用 `flushSync` 强制更新 dom：

```react
flushSync(() => {
  setTodos([ ...todos, newTodo]);
});
listRef.current.lastChild.scrollIntoView();
```



### useEffect

渲染后执行，也意味着不要在这里改变 state 的值，否则将导致死循环。

没有第二个参数，将在每次渲染后执行函数：

```react
useEffect(()=>{
  // ...
})
```

第二个参数为列表，元素为渲染后需要执行的依赖，依赖改变了才会执行。依赖项不是可选的，副作用函数中存在，即是依赖项：

```react
useEffect(()=>{
  // ...
}, [...])
```

第二个参数为 `[]` 空的数组，组件在挂载后执行副作用函数：

```react
useEffect(() => {
  // This runs only on mount (when the component appears)
    return ()=> {
      // 清理函数
    }
}, []);
```



### 关于 react 两次挂载组件

为了帮助开发者检查 bug。

例如，使用了 useEffect，可能有监听，卸载时应该清除的，但有时候会忽略掉清除操作。如果你有清除的好习惯，利用 useEffect 的返回值可以清除监听，react 将两次挂载：

1. 第一次挂载，开始监听，相当于给你一个测试环境；
2. 销毁，因为要进行第二次挂载，这时候将执行 useEffect 的返回值，你能够看到哪些被清除（如果设置了的话）；
3. 开始第二次挂载，实际效果应当是和第一次是相同的。该测试的测试了，你可以安心编码。

这样的效果也需要你在开发过程中，使用 useEffect(()=>{}, []) 这样组件挂载时执行时也应该做一些清理工作（重置一些状态），总之，多清理不必要的操作。

```react
useEffect(() => {
  let ignore = false;

  async function startFetching() {
    const json = await fetchTodos(userId);
    if (!ignore) {
      setTodos(json);
    }
  }

  startFetching();

  return () => {
    // 两次请求不避免，但第一次执行会被立即清理
    // 第二次执行时，因为下一行的代码， setTodos 不会被执行，也就不会影响状态
    ignore = true;
  };
}, [userId]);
```



> useMemo

