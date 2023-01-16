'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./tool');

var _jszip = require('jszip');

var _jszip2 = _interopRequireDefault(_jszip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  document parser
 *
 *  @example
 *  Document.load(file)
 *  	.then(doc=>doc.parse([visitors]))
 */
var Document = function () {
	function Document(parts, raw, props) {
		_classCallCheck(this, Document);

		this.parts = parts;
		this.raw = raw;
		this.props = props;
	}

	_createClass(Document, [{
		key: 'getPart',
		value: function getPart(name) {
			return this.parts[name];
		}
	}, {
		key: 'getImagePart',
		value: function getImagePart(name) {
			var part = this.parts[name];
			var crc32 = part._data.crc32;
			var buffer = part[_jszip2.default.support.nodebuffer ? 'asNodeBuffer' : 'asArrayBuffer']();
			buffer.crc32 = part._data.crc32 = crc32;
			return buffer;
		}

		/**
   *  parse docx with visitors created from visitor factories one by one
   */

	}, {
		key: 'parse',
		value: function parse(visitorFactories) {}

		/**
   * release resources after parse
   */

	}, {
		key: 'release',
		value: function release() {}

		/**
   *  create parser for a word model
   */

	}, {
		key: 'factory',
		value: function factory(wordXml, docParser, parentParser) {
			if (!this._factory) {
				var a = new this.constructor.Factory();
				this._factory = function () {
					return a.create.apply(a, arguments);
				};
			}
			return this._factory.apply(this, arguments);
		}
	}], [{
		key: 'clone',
		value: function clone(doc) {
			var parts = doc.parts,
			    raw = doc.raw,
			    props = doc.props;

			return new Document(parts, raw, props);
		}
		/**
   *  a helper to load document file
  	 *  @param inputFile {File} - a html input file, or nodejs file
   *  @return {Promise}
   */

	}, {
		key: 'load',
		value: function load(inputFile) {
			var DocumentSelf = this;
			return new Promise(function (resolve, reject) {
				function parse(data) {
					var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

					try {
						// 如果doc 只修改文件名为 docx，则会 解压缩出错
						var raw = new _jszip2.default(data),
						    parts = {};
						raw.filter(function (path, file) {
							parts[path] = file;
						});
						resolve(new DocumentSelf(parts, raw, props));
					} catch (e) {
						reject(e);
					}
				}

				if ($.isNode) {
					//node
					if (typeof inputFile == 'string') {
						//file name
						require('fs').readFile(inputFile, function (error, data) {
							if (error) reject(error);else if (data) {
								parse(data, { name: inputFile.split(/[\/\\]/).pop().replace(/\.docx$/i, '') });
							}
						});
					} else {
						parse(inputFile);
					}
				} else {
					//browser
					if (inputFile instanceof Blob) {
						var reader = new FileReader();
						reader.onload = function (e) {
							parse(e.target.result, {
								name: inputFile.name.replace(/\.docx$/i, ''),
								lastModified: inputFile.lastModified,
								size: inputFile.size
							});
						};
						reader.readAsArrayBuffer(inputFile);
					} else {
						parse(inputFile);
					}
				}
			});
		}
	}]);

	return Document;
}();

Document.Factory = function () {
	function _class() {
		_classCallCheck(this, _class);
	}

	_createClass(_class, [{
		key: 'create',
		value: function create(wordXml, docParser, parentParser) {}
	}]);

	return _class;
}();

exports.default = Document;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJEb2N1bWVudCIsInBhcnRzIiwicmF3IiwicHJvcHMiLCJuYW1lIiwicGFydCIsImNyYzMyIiwiX2RhdGEiLCJidWZmZXIiLCJKU1ppcCIsInN1cHBvcnQiLCJub2RlYnVmZmVyIiwidmlzaXRvckZhY3RvcmllcyIsIndvcmRYbWwiLCJkb2NQYXJzZXIiLCJwYXJlbnRQYXJzZXIiLCJfZmFjdG9yeSIsImEiLCJjb25zdHJ1Y3RvciIsIkZhY3RvcnkiLCJjcmVhdGUiLCJhcmd1bWVudHMiLCJkb2MiLCJpbnB1dEZpbGUiLCJEb2N1bWVudFNlbGYiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInBhcnNlIiwiZGF0YSIsImZpbHRlciIsInBhdGgiLCJmaWxlIiwiZSIsIiQiLCJpc05vZGUiLCJyZXF1aXJlIiwicmVhZEZpbGUiLCJlcnJvciIsInNwbGl0IiwicG9wIiwicmVwbGFjZSIsIkJsb2IiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwidGFyZ2V0IiwicmVzdWx0IiwibGFzdE1vZGlmaWVkIiwic2l6ZSIsInJlYWRBc0FycmF5QnVmZmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7OztBQUVBOzs7Ozs7O0lBT3FCQSxRO0FBQ3BCLG1CQUFZQyxLQUFaLEVBQWtCQyxHQUFsQixFQUFzQkMsS0FBdEIsRUFBNEI7QUFBQTs7QUFDM0IsT0FBS0YsS0FBTCxHQUFXQSxLQUFYO0FBQ0EsT0FBS0MsR0FBTCxHQUFTQSxHQUFUO0FBQ0EsT0FBS0MsS0FBTCxHQUFXQSxLQUFYO0FBQ0E7Ozs7MEJBQ09DLEksRUFBSztBQUNaLFVBQU8sS0FBS0gsS0FBTCxDQUFXRyxJQUFYLENBQVA7QUFDQTs7OytCQUNZQSxJLEVBQUs7QUFDakIsT0FBSUMsT0FBSyxLQUFLSixLQUFMLENBQVdHLElBQVgsQ0FBVDtBQUNBLE9BQUlFLFFBQU1ELEtBQUtFLEtBQUwsQ0FBV0QsS0FB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VTBCO0FBSE0sUUFBdkI7QUFLQSxPQU5EO0FBT0FOLGFBQU9PLGlCQUFQLENBQXlCM0IsU0FBekI7QUFDQSxNQVZELE1BVU07QUFDTEssWUFBTUwsU0FBTjtBQUNBO0FBQ0Q7QUFFRCxJQTNDTSxDQUFQO0FBNENBOzs7Ozs7QUFyR21CdkIsUSxDQXVHYm1CLE87Ozs7Ozs7eUJBQ0NOLE8sRUFBU0MsUyxFQUFXQyxZLEVBQWEsQ0FFdkM7Ozs7OztrQkExR2tCZixRIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiLi90b29sXCJcbmltcG9ydCBKU1ppcCBmcm9tICdqc3ppcCdcblxuLyoqXG4gKiAgZG9jdW1lbnQgcGFyc2VyXG4gKlxuICogIEBleGFtcGxlXG4gKiAgRG9jdW1lbnQubG9hZChmaWxlKVxuICogIFx0LnRoZW4oZG9jPT5kb2MucGFyc2UoW3Zpc2l0b3JzXSkpXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50e1xuXHRjb25zdHJ1Y3RvcihwYXJ0cyxyYXcscHJvcHMpe1xuXHRcdHRoaXMucGFydHM9cGFydHNcblx0XHR0aGlzLnJhdz1yYXdcblx0XHR0aGlzLnByb3BzPXByb3BzXG5cdH1cblx0Z2V0UGFydChuYW1lKXtcblx0XHRyZXR1cm4gdGhpcy5wYXJ0c1tuYW1lXVxuXHR9XG5cdGdldEltYWdlUGFydChuYW1lKXtcblx0XHR2YXIgcGFydD10aGlzLnBhcnRzW25hbWVdXG5cdFx0dmFyIGNyYzMyPXBhcnQuX2RhdGEuY3JjMzJcblx0XHR2YXIgYnVmZmVyPXBhcnRbSlNaaXAuc3VwcG9ydC5ub2RlYnVmZmVyID8gJ2FzTm9kZUJ1ZmZlcicgOiAnYXNBcnJheUJ1ZmZlciddKClcblx0XHRidWZmZXIuY3JjMzI9cGFydC5fZGF0YS5jcmMzMj1jcmMzMlxuXHRcdHJldHVybiBidWZmZXJcblx0fVxuXG5cdC8qKlxuXHQgKiAgcGFyc2UgZG9jeCB3aXRoIHZpc2l0b3JzIGNyZWF0ZWQgZnJvbSB2aXNpdG9yIGZhY3RvcmllcyBvbmUgYnkgb25lXG5cdCAqL1xuXHRwYXJzZSh2aXNpdG9yRmFjdG9yaWVzKXtcblxuXHR9XG5cblx0LyoqXG5cdCAqIHJlbGVhc2UgcmVzb3VyY2VzIGFmdGVyIHBhcnNlXG5cdCAqL1xuXHRyZWxlYXNlKCl7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiAgY3JlYXRlIHBhcnNlciBmb3IgYSB3b3JkIG1vZGVsXG5cdCAqL1xuXHRmYWN0b3J5KHdvcmRYbWwsIGRvY1BhcnNlciwgcGFyZW50UGFyc2VyKXtcblx0XHRpZighdGhpcy5fZmFjdG9yeSl7XG5cdFx0XHRsZXQgYT1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5GYWN0b3J5XG5cdFx0XHR0aGlzLl9mYWN0b3J5PWZ1bmN0aW9uKCl7XG5cdFx0XHRcdHJldHVybiBhLmNyZWF0ZSguLi5hcmd1bWVudHMpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9mYWN0b3J5KC4uLmFyZ3VtZW50cylcblx0fVxuXG5cdHN0YXRpYyBjbG9uZShkb2Mpe1xuXHRcdGxldCB7cGFydHMscmF3LHByb3BzfT1kb2Ncblx0XHRyZXR1cm4gbmV3IERvY3VtZW50KHBhcnRzLHJhdyxwcm9wcylcblx0fVxuXHQvKipcblx0ICogIGEgaGVscGVyIHRvIGxvYWQgZG9jdW1lbnQgZmlsZVxuXG5cdCAqICBAcGFyYW0gaW5wdXRGaWxlIHtGaWxlfSAtIGEgaHRtbCBpbnB1dCBmaWxlLCBvciBub2RlanMgZmlsZVxuXHQgKiAgQHJldHVybiB7UHJvbWlzZX1cblx0ICovXG5cblx0c3RhdGljIGxvYWQoaW5wdXRGaWxlKXtcblx0XHR2YXIgRG9jdW1lbnRTZWxmPXRoaXNcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdGZ1bmN0aW9uIHBhcnNlKGRhdGEsIHByb3BzPXt9KXtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyDlpoLmnpxkb2Mg5Y+q5L+u5pS55paH5Lu25ZCN5Li6IGRvY3jvvIzliJnkvJog6Kej5Y6L57yp5Ye66ZSZXG5cdFx0XHRcdFx0dmFyIHJhdz1uZXcgSlNaaXAoZGF0YSkscGFydHM9e31cblx0XHRcdFx0XHRyYXcuZmlsdGVyKGZ1bmN0aW9uKHBhdGgsZmlsZSl7XG5cdFx0XHRcdFx0XHRwYXJ0c1twYXRoXT1maWxlXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRyZXNvbHZlKG5ldyBEb2N1bWVudFNlbGYocGFydHMscmF3LHByb3BzKSlcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdHJlamVjdChlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cblx0XHRcdGlmKCQuaXNOb2RlKXsvL25vZGVcblx0XHRcdFx0aWYodHlwZW9mIGlucHV0RmlsZT09J3N0cmluZycpey8vZmlsZSBuYW1lXG5cdFx0XHRcdFx0cmVxdWlyZSgnZnMnKS5yZWFkRmlsZShpbnB1dEZpbGUsZnVuY3Rpb24oZXJyb3IsIGRhdGEpe1xuXHRcdFx0XHRcdFx0aWYoZXJyb3IpXG5cdFx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0XHRlbHNlIGlmKGRhdGEpe1xuXHRcdFx0XHRcdFx0XHRwYXJzZShkYXRhLCB7bmFtZTppbnB1dEZpbGUuc3BsaXQoL1tcXC9cXFxcXS8pLnBvcCgpLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpfSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0cGFyc2UoaW5wdXRGaWxlKVxuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXsvL2Jyb3dzZXJcblx0XHRcdFx0aWYoaW5wdXRGaWxlIGluc3RhbmNlb2YgQmxvYil7XG5cdFx0XHRcdFx0dmFyIHJlYWRlcj1uZXcgRmlsZVJlYWRlcigpO1xuXHRcdFx0XHRcdHJlYWRlci5vbmxvYWQ9ZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRwYXJzZShlLnRhcmdldC5yZXN1bHQsIHtcblx0XHRcdFx0XHRcdFx0XHRuYW1lOmlucHV0RmlsZS5uYW1lLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpLFxuXHRcdFx0XHRcdFx0XHRcdGxhc3RNb2RpZmllZDppbnB1dEZpbGUubGFzdE1vZGlmaWVkLFxuXHRcdFx0XHRcdFx0XHRcdHNpemU6aW5wdXRGaWxlLnNpemVcblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGlucHV0RmlsZSk7XG5cdFx0XHRcdH1lbHNlIHtcblx0XHRcdFx0XHRwYXJzZShpbnB1dEZpbGUpXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH0pXG5cdH1cblxuXHRzdGF0aWMgRmFjdG9yeT1jbGFzcyB7XG5cdFx0Y3JlYXRlKHdvcmRYbWwsIGRvY1BhcnNlciwgcGFyZW50UGFyc2VyKXtcblxuXHRcdH1cblx0fVxufVxuIl19