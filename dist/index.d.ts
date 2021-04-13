/// <reference types="react" />
export default function redux_bracelet<数据定义, 事件定义>(布局生成器: (数据: 数据定义, 事件: 事件定义) => JSX.Element, 初始数据: 数据定义, 事件生成器: (获得数据: () => 数据定义, 设置数据: (新数据: 数据定义) => void) => 事件定义): {
    store: import("redux").Store<数据定义, {
        type: string;
        data: 数据定义;
    }>;
    getState: () => 数据定义;
    setState: (新数据: 数据定义) => {
        type: string;
        data: 数据定义;
    };
    event: 事件定义;
    element: () => JSX.Element;
};
