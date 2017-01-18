/* @flow */

// import { validateOptions } from './util/validator';
import tpl from '../html/main.html';
import '../styles/main.css';

if (ENV !== 'production') {
  // Enable LiveReload
  document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
  ':35729/livereload.js?snipver=1"></' + 'script>')  ;
}

// success auth
const removeAuthView = () => {

  console.log('success auth aaa');

  // remove auth view
  var $SAC = document.getElementById('_____SimpleAuthClient_____Wrap');
  $SAC.remove();

  // set localstrage in 10 minutes

};

// dialog
const dialog = (result, msg) => {
  console.log('auth dialog', result, msg);
};

type PropOptions = {
  password?: string | number | Array<string>,
  style?: string
}

let settings:PropOptions = {
  password: 'test',
  style: 'basic'
};

const SimpleAuthClient = {

  password: [],

  start (options?: PropOptions) {

    Object.assign(settings, options);

    console.log(settings);

    document.addEventListener('DOMContentLoaded', function() {
      var $div = document.createElement('div');
      $div.id = '_____SimpleAuthClient_____Wrap';
      $div.innerHTML = tpl;
      document.body.appendChild($div);
    });

    // to Array
    if (typeof settings.password === 'string') this.password.push(settings.password);
    else if (typeof settings.password === 'number') this.password.push(settings.password.toString());
    else if (Array.isArray(settings.password)) Object.assign(this.password, settings.password);
    console.log(this.password);

  },

  submit () {
    var password = document.getElementById('_____SAC_____password').value.trim();
    if (this.password.includes(password)) {
      removeAuthView();
      return false;
    }
    dialog(false, 'failed');
    return false;
  }
};

export default SimpleAuthClient;


