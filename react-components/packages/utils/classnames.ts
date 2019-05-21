export const prefixCls = 'rc-x';

export const getPrefixCls = (cls?: string, customPrefix?: string) =>
  cls ? `${customPrefix || prefixCls}-${cls}` : prefixCls;

const classNames = (...args: any) => {
  const hasOwn = {}.hasOwnProperty;

  const classes: any[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;

    const argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      const inner = classNames.apply(null, arg);
      if (inner) {
        classes.push(inner);
      }
    } else if (argType === 'object') {
      for (const key in arg) {
        if (hasOwn.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
};

export default classNames;
