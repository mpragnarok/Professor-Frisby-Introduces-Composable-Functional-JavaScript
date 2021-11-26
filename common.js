export const conditionally = (config) => (props) => config.if(props) ? config.then(props) : config.else(props);
export const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((y, f) => f(y), x);

export const compose =
  (...functions) =>
  (args) =>
    functions.reduceRight((arg, fn) => fn(arg), args);
