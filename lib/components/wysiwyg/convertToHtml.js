'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConvertToHTML = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _draftJs = require('draft-js');

var _draftJsExportHtml = require('draft-js-export-html');

require('./wysiwyg.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colorStyleMap = {
  inlineStyles: {
    RED: { style: { color: 'rgba(255, 0, 0, 1.0)' } },
    ORANGE: { style: { color: 'rgba(255, 127, 0, 1.0)' } },
    YELLOW: { style: { color: 'rgba(180, 180, 0, 1.0)' } },
    GREEN: { style: { color: 'rgba(0, 180, 0, 1.0)' } },
    BLUE: { style: { color: 'rgba(0, 0, 255, 1.0)' } },
    GREY: { style: { color: 'rgba(167, 167, 167, 1.0)' } }
  }
};

var ConvertToHTML = exports.ConvertToHTML = function ConvertToHTML(_ref) {
  var html = _ref.html,
      className = _ref.className;
  return _react2.default.createElement('div', {
    className: className ? "wysiwyg-result " + className : "wysiwyg-result",
    dangerouslySetInnerHTML: html ? { __html: (0, _draftJsExportHtml.stateToHTML)((0, _draftJs.convertFromRaw)(html), colorStyleMap) } : null });
};