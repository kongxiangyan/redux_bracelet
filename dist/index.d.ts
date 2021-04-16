import React from "react";
interface 数据基类 {
    children?: React.ReactChild;
}
export default function redux_bracelet<数据定义 extends 数据基类, 事件定义>(布局生成器: (数据: 数据定义, 事件: 事件定义) => JSX.Element, 初始数据: 数据定义, 事件生成器: (获得数据: () => 数据定义, 设置数据: (新数据: 数据定义) => void) => 事件定义, 当数据修改?: (获得数据: () => 数据定义, 设置数据: (新数据: 数据定义) => void) => void): {
    getState: () => 数据定义;
    setState: (新数据: 数据定义) => void;
    event: 事件定义;
    element: (p: {
        children?: React.ReactChild;
    }) => JSX.Element;
};
export {};
