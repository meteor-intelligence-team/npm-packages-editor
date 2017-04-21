'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wysiwyg = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _draftJs = require('draft-js');

var _draftJsExportHtml = require('draft-js-export-html');

require('semantic-ui-css/semantic.min.css');

require('./wysiwyg.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var colorStyleMap = {
  RED: { color: 'rgba(255, 0, 0, 1.0)' },
  ORANGE: { color: 'rgba(255, 127, 0, 1.0)' },
  YELLOW: { color: 'rgba(180, 180, 0, 1.0)' },
  GREEN: { color: 'rgba(0, 180, 0, 1.0)' },
  BLUE: { color: 'rgba(0, 0, 255, 1.0)' },
  GREY: { color: 'rgba(167, 167, 167, 1.0)' }
};

var COLORS = [{ label: 'Red', style: 'RED', icon: "ui red stop icon" }, { label: 'Orange', style: 'ORANGE', icon: "ui orange stop icon" }, { label: 'Yellow', style: 'YELLOW', icon: "ui yellow stop icon" }, { label: 'Green', style: 'GREEN', icon: "ui green stop icon" }, { label: 'Blue', style: 'BLUE', icon: "ui blue stop icon" }, { label: 'Grey', style: 'GREY', icon: "ui grey stop icon" }];

var Wysiwyg = exports.Wysiwyg = function (_Component) {
  _inherits(Wysiwyg, _Component);

  function Wysiwyg(props) {
    _classCallCheck(this, Wysiwyg);

    var _this = _possibleConstructorReturn(this, (Wysiwyg.__proto__ || Object.getPrototypeOf(Wysiwyg)).call(this, props));

    _this.state = { editorState: _this.props.value ? _draftJs.EditorState.createWithContent((0, _draftJs.convertFromRaw)(_this.props.value)) : _draftJs.EditorState.createEmpty() };

    _this.focus = function () {
      return _this.refs.editor.focus();
    };
    _this.onChange = function (editorState) {
      _this.setState({ editorState: editorState });
      var content = (0, _draftJs.convertToRaw)(editorState.getCurrentContent());
      _this.props.onChange(content);
    };

    _this.handleKeyCommand = function (command) {
      return _this._handleKeyCommand(command);
    };
    _this.onTab = function (e) {
      return _this._onTab(e);
    };
    _this.toggleBlockType = function (type) {
      return _this._toggleBlockType(type);
    };
    _this.toggleInlineStyle = function (style) {
      return _this._toggleInlineStyle(style);
    };
    _this.toggleColor = function (style) {
      return _this._toggleColor(style);
    };
    return _this;
  }

  _createClass(Wysiwyg, [{
    key: '_handleKeyCommand',
    value: function _handleKeyCommand(command) {
      var editorState = this.state.editorState;

      var newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.onChange(newState);
        return true;
      }
      return false;
    }
  }, {
    key: '_onTab',
    value: function _onTab(e) {
      var maxDepth = 4;
      this.onChange(_draftJs.RichUtils.onTab(e, this.state.editorState, maxDepth));
    }
  }, {
    key: '_toggleBlockType',
    value: function _toggleBlockType(blockType) {
      this.onChange(_draftJs.RichUtils.toggleBlockType(this.state.editorState, blockType));
    }
  }, {
    key: '_toggleInlineStyle',
    value: function _toggleInlineStyle(inlineStyle) {
      this.onChange(_draftJs.RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
    }
  }, {
    key: '_toggleColor',
    value: function _toggleColor(toggledColor) {
      var editorState = this.state.editorState;

      var selection = editorState.getSelection();

      // Let's just allow one color at a time. Turn off all active colors.
      var nextContentState = Object.keys(colorStyleMap).reduce(function (contentState, color) {
        return _draftJs.Modifier.removeInlineStyle(contentState, selection, color);
      }, editorState.getCurrentContent());

      var nextEditorState = _draftJs.EditorState.push(editorState, nextContentState, 'change-inline-style');

      var currentStyle = editorState.getCurrentInlineStyle();

      // Unset style override for current color.
      if (selection.isCollapsed()) {
        nextEditorState = currentStyle.reduce(function (state, color) {
          return _draftJs.RichUtils.toggleInlineStyle(state, color);
        }, nextEditorState);
      }

      // If the color is being toggled on, apply it.
      if (!currentStyle.has(toggledColor)) {
        nextEditorState = _draftJs.RichUtils.toggleInlineStyle(nextEditorState, toggledColor);
      }

      this.onChange(nextEditorState);
    }
  }, {
    key: 'currentInlineStyles',
    value: function currentInlineStyles() {
      var styles = [];
      if (this.props.bold !== false) {
        styles.push({ label: 'Bold', style: 'BOLD', icon: "ui bold icon" });
      }
      if (this.props.underline !== false) {
        styles.push({ label: 'Underline', style: 'UNDERLINE', icon: "ui underline icon" });
      }
      if (this.props.italic !== false) {
        styles.push({ label: 'Italic', style: 'ITALIC', icon: "ui italic icon" });
      }
      return styles;
    }
  }, {
    key: 'currentBlockTypes',
    value: function currentBlockTypes() {
      var types = [];
      if (this.props.h1 !== false) {
        types.push({ label: 'H1', style: 'header-one', icon: null });
      }
      if (this.props.h2 !== false) {
        types.push({ label: 'H2', style: 'header-two', icon: null });
      }
      if (this.props.h3 !== false) {
        types.push({ label: 'H3', style: 'header-three', icon: null });
      }
      if (this.props.h4 !== false) {
        types.push({ label: 'H4', style: 'header-four', icon: null });
      }
      if (this.props.h5 !== false) {
        types.push({ label: 'H5', style: 'header-five', icon: null });
      }
      if (this.props.h6 !== false) {
        types.push({ label: 'H6', style: 'header-six', icon: null });
      }
      if (this.props.blockQuote !== false) {
        types.push({ label: 'Blockquote', style: 'blockquote', icon: "ui left quote icon" });
      }
      if (this.props.list !== false) {
        types.push({ label: 'UL', style: 'unordered-list-item', icon: "ui unordered list icon" });
      }
      if (this.props.numberedList !== false) {
        types.push({ label: 'OL', style: 'ordered-list-item', icon: "ui ordered list icon" });
      }
      if (this.props.code !== false) {
        types.push({ label: 'Code Block', style: 'code-block', icon: "code icon" });
      }
      return types;
    }
  }, {
    key: 'render',
    value: function render() {
      var editorState = this.state.editorState;

      // If the user changes block type before entering any text, we can
      // either style the placeholder or hide it. Let's just hide it now.

      var className = 'RichEditor-editor';
      var contentState = editorState.getCurrentContent();
      if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
          className += ' RichEditor-hidePlaceholder';
        }
      }

      return _react2.default.createElement(
        'div',
        { className: 'RichEditor-root' },
        _react2.default.createElement(
          'div',
          { className: 'toolbar' },
          _react2.default.createElement(BlockStyleControls, {
            blockTypes: this.currentBlockTypes(),
            editorState: editorState,
            onToggle: this.toggleBlockType
          }),
          _react2.default.createElement(InlineStyleControls, {
            inlineStyles: this.currentInlineStyles(),
            editorState: editorState,
            onToggle: this.toggleInlineStyle
          }),
          _react2.default.createElement(ColorControls, {
            editorState: editorState,
            onToggle: this.toggleColor
          })
        ),
        _react2.default.createElement(
          'div',
          { className: className, onClick: this.focus },
          _react2.default.createElement(_draftJs.Editor, {
            blockStyleFn: getBlockStyle,
            customStyleMap: colorStyleMap,
            editorState: editorState,
            handleKeyCommand: this.handleKeyCommand,
            onChange: this.onChange,
            onTab: this.onTab,
            ref: 'editor',
            spellCheck: true
          })
        )
      );
    }
  }]);

  return Wysiwyg;
}(_react.Component);

// Custom overrides for "code" style.


var styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

var StyleButton = function (_React$Component) {
  _inherits(StyleButton, _React$Component);

  function StyleButton(props) {
    _classCallCheck(this, StyleButton);

    var _this2 = _possibleConstructorReturn(this, (StyleButton.__proto__ || Object.getPrototypeOf(StyleButton)).call(this, props));

    _this2.onToggle = function (e) {
      e.preventDefault();
      _this2.props.onToggle(_this2.props.style);
    };
    return _this2;
  }

  _createClass(StyleButton, [{
    key: 'render',
    value: function render() {
      var className = 'ui basic mini icon button';
      if (this.props.active) {
        className = 'ui blue active mini icon button';
      }

      return _react2.default.createElement(
        'span',
        { className: className, onMouseDown: this.onToggle },
        this.props.icon ? _react2.default.createElement('i', { className: this.props.icon }) : this.props.label
      );
    }
  }]);

  return StyleButton;
}(_react2.default.Component);

var BlockStyleControls = function BlockStyleControls(props) {
  var BLOCK_TYPES = props.blockTypes;
  var editorState = props.editorState;

  var selection = editorState.getSelection();
  var blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

  return _react2.default.createElement(
    'div',
    { className: 'RichEditor-controls ui mini basic icon buttons' },
    BLOCK_TYPES.map(function (type) {
      return _react2.default.createElement(StyleButton, {
        className: 'ui basic button',
        key: type.label,
        active: type.style === blockType,
        label: type.label,
        onToggle: props.onToggle,
        style: type.style,
        icon: type.icon
      });
    })
  );
};

var InlineStyleControls = function InlineStyleControls(props) {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  var INLINE_STYLES = props.inlineStyles;
  return _react2.default.createElement(
    'div',
    { className: 'RichEditor-controls ui mini basic icon buttons' },
    INLINE_STYLES.map(function (type) {
      return _react2.default.createElement(StyleButton, {
        key: type.label,
        active: currentStyle.has(type.style),
        label: type.label,
        onToggle: props.onToggle,
        style: type.style,
        icon: type.icon
      });
    })
  );
};

var ColorControls = function ColorControls(props) {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return _react2.default.createElement(
    'div',
    { className: 'RichEditor-controls ui mini basic icon buttons' },
    COLORS.map(function (type) {
      return _react2.default.createElement(StyleButton, {
        key: type.label,
        active: currentStyle.has(type.style),
        label: type.label,
        onToggle: props.onToggle,
        style: type.style,
        icon: type.icon
      });
    })
  );
};

// This object provides the styling information for our custom color
// styles.