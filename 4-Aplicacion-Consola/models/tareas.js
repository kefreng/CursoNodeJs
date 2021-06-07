
/**
 * _listaod:
 * {'uuid-1231231233': {id:12, desc: asdasd, completadoEn:3234234}}
 * 
 */

const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            //console.log(key);
            listado.push(this._listado[key]);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log();
        this.listadoArr.forEach((tarea, i) => {
            console.log(`${i + 1} ${tarea.desc} :: ${tarea.completadoEn ? "Completada".green : "Pendiente".red}`);
        });
    }

    listarPendientesCompletadas(completadas = true) {
        let result = [];
        if (completadas) {
            result = this.listadoArr.filter(tarea => tarea.completadoEn !== null);
        } else {
            result = this.listadoArr.filter(tarea => tarea.completadoEn === null);
        }

        result.forEach((tarea, i) => {
            console.log(`${((i + 1) + '.').green} ${tarea.desc} :: ${tarea.completadoEn ? tarea.completadoEn.green : 'Pendiente'.red}`);
        });
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });

    }

}

module.exports = Tareas;