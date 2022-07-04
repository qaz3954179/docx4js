'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _document = require('../document');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function attr(node) {
	var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'w:val';

	return node ? node.attr(name) : undefined;
}

var Factory = function (_Base) {
	_inherits(Factory, _Base);

	function Factory() {
		_classCallCheck(this, Factory);

		return _possibleConstructorReturn(this, (Factory.__proto__ || Object.getPrototypeOf(Factory)).apply(this, arguments));
	}

	_createClass(Factory, [{
		key: 'create',
		value: function create(wXml, doc, parent, more) {
			var tag = wXml.localName,
			    swap;

			if ('document' == tag) return new (require('./model/document'))(wXml, doc, parent);else if ('styles' == tag) return new (require('./model/documentStyles'))(wXml, doc);else if ('abstractNum' == tag) return new (require('./model/style/numberingDefinition'))(wXml, doc);else if ('num' == tag) return new (require('./model/style/list'))(wXml, doc);else if ('style' == tag) {
				switch (wXml.attr('w:type')) {
					case 'paragraph':
						return new (require('./model/style/paragraph'))(wXml, doc);
					case 'character':
						return new (require('./model/style/inline'))(wXml, doc);
					case 'table':
						return new (require('./model/style/table'))(wXml, doc);
					case 'numbering':
						return new (require('./model/style/numbering'))(wXml, doc);
				}
			} else if ('docDefaults' == tag) return new (require('./model/style/document'))(wXml, doc);else if ('body' == tag) return new (require('./model/body'))(wXml, doc, parent);else if ('p' == tag) {
				var styleId = attr(wXml.$1('>pPr>pStyle'), 'w:val'),
				    style = doc.style.get(styleId);
				if (wXml.$1('>pPr>numPr') || style && style.getNumId() != -1) return new (require('./model/list'))(wXml, doc, parent);

				var outlineLvl = -1,
				    tmp = void 0;
				if (style) outlineLvl = style.getOutlineLevel();else if (tmp = wXml.$1('>pPr>outlineLvl')) {
					tmp = parseInt(attr(tmp));
					outlineLvl = parseInt(tmp);
				}

				if (outlineLvl != -1) return new (require('./model/heading'))(wXml, doc, parent, outlineLvl);

				return new (require('./model/paragraph'))(wXml, doc, parent);
			} else if ('r' == tag) {
				var _style = doc.style.get(attr(wXml.$1('>rPr>rStyle'), 'w:val'));

				var _outlineLvl = -1,
				    _tmp = void 0;
				if (_style) _outlineLvl = _style.getOutlineLevel();else if (_tmp = wXml.$1('>rPr>outlineLvl')) {
					_tmp = attr(_tmp);
					_outlineLvl = parseInt(_tmp);
				}

				if (_outlineLvl != -1) return new (require('./model/headingInline'))(wXml, doc, parent, _outlineLvl);

				if (wXml.childNodes.length == 1 || wXml.childNodes == 2 && wXml.firstChild.localName == 'rPr') {
					switch (wXml.lastChild.localName) {
						case 'fldChar':
						case 'instrText':
							return this.create(wXml.lastChild, doc, parent);
					}
				}

				return new (require('./model/inline'))(wXml, doc, parent);
			} else if ('instrText' == tag) return new (require('./model/fieldInstruct'))(wXml, doc, parent);else if ('t' == tag) return new (require('./model/text'))(wXml, doc, parent);else if ('sym' == tag && wXml.parentNode.localName == 'r') return new (require('./model/symbol'))(wXml, doc, parent);else if ('softHyphen' == tag && wXml.parentNode.localName == 'r') return new (require('./model/softHyphen'))(wXml, doc, parent);else if ('noBreakHyphen' == tag && wXml.parentNode.localName == 'r') return new (require('./model/noBreakHyphen'))(wXml, doc, parent);else if ('tab' == tag && wXml.parentNode.localName == 'r') return new (require('./model/tab'))(wXml, doc, parent);else if ('fldSimple' == tag) return new (require('./model/fieldSimple'))(wXml, doc, parent);else if ('fldChar' == tag) {
				switch (wXml.attr('w:fldCharType')) {
					case 'begin':
						return new (require('./model/fieldBegin'))(wXml, doc, parent);
						break;
					case 'end':
						return new (require('./model/fieldEnd'))(wXml, doc, parent);
						break;
					case 'separate':
						return new (require('./model/fieldSeparate'))(wXml, doc, parent);
						break;
				}
			} else if ('tbl' == tag) return new (require('./model/table'))(wXml, doc, parent);else if ('tr' == tag) return new (require('./model/row'))(wXml, doc, parent);else if ('tc' == tag) return new (require('./model/cell'))(wXml, doc, parent);else if ('br' == tag) return new (require('./model/br'))(wXml, doc, parent);else if ('hyperlink' == tag && 'p' == wXml.parentNode.localName) return new (require('./model/hyperlink'))(wXml, doc, parent);else if ('AlternateContent' == tag) return new (require('./model/drawingAnchor'))(wXml, doc, parent);else if ('wsp' == tag) return new (require('./model/shape'))(wXml, doc, parent);else if ('inline' == tag) {
				var type = wXml.$1('>graphic>graphicData').attr('uri').split('/').pop();
				switch (type) {
					case 'picture':
						return new (require('./model/image'))(wXml, doc, parent);
					case 'diagram':
						return new (require('./model/diagram'))(wXml, doc, parent);
					case 'chart':
						return new (require('./model/chart'))(wXml, doc, parent);
					default:
						console.error('inline ' + type + ' is not suppored yet.');
				}
			} else if ('sdt' == tag) {
				var elBinding = wXml.$1('>sdtPr>dataBinding');
				if (elBinding) {
					//properties
					var path = attr(elBinding, 'w:xpath'),
					    d = path.split(/[\/\:\[]/),
					    name = (d.pop(), d.pop());
					return new (require('./model/documentProperty'))(wXml, doc, parent, name);
				} else {
					//controls
					var elType = wXml.$1('>sdtPr').$1("text, picture, docPartList, comboBox, dropDownList, date, checkbox");
					tag = elType ? elType.localName : 'richtext';

					var control = this.createControl.apply(this, [tag].concat(Array.prototype.slice.call(arguments)));

					if (control) return control;
				}
			} else if ('bookmarkStart' == tag) return new (require('./model/bookmarkStart'))(wXml, doc, parent);else if ('bookmarkEnd' == tag) return new (require('./model/bookmarkEnd'))(wXml, doc, parent);else if ('oMath' == tag) return new (require('./model/equation'))(wXml, doc, parent);else if ('object' == tag) return new (require('./model/OLE'))(wXml, doc, parent);else if ('sectPr' == tag) return new (require('./model/section'))(wXml, doc, parent);

			return new _model2.default(wXml, doc, parent);
		}
	}, {
		key: 'createControl',
		value: function createControl(type, wXml, doc, parent) {
			if ('text' == type) return new (require('./model/control/text'))(wXml, doc, parent);else if ('picture' == type) return new (require('./model/control/picture'))(wXml, doc, parent);else if ('docPartList' == type) return new (require('./model/control/gallery'))(wXml, doc, parent);else if ('comboBox' == type) return new (require('./model/control/combobox'))(wXml, doc, parent);else if ('dropDownList' == type) return new (require('./model/control/dropdown'))(wXml, doc, parent);else if ('date' == type) return new (require('./model/control/date'))(wXml, doc, parent);else if ('checkbox' == type) return new (require('./model/control/checkbox'))(wXml, doc, parent);else if ('richtext' == type) return new (require('./model/control/richtext'))(wXml, doc, parent);
		}
	}]);

	return Factory;
}(_document.Factory);

exports.default = Factory;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJhdHRyIiwibm9kZSIsIm5hbWUiLCJ1bmRlZmluZWQiLCJGYWN0b3J5Iiwid1htbCIsImRvYyIsInBhcmVudCIsIm1vcmUiLCJ0YWciLCJsb2NhbE5hbWUiLCJzd2FwIiwicmVxdWlyZSIsInN0eWxlSWQiLCIkMSIsInN0eWxlIiwiZ2V0IiwiZ2V0TnVtSWQiLCJvdXRsaW5lTHZsIiwidG1wIiwiZ2V0T3V0bGluZUxldmVsIiwicGFyc2VJbnQiLCJjaGlsZE5vZGVzIiwibGVuZ3RoIiwiZmlyc3RDaGlsZCIsImxhc3RDaGlsZCIsImNyZWF0ZSIsInBhcmVudE5vZGUiLCJ0eXBlIiwic3BsaXQiLCJwb3AiLCJjb25zb2xlIiwiZXJyb3IiLCJlbEJpbmRpbmciLCJwYXRoIiwiZCIsImVsVHlwZSIsImNvbnRyb2wiLCJjcmVhdGVDb250cm9sIiwiYXJndW1lbnRzIiwiTW9kZWwiLCJCYXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxTQUFTQSxJQUFULENBQWNDLElBQWQsRUFBZ0M7QUFBQSxLQUFiQyxJQUFhLHVFQUFSLE9BQVE7O0FBQy9CLFFBQU9ELE9BQUtBLEtBQUtELElBQUwsQ0FBVUUsSUFBVixDQUFMLEdBQXFCQyxTQUE1QjtBQUNBOztJQUVvQkMsTzs7Ozs7Ozs7Ozs7eUJBQ2JDLEksRUFBTUMsRyxFQUFLQyxNLEVBQVFDLEksRUFBSztBQUM5QixPQUFJQyxNQUFJSixLQUFLSyxTQUFiO0FBQUEsT0FBd0JDLElBQXhCOztBQUVBLE9BQUcsY0FBWUYsR0FBZixFQUNDLE9BQU8sS0FBS0csUUFBUSxrQkFBUixDQUFMLEVBQWtDUCxJQUFsQyxFQUF1Q0MsR0FBdkMsRUFBNENDLE1BQTVDLENBQVAsQ0FERCxLQUVLLElBQUcsWUFBVUUsR0FBYixFQUNKLE9BQU8sS0FBS0csUUFBUSx3QkFBUixDQUFMLEVBQXdDUCxJQUF4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aEIsUUFBUSx5QkFBUixDQUFMLEVBQXlDUCxJQUF6QyxFQUE4Q0MsR0FBOUMsRUFBa0RDLE1BQWxELENBQVAsQ0FESSxLQUVBLElBQUcsY0FBWXFCLElBQWYsRUFDSixPQUFPLEtBQUtoQixRQUFRLDBCQUFSLENBQUwsRUFBMENQLElBQTFDLEVBQStDQyxHQUEvQyxFQUFtREMsTUFBbkQsQ0FBUCxDQURJLEtBRUEsSUFBRyxrQkFBZ0JxQixJQUFuQixFQUNKLE9BQU8sS0FBS2hCLFFBQVEsMEJBQVIsQ0FBTCxFQUEwQ1AsSUFBMUMsRUFBK0NDLEdBQS9DLEVBQW1EQyxNQUFuRCxDQUFQLENBREksS0FFQSxJQUFHLFVBQVFxQixJQUFYLEVBQ0osT0FBTyxLQUFLaEIsUUFBUSxzQkFBUixDQUFMLEVBQXNDUCxJQUF0QyxFQUEyQ0MsR0FBM0MsRUFBK0NDLE1BQS9DLENBQVAsQ0FESSxLQUVBLElBQUcsY0FBWXFCLElBQWYsRUFDSixPQUFPLEtBQUtoQixRQUFRLDBCQUFSLENBQUwsRUFBMENQLElBQTFDLEVBQStDQyxHQUEvQyxFQUFtREMsTUFBbkQsQ0FBUCxDQURJLEtBRUEsSUFBRyxjQUFZcUIsSUFBZixFQUNKLE9BQU8sS0FBS2hCLFFBQVEsMEJBQVIsQ0FBTCxFQUEwQ1AsSUFBMUMsRUFBK0NDLEdBQS9DLEVBQW1EQyxNQUFuRCxDQUFQO0FBQ0Q7Ozs7RUF0S21Da0MsaUI7O2tCQUFoQnJDLE8iLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNb2RlbCBmcm9tICcuL21vZGVsJ1xuaW1wb3J0IHtGYWN0b3J5IGFzIEJhc2V9IGZyb20gJy4uL2RvY3VtZW50J1xuXG5mdW5jdGlvbiBhdHRyKG5vZGUsbmFtZT0ndzp2YWwnKXtcblx0cmV0dXJuIG5vZGU/bm9kZS5hdHRyKG5hbWUpOnVuZGVmaW5lZFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGYWN0b3J5IGV4dGVuZHMgQmFzZXtcblx0Y3JlYXRlKHdYbWwsIGRvYywgcGFyZW50LCBtb3JlKXtcblx0XHR2YXIgdGFnPXdYbWwubG9jYWxOYW1lLCBzd2FwO1xuXG5cdFx0aWYoJ2RvY3VtZW50Jz09dGFnKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9kb2N1bWVudCcpKSh3WG1sLGRvYywgcGFyZW50KVxuXHRcdGVsc2UgaWYoJ3N0eWxlcyc9PXRhZylcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvZG9jdW1lbnRTdHlsZXMnKSkod1htbCxkb2MpXG5cdFx0ZWxzZSBpZignYWJzdHJhY3ROdW0nPT10YWcpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3N0eWxlL251bWJlcmluZ0RlZmluaXRpb24nKSkod1htbCxkb2MpXG5cdFx0ZWxzZSBpZignbnVtJz09dGFnKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9zdHlsZS9saXN0JykpKHdYbWwsZG9jKVxuXHRcdGVsc2UgaWYoJ3N0eWxlJz09dGFnKXtcblx0XHRcdHN3aXRjaCh3WG1sLmF0dHIoJ3c6dHlwZScpKXtcblx0XHRcdGNhc2UgJ3BhcmFncmFwaCc6XG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvc3R5bGUvcGFyYWdyYXBoJykpKHdYbWwsZG9jKVxuXHRcdFx0Y2FzZSAnY2hhcmFjdGVyJzpcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9zdHlsZS9pbmxpbmUnKSkod1htbCxkb2MpXG5cdFx0XHRjYXNlICd0YWJsZSc6XG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvc3R5bGUvdGFibGUnKSkod1htbCxkb2MpXG5cdFx0XHRjYXNlICdudW1iZXJpbmcnOlxuXHRcdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3N0eWxlL251bWJlcmluZycpKSh3WG1sLGRvYylcblx0XHRcdH1cblx0XHR9ZWxzZSBpZignZG9jRGVmYXVsdHMnPT10YWcpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3N0eWxlL2RvY3VtZW50JykpKHdYbWwsZG9jKVxuXHRcdGVsc2UgaWYoJ2JvZHknPT10YWcpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2JvZHknKSkod1htbCxkb2MsIHBhcmVudClcblx0XHRlbHNlIGlmKCdwJz09dGFnKXtcblx0XHRcdHZhciBzdHlsZUlkPWF0dHIod1htbC4kMSgnPnBQcj5wU3R5bGUnKSwndzp2YWwnKSwgc3R5bGU9ZG9jLnN0eWxlLmdldChzdHlsZUlkKVxuXHRcdFx0aWYod1htbC4kMSgnPnBQcj5udW1QcicpIHx8IChzdHlsZSAmJiBzdHlsZS5nZXROdW1JZCgpIT0tMSkpXG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvbGlzdCcpKSh3WG1sLGRvYyxwYXJlbnQpXG5cblx0XHRcdGxldCBvdXRsaW5lTHZsPS0xLHRtcFxuXHRcdFx0aWYoc3R5bGUpXG5cdFx0XHRcdG91dGxpbmVMdmw9c3R5bGUuZ2V0T3V0bGluZUxldmVsKClcblx0XHRcdGVsc2UgaWYodG1wPXdYbWwuJDEoJz5wUHI+b3V0bGluZUx2bCcpKXtcblx0XHRcdFx0dG1wPXBhcnNlSW50KGF0dHIodG1wKSlcblx0XHRcdFx0b3V0bGluZUx2bD1wYXJzZUludCh0bXApXG5cdFx0XHR9XG5cblx0XHRcdGlmKG91dGxpbmVMdmwhPS0xKVxuXHRcdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2hlYWRpbmcnKSkod1htbCxkb2MsIHBhcmVudCxvdXRsaW5lTHZsKVxuXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3BhcmFncmFwaCcpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0fWVsc2UgaWYoJ3InPT10YWcpe1xuXHRcdFx0bGV0IHN0eWxlPWRvYy5zdHlsZS5nZXQoYXR0cih3WG1sLiQxKCc+clByPnJTdHlsZScpLCd3OnZhbCcpKVxuXG5cdFx0XHRsZXQgb3V0bGluZUx2bD0tMSwgdG1wXG5cdFx0XHRpZihzdHlsZSlcblx0XHRcdFx0b3V0bGluZUx2bD1zdHlsZS5nZXRPdXRsaW5lTGV2ZWwoKVxuXHRcdFx0ZWxzZSBpZih0bXA9d1htbC4kMSgnPnJQcj5vdXRsaW5lTHZsJykpe1xuXHRcdFx0XHR0bXA9YXR0cih0bXApXG5cdFx0XHRcdG91dGxpbmVMdmw9cGFyc2VJbnQodG1wKVxuXHRcdFx0fVxuXG5cdFx0XHRpZihvdXRsaW5lTHZsIT0tMSlcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9oZWFkaW5nSW5saW5lJykpKHdYbWwsZG9jLHBhcmVudCxvdXRsaW5lTHZsKVxuXG5cdFx0XHRpZih3WG1sLmNoaWxkTm9kZXMubGVuZ3RoPT0xIHx8ICh3WG1sLmNoaWxkTm9kZXM9PTIgJiYgd1htbC5maXJzdENoaWxkLmxvY2FsTmFtZT09J3JQcicpKXtcblx0XHRcdFx0c3dpdGNoKHdYbWwubGFzdENoaWxkLmxvY2FsTmFtZSl7XG5cdFx0XHRcdGNhc2UgJ2ZsZENoYXInOlxuXHRcdFx0XHRjYXNlICdpbnN0clRleHQnOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmNyZWF0ZSh3WG1sLmxhc3RDaGlsZCxkb2MscGFyZW50KVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvaW5saW5lJykpKHdYbWwsZG9jLHBhcmVudClcblx0XHR9ZWxzZSBpZignaW5zdHJUZXh0Jz09dGFnKVxuXHRcdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2ZpZWxkSW5zdHJ1Y3QnKSkod1htbCwgZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCd0Jz09dGFnKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC90ZXh0JykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCdzeW0nPT10YWcgJiYgd1htbC5wYXJlbnROb2RlLmxvY2FsTmFtZT09J3InKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9zeW1ib2wnKSkod1htbCxkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ3NvZnRIeXBoZW4nPT10YWcgJiYgd1htbC5wYXJlbnROb2RlLmxvY2FsTmFtZT09J3InKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9zb2Z0SHlwaGVuJykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCdub0JyZWFrSHlwaGVuJz09dGFnICYmIHdYbWwucGFyZW50Tm9kZS5sb2NhbE5hbWU9PSdyJylcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvbm9CcmVha0h5cGhlbicpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZigndGFiJz09dGFnICYmIHdYbWwucGFyZW50Tm9kZS5sb2NhbE5hbWU9PSdyJylcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvdGFiJykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCdmbGRTaW1wbGUnPT10YWcpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2ZpZWxkU2ltcGxlJykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCdmbGRDaGFyJz09dGFnKXtcblx0XHRcdHN3aXRjaCh3WG1sLmF0dHIoJ3c6ZmxkQ2hhclR5cGUnKSl7XG5cdFx0XHRjYXNlICdiZWdpbic6XG5cdFx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvZmllbGRCZWdpbicpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnZW5kJzpcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9maWVsZEVuZCcpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnc2VwYXJhdGUnOlxuXHRcdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2ZpZWxkU2VwYXJhdGUnKSkod1htbCxkb2MscGFyZW50KVxuXHRcdFx0YnJlYWtcblx0XHRcdH1cblx0XHR9ZWxzZSBpZigndGJsJz09dGFnKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC90YWJsZScpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZigndHInPT10YWcpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3JvdycpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZigndGMnPT10YWcpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2NlbGwnKSkod1htbCxkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ2JyJz09dGFnKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9icicpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZignaHlwZXJsaW5rJz09dGFnICYmICdwJz09d1htbC5wYXJlbnROb2RlLmxvY2FsTmFtZSlcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvaHlwZXJsaW5rJykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCdBbHRlcm5hdGVDb250ZW50Jz09dGFnKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9kcmF3aW5nQW5jaG9yJykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCd3c3AnPT10YWcpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL3NoYXBlJykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCdpbmxpbmUnPT10YWcpe1xuXHRcdFx0dmFyIHR5cGU9d1htbC4kMSgnPmdyYXBoaWM+Z3JhcGhpY0RhdGEnKS5hdHRyKCd1cmknKS5zcGxpdCgnLycpLnBvcCgpXG5cdFx0XHRzd2l0Y2godHlwZSl7XG5cdFx0XHRjYXNlICdwaWN0dXJlJzpcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9pbWFnZScpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0XHRjYXNlICdkaWFncmFtJzpcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9kaWFncmFtJykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRcdGNhc2UgJ2NoYXJ0Jzpcblx0XHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9jaGFydCcpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdpbmxpbmUgJyt0eXBlICsnIGlzIG5vdCBzdXBwb3JlZCB5ZXQuJylcblx0XHRcdH1cblx0XHR9ZWxzZSBpZignc2R0Jz09dGFnKXtcblx0XHRcdHZhciBlbEJpbmRpbmc9d1htbC4kMSgnPnNkdFByPmRhdGFCaW5kaW5nJylcblx0XHRcdGlmKGVsQmluZGluZyl7Ly9wcm9wZXJ0aWVzXG5cdFx0XHRcdHZhciBwYXRoPWF0dHIoZWxCaW5kaW5nLCAndzp4cGF0aCcpLFxuXHRcdFx0XHRcdGQ9cGF0aC5zcGxpdCgvW1xcL1xcOlxcW10vKSxcblx0XHRcdFx0XHRuYW1lPShkLnBvcCgpLGQucG9wKCkpO1xuXHRcdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2RvY3VtZW50UHJvcGVydHknKSkod1htbCxkb2MscGFyZW50LCBuYW1lKVxuXHRcdFx0fWVsc2Ugey8vY29udHJvbHNcblx0XHRcdFx0bGV0IGVsVHlwZT13WG1sLiQxKCc+c2R0UHInKS4kMShcInRleHQsIHBpY3R1cmUsIGRvY1BhcnRMaXN0LCBjb21ib0JveCwgZHJvcERvd25MaXN0LCBkYXRlLCBjaGVja2JveFwiKVxuXHRcdFx0XHR0YWc9ZWxUeXBlID8gZWxUeXBlLmxvY2FsTmFtZSA6ICdyaWNodGV4dCdcblxuXHRcdFx0XHRsZXQgY29udHJvbD10aGlzLmNyZWF0ZUNvbnRyb2wodGFnLC4uLmFyZ3VtZW50cylcblxuXHRcdFx0XHRpZihjb250cm9sKVxuXHRcdFx0XHRcdHJldHVybiBjb250cm9sXG5cdFx0XHR9XG5cdFx0fWVsc2UgaWYoJ2Jvb2ttYXJrU3RhcnQnPT10YWcpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2Jvb2ttYXJrU3RhcnQnKSkod1htbCxkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ2Jvb2ttYXJrRW5kJz09dGFnKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9ib29rbWFya0VuZCcpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZignb01hdGgnPT10YWcpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2VxdWF0aW9uJykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCdvYmplY3QnPT10YWcpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL09MRScpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZignc2VjdFByJz09dGFnKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9zZWN0aW9uJykpKHdYbWwsZG9jLHBhcmVudClcblxuXHRcdHJldHVybiBuZXcgTW9kZWwod1htbCxkb2MscGFyZW50KVxuXHR9XG5cdFxuXHRjcmVhdGVDb250cm9sKHR5cGUsd1htbCxkb2MscGFyZW50KXtcblx0XHRpZigndGV4dCc9PXR5cGUpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2NvbnRyb2wvdGV4dCcpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZigncGljdHVyZSc9PXR5cGUpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2NvbnRyb2wvcGljdHVyZScpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZignZG9jUGFydExpc3QnPT10eXBlKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9jb250cm9sL2dhbGxlcnknKSkod1htbCxkb2MscGFyZW50KVxuXHRcdGVsc2UgaWYoJ2NvbWJvQm94Jz09dHlwZSlcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvY29udHJvbC9jb21ib2JveCcpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZignZHJvcERvd25MaXN0Jz09dHlwZSlcblx0XHRcdHJldHVybiBuZXcgKHJlcXVpcmUoJy4vbW9kZWwvY29udHJvbC9kcm9wZG93bicpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZignZGF0ZSc9PXR5cGUpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2NvbnRyb2wvZGF0ZScpKSh3WG1sLGRvYyxwYXJlbnQpXG5cdFx0ZWxzZSBpZignY2hlY2tib3gnPT10eXBlKVxuXHRcdFx0cmV0dXJuIG5ldyAocmVxdWlyZSgnLi9tb2RlbC9jb250cm9sL2NoZWNrYm94JykpKHdYbWwsZG9jLHBhcmVudClcblx0XHRlbHNlIGlmKCdyaWNodGV4dCc9PXR5cGUpXG5cdFx0XHRyZXR1cm4gbmV3IChyZXF1aXJlKCcuL21vZGVsL2NvbnRyb2wvcmljaHRleHQnKSkod1htbCxkb2MscGFyZW50KVxuXHR9XG59XG4iXX0=