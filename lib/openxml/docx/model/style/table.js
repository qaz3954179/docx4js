'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _paragraph = require('./paragraph');

var _paragraph2 = _interopRequireDefault(_paragraph);

var _inline = require('./inline');

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = function (_Style) {
	_inherits(Table, _Style);

	function Table() {
		_classCallCheck(this, Table);

		return _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).apply(this, arguments));
	}

	_createClass(Table, [{
		key: 'parse',
		value: function parse(factories) {
			_get(Table.prototype.__proto__ || Object.getPrototypeOf(Table.prototype), 'parse', this).apply(this, arguments);

			var TableStyle = this.constructor;
			for (var styles = this.wXml.$('tblStylePr'), len = styles.length, i = 0; i < len; i++) {
				var model = new TableStyle(styles[i], this.wDoc, this);
				model.id = this.id;
				model.parse(factories);
			}
		}
	}, {
		key: '_iterate',
		value: function _iterate(f, factories, visitors) {
			var pr = null;
			(pr = this.wXml.$1('>tblPr:not(:empty)')) && new this.constructor.Properties(pr, this.wDoc, this).parse(visitors);
			(pr = this.wXml.$1('>trPr:not(:empty)')) && new this.constructor.RowProperties(pr, this.wDoc, this).parse(visitors);
			(pr = this.wXml.$1('>tcPr:not(:empty)')) && new this.constructor.CellProperties(pr, this.wDoc, this).parse(visitors);
			(pr = this.wXml.$1('>pPr:not(:empty)')) && new _paragraph2.default.Properties(pr, this.wDoc, this).parse(visitors);
			(pr = this.wXml.$1('>rPr:not(:empty)')) && new _inline2.default.Properties(pr, this.wDoc, this).parse(visitors);
		}
	}, {
		key: 'getTarget',
		value: function getTarget() {
			return this.wXml.attr('w:type');
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'style.table';
		}
	}]);

	return Table;
}(_style2.default);

exports.default = Table;


Table.Properties = function (_Style$Properties) {
	_inherits(Properties, _Style$Properties);

	function Properties() {
		_classCallCheck(this, Properties);

		return _possibleConstructorReturn(this, (Properties.__proto__ || Object.getPrototypeOf(Properties)).apply(this, arguments));
	}

	_createClass(Properties, [{
		key: 'tblBorders',
		value: function tblBorders(x) {
			var value = {};
			for (var borders = x.childNodes, border, i = 0, len = borders.length; i < len; i++) {
				if (borders[i].nodeType !== 1) continue;
				border = value[(border = borders[i]).localName] = this.asObject(border);
				border.sz && (border.sz = border.sz / 8);
				border.color && (border.color = this.asColor(border.color));
			}
			return value;
		}
	}, {
		key: 'tblCellMar',
		value: function tblCellMar(x) {
			var value = {};
			for (var borders = x.childNodes, i = 0, len = borders.length, v; i < len; i++) {
				borders[i].nodeType == 1 && (value[borders[i].localName] = this.pt2Px(this.asPt(borders[i].attr('w:w'))));
			}return value;
		}
	}, {
		key: 'tblCellSpacing',
		value: function tblCellSpacing(x) {
			return this.pt2Px(this.asPt(x.attr('w:val')));
		}
	}, {
		key: 'tblLook',
		value: function tblLook(x) {
			return this.asObject(x, function (x) {
				return parseInt(x);
			});
		}
	}, {
		key: 'tblStyleRowBandSize',
		value: function tblStyleRowBandSize(x) {
			return parseInt(x.attr('w:val'));
		}
	}, {
		key: 'tblStyleColBandSize',
		value: function tblStyleColBandSize(x) {
			return parseInt(x.attr('w:val'));
		}
	}, {
		key: 'tblW',
		value: function tblW(x) {
			switch (x.attr('w:type')) {
				case 'pct':
					return parseInt(x.attr('w:w')) * 2 / 100 + '%';
				case 'auto':
					return 'auto';
				default:
					return this.pt2Px(this.asPt(x.attr('w:w')));
			}
		}
	}, {
		key: 'tblInd',
		value: function tblInd(x) {
			return this.pt2Px(this.asPt(x.attr('w:w')));
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'table';
		}
	}]);

	return Properties;
}(_style2.default.Properties);

var StyleNameMap = {
	firstRow: "firstRow",
	lastRow: "lastRow",
	firstColumn: "firstCol",
	lastColumn: "lastCol",
	oddVBand: "band1Vert",
	evenVBand: "band2Vert",
	oddHBand: "band1Horz",
	evenHBand: "band2Horz",
	firstRowFirstColumn: "nwCell",
	firstRowLastColumn: "neCell",
	lastRowFirstColumn: "swCell",
	lastRowLastColumn: "seCell"
};

Table.RowProperties = function (_Style$Properties2) {
	_inherits(RowProperties, _Style$Properties2);

	function RowProperties() {
		_classCallCheck(this, RowProperties);

		return _possibleConstructorReturn(this, (RowProperties.__proto__ || Object.getPrototypeOf(RowProperties)).apply(this, arguments));
	}

	_createClass(RowProperties, [{
		key: 'cnfStyle',
		value: function cnfStyle(x, t) {
			return Object.keys(t = this.asObject(x)).map(function (a) {
				return t[a] == '1' && StyleNameMap[a];
			}).filter(function (a) {
				return a;
			});
		}
	}, {
		key: 'tblCellSpacing',
		value: function tblCellSpacing(x) {
			return this.pt2Px(this.asPt(x.attr('w:val')));
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'row';
		}
	}]);

	return RowProperties;
}(_style2.default.Properties);

Table.CellProperties = function (_Style$Properties3) {
	_inherits(CellProperties, _Style$Properties3);

	function CellProperties() {
		_classCallCheck(this, CellProperties);

		return _possibleConstructorReturn(this, (CellProperties.__proto__ || Object.getPrototypeOf(CellProperties)).apply(this, arguments));
	}

	_createClass(CellProperties, [{
		key: 'tcBorders',
		value: function tcBorders(x) {
			var value = {};
			for (var borders = x.childNodes, border, i = 0, len = borders.length; i < len; i++) {
				if (borders[i].nodeType !== 1) continue;
				border = value[(border = borders[i]).localName] = this.asObject(border);
				border.sz && (border.sz = border.sz / 8);
				border.color && (border.color = this.asColor(border.color));
			}
			return value;
		}
	}, {
		key: 'shd',
		value: function shd(x) {
			// 默认背景为白色
			var fill = x.attr('w:fill');
			return this.asColor(fill === 'auto' ? '#ffffff' : fill);
		}
	}, {
		key: 'cnfStyle',
		value: function cnfStyle(x, t) {
			return Object.keys(t = this.asObject(x)).map(function (a) {
				return t[a] == '1' && StyleNameMap[a];
			}).filter(function (a) {
				return a;
			});
		}
	}, {
		key: 'gridSpan',
		value: function gridSpan(x) {
			return x.attr('w:val');
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'cell';
		}
	}]);

	return CellProperties;
}(_style2.default.Properties);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvdGFibGUuanMiXSwibmFtZXMiOlsiVGFibGUiLCJmYWN0b3JpZXMiLCJhcmd1bWVudHMiLCJUYWJsZVN0eWxlIiwiY29uc3RydWN0b3IiLCJzdHlsZXMiLCJ3WG1sIiwiJCIsImxlbiIsImxlbmd0aCIsImkiLCJtb2RlbCIsIndEb2MiLCJpZCIsInBhcnNlIiwiZiIsInZpc2l0b3JzIiwicHIiLCIkMSIsIlByb3BlcnRpZXMiLCJSb3dQcm9wZXJ0aWVzIiwiQ2VsbFByb3BlcnRpZXMiLCJQYXJhZ3JhcGgiLCJJbmxpbmUiLCJhdHRyIiwiU3R5bGUiLCJ4IiwidmFsdWUiLCJib3JkZXJzIiwiY2hpbGROb2RlcyIsImJvcmRlciIsIm5vZGVUeXBlIiwibG9jYWxOYW1lIiwiYXNPYmplY3QiLCJzeiIsImNvbG9yIiwiYXNDb2xvciIsInYiLCJwdDJQeCIsImFzUHQiLCJwYXJzZUludCIsIlN0eWxlTmFtZU1hcCIsImZpcnN0Um93IiwibGFzdFJvdyIsImZpcnN0Q29sdW1uIiwibGFzdENvbHVtbiIsIm9kZFZCYW5kIiwiZXZlblZCYW5kIiwib2RkSEJhbmQiLCJldmVuSEJhbmQiLCJmaXJzdFJvd0ZpcnN0Q29sdW1uIiwiZmlyc3RSb3dMYXN0Q29sdW1uIiwibGFzdFJvd0ZpcnN0Q29sdW1uIiwibGFzdFJvd0xhc3RDb2x1bW4iLCJ0IiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsImEiLCJmaWx0ZXIiLCJmaWxsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7O3dCQUNkQyxTLEVBQVU7QUFDZix3R0FBZUMsU0FBZjs7QUFFQSxPQUFJQyxhQUFXLEtBQUtDLFdBQXBCO0FBQ0EsUUFBSSxJQUFJQyxTQUFPLEtBQUtDLElBQUwsQ0FBVUMsQ0FBVixDQUFZLFlBQVosQ0FBWCxFQUFzQ0MsTUFBSUgsT0FB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QTtBQUFBLDJCQWdCVWxDLENBaEJWLEVBZ0JZNEIsQ0FoQlosRUFnQmM7QUFDWixVQUFPQyxPQUFPQyxJQUFQLENBQVlGLElBQUUsS0FBS3JCLFFBQUwsQ0FBY1AsQ0FBZCxDQUFkLEVBQWdDK0IsR0FBaEMsQ0FBb0M7QUFBQSxXQUFHSCxFQUFFSSxDQUFGLEtBQU0sR0FBTixJQUFhakIsYUFBYWlCLENBQWIsQ0FBaEI7QUFBQSxJQUFwQyxFQUFxRUMsTUFBckUsQ0FBNEU7QUFBQSxXQUFHRCxDQUFIO0FBQUEsSUFBNUUsQ0FBUDtBQUNBO0FBbEJGO0FBQUE7QUFBQSwyQkFtQlVoQyxDQW5CVixFQW1CWTtBQUNWLFVBQU9BLEVBQUVGLElBQUYsQ0FBTyxPQUFQLENBQVA7QUFDQTtBQXJCRjtBQUFBO0FBQUEsc0JBc0JrQjtBQUFDLFVBQU8sTUFBUDtBQUFjO0FBdEJqQzs7QUFBQTtBQUFBLEVBQWtEQyxnQkFBTU4sVUFBeEQiLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R5bGUgZnJvbSAnLi4vc3R5bGUnXG5pbXBvcnQgUGFyYWdyYXBoIGZyb20gJy4vcGFyYWdyYXBoJ1xuaW1wb3J0IElubGluZSBmcm9tICcuL2lubGluZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUgZXh0ZW5kcyBTdHlsZXtcblx0cGFyc2UoZmFjdG9yaWVzKXtcblx0XHRzdXBlci5wYXJzZSguLi5hcmd1bWVudHMpXG5cblx0XHR2YXIgVGFibGVTdHlsZT10aGlzLmNvbnN0cnVjdG9yXG5cdFx0Zm9yKHZhciBzdHlsZXM9dGhpcy53WG1sLiQoJ3RibFN0eWxlUHInKSwgbGVuPXN0eWxlcy5sZW5ndGgsIGk9MDtpPGxlbjtpKyspe1xuXHRcdFx0dmFyIG1vZGVsPW5ldyBUYWJsZVN0eWxlKHN0eWxlc1tpXSx0aGlzLndEb2MsdGhpcylcblx0XHRcdG1vZGVsLmlkPXRoaXMuaWRcblx0XHRcdG1vZGVsLnBhcnNlKGZhY3Rvcmllcylcblx0XHR9XG5cdH1cblx0X2l0ZXJhdGUoZiwgZmFjdG9yaWVzLCB2aXNpdG9ycyl7XG5cdFx0dmFyIHByPW51bGw7XG5cdFx0KHByPXRoaXMud1htbC4kMSgnPnRibFByOm5vdCg6ZW1wdHkpJykpICYmIG5ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpLnBhcnNlKHZpc2l0b3JzKTtcblx0XHQocHI9dGhpcy53WG1sLiQxKCc+dHJQcjpub3QoOmVtcHR5KScpKSAmJiBuZXcgdGhpcy5jb25zdHJ1Y3Rvci5Sb3dQcm9wZXJ0aWVzKHByLHRoaXMud0RvYyx0aGlzKS5wYXJzZSh2aXNpdG9ycyk7XG5cdFx0KHByPXRoaXMud1htbC4kMSgnPnRjUHI6bm90KDplbXB0eSknKSkgJiYgbmV3IHRoaXMuY29uc3RydWN0b3IuQ2VsbFByb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpLnBhcnNlKHZpc2l0b3JzKTtcblx0XHQocHI9dGhpcy53WG1sLiQxKCc+cFByOm5vdCg6ZW1wdHkpJykpICYmIG5ldyBQYXJhZ3JhcGguUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcykucGFyc2UodmlzaXRvcnMpO1xuXHRcdChwcj10aGlzLndYbWwuJDEoJz5yUHI6bm90KDplbXB0eSknKSkgJiYgbmV3IElubGluZS5Qcm9wZXJ0aWVzKHByLHRoaXMud0RvYyx0aGlzKS5wYXJzZSh2aXNpdG9ycyk7XG5cdH1cblx0Z2V0VGFyZ2V0KCl7XG5cdFx0cmV0dXJuIHRoaXMud1htbC5hdHRyKCd3OnR5cGUnKVxuXHR9XG5cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdzdHlsZS50YWJsZSd9XG59XG5cblRhYmxlLlByb3BlcnRpZXM9Y2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG5cdHRibEJvcmRlcnMoeCl7XG5cdFx0dmFyIHZhbHVlPXt9O1xuXHRcdGZvcih2YXIgYm9yZGVycz14LmNoaWxkTm9kZXMsYm9yZGVyLGk9MCxsZW49Ym9yZGVycy5sZW5ndGg7aTxsZW47aSsrKXtcblx0XHRcdGlmKGJvcmRlcnNbaV0ubm9kZVR5cGUhPT0xKSBjb250aW51ZVxuXHRcdFx0Ym9yZGVyPXZhbHVlWyhib3JkZXI9Ym9yZGVyc1tpXSkubG9jYWxOYW1lXT10aGlzLmFzT2JqZWN0KGJvcmRlcilcblx0XHRcdGJvcmRlci5zeiAmJiAoYm9yZGVyLnN6PWJvcmRlci5zei84KTtcblx0XHRcdGJvcmRlci5jb2xvciAmJiAoYm9yZGVyLmNvbG9yPXRoaXMuYXNDb2xvcihib3JkZXIuY29sb3IpKVxuXHRcdH1cblx0XHRyZXR1cm4gdmFsdWVcblx0fVxuXHR0YmxDZWxsTWFyKHgpe1xuXHRcdHZhciB2YWx1ZT17fTtcblx0XHRmb3IodmFyIGJvcmRlcnM9eC5jaGlsZE5vZGVzLGk9MCxsZW49Ym9yZGVycy5sZW5ndGgsdjtpPGxlbjtpKyspXG5cdFx0XHRib3JkZXJzW2ldLm5vZGVUeXBlPT0xICYmICh2YWx1ZVtib3JkZXJzW2ldLmxvY2FsTmFtZV09dGhpcy5wdDJQeCh0aGlzLmFzUHQoYm9yZGVyc1tpXS5hdHRyKCd3OncnKSkpKVxuXHRcdHJldHVybiB2YWx1ZVxuXHR9XG5cdHRibENlbGxTcGFjaW5nKHgpe1xuXHRcdHJldHVybiB0aGlzLnB0MlB4KHRoaXMuYXNQdCh4LmF0dHIoJ3c6dmFsJykpKVxuXHR9XG5cdHRibExvb2soeCl7XG5cdFx0cmV0dXJuIHRoaXMuYXNPYmplY3QoeCxmdW5jdGlvbih4KXtyZXR1cm4gcGFyc2VJbnQoeCl9KVxuXHR9XG5cdHRibFN0eWxlUm93QmFuZFNpemUoeCl7XG5cdFx0cmV0dXJuIHBhcnNlSW50KHguYXR0cigndzp2YWwnKSlcblx0fVxuXHR0YmxTdHlsZUNvbEJhbmRTaXplKHgpe1xuXHRcdHJldHVybiBwYXJzZUludCh4LmF0dHIoJ3c6dmFsJykpXG5cdH1cblx0dGJsVyh4KXtcblx0XHRzd2l0Y2goeC5hdHRyKCd3OnR5cGUnKSl7XG5cdFx0Y2FzZSAncGN0Jzpcblx0XHRcdHJldHVybiBwYXJzZUludCh4LmF0dHIoJ3c6dycpKSoyLzEwMCsnJSdcblx0XHRjYXNlICdhdXRvJzpcblx0XHRcdHJldHVybiAnYXV0bydcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIHRoaXMucHQyUHgodGhpcy5hc1B0KHguYXR0cigndzp3JykpKVxuXHRcdH1cblx0fVxuXHR0YmxJbmQoeCl7XG5cdFx0cmV0dXJuIHRoaXMucHQyUHgodGhpcy5hc1B0KHguYXR0cigndzp3JykpKVxuXHR9XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAndGFibGUnfVxufVxuXG52YXIgU3R5bGVOYW1lTWFwPXtcblx0Zmlyc3RSb3c6XCJmaXJzdFJvd1wiLFxuXHRsYXN0Um93OlwibGFzdFJvd1wiLFxuXHRmaXJzdENvbHVtbjpcImZpcnN0Q29sXCIsXG5cdGxhc3RDb2x1bW46XCJsYXN0Q29sXCIsIFxuXHRvZGRWQmFuZDpcImJhbmQxVmVydFwiICxcblx0ZXZlblZCYW5kOlwiYmFuZDJWZXJ0XCIgLFxuXHRvZGRIQmFuZDpcImJhbmQxSG9yelwiICxcblx0ZXZlbkhCYW5kOlwiYmFuZDJIb3J6XCIgLFxuXHRmaXJzdFJvd0ZpcnN0Q29sdW1uOlwibndDZWxsXCIgLFxuXHRmaXJzdFJvd0xhc3RDb2x1bW46XCJuZUNlbGxcIiAsXG5cdGxhc3RSb3dGaXJzdENvbHVtbjpcInN3Q2VsbFwiICxcblx0bGFzdFJvd0xhc3RDb2x1bW46XCJzZUNlbGxcIlxufVxuXG5UYWJsZS5Sb3dQcm9wZXJ0aWVzPWNsYXNzIFJvd1Byb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuXHRjbmZTdHlsZSh4LHQpe1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0PXRoaXMuYXNPYmplY3QoeCkpLm1hcChhPT50W2FdPT0nMScgJiYgU3R5bGVOYW1lTWFwW2FdKS5maWx0ZXIoYT0+YSlcblx0fVxuXHR0YmxDZWxsU3BhY2luZyh4KXtcblx0XHRyZXR1cm4gdGhpcy5wdDJQeCh0aGlzLmFzUHQoeC5hdHRyKCd3OnZhbCcpKSlcblx0fVxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ3Jvdyd9XG59XG5cblRhYmxlLkNlbGxQcm9wZXJ0aWVzPWNsYXNzIENlbGxQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcblx0dGNCb3JkZXJzKHgpe1xuXHRcdHZhciB2YWx1ZT17fTtcblx0XHRmb3IodmFyIGJvcmRlcnM9eC5jaGlsZE5vZGVzLGJvcmRlcixpPTAsbGVuPWJvcmRlcnMubGVuZ3RoO2k8bGVuO2krKyl7XG5cdFx0XHRpZihib3JkZXJzW2ldLm5vZGVUeXBlIT09MSkgY29udGludWVcblx0XHRcdGJvcmRlcj12YWx1ZVsoYm9yZGVyPWJvcmRlcnNbaV0pLmxvY2FsTmFtZV09dGhpcy5hc09iamVjdChib3JkZXIpXG5cdFx0XHRib3JkZXIuc3ogJiYgKGJvcmRlci5zej1ib3JkZXIuc3ovOCk7XG5cdFx0XHRib3JkZXIuY29sb3IgJiYgKGJvcmRlci5jb2xvcj10aGlzLmFzQ29sb3IoYm9yZGVyLmNvbG9yKSlcblx0XHR9XG5cdFx0cmV0dXJuIHZhbHVlXG5cdH1cblx0c2hkKHgpe1xuXHRcdC8vIOm7mOiupOiDjOaZr+S4uueZveiJslxuXHRcdHZhciBmaWxsID0geC5hdHRyKCd3OmZpbGwnKTtcblx0XHRyZXR1cm4gdGhpcy5hc0NvbG9yKCBmaWxsID09PSAnYXV0bycgPyAnI2ZmZmZmZicgOiBmaWxsKTtcblx0fVxuXHRjbmZTdHlsZSh4LHQpe1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0PXRoaXMuYXNPYmplY3QoeCkpLm1hcChhPT50W2FdPT0nMScgJiYgU3R5bGVOYW1lTWFwW2FdKS5maWx0ZXIoYT0+YSlcblx0fVxuXHRncmlkU3Bhbih4KXtcblx0XHRyZXR1cm4geC5hdHRyKCd3OnZhbCcpXG5cdH1cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdjZWxsJ31cbn1cbiJdfQ==