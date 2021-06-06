

console.log("inicio de programa");

setTimeout(() => {
    console.log("Primer timeout");
}, 3000);

setTimeout(() => {
    console.log("tercer timeout");
}, 0);

setTimeout(() => {
    console.log("Segundo timeout");
}, 0);




console.log("fin de programa");