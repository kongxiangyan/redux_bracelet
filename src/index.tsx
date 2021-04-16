import React from "react"
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

export default function redux_bracelet<数据定义, 事件定义>(
    布局生成器: (数据: 数据定义, 事件: 事件定义) => JSX.Element,
    初始数据: 数据定义,
    事件生成器: (获得数据: () => 数据定义, 设置数据: (新数据: 数据定义) => void) => 事件定义,
) {
    var 当数据修改: ((获得数据: () => 数据定义, 设置数据: (新数据: 数据定义) => void) => void) | null = null

    var 数据商店 = createStore<数据定义, { type: string, data: 数据定义 }, unknown, unknown>((旧数据: 数据定义 | undefined, action: { type: string, data: 数据定义 }): 数据定义 => {
        if (旧数据 == null) { return 初始数据 }
        if (action.type == '设置数据') { return action.data }
        return 旧数据
    })
    var 获得数据 = 数据商店.getState
    var 设置数据 = (新数据: 数据定义) => {
        数据商店.dispatch({ type: '设置数据', data: 新数据 })
        if (当数据修改) { 当数据修改(获得数据, 设置数据) }
    }
    var 事件 = 事件生成器(获得数据, 设置数据)

    var 原始组件 = ({ 数据, 事件 }: { 数据: 数据定义, 事件: 事件定义 }) => 布局生成器(数据, 事件)
    var 组件 = connect(
        (商店数据: 数据定义, 组件数据) => ({ 数据: 商店数据 }),
        (设置数据, 组件数据) => ({ 事件: 事件 }),
    )(原始组件)

    return {
        getState: 获得数据,
        setState: 设置数据,
        event: 事件,
        element: (p: { [P in keyof 数据定义]?: 数据定义[P] }) => {
            设置数据({ ...获得数据(), ...p })
            return <Provider store={数据商店}><组件 /></Provider>
        },
        onChange: (回调: (获得数据: () => 数据定义, 设置数据: (新数据: 数据定义) => void) => void) => {
            当数据修改 = 回调
        }
    }
}
