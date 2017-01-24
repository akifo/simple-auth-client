/* @flow */

/* Import modules
-------------------------------------------------------------- */
import tpl from '../html/main.html';
import '../styles/main.css';
import Cookies from 'js-cookie';

/* Settings
-------------------------------------------------------------- */
const SAC_WRAP_ID:string = '_____SAC_____Wrap';
const SAC_FORM_BOX:string = '_____SAC_____Form_Box';
const SAC_PASS_ID:string = '_____SAC_____Form_Password';
const SAC_DIALOG_LIST_ID:string = '_____SAC_____Dialog_List';
const SAC_COOKIE_PASS_KEY:string = '6rtzmCrPCfv0chRmSM0I4CIASQ1TQ4';

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


/* Objects
-------------------------------------------------------------- */

const sac: {
  $sac?: HTMLElement;
  constructor: Function;
  remove: Function
} = {

  $sac: undefined,

  // create SimpleAuthClient Element to DOM
  constructor () {
    this.$sac = document.createElement('div');
    this.$sac.id = SAC_WRAP_ID;
    this.$sac.innerHTML = tpl;
    document.body.appendChild(this.$sac);
    dialog.constructor();
    // get the password html input element
    SimpleAuthClient.$password = document.getElementById(SAC_PASS_ID);
  },

  // remove SAC view
  remove () {
    const self = this;
    setTimeout(() => {
      self.$sac.remove();
    }, 4000);
  }

};

const form: {
  $form?: HTMLElement;
  remove: Function;
} = {

  $form: undefined,

  // hidden form Box with animate
  remove () {
    const target =document.getElementById(SAC_FORM_BOX);
    target.className = '';
  },

};

const dialog: {
  $dialog?: HTMLElement;
  constructor: Function;
  show: Function
} = {
  $dialog: undefined,

  constructor () {
    this.$dialog = document.getElementById(SAC_DIALOG_LIST_ID);
  },

  show (result: string, msg: string) {

    const $msg:HTMLElement = document.createElement('li');

    $msg.className = result;
    $msg.innerText = msg;
    this.$dialog.appendChild($msg);

    setTimeout(() => {
      $msg.className += ' active';
    }, 100);

    setTimeout(() => {
      $msg.className = result + ' remove';
    }, 3000);

    setTimeout(() => {
      $msg.remove();
    }, 4000);

  }

};

const auth: {
  password: Array<string>;
  setPasswordArray: Function;
  check: Function;
} = {

  password: [],

  setPasswordArray (options?: PropOptions) {
    Object.assign(settings, options);
    if (typeof settings.password === 'string') this.password.push(settings.password);
    else if (typeof settings.password === 'number') this.password.push(settings.password.toString());
    else if (Array.isArray(settings.password)) Object.assign(this.password, settings.password);
  },

  check (password: string) {
    return new Promise((resolve, reject) => {
      if (this.password.includes(password)) resolve();
      reject();
    });
  }


};

/* export object
-------------------------------------------------------------- */
const SimpleAuthClient: {
  $password?: HTMLElement;
  start: Function;
  submit: Function;
} = {

  $password : undefined,

  start (options?: PropOptions) {

    // Password to Array
    auth.setPasswordArray(options);

    auth.check(Cookies.get(SAC_COOKIE_PASS_KEY))
    .catch(() => {

      // script was loaded at the head of document
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
          sac.constructor();
        });

      } else { // script was loaded at the end of document
        sac.constructor();
        console.warn('SimpleAuthClient should load at head element');
      }

    });

  },

  submit () {
    const password = this.$password.value.trim();

    // success auth
    auth.check(password).then(() => {
      dialog.show('success', 'Auth Success');
      form.remove();
      sac.remove();
      Cookies.set(SAC_COOKIE_PASS_KEY, password, { expires: 1 });
    }).catch(() => {
      dialog.show('alert', 'Auth Failed');
    });

    return false;
  }
};

export default SimpleAuthClient;
