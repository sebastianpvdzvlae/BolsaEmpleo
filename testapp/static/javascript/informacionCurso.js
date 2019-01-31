
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

function cargarComboBoxInstructores(items) {
    var data = { page: currentPage, pageSize: pageSize}
    url = url = serverUrl + "/instructors/";
    $.get({ url: url, cache: false, data })
        .then(function (response) {
            $("#instructores").find("option").remove();
            $.map(response.courses, function (instructores) {
                for(var i = 0; i < items.length; i++){
                    if(instructores._id == items[i]._id)
                        break;
                }
                if(i >= items.length)
                    $("#instructores").append('<option name="' + instructores.nombres + '" value = "' + instructores._id + '">' + instructores.nombres + " " + instructores.apellidos + '</option>');
            });
    }).fail(function (data, textStatus, xhr) {
        console.log([data, textStatus, xhr]);
    });
}

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
            $('#cursos').attr("selected",false);
            console.log($('#cursos'));
            $('#cursos option[name="'+curso.nombre+'"]').attr("selected",true);

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
            $("#tablaInstructores").find("tbody").empty("");
            var items = response.instructores;
            cargarComboBoxInstructores(items);
            var tableBody = $('#tablaInstructores').children('tbody');
            for (var i = 0; i < items.length; i++) {
                tableBody.append(
                    "<tr id = " + items[i]['_id']+">"+
                    "<td>" + items[i]['identificacion'] + "</td>" +
                    "<td>" + items[i]['nombres'] + "</td>" +
                    "<td>" + items[i]['apellidos'] + "</td>" +
                    "<td>" + items[i]['telefono'] + "</td>" +
                    '<td> <div><a class="ui compact icon basic red button" id="'+items[i]['_id']+'" onclick="eliminarElementoTabla(\''+items[i]['_id']+'\')"> <i class="user times icon"> </i></a></td></div>' +
                    "</tr>"
                );
            }            
        }).fail(function(data, textStatus, xhr) {
            window.alert("Error tabla");
            console.log([data, textStatus, xhr]);
        });
}

function eliminarElementoTabla(id){
    //remover elementos de la tabla
    $('#'+id).click(function(event){
        event.preventDefault();
        $(this).closest('tr').remove();
    });
    //agregar elemento al combo box
    var data = {page: currentPage, pageSize: pageSize }
    var nombreInstructor;
    url = serverUrl + "/instructors/" + id;
    $.get({ url: url, cache: false, data })
       .then(function(response) {
            $("#instructores").append('<option name="' + response.nombres + '" value = "' + response._id + '">' + response.nombres + " " + response.apellidos + '</option>');
            
       }).fail(function(data, textStatus, xhr) {
           window.alert("Error combobox");
           console.log([data, textStatus, xhr]);
       }); 
}

function nuevoInstructor() {
    if ($("#hiddenId").val() != null)
        document.location.href = '/NuevoInstructor/' + $("#hiddenId").val();
    else
        document.location.href = '/NuevoInstructor/' + $('#cursos').find(":selected").val();
        
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
    var tabla = document.getElementById("tablaInstructores");
    var instructores = new Array();
    for(var i = 1; i < tabla.rows.length; i++){
        instructores.push(tabla.rows[i].getAttribute("id"));
    }

    console.log(instructores);
    var info_curso = {
        curso: curso.getAttribute("name"),
		fecha_inicio: fecha_inicio.value,
		fecha_fin: fecha_fin.value,
	    numParticipantes: numParticipantes.value,
		lugar: lugar.value,
        horario: horario.value,
        instructores: instructores
    }
    
	url=serverUrl + "/courses/";
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

function agregarInstructor(){
    var i;
    var data = {page: currentPage, pageSize: pageSize }
    var instructores = document.getElementById('instructores');
    var element = instructores.options[instructores.selectedIndex];  
    url = serverUrl + "/instructors/" + element.value;
    $.get({ url: url, cache: false, data })
       .then(function(response) {
           console.log(response);
        $("#tablaInstructores").find("tbody");
        var tableBody = $('#tablaInstructores').children('tbody');
            tableBody.append(
                "<tr id = " + response._id+">"+
                "<td>" + response.identificacion + "</td>" +
                "<td>" + response.nombres + "</td>" +
                "<td>" + response.apellidos + "</td>" +
                "<td>" + response.telefono + "</td>" +
                '<td> <div><a class="ui compact icon basic red button" id="'+response._id+'" onclick="eliminarElementoTabla(\''+response._id+'\')"> <i class="user times icon"> </i></a></td></div>' +
                "</tr>"
            );
       }).fail(function(data, textStatus, xhr) {
           window.alert("Error tabla");
           console.log([data, textStatus, xhr]);
       }); 
       element.remove(element.selectedIndex);   
}