const model = require('./model')

async function obtenerRepresentante(filtro_representante) {
    let filtro = {};
    if (filtro_representante) {
        filtro = { ruc: filtro_representante };
    }
    console.log(filtro);

    try {
        const data = await model.find(filtro)
                                .populate({
                                    path:'empresa_detalle',
                                    model:'empresa'
                                })
                                .exec();
        const lista = [];
        
        for (let elemento of data) {
            console.log(elemento);
            const objeto = {
                ruc: elemento.ruc,
                cedula: elemento.cedula,
                nombre: elemento.nombre,
                apellido: elemento.apellido,
                email: elemento.email,
                domicilio: elemento.domicilio,
                telefono: elemento.telefono,
                empresa_detalle: []
            };
            
            for (let detalle of elemento.empresa_detalle) {
                console.log(detalle.empresa);
                const registro = {
                    id: detalle._id,
                    //ruc: detalle.empresa.ruc,
                    //nombre: detalle.empresa.nombre
                };
                objeto.empresa_detalle.push(registro);
            }

            lista.push(objeto);
        }

        return lista;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function agregarRepresentante( representante ) {
    const objeto = new model( representante )
    objeto.save()
}

module.exports = {
    agregar:agregarRepresentante,
    obtener: obtenerRepresentante
}