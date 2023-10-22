const mongoose = require('mongoose')
const Schema = mongoose.Schema

const req_string = {
    type: String,
    required: true
}

const empresa_schema = new Schema({
    ruc: req_string,
    nombre: req_string,
    domicilio: String,
    telefono: String,
})

const model = mongoose.model('empresa', empresa_schema)
module.exports = model