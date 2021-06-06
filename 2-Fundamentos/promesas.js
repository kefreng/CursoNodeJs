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

const id = 1;

const getEmpleado = (id) => {

    return new Promise((resolve, reject) => {
        const empleado = empleados.find(empleado => empleado.id === id)?.nombre;
        (empleado) ? resolve(empleado) : reject(`empleado con id ${id} no existe`);

    });

}

/* getEmpleado(id).then((result) => {
    console.log(result);
}).catch((err) => {
    console.error(err);
}); */

const getSalario = (id) => {
    return new Promise((resolve, reject) => {
        const salario = salarios.find(salario => salario.id === id)?.salario;
        (salario) ? resolve(salario) : reject(`no existe salario para el usuario con id ${id}`);
    });

}

/* getSalario(id).then((result) => {
    console.log(result);
}).catch((err) => {
    console.error(err);
}); */

/* getEmpleado(id)
    .then(empleado => {
        getSalario(id)
            .then(salario => {
                console.log(`el empleado ${empleado} tiene un salario de ${salario}`);
            }).catch(err => console.log(err));
    }).catch(err => console.log(err)); */

let nombre = "";

getEmpleado(id)
    .then(empleado => {
        nombre = empleado;
        return getSalario(id)
    })
    .then(salario => console.log(`el empleado ${nombre} tiene un salario de ${salario}`))
    .catch(err => console.log(err));