
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

    if (idCourse == null)
        cursoId = $('#cursos').find(":selected").val();
    else 
        cursoId = idCourse;
 
    url = serverUrl + "/courses/"; 

    $.get({ url: url + cursoId, cache: false, data: {} })
        .then(function (response) {
            curso = response;
            $('#fechaInicio').val("");
            $('#fechaFin').val("");
            $('#cursos').find(":selected").val(curso.nombre);//este valor esta como null
            console.log($('#cursos').find(":selected").val(curso.nombre).val());//si imprime el nombre correcto
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
            cargarTablaInstructores();

        }).fail(function (data, textStatus, xhr) {
            console.log([data, textStatus, xhr]);
        });
}

function cargarTablaInstructores() {
    url = serverUrl + "/instructors/";
    var data = { page: currentPage, pageSize: pageSize }

    $.get({ url: url, cache: false, data })
        .then(function(response) {

            $("#tablaInstructores").find("tbody").remove();
            var total = response.count;
            var items = response.courses;
            var pages = Math.ceil(total / pageSize);
            /*$("#btnNext").addClass('disabled');
            if (pages > currentPage + 1) {
                $("#btnNext").removeClass('disabled');
            }
            $("#btnBack").addClass('disabled');
            if (currentPage > 0) {
                $("#btnBack").removeClass('disabled');
            }*/
            var tbl = document.getElementById("tablaInstructores");
            var tblBody = document.createElement("tbody");
            
            
            for (var i = 0; i < items.length; i++) {
                var fila = document.createElement("tr");
                var celda = document.createElement("td");
                var textoCelda = document.createTextNode(items[i]['identificacion']);
                celda.appendChild(textoCelda);
                fila.appendChild(celda);
                celda = document.createElement("td");
                textoCelda = document.createTextNode(items[i]['nombres']);
                celda.appendChild(textoCelda);
                fila.appendChild(celda);
                celda = document.createElement("td");
                textoCelda = document.createTextNode(items[i]['apellidos']);
                celda.appendChild(textoCelda);
                fila.appendChild(celda);
                celda = document.createElement("td");
                textoCelda = document.createTextNode(items[i]['telefono']);
                celda.appendChild(textoCelda);
                fila.appendChild(celda);
                tblBody.appendChild(fila);
            }

            tbl.appendChild(tblBody);
        }).fail(function(data, textStatus, xhr) {
            window.alert("Error tabla");
            console.log([data, textStatus, xhr]);
        });

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