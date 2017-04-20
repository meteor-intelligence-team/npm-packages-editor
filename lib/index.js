'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wysiwyg = require('./node_modules/components/wysiwyg');

Object.defineProperty(exports, 'Wysiwyg', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_wysiwyg).default;
  }
});
Object.defineProperty(exports, 'colors', {
  enumerable: true,
  get: function get() {
    return _wysiwyg.colors;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }