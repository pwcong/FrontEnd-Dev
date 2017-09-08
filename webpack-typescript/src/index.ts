interface Who {
    name: string
}

function sayHello(w: Who): void {
    console.log('Hello ' + w.name + '!');
}

sayHello({
    name: 'World'
});