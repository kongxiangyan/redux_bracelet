# redux_bracelet

## 示例

一个简单的list示例:

效果在[这里](https://lsby.github.io/redux_bracelet/demo/demo_01.html)

代码在[这里](https://github.com/lsby/redux_bracelet/blob/main/demo/demo_01.html)

## 安装

```shell
npm i @lsby/redux_bracelet
```

## 概念介绍

一个组件由三个部分组成:

- 布局
- 数据
- 事件

布局是jsx, 数据和事件嵌入其中.

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

`事件生成器`是一个高阶函数, 它的参数是`(getDate, setDate)`, 返回事件的对象.

其中, `getDate`用来获取组件内数据, `setDate`用来设置组件内数据.

这是一个例子:

```js
function event(getDate, setDate) {
    return {
        fun() {
            var data = getDate()
            setDate({ n: data.n + 1, list: [...data.list, data.n] })
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

最后, 将他们传入`redux_bracelet`函数并渲染:

```js
var obj = redux_bracelet(layout, data, event)
ReactDOM.render(<obj.element />, document.getElementById("app"))
```

效果在[这里](https://lsby.github.io/redux_bracelet/demo/demo_00.html)

代码在[这里](https://github.com/lsby/redux_bracelet/blob/main/demo/demo_00.html)

## 注入

`obj.element`不可以传入属性, 但就像JSX组件, 你可以写`children`, 例如:

```js
<obj.element>
    <h1>你好<h1>
</obj.element>
```

之后你就可以在布局生成器中使用`data.children`使用它.

效果在[这里](https://lsby.github.io/redux_bracelet/demo/demo_02.html)

代码在[这里](https://github.com/lsby/redux_bracelet/blob/main/demo/demo_02.html)

## 订阅

`redux_bracelet`还可以有第四个参数, 是一个函数, 当数据变化时, 这个函数会被执行.

效果在[这里](https://lsby.github.io/redux_bracelet/demo/demo_03.html)

代码在[这里](https://github.com/lsby/redux_bracelet/blob/main/demo/demo_03.html)

## API

`redux_bracelet`的参数是:

- 布局生成器: (数据, 事件) => JSX.Element
- 初始数据: 数据定义
- 事件生成器: (获得数据, 设置数据) => 事件定义
- 当数据修改?: (获得数据, 设置数据) => void

`redux_bracelet`的返回值是:

- getState: 获得组件内数据的函数
- setState: 设置组件内数据的函数
- event: 事件生成器生成的事件对象
- element: 组件的JSX元素

使用这些返回值在组件外调用组件内的事件, 修改元素的数据, 做任何你想做的事.

你可以只使用一个`redux_bracelet`构造一个页面.

你也可以使用`redux_bracelet`创建多个组件, 再用你喜欢的方式将它们关联起来.
