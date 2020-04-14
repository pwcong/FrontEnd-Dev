export default function (word: string) {
  console.log(word);
}

interface ITest {
  sayHi(): void;
}

export class Test implements ITest {
  sayHi(): void {
    console.log('Hi!');
  }
}
