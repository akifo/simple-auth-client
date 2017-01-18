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

// import { validateOptions } from './util/validator';
// import tpl from '../html/main.html';
// import tpl from '../styles/main.css';
// import '../styles/main.css';

{
  // Enable LiveReload
  document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
}

var settings = {
  password: 'test',
  style: 'basic'
};

var SimpleAuthClient = {

  password: [],

  start: function start(options) {

    Object.assign(settings, options);

    console.log(settings);

    console.log('success!!!!!!ab');
    document.addEventListener('DOMContentLoaded', function () {
      console.log('DOMContentLoaded');
    });
    // document.write(tpl);
    // document.body.appendChild();
    // document.body.appendChild(tpl);

    // validateProp(String, password);
    // console.log(style);
    // if (typeof password === 'string') this.password.push(password);
    // else if (typeof password === 'number') this.password.push(password.toString());
    // else if (Array.isArray(password)) Object.assign(this.password, password);
    // else return warn('parameter password is required typeof String or Array');
    // console.log(this.password);
  }
};

return SimpleAuthClient;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLWF1dGgtY2xpZW50LmpzIiwic291cmNlcyI6WyIuLi9zcmMvc2NyaXB0cy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIEBmbG93ICovXG5cbi8vIGltcG9ydCB7IHZhbGlkYXRlT3B0aW9ucyB9IGZyb20gJy4vdXRpbC92YWxpZGF0b3InO1xuLy8gaW1wb3J0IHRwbCBmcm9tICcuLi9odG1sL21haW4uaHRtbCc7XG4vLyBpbXBvcnQgdHBsIGZyb20gJy4uL3N0eWxlcy9tYWluLmNzcyc7XG4vLyBpbXBvcnQgJy4uL3N0eWxlcy9tYWluLmNzcyc7XG5cbmlmIChFTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAvLyBFbmFibGUgTGl2ZVJlbG9hZFxuICBkb2N1bWVudC53cml0ZSgnPHNjcmlwdCBzcmM9XCJodHRwOi8vJyArIChsb2NhdGlvbi5ob3N0IHx8ICdsb2NhbGhvc3QnKS5zcGxpdCgnOicpWzBdICtcbiAgJzozNTcyOS9saXZlcmVsb2FkLmpzP3NuaXB2ZXI9MVwiPjwvJyArICdzY3JpcHQ+JykgIDtcbn1cblxuLy8gc3VjY2VzcyBhdXRoXG5jb25zdCByZW1vdmVBdXRoVmlldyA9ICgpID0+IHtcbiAgY29uc29sZS5sb2coJ3N1Y2Nlc3MgYXV0aCBhYWEnKTtcbn07XG5cbnR5cGUgUHJvcE9wdGlvbnMgPSB7XG4gIHBhc3N3b3JkPzogc3RyaW5nIHwgbnVtYmVyIHwgQXJyYXk8c3RyaW5nPixcbiAgc3R5bGU/OiBzdHJpbmdcbn1cblxubGV0IHNldHRpbmdzOlByb3BPcHRpb25zID0ge1xuICBwYXNzd29yZDogJ3Rlc3QnLFxuICBzdHlsZTogJ2Jhc2ljJ1xufTtcblxuY29uc3QgU2ltcGxlQXV0aENsaWVudCA9IHtcblxuICBwYXNzd29yZDogW10sXG5cbiAgc3RhcnQgKG9wdGlvbnM/OiBQcm9wT3B0aW9ucykge1xuXG4gICAgT2JqZWN0LmFzc2lnbihzZXR0aW5ncywgb3B0aW9ucyk7XG5cbiAgICBjb25zb2xlLmxvZyhzZXR0aW5ncyk7XG5cbiAgICBjb25zb2xlLmxvZygnc3VjY2VzcyEhISEhIWFiJyk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS5sb2coJ0RPTUNvbnRlbnRMb2FkZWQnKTtcblxuICAgIH0pO1xuICAgIC8vIGRvY3VtZW50LndyaXRlKHRwbCk7XG4gICAgLy8gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgpO1xuICAgIC8vIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodHBsKTtcblxuICAgIC8vIHZhbGlkYXRlUHJvcChTdHJpbmcsIHBhc3N3b3JkKTtcbiAgICAvLyBjb25zb2xlLmxvZyhzdHlsZSk7XG4gICAgLy8gaWYgKHR5cGVvZiBwYXNzd29yZCA9PT0gJ3N0cmluZycpIHRoaXMucGFzc3dvcmQucHVzaChwYXNzd29yZCk7XG4gICAgLy8gZWxzZSBpZiAodHlwZW9mIHBhc3N3b3JkID09PSAnbnVtYmVyJykgdGhpcy5wYXNzd29yZC5wdXNoKHBhc3N3b3JkLnRvU3RyaW5nKCkpO1xuICAgIC8vIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocGFzc3dvcmQpKSBPYmplY3QuYXNzaWduKHRoaXMucGFzc3dvcmQsIHBhc3N3b3JkKTtcbiAgICAvLyBlbHNlIHJldHVybiB3YXJuKCdwYXJhbWV0ZXIgcGFzc3dvcmQgaXMgcmVxdWlyZWQgdHlwZW9mIFN0cmluZyBvciBBcnJheScpO1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucGFzc3dvcmQpO1xuICB9LFxuXG5cbiAgLy8gc3VibWl0ICgpIHtcbiAgLy8gICBjb25zb2xlLmxvZygnc3VibWl0JywgcGFzc3dvcmQpO1xuICAvLyAgIHZhciBhYWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnX19fX19TQUNfX19fX3Bhc3N3b3JkJykuZm9vKCk7XG4gIC8vICAgY29uc29sZS5sb2coYWFhKTtcbiAgLy8gICB2YXIgcGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnX19fX19TQUNfX19fX3Bhc3N3b3JkJykudmFsdWUudHJpbSgpO1xuICAvLyAgIGlmICh0aGlzLnBhc3N3b3JkLmluY2x1ZGVzKHBhc3N3b3JkKSkgcmVtb3ZlQXV0aFZpZXcoKTtcbiAgLy8gICByZXR1cm4gZmFsc2U7XG4gIC8vIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNpbXBsZUF1dGhDbGllbnQ7XG5cbiJdLCJuYW1lcyI6WyJFTlYiLCJ3cml0ZSIsImxvY2F0aW9uIiwiaG9zdCIsInNwbGl0Iiwic2V0dGluZ3MiLCJTaW1wbGVBdXRoQ2xpZW50Iiwib3B0aW9ucyIsImFzc2lnbiIsImxvZyIsImFkZEV2ZW50TGlzdGVuZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUE7Ozs7O0FBS0EsQUFBSUEsQUFBSixBQUEwQjs7V0FFZkMsS0FBVCxDQUFlLHlCQUF5QixDQUFDQyxTQUFTQyxJQUFULElBQWlCLFdBQWxCLEVBQStCQyxLQUEvQixDQUFxQyxHQUFyQyxFQUEwQyxDQUExQyxDQUF6QixHQUNmLG9DQURlLEdBQ3dCLFNBRHZDOzs7QUFJRixBQVVBLElBQUlDLFdBQXVCO1lBQ2YsTUFEZTtTQUVsQjtDQUZUOztBQUtBLElBQU1DLG1CQUFtQjs7WUFFYixFQUZhOztPQUFBLGlCQUloQkMsT0FKZ0IsRUFJTzs7V0FFckJDLE1BQVAsQ0FBY0gsUUFBZCxFQUF3QkUsT0FBeEI7O1lBRVFFLEdBQVIsQ0FBWUosUUFBWjs7WUFFUUksR0FBUixDQUFZLGlCQUFaO2FBQ1NDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFXO2NBQy9DRCxHQUFSLENBQVksa0JBQVo7S0FERjs7Ozs7Ozs7Ozs7OztDQVhKLENBdUNBOzs7OyJ9
