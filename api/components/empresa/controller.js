const storage = require('./storage')

function agregarEmpresa( dato ) {
    return new Promise((resolve, reject) => {
        resolve( storage.agregar( dato ) )
    })
}

function obtenerEmpresa( filtro_empresa ) {
    return new Promise((resolve, reject) => {
        resolve( storage.obtener( filtro_empresa ))
    })
}

function actualizarEmpresa( empresa ) {
    return new Promise((resolve, reject) => {
        let resultado = storage.actualizar(empresa)
        if (resultado){
            return resolve(empresa)
        }else{
            return reject('No existe empresa')
        }
        
    })
}

function eliminarEmpresa( empresa ) {
    return new Promise((resolve, reject) => {
        storage.eliminar( empresa )
        resolve(empresa)
    })    
}

module.exports = {
    agregarEmpresa,
    obtenerEmpresa,
    actualizarEmpresa,
    eliminarEmpresa
}