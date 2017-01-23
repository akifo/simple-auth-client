/*!
 * SimpleAuthClient.js v1.0.3
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

var tpl = "<div id=\"_____SimpleAuthClient_____\">\n  <div class=\"_____SAC_____container\">\n    <p class=\"_____SAC_____title\">Simple Auth</p>\n    <p class=\"_____SAC_____description\">Please entry site password</p>\n    <form onsubmit=\"return SimpleAuthClient.submit()\">\n      <input type=\"password\" id=\"_____SAC_____Password\">\n      <button>Submit</button>\n    </form>\n  </div>\n</div>";

__$styleInject("#_____SimpleAuthClient_____ {\n  position: fixed;\n  z-index: 2147483647;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  background-size: 10px 10px;\n  background-color: #f9f9f9;\n  background-image: -webkit-linear-gradient(135deg, #f1f1f1 25%, transparent 25%,\n                    transparent 50%, #f1f1f1 50%, #f1f1f1 75%,\n                    transparent 75%, transparent);\n  background-image: linear-gradient(-45deg, #f1f1f1 25%, transparent 25%,\n                    transparent 50%, #f1f1f1 50%, #f1f1f1 75%,\n                    transparent 75%, transparent);\n\n}\n\n\n#_____SimpleAuthClient_____ ._____SAC_____container {\n  position: relative;\n  z-index: 2;\n  -webkit-box-flex: 0;\n      -ms-flex: 0 1 50%;\n          flex: 0 1 50%;\n  min-width: 300px;\n  max-width: 500px;\n  background-color: #fff;\n  box-shadow: 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12), 0 5px 5px -3px rgba(0, 0, 0, .3);\n  border-radius: 2px;\n  -webkit-animation-duration: 1.5s;\n          animation-duration: 1.5s;\n  -webkit-animation-name: fadeInDownSAC;\n          animation-name: fadeInDownSAC;\n  padding: 20px 40px;\n\n}\n\n\n#_____SimpleAuthClient_____ ._____SAC_____container ._____SAC_____title {\n  padding: 0;\n  margin: 20px 0 10px;\n  font-size: 20px;\n  font-weight: 800;\n\n}\n\n\n#_____SimpleAuthClient_____ ._____SAC_____container ._____SAC_____description {\n  padding: 0;\n  margin: 10px 0 20px;\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 1.6\n\n}\n\n\n#_____SimpleAuthClient_____ ._____SAC_____container form {\n  padding: 0;\n  margin: 20px 0;\n  overflow: hidden;\n\n}\n\n\n#_____SimpleAuthClient_____ ._____SAC_____container form input {\n  background-color: transparent;\n  border: 1px solid #9e9e9e;\n  border-radius: 0;\n  outline: none;\n  height: 45px;\n  width: calc(100% - 42px);\n  font-size: 14px;\n  margin: 0 0 20px 0;\n  padding: 0 20px;\n  box-shadow: none;\n  box-sizing: content-box;\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n  color: #000;\n  line-height: normal;\n\n}\n\n\n#_____SimpleAuthClient_____ ._____SAC_____container form button {\n  float: right;\n  display: inline-block;\n  text-decoration: none;\n  color: #fff;\n  background-color: #26a69a;\n  text-align: center;\n  letter-spacing: .5px;\n  -webkit-transition: .2s ease-out;\n  transition: .2s ease-out;\n  cursor: pointer;\n  border: none;\n  border-radius: 2px;\n  height: 36px;\n  line-height: 36px;\n  padding: 0 32px;\n  padding: 0 2rem;\n  margin: 0 0 10px;\n  outline: none;\n  vertical-align: middle;\n  -webkit-tap-highlight-color: transparent;\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12), 0 3px 1px -2px rgba(0, 0, 0, .2);\n\n}\n\n\n#_____SimpleAuthClient_____ ._____SAC_____container form button:hover {\n  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, .14), 0 1px 7px 0 rgba(0, 0, 0, .12), 0 3px 1px -1px rgba(0, 0, 0, .2);\n\n}\n\n\n@-webkit-keyframes fadeInDownSAC {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -10px, 0);\n            transform: translate3d(0, -10px, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n            transform: none;\n  }\n}\n\n\n@keyframes fadeInDownSAC {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -10px, 0);\n            transform: translate3d(0, -10px, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n            transform: none;\n  }\n}\n", undefined);

/* Import modules
-------------------------------------------------------------- */
/* Settings
-------------------------------------------------------------- */
var SAC_WRAP_ID = '_____SAC_____Wrap';
var SAC_PASS_ID = '_____SAC_____Password';

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
var $SAC = void 0;

/* Functions
-------------------------------------------------------------- */
// success auth
var removeAuthView = function removeAuthView() {

  console.log('success auth aaa');

  // remove auth view
  $SAC.remove();

  // set localstrage in 10 minutes
};

// dialog
var dialog = function dialog(result, msg) {
  console.log('auth dialog', result, msg);
};

// create SimpleAuthClient Element to DOM
var createSacElement = function createSacElement() {
  $SAC = document.createElement('div');
  $SAC.id = SAC_WRAP_ID;
  $SAC.innerHTML = tpl;
  document.body.appendChild($SAC);
};

/* export object
-------------------------------------------------------------- */
var SimpleAuthClient = {

  password: [],

  start: function start(options) {

    // Merge options
    Object.assign(settings, options);

    // script was loaded at the head of document
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        createSacElement();
      });
    } else {
      // script was loaded at the end of document
      createSacElement();
      console.warn('SimpleAuthClient should load at head element');
    }

    // Password to Array
    if (typeof settings.password === 'string') this.password.push(settings.password);else if (typeof settings.password === 'number') this.password.push(settings.password.toString());else if (Array.isArray(settings.password)) Object.assign(this.password, settings.password);
    console.log(this.password);
  },
  submit: function submit() {
    var target = document.getElementById(SAC_PASS_ID);
    if (!(target instanceof HTMLInputElement)) return;
    var password = target.value.trim();
    if (this.password.includes(password)) {
      removeAuthView();
      return false;
    }
    dialog(false, 'failed');
    return false;
  }
};

return SimpleAuthClient;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLWF1dGgtY2xpZW50LmpzIiwic291cmNlcyI6WyIuLi9zcmMvc2NyaXB0cy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIEBmbG93ICovXG5cbi8qIEltcG9ydCBtb2R1bGVzXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuaW1wb3J0IHRwbCBmcm9tICcuLi9odG1sL21haW4uaHRtbCc7XG5pbXBvcnQgJy4uL3N0eWxlcy9tYWluLmNzcyc7XG5cbi8qIFNldHRpbmdzXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuY29uc3QgU0FDX1dSQVBfSUQ6c3RyaW5nID0gJ19fX19fU0FDX19fX19XcmFwJztcbmNvbnN0IFNBQ19QQVNTX0lEOnN0cmluZyA9ICdfX19fX1NBQ19fX19fUGFzc3dvcmQnO1xuXG4vKiBPbmx5IGRldmVsb3BlbWVudCBFbmFibGUgTGl2ZVJlbG9hZFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbmlmIChFTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBkb2N1bWVudC53cml0ZSgnPHNjcmlwdCBzcmM9XCJodHRwOi8vJyArIChsb2NhdGlvbi5ob3N0IHx8ICdsb2NhbGhvc3QnKS5zcGxpdCgnOicpWzBdICtcbiAgJzozNTcyOS9saXZlcmVsb2FkLmpzP3NuaXB2ZXI9MVwiPjwvJyArICdzY3JpcHQ+JykgIDtcbn1cblxuLyogZmxvdyB0eXBlc1xuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbnR5cGUgUHJvcE9wdGlvbnMgPSB7XG4gIHBhc3N3b3JkPzogc3RyaW5nIHwgbnVtYmVyIHwgQXJyYXk8c3RyaW5nPixcbiAgc3R5bGU/OiBzdHJpbmdcbn1cblxuLyogVmFyaWFibGVzXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xubGV0IHNldHRpbmdzOlByb3BPcHRpb25zID0ge1xuICBwYXNzd29yZDogJ3Rlc3QnLFxuICBzdHlsZTogJ2Jhc2ljJ1xufTtcbmxldCAkU0FDOkhUTUxFbGVtZW50O1xuXG4vKiBGdW5jdGlvbnNcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vLyBzdWNjZXNzIGF1dGhcbmNvbnN0IHJlbW92ZUF1dGhWaWV3ID0gKCkgPT4ge1xuXG4gIGNvbnNvbGUubG9nKCdzdWNjZXNzIGF1dGggYWFhJyk7XG5cbiAgLy8gcmVtb3ZlIGF1dGggdmlld1xuICAkU0FDLnJlbW92ZSgpO1xuXG4gIC8vIHNldCBsb2NhbHN0cmFnZSBpbiAxMCBtaW51dGVzXG5cbn07XG5cbi8vIGRpYWxvZ1xuY29uc3QgZGlhbG9nID0gKHJlc3VsdCwgbXNnKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdhdXRoIGRpYWxvZycsIHJlc3VsdCwgbXNnKTtcbn07XG5cbi8vIGNyZWF0ZSBTaW1wbGVBdXRoQ2xpZW50IEVsZW1lbnQgdG8gRE9NXG5jb25zdCBjcmVhdGVTYWNFbGVtZW50ID0gKCkgPT4ge1xuICAkU0FDID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICRTQUMuaWQgPSBTQUNfV1JBUF9JRDtcbiAgJFNBQy5pbm5lckhUTUwgPSB0cGw7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoJFNBQyk7XG59O1xuXG4vKiBleHBvcnQgb2JqZWN0XG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuY29uc3QgU2ltcGxlQXV0aENsaWVudCA9IHtcblxuICBwYXNzd29yZDogW10sXG5cbiAgc3RhcnQgKG9wdGlvbnM/OiBQcm9wT3B0aW9ucykge1xuXG4gICAgLy8gTWVyZ2Ugb3B0aW9uc1xuICAgIE9iamVjdC5hc3NpZ24oc2V0dGluZ3MsIG9wdGlvbnMpO1xuXG4gICAgLy8gc2NyaXB0IHdhcyBsb2FkZWQgYXQgdGhlIGhlYWQgb2YgZG9jdW1lbnRcbiAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNyZWF0ZVNhY0VsZW1lbnQoKTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHsgLy8gc2NyaXB0IHdhcyBsb2FkZWQgYXQgdGhlIGVuZCBvZiBkb2N1bWVudFxuICAgICAgY3JlYXRlU2FjRWxlbWVudCgpO1xuICAgICAgY29uc29sZS53YXJuKCdTaW1wbGVBdXRoQ2xpZW50IHNob3VsZCBsb2FkIGF0IGhlYWQgZWxlbWVudCcpO1xuICAgIH1cblxuICAgIC8vIFBhc3N3b3JkIHRvIEFycmF5XG4gICAgaWYgKHR5cGVvZiBzZXR0aW5ncy5wYXNzd29yZCA9PT0gJ3N0cmluZycpIHRoaXMucGFzc3dvcmQucHVzaChzZXR0aW5ncy5wYXNzd29yZCk7XG4gICAgZWxzZSBpZiAodHlwZW9mIHNldHRpbmdzLnBhc3N3b3JkID09PSAnbnVtYmVyJykgdGhpcy5wYXNzd29yZC5wdXNoKHNldHRpbmdzLnBhc3N3b3JkLnRvU3RyaW5nKCkpO1xuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoc2V0dGluZ3MucGFzc3dvcmQpKSBPYmplY3QuYXNzaWduKHRoaXMucGFzc3dvcmQsIHNldHRpbmdzLnBhc3N3b3JkKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnBhc3N3b3JkKTtcblxuICB9LFxuXG4gIHN1Ym1pdCAoKSB7XG4gICAgY29uc3QgdGFyZ2V0ID1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChTQUNfUEFTU19JRCk7XG4gICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkpIHJldHVybjtcbiAgICB2YXIgcGFzc3dvcmQgPSB0YXJnZXQudmFsdWUudHJpbSgpO1xuICAgIGlmICh0aGlzLnBhc3N3b3JkLmluY2x1ZGVzKHBhc3N3b3JkKSkge1xuICAgICAgcmVtb3ZlQXV0aFZpZXcoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZGlhbG9nKGZhbHNlLCAnZmFpbGVkJyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaW1wbGVBdXRoQ2xpZW50O1xuIl0sIm5hbWVzIjpbIlNBQ19XUkFQX0lEIiwiU0FDX1BBU1NfSUQiLCJFTlYiLCJ3cml0ZSIsImxvY2F0aW9uIiwiaG9zdCIsInNwbGl0Iiwic2V0dGluZ3MiLCIkU0FDIiwicmVtb3ZlQXV0aFZpZXciLCJsb2ciLCJyZW1vdmUiLCJkaWFsb2ciLCJyZXN1bHQiLCJtc2ciLCJjcmVhdGVTYWNFbGVtZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJpbm5lckhUTUwiLCJ0cGwiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJTaW1wbGVBdXRoQ2xpZW50Iiwib3B0aW9ucyIsImFzc2lnbiIsInJlYWR5U3RhdGUiLCJhZGRFdmVudExpc3RlbmVyIiwid2FybiIsInBhc3N3b3JkIiwicHVzaCIsInRvU3RyaW5nIiwiQXJyYXkiLCJpc0FycmF5IiwiT2JqZWN0IiwidGFyZ2V0IiwiZ2V0RWxlbWVudEJ5SWQiLCJIVE1MSW5wdXRFbGVtZW50IiwidmFsdWUiLCJ0cmltIiwiaW5jbHVkZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBRUEsQUFDQSxBQUVBOztBQUVBLElBQU1BLGNBQXFCLG1CQUEzQjtBQUNBLElBQU1DLGNBQXFCLHVCQUEzQjs7OztBQUlBLEFBQUlDLEFBQUosQUFBMEI7V0FDZkMsS0FBVCxDQUFlLHlCQUF5QixDQUFDQyxTQUFTQyxJQUFULElBQWlCLFdBQWxCLEVBQStCQyxLQUEvQixDQUFxQyxHQUFyQyxFQUEwQyxDQUExQyxDQUF6QixHQUNmLG9DQURlLEdBQ3dCLFNBRHZDOzs7Ozs7Ozs7QUFhRixJQUFJQyxXQUF1QjtZQUNmLE1BRGU7U0FFbEI7Q0FGVDtBQUlBLElBQUlDLGFBQUo7Ozs7O0FBS0EsSUFBTUMsaUJBQWlCLFNBQWpCQSxjQUFpQixHQUFNOztVQUVuQkMsR0FBUixDQUFZLGtCQUFaOzs7T0FHS0MsTUFBTDs7O0NBTEY7OztBQVlBLElBQU1DLFNBQVMsU0FBVEEsTUFBUyxDQUFDQyxNQUFELEVBQVNDLEdBQVQsRUFBaUI7VUFDdEJKLEdBQVIsQ0FBWSxhQUFaLEVBQTJCRyxNQUEzQixFQUFtQ0MsR0FBbkM7Q0FERjs7O0FBS0EsSUFBTUMsbUJBQW1CLFNBQW5CQSxnQkFBbUIsR0FBTTtTQUN0QkMsU0FBU0MsYUFBVCxDQUF1QixLQUF2QixDQUFQO09BQ0tDLEVBQUwsR0FBVWxCLFdBQVY7T0FDS21CLFNBQUwsR0FBaUJDLEdBQWpCO1dBQ1NDLElBQVQsQ0FBY0MsV0FBZCxDQUEwQmQsSUFBMUI7Q0FKRjs7OztBQVNBLElBQU1lLG1CQUFtQjs7WUFFYixFQUZhOztPQUFBLGlCQUloQkMsT0FKZ0IsRUFJTzs7O1dBR3JCQyxNQUFQLENBQWNsQixRQUFkLEVBQXdCaUIsT0FBeEI7OztRQUdJUixTQUFTVSxVQUFULEtBQXdCLFNBQTVCLEVBQXVDO2VBQzVCQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBVzs7T0FBekQ7S0FERixNQUtPOzs7Y0FFR0MsSUFBUixDQUFhLDhDQUFiOzs7O1FBSUUsT0FBT3JCLFNBQVNzQixRQUFoQixLQUE2QixRQUFqQyxFQUEyQyxLQUFLQSxRQUFMLENBQWNDLElBQWQsQ0FBbUJ2QixTQUFTc0IsUUFBNUIsRUFBM0MsS0FDSyxJQUFJLE9BQU90QixTQUFTc0IsUUFBaEIsS0FBNkIsUUFBakMsRUFBMkMsS0FBS0EsUUFBTCxDQUFjQyxJQUFkLENBQW1CdkIsU0FBU3NCLFFBQVQsQ0FBa0JFLFFBQWxCLEVBQW5CLEVBQTNDLEtBQ0EsSUFBSUMsTUFBTUMsT0FBTixDQUFjMUIsU0FBU3NCLFFBQXZCLENBQUosRUFBc0NLLE9BQU9ULE1BQVAsQ0FBYyxLQUFLSSxRQUFuQixFQUE2QnRCLFNBQVNzQixRQUF0QztZQUNuQ25CLEdBQVIsQ0FBWSxLQUFLbUIsUUFBakI7R0F4QnFCO1FBQUEsb0JBNEJiO1FBQ0ZNLFNBQVFuQixTQUFTb0IsY0FBVCxDQUF3Qm5DLFdBQXhCLENBQWQ7UUFDSSxFQUFFa0Msa0JBQWtCRSxnQkFBcEIsQ0FBSixFQUEyQztRQUN2Q1IsV0FBV00sT0FBT0csS0FBUCxDQUFhQyxJQUFiLEVBQWY7UUFDSSxLQUFLVixRQUFMLENBQWNXLFFBQWQsQ0FBdUJYLFFBQXZCLENBQUosRUFBc0M7O2FBRTdCLEtBQVA7O1dBRUssS0FBUCxFQUFjLFFBQWQ7V0FDTyxLQUFQOztDQXJDSixDQXlDQTs7OzsifQ==
