function guardar() {

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
        domicilio:domicilio_ 
    }

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

function agregarFilaTabla(valor, texto) {
    var tabla = document.getElementById("tablaEmpresa");
    var fila = tabla.insertRow(-1); // Inserta una fila al final de la tabla
    var celda1 = fila.insertCell(0); // Inserta una celda en la nueva fila
    var celda2 = fila.insertCell(1);
    celda1.innerHTML = valor;
    celda2.innerHTML = texto;
}

function agregarEmpresa(){
    var select = document.getElementById("selectEmpresa");
    var valor = select.value;
    var texto = select.options[select.selectedIndex].text; 
    agregarFilaTabla(valor, texto )
}

function agregarColumna() {
    var tabla = document.getElementById("miTabla");
    for (var i = 0; i < tabla.rows.length; i++) {
        var fila = tabla.rows[i];
        var celda = fila.insertCell(-1); // Inserta una celda al final de cada fila
        celda.innerHTML = "Nuevo Dato";
    }
}