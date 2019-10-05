export default (valid: boolean, name: string, msg: string, cb?: Function) => {
  if (valid) {
    console.warn(`${name}: ${msg}`);

    cb && cb();
  }
};
