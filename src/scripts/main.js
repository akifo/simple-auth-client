/* @flow */

/* Import modules
-------------------------------------------------------------- */
import tpl from '../html/main.html';
import '../styles/main.css';
import languages from '../data/languages.yaml';
import Cookies from 'js-cookie';

/* Settings
-------------------------------------------------------------- */
const SAC_WRAP_ID:string = '_____SAC_____Wrap';
const SAC_FORM_BOX:string = '_____SAC_____Form_Box';
const SAC_FORM_TITLE:string = '_____SAC_____Form_title';
const SAC_FORM_DESCRIPTION:string = '_____SAC_____Form_description';
const SAC_FORM_BTN:string = '_____SAC_____Form_Btn';
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
  style?: string,
  lang?: string,
  title?: string,
  desc?: string,
  placeholder?: string,
  btn?: string,
  successMsg?: string,
  FailedMsg?: string
}

/* Variables
-------------------------------------------------------------- */
let settings:PropOptions = {
  password: 'test',
  style: 'basic',
  lang: 'en',
  title: undefined,
  desc: undefined,
  placeholder: undefined,
  btn: undefined,
  successMsg: undefined,
  FailedMsg: undefined
};


/* Objects
-------------------------------------------------------------- */

const sac: {
  $sac?: HTMLElement;
  $title?: HTMLElement;
  $description?: HTMLElement;
  $password?: HTMLInputElement;
  $btn?: HTMLElement;
  constructor: Function;
  remove: Function;
  setText: Function;
} = {

  $sac: undefined,
  $title: undefined,
  $desc: undefined,
  $password : undefined,

  // create SimpleAuthClient Element to DOM
  constructor () {
    this.$sac = document.createElement('div');
    this.$sac.id = SAC_WRAP_ID;
    this.$sac.innerHTML = tpl;
    document.body.appendChild(this.$sac);
    dialog.constructor();
    // get html elements
    this.$title = document.getElementById(SAC_FORM_TITLE);
    this.$desc = document.getElementById(SAC_FORM_DESCRIPTION);
    this.$password = document.getElementById(SAC_PASS_ID);
    this.$btn = document.getElementById(SAC_FORM_BTN);
    this.setText();
  },

  // remove SAC view
  remove () {
    const self = this;
    setTimeout(() => {
      self.$sac.remove();
    }, 4000);
  },

  // set setText
  setText () {

    const textObj = languages[settings.lang] || languages.en;
    this.$title.innerHTML = settings.title || textObj.title;
    this.$desc.innerHTML = settings.desc || textObj.desc;
    this.$password.placeholder = settings.placeholder || textObj.placeholder;
    this.$btn.innerHTML = settings.btn || textObj.btn;
    settings.successMsg = settings.successMsg || textObj.successMsg;
    settings.FailedMsg = settings.FailedMsg || textObj.FailedMsg;

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

    const $msg = document.createElement('li');
    if (!($msg instanceof HTMLElement)) return;

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

  setPasswordArray (password) {
    if (typeof password === 'string') this.password.push(password);
    else if (typeof password === 'number') this.password.push(password.toString());
    else if (Array.isArray(password)) Object.assign(this.password, password);
  },

  check (password?: string) {
    return new Promise((resolve, reject) => {
      console.log(password, this.password);
      if (this.password.includes(password)) resolve();
      reject();
    });
  }
};


/* export object
-------------------------------------------------------------- */
const SimpleAuthClient: {
  start: Function;
  submit: Function;
} = {

  start (options?: PropOptions) {

    Object.assign(settings, options);

    // Password to Array
    auth.setPasswordArray(settings.password);

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

    if (!(sac.$password instanceof HTMLInputElement)) return;
    const password = sac.$password.value.trim();
    console.log(password);

    // success auth
    auth.check(password).then(() => {
      dialog.show('success', settings.successMsg);
      form.remove();
      sac.remove();
      Cookies.set(SAC_COOKIE_PASS_KEY, password, { expires: 1 });
    }).catch(() => {
      dialog.show('alert', settings.FailedMsg);
    });

    return false;
  }
};

export default SimpleAuthClient;
