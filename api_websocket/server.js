const express = require('express')
let app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const config = require('./config')

let ruc

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado.');

    // Maneja el evento "nuevo mensaje" enviado por el cliente
    socket.on('mensaje', (mensaje) => {
        console.log('Mensaje recibido desde el cliente:', mensaje);
        console.log(mensaje)

        // Envía un mensaje de bienvenida personalizado al cliente
        socket.emit('mensaje', 'Bienvenido por Web Socket, ' + mensaje);
    });
});

let contador = 1

/*
setInterval(function(){
    io.emit(`mensaje`, `Hola, saludos a todos --> ${contador}`)
    contador++

}, 3000)
*/

server.listen(config.PORT, function() {
    console.log(`La aplicacion esta escuchando en http://localhost:${config.PORT}`)
})


const mongoose = require('mongoose');

// Conecta con la base de datos MongoDB
mongoose.connect(config.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbname: 'tarea'
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Conexión a la base de datos exitosa');

  // Filtrar por un ID en particular
  const filtro = [{ $match: { 'ruc': ruc } }];

  // Escuchar eventos de cambio en una colección específica
  const cambioStream = connection.collection('representantes').watch(filtro);

  cambioStream.on('change', (cambio) => {
    console.log('Se ha detectado un cambio:', cambio);
        io.emit(`mensaje`, `Se agrego un nuevo cambio al representante`)
    });
});