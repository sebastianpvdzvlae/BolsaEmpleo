var pageSize = 24;
var currentPage = 0;
url = serverUrl + "/courses/";
var i; 

$(document).ready(function () {
    var data = { page: currentPage, pageSize: pageSize }
    $.get({ url: url, cache: false, data })
        .then(function (response) {
            $("#cursos").find("option").remove();
              $.map(response.courses, function (course) {
                 $("#cursos").append('<option name="' + course.nombre + '" value = "' + course._id + '">' + course.nombre + '</option>');
            });
            cargarDatos();
        }).fail(function (data, textStatus, xhr) {
            console.log([data, textStatus, xhr]);
        });
    
});

function cargarDatos() {
    var curso;
    var cursoId = $('#cursos').find(":selected").val();
    console.log(cursoId);
    $.get({ url: url + cursoId, cache: false, data: {} })
        .then(function (response) {
            curso = response;
            //cambiar formato a yyyy-mm-dd
            $('#fechaInicio').val(curso.fechaInicio);
        }).fail(function (data, textStatus, xhr) {
            console.log([data, textStatus, xhr]);
        });
}

function registrarInfoCurso() {   
    var nombreCurso = $("#cursos").val();
    var fecha_inicio = document.getElementById("fechaInicio");
	var fecha_fin = document.getElementById("fechaFin");
	var numParticipantes = document.getElementById("numParticipantes");
	var lugar = document.getElementById("lugar");
	var horario = document.getElementById("horario");
	
	var info_curso = {
		curso: nombreCurso.value,
		fecha_inicio: fecha_inicio.value,
		fecha_fin: fecha_fin.value,
	    numParticipantes: numParticipantes.value,
		lugar: lugar.value,
		horario: horario.value
	}
	url='http://127.0.0.1:5000/sessions/';
	console.log(info_curso);
    $.ajax({
		url: url,
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(info_curso),
		dataType: "json"
	}).then(function (response) {
		console.log(response._id);
		window.alert("Información de Curso registrado con éxito");
	}).fail(function (data, textStatus, xhr) {
		window.alert("Error");
		console.log([data, textStatus, xhr]);
	});

	
}