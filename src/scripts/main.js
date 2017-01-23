/* @flow */

/* Import modules
-------------------------------------------------------------- */
import tpl from '../html/main.html';
import '../styles/main.css';

/* Settings
-------------------------------------------------------------- */
const SAC_WRAP_ID:string = '_____SAC_____Wrap';
const SAC_PASS_ID:string = '_____SAC_____Password';
const SAC_DIALOG_ID:string = '_____SAC_____Dialog';

/* Only developement Enable LiveReload
-------------------------------------------------------------- */
if (ENV !== 'production') {
  document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
  ':35729/livereload.js?snipver=1"></' + 'script>')  ;
}

/* flow types
-------------------------------------------------------------- */
type PropOptions = {
  password?: string | number | Array<string>,
  style?: string
}

/* Variables
-------------------------------------------------------------- */
let settings:PropOptions = {
  password: 'test',
  style: 'basic'
};
let $SAC:HTMLElement;


/* Functions
-------------------------------------------------------------- */
// success auth
const removeAuthView = () => {

  console.log('success auth aaa');

  // remove auth view
  $SAC.remove();

  // set localstrage in 10 minutes

};

// dialog
const dialog = (result, msg) => {
  const $dialog:HTMLElement = document.getElementById(SAC_DIALOG_ID);
  $dialog.innerText = msg;
  $dialog.className = 'active success';
  setTimeout(() => {
    $dialog.className = 'remove';
  }, 3000);
  setTimeout(() => {
    $dialog.innerText = '';
    $dialog.className = '';
  }, 4000);
  console.log('auth dialog', result, msg, $dialog);
};

// create SimpleAuthClient Element to DOM
const createSacElement = () => {
  $SAC = document.createElement('div');
  $SAC.id = SAC_WRAP_ID;
  $SAC.innerHTML = tpl;
  document.body.appendChild($SAC);
};

/* export object
-------------------------------------------------------------- */
const SimpleAuthClient = {

  password: [],

  start (options?: PropOptions) {

    // Merge options
    Object.assign(settings, options);

    // script was loaded at the head of document
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        createSacElement();
      });

    } else { // script was loaded at the end of document
      createSacElement();
      console.warn('SimpleAuthClient should load at head element');
    }

    // Password to Array
    if (typeof settings.password === 'string') this.password.push(settings.password);
    else if (typeof settings.password === 'number') this.password.push(settings.password.toString());
    else if (Array.isArray(settings.password)) Object.assign(this.password, settings.password);
    console.log(this.password);

  },

  submit () {
    const target =document.getElementById(SAC_PASS_ID);
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

export default SimpleAuthClient;
