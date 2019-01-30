
var pageSize = 24;
var currentPage = 0;
url = serverUrl + "/courses/"; 

$(document).ready(function() {

    var data = { page: currentPage, pageSize: pageSize}
    $.get({ url: url, cache: false, data })
        .then(function (response) {
            $("#cursos").find("option").remove();
            $.map(response.courses, function (course) {
                $("#cursos").append('<option name="' + course.nombre + '" value = "' + course._id + '">' + course.nombre + '</option>');
            });
            if ($("#hiddenId").val() != null) {
                cargarDatos($("#hiddenId").val());
            } else {
                cargarDatos(null);
            }
        }).fail(function (data, textStatus, xhr) {
            console.log([data, textStatus, xhr]);
        });
    
});

function cargarDatos(idCourse) {
    var cursoId;

    if (idCourse == null) {
        cursoId = $('#cursos').find(":selected").val();
    } else {
        cursoId = idCourse;
    }
 
    url = serverUrl + "/courses/"; 

    $.get({ url: url + cursoId, cache: false, data: {} })
        .then(function (response) {
            curso = response;
            $('#fechaInicio').val("");
            $('#fechaFin').val("");
            if (curso.fecha_inicio != "") 
                $('#fechaInicio').val(curso.fecha_inicio);
            if (curso.fecha_fin != "")
                $('#fechaFin').val(curso.fecha_fin);
            if (curso.numParticipantes != "")
                $('#numParticipantes').val(curso.numParticipantes);
            if (curso.lugar != "")
                $('#lugar').val(curso.lugar);
            if (curso.horario != "")
                $('#horario').val(curso.horario);
            cargarTablaInstructores(cursoId);

        }).fail(function (data, textStatus, xhr) {
            console.log([data, textStatus, xhr]);
        });
}

function cargarTablaInstructores(idCourseInstructor) {
    url = serverUrl + "/courses/" + idCourseInstructor + "/curso";
    var data = {}

    $.get({ url: url, cache: false, data })
        .then(function (response) {
            console.log(response);
            $("#tablaInstructores").find("tbody").empty("");
            var total = response.count;
            var items = response.instructores;

            var tableBody = $('#tablaInstructores').children('tbody');

            console.log(items);
            for (var i = 0; i < items.length; i++) {
                tableBody.append(
                    "<tr>" +
                    "<td>" + items[i]['identificacion'] + "</td>" +
                    "<td>" + items[i]['nombres'] + "</td>" +
                    "<td>" + items[i]['apellidos'] + "</td>" +
                    "<td>" + items[i]['telefono'] + "</td>" +
                    "</tr>"
                );
            }
        }).fail(function(data, textStatus, xhr) {
            window.alert("Error tabla");
            console.log([data, textStatus, xhr]);
        });

}

function nuevoInstructor() {
    if ($("#hiddenId").val() != null)
        document.location.href = '/NuevoInstructor/' + $("#hiddenId").val() + '/curso/';
    else
        document.location.href = '/NuevoInstructor/' + $('#cursos').find(":selected").val() + '/curso/';
        
}
function formato(texto) { //cambiar formato de dd/mm/yyyy a yyyy-mm-dd
    return texto.replace(/^(\d{2})\/(\d{2})\/(\d{4})$/g, '$3-$2-$1');
}

function registrarInfoCurso() {
    url = serverUrl + "/courses/"; 
    var opcCursos = document.getElementById("cursos");
    var curso = opcCursos.options[opcCursos.selectedIndex];
    
    var fecha_inicio = document.getElementById("fechaInicio");
	var fecha_fin = document.getElementById("fechaFin");
	var numParticipantes = document.getElementById("numParticipantes");
	var lugar = document.getElementById("lugar");
	var horario = document.getElementById("horario");
	
    var info_curso = {
        curso: curso.getAttribute("name"),
		fecha_inicio: fecha_inicio.value,
		fecha_fin: fecha_fin.value,
	    numParticipantes: numParticipantes.value,
		lugar: lugar.value,
		horario: horario.value
	}
	url=serverUrl + "/courses/";
	console.log(info_curso);
    $.ajax({
        url: url + curso.value,
		type: "PUT",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(info_curso),
		dataType: "json"
	}).then(function (response) {
		console.log(response._id);
        window.alert("Información de Curso registrado con éxito");
        window.location.reload(true);
	}).fail(function (data, textStatus, xhr) {
		window.alert("Error");
		console.log([data, textStatus, xhr]);
	});

	
}