class Busquedas {

    historial = ["Santiago", "Iquique", "Madrid"];

    constructor() {
        //TODO: leer DB si existe
    }

    async ciudad(lugar = '') {
        //peticion http
        console.log(lugar);

        return []; //retornar los lugares que coincidan con los lugares que llego de argumento
    }

}


module.exports = Busquedas;