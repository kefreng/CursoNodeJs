// const { mostrarMenu, pausa } = require('./helpers/mensajes');

const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");

require('colors');

const main = async () => {

    let opt = "";
    const tareas = new Tareas();

    const tareasDB = leerDB();

    // await pausa();

    if (tareasDB) {
        //establecer tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        //Imprimir el menu
        opt = await inquirerMenu();
        //console.log({ opt });

        switch (opt) {
            case '1':
                //crear opcion
                const desc = await leerInput("Descripcion: ");
                //console.log(desc);
                tareas.crearTarea(desc);
                break;

            case '2':
                tareas.listadoCompleto();
                // console.log(tareas.listadoArr);
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':

                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                console.log(ids);
                tareas.toggleCompletadas(ids);
                break;

            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar("Estas seguro ? ");
                    console.log({ ok });
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log("tarea borrada");
                    }
                }

                break;

            default:
                break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();
    } while (opt !== '0');


    //pausa();

}

main();