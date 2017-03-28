'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _os = require('./os');

var _os2 = _interopRequireDefault(_os);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _version = require('./version');

var _version2 = _interopRequireDefault(_version);

var _browser = require('./browser');

var _browser2 = _interopRequireDefault(_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function plugin(Vue) {
    var env = {
        os: _os2.default,
        app: _app2.default,
        browser: _browser2.default,
        Version: _version2.default
    };

    Vue.env = env;
    Vue.prototype.$env = env;
}

exports.default = plugin;