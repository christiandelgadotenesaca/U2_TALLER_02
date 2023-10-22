const Model = require('./model')

async function agregarEmpresa(dato){
    const resultado = await new Model(dato)
    return resultado.save()
}

async function obtenerEmpresa(filtro_empresa){
    let filtro = {}
    
    if(filtro_empresa){
        filtro = {ruc: filtro_empresa}
    }

    const resultado = await Model.find(filtro)
    return resultado
}

async function actualizarEmpresa(empresa){
    const objeto = await Model.findOne({_id: empresa.id})
    
    if (objeto){
        objeto.nombre = empresa.nombre
        objeto.domicilio = empresa.domicilio
        objeto.telefono = empresa.telefono
        return resultado  = await objeto.save()
    }else{
        return null
    }
}

async function eliminarEmpresa(empresa){
    return await Model.deleteOne({_id: empresa.id})
}

module.exports = {
    agregar:agregarEmpresa,
    obtener: obtenerEmpresa,
    actualizar: actualizarEmpresa,
    eliminar:eliminarEmpresa
}