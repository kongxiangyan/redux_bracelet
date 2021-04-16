"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
function redux_bracelet(布局生成器, 初始数据, 事件生成器, 当数据修改) {
    var 数据商店 = redux_1.createStore(function (旧数据, action) {
        if (旧数据 == null) {
            return 初始数据;
        }
        if (action.type == '设置数据') {
            return action.data;
        }
        return 旧数据;
    });
    var 获得数据 = 数据商店.getState;
    var 设置数据 = function (新数据) {
        数据商店.dispatch({ type: '设置数据', data: 新数据 });
        if (当数据修改) {
            当数据修改(获得数据, 设置数据);
        }
    };
    var 事件 = 事件生成器(获得数据, 设置数据);
    var 原始组件 = function (_a) {
        var 数据 = _a.数据, 事件 = _a.事件;
        return 布局生成器(数据, 事件);
    };
    var 组件 = react_redux_1.connect(function (商店数据, 组件数据) { return ({ 数据: 商店数据 }); }, function (设置数据, 组件数据) { return ({ 事件: 事件 }); })(原始组件);
    return {
        getState: 获得数据,
        setState: 设置数据,
        event: 事件,
        element: function (p) {
            设置数据(__assign(__assign({}, 获得数据()), p));
            return react_1.default.createElement(react_redux_1.Provider, { store: 数据商店 },
                react_1.default.createElement(组件, null));
        }
    };
}
exports.default = redux_bracelet;
//# sourceMappingURL=index.js.map