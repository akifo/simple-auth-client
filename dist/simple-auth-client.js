/*!
 * SimpleAuthClient.js v1.0.4
 * (c) 2017-2017 Akiho Nagao
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.SimpleAuthClient = factory());
}(this, (function () { 'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
  return returnValue;
}

var tpl = "<div id=\"_____SAC_____Form_Box\" class=\"active\">\n  <div class=\"_____SAC_____Form_container\">\n    <p class=\"_____SAC_____Form_title\">Simple Auth</p>\n    <p class=\"_____SAC_____Form_description\">Please entry site password</p>\n    <form onsubmit=\"return SimpleAuthClient.submit()\">\n      <input type=\"password\" id=\"_____SAC_____Form_Password\">\n      <button>Submit</button>\n    </form>\n  </div>\n</div>\n<div class=\"_____SAC_____Dialog_Box\">\n  <ol id=\"_____SAC_____Dialog_List\"></ol>\n</div>\n";

__$styleInject("#_____SAC_____Form_Box {\n  position: fixed;\n  z-index: 2147483646;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  background-size: 10px 10px;\n  background-color: #f9f9f9;\n  background-image: -webkit-linear-gradient(135deg, #f1f1f1 25%, transparent 25%,\n                    transparent 50%, #f1f1f1 50%, #f1f1f1 75%,\n                    transparent 75%, transparent);\n  background-image: linear-gradient(-45deg, #f1f1f1 25%, transparent 25%,\n                    transparent 50%, #f1f1f1 50%, #f1f1f1 75%,\n                    transparent 75%, transparent);\n  -webkit-transition: opacity ease 1s;\n  transition: opacity ease 1s;\n  opacity: 0;\n\n}\n\n#_____SAC_____Form_Box.active {\n  opacity: 1;\n\n}\n\n#_____SAC_____Form_Box ._____SAC_____Form_container {\n  position: relative;\n  z-index: 2;\n  -webkit-box-flex: 0;\n      -ms-flex: 0 1 50%;\n          flex: 0 1 50%;\n  min-width: 300px;\n  max-width: 500px;\n  background-color: #fff;\n  box-shadow: 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12), 0 5px 5px -3px rgba(0, 0, 0, .3);\n  border-radius: 2px;\n  -webkit-animation-duration: 1.5s;\n          animation-duration: 1.5s;\n  -webkit-animation-name: fadeInDownSAC;\n          animation-name: fadeInDownSAC;\n  padding: 20px 40px;\n\n}\n\n#_____SAC_____Form_Box ._____SAC_____Form_container ._____SAC_____Form_title {\n  padding: 0;\n  margin: 20px 0 10px;\n  font-size: 20px;\n  font-weight: 800;\n\n}\n\n#_____SAC_____Form_Box ._____SAC_____Form_container ._____SAC_____Form_description {\n  padding: 0;\n  margin: 10px 0 20px;\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 1.6\n\n}\n\n#_____SAC_____Form_Box ._____SAC_____Form_container form {\n  padding: 0;\n  margin: 20px 0;\n  overflow: hidden;\n\n}\n\n#_____SAC_____Form_Box ._____SAC_____Form_container form input {\n  background-color: transparent;\n  border: 1px solid #9e9e9e;\n  border-radius: 0;\n  outline: none;\n  height: 45px;\n  width: calc(100% - 42px);\n  font-size: 14px;\n  margin: 0 0 20px 0;\n  padding: 0 20px;\n  box-shadow: none;\n  box-sizing: content-box;\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n  color: #000;\n  line-height: normal;\n\n}\n\n#_____SAC_____Form_Box ._____SAC_____Form_container form button {\n  float: right;\n  display: inline-block;\n  text-decoration: none;\n  color: #fff;\n  background-color: #26a69a;\n  text-align: center;\n  letter-spacing: .5px;\n  -webkit-transition: .2s ease-out;\n  transition: .2s ease-out;\n  cursor: pointer;\n  border: none;\n  border-radius: 2px;\n  height: 36px;\n  line-height: 36px;\n  padding: 0 32px;\n  padding: 0 2rem;\n  margin: 0 0 10px;\n  outline: none;\n  vertical-align: middle;\n  -webkit-tap-highlight-color: transparent;\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12), 0 3px 1px -2px rgba(0, 0, 0, .2);\n\n}\n\n#_____SAC_____Form_Box ._____SAC_____Form_container form button:hover {\n  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, .14), 0 1px 7px 0 rgba(0, 0, 0, .12), 0 3px 1px -1px rgba(0, 0, 0, .2);\n\n}\n\n._____SAC_____Dialog_Box {\n  z-index: 2147483647;\n  position: fixed;\n  top: 20px;\n  right: 20px;\n  width: auto;\n\n}\n\n._____SAC_____Dialog_Box #_____SAC_____Dialog_List li {\n  border-width: 1px;\n  border-style: solid;\n  margin: 10px;\n  padding: 10px 20px;\n  opacity: 0;\n  -webkit-transition: all ease 1s;\n  transition: all ease 1s;\n  -webkit-transform: translateY(30px);\n          transform: translateY(30px);\n  list-style: none;\n\n}\n\n._____SAC_____Dialog_Box #_____SAC_____Dialog_List li.active {\n  opacity: 1;\n  -webkit-transform: translateY(0);\n          transform: translateY(0);\n\n}\n\n._____SAC_____Dialog_Box #_____SAC_____Dialog_List li.remove {\n  opacity: 0;\n  -webkit-transform: translateY(-100px);\n          transform: translateY(-100px);\n\n}\n\n._____SAC_____Dialog_Box #_____SAC_____Dialog_List li.success {\n  color: #fff;\n  background-color: rgba(22, 160, 133, 0.8);\n  border-color: #16a085;\n\n}\n\n._____SAC_____Dialog_Box #_____SAC_____Dialog_List li.alert {\n  color: #fff;\n  background-color: rgba(192, 57, 43, 0.8);\n  border-color: #c0392b;\n\n}\n\n\n@-webkit-keyframes fadeInDownSAC {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -10px, 0);\n            transform: translate3d(0, -10px, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n            transform: none;\n  }\n}\n\n\n@keyframes fadeInDownSAC {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -10px, 0);\n            transform: translate3d(0, -10px, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n            transform: none;\n  }\n}\n", undefined);

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var js_cookie = createCommonjsModule(function (module, exports) {
/*!
 * JavaScript Cookie v2.1.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof undefined === 'function' && undefined.amd) {
		undefined(factory);
		registeredInModuleLoader = true;
	}
	{
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				return (document.cookie = [
					key, '=', value,
					attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
					attributes.path ? '; path=' + attributes.path : '',
					attributes.domain ? '; domain=' + attributes.domain : '',
					attributes.secure ? '; secure' : ''
				].join(''));
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));
});

/* Import modules
-------------------------------------------------------------- */
/* Settings
-------------------------------------------------------------- */
var SAC_WRAP_ID = '_____SAC_____Wrap';
var SAC_FORM_BOX = '_____SAC_____Form_Box';
var SAC_PASS_ID = '_____SAC_____Form_Password';
var SAC_DIALOG_LIST_ID = '_____SAC_____Dialog_List';
var SAC_COOKIE_PASS_KEY = '6rtzmCrPCfv0chRmSM0I4CIASQ1TQ4';

/* Only developement Enable LiveReload
-------------------------------------------------------------- */
{
  document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
}

/* flow types
-------------------------------------------------------------- */


/* Variables
-------------------------------------------------------------- */
var settings = {
  password: 'test',
  style: 'basic'
};

/* Objects
-------------------------------------------------------------- */

var sac = {

  $sac: undefined,

  // create SimpleAuthClient Element to DOM
  constructor: function constructor() {
    this.$sac = document.createElement('div');
    this.$sac.id = SAC_WRAP_ID;
    this.$sac.innerHTML = tpl;
    document.body.appendChild(this.$sac);
    dialog.constructor();
    // get the password html input element
    SimpleAuthClient.$password = document.getElementById(SAC_PASS_ID);
  },


  // remove SAC view
  remove: function remove() {
    var self = this;
    setTimeout(function () {
      self.$sac.remove();
    }, 4000);
  }
};

var form = {

  $form: undefined,

  // hidden form Box with animate
  remove: function remove() {
    var target = document.getElementById(SAC_FORM_BOX);
    target.className = '';
  }
};

var dialog = {
  $dialog: undefined,

  constructor: function constructor() {
    this.$dialog = document.getElementById(SAC_DIALOG_LIST_ID);
  },
  show: function show(result, msg) {

    var $msg = document.createElement('li');

    $msg.className = result;
    $msg.innerText = msg;
    this.$dialog.appendChild($msg);

    setTimeout(function () {
      $msg.className += ' active';
    }, 100);

    setTimeout(function () {
      $msg.className = result + ' remove';
    }, 3000);

    setTimeout(function () {
      $msg.remove();
    }, 4000);
  }
};

var auth = {

  password: [],

  setPasswordArray: function setPasswordArray(options) {
    Object.assign(settings, options);
    if (typeof settings.password === 'string') this.password.push(settings.password);else if (typeof settings.password === 'number') this.password.push(settings.password.toString());else if (Array.isArray(settings.password)) Object.assign(this.password, settings.password);
  },
  check: function check(password) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      if (_this.password.includes(password)) resolve();
      reject();
    });
  }
};

/* export object
-------------------------------------------------------------- */
var SimpleAuthClient = {

  $password: undefined,

  start: function start(options) {

    // Password to Array
    auth.setPasswordArray(options);

    auth.check(js_cookie.get(SAC_COOKIE_PASS_KEY)).catch(function () {

      // script was loaded at the head of document
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
          sac.constructor();
        });
      } else {
        // script was loaded at the end of document
        sac.constructor();
        console.warn('SimpleAuthClient should load at head element');
      }
    });
  },
  submit: function submit() {
    var password = this.$password.value.trim();

    // success auth
    auth.check(password).then(function () {
      dialog.show('success', 'Auth Success');
      form.remove();
      sac.remove();
      js_cookie.set(SAC_COOKIE_PASS_KEY, password, { expires: 1 });
    }).catch(function () {
      dialog.show('alert', 'Auth Failed');
    });

    return false;
  }
};

return SimpleAuthClient;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLWF1dGgtY2xpZW50LmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvanMtY29va2llL3NyYy9qcy5jb29raWUuanMiLCIuLi9zcmMvc2NyaXB0cy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogSmF2YVNjcmlwdCBDb29raWUgdjIuMS4zXG4gKiBodHRwczovL2dpdGh1Yi5jb20vanMtY29va2llL2pzLWNvb2tpZVxuICpcbiAqIENvcHlyaWdodCAyMDA2LCAyMDE1IEtsYXVzIEhhcnRsICYgRmFnbmVyIEJyYWNrXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuOyhmdW5jdGlvbiAoZmFjdG9yeSkge1xuXHR2YXIgcmVnaXN0ZXJlZEluTW9kdWxlTG9hZGVyID0gZmFsc2U7XG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoZmFjdG9yeSk7XG5cdFx0cmVnaXN0ZXJlZEluTW9kdWxlTG9hZGVyID0gdHJ1ZTtcblx0fVxuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdFx0cmVnaXN0ZXJlZEluTW9kdWxlTG9hZGVyID0gdHJ1ZTtcblx0fVxuXHRpZiAoIXJlZ2lzdGVyZWRJbk1vZHVsZUxvYWRlcikge1xuXHRcdHZhciBPbGRDb29raWVzID0gd2luZG93LkNvb2tpZXM7XG5cdFx0dmFyIGFwaSA9IHdpbmRvdy5Db29raWVzID0gZmFjdG9yeSgpO1xuXHRcdGFwaS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0d2luZG93LkNvb2tpZXMgPSBPbGRDb29raWVzO1xuXHRcdFx0cmV0dXJuIGFwaTtcblx0XHR9O1xuXHR9XG59KGZ1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gZXh0ZW5kICgpIHtcblx0XHR2YXIgaSA9IDA7XG5cdFx0dmFyIHJlc3VsdCA9IHt9O1xuXHRcdGZvciAoOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXR0cmlidXRlcyA9IGFyZ3VtZW50c1sgaSBdO1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIGF0dHJpYnV0ZXMpIHtcblx0XHRcdFx0cmVzdWx0W2tleV0gPSBhdHRyaWJ1dGVzW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRmdW5jdGlvbiBpbml0IChjb252ZXJ0ZXIpIHtcblx0XHRmdW5jdGlvbiBhcGkgKGtleSwgdmFsdWUsIGF0dHJpYnV0ZXMpIHtcblx0XHRcdHZhciByZXN1bHQ7XG5cdFx0XHRpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIFdyaXRlXG5cblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRhdHRyaWJ1dGVzID0gZXh0ZW5kKHtcblx0XHRcdFx0XHRwYXRoOiAnLydcblx0XHRcdFx0fSwgYXBpLmRlZmF1bHRzLCBhdHRyaWJ1dGVzKTtcblxuXHRcdFx0XHRpZiAodHlwZW9mIGF0dHJpYnV0ZXMuZXhwaXJlcyA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0XHR2YXIgZXhwaXJlcyA9IG5ldyBEYXRlKCk7XG5cdFx0XHRcdFx0ZXhwaXJlcy5zZXRNaWxsaXNlY29uZHMoZXhwaXJlcy5nZXRNaWxsaXNlY29uZHMoKSArIGF0dHJpYnV0ZXMuZXhwaXJlcyAqIDg2NGUrNSk7XG5cdFx0XHRcdFx0YXR0cmlidXRlcy5leHBpcmVzID0gZXhwaXJlcztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0cmVzdWx0ID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuXHRcdFx0XHRcdGlmICgvXltcXHtcXFtdLy50ZXN0KHJlc3VsdCkpIHtcblx0XHRcdFx0XHRcdHZhbHVlID0gcmVzdWx0O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBjYXRjaCAoZSkge31cblxuXHRcdFx0XHRpZiAoIWNvbnZlcnRlci53cml0ZSkge1xuXHRcdFx0XHRcdHZhbHVlID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyh2YWx1ZSkpXG5cdFx0XHRcdFx0XHQucmVwbGFjZSgvJSgyM3wyNHwyNnwyQnwzQXwzQ3wzRXwzRHwyRnwzRnw0MHw1Qnw1RHw1RXw2MHw3Qnw3RHw3QykvZywgZGVjb2RlVVJJQ29tcG9uZW50KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YWx1ZSA9IGNvbnZlcnRlci53cml0ZSh2YWx1ZSwga2V5KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGtleSA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoa2V5KSk7XG5cdFx0XHRcdGtleSA9IGtleS5yZXBsYWNlKC8lKDIzfDI0fDI2fDJCfDVFfDYwfDdDKS9nLCBkZWNvZGVVUklDb21wb25lbnQpO1xuXHRcdFx0XHRrZXkgPSBrZXkucmVwbGFjZSgvW1xcKFxcKV0vZywgZXNjYXBlKTtcblxuXHRcdFx0XHRyZXR1cm4gKGRvY3VtZW50LmNvb2tpZSA9IFtcblx0XHRcdFx0XHRrZXksICc9JywgdmFsdWUsXG5cdFx0XHRcdFx0YXR0cmlidXRlcy5leHBpcmVzID8gJzsgZXhwaXJlcz0nICsgYXR0cmlidXRlcy5leHBpcmVzLnRvVVRDU3RyaW5nKCkgOiAnJywgLy8gdXNlIGV4cGlyZXMgYXR0cmlidXRlLCBtYXgtYWdlIGlzIG5vdCBzdXBwb3J0ZWQgYnkgSUVcblx0XHRcdFx0XHRhdHRyaWJ1dGVzLnBhdGggPyAnOyBwYXRoPScgKyBhdHRyaWJ1dGVzLnBhdGggOiAnJyxcblx0XHRcdFx0XHRhdHRyaWJ1dGVzLmRvbWFpbiA/ICc7IGRvbWFpbj0nICsgYXR0cmlidXRlcy5kb21haW4gOiAnJyxcblx0XHRcdFx0XHRhdHRyaWJ1dGVzLnNlY3VyZSA/ICc7IHNlY3VyZScgOiAnJ1xuXHRcdFx0XHRdLmpvaW4oJycpKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVhZFxuXG5cdFx0XHRpZiAoIWtleSkge1xuXHRcdFx0XHRyZXN1bHQgPSB7fTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gVG8gcHJldmVudCB0aGUgZm9yIGxvb3AgaW4gdGhlIGZpcnN0IHBsYWNlIGFzc2lnbiBhbiBlbXB0eSBhcnJheVxuXHRcdFx0Ly8gaW4gY2FzZSB0aGVyZSBhcmUgbm8gY29va2llcyBhdCBhbGwuIEFsc28gcHJldmVudHMgb2RkIHJlc3VsdCB3aGVuXG5cdFx0XHQvLyBjYWxsaW5nIFwiZ2V0KClcIlxuXHRcdFx0dmFyIGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUgPyBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsgJykgOiBbXTtcblx0XHRcdHZhciByZGVjb2RlID0gLyglWzAtOUEtWl17Mn0pKy9nO1xuXHRcdFx0dmFyIGkgPSAwO1xuXG5cdFx0XHRmb3IgKDsgaSA8IGNvb2tpZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIHBhcnRzID0gY29va2llc1tpXS5zcGxpdCgnPScpO1xuXHRcdFx0XHR2YXIgY29va2llID0gcGFydHMuc2xpY2UoMSkuam9pbignPScpO1xuXG5cdFx0XHRcdGlmIChjb29raWUuY2hhckF0KDApID09PSAnXCInKSB7XG5cdFx0XHRcdFx0Y29va2llID0gY29va2llLnNsaWNlKDEsIC0xKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dmFyIG5hbWUgPSBwYXJ0c1swXS5yZXBsYWNlKHJkZWNvZGUsIGRlY29kZVVSSUNvbXBvbmVudCk7XG5cdFx0XHRcdFx0Y29va2llID0gY29udmVydGVyLnJlYWQgP1xuXHRcdFx0XHRcdFx0Y29udmVydGVyLnJlYWQoY29va2llLCBuYW1lKSA6IGNvbnZlcnRlcihjb29raWUsIG5hbWUpIHx8XG5cdFx0XHRcdFx0XHRjb29raWUucmVwbGFjZShyZGVjb2RlLCBkZWNvZGVVUklDb21wb25lbnQpO1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuanNvbikge1xuXHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0Y29va2llID0gSlNPTi5wYXJzZShjb29raWUpO1xuXHRcdFx0XHRcdFx0fSBjYXRjaCAoZSkge31cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoa2V5ID09PSBuYW1lKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBjb29raWU7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoIWtleSkge1xuXHRcdFx0XHRcdFx0cmVzdWx0W25hbWVdID0gY29va2llO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBjYXRjaCAoZSkge31cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0XHRhcGkuc2V0ID0gYXBpO1xuXHRcdGFwaS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRyZXR1cm4gYXBpLmNhbGwoYXBpLCBrZXkpO1xuXHRcdH07XG5cdFx0YXBpLmdldEpTT04gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gYXBpLmFwcGx5KHtcblx0XHRcdFx0anNvbjogdHJ1ZVxuXHRcdFx0fSwgW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcblx0XHR9O1xuXHRcdGFwaS5kZWZhdWx0cyA9IHt9O1xuXG5cdFx0YXBpLnJlbW92ZSA9IGZ1bmN0aW9uIChrZXksIGF0dHJpYnV0ZXMpIHtcblx0XHRcdGFwaShrZXksICcnLCBleHRlbmQoYXR0cmlidXRlcywge1xuXHRcdFx0XHRleHBpcmVzOiAtMVxuXHRcdFx0fSkpO1xuXHRcdH07XG5cblx0XHRhcGkud2l0aENvbnZlcnRlciA9IGluaXQ7XG5cblx0XHRyZXR1cm4gYXBpO1xuXHR9XG5cblx0cmV0dXJuIGluaXQoZnVuY3Rpb24gKCkge30pO1xufSkpO1xuIiwiLyogQGZsb3cgKi9cblxuLyogSW1wb3J0IG1vZHVsZXNcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5pbXBvcnQgdHBsIGZyb20gJy4uL2h0bWwvbWFpbi5odG1sJztcbmltcG9ydCAnLi4vc3R5bGVzL21haW4uY3NzJztcbmltcG9ydCBDb29raWVzIGZyb20gJ2pzLWNvb2tpZSc7XG5cbi8qIFNldHRpbmdzXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuY29uc3QgU0FDX1dSQVBfSUQ6c3RyaW5nID0gJ19fX19fU0FDX19fX19XcmFwJztcbmNvbnN0IFNBQ19GT1JNX0JPWDpzdHJpbmcgPSAnX19fX19TQUNfX19fX0Zvcm1fQm94JztcbmNvbnN0IFNBQ19QQVNTX0lEOnN0cmluZyA9ICdfX19fX1NBQ19fX19fRm9ybV9QYXNzd29yZCc7XG5jb25zdCBTQUNfRElBTE9HX0xJU1RfSUQ6c3RyaW5nID0gJ19fX19fU0FDX19fX19EaWFsb2dfTGlzdCc7XG5jb25zdCBTQUNfQ09PS0lFX1BBU1NfS0VZOnN0cmluZyA9ICc2cnR6bUNyUENmdjBjaFJtU00wSTRDSUFTUTFUUTQnO1xuXG4vKiBPbmx5IGRldmVsb3BlbWVudCBFbmFibGUgTGl2ZVJlbG9hZFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbmlmIChFTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBkb2N1bWVudC53cml0ZSgnPHNjcmlwdCBzcmM9XCJodHRwOi8vJyArIChsb2NhdGlvbi5ob3N0IHx8ICdsb2NhbGhvc3QnKS5zcGxpdCgnOicpWzBdICtcbiAgJzozNTcyOS9saXZlcmVsb2FkLmpzP3NuaXB2ZXI9MVwiPjwvJyArICdzY3JpcHQ+JykgIDtcbn1cblxuLyogZmxvdyB0eXBlc1xuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbnR5cGUgUHJvcE9wdGlvbnMgPSB7XG4gIHBhc3N3b3JkPzogc3RyaW5nIHwgbnVtYmVyIHwgQXJyYXk8c3RyaW5nPixcbiAgc3R5bGU/OiBzdHJpbmdcbn1cblxuLyogVmFyaWFibGVzXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xubGV0IHNldHRpbmdzOlByb3BPcHRpb25zID0ge1xuICBwYXNzd29yZDogJ3Rlc3QnLFxuICBzdHlsZTogJ2Jhc2ljJ1xufTtcblxuXG4vKiBPYmplY3RzXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5jb25zdCBzYWM6IHtcbiAgJHNhYz86IEhUTUxFbGVtZW50O1xuICBjb25zdHJ1Y3RvcjogRnVuY3Rpb247XG4gIHJlbW92ZTogRnVuY3Rpb25cbn0gPSB7XG5cbiAgJHNhYzogdW5kZWZpbmVkLFxuXG4gIC8vIGNyZWF0ZSBTaW1wbGVBdXRoQ2xpZW50IEVsZW1lbnQgdG8gRE9NXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLiRzYWMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLiRzYWMuaWQgPSBTQUNfV1JBUF9JRDtcbiAgICB0aGlzLiRzYWMuaW5uZXJIVE1MID0gdHBsO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy4kc2FjKTtcbiAgICBkaWFsb2cuY29uc3RydWN0b3IoKTtcbiAgICAvLyBnZXQgdGhlIHBhc3N3b3JkIGh0bWwgaW5wdXQgZWxlbWVudFxuICAgIFNpbXBsZUF1dGhDbGllbnQuJHBhc3N3b3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoU0FDX1BBU1NfSUQpO1xuICB9LFxuXG4gIC8vIHJlbW92ZSBTQUMgdmlld1xuICByZW1vdmUgKCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2VsZi4kc2FjLnJlbW92ZSgpO1xuICAgIH0sIDQwMDApO1xuICB9XG5cbn07XG5cbmNvbnN0IGZvcm06IHtcbiAgJGZvcm0/OiBIVE1MRWxlbWVudDtcbiAgcmVtb3ZlOiBGdW5jdGlvbjtcbn0gPSB7XG5cbiAgJGZvcm06IHVuZGVmaW5lZCxcblxuICAvLyBoaWRkZW4gZm9ybSBCb3ggd2l0aCBhbmltYXRlXG4gIHJlbW92ZSAoKSB7XG4gICAgY29uc3QgdGFyZ2V0ID1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChTQUNfRk9STV9CT1gpO1xuICAgIHRhcmdldC5jbGFzc05hbWUgPSAnJztcbiAgfSxcblxufTtcblxuY29uc3QgZGlhbG9nOiB7XG4gICRkaWFsb2c/OiBIVE1MRWxlbWVudDtcbiAgY29uc3RydWN0b3I6IEZ1bmN0aW9uO1xuICBzaG93OiBGdW5jdGlvblxufSA9IHtcbiAgJGRpYWxvZzogdW5kZWZpbmVkLFxuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLiRkaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChTQUNfRElBTE9HX0xJU1RfSUQpO1xuICB9LFxuXG4gIHNob3cgKHJlc3VsdDogc3RyaW5nLCBtc2c6IHN0cmluZykge1xuXG4gICAgY29uc3QgJG1zZzpIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cbiAgICAkbXNnLmNsYXNzTmFtZSA9IHJlc3VsdDtcbiAgICAkbXNnLmlubmVyVGV4dCA9IG1zZztcbiAgICB0aGlzLiRkaWFsb2cuYXBwZW5kQ2hpbGQoJG1zZyk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICRtc2cuY2xhc3NOYW1lICs9ICcgYWN0aXZlJztcbiAgICB9LCAxMDApO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAkbXNnLmNsYXNzTmFtZSA9IHJlc3VsdCArICcgcmVtb3ZlJztcbiAgICB9LCAzMDAwKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgJG1zZy5yZW1vdmUoKTtcbiAgICB9LCA0MDAwKTtcblxuICB9XG5cbn07XG5cbmNvbnN0IGF1dGg6IHtcbiAgcGFzc3dvcmQ6IEFycmF5PHN0cmluZz47XG4gIHNldFBhc3N3b3JkQXJyYXk6IEZ1bmN0aW9uO1xuICBjaGVjazogRnVuY3Rpb247XG59ID0ge1xuXG4gIHBhc3N3b3JkOiBbXSxcblxuICBzZXRQYXNzd29yZEFycmF5IChvcHRpb25zPzogUHJvcE9wdGlvbnMpIHtcbiAgICBPYmplY3QuYXNzaWduKHNldHRpbmdzLCBvcHRpb25zKTtcbiAgICBpZiAodHlwZW9mIHNldHRpbmdzLnBhc3N3b3JkID09PSAnc3RyaW5nJykgdGhpcy5wYXNzd29yZC5wdXNoKHNldHRpbmdzLnBhc3N3b3JkKTtcbiAgICBlbHNlIGlmICh0eXBlb2Ygc2V0dGluZ3MucGFzc3dvcmQgPT09ICdudW1iZXInKSB0aGlzLnBhc3N3b3JkLnB1c2goc2V0dGluZ3MucGFzc3dvcmQudG9TdHJpbmcoKSk7XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShzZXR0aW5ncy5wYXNzd29yZCkpIE9iamVjdC5hc3NpZ24odGhpcy5wYXNzd29yZCwgc2V0dGluZ3MucGFzc3dvcmQpO1xuICB9LFxuXG4gIGNoZWNrIChwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh0aGlzLnBhc3N3b3JkLmluY2x1ZGVzKHBhc3N3b3JkKSkgcmVzb2x2ZSgpO1xuICAgICAgcmVqZWN0KCk7XG4gICAgfSk7XG4gIH1cblxuXG59O1xuXG4vKiBleHBvcnQgb2JqZWN0XG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuY29uc3QgU2ltcGxlQXV0aENsaWVudDoge1xuICAkcGFzc3dvcmQ/OiBIVE1MRWxlbWVudDtcbiAgc3RhcnQ6IEZ1bmN0aW9uO1xuICBzdWJtaXQ6IEZ1bmN0aW9uO1xufSA9IHtcblxuICAkcGFzc3dvcmQgOiB1bmRlZmluZWQsXG5cbiAgc3RhcnQgKG9wdGlvbnM/OiBQcm9wT3B0aW9ucykge1xuXG4gICAgLy8gUGFzc3dvcmQgdG8gQXJyYXlcbiAgICBhdXRoLnNldFBhc3N3b3JkQXJyYXkob3B0aW9ucyk7XG5cbiAgICBhdXRoLmNoZWNrKENvb2tpZXMuZ2V0KFNBQ19DT09LSUVfUEFTU19LRVkpKVxuICAgIC5jYXRjaCgoKSA9PiB7XG5cbiAgICAgIC8vIHNjcmlwdCB3YXMgbG9hZGVkIGF0IHRoZSBoZWFkIG9mIGRvY3VtZW50XG4gICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzYWMuY29uc3RydWN0b3IoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH0gZWxzZSB7IC8vIHNjcmlwdCB3YXMgbG9hZGVkIGF0IHRoZSBlbmQgb2YgZG9jdW1lbnRcbiAgICAgICAgc2FjLmNvbnN0cnVjdG9yKCk7XG4gICAgICAgIGNvbnNvbGUud2FybignU2ltcGxlQXV0aENsaWVudCBzaG91bGQgbG9hZCBhdCBoZWFkIGVsZW1lbnQnKTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH0sXG5cbiAgc3VibWl0ICgpIHtcbiAgICBjb25zdCBwYXNzd29yZCA9IHRoaXMuJHBhc3N3b3JkLnZhbHVlLnRyaW0oKTtcblxuICAgIC8vIHN1Y2Nlc3MgYXV0aFxuICAgIGF1dGguY2hlY2socGFzc3dvcmQpLnRoZW4oKCkgPT4ge1xuICAgICAgZGlhbG9nLnNob3coJ3N1Y2Nlc3MnLCAnQXV0aCBTdWNjZXNzJyk7XG4gICAgICBmb3JtLnJlbW92ZSgpO1xuICAgICAgc2FjLnJlbW92ZSgpO1xuICAgICAgQ29va2llcy5zZXQoU0FDX0NPT0tJRV9QQVNTX0tFWSwgcGFzc3dvcmQsIHsgZXhwaXJlczogMSB9KTtcbiAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICBkaWFsb2cuc2hvdygnYWxlcnQnLCAnQXV0aCBGYWlsZWQnKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2ltcGxlQXV0aENsaWVudDtcbiJdLCJuYW1lcyI6WyJkZWZpbmUiLCJTQUNfV1JBUF9JRCIsIlNBQ19GT1JNX0JPWCIsIlNBQ19QQVNTX0lEIiwiU0FDX0RJQUxPR19MSVNUX0lEIiwiU0FDX0NPT0tJRV9QQVNTX0tFWSIsIkVOViIsIndyaXRlIiwibG9jYXRpb24iLCJob3N0Iiwic3BsaXQiLCJzZXR0aW5ncyIsInNhYyIsInVuZGVmaW5lZCIsIiRzYWMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsImlubmVySFRNTCIsInRwbCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImNvbnN0cnVjdG9yIiwiJHBhc3N3b3JkIiwiZ2V0RWxlbWVudEJ5SWQiLCJzZWxmIiwicmVtb3ZlIiwiZm9ybSIsInRhcmdldCIsImNsYXNzTmFtZSIsImRpYWxvZyIsIiRkaWFsb2ciLCJyZXN1bHQiLCJtc2ciLCIkbXNnIiwiaW5uZXJUZXh0IiwiYXV0aCIsIm9wdGlvbnMiLCJhc3NpZ24iLCJwYXNzd29yZCIsInB1c2giLCJ0b1N0cmluZyIsIkFycmF5IiwiaXNBcnJheSIsIk9iamVjdCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiaW5jbHVkZXMiLCJTaW1wbGVBdXRoQ2xpZW50Iiwic2V0UGFzc3dvcmRBcnJheSIsImNoZWNrIiwiQ29va2llcyIsImdldCIsImNhdGNoIiwicmVhZHlTdGF0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJ3YXJuIiwidmFsdWUiLCJ0cmltIiwidGhlbiIsInNob3ciLCJzZXQiLCJleHBpcmVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9BLEFBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRTtDQUNwQixJQUFJLHdCQUF3QixHQUFHLEtBQUssQ0FBQztDQUNy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
