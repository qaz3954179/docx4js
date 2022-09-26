'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RGB = /([a-fA-F0-9]{2}?){3}?/;

var color = function () {
	function color(wXml, xMapping) {
		_classCallCheck(this, color);

		this.wXml = wXml;
		this.map = {};
		for (var i = 0, map = xMapping.attributes, len = map.length, attr; i < len; i++) {
			this.map[(attr = xMapping.attributes[i]).localName] = attr.value;
		}
	}

	_createClass(color, [{
		key: 'get',
		value: function get(name, t) {
			if (name == 'phClr') //placeholder color, witch will be replaced with direct style
				return name;
			name = this.map[name] || name;
			if (t = this.wXml.$1(name)) {
				switch (t.firstChild.localName) {
					case 'sysClr':
						return '#' + t.firstChild.attr('lastClr');
					default:
						return '#' + t.firstChild.attr('val');
				}
			} else return '#eee'; // 不确定字体颜色和背景色是不是都用这个默认值，给一个中间色防止出现意外。
		}
	}]);

	return color;
}();

exports.default = color;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvdGhlbWUvY29sb3IuanMiXSwibmFtZXMiOlsiUkdCIiwiY29sb3IiLCJ3WG1sIiwieE1hcHBpbmciLCJtYXAiLCJpIiwiYXR0cmlidXRlcyIsImxlbiIsImxlbmd0aCIsImF0dHIiLCJsb2NhbE5hbWUiLCJ2YWx1ZSIsIm5hbWUiLCJ0IiwiJDEiLCJmaXJzdENoaWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSUEsTUFBSSx1QkFBUjs7SUFDcUJDLEs7QUFDcEIsZ0JBQVlDLElBQVosRUFBa0JDLFFBQWxCLEVBQTJCO0FBQUE7O0FBQzFCLE9BQUtELElBQUwsR0FBVUEsSUFBVjtBQUNBLE9BQUtFLEdBQUwsR0FBUyxFQUFUO0FBQ0EsT0FBSSxJQUFJQyxJQUFFLENBQU4sRUFBUUQsTUFBSUQsU0FBU0csVUFBckIsRUFBZ0NDLE1BQUlILElBQUlJLE1BQXhDLEVBQWdEQyxJQUFwRCxFQUF5REosSUFBRUUsR0FBM0QsRUFBK0RGLEdBQS9EO0FBQ0MsUUFBS0QsR0FBTCxDQUFTLENBQUNLLE9BQUtOLFNBQVNHLFVBQVQsQ0FBb0JELENBQXBCLENBQU4sRUFBOEJLLFNBQXZDLElBQWtERCxLQUFLRSxLQUF2RDtBQUREO0FBRUE7Ozs7c0JBQ0dDLEksRUFBTUMsQyxFQUFFO0FBQ1gsT0FBR0QsUUFBTSxPQUFULEVBQWlCO0FBQ2hCLFdBQU9BLElBQVA7QUFDREEsVUFBSyxLQUFLUixHQUFMLENBQVNRLElBQVQsS0FBZ0JBLElBQXJCO0FBQ0EsT0FBR0MsSUFBRSxLQUFLWCxJQUFMLENBQVVZLEVBQVYsQ0FBYUYsSUFBYixDQUFMLEVBQXdCO0FBQ3ZCLFlBQU9DLEVBQUVFLFVBQUYsQ0FBYUwsU0FBcEI7QUFDQSxVQUFLLFFBQUw7QUFDQyxhQUFPLE1BQUlHLEVBQUVFLFVBQUYsQ0FBYU4sSUFBYixDQUFrQixTQUFsQixDQUFYO0FBQ0Q7QUFDQyxhQUFPLE1BQUlJLEVBQUVFLFVBQUYsQ0FBYU4sSUFBYixDQUFrQixLQUFsQixDQUFYO0FBSkQ7QUFNQSxJQVBELE1BUUMsT0FBTyxNQUFQLENBWlUsQ0FZSTtBQUNmOzs7Ozs7a0JBcEJtQlIsSyIsImZpbGUiOiJjb2xvci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBSR0I9LyhbYS1mQS1GMC05XXsyfT8pezN9Py87XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBjb2xvciB7XG5cdGNvbnN0cnVjdG9yKHdYbWwsIHhNYXBwaW5nKXtcblx0XHR0aGlzLndYbWw9d1htbFxuXHRcdHRoaXMubWFwPXt9XG5cdFx0Zm9yKHZhciBpPTAsbWFwPXhNYXBwaW5nLmF0dHJpYnV0ZXMsbGVuPW1hcC5sZW5ndGgsIGF0dHI7aTxsZW47aSsrKVxuXHRcdFx0dGhpcy5tYXBbKGF0dHI9eE1hcHBpbmcuYXR0cmlidXRlc1tpXSkubG9jYWxOYW1lXT1hdHRyLnZhbHVlXG5cdH1cblx0Z2V0KG5hbWUsIHQpe1xuXHRcdGlmKG5hbWU9PSdwaENscicpLy9wbGFjZWhvbGRlciBjb2xvciwgd2l0Y2ggd2lsbCBiZSByZXBsYWNlZCB3aXRoIGRpcmVjdCBzdHlsZVxuXHRcdFx0cmV0dXJuIG5hbWVcblx0XHRuYW1lPXRoaXMubWFwW25hbWVdfHxuYW1lXG5cdFx0aWYodD10aGlzLndYbWwuJDEobmFtZSkpe1xuXHRcdFx0c3dpdGNoKHQuZmlyc3RDaGlsZC5sb2NhbE5hbWUpe1xuXHRcdFx0Y2FzZSAnc3lzQ2xyJzpcblx0XHRcdFx0cmV0dXJuICcjJyt0LmZpcnN0Q2hpbGQuYXR0cignbGFzdENscicpXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gJyMnK3QuZmlyc3RDaGlsZC5hdHRyKCd2YWwnKVxuXHRcdFx0fVxuXHRcdH0gZWxzZVxuXHRcdFx0cmV0dXJuICcjZWVlJyAvLyDkuI3noa7lrprlrZfkvZPpopzoibLlkozog4zmma/oibLmmK/kuI3mmK/pg73nlKjov5nkuKrpu5jorqTlgLzvvIznu5nkuIDkuKrkuK3pl7ToibLpmLLmraLlh7rnjrDmhI/lpJbjgIJcblx0fVxufVxuIl19