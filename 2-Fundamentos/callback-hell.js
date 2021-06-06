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

const getEmpleado = (id, callback) => {

    const empleado = empleados.find(empleado => empleado.id === id)?.nombre;
    if (empleado) {
        callback(null, empleado);
    } else {
        callback(`empleado con id ${id} no existe`);
    }

}

const getSalario = (id, callback) => {
    const salario = salarios.find(salario => salario.id === id)?.salario;
    if (salario) {
        callback(null, salario);
    } else {
        callback(`no existe salario para el usuario con id ${id}`);
    }

}

const id = 2;
getEmpleado(id, (err, empleado) => {
    if (err) {
        return console.log(err);
    }
    console.log(empleado);

    getSalario(id, (err, salario) => {
        if (err) {
            return console.log(err);
        }
        console.log("El empleado:", empleado, "tiene un salario de : ", salario);

    });

});



