function limpiarCamposRegistrarArtesano() {
    document.getElementById("opciones").selectedIndex = "0";
    document.getElementById('txt_id').value = "";
    document.getElementById('txt_apellidos').value = "";
    document.getElementById('txt_nombres').value = "";
    document.getElementById('txt_direccion').value = "";
    document.getElementById('txt_telefono').value = "";
    limpiarTelefono();
    document.getElementById("provincias").selectedIndex = "0";
    document.getElementById("cantones").selectedIndex = "0";
    document.getElementById("parroquias").selectedIndex = "0";
}

function limpiarCamposCrearCurso() {
    nombre_curso = document.getElementById("nombreCurso").value = "";
    descripcion_curso = document.getElementById("descripcion").value = "";
}

function limpiarCamposInfoCurso() {
    document.getElementById("cursos").selectedIndex = "0";
    document.getElementById("fechaInicio").value = "";
    document.getElementById("fechaFin").value = "";
    document.getElementById("numParticipantes").value = "";
    document.getElementById("lugar").value = "";
    document.getElementById("horario").value = "";
}

function limpiarCamposRegistrarInstructor() {

    document.getElementById("tipoID").selectedIndex = "0";
    document.getElementById("id").value = "";
    document.getElementById("nombres").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("telf").value = "";
}

function limpiarTelefono(){
    var table = document.getElementById('idTable');
    var count = table.getElementsByTagName('tr').length;
    while(count > 0){
        count = table.getElementsByTagName('tr').length;
        table.deleteRow(count-1);
    }
    btn_menos.style.display = 'none';
    btn_mas.style.display = 'block';
}
	
function limpiarCamposRegistraConvenio(){
    var acuerdo = document.getElementById("acuerdo").value = "";
    var descripcionTarea = document.getElementById("descripcion").value = "";
    var valor = document.getElementById("valor").value = "";
    var fechaInicio = document.getElementById("fechaInicio").value = "";
    var fechaFin = document.getElementById("fechaFin").value = "";
    var comentario = document.getElementById("comentario").value = "";
}

function limpiarCamposInfoCurso(){
    var fecha_inicio = document.getElementById("fechaInicio").value = "";
	var fecha_fin = document.getElementById("fechaFin").value = "";
	var numParticipantes = document.getElementById("numParticipantes").value = "";
	var lugar = document.getElementById("lugar").value = "";
	var horario = document.getElementById("horario").value = "";
}

function limpiarCamposNuevoInstructor(){
    var id = document.getElementById("id").value = "";
	var nombres = document.getElementById("nombres").value = "";
	var apellidos = document.getElementById("apellidos").value = "";
	var telf = document.getElementById("telf").value = "";
}