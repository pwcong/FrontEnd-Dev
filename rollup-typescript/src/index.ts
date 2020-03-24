import foo, { Test } from './foo';

export default function() {
  foo('Hello World!');
  new Test().sayHello();
}