
const listEmpresas = [];

function guardar() {

    console.log('Funcion Guardar')
    let ruc_ = document.getElementById('ruc').value
    let cedula_ = document.getElementById('cedula').value
    let nombre_ = document.getElementById('nombre').value
    let apellido_ = document.getElementById('apellido').value
    let email_ = document.getElementById('email').value
    let telefono_ = document.getElementById('telefono').value
    let domicilio_ = document.getElementById('domicilio').value

    let data = { ruc:ruc_, 
        cedula: cedula_, 
        nombre:nombre_, 
        apellido:apellido_, 
        email:email_, 
        telefono:telefono_,
        domicilio:domicilio_,
        empresa_detalle: listEmpresas
    }

    console.log(data)

    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indicar que se envían datos JSON
            },
            body: JSON.stringify(data) // Convertir los datos a JSON
        };

        fetch('/representante', request_options)
            .then((data) => resolve(data.json()))
            .catch((error) => reject(`[error]: ${error}`));
    })
}


function guardar_representante() {
    guardar()
        .then( (response) => {
            alert('Registro exitoso.')
            let ruc_ = document.getElementById('ruc').value
            consultarWebSocket(ruc_)
        } )
        .catch( (error) => {
            alert('Error al ingresar.')
        } )
}

function listarEmpresas() {
    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' // Indicar que se envían datos JSON
            }
        };

        fetch('/empresa', request_options)
            .then((data) => resolve(data.json())) // Convierte la respuesta a JSON
            .catch((error) => reject(`[error]: ${error}`));
    })
}


listarEmpresas()
    .then((data) => {
        console.log(data)
        cargarSelectEmpresas(data)
    })
    .catch((error) => console.log(error))


//Funcion que se encarga de carga el list de empresa
function cargarSelectEmpresas(data) {
    for(let i=0; i<data.body.length; i++){
        // Crear una nueva opción para la lista desplegable
        var option = document.createElement("option");
        option.value = data.body[i]._id;
        option.text = data.body[i].nombre;

        // Agregar la nueva opción a la lista desplegable
        document.getElementById("selectEmpresa").appendChild(option);
    }
}
//Funcion llamada desde el onclick del boton agregarEmpresas
function agregarEmpresa(){
    var select = document.getElementById("selectEmpresa");
    var valor = select.value;
    var texto = select.options[select.selectedIndex].text; 

    // Agregar un nuevo par código-valor al "ArrayList"
    listEmpresas.push({id: valor, nombre: texto })
    agregarFilaTabla()
    let ruc_ = document.getElementById('ruc').value
    consultarWebSocket(ruc_)
}


function agregarFilaTabla() {
    var tabla = document.getElementById("tablaEmpresa");
    var fila = tabla.insertRow(-1); // Inserta una fila al final de la tabla
    var celda1 = fila.insertCell(0); // Inserta una celda en la nueva fila
    //Obtiene el ultimo elemento agregado del array list
    const ultimoElemento = listEmpresas[listEmpresas.length - 1];
    //Asigna
    celda1.innerHTML = ultimoElemento.nombre;
}



