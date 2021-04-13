# redux_bracelet

## 示例

[示例](https://lsby.github.io/redux_bracelet/demo/demo_01.html)

[示例源码](https://github.com/lsby/redux_bracelet/blob/main/demo/demo_01.html)

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

完整效果在[这里](https://lsby.github.io/redux_bracelet/demo/demo_00.html)

完整源码在[这里](https://github.com/lsby/redux_bracelet/blob/main/demo/demo_00.html)

## API

`redux_bracelet`的返回值有:

- store: redux 的 store
- getState: 获得组件内数据的函数
- setState: 设置组件内数据的函数
- event: 事件生成器生成的事件对象
- element: 用于渲染的JSX元素

使用这些返回值, 也可以在组件外修改元素的数据, 组件也会重新渲染.

你可以只使用一个`redux_bracelet`构造一个页面.

你也可以使用`redux_bracelet`创建多个组件, 再用你喜欢的方式将它们关联起来.
