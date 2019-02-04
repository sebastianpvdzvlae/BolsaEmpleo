
var pageSize = 24;
var currentPage = 0;
url = serverUrl + "/courses/";

$(document).ready(function() {
    var data = { page: currentPage, pageSize: pageSize }
    console.log(data);
    $.get({ url: url, cache: false, data })
        .then(function (response) {
            console.log(response);
            $("#cursos").find("option").remove();
            $.map(response.courses, function (course) {
                $("#cursos").append('<option name="' + course.nombre + '" value = "' + course._id + '">' + course.nombre + '</option>');
            });
            cargarDatos($('#cursos').find(":selected").val());
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

    $.get({ url: url + cursoId, cache: false, data: {} })
        .then(function (response) {
            curso = response;
            $('#fechaInicio').val("");
            $('#fechaFin').val("");
            $('#cursos').attr("selected", false);
            $('#cursos option[name="' + curso.nombre + '"]').attr("selected", true);

            if (curso.fecha_inicio != "")
                $('#fechaInicio').val(curso.fecha_inicio);
            if (curso.fecha_fin != "")
                $('#fechaFin').val(curso.fecha_fin);
            if (curso.lugar != "")
                $('#lugar').val(curso.lugar);
            if (curso.horario != "")
                $('#horario').val(curso.horario);
            if (curso.descripcion != "")
                $('#descripcion').val(curso.descripcion);

        }).fail(function (data, textStatus, xhr) {
            console.log([data, textStatus, xhr]);
        });
}

function inscribirse() {
    url = url + $('#cursos').find(":selected").val() + "/inscripcion";
    var inscripcion = {
        id: $("#hiddenId").val()
    }
    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(inscripcion),
        dataType: "json"
    }).then(function (response) {
        window.alert("Inscripción realizada de forma exitosa!");
        window.location.reload(true);
    }).fail(function (data, textStatus, xhr) {
        if (data.status == 400)
            window.alert("El curso se encuentra completo, no se aceptan más inscripciones");
        else {
            window.alert("Error");
            console.log([data, textStatus, xhr]);
        }
    });
}

