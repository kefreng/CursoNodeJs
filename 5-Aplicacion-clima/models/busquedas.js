const axios = require('axios');
const fs = require("fs");

class Busquedas {

    historial = [];
    path = "./db/database.json";

    constructor() {
        //TODO: leer DB si existe
        this.leerDB();
    }

    get historialCapitalizado() {
        //capitalizar cada palabra
        return this.historial.map(historial => {
            let palabras = historial.split(" ");
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));
            return palabras.join(" ");
        });
    }

    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        };
    }

    async ciudad(lugar = '') {
        try {
            //peticion http
            // console.log('ciudad ', lugar);

            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
            });


            // const resp = await axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/iquique.json?access_token=pk.eyJ1Ijoia2VmcmVuZyIsImEiOiJja3B2eXRxb20wZDZiMm5tcnJvN2Y4c3hvIn0.W6xfMXaKzSuDxuVwfIS4-A");
            const resp = await intance.get();

            //console.log(resp.data.features);

            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));

            //return []; retornar los lugares que coincidan con los lugares que llego de argumento
        } catch (error) {
            return []; //retornar los lugares que coincidan con los lugares que llego de argumento
        }



    }

    get paramsWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async climaLugar(lat, lon) {
        try {
            //intance axios.create
            const intance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeather, lat, lon }
            });

            //resp extract info en la data
            const resp = await intance.get();
            //console.log(">>>> resp ", resp.data);
            //const objWeather = resp.data;

            const { weather, main } = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (err) {
            console.log(err);
        }
    }

    agregarHistorial(lugar = "") {
        //TODO: prevenir duplicado
        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }
        //restringir el historial a 6 registros
        //this.historial = this.historial.splice(0,5);
        this.historial.unshift(lugar);
        /*  if (!this.historial.find(hist => hist === lugar)) {
             this.historial.unshift(lugar);
         } */


        //Grabar en DB
        this.guardarDB();
    }

    guardarDB() {

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.path, JSON.stringify(payload));
    }

    leerDB() {
        //debe existir....
        if (!fs.existsSync(this.path)) {
            return;
        }

        const info = fs.readFileSync(this.path, { encoding: 'utf-8' });
        const { historial } = JSON.parse(info);
        this.historial = historial;
    }

}


module.exports = Busquedas;