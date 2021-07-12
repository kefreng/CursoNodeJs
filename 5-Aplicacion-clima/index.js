require('dotenv').config();

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

// console.log(process.env.MAPBOX_KEY);

const main = async () => {

    /* const texto = await leerInput("Hola: ");
    console.log(texto); */

    const busquedas = new Busquedas();



    let opt;

    do {

        opt = await inquirerMenu();
        //console.log(`opcion seleccionada ${opt}`);

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const lugar = await leerInput("Ciudad: ");
                // console.log(lugar);
                //Buscar los lugares
                const lugares = await busquedas.ciudad(lugar);
                // console.log(lugares);

                //Seleccionar el lugar
                const id = await listarLugares(lugares);
                if (id === '0') continue;
                // console.log({ id });

                const lugarSel = lugares.find(lugar => lugar.id === id);
                busquedas.agregarHistorial(lugarSel.nombre);
                //console.log(lugarSel);

                //Clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
                //console.log(">>> clima ciudad : ", clima);

                //Mostrar resultados
                console.log("\nInformacion de la ciudad\n".green);
                console.log("Ciudad: ", lugarSel.nombre.green);
                console.log("Lat: ", lugarSel.lat);
                console.log("Long: ", lugarSel.lng);
                console.log("Temperatura: ", clima.temp);
                console.log("Minima: ", clima.min);
                console.log("Maxima: ", clima.max);
                console.log("Como esta el clima: ", clima.desc.green);


                break;

            case 2:
                //busqueda llamar historial Capitalizado
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(`${idx} ${lugar}`);
                });
                /*
                busquedas.historial.forEach((lugar, i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(`${idx} ${lugar}`);
                });*/

                break;

            default:
                break;
        }

        if (opt !== 0) await pausa();

    } while (opt !== 0)

}

main();