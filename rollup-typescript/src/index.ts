import foo, { Test } from './foo';

export default function Hi() {
  foo('Hello World!');
  new Test().sayHi();
}
