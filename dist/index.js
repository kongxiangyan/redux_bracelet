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
function redux_bracelet(布局生成器, 初始数据, 事件生成器) {
    var 对象 = /** @class */ (function () {
        function 对象() {
            var _this = this;
            this.数据商店 = redux_1.createStore(function (旧数据, action) {
                if (旧数据 == null) {
                    return 初始数据;
                }
                if (action.type == '设置数据') {
                    return action.data;
                }
                return 旧数据;
            });
            this.getState = this.数据商店.getState;
            this.setState = function (新数据) { return _this.数据商店.dispatch({ type: '设置数据', data: 新数据 }); };
            this.event = 事件生成器(function () { return _this.getState(); }, function (新数据) { return _this.setState(新数据); });
            this.原始组件 = function (_a) {
                var 数据 = _a.数据, 事件 = _a.事件;
                return 布局生成器(数据, 事件);
            };
            this.组件 = react_redux_1.connect(function (商店数据, 组件数据) { return ({ 数据: 商店数据 }); }, function (设置数据, 组件数据) { return ({
                事件: Object.keys(_this.event)
                    .map(function (a) {
                    var _a;
                    return (_a = {}, _a[a] = function () {
                        var _a;
                        var r = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            r[_i] = arguments[_i];
                        }
                        return (_a = _this.event)[a].apply(_a, r);
                    }, _a);
                })
                    .reduce(function (s, a) { return (__assign(__assign({}, s), a)); }, {})
            }); })(this.原始组件);
            this.element = function (p) {
                _this.setState(__assign(__assign({}, _this.getState()), p));
                return react_1.default.createElement(react_redux_1.Provider, { store: _this.数据商店 },
                    react_1.default.createElement(_this.组件, null));
            };
        }
        return 对象;
    }());
    var r = new 对象();
    return r;
}
exports.default = redux_bracelet;
//# sourceMappingURL=index.js.map