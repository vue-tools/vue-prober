'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Version = function () {
    function Version(v) {
        (0, _classCallCheck3.default)(this, Version);

        if (v) {
            this.val = v.toString();
        } else {
            this.val = '';
        }
    }

    (0, _createClass3.default)(Version, [{
        key: 'gt',
        value: function gt(v) {
            return Version.compare(this, v) > 0;
        }
    }, {
        key: 'gte',
        value: function gte(v) {
            return Version.compare(this, v) >= 0;
        }
    }, {
        key: 'lt',
        value: function lt(v) {
            return Version.compare(this, v) < 0;
        }
    }, {
        key: 'lte',
        value: function lte(v) {
            return Version.compare(this, v) <= 0;
        }
    }, {
        key: 'eq',
        value: function eq(v) {
            return Version.compare(this, v) === 0;
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.val.toString();
        }
    }], [{
        key: 'compare',
        value: function compare(v1, v2) {
            v1 = v1.toString().split('.');
            v2 = v2.toString().split('.');

            for (var i = 0; i < v1.length || i < v2.length; i++) {
                var n1 = parseInt(v1[i], 10);
                var n2 = parseInt(v2[i], 10);

                if (isNaN(n1)) {
                    n1 = 0;
                }

                if (isNaN(n2)) {
                    n2 = 0;
                }

                if (n1 < n2) {
                    return -1;
                } else if (n1 > n2) {
                    return 1;
                }
            }

            return 0;
        }
    }]);
    return Version;
}();

exports.default = Version;