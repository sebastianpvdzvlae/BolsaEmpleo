var pageSize = 24;
var currentPage = 0;
url = serverUrl + "/users/";

$(document).ready(function () { 
    var data = { page: currentPage, pageSize: pageSize }
    cargarAcuerdo($("#hiddenId").val());
});

function botonGuardar(){
    var acuerdo = document.getElementById("acuerdo");
    var descripcionTarea = document.getElementById("descripcion");
    var valor = document.getElementById("valor");
    var fechaInicio = document.getElementById("fechaInicio");
    var fechaFin = document.getElementById("fechaFin");
    var comentario = document.getElementById("comentario");
    var acuerdo = {
        cliente: "",
        artesano: "",
        acuerdo: acuerdo.value,
        descripcion: descripcionTarea.value,
        valor: valor.value,
        fechaInicio: fechaInicio.value,
        fechaFin: fechaFin.value,
        comentario: comentario.value
    }
    url='http://127.0.0.1:5000/acuerdos/';
    console.log(acuerdo);
   $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(acuerdos),
        dataType: "json"
    }).then(function (response) {
        console.log(response._id);
        window.alert("Acuerdo registrado con exito");
    }).fail(function (data, textStatus, xhr) {
        window.alert("Hubo un error al guardar los datos");            
        console.log([data, textStatus, xhr]);
    });
}


function cargarAcuerdo(userId){
    $.get({ url: (serverUrl + "/users/" + userId), cache: false, data:{ }})
    .then(function (response){
        $("#nombreArtesano").val(response.nombres + " " + response.apellidos);
    }).fail(function (data, textStatus, xhr) {
        console.log([data, textStatus, xhr]);
    });
}