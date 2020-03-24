export default function(word: string) {
  console.log(word);
}

interface ITest {
  sayHello(): void;
}

export class Test implements ITest {
  sayHello(): void {
    console.log('Hello World!');
  }
}
