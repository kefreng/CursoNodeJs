console.log("hola mundo");

const http = require('http');

http.createServer((req, res) => {

    // res.writeHead(201, { 'Content-Type': 'application/json' });
    // res.setHeader("Content-Disposition", "attachment; filename=lista.csv");
    // res.writeHead(201, { 'Content-Type': 'application/csv' });
    /*   const persona = {
          id: 1,
          nombre: "Felix"
      } */
    /*  res.write("id,nombre\n");
     res.write("1,Felix\n");
     res.write("2,Felipe\n");
     res.write("3,Kili\n");
     res.write("4,Kevin\n"); */


    res.write("Hola mundo");

    res.end();

}).listen(8081);


console.log("escuchando el puerto", 8081);