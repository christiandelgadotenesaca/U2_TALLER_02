const storage = require('./storage')

function agregarRepresentante( representante ) {
    return new Promise((resolve, reject) => {
        storage.agregar( representante )
        resolve(representante )        
    })
}

function obtenerRepresentante( filtro_representante ) {
    return new Promise((resolve, reject) => {
        resolve( storage.obtener( filtro_representante ) )
    })
}

module.exports = {
    agregarRepresentante,
    obtenerRepresentante
}