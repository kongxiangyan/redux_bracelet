/// <reference types="react" />
export default function redux_bracelet<数据定义, 事件定义>(布局生成器: (数据: 数据定义, 事件: 事件定义) => JSX.Element, 初始数据: 数据定义, 事件生成器: (获得数据: () => 数据定义, 设置数据: (新数据: 数据定义) => void) => 事件定义, 当数据修改?: (获得数据: () => 数据定义, 设置数据: (新数据: 数据定义) => void) => void): {
    getState: () => 数据定义;
    setState: (新数据: 数据定义) => void;
    event: 事件定义;
    element: (p: { [P in keyof 数据定义]?: 数据定义[P] | undefined; }) => JSX.Element;
};
