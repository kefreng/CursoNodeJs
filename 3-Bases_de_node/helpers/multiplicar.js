const fs = require('fs');
const colors = require("colors");

const crearArchivo = async (base = 5, listar = false, hasta = 10) => {

    /* return new Promise((resolve, reject) => {

        console.log("===============================");
        console.log(`Tabla del ${base}`);
        console.log("===============================");

        let salida = "";

        for (let i = 1; i <= 10; i++) {
            salida += `${base} x ${i} = ${i * base}\n`;
        }
        //console.log(salida);
        fs.writeFileSync(`tabla-${base}.txt`, salida)

        if (fs.existsSync(`tabla-${base}.txt`)) {
            //console.log(`tabla-${base}.txt creado`);
            resolve(`tabla-${base}.txt`);
        } else {
            reject("No se ha podido crear el archivo");
        } 

    }); */

    try {


        let salida, consola = "";


        for (let i = 1; i <= hasta; i++) {
            salida += `${base} ${"x"} ${i} ${"="} ${i * base}\n`;
            consola += `${base} ${"x".green} ${i} ${"=".green} ${i * base}\n`;
        }

        if (listar) {
            console.log("===============================".green);
            console.log(`Tabla del ${base}`.blue);
            console.log("===============================".green);
            console.log(consola);
        }

        fs.writeFileSync(`./salida/tabla-${base}.txt`, salida)

        return `tabla-${base}.txt`;
    } catch (err) {
        throw err;
    }

}


module.exports = {
    crearArchivo
}