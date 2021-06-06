const empleados = [
    {
        id: 1,
        nombre: "Felix"
    },
    {
        id: 2,
        nombre: "Benja"
    },
    {
        id: 3,
        nombre: "Kili"
    }
]

const salarios = [
    {
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 1500
    }
]

const id = 3;

const getEmpleado = (id) => {

    return new Promise((resolve, reject) => {
        const empleado = empleados.find(empleado => empleado.id === id)?.nombre;
        (empleado) ? resolve(empleado) : reject(`empleado con id ${id} no existe`);
    });
}

const getSalario = async (id) => {
    /* cuando la funcion no tiene declaracion async se retorna una promesa:
     return new Promise((resolve, reject) => {
        const salario = salarios.find(salario => salario.id === id)?.salario;
        (salario) ? resolve(salario) : reject(`no existe salario para el usuario con id ${id}`);
    }); */


    const salario = salarios.find(salario => salario.id === id)?.salario;
    if (salario) {
        return salario;
    } else {
        throw `no existe salario para el usuario con id ${id}`;
    }


}

const getInfoUsuario = async (id) => {
    try {
        const empleado = await getEmpleado(id);
        const salario = await getSalario(id);
        return `el empleado ${empleado} tiene un salario de ${salario}`;
    } catch (err) {
        throw err;
    }
}

getInfoUsuario(id)
    .then(msg => console.log(msg))
    .catch(err => console.log(err));