/* @flow */

// import { validateOptions } from './util/validator';
// import tpl from '../html/main.html';
// import '../styles/main.css';

// The logger should only be disabled if we’re not in production.
if (ENV !== 'production') {

  // Enable LiveReload
  document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
  ':35729/livereload.js?snipver=1"></' + 'script>')  ;

}

// success auth
const removeAuthView = () => {
  console.log('success auth aaa');
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

  submit () {
    console.log('submit', password);
    var aaa = document.getElementById('_____SAC_____password').foo();
    console.log(aaa);
    var password = document.getElementById('_____SAC_____password').value.trim();
    if (this.password.includes(password)) removeAuthView();
    return false;
  }
};

export default SimpleAuthClient;

