let warn = () => {};

if (ENV !== 'production' && typeof console !== 'undefined') {

  warn = (msg) => {
    console.error(`[SimpleAuthClient warn]: ${msg}`);
  };

}

export { warn };
