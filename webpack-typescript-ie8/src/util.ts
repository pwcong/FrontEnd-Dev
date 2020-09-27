export interface IWho {
  name: string;
}

export function sayHello(w: IWho) {
  console.log(`Hello ${w.name} !`);
}
