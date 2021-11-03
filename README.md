# Dynamic Imports

Below we'll detail some of the goals of these experiments, which are:

- Importing modules through `expressions`
- Importing modules from `a bundle`

Dynamic imports should be resolved through the browser.

## Importing through `expressions`

The canonical example of this is represented in [main.ts](src/main.ts) and [imported.ts](src/imported.ts).
The former wants to import the `imported` module by means of an expression.

```
let component = './imported';

import(component).then((Module) => {
  Module.default();
});
```

Using **Vite** as build tool we observe that the above works fine when running in `dev mode`.
Having said at the same time on the command line Vite will echo the following warning:

```
10:57:04 AM [vite] warning:
/home/jvissers/Projects/experiments/dynamic-imports/src/main.ts
1  |  let component = "./imported";
2  |  import(component).then((Module) => {
   |         ^
3  |    Module.default();
4  |  });
The above dynamic import cannot be analyzed by vite.
See https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations for supported dynamic import formats. If this is intended to be left as-is, you can use the /* @vite-ignore */ comment inside the import() call to suppress this warning.

  Plugin: vite:import-analysis
  File: /home/jvissers/Projects/experiments/dynamic-imports/src/main.ts
```

Then trying to run a production build (created through `pnpm run build`) results in an actual error on the browser command line.

![console warning](error-dynamic-import-expression.png 'Error')

So the first challenge is how this can be resolved.
It might be that we need to add some configuration to `vite.config.ts`.

According to the above rollup warning, an extension is required for these things to work.
Tested this with changing `import(component)` to `import('${component}.js')` and manually putting an `imported.js` in the `dist/assets` folder.
This _breaks_ the `dev` flow, but resolves the `build/serve` flow.
So this makes me wonder whether this would work at all.

## Importing modules from `a bundle`

This builds on the former experiment, with the goal to do a dynamic import from some sort of bundle.
The ultimate goal is to allow an arrangement in which modules can be added and used _after_ a product has been released.
High level this looks something like this:

- a product has been released and running on, say, http://localhost:5000
- an endpoint is exposed on the application for people with the appropriate rights to upload `a bundle`
- this bundle holds a JavaScript module and probably some metadata that describes the module
- the metadata is used to store information about the module and make it accessible for someone to reference
- such a reference then itself becomes a `dynamic import`, allowing functionality to be added to a running system
