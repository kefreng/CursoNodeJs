
/* setTimeout(() => {
    console.log("Hola mundo");
}, 1000); */

const getUsuarioById = (id, callback) => {

    const usuario = {
        id,
        nombre: "felix"
    }

    setTimeout(() => {
        callback(usuario)
    }, 1500);

}


getUsuarioById(1, (usuario) => {
    //console.log(`usuario in callback ${JSON.stringify(usuario)}`);
    console.log(usuario.id);
    console.log(usuario.nombre.toUpperCase());
});