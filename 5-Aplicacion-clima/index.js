const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


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
                console.log(lugar);
                //Buscar los lugares

                //Seleccionar el lugar

                //Clima

                //Mostrar resultados
                console.log("\nInformacion de la ciudad\n".green);
                console.log("Ciudad: ",);
                console.log("Lat: ",);
                console.log("Long: ",);
                console.log("Temperatura: ",);
                console.log("Minima: ",);
                console.log("Maxima: ",);


                break;

            default:
                break;
        }

        if (opt !== 0) await pausa();

    } while (opt !== 0)

}

main();