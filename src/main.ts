let component = './imported';

import(component).then((Module) => {
  Module.default();
});
