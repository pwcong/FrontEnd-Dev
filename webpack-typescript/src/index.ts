interface IWho {
  name: string;
}

function sayHello(w: IWho): void {
  console.log(`Hello ${w.name}!`);
}

sayHello({
  name: 'World'
});
