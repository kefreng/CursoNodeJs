const {response, request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = async (req = request, res = response) => { 

    // const {q,nombre = 'No name',apikey, page = 1, limit} = req.query;

    const {limite = 5, desde = 0} = req.query;
    const query = {estado : true};

/*     const usuarios = await Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite));

    const total = await Usuario.countDocuments(query); */

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    /* res.status(200).json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    }); */
   /*  res.status(200).json({
        total,
        usuarios
    }); */
    res.status(200).json({
        total, usuarios
    });
}

const usuariosPut = async(req, res = response) => {

    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    //validar contra base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        // msg: 'put API - controlador',
        usuario
    });
}

const usuariosPost = async (req, res = response) => {

    // const body = req.body;
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //verificar si el correo existe
    //metodo fue movido al db-validators.js

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    //guardar en base de datos

    await usuario.save();

    res.json({
        msg: 'post API - controlador',
        usuario
    });
}

const usuariosDelete =  async (req, res = response) => {

    const {id} = req.params;

    const uid = req.uid;

    //fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    const usuarioAutenticado = req.usuario;

    res.json({
        usuario,
        usuarioAutenticado
    });
}


module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPost,
    usuariosPut
}