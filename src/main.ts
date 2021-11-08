// let component = 'http://127.0.0.1:5000/one.js';

const getPath = () => {
  if (import.meta.env.MODE === 'development') {
    return 'http://127.0.0.1:3000/one.js';
  } else {
    return 'http://127.0.0.1:5000/one.js';
  }
};

import(getPath()).then((Module) => {
  Module.default();
});
