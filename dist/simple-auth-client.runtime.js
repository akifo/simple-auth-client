/*!
 * SimpleAuthClient.js v1.0.1
 * (c) 2017-2017 Akiho Nagao
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.SimpleAuthClient = factory());
}(this, (function () { 'use strict';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var primitiveTypes_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


/**
 * This file exports a dictionary of global primitive types that are shared by all contexts.
 * It is populated in [registerPrimitiveTypes()](./registerPrimitiveTypes.js).
 */

var primitiveTypes = {};

/**
 * Covers our builtin types and makes room for future ones.
 */


primitiveTypes;

exports.default = primitiveTypes;
});

var makeJSONError_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = makeJSONError;

var _Validation = Validation_1;

function makeJSONError(validation) {
  if (!validation.hasErrors()) {
    return;
  }
  var input = validation.input,
      context = validation.context;

  var errors = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = validation.errors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = _slicedToArray(_ref, 3);

      var path = _ref2[0];
      var message = _ref2[1];
      var expectedType = _ref2[2];

      var expected = expectedType ? expectedType.toString() : null;
      var actual = context.typeOf((0, _Validation.resolvePath)(input, path)).toString();
      var field = (0, _Validation.stringifyPath)(validation.inputName ? [validation.inputName].concat(path) : path);

      var pointer = '/' + path.join('/');

      errors.push({
        pointer: pointer,
        field: field,
        message: message,
        expected: expected,
        actual: actual
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return errors;
}
});

var Validation_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvePath = exports.default = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.stringifyPath = stringifyPath;
exports.matchPath = matchPath;

var _makeJSONError = makeJSONError_1;

var _makeJSONError2 = _interopRequireDefault(_makeJSONError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var validIdentifier = /^[$A-Z_][0-9A-Z_$]*$/i;

var Validation = function () {
  function Validation(context, input) {
    _classCallCheck(this, Validation);

    this.inputName = '';
    this.errors = [];

    this.context = context;
    this.input = input;
  }

  _createClass(Validation, [{
    key: 'hasErrors',
    value: function hasErrors(path) {
      if (path) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.errors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref = _step.value;

            var _ref2 = _slicedToArray(_ref, 1);

            var candidate = _ref2[0];

            if (matchPath(path, candidate)) {
              return true;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return false;
      } else {
        return this.errors.length > 0;
      }
    }
  }, {
    key: 'addError',
    value: function addError(path, expectedType, message) {
      this.errors.push([path, message, expectedType]);
      return this;
    }
  }, {
    key: 'clearError',
    value: function clearError(path) {
      var didClear = false;
      if (path) {
        var _errors = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.errors[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var error = _step2.value;

            if (matchPath(path, error[0])) {
              didClear = true;
            } else {
              _errors.push(error);
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        this.errors = _errors;
      } else {
        didClear = this.errors.length > 0;
        this.errors = [];
      }
      return didClear;
    }
  }, {
    key: 'resolvePath',
    value: function resolvePath(path) {
      return _resolvePath(this.input, path);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return (0, _makeJSONError2.default)(this);
    }
  }]);

  return Validation;
}();

exports.default = Validation;
function stringifyPath(path) {
  if (!path.length) {
    return 'Value';
  }
  var length = path.length;

  var parts = new Array(length);
  for (var i = 0; i < length; i++) {
    var part = path[i];
    if (part === '[[Return Type]]') {
      parts[i] = 'Return Type';
    } else if (typeof part !== 'string' || !validIdentifier.test(part)) {
      parts[i] = '[' + String(part) + ']';
    } else if (i > 0) {
      parts[i] = '.' + part;
    } else {
      parts[i] = part;
    }
  }
  return parts.join('');
}

function _resolvePath(input, path) {
  var subject = input;
  var length = path.length;

  for (var i = 0; i < length; i++) {
    if (subject == null) {
      return undefined;
    }
    var part = path[i];
    if (part === '[[Return Type]]') {
      continue;
    }
    if (subject instanceof Map) {
      subject = subject.get(part);
    } else {
      subject = subject[part];
    }
  }
  return subject;
}

exports.resolvePath = _resolvePath;
function matchPath(path, candidate) {
  var length = path.length;

  if (length > candidate.length) {
    return false;
  }
  for (var i = 0; i < length; i++) {
    if (candidate[i] !== path[i]) {
      return false;
    }
  }
  return true;
}
});

var RuntimeTypeError_1 = createCommonjsModule(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RuntimeTypeError = function (_TypeError) {
  _inherits(RuntimeTypeError, _TypeError);

  function RuntimeTypeError() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RuntimeTypeError);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RuntimeTypeError.__proto__ || Object.getPrototypeOf(RuntimeTypeError)).call.apply(_ref, [this].concat(args))), _this), _this.name = "RuntimeTypeError", _temp), _possibleConstructorReturn(_this, _ret);
  }

  return RuntimeTypeError;
}(TypeError);

exports.default = RuntimeTypeError;
});

var makeTypeError_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = makeTypeError;

var _Validation = Validation_1;

var _RuntimeTypeError = RuntimeTypeError_1;

var _RuntimeTypeError2 = _interopRequireDefault(_RuntimeTypeError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var delimiter = '\n-------------------------------------------------\n\n';

function makeTypeError(validation) {
  if (!validation.hasErrors()) {
    return;
  }
  var input = validation.input,
      context = validation.context;

  var collected = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = validation.errors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = _slicedToArray(_ref, 3);

      var path = _ref2[0];
      var message = _ref2[1];
      var expectedType = _ref2[2];

      var expected = expectedType ? expectedType.toString() : "*";
      var actual = context.typeOf((0, _Validation.resolvePath)(input, path)).toString();

      var field = (0, _Validation.stringifyPath)(validation.inputName ? [validation.inputName].concat(path) : path);

      collected.push(field + ' ' + message + '\n\nExpected: ' + expected + '\n\nActual: ' + actual + '\n');
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var error = new _RuntimeTypeError2.default(collected.join(delimiter));
  return error;
}
});

var makeError_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeError;

var _makeTypeError = makeTypeError_1;

var _makeTypeError2 = _interopRequireDefault(_makeTypeError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeError(expected, input) {
  var context = expected.context;

  var validation = context.validate(expected, input);
  return (0, _makeTypeError2.default)(validation);
}
});

var Type_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _makeError = makeError_1;

var _makeError2 = _interopRequireDefault(_makeError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * # Type
 *
 * This is the base class for all types.
 */
var Type = function () {
  function Type(context) {
    _classCallCheck(this, Type);

    this.typeName = 'Type';

    this.context = context;
  }

  _createClass(Type, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      return false;
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      throw new Error('Not implemented.');
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      throw new Error('Not implemented.');
    }
  }, {
    key: 'assert',
    value: function assert(input) {
      var error = (0, _makeError2.default)(this, input);
      if (error) {
        if (typeof Error.captureStackTrace === 'function') {
          Error.captureStackTrace(error, this.assert);
        }
        throw error;
      }
      return input;
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this;
    }

    // Issue 252

  }, {
    key: Symbol.hasInstance,
    value: function value(input) {
      return this.accepts(input);
    }
  }, {
    key: 'toString',
    value: function toString() {
      throw new Error('Not implemented.');
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);

  return Type;
}();

exports.default = Type;
});

var AnyType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnyType = function (_Type) {
  _inherits(AnyType, _Type);

  function AnyType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AnyType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AnyType.__proto__ || Object.getPrototypeOf(AnyType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'AnyType', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AnyType, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      return false;
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return true;
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      return true;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'any';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);

  return AnyType;
}(_Type3.default);

exports.default = AnyType;
});

var errorMessages_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var errorMessages = {
  ERR_CONSTRAINT_VIOLATION: 'violated a constraint',
  ERR_EXPECT_ARRAY: 'must be an Array',
  ERR_EXPECT_TRUE: 'must be true',
  ERR_EXPECT_FALSE: 'must be false',
  ERR_EXPECT_BOOLEAN: 'must be true or false',
  ERR_EXPECT_EMPTY: 'must be empty',
  ERR_EXPECT_EXACT_VALUE: 'must be exactly $0',
  ERR_EXPECT_CALLABLE: 'must be callable',
  ERR_EXPECT_CLASS: 'must be a Class of $0',
  ERR_EXPECT_FUNCTION: 'must be a function',
  ERR_EXPECT_GENERATOR: 'must be a generator function',
  ERR_EXPECT_ITERABLE: 'must be iterable',
  ERR_EXPECT_ARGUMENT: 'argument "$0" must be: $1',
  ERR_EXPECT_RETURN: 'expected return type of: $0',
  ERR_EXPECT_N_ARGUMENTS: 'requires $0 argument(s)',
  ERR_EXPECT_INSTANCEOF: 'must be an instance of $0',
  ERR_EXPECT_KEY_TYPE: 'keys must be: $0',
  ERR_EXPECT_NULL: 'must be null',
  ERR_EXPECT_NUMBER: 'must be a number',
  ERR_EXPECT_OBJECT: 'must be an object',
  ERR_EXPECT_PROMISE: 'must be promise of $0',
  ERR_EXPECT_STRING: 'must be a string',
  ERR_EXPECT_SYMBOL: 'must be a symbol',
  ERR_EXPECT_VOID: 'must be undefined',
  ERR_INVALID_DATE: 'must be a valid date',
  ERR_NO_INDEXER: 'is not one of the permitted indexer types',
  ERR_NO_UNION: 'must be one of: $0',
  ERR_UNKNOWN_KEY: 'should not contain the key: "$0"'
};

exports.default = errorMessages;
});

var getErrorMessage_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getErrorMessage;

var _errorMessages = errorMessages_1;

var _errorMessages2 = _interopRequireDefault(_errorMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getErrorMessage(key) {
  for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  var message = _errorMessages2.default[key];
  if (params.length > 0) {
    return message.replace(/\$(\d+)/g, function (m, i) {
      return params[i];
    });
  } else {
    return message;
  }
}
});

var cyclic = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inValidationCycle = inValidationCycle;
exports.startValidationCycle = startValidationCycle;
exports.endValidationCycle = endValidationCycle;
exports.inToStringCycle = inToStringCycle;
exports.startToStringCycle = startToStringCycle;
exports.endToStringCycle = endToStringCycle;


// Tracks whether we're in validation of cyclic objects.
var cyclicValidation = new WeakMap();
// Tracks whether we're toString() of cyclic objects.


var cyclicToString = new WeakSet();

function inValidationCycle(type, input) {
  var tracked = cyclicValidation.get(type);
  if (!tracked) {
    return false;
  } else {
    return tracked.has(input);
  }
}

function startValidationCycle(type, input) {
  var tracked = cyclicValidation.get(type);
  if (!tracked) {
    tracked = new WeakSet();
    cyclicValidation.set(type, tracked);
  }
  tracked.add(input);
}

function endValidationCycle(type, input) {
  var tracked = cyclicValidation.get(type);
  if (tracked) {
    tracked.delete(input);
  }
}

function inToStringCycle(type) {
  return cyclicToString.has(type);
}

function startToStringCycle(type) {
  cyclicToString.add(type);
}

function endToStringCycle(type) {
  cyclicToString.delete(type);
}
});

var ArrayType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

var _getErrorMessage = getErrorMessage_1;

var _getErrorMessage2 = _interopRequireDefault(_getErrorMessage);

var _cyclic = cyclic;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArrayType = function (_Type) {
  _inherits(ArrayType, _Type);

  function ArrayType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ArrayType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ArrayType.__proto__ || Object.getPrototypeOf(ArrayType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ArrayType', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ArrayType, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      if (!Array.isArray(input)) {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_ARRAY'));
        return true;
      }
      if ((0, _cyclic.inValidationCycle)(this, input)) {
        return false;
      }
      (0, _cyclic.startValidationCycle)(this, input);
      var elementType = this.elementType;
      var length = input.length;


      var hasErrors = false;
      for (var i = 0; i < length; i++) {
        if (elementType.collectErrors(validation, path.concat(i), input[i])) {
          hasErrors = true;
        }
      }
      (0, _cyclic.endValidationCycle)(this, input);
      return hasErrors;
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      if (!Array.isArray(input)) {
        return false;
      }
      if ((0, _cyclic.inValidationCycle)(this, input)) {
        return true;
      }
      (0, _cyclic.startValidationCycle)(this, input);
      var elementType = this.elementType;
      var length = input.length;

      for (var i = 0; i < length; i++) {
        if (!elementType.accepts(input[i])) {
          (0, _cyclic.endValidationCycle)(this, input);
          return false;
        }
      }
      (0, _cyclic.endValidationCycle)(this, input);
      return true;
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      return input instanceof ArrayType && this.elementType.acceptsType(input.elementType);
    }
  }, {
    key: 'toString',
    value: function toString() {
      var elementType = this.elementType;

      if ((0, _cyclic.inToStringCycle)(this)) {
        if (typeof elementType.name === 'string') {
          return 'Array<$Cycle<' + elementType.name + '>>';
        } else {
          return 'Array<$Cycle<Object>>';
        }
      }
      (0, _cyclic.startToStringCycle)(this);
      var output = 'Array<' + elementType.toString() + '>';
      (0, _cyclic.endToStringCycle)(this);
      return output;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        elementType: this.elementType
      };
    }
  }]);

  return ArrayType;
}(_Type3.default);

exports.default = ArrayType;
});

var BooleanLiteralType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

var _getErrorMessage = getErrorMessage_1;

var _getErrorMessage2 = _interopRequireDefault(_getErrorMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BooleanLiteralType = function (_Type) {
  _inherits(BooleanLiteralType, _Type);

  function BooleanLiteralType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BooleanLiteralType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BooleanLiteralType.__proto__ || Object.getPrototypeOf(BooleanLiteralType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'BooleanLiteralType', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BooleanLiteralType, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      if (input !== this.value) {
        validation.addError(path, this, (0, _getErrorMessage2.default)(this.value ? 'ERR_EXPECT_TRUE' : 'ERR_EXPECT_FALSE'));
        return true;
      }
      return false;
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return input === this.value;
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      return input instanceof BooleanLiteralType && input.value === this.value;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.value ? 'true' : 'false';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        type: this.typeName,
        value: this.value
      };
    }
  }]);

  return BooleanLiteralType;
}(_Type3.default);

exports.default = BooleanLiteralType;
});

var BooleanType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

var _BooleanLiteralType = BooleanLiteralType_1;

var _BooleanLiteralType2 = _interopRequireDefault(_BooleanLiteralType);

var _getErrorMessage = getErrorMessage_1;

var _getErrorMessage2 = _interopRequireDefault(_getErrorMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BooleanType = function (_Type) {
  _inherits(BooleanType, _Type);

  function BooleanType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BooleanType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BooleanType.__proto__ || Object.getPrototypeOf(BooleanType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'BooleanType', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BooleanType, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      if (typeof input !== 'boolean') {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_BOOLEAN'));
        return true;
      }
      return false;
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return typeof input === 'boolean';
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      return input instanceof BooleanType || input instanceof _BooleanLiteralType2.default;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'boolean';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);

  return BooleanType;
}(_Type3.default);

exports.default = BooleanType;
});

var EmptyType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

var _getErrorMessage = getErrorMessage_1;

var _getErrorMessage2 = _interopRequireDefault(_getErrorMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmptyType = function (_Type) {
  _inherits(EmptyType, _Type);

  function EmptyType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EmptyType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EmptyType.__proto__ || Object.getPrototypeOf(EmptyType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'EmptyType', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EmptyType, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_EMPTY'));
      return true;
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return false; // empty types accepts nothing.
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      return input instanceof EmptyType;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'empty';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);

  return EmptyType;
}(_Type3.default);

exports.default = EmptyType;
});

var ExistentialType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExistentialType = function (_Type) {
  _inherits(ExistentialType, _Type);

  function ExistentialType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ExistentialType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ExistentialType.__proto__ || Object.getPrototypeOf(ExistentialType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ExistentialType', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ExistentialType, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      return false;
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return true;
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      return true;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '*';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);

  return ExistentialType;
}(_Type3.default);

exports.default = ExistentialType;
});

var FunctionTypeParam_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FunctionTypeParam = function (_Type) {
  _inherits(FunctionTypeParam, _Type);

  function FunctionTypeParam() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FunctionTypeParam);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FunctionTypeParam.__proto__ || Object.getPrototypeOf(FunctionTypeParam)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'FunctionTypeParam', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FunctionTypeParam, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      var optional = this.optional,
          type = this.type;

      if (optional && input === undefined) {
        return false;
      } else {
        return type.collectErrors(validation, path, input);
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var optional = this.optional,
          type = this.type;

      if (optional && input === undefined) {
        return true;
      } else {
        return type.accepts(input);
      }
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      if (input instanceof FunctionTypeParam) {
        return this.type.acceptsType(input.type);
      } else {
        return this.type.acceptsType(input);
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      var optional = this.optional,
          type = this.type;

      return '' + this.name + (optional ? '?' : '') + ': ' + type.toString();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        name: this.name,
        optional: this.optional,
        type: this.type
      };
    }
  }]);

  return FunctionTypeParam;
}(_Type3.default);

exports.default = FunctionTypeParam;
});

var FunctionTypeRestParam_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

var _FunctionTypeParam = FunctionTypeParam_1;

var _FunctionTypeParam2 = _interopRequireDefault(_FunctionTypeParam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FunctionTypeRestParam = function (_Type) {
  _inherits(FunctionTypeRestParam, _Type);

  function FunctionTypeRestParam() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FunctionTypeRestParam);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FunctionTypeRestParam.__proto__ || Object.getPrototypeOf(FunctionTypeRestParam)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'FunctionTypeRestParam', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FunctionTypeRestParam, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      var type = this.type;

      return type.collectErrors(validation, path, input);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var type = this.type;

      return type.accepts(input);
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      if (input instanceof _FunctionTypeParam2.default || input instanceof FunctionTypeRestParam) {
        return this.type.acceptsType(input.type);
      } else {
        return this.type.acceptsType(input);
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      var type = this.type;

      return '...' + this.name + ': ' + type.toString();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        name: this.name,
        type: this.type
      };
    }
  }]);

  return FunctionTypeRestParam;
}(_Type3.default);

exports.default = FunctionTypeRestParam;
});

var symbols$1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ParentSymbol = exports.ParentSymbol = Symbol('Parent');
var NameRegistrySymbol = exports.NameRegistrySymbol = Symbol('NameRegistry');
var ModuleRegistrySymbol = exports.ModuleRegistrySymbol = Symbol('ModuleRegistry');
var CurrentModuleSymbol = exports.CurrentModuleSymbol = Symbol('CurrentModule');
var TypeConstructorRegistrySymbol = exports.TypeConstructorRegistrySymbol = Symbol('TypeConstructorRegistry');
var InferrerSymbol = exports.InferrerSymbol = Symbol('Inferrer');
var TraverseValueSymbol = exports.TraverseValueSymbol = Symbol('TraverseValue');
var TraverseTypeSymbol = exports.TraverseTypeSymbol = Symbol('TraverseType');
var TypeSymbol = exports.TypeSymbol = Symbol('Type');
var TypeParametersSymbol = exports.TypeParametersSymbol = Symbol('TypeParametersSymbol');
});

var FunctionType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

var _FunctionTypeParam = FunctionTypeParam_1;

var _FunctionTypeParam2 = _interopRequireDefault(_FunctionTypeParam);

var _FunctionTypeRestParam = FunctionTypeRestParam_1;

var _FunctionTypeRestParam2 = _interopRequireDefault(_FunctionTypeRestParam);

var _getErrorMessage = getErrorMessage_1;

var _getErrorMessage2 = _interopRequireDefault(_getErrorMessage);

var _symbols = symbols$1;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FunctionType = function (_Type) {
  _inherits(FunctionType, _Type);

  function FunctionType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FunctionType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FunctionType.__proto__ || Object.getPrototypeOf(FunctionType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'FunctionType', _this.params = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FunctionType, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      if (typeof input !== 'function') {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_FUNCTION'));
        return true;
      }
      var annotation = input[_symbols.TypeSymbol];
      if (annotation) {
        var returnType = this.returnType,
            params = this.params;

        var hasErrors = false;
        for (var i = 0; i < params.length; i++) {
          var param = params[i];
          var annotationParam = annotation.params[i];
          if (!annotationParam && !param.optional) {
            validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_ARGUMENT', param.name, param.type.toString()));
            hasErrors = true;
          } else if (!param.acceptsType(annotationParam)) {
            validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_ARGUMENT', param.name, param.type.toString()));
            hasErrors = true;
          }
        }
        if (!returnType.acceptsType(annotation.returnType)) {
          validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_RETURN', returnType.toString()));
          hasErrors = true;
        }
        return hasErrors;
      } else {
        // We can only do weak checking without a type annotation.
        var _params = this.params;

        if (_params.length > input.length) {
          // function might not have enough parameters,
          // see how many are really required.
          var needed = 0;
          for (var _i = 0; _i < _params.length; _i++) {
            var _param = _params[_i];
            if (!_param.optional) {
              needed++;
            }
          }
          if (needed > input.length) {
            validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_N_ARGUMENTS', needed));
            return true;
          }
        }
      }
      return false;
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      if (typeof input !== 'function') {
        return false;
      }
      var params = this.params;

      var annotation = input[_symbols.TypeSymbol];
      if (annotation) {
        var returnType = this.returnType,
            _params2 = this.params;

        for (var i = 0; i < _params2.length; i++) {
          var param = _params2[i];
          var annotationParam = annotation.params[i];
          if (!annotationParam && !param.optional) {
            return false;
          } else if (!param.acceptsType(annotationParam)) {
            return false;
          }
        }
        if (!returnType.acceptsType(annotation.returnType)) {
          return false;
        }
        return true;
      } else if (params.length > input.length) {
        // function might not have enough parameters,
        // see how many are really required.
        var needed = 0;
        for (var _i2 = 0; _i2 < params.length; _i2++) {
          var _param2 = params[_i2];
          if (!_param2.optional) {
            needed++;
          }
        }
        if (needed > input.length) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      if (!(input instanceof FunctionType)) {
        return false;
      }
      var returnType = this.returnType;
      var inputReturnType = input.returnType;
      if (!returnType.acceptsType(inputReturnType)) {
        return false;
      }
      var params = this.params;
      var inputParams = input.params;
      if (inputParams.length < params.length) {
        return false;
      }
      for (var i = 0; i < params.length; i++) {
        var param = params[i];
        var inputParam = inputParams[i];
        if (!param.acceptsType(inputParam)) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'acceptsParams',
    value: function acceptsParams() {
      var params = this.params,
          rest = this.rest;

      var paramsLength = params.length;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var argsLength = args.length;
      for (var i = 0; i < paramsLength; i++) {
        var param = params[i];
        if (i < argsLength) {
          if (!param.accepts(args[i])) {
            return false;
          }
        } else if (!param.accepts(undefined)) {
          return false;
        }
      }

      if (argsLength > paramsLength && rest) {
        for (var _i3 = paramsLength; _i3 < argsLength; _i3++) {
          if (!rest.accepts(args[_i3])) {
            return false;
          }
        }
      }

      return true;
    }
  }, {
    key: 'acceptsReturn',
    value: function acceptsReturn(input) {
      return this.returnType.accepts(input);
    }
  }, {
    key: 'assertParams',
    value: function assertParams() {
      var params = this.params,
          rest = this.rest;

      var paramsLength = params.length;

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var argsLength = args.length;
      for (var i = 0; i < paramsLength; i++) {
        var param = params[i];
        if (i < argsLength) {
          param.assert(args[i]);
        } else {
          param.assert(undefined);
        }
      }

      if (argsLength > paramsLength && rest) {
        for (var _i4 = paramsLength; _i4 < argsLength; _i4++) {
          rest.assert(args[_i4]);
        }
      }

      return args;
    }
  }, {
    key: 'assertReturn',
    value: function assertReturn(input) {
      this.returnType.assert(input);
      return input;
    }
  }, {
    key: 'toString',
    value: function toString() {
      var params = this.params,
          rest = this.rest,
          returnType = this.returnType;

      var args = [];
      for (var i = 0; i < params.length; i++) {
        args.push(params[i].toString());
      }
      if (rest) {
        args.push(rest.toString());
      }
      return '(' + args.join(', ') + ') => ' + returnType.toString();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        params: this.params,
        rest: this.rest,
        returnType: this.returnType
      };
    }
  }]);

  return FunctionType;
}(_Type3.default);

exports.default = FunctionType;
});

var FunctionTypeReturn_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FunctionTypeReturn = function (_Type) {
  _inherits(FunctionTypeReturn, _Type);

  function FunctionTypeReturn() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FunctionTypeReturn);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FunctionTypeReturn.__proto__ || Object.getPrototypeOf(FunctionTypeReturn)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'FunctionTypeReturn', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FunctionTypeReturn, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      var type = this.type;

      return type.collectErrors(validation, path.concat('[[Return Type]]'), input);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var type = this.type;

      return type.accepts(input);
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      if (input instanceof FunctionTypeReturn) {
        return this.type.acceptsType(input.type);
      } else {
        return this.type.acceptsType(input);
      }
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type;
    }
  }, {
    key: 'toString',
    value: function toString() {
      var type = this.type;

      return type.toString();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        type: this.type
      };
    }
  }]);

  return FunctionTypeReturn;
}(_Type3.default);

exports.default = FunctionTypeReturn;
});

var GeneratorType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

var _getErrorMessage = getErrorMessage_1;

var _getErrorMessage2 = _interopRequireDefault(_getErrorMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GeneratorType = function (_Type) {
  _inherits(GeneratorType, _Type);

  function GeneratorType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GeneratorType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GeneratorType.__proto__ || Object.getPrototypeOf(GeneratorType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'GeneratorType', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GeneratorType, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      var isValid = input && typeof input.next === 'function' && typeof input.return === 'function' && typeof input.throw === 'function';
      if (isValid) {
        return false;
      } else {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_GENERATOR'));
        return true;
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return input && typeof input.next === 'function' && typeof input.return === 'function' && typeof input.throw === 'function';
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      if (!(input instanceof GeneratorType)) {
        return this.yieldType.accepts(input);
      }
      return this.yieldType.acceptsType(input.yieldType) && this.returnType.acceptsType(input.returnType) && this.nextType.acceptsType(input.nextType);
    }
  }, {
    key: 'acceptsYield',
    value: function acceptsYield(input) {
      return this.yieldType.accepts(input);
    }
  }, {
    key: 'acceptsReturn',
    value: function acceptsReturn(input) {
      return this.returnType.accepts(input);
    }
  }, {
    key: 'acceptsNext',
    value: function acceptsNext(input) {
      return this.nextType.accepts(input);
    }
  }, {
    key: 'assertYield',
    value: function assertYield(input) {
      return this.yieldType.assert(input);
    }
  }, {
    key: 'assertReturn',
    value: function assertReturn(input) {
      return this.returnType.assert(input);
    }
  }, {
    key: 'assertNext',
    value: function assertNext(input) {
      return this.nextType.assert(input);
    }
  }, {
    key: 'toString',
    value: function toString() {
      var yieldType = this.yieldType,
          returnType = this.returnType,
          nextType = this.nextType;

      return 'Generator<' + yieldType.toString() + ', ' + returnType.toString() + ', ' + nextType.toString();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        yieldType: this.yieldType,
        returnType: this.returnType,
        nextType: this.nextType
      };
    }
  }]);

  return GeneratorType;
}(_Type3.default);

exports.default = GeneratorType;
});

var TypeParameterApplication_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * # TypeParameterApplication
 *
 */
var TypeParameterApplication = function (_Type) {
  _inherits(TypeParameterApplication, _Type);

  function TypeParameterApplication() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TypeParameterApplication);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TypeParameterApplication.__proto__ || Object.getPrototypeOf(TypeParameterApplication)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TypeParameterApplication', _this.typeInstances = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TypeParameterApplication, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      var parent = this.parent,
          typeInstances = this.typeInstances;

      return parent.collectErrors.apply(parent, [validation, path, input].concat(_toConsumableArray(typeInstances)));
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var parent = this.parent,
          typeInstances = this.typeInstances;

      return parent.accepts.apply(parent, [input].concat(_toConsumableArray(typeInstances)));
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      return this.parent.acceptsType(input);
    }
  }, {
    key: 'hasProperty',
    value: function hasProperty(name) {
      var inner = this.parent;
      if (inner && typeof inner.hasProperty === 'function') {
        var _ref2;

        return (_ref2 = inner).hasProperty.apply(_ref2, [name].concat(_toConsumableArray(this.typeInstances)));
      } else {
        return false;
      }
    }
  }, {
    key: 'getProperty',
    value: function getProperty(name) {
      var inner = this.parent;
      if (inner && typeof inner.getProperty === 'function') {
        var _ref3;

        return (_ref3 = inner).getProperty.apply(_ref3, [name].concat(_toConsumableArray(this.typeInstances)));
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      var parent = this.parent,
          typeInstances = this.typeInstances;
      var name = parent.name;

      if (typeInstances.length) {
        var items = [];
        for (var i = 0; i < typeInstances.length; i++) {
          var typeInstance = typeInstances[i];
          items.push(typeInstance.toString());
        }
        return name + '<' + items.join(', ') + '>';
      } else {
        return name;
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        typeInstances: this.typeInstances
      };
    }
  }]);

  return TypeParameterApplication;
}(_Type3.default);

exports.default = TypeParameterApplication;
});

var TypeConstructor_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

var _TypeParameterApplication = TypeParameterApplication_1;

var _TypeParameterApplication2 = _interopRequireDefault(_TypeParameterApplication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TypeConstructor = function (_Type) {
  _inherits(TypeConstructor, _Type);

  function TypeConstructor() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TypeConstructor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TypeConstructor.__proto__ || Object.getPrototypeOf(TypeConstructor)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TypeConstructor', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TypeConstructor, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      throw new Error('Not implemented: collectErrors().');
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      throw new Error('Not implemented: accepts().');
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      throw new Error('Not implemented: acceptsType().');
    }
  }, {
    key: 'inferTypeParameters',
    value: function inferTypeParameters(input) {
      throw new Error('No inferrer for ' + this.name + '.');
    }
  }, {
    key: 'apply',
    value: function apply() {
      var target = new _TypeParameterApplication2.default(this.context);
      target.parent = this;

      for (var _len2 = arguments.length, typeInstances = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        typeInstances[_key2] = arguments[_key2];
      }

      target.typeInstances = typeInstances;
      return target;
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      var impl = this.impl;

      if (impl) {
        return impl;
      } else {
        return this;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.name;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        name: this.name
      };
    }
  }]);

  return TypeConstructor;
}(_Type3.default);

exports.default = TypeConstructor;
});

var GenericType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TypeConstructor2 = TypeConstructor_1;

var _TypeConstructor3 = _interopRequireDefault(_TypeConstructor2);

var _getErrorMessage = getErrorMessage_1;

var _getErrorMessage2 = _interopRequireDefault(_getErrorMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GenericType = function (_TypeConstructor) {
  _inherits(GenericType, _TypeConstructor);

  function GenericType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GenericType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GenericType.__proto__ || Object.getPrototypeOf(GenericType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'GenericType', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GenericType, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      var name = this.name,
          impl = this.impl;

      if (input instanceof impl) {
        return false;
      }
      validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_INSTANCEOF', name));
      return true;
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return input instanceof this.impl;
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      return input instanceof GenericType && input.impl === this.impl;
    }
  }, {
    key: 'inferTypeParameters',
    value: function inferTypeParameters(input) {
      return [];
    }
  }]);

  return GenericType;
}(_TypeConstructor3.default);

exports.default = GenericType;
});

var IntersectionType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IntersectionType = function (_Type) {
  _inherits(IntersectionType, _Type);

  function IntersectionType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, IntersectionType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IntersectionType.__proto__ || Object.getPrototypeOf(IntersectionType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'IntersectionType', _this.types = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(IntersectionType, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      var types = this.types;
      var length = types.length;

      var hasErrors = false;
      for (var i = 0; i < length; i++) {
        var type = types[i];
        if (type.collectErrors(validation, path, input)) {
          hasErrors = true;
        }
      }
      return hasErrors;
    }

    /**
     * Get a property with the given name, or undefined if it does not exist.
     */

  }, {
    key: 'getProperty',
    value: function getProperty(key) {
      var types = this.types;
      var length = types.length;

      for (var i = length - 1; i >= 0; i--) {
        var type = types[i];
        if (typeof type.getProperty === 'function') {
          var prop = type.getProperty(key);
          if (prop) {
            return prop;
          }
        }
      }
    }

    /**
     * Determine whether a property with the given name exists.
     */

  }, {
    key: 'hasProperty',
    value: function hasProperty(key) {
      var types = this.types;
      var length = types.length;

      for (var i = 0; i < length; i++) {
        var type = types[i];
        if (typeof type.hasProperty === 'function' && type.hasProperty(key)) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var types = this.types;
      var length = types.length;

      for (var i = 0; i < length; i++) {
        var type = types[i];
        if (!type.accepts(input)) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      var types = this.types;
      if (input instanceof IntersectionType) {
        var inputTypes = input.types;
        loop: for (var i = 0; i < types.length; i++) {
          var type = types[i];
          for (var j = 0; j < inputTypes.length; j++) {
            if (type.acceptsType(inputTypes[i])) {
              continue loop;
            }
          }
          // if we got this far then nothing accepted this type.
          return false;
        }
        return true;
      } else {
        for (var _i = 0; _i < types.length; _i++) {
          var _type = types[_i];
          if (!_type.acceptsType(input)) {
            return false;
          }
        }
        return true;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.types.join(' & ');
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        types: this.types
      };
    }
  }]);

  return IntersectionType;
}(_Type3.default);

exports.default = IntersectionType;
});

var MixedType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MixedType = function (_Type) {
  _inherits(MixedType, _Type);

  function MixedType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MixedType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MixedType.__proto__ || Object.getPrototypeOf(MixedType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'MixedType', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MixedType, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      return false;
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return true;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'mixed';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);

  return MixedType;
}(_Type3.default);

exports.default = MixedType;
});

var TypeAlias_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

var _TypeParameterApplication = TypeParameterApplication_1;

var _TypeParameterApplication2 = _interopRequireDefault(_TypeParameterApplication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TypeAlias = function (_Type) {
  _inherits(TypeAlias, _Type);

  function TypeAlias() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TypeAlias);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TypeAlias.__proto__ || Object.getPrototypeOf(TypeAlias)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TypeAlias', _this.constraints = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TypeAlias, [{
    key: 'addConstraint',
    value: function addConstraint(constraint) {
      this.constraints.push(constraint);
      return this;
    }
  }, {
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      var constraints = this.constraints,
          type = this.type;

      var hasErrors = false;
      if (type.collectErrors(validation, path, input)) {
        hasErrors = true;
      }
      var length = constraints.length;

      for (var i = 0; i < length; i++) {
        var constraint = constraints[i];
        var violation = constraint(input);
        if (typeof violation === 'string') {
          validation.addError(path, this, violation);
          hasErrors = true;
        }
      }
      return hasErrors;
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var constraints = this.constraints,
          type = this.type;

      if (!type.accepts(input)) {
        return false;
      }
      var length = constraints.length;

      for (var i = 0; i < length; i++) {
        var constraint = constraints[i];
        if (typeof constraint(input) === 'string') {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      return this.type.acceptsType(input);
    }
  }, {
    key: 'apply',
    value: function apply() {
      var target = new _TypeParameterApplication2.default(this.context);
      target.parent = this;

      for (var _len2 = arguments.length, typeInstances = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        typeInstances[_key2] = arguments[_key2];
      }

      target.typeInstances = typeInstances;
      return target;
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type.unwrap();
    }
  }, {
    key: 'hasProperty',
    value: function hasProperty(name) {
      var inner = this.unwrap();
      if (inner && typeof inner.hasProperty === 'function') {
        return inner.hasProperty(name);
      } else {
        return false;
      }
    }
  }, {
    key: 'getProperty',
    value: function getProperty(name) {
      var inner = this.unwrap();
      if (inner && typeof inner.getProperty === 'function') {
        return inner.getProperty(name);
      }
    }
  }, {
    key: 'toString',
    value: function toString(withDeclaration) {
      var name = this.name,
          type = this.type;

      if (withDeclaration) {
        return 'type ' + name + ' = ' + type.toString() + ';';
      } else {
        return name;
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        name: this.name,
        type: this.type
      };
    }
  }]);

  return TypeAlias;
}(_Type3.default);

exports.default = TypeAlias;
});

var NullableType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NullableType = function (_Type) {
  _inherits(NullableType, _Type);

  function NullableType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, NullableType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NullableType.__proto__ || Object.getPrototypeOf(NullableType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'NullableType', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NullableType, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      if (input === null) {
        return false;
      } else {
        return this.type.collectErrors(validation, path, input);
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      if (input == null) {
        return true;
      } else {
        return this.type.accepts(input);
      }
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      if (input instanceof NullableType) {
        return this.type.acceptsType(input.type);
      } else {
        return this.type.acceptsType(input);
      }
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '? ' + this.type.toString();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        type: this.type
      };
    }
  }]);

  return NullableType;
}(_Type3.default);

exports.default = NullableType;
});

var NullLiteralType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

var _getErrorMessage = getErrorMessage_1;

var _getErrorMessage2 = _interopRequireDefault(_getErrorMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NullLiteralType = function (_Type) {
  _inherits(NullLiteralType, _Type);

  function NullLiteralType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, NullLiteralType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NullLiteralType.__proto__ || Object.getPrototypeOf(NullLiteralType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'NullLiteralType', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NullLiteralType, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      if (input === null) {
        return false;
      }
      validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_NULL'));
      return true;
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return input === null;
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      return input instanceof NullLiteralType;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'null';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);

  return NullLiteralType;
}(_Type3.default);

exports.default = NullLiteralType;
});

var NumericLiteralType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

var _getErrorMessage = getErrorMessage_1;

var _getErrorMessage2 = _interopRequireDefault(_getErrorMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NumericLiteralType = function (_Type) {
  _inherits(NumericLiteralType, _Type);

  function NumericLiteralType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, NumericLiteralType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NumericLiteralType.__proto__ || Object.getPrototypeOf(NumericLiteralType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'NumericLiteralType', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NumericLiteralType, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      var value = this.value;

      if (input === value) {
        return false;
      } else {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_EXACT_VALUE', value));
        return false;
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return input === this.value;
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      return input instanceof NumericLiteralType && input.value === this.value;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '' + this.value;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        value: this.value
      };
    }
  }]);

  return NumericLiteralType;
}(_Type3.default);

exports.default = NumericLiteralType;
});

var NumberType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

var _NumericLiteralType = NumericLiteralType_1;

var _NumericLiteralType2 = _interopRequireDefault(_NumericLiteralType);

var _getErrorMessage = getErrorMessage_1;

var _getErrorMessage2 = _interopRequireDefault(_getErrorMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NumberType = function (_Type) {
  _inherits(NumberType, _Type);

  function NumberType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, NumberType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NumberType.__proto__ || Object.getPrototypeOf(NumberType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'NumberType', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NumberType, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      if (typeof input === 'number') {
        return false;
      } else {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_NUMBER'));
        return false;
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return typeof input === 'number';
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      return input instanceof NumberType || input instanceof _NumericLiteralType2.default;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'number';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);

  return NumberType;
}(_Type3.default);

exports.default = NumberType;
});

var ObjectTypeProperty_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObjectTypeProperty = function (_Type) {
  _inherits(ObjectTypeProperty, _Type);

  function ObjectTypeProperty() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ObjectTypeProperty);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ObjectTypeProperty.__proto__ || Object.getPrototypeOf(ObjectTypeProperty)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ObjectTypeProperty', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ObjectTypeProperty, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      var optional = this.optional,
          key = this.key,
          value = this.value;

      if (optional && input[key] === undefined) {
        return false;
      }
      return value.collectErrors(validation, path.concat(key), input[key]);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      if (this.optional && input[this.key] === undefined) {
        return true;
      }
      return this.value.accepts(input[this.key]);
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      if (!(input instanceof ObjectTypeProperty)) {
        return false;
      }
      return this.value.acceptsType(input.value);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.value.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '' + this.key + (this.optional ? '?' : '') + ': ' + this.value.toString() + ';';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        key: this.key,
        value: this.value,
        optional: this.optional
      };
    }
  }]);

  return ObjectTypeProperty;
}(_Type3.default);

exports.default = ObjectTypeProperty;
});

var ObjectTypeIndexer_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObjectTypeIndexer = function (_Type) {
  _inherits(ObjectTypeIndexer, _Type);

  function ObjectTypeIndexer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ObjectTypeIndexer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ObjectTypeIndexer.__proto__ || Object.getPrototypeOf(ObjectTypeIndexer)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ObjectTypeIndexer', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ObjectTypeIndexer, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, key, value) {
      var hasErrors = this.key.collectErrors(validation, path.concat('[[Key]]'), key);
      if (this.value.collectErrors(validation, path.concat(key), value)) {
        hasErrors = true;
      }
      return hasErrors;
    }
  }, {
    key: 'accepts',
    value: function accepts(value) {
      return this.value.accepts(value);
    }
  }, {
    key: 'acceptsKey',
    value: function acceptsKey(key) {
      return this.key.accepts(key);
    }
  }, {
    key: 'acceptsValue',
    value: function acceptsValue(value) {
      return this.value.accepts(value);
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      if (!(input instanceof ObjectTypeIndexer)) {
        return false;
      }
      return this.key.acceptsType(input.key) && this.value.acceptsType(input.value);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.value.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '[' + this.id + ': ' + this.key.toString() + ']: ' + this.value.toString() + ';';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        id: this.id,
        key: this.key,
        value: this.value
      };
    }
  }]);

  return ObjectTypeIndexer;
}(_Type3.default);

exports.default = ObjectTypeIndexer;
});

var ObjectTypeCallProperty_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObjectTypeCallProperty = function (_Type) {
  _inherits(ObjectTypeCallProperty, _Type);

  function ObjectTypeCallProperty() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ObjectTypeCallProperty);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ObjectTypeCallProperty.__proto__ || Object.getPrototypeOf(ObjectTypeCallProperty)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ObjectTypeCallProperty', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ObjectTypeCallProperty, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      return this.value.collectErrors(validation, path, input);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return this.value.accepts(input);
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      if (!(input instanceof ObjectTypeCallProperty)) {
        return false;
      }
      return this.value.acceptsType(input.value);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.value.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.value.toString() + ';';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        value: this.value
      };
    }
  }]);

  return ObjectTypeCallProperty;
}(_Type3.default);

exports.default = ObjectTypeCallProperty;
});

var ObjectType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

var _ObjectTypeProperty = ObjectTypeProperty_1;

var _ObjectTypeProperty2 = _interopRequireDefault(_ObjectTypeProperty);

var _ObjectTypeIndexer = ObjectTypeIndexer_1;

var _ObjectTypeIndexer2 = _interopRequireDefault(_ObjectTypeIndexer);

var _ObjectTypeCallProperty = ObjectTypeCallProperty_1;

var _ObjectTypeCallProperty2 = _interopRequireDefault(_ObjectTypeCallProperty);

var _getErrorMessage = getErrorMessage_1;

var _getErrorMessage2 = _interopRequireDefault(_getErrorMessage);

var _cyclic = cyclic;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObjectType = function (_Type) {
  _inherits(ObjectType, _Type);

  function ObjectType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ObjectType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ObjectType.__proto__ || Object.getPrototypeOf(ObjectType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ObjectType', _this.properties = [], _this.indexers = [], _this.callProperties = [], _this.exact = false, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ObjectType, [{
    key: 'getProperty',


    /**
     * Get a property with the given name, or undefined if it does not exist.
     */
    value: function getProperty(key) {
      var properties = this.properties;
      var length = properties.length;

      for (var i = 0; i < length; i++) {
        var property = properties[i];
        if (property.key === key) {
          return property;
        }
      }
      return this.getIndexer(key);
    }

    /**
     * Determine whether a property with the given name exists.
     */

  }, {
    key: 'hasProperty',
    value: function hasProperty(key) {
      var properties = this.properties;
      var length = properties.length;

      for (var i = 0; i < length; i++) {
        var property = properties[i];
        if (property.key === key) {
          return true;
        }
      }
      return this.hasIndexer(key);
    }

    /**
     * Get an indexer with which matches the given key type.
     */

  }, {
    key: 'getIndexer',
    value: function getIndexer(key) {
      var indexers = this.indexers;
      var length = indexers.length;

      for (var i = 0; i < length; i++) {
        var indexer = indexers[i];
        if (indexer.acceptsKey(key)) {
          return indexer;
        }
      }
    }

    /**
     * Determine whether an indexer exists which matches the given key type.
     */

  }, {
    key: 'hasIndexer',
    value: function hasIndexer(key) {
      var indexers = this.indexers;
      var length = indexers.length;

      for (var i = 0; i < length; i++) {
        var indexer = indexers[i];
        if (indexer.acceptsKey(key)) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      if (input === null) {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_OBJECT'));
        return true;
      }

      var hasCallProperties = this.callProperties.length > 0;

      if (hasCallProperties) {
        if (!acceptsCallProperties(this, input)) {
          validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_CALLABLE'));
        }
      } else if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object') {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_OBJECT'));
        return true;
      }
      if ((0, _cyclic.inValidationCycle)(this, input)) {
        return false;
      }
      (0, _cyclic.startValidationCycle)(this, input);

      var result = void 0;

      if (this.indexers.length > 0) {
        result = collectErrorsWithIndexers(this, validation, path, input);
      } else if (this.exact) {
        result = collectErrorsExact(this, validation, path, input);
      } else {
        result = collectErrorsWithoutIndexers(this, validation, path, input);
      }
      (0, _cyclic.endValidationCycle)(this, input);
      return result;
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      if (input === null) {
        return false;
      }
      var hasCallProperties = this.callProperties.length > 0;

      if (hasCallProperties) {
        if (!acceptsCallProperties(this, input)) {
          return false;
        }
      } else if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object') {
        return false;
      }
      if ((0, _cyclic.inValidationCycle)(this, input)) {
        return true;
      }
      (0, _cyclic.startValidationCycle)(this, input);

      var result = void 0;
      if (this.indexers.length > 0) {
        result = acceptsWithIndexers(this, input);
      } else if (this.exact) {
        result = acceptsExact(this, input);
      } else {
        result = acceptsWithoutIndexers(this, input);
      }
      (0, _cyclic.endValidationCycle)(this, input);
      return result;
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      if (!(input instanceof ObjectType)) {
        return false;
      }
      var hasCallProperties = this.callProperties.length > 0;

      if (hasCallProperties && !acceptsTypeCallProperties(this, input)) {
        return false;
      }

      if (this.indexers.length > 0) {
        return acceptsTypeWithIndexers(this, input);
      } else {
        return acceptsTypeWithoutIndexers(this, input);
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      var callProperties = this.callProperties,
          properties = this.properties,
          indexers = this.indexers;

      if ((0, _cyclic.inToStringCycle)(this)) {
        return '$Cycle<Object>';
      }
      (0, _cyclic.startToStringCycle)(this);
      var body = [];
      for (var i = 0; i < callProperties.length; i++) {
        body.push(callProperties[i].toString());
      }
      for (var _i = 0; _i < properties.length; _i++) {
        body.push(properties[_i].toString());
      }
      for (var _i2 = 0; _i2 < indexers.length; _i2++) {
        body.push(indexers[_i2].toString());
      }
      (0, _cyclic.endToStringCycle)(this);
      if (this.exact) {
        return '{|\n' + indent(body.join('\n')) + '\n|}';
      } else {
        return '{\n' + indent(body.join('\n')) + '\n}';
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        callProperties: this.callProperties,
        properties: this.properties,
        indexers: this.indexers,
        exact: this.exact
      };
    }
  }]);

  return ObjectType;
}(_Type3.default);

exports.default = ObjectType;


function acceptsCallProperties(type, input) {
  if (typeof input !== 'function') {
    return false;
  }
  var callProperties = type.callProperties;

  for (var i = 0; i < callProperties.length; i++) {
    var callProperty = callProperties[i];
    if (callProperty.accepts(input)) {
      return true;
    }
  }
  return false;
}

function acceptsTypeCallProperties(type, input) {
  var callProperties = type.callProperties;

  var inputCallProperties = input.callProperties;
  loop: for (var i = 0; i < callProperties.length; i++) {
    var callProperty = callProperties[i];

    for (var j = 0; j < inputCallProperties.length; j++) {
      var inputCallProperty = inputCallProperties[j];
      if (callProperty.acceptsType(inputCallProperty)) {
        continue loop;
      }
    }
    // If we got this far, nothing accepted.
    return false;
  }
  return true;
}

function acceptsWithIndexers(type, input) {
  var properties = type.properties,
      indexers = type.indexers;

  var seen = [];
  for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    if (!property.accepts(input)) {
      return false;
    }
    seen.push(property.key);
  }
  loop: for (var key in input) {
    if (seen.indexOf(key) !== -1) {
      continue;
    }
    var value = input[key];
    for (var _i3 = 0; _i3 < indexers.length; _i3++) {
      var indexer = indexers[_i3];
      if (indexer.acceptsKey(key) && indexer.acceptsValue(value)) {
        continue loop;
      }
    }

    // if we got this far the key / value did not accepts any indexers.
    return false;
  }
  return true;
}

function acceptsTypeWithIndexers(type, input) {
  var indexers = type.indexers,
      properties = type.properties;

  var inputIndexers = input.indexers;
  var inputProperties = input.properties;
  loop: for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    for (var j = 0; j < inputProperties.length; j++) {
      var inputProperty = inputProperties[j];
      if (inputProperty.key === property.key) {
        if (property.acceptsType(inputProperty)) {
          continue loop;
        } else {
          return false;
        }
      }
    }
  }
  loop: for (var _i4 = 0; _i4 < indexers.length; _i4++) {
    var indexer = indexers[_i4];
    for (var _j = 0; _j < inputIndexers.length; _j++) {
      var inputIndexer = inputIndexers[_j];
      if (indexer.acceptsType(inputIndexer)) {
        continue loop;
      }
    }
    // if we got this far, nothing accepted
    return false;
  }
  return true;
}

function acceptsWithoutIndexers(type, input) {
  var properties = type.properties;

  for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    if (!property.accepts(input)) {
      return false;
    }
  }
  return true;
}

function acceptsExact(type, input) {
  var properties = type.properties;
  var length = properties.length;

  loop: for (var key in input) {
    for (var i = 0; i < length; i++) {
      var property = properties[i];
      if (property.key === key) {
        if (!property.accepts(input)) {
          return false;
        }
        continue loop;
      }
    }
    // if we got this far the property does not exist in the object.
    return false;
  }
  return true;
}

function acceptsTypeWithoutIndexers(type, input) {
  var properties = type.properties;

  var inputProperties = input.properties;
  loop: for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    for (var j = 0; j < inputProperties.length; j++) {
      var inputProperty = inputProperties[j];
      if (inputProperty.key === property.key) {
        if (property.acceptsType(inputProperty)) {
          continue loop;
        } else {
          return false;
        }
      }
    }
    return false;
  }
  return true;
}

function collectErrorsWithIndexers(type, validation, path, input) {
  var properties = type.properties,
      indexers = type.indexers;

  var seen = [];
  var hasErrors = false;
  for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    if (property.collectErrors(validation, path, input)) {
      hasErrors = true;
    }
    seen.push(property.key);
  }
  loop: for (var key in input) {
    if (seen.indexOf(key) !== -1) {
      continue;
    }
    var value = input[key];
    for (var _i5 = 0; _i5 < indexers.length; _i5++) {
      var indexer = indexers[_i5];
      if (indexer.acceptsKey(key) && indexer.acceptsValue(value)) {
        continue loop;
      }
    }

    // if we got this far the key / value was not accepted by any indexers.
    validation.addError(path.concat(key), type, (0, _getErrorMessage2.default)('ERR_NO_INDEXER'));
    hasErrors = true;
  }
  return hasErrors;
}

function collectErrorsWithoutIndexers(type, validation, path, input) {
  var properties = type.properties;

  var hasErrors = false;
  for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    if (property.collectErrors(validation, path, input)) {
      hasErrors = true;
    }
  }
  return hasErrors;
}

function collectErrorsExact(type, validation, path, input) {
  var properties = type.properties;
  var length = properties.length;

  var hasErrors = false;
  loop: for (var key in input) {
    for (var i = 0; i < length; i++) {
      var property = properties[i];
      if (property.key === key) {
        if (property.collectErrors(validation, path, input)) {
          hasErrors = true;
        }
        continue loop;
      }
    }
    // if we got this far the property does not exist in the object.
    validation.addError(path, type, (0, _getErrorMessage2.default)('ERR_UNKNOWN_KEY', key));
    hasErrors = true;
  }
  return hasErrors;
}

function indent(input) {
  var lines = input.split('\n');
  var length = lines.length;

  for (var i = 0; i < length; i++) {
    lines[i] = '  ' + lines[i];
  }
  return lines.join('\n');
}
});

var TypeParameter_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * # TypeParameter
 *
 * Type parameters allow polymorphic type safety.
 * The first time a type parameter is checked, it records the shape of its input,
 * this recorded shape is used to check all future inputs for this particular instance.
 */
var TypeParameter = function (_Type) {
  _inherits(TypeParameter, _Type);

  function TypeParameter() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TypeParameter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TypeParameter.__proto__ || Object.getPrototypeOf(TypeParameter)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TypeParameter', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TypeParameter, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      var recorded = this.recorded,
          bound = this.bound,
          context = this.context;


      if (recorded) {
        return recorded.collectErrors(validation, path, input);
      } else if (bound && bound.collectErrors(validation, path, input)) {
        return true;
      }

      this.recorded = context.typeOf(input);
      return false;
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var recorded = this.recorded,
          bound = this.bound,
          context = this.context;


      if (recorded) {
        return recorded.accepts(input);
      } else if (bound && !bound.accepts(input)) {
        return false;
      }
      this.recorded = context.typeOf(input);

      return true;
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      var recorded = this.recorded,
          bound = this.bound;

      if (input instanceof TypeParameter) {
        // We don't need to check for `recorded` or `bound` fields
        // because the input has already been resolved.
        return true;
      } else if (recorded) {
        return recorded.acceptsType(input);
      } else if (bound) {
        return bound.acceptsType(input);
      } else {
        // A generic type parameter accepts any input.
        return true;
      }
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      var recorded = this.recorded,
          bound = this.bound;

      if (recorded) {
        return recorded.unwrap();
      } else if (bound) {
        return bound.unwrap();
      } else {
        return this;
      }
    }
  }, {
    key: 'toString',
    value: function toString(withBinding) {
      var id = this.id,
          bound = this.bound;

      if (withBinding && bound) {
        return id + ': ' + bound.toString();
      }
      return id;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        id: this.id,
        bound: this.bound,
        recorded: this.recorded
      };
    }
  }]);

  return TypeParameter;
}(_Type3.default);

exports.default = TypeParameter;
});

var PartialType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

var _TypeParameter = TypeParameter_1;

var _TypeParameter2 = _interopRequireDefault(_TypeParameter);

var _TypeParameterApplication = TypeParameterApplication_1;

var _TypeParameterApplication2 = _interopRequireDefault(_TypeParameterApplication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PartialType = function (_Type) {
  _inherits(PartialType, _Type);

  function PartialType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PartialType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PartialType.__proto__ || Object.getPrototypeOf(PartialType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'PartialType', _this.typeParameters = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PartialType, [{
    key: 'typeParameter',
    value: function typeParameter(id, bound) {
      var target = new _TypeParameter2.default(this.context);
      target.id = id;
      target.bound = bound;
      this.typeParameters.push(target);
      return target;
    }
  }, {
    key: 'apply',
    value: function apply() {
      var target = new _TypeParameterApplication2.default(this.context);
      target.parent = this;

      for (var _len2 = arguments.length, typeInstances = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        typeInstances[_key2] = arguments[_key2];
      }

      target.typeInstances = typeInstances;
      return target;
    }
  }, {
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      var constraints = this.constraints,
          type = this.type;

      var hasErrors = false;
      if (type.collectErrors(validation, path, input)) {
        hasErrors = true;
      }
      if (constraints) {
        var length = constraints.length;

        for (var i = 0; i < length; i++) {
          var constraint = constraints[i];
          var violation = constraint(input);
          if (typeof violation === 'string') {
            validation.addError(path, this, violation);
            hasErrors = true;
          }
        }
      }
      return hasErrors;
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var constraints = this.constraints,
          type = this.type;

      if (!type.accepts(input)) {
        return false;
      }
      if (constraints) {
        var length = constraints.length;

        for (var i = 0; i < length; i++) {
          var constraint = constraints[i];
          if (typeof constraint(input) === 'string') {
            return false;
          }
        }
      }
      return true;
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      return this.type.acceptsType(input);
    }
  }, {
    key: 'toString',
    value: function toString(expand) {
      var type = this.type;

      return type.toString(expand);
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      for (var _len3 = arguments.length, typeInstances = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        typeInstances[_key3] = arguments[_key3];
      }

      var length = typeInstances.length;

      for (var i = 0; i < length; i++) {
        var typeParameter = this.typeParameters[i];
        if (typeParameter) {
          typeParameter.recorded = typeInstances[i];
        }
      }
      return this.type.unwrap();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        typeParameters: this.typeParameters,
        type: this.type
      };
    }
  }]);

  return PartialType;
}(_Type3.default);

exports.default = PartialType;
});

var ParameterizedTypeAlias_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type = Type_1;

var _Type2 = _interopRequireDefault(_Type);

var _TypeAlias2 = TypeAlias_1;

var _TypeAlias3 = _interopRequireDefault(_TypeAlias2);

var _PartialType = PartialType_1;

var _PartialType2 = _interopRequireDefault(_PartialType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ParameterizedTypeAlias = function (_TypeAlias) {
  _inherits(ParameterizedTypeAlias, _TypeAlias);

  function ParameterizedTypeAlias() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ParameterizedTypeAlias);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ParameterizedTypeAlias.__proto__ || Object.getPrototypeOf(ParameterizedTypeAlias)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ParameterizedTypeAlias', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ParameterizedTypeAlias, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      return this.partial.collectErrors(validation, path, input);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var constraints = this.constraints,
          partial = this.partial;

      if (!partial.accepts(input)) {
        return false;
      }
      var length = constraints.length;

      for (var i = 0; i < length; i++) {
        var constraint = constraints[i];
        if (typeof constraint(input) === 'string') {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      return this.partial.acceptsType(input);
    }
  }, {
    key: 'hasProperty',
    value: function hasProperty(name) {
      for (var _len2 = arguments.length, typeInstances = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        typeInstances[_key2 - 1] = arguments[_key2];
      }

      var inner = this.unwrap.apply(this, _toConsumableArray(typeInstances));
      if (inner && typeof inner.hasProperty === 'function') {
        return inner.hasProperty.apply(inner, [name].concat(_toConsumableArray(typeInstances)));
      } else {
        return false;
      }
    }
  }, {
    key: 'getProperty',
    value: function getProperty(name) {
      for (var _len3 = arguments.length, typeInstances = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        typeInstances[_key3 - 1] = arguments[_key3];
      }

      var inner = this.unwrap.apply(this, _toConsumableArray(typeInstances));
      if (inner && typeof inner.getProperty === 'function') {
        return inner.getProperty.apply(inner, [name].concat(_toConsumableArray(typeInstances)));
      }
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      var _partial;

      return (_partial = this.partial).unwrap.apply(_partial, arguments);
    }
  }, {
    key: 'toString',
    value: function toString(withDeclaration) {
      var name = this.name,
          partial = this.partial;
      var typeParameters = partial.typeParameters;

      var items = [];
      for (var i = 0; i < typeParameters.length; i++) {
        var typeParameter = typeParameters[i];
        items.push(typeParameter.toString(true));
      }
      var identifier = typeParameters.length > 0 ? name + '<' + items.join(', ') + '>' : name;

      if (withDeclaration) {
        return 'type ' + identifier + ' = ' + partial.toString() + ';';
      } else {
        return identifier;
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var partial = this.partial;

      return partial.toJSON();
    }
  }, {
    key: 'partial',
    get: function get() {
      var typeCreator = this.typeCreator,
          name = this.name;

      var target = new _PartialType2.default(this.context);
      target.name = name;
      target.type = typeCreator(target);
      target.constraints = this.constraints;
      return target;
    }
  }]);

  return ParameterizedTypeAlias;
}(_TypeAlias3.default);

exports.default = ParameterizedTypeAlias;
});

var ParameterizedFunctionType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

var _PartialType = PartialType_1;

var _PartialType2 = _interopRequireDefault(_PartialType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ParameterizedFunctionType = function (_Type) {
  _inherits(ParameterizedFunctionType, _Type);

  function ParameterizedFunctionType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ParameterizedFunctionType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ParameterizedFunctionType.__proto__ || Object.getPrototypeOf(ParameterizedFunctionType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ParameterizedFunctionType', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ParameterizedFunctionType, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      return this.partial.collectErrors(validation, path, input);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return this.partial.accepts(input);
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      return this.partial.acceptsType(input);
    }
  }, {
    key: 'acceptsParams',
    value: function acceptsParams() {
      var _partial$type;

      return (_partial$type = this.partial.type).acceptsParams.apply(_partial$type, arguments);
    }
  }, {
    key: 'acceptsReturn',
    value: function acceptsReturn(input) {
      return this.partial.type.acceptsReturn(input);
    }
  }, {
    key: 'assertParams',
    value: function assertParams() {
      var _partial$type2;

      return (_partial$type2 = this.partial.type).assertParams.apply(_partial$type2, arguments);
    }
  }, {
    key: 'assertReturn',
    value: function assertReturn(input) {
      return this.partial.type.assertReturn(input);
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      var _partial;

      return (_partial = this.partial).unwrap.apply(_partial, arguments);
    }
  }, {
    key: 'toString',
    value: function toString() {
      var partial = this.partial;
      var type = partial.type,
          typeParameters = partial.typeParameters;

      if (typeParameters.length === 0) {
        return type.toString();
      }
      var items = [];
      for (var i = 0; i < typeParameters.length; i++) {
        var typeParameter = typeParameters[i];
        items.push(typeParameter.toString(true));
      }
      return '<' + items.join(', ') + '> ' + type.toString();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var partial = this.partial;

      return partial.toJSON();
    }
  }, {
    key: 'partial',
    get: function get() {
      var context = this.context,
          bodyCreator = this.bodyCreator;

      var target = new _PartialType2.default(context);
      var body = bodyCreator(target);
      target.type = context.function.apply(context, _toConsumableArray(body));
      return target;
    }
  }, {
    key: 'typeParameters',
    get: function get() {
      return this.partial.typeParameters;
    }
  }, {
    key: 'params',
    get: function get() {
      return this.partial.type.params;
    }
  }, {
    key: 'rest',
    get: function get() {
      return this.partial.type.rest;
    }
  }, {
    key: 'returnType',
    get: function get() {
      return this.partial.type.returnType;
    }
  }]);

  return ParameterizedFunctionType;
}(_Type3.default);

exports.default = ParameterizedFunctionType;
});

var StringLiteralType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

var _getErrorMessage = getErrorMessage_1;

var _getErrorMessage2 = _interopRequireDefault(_getErrorMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StringLiteralType = function (_Type) {
  _inherits(StringLiteralType, _Type);

  function StringLiteralType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, StringLiteralType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = StringLiteralType.__proto__ || Object.getPrototypeOf(StringLiteralType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'StringLiteralType', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(StringLiteralType, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      var value = this.value;

      if (input === value) {
        return false;
      } else {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_EXACT_VALUE', this.toString()));
        return true;
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return input === this.value;
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      return input instanceof StringLiteralType && input.value === this.value;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return JSON.stringify(this.value);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        value: this.value
      };
    }
  }]);

  return StringLiteralType;
}(_Type3.default);

exports.default = StringLiteralType;
});

var StringType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

var _StringLiteralType = StringLiteralType_1;

var _StringLiteralType2 = _interopRequireDefault(_StringLiteralType);

var _getErrorMessage = getErrorMessage_1;

var _getErrorMessage2 = _interopRequireDefault(_getErrorMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StringType = function (_Type) {
  _inherits(StringType, _Type);

  function StringType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, StringType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = StringType.__proto__ || Object.getPrototypeOf(StringType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'StringType', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(StringType, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      if (typeof input === 'string') {
        return false;
      } else {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_STRING'));
        return true;
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return typeof input === 'string';
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      return input instanceof StringType || input instanceof _StringLiteralType2.default;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'string';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);

  return StringType;
}(_Type3.default);

exports.default = StringType;
});

var SymbolLiteralType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

var _getErrorMessage = getErrorMessage_1;

var _getErrorMessage2 = _interopRequireDefault(_getErrorMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SymbolLiteralType = function (_Type) {
  _inherits(SymbolLiteralType, _Type);

  function SymbolLiteralType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SymbolLiteralType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SymbolLiteralType.__proto__ || Object.getPrototypeOf(SymbolLiteralType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'SymbolLiteralType', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SymbolLiteralType, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      var value = this.value;

      if (input === value) {
        return false;
      } else {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_EXACT_VALUE', this.toString()));
        return true;
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return input === this.value;
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      return input instanceof SymbolLiteralType && input.value === this.value;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'typeof ' + this.value.toString();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        value: this.value
      };
    }
  }]);

  return SymbolLiteralType;
}(_Type3.default);

exports.default = SymbolLiteralType;
});

var SymbolType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

var _SymbolLiteralType = SymbolLiteralType_1;

var _SymbolLiteralType2 = _interopRequireDefault(_SymbolLiteralType);

var _getErrorMessage = getErrorMessage_1;

var _getErrorMessage2 = _interopRequireDefault(_getErrorMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SymbolType = function (_Type) {
  _inherits(SymbolType, _Type);

  function SymbolType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SymbolType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SymbolType.__proto__ || Object.getPrototypeOf(SymbolType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'SymbolType', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SymbolType, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      // Issue 252
      if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'symbol') {
        return false;
      } else {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_SYMBOL'));
        return true;
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return (typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'symbol';
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      return input instanceof SymbolType || input instanceof _SymbolLiteralType2.default;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'Symbol';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);

  return SymbolType;
}(_Type3.default);

exports.default = SymbolType;
});

var TupleType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

var _getErrorMessage = getErrorMessage_1;

var _getErrorMessage2 = _interopRequireDefault(_getErrorMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TupleType = function (_Type) {
  _inherits(TupleType, _Type);

  function TupleType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TupleType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TupleType.__proto__ || Object.getPrototypeOf(TupleType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TupleType', _this.types = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TupleType, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      var types = this.types;
      var length = types.length;

      if (!Array.isArray(input)) {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_ARRAY'));
        return true;
      }
      var hasErrors = false;
      for (var i = 0; i < length; i++) {
        var type = types[i];
        if (type.collectErrors(validation, path.concat(i), input[i])) {
          hasErrors = true;
        }
      }
      return hasErrors;
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var types = this.types;
      var length = types.length;

      if (!Array.isArray(input) || input.length < length) {
        return false;
      }
      for (var i = 0; i < length; i++) {
        var type = types[i];
        if (!type.accepts(input[i])) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      if (!(input instanceof TupleType)) {
        return false;
      }
      var types = this.types;
      var inputTypes = input.types;
      if (inputTypes.length < types.length) {
        return false;
      }
      for (var i = 0; i < types.length; i++) {
        if (!types[i].acceptsType(inputTypes[i])) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '[' + this.types.join(', ') + ']';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        types: this.types
      };
    }
  }]);

  return TupleType;
}(_Type3.default);

exports.default = TupleType;
});

var TypeBox_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

var _TypeParameterApplication = TypeParameterApplication_1;

var _TypeParameterApplication2 = _interopRequireDefault(_TypeParameterApplication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TypeBox = function (_Type) {
  _inherits(TypeBox, _Type);

  function TypeBox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TypeBox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TypeBox.__proto__ || Object.getPrototypeOf(TypeBox)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TypeBox', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TypeBox, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      return this.type.collectErrors(validation, path, input);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return this.type.accepts(input);
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      return this.type.acceptsType(input);
    }
  }, {
    key: 'apply',
    value: function apply() {
      var target = new _TypeParameterApplication2.default(this.context);
      target.parent = this.type;

      for (var _len2 = arguments.length, typeInstances = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        typeInstances[_key2] = arguments[_key2];
      }

      target.typeInstances = typeInstances;
      return target;
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.type.toString();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return this.type.toJSON();
    }
  }, {
    key: 'name',
    get: function get() {
      var reveal = this.reveal;

      var type = reveal();
      return type.name;
    }
  }, {
    key: 'type',
    get: function get() {
      var reveal = this.reveal;

      var type = reveal();
      if (!type) {
        throw new ReferenceError('Cannot reveal boxed type.');
      }
      return type;
    }
  }]);

  return TypeBox;
}(_Type3.default);

exports.default = TypeBox;
});

var TypeReference_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

var _TypeParameterApplication = TypeParameterApplication_1;

var _TypeParameterApplication2 = _interopRequireDefault(_TypeParameterApplication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var warnedMissing = {};

var TypeReference = function (_Type) {
  _inherits(TypeReference, _Type);

  function TypeReference() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TypeReference);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TypeReference.__proto__ || Object.getPrototypeOf(TypeReference)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TypeReference', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TypeReference, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      return this.type.collectErrors(validation, path, input);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return this.type.accepts(input);
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      return this.type.acceptsType(input);
    }
  }, {
    key: 'apply',
    value: function apply() {
      var target = new _TypeParameterApplication2.default(this.context);
      target.parent = this;

      for (var _len2 = arguments.length, typeInstances = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        typeInstances[_key2] = arguments[_key2];
      }

      target.typeInstances = typeInstances;
      return target;
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.name;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        name: this.name
      };
    }
  }, {
    key: 'type',
    get: function get() {
      var context = this.context,
          name = this.name;

      var type = context.get(name);
      if (!type) {
        if (!warnedMissing[name]) {
          console.warn('Cannot resolve type: ' + name);
          warnedMissing[name] = true;
        }
        return context.any();
      }
      return type;
    }
  }]);

  return TypeReference;
}(_Type3.default);

exports.default = TypeReference;
});

var UnionType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

var _getErrorMessage = getErrorMessage_1;

var _getErrorMessage2 = _interopRequireDefault(_getErrorMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnionType = function (_Type) {
  _inherits(UnionType, _Type);

  function UnionType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, UnionType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UnionType.__proto__ || Object.getPrototypeOf(UnionType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'UnionType', _this.types = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(UnionType, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      var types = this.types;
      var length = types.length;

      for (var i = 0; i < length; i++) {
        var type = types[i];
        if (type.accepts(input)) {
          return false;
        }
      }
      validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_NO_UNION', this.toString()));
      return true;
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var types = this.types;
      var length = types.length;

      for (var i = 0; i < length; i++) {
        var type = types[i];
        if (type.accepts(input)) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      var types = this.types;
      if (input instanceof UnionType) {
        var inputTypes = input.types;
        loop: for (var i = 0; i < types.length; i++) {
          var type = types[i];
          for (var j = 0; j < inputTypes.length; j++) {
            if (type.acceptsType(inputTypes[i])) {
              continue loop;
            }
          }
          // if we got this far then nothing accepted this type.
          return false;
        }
        return true;
      } else {
        for (var _i = 0; _i < types.length; _i++) {
          var _type = types[_i];
          if (_type.acceptsType(input)) {
            return true;
          }
        }
        return false;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.types.join(' | ');
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        types: this.types
      };
    }
  }]);

  return UnionType;
}(_Type3.default);

exports.default = UnionType;
});

var VoidType_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

var _getErrorMessage = getErrorMessage_1;

var _getErrorMessage2 = _interopRequireDefault(_getErrorMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VoidType = function (_Type) {
  _inherits(VoidType, _Type);

  function VoidType() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, VoidType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VoidType.__proto__ || Object.getPrototypeOf(VoidType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'VoidType', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(VoidType, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      if (input === undefined) {
        return false;
      } else {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_VOID'));
        return true;
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return input === undefined;
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      return input instanceof VoidType;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'void';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);

  return VoidType;
}(_Type3.default);

exports.default = VoidType;
});

var index = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VoidType = exports.UnionType = exports.TypeReference = exports.TypeParameterApplication = exports.TypeParameter = exports.TypeConstructor = exports.TypeBox = exports.Type = exports.TupleType = exports.SymbolType = exports.SymbolLiteralType = exports.StringType = exports.StringLiteralType = exports.PartialType = exports.ParameterizedFunctionType = exports.ParameterizedTypeAlias = exports.ObjectTypeProperty = exports.ObjectTypeIndexer = exports.ObjectTypeCallProperty = exports.ObjectType = exports.NumericLiteralType = exports.NumberType = exports.NullLiteralType = exports.NullableType = exports.TypeAlias = exports.MixedType = exports.IntersectionType = exports.GenericType = exports.GeneratorType = exports.FunctionTypeReturn = exports.FunctionTypeRestParam = exports.FunctionTypeParam = exports.FunctionType = exports.ExistentialType = exports.EmptyType = exports.BooleanType = exports.BooleanLiteralType = exports.ArrayType = exports.AnyType = undefined;

var _AnyType = AnyType_1;

var _AnyType2 = _interopRequireDefault(_AnyType);

var _ArrayType = ArrayType_1;

var _ArrayType2 = _interopRequireDefault(_ArrayType);

var _BooleanLiteralType = BooleanLiteralType_1;

var _BooleanLiteralType2 = _interopRequireDefault(_BooleanLiteralType);

var _BooleanType = BooleanType_1;

var _BooleanType2 = _interopRequireDefault(_BooleanType);

var _EmptyType = EmptyType_1;

var _EmptyType2 = _interopRequireDefault(_EmptyType);

var _ExistentialType = ExistentialType_1;

var _ExistentialType2 = _interopRequireDefault(_ExistentialType);

var _FunctionType = FunctionType_1;

var _FunctionType2 = _interopRequireDefault(_FunctionType);

var _FunctionTypeParam = FunctionTypeParam_1;

var _FunctionTypeParam2 = _interopRequireDefault(_FunctionTypeParam);

var _FunctionTypeRestParam = FunctionTypeRestParam_1;

var _FunctionTypeRestParam2 = _interopRequireDefault(_FunctionTypeRestParam);

var _FunctionTypeReturn = FunctionTypeReturn_1;

var _FunctionTypeReturn2 = _interopRequireDefault(_FunctionTypeReturn);

var _GeneratorType = GeneratorType_1;

var _GeneratorType2 = _interopRequireDefault(_GeneratorType);

var _GenericType = GenericType_1;

var _GenericType2 = _interopRequireDefault(_GenericType);

var _IntersectionType = IntersectionType_1;

var _IntersectionType2 = _interopRequireDefault(_IntersectionType);

var _MixedType = MixedType_1;

var _MixedType2 = _interopRequireDefault(_MixedType);

var _TypeAlias = TypeAlias_1;

var _TypeAlias2 = _interopRequireDefault(_TypeAlias);

var _NullableType = NullableType_1;

var _NullableType2 = _interopRequireDefault(_NullableType);

var _NullLiteralType = NullLiteralType_1;

var _NullLiteralType2 = _interopRequireDefault(_NullLiteralType);

var _NumberType = NumberType_1;

var _NumberType2 = _interopRequireDefault(_NumberType);

var _NumericLiteralType = NumericLiteralType_1;

var _NumericLiteralType2 = _interopRequireDefault(_NumericLiteralType);

var _ObjectType = ObjectType_1;

var _ObjectType2 = _interopRequireDefault(_ObjectType);

var _ObjectTypeCallProperty = ObjectTypeCallProperty_1;

var _ObjectTypeCallProperty2 = _interopRequireDefault(_ObjectTypeCallProperty);

var _ObjectTypeIndexer = ObjectTypeIndexer_1;

var _ObjectTypeIndexer2 = _interopRequireDefault(_ObjectTypeIndexer);

var _ObjectTypeProperty = ObjectTypeProperty_1;

var _ObjectTypeProperty2 = _interopRequireDefault(_ObjectTypeProperty);

var _ParameterizedTypeAlias = ParameterizedTypeAlias_1;

var _ParameterizedTypeAlias2 = _interopRequireDefault(_ParameterizedTypeAlias);

var _ParameterizedFunctionType = ParameterizedFunctionType_1;

var _ParameterizedFunctionType2 = _interopRequireDefault(_ParameterizedFunctionType);

var _PartialType = PartialType_1;

var _PartialType2 = _interopRequireDefault(_PartialType);

var _StringLiteralType = StringLiteralType_1;

var _StringLiteralType2 = _interopRequireDefault(_StringLiteralType);

var _StringType = StringType_1;

var _StringType2 = _interopRequireDefault(_StringType);

var _SymbolLiteralType = SymbolLiteralType_1;

var _SymbolLiteralType2 = _interopRequireDefault(_SymbolLiteralType);

var _SymbolType = SymbolType_1;

var _SymbolType2 = _interopRequireDefault(_SymbolType);

var _TupleType = TupleType_1;

var _TupleType2 = _interopRequireDefault(_TupleType);

var _Type = Type_1;

var _Type2 = _interopRequireDefault(_Type);

var _TypeBox = TypeBox_1;

var _TypeBox2 = _interopRequireDefault(_TypeBox);

var _TypeConstructor = TypeConstructor_1;

var _TypeConstructor2 = _interopRequireDefault(_TypeConstructor);

var _TypeParameter = TypeParameter_1;

var _TypeParameter2 = _interopRequireDefault(_TypeParameter);

var _TypeParameterApplication = TypeParameterApplication_1;

var _TypeParameterApplication2 = _interopRequireDefault(_TypeParameterApplication);

var _TypeReference = TypeReference_1;

var _TypeReference2 = _interopRequireDefault(_TypeReference);

var _UnionType = UnionType_1;

var _UnionType2 = _interopRequireDefault(_UnionType);

var _VoidType = VoidType_1;

var _VoidType2 = _interopRequireDefault(_VoidType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.AnyType = _AnyType2.default;
exports.ArrayType = _ArrayType2.default;
exports.BooleanLiteralType = _BooleanLiteralType2.default;
exports.BooleanType = _BooleanType2.default;
exports.EmptyType = _EmptyType2.default;
exports.ExistentialType = _ExistentialType2.default;
exports.FunctionType = _FunctionType2.default;
exports.FunctionTypeParam = _FunctionTypeParam2.default;
exports.FunctionTypeRestParam = _FunctionTypeRestParam2.default;
exports.FunctionTypeReturn = _FunctionTypeReturn2.default;
exports.GeneratorType = _GeneratorType2.default;
exports.GenericType = _GenericType2.default;
exports.IntersectionType = _IntersectionType2.default;
exports.MixedType = _MixedType2.default;
exports.TypeAlias = _TypeAlias2.default;
exports.NullableType = _NullableType2.default;
exports.NullLiteralType = _NullLiteralType2.default;
exports.NumberType = _NumberType2.default;
exports.NumericLiteralType = _NumericLiteralType2.default;
exports.ObjectType = _ObjectType2.default;
exports.ObjectTypeCallProperty = _ObjectTypeCallProperty2.default;
exports.ObjectTypeIndexer = _ObjectTypeIndexer2.default;
exports.ObjectTypeProperty = _ObjectTypeProperty2.default;
exports.ParameterizedTypeAlias = _ParameterizedTypeAlias2.default;
exports.ParameterizedFunctionType = _ParameterizedFunctionType2.default;
exports.PartialType = _PartialType2.default;
exports.StringLiteralType = _StringLiteralType2.default;
exports.StringType = _StringType2.default;
exports.SymbolLiteralType = _SymbolLiteralType2.default;
exports.SymbolType = _SymbolType2.default;
exports.TupleType = _TupleType2.default;
exports.Type = _Type2.default;
exports.TypeBox = _TypeBox2.default;
exports.TypeConstructor = _TypeConstructor2.default;
exports.TypeParameter = _TypeParameter2.default;
exports.TypeParameterApplication = _TypeParameterApplication2.default;
exports.TypeReference = _TypeReference2.default;
exports.UnionType = _UnionType2.default;
exports.VoidType = _VoidType2.default;
});

var registerPrimitiveTypes_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = registerPrimitiveTypes;

var _primitiveTypes = primitiveTypes_1;

var _primitiveTypes2 = _interopRequireDefault(_primitiveTypes);

var _types = index;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function registerPrimitiveTypes(t) {
  _primitiveTypes2.default.null = Object.freeze(new _types.NullLiteralType(t));
  _primitiveTypes2.default.empty = Object.freeze(new _types.EmptyType(t));
  _primitiveTypes2.default.number = Object.freeze(new _types.NumberType(t));
  _primitiveTypes2.default.boolean = Object.freeze(new _types.BooleanType(t));
  _primitiveTypes2.default.string = Object.freeze(new _types.StringType(t));
  _primitiveTypes2.default.symbol = Object.freeze(new _types.SymbolType(t));
  _primitiveTypes2.default.any = Object.freeze(new _types.AnyType(t));
  _primitiveTypes2.default.mixed = Object.freeze(new _types.MixedType(t));
  _primitiveTypes2.default.void = Object.freeze(new _types.VoidType(t));
  _primitiveTypes2.default.existential = Object.freeze(new _types.ExistentialType(t));
  return t;
}
});

var invariant_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = invariant;
function invariant(input, message) {
  if (!input) {
    var error = new Error(message);
    error.name = 'InvariantViolation';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(error, invariant);
    }
    throw error;
  }
}
});

var registerBuiltins = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = registerBuiltinTypeConstructors;

var _getErrorMessage = getErrorMessage_1;

var _getErrorMessage2 = _interopRequireDefault(_getErrorMessage);

var _invariant = invariant_1;

var _invariant2 = _interopRequireDefault(_invariant);

var _types = index;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function registerBuiltinTypeConstructors(t) {

  // Notes from: http://sitr.us/2015/05/31/advanced-features-in-flow.html
  // and the flow source code.

  // Type of the class whose instances are of type T.
  // This lets you pass around classes as first-class values.
  t.declareTypeConstructor({
    name: 'Class',
    typeName: 'ClassType',
    collectErrors: function collectErrors(validation, path, input, instanceType) {
      if (typeof input !== 'function') {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_CLASS', instanceType.toString()));
        return true;
      }
      var expectedType = instanceType.unwrap();
      if (input === expectedType) {
        return false;
      }
      if (typeof expectedType === 'function') {
        if (expectedType.prototype.isPrototypeOf(input.prototype)) {
          return false;
        } else {
          validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_CLASS', instanceType.toString()));
          return true;
        }
      }
      var annotation = t.getAnnotation(input);
      if (annotation) {
        return expectedType.acceptsType(annotation);
      }
      var matches = void 0;
      // we're dealing with a type
      switch (input.typeName) {
        case 'NumberType':
        case 'NumericLiteralType':
          matches = input === Number;
          break;
        case 'BooleanType':
        case 'BooleanLiteralType':
          matches = input === Boolean;
          break;
        case 'StringType':
        case 'StringLiteralType':
          matches = input === String;
          break;
        case 'ArrayType':
        case 'TupleType':
          matches = input === Array;
          break;
        default:
          return false;
      }
      if (matches) {
        return false;
      } else {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_CLASS', instanceType.toString()));
        return true;
      }
    },
    accepts: function accepts(input, instanceType) {
      if (typeof input !== 'function') {
        return false;
      }
      var expectedType = instanceType.unwrap();
      if (input === expectedType) {
        return true;
      } else if (typeof expectedType === 'function') {
        if (expectedType.prototype.isPrototypeOf(input.prototype)) {
          return true;
        } else {
          return false;
        }
      }

      var annotation = t.getAnnotation(input);

      if (annotation) {
        return expectedType.acceptsType(annotation);
      } else if (expectedType instanceof _types.TypeParameterApplication) {
        expectedType = expectedType.parent;
      }

      if (expectedType instanceof _types.GenericType && typeof expectedType.impl === 'function') {
        if (expectedType.impl.prototype.isPrototypeOf(input.prototype)) {
          return true;
        } else {
          return false;
        }
      }

      // we're dealing with a type
      switch (input.typeName) {
        case 'NumberType':
        case 'NumericLiteralType':
          return input === Number;
        case 'BooleanType':
        case 'BooleanLiteralType':
          return input === Boolean;
        case 'StringType':
        case 'StringLiteralType':
          return input === String;
        case 'ArrayType':
        case 'TupleType':
          return input === Array;
        default:
          return false;
      }
    },
    inferTypeParameters: function inferTypeParameters(input) {
      return [];
    }
  });

  // If A and B are object types, $Diff<A,B> is the type of objects that have
  // properties defined in A, but not in B.
  // Properties that are defined in both A and B are allowed too.
  t.declareTypeConstructor({
    name: '$Diff',
    typeName: '$DiffType',
    collectErrors: function collectErrors(validation, path, input, aType, bType) {
      if (input === null || (typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== "object" && typeof input !== "function") {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_OBJECT'));
        return true;
      }
      aType = aType.unwrap();
      (0, _invariant2.default)(bType, "Must specify two type parameters.");
      bType = bType.unwrap();
      (0, _invariant2.default)(aType instanceof _types.ObjectType && bType instanceof _types.ObjectType, "Can only $Diff object types.");
      var hasErrors = false;
      var properties = aType.properties;
      for (var i = 0; i < properties.length; i++) {
        var property = properties[i];
        if (bType.hasProperty(property.key)) {
          continue;
        }
        if (property.collectErrors(validation, path.concat(property.key), input)) {
          hasErrors = true;
        }
      }
      return hasErrors;
    },
    accepts: function accepts(input, aType, bType) {
      if (input === null || (typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== "object" && typeof input !== "function") {
        return false;
      }
      aType = aType.unwrap();
      bType = bType.unwrap();
      (0, _invariant2.default)(aType instanceof _types.ObjectType && bType instanceof _types.ObjectType, "Can only $Diff object types.");
      var properties = aType.properties;
      for (var i = 0; i < properties.length; i++) {
        var property = properties[i];
        if (bType.hasProperty(property.key)) {
          continue;
        }
        if (!property.accepts(input)) {
          return false;
        }
      }
      return true;
    },
    inferTypeParameters: function inferTypeParameters(input) {
      return [];
    }
  });

  // An object of type $Shape<T> does not have to have all of the properties
  // that type T defines. But the types of the properties that it does have
  // must accepts the types of the same properties in T.
  t.declareTypeConstructor({
    name: '$Shape',
    typeName: '$ShapeType',
    collectErrors: function collectErrors(validation, path, input, shapeType) {
      if (input === null || (typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== "object" && typeof input !== "function") {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_OBJECT'));
        return true;
      }
      shapeType = shapeType.unwrap();
      (0, _invariant2.default)(typeof shapeType.getProperty === 'function', "Can only $Shape<T> object types.");

      var hasErrors = false;
      for (var key in input) {
        var property = shapeType.getProperty(key);
        if (!property) {
          continue;
        }
        if (property.collectErrors(validation, path, input)) {
          hasErrors = true;
        }
      }

      return hasErrors;
    },
    accepts: function accepts(input, shapeType) {
      if (input === null || (typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== "object" && typeof input !== "function") {
        return false;
      }
      shapeType = shapeType.unwrap();
      (0, _invariant2.default)(typeof shapeType.getProperty === 'function', "Can only $Shape<T> object types.");
      for (var key in input) {
        var property = shapeType.getProperty(key);
        if (!property || !property.accepts(input)) {
          return false;
        }
      }
      return true;
    },
    inferTypeParameters: function inferTypeParameters(input) {
      return [];
    }
  });

  // Any, but at least T.
  t.declareTypeConstructor({
    name: '$SuperType',
    typeName: '$SuperType',
    collectErrors: function collectErrors(validation, path, input, superType) {
      return superType.collectErrors(validation, path, input);
    },
    accepts: function accepts(input, superType) {
      return superType.accepts(input);
    },
    inferTypeParameters: function inferTypeParameters(input) {
      return [];
    }
  });

  // object with larger key set than X's
  t.declareTypeConstructor({
    name: '$SubType',
    typeName: '$SubType',
    collectErrors: function collectErrors(validation, path, input, subType) {
      return subType.collectErrors(validation, path, input);
    },
    accepts: function accepts(input, subType) {
      return subType.accepts(input);
    },
    inferTypeParameters: function inferTypeParameters(input) {
      return [];
    }
  });

  // map over the key in an object.
  t.declareTypeConstructor({
    name: '$ObjMap',
    typeName: '$ObjMap',
    collectErrors: function collectErrors(validation, path, input, object, mapper) {
      var target = object.unwrap();
      (0, _invariant2.default)(mapper, 'Must specify at least two type parameters.');
      (0, _invariant2.default)(Array.isArray(target.properties), 'Target must be an object type.');

      var hasErrors = false;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = target.properties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var prop = _step.value;

          prop;
          var applied = mapper.unwrap(prop.value.unwrap());
          applied;

          var returnType = applied.returnType.unwrap();
          var value = input[prop.key];
          if (returnType.collectErrors(validation, path.concat(prop.key), value)) {
            hasErrors = true;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return hasErrors;
    },
    accepts: function accepts(input, object, mapper) {
      var target = object.unwrap();
      (0, _invariant2.default)(Array.isArray(target.properties), 'Target must be an object type.');

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = target.properties[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var prop = _step2.value;

          prop;
          var applied = mapper.unwrap(prop.value.unwrap());
          applied;

          var returnType = applied.returnType.unwrap();
          if (!returnType.accepts(input[prop.key])) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return true;
    },
    inferTypeParameters: function inferTypeParameters(input) {
      return [];
    }
  });

  // map over the key in an object.
  t.declareTypeConstructor({
    name: '$ObjMapi',
    typeName: '$ObjMapi',
    collectErrors: function collectErrors(validation, path, input, object, mapper) {
      var target = object.unwrap();
      (0, _invariant2.default)(mapper, 'Must specify at least two type parameters.');
      (0, _invariant2.default)(Array.isArray(target.properties), 'Target must be an object type.');

      var hasErrors = false;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = target.properties[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var prop = _step3.value;

          prop;
          var applied = mapper.unwrap(this.context.string(prop.key), prop.value.unwrap());
          applied;

          var value = input[prop.key];
          var returnType = applied.returnType.unwrap();
          if (returnType.collectErrors(validation, path.concat(prop.key), value)) {
            hasErrors = true;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return hasErrors;
    },
    accepts: function accepts(input, object, mapper) {
      var target = object.unwrap();
      (0, _invariant2.default)(Array.isArray(target.properties), 'Target must be an object type.');

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = target.properties[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var prop = _step4.value;

          prop;
          var applied = mapper.unwrap(this.context.string(prop.key), prop.value.unwrap());
          applied;

          var value = input[prop.key];
          var returnType = applied.returnType.unwrap();
          if (!returnType.accepts(value)) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return true;
    },
    inferTypeParameters: function inferTypeParameters(input) {
      return [];
    }
  });

  // The set of keys of T.
  t.declareTypeConstructor({
    name: '$Keys',
    typeName: '$KeysType',
    collectErrors: function collectErrors(validation, path, input, subject) {
      subject = subject.unwrap();
      (0, _invariant2.default)(subject instanceof _types.ObjectType, '$Keys<T> - T must be an ObjectType.');
      var properties = subject.properties;
      var length = properties.length;
      for (var i = 0; i < length; i++) {
        var property = properties[i];
        if (input === property.key) {
          return false;
        }
      }
      var keys = new Array(length);
      for (var _i = 0; _i < length; _i++) {
        keys[_i] = properties[_i].key;
      }
      validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_NO_UNION', keys.join(' | ')));
      return true;
    },
    accepts: function accepts(input, subject) {
      subject = subject.unwrap();
      (0, _invariant2.default)(subject instanceof _types.ObjectType, '$Keys<T> - T must be an ObjectType.');
      var properties = subject.properties;
      for (var i = 0; i < properties.length; i++) {
        var property = properties[i];
        if (input === property.key) {
          return true;
        }
      }
      return false;
    },
    inferTypeParameters: function inferTypeParameters(input) {
      return [];
    }
  });

  t.declareTypeConstructor({
    name: 'Date',
    impl: Date,
    typeName: 'DateType',
    collectErrors: function collectErrors(validation, path, input) {
      if (!(input instanceof Date)) {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_INSTANCEOF', Date));
        return true;
      } else if (isNaN(input.getTime())) {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_INVALID_DATE'));
        return true;
      } else {
        return false;
      }
    },
    accepts: function accepts(input) {
      return input instanceof Date && !isNaN(input.getTime());
    },
    inferTypeParameters: function inferTypeParameters(input) {
      return [];
    }
  });

  t.declareTypeConstructor({
    name: 'Iterable',
    typeName: 'IterableType',
    collectErrors: function collectErrors(validation, path, input, keyType) {
      if (!input) {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_OBJECT'));
        return true;
      } else if (typeof input[Symbol.iterator] !== 'function') {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_ITERABLE'));
        return true;
      }
      return false;
    },
    accepts: function accepts(input, keyType) {
      if (!input || typeof input[Symbol.iterator] !== 'function') {
        return false;
      }
      return true;
    },
    inferTypeParameters: function inferTypeParameters(input) {
      return [];
    }
  });

  t.declareTypeConstructor({
    name: 'Promise',
    impl: Promise,
    typeName: 'PromiseType',
    collectErrors: function collectErrors(validation, path, input, futureType) {
      if (!input || typeof input.then !== 'function') {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_PROMISE', futureType));
        return true;
      }
      return false;
    },
    accepts: function accepts(input) {
      return input && typeof input.then === 'function' && input.then.length > 1;
    },
    inferTypeParameters: function inferTypeParameters(input) {
      return [];
    }
  });

  t.declareTypeConstructor({
    name: 'Map',
    impl: Map,
    typeName: 'MapType',
    collectErrors: function collectErrors(validation, path, input, keyType, valueType) {
      (0, _invariant2.default)(valueType, "Must specify two type parameters.");
      if (!(input instanceof Map)) {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_INSTANCEOF', 'Map'));
        return true;
      }
      var hasErrors = false;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = input[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _ref = _step5.value;

          var _ref2 = _slicedToArray(_ref, 2);

          var key = _ref2[0];
          var value = _ref2[1];

          if (!keyType.accepts(key)) {
            validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_KEY_TYPE', keyType));
            hasErrors = true;
          }
          if (valueType.collectErrors(validation, path.concat(key), value)) {
            hasErrors = true;
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return hasErrors;
    },
    accepts: function accepts(input, keyType, valueType) {
      if (!(input instanceof Map)) {
        return false;
      }
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = input[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _ref3 = _step6.value;

          var _ref4 = _slicedToArray(_ref3, 2);

          var key = _ref4[0];
          var value = _ref4[1];

          if (!keyType.accepts(key) || !valueType.accepts(value)) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      return true;
    },
    inferTypeParameters: function inferTypeParameters(input) {
      var keyTypes = [];
      var valueTypes = [];
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        loop: for (var _iterator7 = input[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var _ref5 = _step7.value;

          var _ref6 = _slicedToArray(_ref5, 2);

          var key = _ref6[0];
          var value = _ref6[1];

          findKey: {
            for (var i = 0; i < keyTypes.length; i++) {
              var type = keyTypes[i];
              if (type.accepts(key)) {
                break findKey;
              }
            }
            keyTypes.push(t.typeOf(key));
          }

          for (var _i2 = 0; _i2 < valueTypes.length; _i2++) {
            var _type = valueTypes[_i2];
            if (_type.accepts(value)) {
              continue loop;
            }
          }
          valueTypes.push(t.typeOf(value));
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      var typeInstances = [];

      if (keyTypes.length === 0) {
        typeInstances.push(t.existential());
      } else if (keyTypes.length === 1) {
        typeInstances.push(keyTypes[0]);
      } else {
        typeInstances.push(t.union.apply(t, keyTypes));
      }

      if (valueTypes.length === 0) {
        typeInstances.push(t.existential());
      } else if (valueTypes.length === 1) {
        typeInstances.push(valueTypes[0]);
      } else {
        typeInstances.push(t.union.apply(t, valueTypes));
      }

      return typeInstances;
    }
  });

  t.declareTypeConstructor({
    name: 'Set',
    impl: Set,
    typeName: 'SetType',
    collectErrors: function collectErrors(validation, path, input, valueType) {
      if (!(input instanceof Set)) {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_INSTANCEOF', 'Set'));
        return true;
      }
      var hasErrors = false;
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = input[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var value = _step8.value;

          if (valueType.collectErrors(validation, path, value)) {
            hasErrors = true;
          }
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      return hasErrors;
    },
    accepts: function accepts(input, valueType) {
      if (!(input instanceof Set)) {
        return false;
      }
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = input[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var value = _step9.value;

          if (!valueType.accepts(value)) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9.return) {
            _iterator9.return();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      return true;
    },
    inferTypeParameters: function inferTypeParameters(input) {
      var valueTypes = [];
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        loop: for (var _iterator10 = input[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var value = _step10.value;

          for (var i = 0; i < valueTypes.length; i++) {
            var type = valueTypes[i];
            if (type.accepts(value)) {
              continue loop;
            }
          }
          valueTypes.push(t.typeOf(value));
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10.return) {
            _iterator10.return();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }

      if (valueTypes.length === 0) {
        return [t.existential()];
      } else if (valueTypes.length === 1) {
        return [valueTypes[0]];
      } else {
        return [t.union.apply(t, valueTypes)];
      }
    }
  });

  // Ignores type errors.
  t.declareTypeConstructor({
    name: '$FlowIgnore',
    typeName: '$FlowIgnore',
    collectErrors: function collectErrors(validation, path, input) {
      return false;
    },
    accepts: function accepts(input) {
      return true;
    },
    inferTypeParameters: function inferTypeParameters(input) {
      return [];
    }
  });

  return t;
}
});

var TypeInferrer = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TypeInferer = exports.TypeInferer = function () {
  function TypeInferer(context) {
    _classCallCheck(this, TypeInferer);

    this.context = context;
  }

  _createClass(TypeInferer, [{
    key: 'infer',
    value: function infer(input) {
      var primitive = this.inferPrimitive(input);
      if (primitive) {
        return primitive;
      }
      var inferred = new Map();
      return this.inferComplex(input, inferred);
    }
  }, {
    key: 'inferInternal',
    value: function inferInternal(input, inferred) {
      var primitive = this.inferPrimitive(input);
      if (primitive) {
        return primitive;
      }
      return this.inferComplex(input, inferred);
    }
  }, {
    key: 'inferPrimitive',
    value: function inferPrimitive(input) {
      var context = this.context;

      if (input === null) {
        return context.null();
      } else if (input === undefined) {
        return context.void();
      } else if (typeof input === 'number') {
        return context.number();
      } else if (typeof input === 'boolean') {
        return context.boolean();
      } else if (typeof input === 'string') {
        return context.string();
      }
      // Issue 252
      else if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'symbol') {
          return context.symbol(input);
        } else {
          return undefined;
        }
    }
  }, {
    key: 'inferComplex',
    value: function inferComplex(input, inferred) {
      var context = this.context;


      if (typeof input === 'function') {
        return this.inferFunction(input, inferred);
      } else if (input !== null && (typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object') {
        return this.inferObject(input, inferred);
      } else {
        return context.any();
      }
    }
  }, {
    key: 'inferFunction',
    value: function inferFunction(input, inferred) {
      var context = this.context;
      var length = input.length;

      var body = new Array(length + 1);
      for (var i = 0; i < length; i++) {
        body[i] = context.param(String.fromCharCode(97 + i), context.existential());
      }
      body[length] = context.return(context.existential());
      return context.fn.apply(context, body);
    }
  }, {
    key: 'inferObject',
    value: function inferObject(input, inferred) {
      var existing = inferred.get(input);
      if (existing) {
        return existing;
      }
      var context = this.context;

      var type = void 0;

      // Temporarily create a box for this type to catch cyclical references.
      // Nested references to this object will receive the boxed type.
      var box = context.box(function () {
        return type;
      });
      inferred.set(input, box);

      if (Array.isArray(input)) {
        type = this.inferArray(input, inferred);
      } else if (!(input instanceof Object)) {
        type = this.inferDict(input, inferred);
      } else if (input.constructor !== Object) {
        var handler = context.getTypeConstructor(input.constructor);
        if (handler) {
          var typeParameters = handler.inferTypeParameters(input);
          type = handler.apply.apply(handler, _toConsumableArray(typeParameters));
        } else {
          type = context.ref(input.constructor);
        }
      } else {
        var body = [];
        for (var key in input) {
          // eslint-disable-line
          var value = input[key];
          body.push(context.property(key, this.inferInternal(value, inferred)));
        }
        type = context.object.apply(context, body);
      }

      // Overwrite the box with the real value.
      inferred.set(input, type);
      return type;
    }
  }, {
    key: 'inferDict',
    value: function inferDict(input, inferred) {
      var numericIndexers = [];
      var stringIndexers = [];
      loop: for (var key in input) {
        // eslint-disable-line
        var value = input[key];
        var types = isNaN(+key) ? stringIndexers : numericIndexers;
        for (var i = 0; i < types.length; i++) {
          var type = types[i];
          if (type.accepts(value)) {
            continue loop;
          }
        }
        types.push(this.inferInternal(value, inferred));
      }

      var context = this.context;

      var body = [];
      if (numericIndexers.length === 1) {
        body.push(context.indexer('index', context.number(), numericIndexers[0]));
      } else if (numericIndexers.length > 1) {
        body.push(context.indexer('index', context.number(), context.union.apply(context, numericIndexers)));
      }

      if (stringIndexers.length === 1) {
        body.push(context.indexer('key', context.string(), stringIndexers[0]));
      } else if (stringIndexers.length > 1) {
        body.push(context.indexer('key', context.string(), context.union.apply(context, stringIndexers)));
      }

      return context.object.apply(context, body);
    }
  }, {
    key: 'inferArray',
    value: function inferArray(input, inferred) {
      var context = this.context;

      var types = [];
      var values = [];
      var length = input.length;

      loop: for (var i = 0; i < length; i++) {
        var item = input[i];
        var inferredType = this.inferInternal(item, inferred);
        for (var j = 0; j < types.length; j++) {
          var type = types[j];
          if (type.accepts(item) && inferredType.accepts(values[j])) {
            continue loop;
          }
        }
        types.push(inferredType);
        values.push(item);
      }
      if (types.length === 0) {
        return context.array(context.any());
      } else if (types.length === 1) {
        return context.array(types[0]);
      } else {
        return context.array(context.union.apply(context, types));
      }
    }
  }]);

  return TypeInferer;
}();

exports.default = TypeInferer;
});

var makeReactPropTypes_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeReactPropTypes;

var _makeError = makeError_1;

var _makeError2 = _interopRequireDefault(_makeError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeReactPropTypes(objectType) {
  var output = {};

  var _loop = function _loop(property) {
    output[property.key] = function (props, propName, componentName) {
      return (0, _makeError2.default)(property, props);
    };
  };

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = objectType.properties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var property = _step.value;

      _loop(property);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return output;
}
});

var Declaration_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Type2 = Type_1;

var _Type3 = _interopRequireDefault(_Type2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Declaration = function (_Type) {
  _inherits(Declaration, _Type);

  function Declaration() {
    _classCallCheck(this, Declaration);

    return _possibleConstructorReturn(this, (Declaration.__proto__ || Object.getPrototypeOf(Declaration)).apply(this, arguments));
  }

  return Declaration;
}(_Type3.default);

exports.default = Declaration;
});

var VarDeclaration_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Declaration2 = Declaration_1;

var _Declaration3 = _interopRequireDefault(_Declaration2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VarDeclaration = function (_Declaration) {
  _inherits(VarDeclaration, _Declaration);

  function VarDeclaration() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, VarDeclaration);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VarDeclaration.__proto__ || Object.getPrototypeOf(VarDeclaration)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'VarDeclaration', _this.constraints = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(VarDeclaration, [{
    key: 'addConstraint',
    value: function addConstraint(constraint) {
      this.constraints.push(constraint);
      return this;
    }
  }, {
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      var constraints = this.constraints,
          type = this.type;

      var hasErrors = false;
      if (type.collectErrors(validation, path, input)) {
        hasErrors = true;
      }
      var length = constraints.length;

      for (var i = 0; i < length; i++) {
        var constraint = constraints[i];
        var violation = constraint(input);
        if (typeof violation === 'string') {
          validation.addError(path, this, violation);
          hasErrors = true;
        }
      }
      return hasErrors;
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var constraints = this.constraints,
          type = this.type;

      if (!type.accepts(input)) {
        return false;
      }
      var length = constraints.length;

      for (var i = 0; i < length; i++) {
        var constraint = constraints[i];
        if (typeof constraint(input) === 'string') {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      return this.type.acceptsType(input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'declare var ' + this.name + ': ' + this.type.toString() + ';';
    }
  }]);

  return VarDeclaration;
}(_Declaration3.default);

exports.default = VarDeclaration;
});

var TypeDeclaration_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Declaration2 = Declaration_1;

var _Declaration3 = _interopRequireDefault(_Declaration2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TypeDeclaration = function (_Declaration) {
  _inherits(TypeDeclaration, _Declaration);

  function TypeDeclaration() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TypeDeclaration);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TypeDeclaration.__proto__ || Object.getPrototypeOf(TypeDeclaration)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TypeDeclaration', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TypeDeclaration, [{
    key: 'addConstraint',
    value: function addConstraint(constraint) {
      this.typeAlias.addConstraint(constraint);
      return this;
    }
  }, {
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      return this.typeAlias.collectErrors(validation, path, input);
    }
  }, {
    key: 'apply',
    value: function apply() {
      var _typeAlias;

      return (_typeAlias = this.typeAlias).apply.apply(_typeAlias, arguments);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return this.typeAlias.accepts(input);
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      return this.typeAlias.acceptsType(input);
    }
  }, {
    key: 'hasProperty',
    value: function hasProperty(name) {
      var _typeAlias2;

      for (var _len2 = arguments.length, typeInstances = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        typeInstances[_key2 - 1] = arguments[_key2];
      }

      return (_typeAlias2 = this.typeAlias).hasProperty.apply(_typeAlias2, [name].concat(_toConsumableArray(typeInstances)));
    }
  }, {
    key: 'getProperty',
    value: function getProperty(name) {
      var _typeAlias3;

      for (var _len3 = arguments.length, typeInstances = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        typeInstances[_key3 - 1] = arguments[_key3];
      }

      return (_typeAlias3 = this.typeAlias).getProperty.apply(_typeAlias3, [name].concat(_toConsumableArray(typeInstances)));
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      var _typeAlias4;

      return (_typeAlias4 = this.typeAlias).unwrap.apply(_typeAlias4, arguments);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'declare ' + this.typeAlias.toString(true) + ';';
    }
  }, {
    key: 'type',
    get: function get() {
      return this.typeAlias.type;
    }
  }]);

  return TypeDeclaration;
}(_Declaration3.default);

exports.default = TypeDeclaration;
});

var ClassDeclaration_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Declaration2 = Declaration_1;

var _Declaration3 = _interopRequireDefault(_Declaration2);

var _TypeParameterApplication = TypeParameterApplication_1;

var _TypeParameterApplication2 = _interopRequireDefault(_TypeParameterApplication);

var _getErrorMessage = getErrorMessage_1;

var _getErrorMessage2 = _interopRequireDefault(_getErrorMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClassDeclaration = function (_Declaration) {
  _inherits(ClassDeclaration, _Declaration);

  function ClassDeclaration() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ClassDeclaration);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ClassDeclaration.__proto__ || Object.getPrototypeOf(ClassDeclaration)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ClassDeclaration', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ClassDeclaration, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      var body = this.body;

      var superClass = this.superClass && this.superClass.unwrap();
      if (input === null || (typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object' && typeof input !== 'function') {
        validation.addError(path, this, (0, _getErrorMessage2.default)('ERR_EXPECT_INSTANCEOF', this.name));
        return true;
      }
      var hasSuperErrors = false;
      if (superClass && superClass.collectErrors(validation, path, input)) {
        // Clear any errors for properties we override in this class.
        var didClear = false;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = body.properties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var property = _step.value;

            if (validation.clearError(path.concat(property.key))) {
              didClear = true;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        hasSuperErrors = didClear ? validation.hasErrors(path) : true;
      }
      if (body.collectErrors(validation, path, input)) {
        return true;
      }
      return hasSuperErrors;
    }

    /**
     * Get a property with the given name, or undefined if it does not exist.
     */

  }, {
    key: 'getProperty',
    value: function getProperty(key) {
      var body = this.body,
          superClass = this.superClass;

      var prop = body.getProperty(key);
      if (prop) {
        return prop;
      } else if (superClass && typeof superClass.getProperty === 'function') {
        return superClass.getProperty(key);
      }
    }

    /**
     * Determine whether a property with the given name exists.
     */

  }, {
    key: 'hasProperty',
    value: function hasProperty(key) {
      var body = this.body,
          superClass = this.superClass;

      if (body.hasProperty(key)) {
        return true;
      } else if (superClass && typeof superClass.hasProperty === 'function') {
        return superClass.hasProperty(key);
      } else {
        return false;
      }
    }
  }, {
    key: 'apply',
    value: function apply() {
      var target = new _TypeParameterApplication2.default(this.context);
      target.parent = this;

      for (var _len2 = arguments.length, typeInstances = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        typeInstances[_key2] = arguments[_key2];
      }

      target.typeInstances = typeInstances;
      return target;
    }
  }, {
    key: 'toString',
    value: function toString(withDeclaration) {
      var name = this.name,
          superClass = this.superClass,
          body = this.body;

      var superClassName = superClass && (typeof superClass.name === 'string' && superClass.name || superClass.toString());
      return (withDeclaration ? 'declare ' : '') + 'class ' + name + (superClassName ? 'extends ' + superClassName + ' ' : '') + ' ' + body.toString();
    }
  }]);

  return ClassDeclaration;
}(_Declaration3.default);

exports.default = ClassDeclaration;
});

var ModuleDeclaration_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Declaration2 = Declaration_1;

var _Declaration3 = _interopRequireDefault(_Declaration2);

var _ClassDeclaration = ClassDeclaration_1;

var _ClassDeclaration2 = _interopRequireDefault(_ClassDeclaration);

var _symbols = symbols$1;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModuleDeclaration = function (_Declaration) {
  _inherits(ModuleDeclaration, _Declaration);

  function ModuleDeclaration() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ModuleDeclaration);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ModuleDeclaration.__proto__ || Object.getPrototypeOf(ModuleDeclaration)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ModuleDeclaration', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ModuleDeclaration, [{
    key: 'get',
    value: function get(name) {
      var moduleExports = this.moduleExports;

      if (moduleExports) {
        var exporting = moduleExports.unwrap();
        if (typeof exporting.getProperty === 'function') {
          var prop = exporting.getProperty(name);
          if (prop) {
            return prop.unwrap();
          }
        }
      } else {
        var declaration = this.declarations[name];
        if (declaration) {
          return declaration.unwrap();
        }
      }
    }
  }, {
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      // Can't validate a module directly.
      // @todo should this throw?
      return false;
    }
  }, {
    key: 'import',
    value: function _import(moduleName) {
      if (/^\.\//.test(moduleName)) {
        moduleName = '' + this.name + moduleName.slice(1);
      }
      return this.innerContext.import(moduleName);
    }
  }, {
    key: 'toString',
    value: function toString() {
      var name = this.name,
          declarations = this.declarations,
          modules = this.modules,
          moduleExports = this.moduleExports;

      var body = [];
      for (var _name in declarations) {
        var declaration = declarations[_name];
        body.push(declaration.toString(true));
      }
      if (modules) {
        for (var _name2 in modules) {
          body.push(module.toString());
        }
      }
      if (moduleExports) {
        body.push(moduleExports.toString());
      }
      return 'declare module "' + name + '" {\n' + indent(body.join('\n\n')) + '}';
    }
  }, {
    key: 'moduleType',
    get: function get() {
      if (this.moduleExports) {
        return 'commonjs';
      } else {
        return 'es6';
      }
    }
  }, {
    key: 'isCommonJS',
    get: function get() {
      return this.moduleExports ? true : false;
    }
  }, {
    key: 'isES6',
    get: function get() {
      return this.moduleExports ? false : true;
    }
  }, {
    key: 'declarations',
    get: function get() {
      var innerContext = this.innerContext;

      return innerContext[_symbols.NameRegistrySymbol];
    }
  }, {
    key: 'modules',
    get: function get() {
      var innerContext = this.innerContext;

      return innerContext[_symbols.ModuleRegistrySymbol];
    }
  }]);

  return ModuleDeclaration;
}(_Declaration3.default);

exports.default = ModuleDeclaration;


function indent(input) {
  var lines = input.split('\n');
  var length = lines.length;

  for (var i = 0; i < length; i++) {
    lines[i] = '  ' + lines[i];
  }
  return lines.join('\n');
}
});

var ModuleExportsDeclaration = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Declaration2 = Declaration_1;

var _Declaration3 = _interopRequireDefault(_Declaration2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModuleExports = function (_Declaration) {
  _inherits(ModuleExports, _Declaration);

  function ModuleExports() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ModuleExports);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ModuleExports.__proto__ || Object.getPrototypeOf(ModuleExports)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ModuleExports', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ModuleExports, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      return this.type.collectErrors(validation, path, input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'declare module.exports: ' + this.type.toString() + ';';
    }
  }]);

  return ModuleExports;
}(_Declaration3.default);

exports.default = ModuleExports;
});

var ExtendsDeclaration_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Declaration2 = Declaration_1;

var _Declaration3 = _interopRequireDefault(_Declaration2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExtendsDeclaration = function (_Declaration) {
  _inherits(ExtendsDeclaration, _Declaration);

  function ExtendsDeclaration() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ExtendsDeclaration);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ExtendsDeclaration.__proto__ || Object.getPrototypeOf(ExtendsDeclaration)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ExtendsDeclaration', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ExtendsDeclaration, [{
    key: 'collectErrors',
    value: function collectErrors(validation, path, input) {
      return this.type.collectErrors(validation, path, input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type.unwrap();
    }
  }]);

  return ExtendsDeclaration;
}(_Declaration3.default);

exports.default = ExtendsDeclaration;
});

var index$2 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtendsDeclaration = exports.ClassDeclaration = exports.ModuleExportsDeclaration = exports.ModuleDeclaration = exports.VarDeclaration = exports.TypeDeclaration = exports.Declaration = undefined;

var _Declaration = Declaration_1;

var _Declaration2 = _interopRequireDefault(_Declaration);

var _VarDeclaration = VarDeclaration_1;

var _VarDeclaration2 = _interopRequireDefault(_VarDeclaration);

var _TypeDeclaration = TypeDeclaration_1;

var _TypeDeclaration2 = _interopRequireDefault(_TypeDeclaration);

var _ModuleDeclaration = ModuleDeclaration_1;

var _ModuleDeclaration2 = _interopRequireDefault(_ModuleDeclaration);

var _ModuleExportsDeclaration = ModuleExportsDeclaration;

var _ModuleExportsDeclaration2 = _interopRequireDefault(_ModuleExportsDeclaration);

var _ClassDeclaration = ClassDeclaration_1;

var _ClassDeclaration2 = _interopRequireDefault(_ClassDeclaration);

var _ExtendsDeclaration = ExtendsDeclaration_1;

var _ExtendsDeclaration2 = _interopRequireDefault(_ExtendsDeclaration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Declaration = _Declaration2.default;
exports.TypeDeclaration = _TypeDeclaration2.default;
exports.VarDeclaration = _VarDeclaration2.default;
exports.ModuleDeclaration = _ModuleDeclaration2.default;
exports.ModuleExportsDeclaration = _ModuleExportsDeclaration2.default;
exports.ClassDeclaration = _ClassDeclaration2.default;
exports.ExtendsDeclaration = _ExtendsDeclaration2.default;
});

var TypeContext_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TypeInferrer = TypeInferrer;

var _TypeInferrer2 = _interopRequireDefault(_TypeInferrer);

var _primitiveTypes = primitiveTypes_1;

var _primitiveTypes2 = _interopRequireDefault(_primitiveTypes);

var _invariant = invariant_1;

var _invariant2 = _interopRequireDefault(_invariant);

var _Validation = Validation_1;

var _Validation2 = _interopRequireDefault(_Validation);

var _makeReactPropTypes = makeReactPropTypes_1;

var _makeReactPropTypes2 = _interopRequireDefault(_makeReactPropTypes);

var _makeJSONError2 = makeJSONError_1;

var _makeJSONError3 = _interopRequireDefault(_makeJSONError2);

var _makeTypeError2 = makeTypeError_1;

var _makeTypeError3 = _interopRequireDefault(_makeTypeError2);

var _types = index;

var _declarations = index$2;

var _symbols = symbols$1;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TypeContext = function () {
  function TypeContext() {
    _classCallCheck(this, TypeContext);

    this[_symbols.NameRegistrySymbol] = {};
    this[_symbols.TypeConstructorRegistrySymbol] = new Map();
    this[_symbols.InferrerSymbol] = new _TypeInferrer2.default(this);
    this[_symbols.ModuleRegistrySymbol] = {};
  }

  // Issue 252


  // Issue 252


  // Issue 252


  // Issue 252


  // Issue 252


  _createClass(TypeContext, [{
    key: 'makeJSONError',


    // Issue 252
    value: function makeJSONError(validation) {
      return (0, _makeJSONError3.default)(validation);
    }
  }, {
    key: 'makeTypeError',
    value: function makeTypeError(validation) {
      return (0, _makeTypeError3.default)(validation);
    }
  }, {
    key: 'createContext',
    value: function createContext() {
      var context = new TypeContext();
      // Issue 252
      context[_symbols.ParentSymbol] = this;
      return context;
    }
  }, {
    key: 'typeOf',
    value: function typeOf(input) {

      var annotation = this.getAnnotation(input);
      if (annotation) {
        return annotation;
      }
      // Issue 252
      var inferrer = this[_symbols.InferrerSymbol];
      inferrer;

      return inferrer.infer(input);
    }
  }, {
    key: 'get',
    value: function get(name) {
      // Issue 252
      var item = this[_symbols.NameRegistrySymbol][name];
      if (item != null) {
        if (typeof item === 'function') {
          return new item(this);
        } else {
          return item;
        }
      }
      // Issue 252
      var parent = this[_symbols.ParentSymbol];
      if (parent) {
        return parent.get(name);
      }
    }

    /**
     * Returns a decorator for a function or object with the given type.
     */

  }, {
    key: 'decorate',
    value: function decorate(type) {
      var _this = this;

      return function (input, propertyName, descriptor) {
        if (descriptor && typeof propertyName === 'string') {
          if (typeof descriptor.get === 'function' || typeof descriptor.set === 'function') {
            return descriptor; // @todo decorate getters/setters
          } else {
            return {
              enumerable: true,
              writable: true,
              configurable: true,
              value: descriptor.value,
              initializer: descriptor.initializer
            };
          }
        } else {
          return _this.annotate(input, type);
        }
      };
    }

    /**
     * Annotates an object or function with the given type.
     */

  }, {
    key: 'annotate',
    value: function annotate(input, type) {
      input[_symbols.TypeSymbol] = type;
      return input;
    }
  }, {
    key: 'getAnnotation',
    value: function getAnnotation(input) {
      if (input !== null && (typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' || typeof input === 'function') {
        // Issue 252
        return input[_symbols.TypeSymbol];
      }
    }
  }, {
    key: 'hasAnnotation',
    value: function hasAnnotation(input) {
      if (input == null) {
        return false;
      } else {
        return input[_symbols.TypeSymbol] ? true : false;
      }
    }
  }, {
    key: 'setAnnotation',
    value: function setAnnotation(input, type) {
      input[_symbols.TypeSymbol] = type;
      return input;
    }
  }, {
    key: 'type',
    value: function type(name, _type) {
      if (typeof _type === 'function') {
        var target = new _types.ParameterizedTypeAlias(this);
        target.name = name;
        target.typeCreator = _type;
        return target;
      } else {
        var _target = new _types.TypeAlias(this);
        _target.name = name;
        _target.type = _type;
        return _target;
      }
    }
  }, {
    key: 'declare',
    value: function declare(name, type) {

      if (name instanceof _declarations.Declaration) {
        type = name;
        name = type.name;
      } else if (name instanceof _types.TypeAlias) {
        type = name;
        name = type.name;
      }
      if (typeof type === 'function') {
        type = this.type(name, type);
      }
      if (type instanceof _declarations.ModuleDeclaration) {
        var moduleRegistry = this[_symbols.ModuleRegistrySymbol];
        if (moduleRegistry[name]) {
          throw new Error('Cannot redeclare module: ' + name);
        }
        moduleRegistry[name] = type;
        return type;
      } else {
        (0, _invariant2.default)(type, 'Type must be supplied to declaration');
        var nameRegistry = this[_symbols.NameRegistrySymbol];

        if (nameRegistry[name]) {
          throw new Error('Cannot redeclare type: ' + name);
        }
        if (type instanceof _declarations.Declaration) {
          nameRegistry[name] = type;
          return type;
        } else if (type instanceof _types.TypeAlias || type instanceof _types.ParameterizedTypeAlias) {
          var target = new _declarations.TypeDeclaration(this);
          target.name = name;
          target.typeAlias = type;
          nameRegistry[name] = target;
          return target;
        } else {
          var _target2 = this.var(name, type);
          nameRegistry[name] = _target2;
          return _target2;
        }
      }
    }
  }, {
    key: 'declarations',
    value: function* declarations() {
      var nameRegistry = this[_symbols.NameRegistrySymbol];
      for (var key in nameRegistry) {
        yield [key, nameRegistry[key]];
      }
    }
  }, {
    key: 'modules',
    value: function* modules() {
      var moduleRegistry = this[_symbols.ModuleRegistrySymbol];
      for (var key in moduleRegistry) {
        yield moduleRegistry[key];
      }
    }
  }, {
    key: 'import',
    value: function _import(moduleName) {
      var moduleRegistry = this[_symbols.ModuleRegistrySymbol];
      if (moduleRegistry[moduleName]) {
        return moduleRegistry[moduleName];
      }

      var _moduleName$split = moduleName.split('/'),
          _moduleName$split2 = _slicedToArray(_moduleName$split, 1),
          head = _moduleName$split2[0];

      var module = moduleRegistry[head];
      if (module) {
        return module.import(moduleName);
      }
      var parent = this[_symbols.ParentSymbol];
      if (parent) {
        return parent.import(moduleName);
      }
    }
  }, {
    key: 'declareTypeConstructor',
    value: function declareTypeConstructor(_ref) {
      var name = _ref.name,
          impl = _ref.impl,
          typeName = _ref.typeName,
          collectErrors = _ref.collectErrors,
          accepts = _ref.accepts,
          inferTypeParameters = _ref.inferTypeParameters;

      var nameRegistry = this[_symbols.NameRegistrySymbol];

      if (nameRegistry[name]) {
        throw new Error('Cannot redeclare type: ' + name);
      }

      var target = new _types.TypeConstructor(this);
      target.name = name;
      target.typeName = typeName;
      target.impl = impl;
      target.collectErrors = collectErrors;
      target.accepts = accepts;
      target.inferTypeParameters = inferTypeParameters;

      nameRegistry[name] = target;

      if (typeof impl === 'function') {
        // Issue 252
        var handlerRegistry = this[_symbols.TypeConstructorRegistrySymbol];
        handlerRegistry;

        if (handlerRegistry.has(impl)) {
          throw new Error('A type handler already exists for the given implementation.');
        }
        handlerRegistry.set(impl, target);
      }
      return target;
    }
  }, {
    key: 'getTypeConstructor',
    value: function getTypeConstructor(impl) {
      // Issue 252
      var handlerRegistry = this[_symbols.TypeConstructorRegistrySymbol];
      handlerRegistry;

      return handlerRegistry.get(impl);
    }
  }, {
    key: 'null',
    value: function _null() {
      return _primitiveTypes2.default.null;
    }
  }, {
    key: 'nullable',
    value: function nullable(type) {
      var target = new _types.NullableType(this);
      target.type = type;
      return target;
    }
  }, {
    key: 'existential',
    value: function existential() {
      return _primitiveTypes2.default.existential;
    }
  }, {
    key: 'empty',
    value: function empty() {
      return _primitiveTypes2.default.empty;
    }
  }, {
    key: 'any',
    value: function any() {
      return _primitiveTypes2.default.any;
    }
  }, {
    key: 'mixed',
    value: function mixed() {
      return _primitiveTypes2.default.mixed;
    }
  }, {
    key: 'void',
    value: function _void() {
      return _primitiveTypes2.default.void;
    }
  }, {
    key: 'number',
    value: function number(input) {
      if (input !== undefined) {
        var target = new _types.NumericLiteralType(this);
        target.value = input;
        return target;
      } else {
        return _primitiveTypes2.default.number;
      }
    }
  }, {
    key: 'boolean',
    value: function boolean(input) {
      if (input !== undefined) {
        var target = new _types.BooleanLiteralType(this);
        target.value = input;
        return target;
      } else {
        return _primitiveTypes2.default.boolean;
      }
    }
  }, {
    key: 'string',
    value: function string(input) {
      if (input !== undefined) {
        var target = new _types.StringLiteralType(this);
        target.value = input;
        return target;
      } else {
        return _primitiveTypes2.default.string;
      }
    }
  }, {
    key: 'symbol',
    value: function symbol(input) {
      if (input !== undefined) {
        var target = new _types.SymbolLiteralType(this);
        target.value = input;
        return target;
      } else {
        return _primitiveTypes2.default.symbol;
      }
    }
  }, {
    key: 'typeParameter',
    value: function typeParameter(id, bound) {
      var target = new _types.TypeParameter(this);
      target.id = id;
      target.bound = bound;
      return target;
    }
  }, {
    key: 'bindTypeParameters',
    value: function bindTypeParameters(subject) {
      // Issue 252
      var typeParameters = subject[_symbols.TypeParametersSymbol];
      if (typeParameters) {
        var keys = Object.keys(typeParameters);

        for (var _len = arguments.length, typeInstances = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          typeInstances[_key - 1] = arguments[_key];
        }

        var length = Math.min(keys.length, typeInstances.length);
        for (var i = 0; i < length; i++) {
          var typeParam = typeParameters[keys[i]];
          typeParam.bound = typeInstances[i];
        }
      }
      return subject;
    }
  }, {
    key: 'module',
    value: function module(name, body) {
      var target = new _declarations.ModuleDeclaration(this);
      target.name = name;
      var innerContext = this.createContext();
      // Issue 252
      innerContext[_symbols.ParentSymbol] = this;
      // Issue 252
      innerContext[_symbols.CurrentModuleSymbol] = target;

      target.innerContext = innerContext;
      body(innerContext);
      return target;
    }
  }, {
    key: 'moduleExports',
    value: function moduleExports(type) {
      var currentModule = this[_symbols.CurrentModuleSymbol];
      if (!currentModule) {
        throw new Error('Cannot declare module.exports outside of a module.');
      }
      var target = new _declarations.ModuleExportsDeclaration(this);
      target.type = type;
      currentModule.moduleExports = target;
      return target;
    }
  }, {
    key: 'var',
    value: function _var(name, type) {
      var target = new _declarations.VarDeclaration(this);
      target.name = name;
      target.type = type;
      return target;
    }
  }, {
    key: 'class',
    value: function _class(name, head) {
      var target = new _declarations.ClassDeclaration(this);
      if (typeof head === 'function') {
        return target;
      }
      target.name = name;

      for (var _len2 = arguments.length, tail = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        tail[_key2 - 2] = arguments[_key2];
      }

      tail.unshift(head);
      var length = tail.length;

      var properties = [];
      var body = void 0;

      for (var i = 0; i < length; i++) {
        var item = tail[i];
        if (item instanceof _types.ObjectTypeProperty) {
          properties.push(item);
        } else if (item instanceof _types.ObjectType) {
          (0, _invariant2.default)(!body, 'Class body must only be declared once.');
          body = item;
        } else if (item instanceof _declarations.ExtendsDeclaration) {
          (0, _invariant2.default)(!target.superClass, 'Classes can only have one super class.');
          target.superClass = item;
        } else if (item != null && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && !(item instanceof _types.Type)) {
          for (var propertyName in item) {
            // eslint-disable-line
            properties.push(this.property(propertyName, item[propertyName]));
          }
        } else {
          throw new Error('ClassDeclaration cannot contain the given type directly.');
        }
      }
      if (!body) {
        body = new _types.ObjectType(this);
      }
      if (properties.length) {
        var _body$properties;

        (_body$properties = body.properties).push.apply(_body$properties, properties);
      }
      target.body = body;
      return target;
    }
  }, {
    key: 'extends',
    value: function _extends(subject) {
      var target = new _declarations.ExtendsDeclaration(this);

      for (var _len3 = arguments.length, typeInstances = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        typeInstances[_key3 - 1] = arguments[_key3];
      }

      target.type = this.ref.apply(this, [subject].concat(_toConsumableArray(typeInstances)));
      return target;
    }
  }, {
    key: 'fn',
    value: function fn(head) {
      for (var _len4 = arguments.length, tail = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        tail[_key4 - 1] = arguments[_key4];
      }

      return this.function.apply(this, [head].concat(tail));
    }
  }, {
    key: 'function',
    value: function _function(head) {
      if (typeof head === 'function') {
        var _target3 = new _types.ParameterizedFunctionType(this);
        _target3.bodyCreator = head;
        return _target3;
      }
      var target = new _types.FunctionType(this);

      for (var _len5 = arguments.length, tail = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        tail[_key5 - 1] = arguments[_key5];
      }

      tail.unshift(head);
      var length = tail.length;

      for (var i = 0; i < length; i++) {
        var item = tail[i];
        if (item instanceof _types.FunctionTypeParam) {
          target.params.push(item);
        } else if (item instanceof _types.FunctionTypeRestParam) {
          target.rest = item;
        } else if (item instanceof _types.FunctionTypeReturn) {
          target.returnType = item;
        } else {
          throw new Error('FunctionType cannot contain the given type directly.');
        }
      }
      return target;
    }
  }, {
    key: 'param',
    value: function param(name, type) {
      var optional = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var target = new _types.FunctionTypeParam(this);
      target.name = name;
      target.type = type;
      target.optional = optional;
      return target;
    }
  }, {
    key: 'rest',
    value: function rest(name, type) {
      var target = new _types.FunctionTypeRestParam(this);
      target.name = name;
      target.type = type;
      return target;
    }
  }, {
    key: 'return',
    value: function _return(type) {
      var target = new _types.FunctionTypeReturn(this);
      target.type = type;
      return target;
    }
  }, {
    key: 'generator',
    value: function generator(yieldType, returnType, nextType) {
      var target = new _types.GeneratorType(this);
      target.yieldType = yieldType;
      target.returnType = returnType || this.any();
      target.nextType = nextType || this.any();
      return target;
    }
  }, {
    key: 'object',
    value: function object(head) {
      var target = new _types.ObjectType(this);
      if (head != null && (typeof head === 'undefined' ? 'undefined' : _typeof(head)) === 'object' && !(head instanceof _types.Type)) {
        for (var propertyName in head) {
          // eslint-disable-line
          target.properties.push(this.property(propertyName, head[propertyName]));
        }
      } else {
        var body = void 0;

        for (var _len6 = arguments.length, tail = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          tail[_key6 - 1] = arguments[_key6];
        }

        if (head) {
          body = [head].concat(_toConsumableArray(tail));
        } else {
          body = tail;
        }
        var _body = body,
            length = _body.length;

        for (var i = 0; i < length; i++) {
          var item = body[i];
          if (item instanceof _types.ObjectTypeProperty) {
            target.properties.push(item);
          } else if (item instanceof _types.ObjectTypeIndexer) {
            target.indexers.push(item);
          } else if (item instanceof _types.ObjectTypeCallProperty) {
            target.callProperties.push(item);
          } else {
            throw new Error('ObjectType cannot contain the given type directly.');
          }
        }
      }
      return target;
    }
  }, {
    key: 'exactObject',
    value: function exactObject(head) {
      for (var _len7 = arguments.length, tail = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        tail[_key7 - 1] = arguments[_key7];
      }

      var object = this.object.apply(this, [head].concat(_toConsumableArray(tail)));
      object.exact = true;
      return object;
    }
  }, {
    key: 'callProperty',
    value: function callProperty(value) {
      var target = new _types.ObjectTypeCallProperty(this);
      target.value = value;
      return target;
    }
  }, {
    key: 'property',
    value: function property(key, value) {
      var optional = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var target = new _types.ObjectTypeProperty(this);
      target.key = key;
      if (value instanceof _types.Type) {
        target.value = value;
      } else {
        target.value = this.object(value);
      }
      target.optional = optional;
      return target;
    }
  }, {
    key: 'indexer',
    value: function indexer(id, key, value) {
      var target = new _types.ObjectTypeIndexer(this);
      target.id = id;
      target.key = key;
      target.value = value;
      return target;
    }
  }, {
    key: 'method',
    value: function method(name, head) {
      var target = new _types.ObjectTypeProperty(this);
      target.key = name;

      for (var _len8 = arguments.length, tail = Array(_len8 > 2 ? _len8 - 2 : 0), _key8 = 2; _key8 < _len8; _key8++) {
        tail[_key8 - 2] = arguments[_key8];
      }

      target.value = this.function.apply(this, [head].concat(tail));
      return target;
    }
  }, {
    key: 'tuple',
    value: function tuple() {
      var target = new _types.TupleType(this);

      for (var _len9 = arguments.length, types = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        types[_key9] = arguments[_key9];
      }

      target.types = types;
      return target;
    }
  }, {
    key: 'array',
    value: function array(elementType) {
      var target = new _types.ArrayType(this);
      target.elementType = elementType || this.any();
      return target;
    }
  }, {
    key: 'union',
    value: function union() {
      var target = new _types.UnionType(this);

      for (var _len10 = arguments.length, types = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        types[_key10] = arguments[_key10];
      }

      target.types = types;
      return target;
    }
  }, {
    key: 'intersect',
    value: function intersect() {
      var target = new _types.IntersectionType(this);

      for (var _len11 = arguments.length, types = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        types[_key11] = arguments[_key11];
      }

      target.types = types;
      return target;
    }
  }, {
    key: 'intersection',
    value: function intersection() {
      return this.intersect.apply(this, arguments);
    }
  }, {
    key: 'box',
    value: function box(reveal) {
      var box = new _types.TypeBox(this);
      box.reveal = reveal;
      return box;
    }
  }, {
    key: 'ref',
    value: function ref(subject) {
      var target = void 0;
      if (typeof subject === 'string') {
        // try and eagerly resolve the reference
        target = this.get(subject);
        if (!target) {
          // defer dereferencing for now
          target = new _types.TypeReference(this);
          target.name = subject;
        }
      } else if (typeof subject === 'function') {
        // Issue 252
        var handlerRegistry = this[_symbols.TypeConstructorRegistrySymbol];
        handlerRegistry;

        // see if we have a dedicated TypeConstructor for this.
        target = handlerRegistry.get(subject);

        if (!target) {
          // just use a generic type handler.
          target = new _types.GenericType(this);
          target.impl = subject;
          target.name = subject.name;
        }
      } else if (subject instanceof _types.Type) {
        target = subject;
      } else {
        throw new Error('Could not reference the given type.');
      }

      for (var _len12 = arguments.length, typeInstances = Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
        typeInstances[_key12 - 1] = arguments[_key12];
      }

      if (typeInstances.length) {
        var _target4;

        (0, _invariant2.default)(typeof target.apply === 'function', 'Cannot apply non-applicable type: ' + target.typeName + '.');
        return (_target4 = target).apply.apply(_target4, _toConsumableArray(typeInstances));
      } else {
        return target;
      }
    }
  }, {
    key: 'validate',
    value: function validate(type, input) {
      var validation = new _Validation2.default(this, input);
      if (typeof type.name === 'string') {
        validation.inputName = type.name;
      }
      type.collectErrors(validation, [], input);
      return validation;
    }
  }, {
    key: 'propTypes',
    value: function propTypes(type) {
      return (0, _makeReactPropTypes2.default)(type.unwrap());
    }
  }]);

  return TypeContext;
}();

exports.default = TypeContext;
});

var globalContext_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _registerPrimitiveTypes = registerPrimitiveTypes_1;

var _registerPrimitiveTypes2 = _interopRequireDefault(_registerPrimitiveTypes);

var _registerBuiltins = registerBuiltins;

var _registerBuiltins2 = _interopRequireDefault(_registerBuiltins);

var _TypeContext = TypeContext_1;

var _TypeContext2 = _interopRequireDefault(_TypeContext);

var _types = index;

var _declarations = index$2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globalContext = new _TypeContext2.default();

(0, _registerPrimitiveTypes2.default)(globalContext);
(0, _registerBuiltins2.default)(globalContext);

globalContext.TypeContext = _TypeContext2.default;

globalContext.Type = _types.Type;
globalContext.TypeBox = _types.TypeBox;
globalContext.TypeParameter = _types.TypeParameter;
globalContext.TypeReference = _types.TypeReference;
globalContext.ParameterizedTypeAlias = _types.ParameterizedTypeAlias;
globalContext.TypeAlias = _types.TypeAlias;
globalContext.TypeConstructor = _types.TypeConstructor;
globalContext.GenericType = _types.GenericType;
globalContext.NullLiteralType = _types.NullLiteralType;
globalContext.NumberType = _types.NumberType;
globalContext.NumericLiteralType = _types.NumericLiteralType;
globalContext.BooleanType = _types.BooleanType;
globalContext.BooleanLiteralType = _types.BooleanLiteralType;
globalContext.SymbolType = _types.SymbolType;
globalContext.SymbolLiteralType = _types.SymbolLiteralType;
globalContext.StringType = _types.StringType;
globalContext.StringLiteralType = _types.StringLiteralType;
globalContext.ArrayType = _types.ArrayType;
globalContext.ObjectType = _types.ObjectType;
globalContext.ObjectTypeCallProperty = _types.ObjectTypeCallProperty;
globalContext.ObjectTypeIndexer = _types.ObjectTypeIndexer;
globalContext.ObjectTypeProperty = _types.ObjectTypeProperty;
globalContext.FunctionType = _types.FunctionType;
globalContext.ParameterizedFunctionType = _types.ParameterizedFunctionType;
globalContext.FunctionTypeParam = _types.FunctionTypeParam;
globalContext.FunctionTypeRestParam = _types.FunctionTypeRestParam;
globalContext.FunctionTypeReturn = _types.FunctionTypeReturn;
globalContext.GeneratorType = _types.GeneratorType;
globalContext.ExistentialType = _types.ExistentialType;
globalContext.AnyType = _types.AnyType;
globalContext.MixedType = _types.MixedType;
globalContext.EmptyType = _types.EmptyType;
globalContext.NullableType = _types.NullableType;
globalContext.TupleType = _types.TupleType;
globalContext.UnionType = _types.UnionType;
globalContext.IntersectionType = _types.IntersectionType;
globalContext.VoidType = _types.VoidType;

globalContext.Declaration = _declarations.Declaration;
globalContext.VarDeclaration = _declarations.VarDeclaration;
globalContext.TypeDeclaration = _declarations.TypeDeclaration;
globalContext.ModuleDeclaration = _declarations.ModuleDeclaration;
globalContext.ModuleExportsDeclaration = _declarations.ModuleExportsDeclaration;
globalContext.ClassDeclaration = _declarations.ClassDeclaration;
globalContext.ExtendsDeclaration = _declarations.ExtendsDeclaration;

exports.default = globalContext;
});

var globalContext = globalContext_1;
var symbols = symbols$1;

var flowRuntime = globalContext.default;
var TypeParametersSymbol = symbols.TypeParametersSymbol;

flowRuntime.TypeParametersSymbol = TypeParametersSymbol;

// import { validateOptions } from './util/validator';
// import tpl from '../html/main.html';
// import '../styles/main.css';

// The logger should only be disabled if we’re not in production.
{

  // Enable LiveReload
  document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
}

// success auth
var removeAuthView = function removeAuthView() {
  console.log('success auth aaa');
};

var PropOptions = flowRuntime.type('PropOptions', flowRuntime.object(flowRuntime.property('password', flowRuntime.union(flowRuntime.string(), flowRuntime.number(), flowRuntime.array(flowRuntime.string())), true), flowRuntime.property('style', flowRuntime.string(), true)));


var _settingsType = PropOptions;
var settings = _settingsType.assert({
  password: 'test',
  style: 'basic'
});

var SimpleAuthClient = {

  password: [],

  start: function start(options) {
    var _optionsType = PropOptions;
    flowRuntime.param('options', _optionsType, true).assert(options);


    Object.assign(settings, options);

    console.log(settings);

    console.log('success!!!!!!');
    // document.write(tpl);

    // validateProp(String, password);
    // console.log(style);
    // if (typeof password === 'string') this.password.push(password);
    // else if (typeof password === 'number') this.password.push(password.toString());
    // else if (Array.isArray(password)) Object.assign(this.password, password);
    // else return warn('parameter password is required typeof String or Array');
    // console.log(this.password);
  },
  submit: function submit() {
    console.log('submit', password);
    var password = document.getElementById('_____SAC_____password').value.trim();
    if (this.password.includes(password)) removeAuthView();
    return false;
  }
};

return SimpleAuthClient;

})));