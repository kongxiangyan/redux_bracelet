# redux_bracelet

一个 react + redux 封装

## 为什么

不喜欢 react, redux 的各种设定. 感觉过于复杂了.

但又想用到各种为 react 写的 ui 库.

于是封装了一下, 使用非常简单, 模块由 布局-数据-事件 组成.

模块内, 可以绑定事件, 事件可以修改数据.

模块外, 也可以随意的调用模块内的事件, 访问和修改数据.

得益于 redux, 数据修改后 ui 会被重新渲染.

你可以直接使用它构造一个大页面, 也可以创建多个组件, 再用你喜欢的方式将对象关联起来, 实现各种设计模式.

## 安装

```shell
npm i @lsby/redux_bracelet
```

## 示例

一个简单的 list 示例:

效果在[这里](https://lsby.github.io/redux_bracelet/demo/demo_01.html)

代码在[这里](https://github.com/lsby/redux_bracelet/blob/main/demo/demo_01.html)

也可以用于 TypeScript, 有完整的类型系统:

代码在[这里](https://github.com/lsby/redux_bracelet_ts_demo)

## 使用

一个组件由三个部分组成:

- 布局
- 数据
- 事件

布局是 jsx, 数据和事件嵌入其中.

组件内部发生事件时, 事件可以修改数据, 组件便会重新渲染.

组件外部也可以调用事件或修改数据, 组件也会重新渲染.

### 数据

`数据`是一个普通的js对象.

这是一个例子:

```js
var data = {
    n:0,
    list: []
}
```

### 事件生成器

`事件生成器`是一个高阶函数, 它的参数是`(getData, setData)`, 返回事件的对象.

其中, `getData`用来获取组件内数据, `setData`用来设置组件内数据.

这是一个例子:

```js
function event(getData, setData) {
    return {
        fun() {
            var data = getData()
            setData({ n: data.n + 1, list: [...data.list, data.n] })
        }
    }
}
```

### 布局生成器

`布局生成器`是一个高阶函数, 它的参数是`(data, event)`, 返回JSX元素.

其中, 用`data`来引用组件内数据, 用`event`来引用组件内事件.

这是一个例子:

```js
function layout(data, event) {
    return <div>
        <div>
            <button onClick={event.fun}>button</button>
        </div>
        <div>
            <ul>
                {data.list.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
        </div>
    </div>
}
```

最后, 将他们传入`redux_bracelet`函数, 获得一个`redux_bracelet`对象:

```js
var obj = redux_bracelet(layout, data, event)
```

接下来, 你可以用这个对象的`element`来进行渲染.

```js
ReactDOM.render(<obj.element />, document.getElementById("app"))
```

也可以通过obj的其他属性来进行事件调用, 数据获取, 数据修改, 数据订阅.

效果在[这里](https://lsby.github.io/redux_bracelet/demo/demo_00.html)

代码在[这里](https://github.com/lsby/redux_bracelet/blob/main/demo/demo_00.html)

## 属性注入

`obj.element`可以传入属性, 也可以像 jsx 一样传入`children`, 例如:

```js
<obj.element s={'世界'}>
    <h1>你好<h1>
</obj.element>
```

之后你就可以在布局生成器中使用`data.s`和`data.children`了.

效果在[这里](https://lsby.github.io/redux_bracelet/demo/demo_02.html)

代码在[这里](https://github.com/lsby/redux_bracelet/blob/main/demo/demo_02.html)

## 事件订阅

`redux_bracelet`返回的对象中, 你可以访问到:

- 获取数据的`obj.getState`函数.
- 设置数据的`obj.setState`函数.
- 你自己写的事件函数, 在`obj.event`中.

你可以在组件外部调用这些函数来完成`获取数据`, `设置数据`, `事件触发`.

同时, 在组件内部, 也会调用这些方法以支撑组件内部逻辑.

这意味着, 你可以通过`函数劫持`挂上自己的钩子, 甚至控制组件内部的运行.

通过这个, 可以实现包括`数据订阅`, `事件订阅`的各种逻辑.

效果在[这里](https://lsby.github.io/redux_bracelet/demo/demo_03.html)

代码在[这里](https://github.com/lsby/redux_bracelet/blob/main/demo/demo_03.html)

## API

`redux_bracelet`的参数:

- 布局生成器: (数据, 事件) => JSX.Element
- 初始数据: 数据定义
- 事件生成器: (获得数据, 设置数据) => 事件定义

`redux_bracelet`的返回值:

- getState: 获得组件内数据的函数
- setState: 设置组件内数据的函数
- event: 事件生成器生成的事件对象
- element: 组件的 jsx 元素
