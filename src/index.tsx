import React from "react"
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

export default function redux_bracelet<数据定义, 事件定义 extends { [事件名称: string]: (...a: any[]) => any }>(
    布局生成器: (数据: 数据定义, 事件: 事件定义) => JSX.Element,
    初始数据: 数据定义,
    事件生成器: (获得数据: () => 数据定义, 设置数据: (新数据: 数据定义) => void) => 事件定义,
) {
    class 对象 {
        数据商店 = createStore<数据定义, { type: string, data: 数据定义 }, unknown, unknown>((旧数据: 数据定义 | undefined, action: { type: string, data: 数据定义 }): 数据定义 => {
            if (旧数据 == null) { return 初始数据 }
            if (action.type == '设置数据') { return action.data }
            return 旧数据
        })
        getState = this.数据商店.getState
        setState = (新数据: 数据定义) => this.数据商店.dispatch({ type: '设置数据', data: 新数据 })
        event = 事件生成器(() => this.getState(), (新数据: 数据定义) => this.setState(新数据))

        原始组件 = ({ 数据, 事件 }: { 数据: 数据定义, 事件: 事件定义 }) => 布局生成器(数据, 事件)
        组件 = connect(
            (商店数据: 数据定义, 组件数据) => ({ 数据: 商店数据 }),
            (设置数据, 组件数据) => ({
                事件: Object.keys(this.event)
                    .map(a => ({ [a]: (...r: any[]) => this.event[a](...r) }))
                    .reduce((s, a) => ({ ...s, ...a }), {}) as 事件定义
            }),
        )(this.原始组件)
        element = (p: { [P in keyof 数据定义]?: 数据定义[P] }) => {
            this.setState({ ...this.getState(), ...p })
            return <Provider store={this.数据商店}><this.组件 /></Provider>
        }
    }

    var r: {
        getState: () => 数据定义,
        setState: (新数据: 数据定义) => void,
        event: 事件定义,
        element: (p: { [P in keyof 数据定义]?: 数据定义[P] }) => JSX.Element
    } = new 对象()

    return r
}
