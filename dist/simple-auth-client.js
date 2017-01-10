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

var settings = {
  password: 'test',
  style: 'basic'
};

var SimpleAuthClient = {

  password: [],

  start: function start(options) {

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLWF1dGgtY2xpZW50LmpzIiwic291cmNlcyI6WyIuLi9zcmMvc2NyaXB0cy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIEBmbG93ICovXG5cbi8vIGltcG9ydCB7IHZhbGlkYXRlT3B0aW9ucyB9IGZyb20gJy4vdXRpbC92YWxpZGF0b3InO1xuLy8gaW1wb3J0IHRwbCBmcm9tICcuLi9odG1sL21haW4uaHRtbCc7XG4vLyBpbXBvcnQgJy4uL3N0eWxlcy9tYWluLmNzcyc7XG5cbi8vIFRoZSBsb2dnZXIgc2hvdWxkIG9ubHkgYmUgZGlzYWJsZWQgaWYgd2XigJlyZSBub3QgaW4gcHJvZHVjdGlvbi5cbmlmIChFTlYgIT09ICdwcm9kdWN0aW9uJykge1xuXG4gIC8vIEVuYWJsZSBMaXZlUmVsb2FkXG4gIGRvY3VtZW50LndyaXRlKCc8c2NyaXB0IHNyYz1cImh0dHA6Ly8nICsgKGxvY2F0aW9uLmhvc3QgfHwgJ2xvY2FsaG9zdCcpLnNwbGl0KCc6JylbMF0gK1xuICAnOjM1NzI5L2xpdmVyZWxvYWQuanM/c25pcHZlcj0xXCI+PC8nICsgJ3NjcmlwdD4nKSAgO1xuXG59XG5cbi8vIHN1Y2Nlc3MgYXV0aFxuY29uc3QgcmVtb3ZlQXV0aFZpZXcgPSAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdzdWNjZXNzIGF1dGggYWFhJyk7XG59O1xuXG50eXBlIFByb3BPcHRpb25zID0ge1xuICBwYXNzd29yZD86IHN0cmluZyB8IG51bWJlciB8IEFycmF5PHN0cmluZz4sXG4gIHN0eWxlPzogc3RyaW5nXG59XG5cbmxldCBzZXR0aW5nczpQcm9wT3B0aW9ucyA9IHtcbiAgcGFzc3dvcmQ6ICd0ZXN0JyxcbiAgc3R5bGU6ICdiYXNpYydcbn07XG5cbmNvbnN0IFNpbXBsZUF1dGhDbGllbnQgPSB7XG5cbiAgcGFzc3dvcmQ6IFtdLFxuXG4gIHN0YXJ0IChvcHRpb25zPzogUHJvcE9wdGlvbnMpIHtcblxuICAgIE9iamVjdC5hc3NpZ24oc2V0dGluZ3MsIG9wdGlvbnMpO1xuXG4gICAgY29uc29sZS5sb2coc2V0dGluZ3MpO1xuXG4gICAgY29uc29sZS5sb2coJ3N1Y2Nlc3MhISEhISEnKTtcbiAgICAvLyBkb2N1bWVudC53cml0ZSh0cGwpO1xuXG4gICAgLy8gdmFsaWRhdGVQcm9wKFN0cmluZywgcGFzc3dvcmQpO1xuICAgIC8vIGNvbnNvbGUubG9nKHN0eWxlKTtcbiAgICAvLyBpZiAodHlwZW9mIHBhc3N3b3JkID09PSAnc3RyaW5nJykgdGhpcy5wYXNzd29yZC5wdXNoKHBhc3N3b3JkKTtcbiAgICAvLyBlbHNlIGlmICh0eXBlb2YgcGFzc3dvcmQgPT09ICdudW1iZXInKSB0aGlzLnBhc3N3b3JkLnB1c2gocGFzc3dvcmQudG9TdHJpbmcoKSk7XG4gICAgLy8gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShwYXNzd29yZCkpIE9iamVjdC5hc3NpZ24odGhpcy5wYXNzd29yZCwgcGFzc3dvcmQpO1xuICAgIC8vIGVsc2UgcmV0dXJuIHdhcm4oJ3BhcmFtZXRlciBwYXNzd29yZCBpcyByZXF1aXJlZCB0eXBlb2YgU3RyaW5nIG9yIEFycmF5Jyk7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5wYXNzd29yZCk7XG4gIH0sXG5cbiAgc3VibWl0ICgpIHtcbiAgICBjb25zb2xlLmxvZygnc3VibWl0JywgcGFzc3dvcmQpO1xuICAgIHZhciBwYXNzd29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdfX19fX1NBQ19fX19fcGFzc3dvcmQnKS52YWx1ZS50cmltKCk7XG4gICAgaWYgKHRoaXMucGFzc3dvcmQuaW5jbHVkZXMocGFzc3dvcmQpKSByZW1vdmVBdXRoVmlldygpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2ltcGxlQXV0aENsaWVudDtcblxuIl0sIm5hbWVzIjpbIkVOViIsIndyaXRlIiwibG9jYXRpb24iLCJob3N0Iiwic3BsaXQiLCJyZW1vdmVBdXRoVmlldyIsImxvZyIsInNldHRpbmdzIiwiU2ltcGxlQXV0aENsaWVudCIsIm9wdGlvbnMiLCJhc3NpZ24iLCJwYXNzd29yZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ2YWx1ZSIsInRyaW0iLCJpbmNsdWRlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7QUFLQSxBQUFJQSxBQUFKLEFBQTBCOzs7V0FHZkMsS0FBVCxDQUFlLHlCQUF5QixDQUFDQyxTQUFTQyxJQUFULElBQWlCLFdBQWxCLEVBQStCQyxLQUEvQixDQUFxQyxHQUFyQyxFQUEwQyxDQUExQyxDQUF6QixHQUNmLG9DQURlLEdBQ3dCLFNBRHZDOzs7O0FBTUYsSUFBTUMsaUJBQWlCLFNBQWpCQSxjQUFpQixHQUFNO1VBQ25CQyxHQUFSLENBQVksa0JBQVo7Q0FERjs7QUFTQSxJQUFJQyxXQUF1QjtZQUNmLE1BRGU7U0FFbEI7Q0FGVDs7QUFLQSxJQUFNQyxtQkFBbUI7O1lBRWIsRUFGYTs7T0FBQSxpQkFJaEJDLE9BSmdCLEVBSU87O1dBRXJCQyxNQUFQLENBQWNILFFBQWQsRUFBd0JFLE9BQXhCOztZQUVRSCxHQUFSLENBQVlDLFFBQVo7O1lBRVFELEdBQVIsQ0FBWSxlQUFaOzs7Ozs7Ozs7O0dBVnFCO1FBQUEsb0JBc0JiO1lBQ0FBLEdBQVIsQ0FBWSxRQUFaLEVBQXNCSyxRQUF0QjtRQUNJQSxXQUFXQyxTQUFTQyxjQUFULENBQXdCLHVCQUF4QixFQUFpREMsS0FBakQsQ0FBdURDLElBQXZELEVBQWY7UUFDSSxLQUFLSixRQUFMLENBQWNLLFFBQWQsQ0FBdUJMLFFBQXZCLENBQUosRUFBc0NOO1dBQy9CLEtBQVA7O0NBMUJKLENBOEJBOzs7OyJ9
