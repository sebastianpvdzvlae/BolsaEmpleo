var pageSize = 5;
var currentPage = 0;
url = serverUrl + "/courses/";

$(document).ready(function () {
    cargarCursos();
    cargarTablaCursos(0);
    $("#btnNext").on('click', {}, function () {
        if ($(this).hasClass('disabled')) return;
        currentPage++;
        cargarTablaCursos(currentPage);
    });

    $("#btnBack").on('click', {}, function () {
        if ($(this).hasClass('disabled')) return;
        currentPage--;
        cargarTablaCursos(currentPage);
    });
});

function cargarCursos() {
    var data = { page: currentPage, pageSize: pageSize }
    $.get({ url: url, cache: false, data })
        .then(function (response) {
            $("#txtBusqueda").find("option").remove();
            $.map(response.courses, function (course) {
                $("#txtBusqueda").append('<option name="' + course.nombre + '" value = "' + course._id + '">' + course.nombre + '</option>');
            });
        }).fail(function (data, textStatus, xhr) {
            console.log([data, textStatus, xhr]);
        });
}

function cargarTablaCursos(page) {
    if (txtBusqueda.value == "") {
        url = serverUrl + "/courses/";
        var data = { page: page, pageSize: pageSize }
    }
    else {
        url = serverUrl + "/courses/find-by-name";
        var data = { page: page, pageSize: pageSize, course: $('#txtBusqueda').find(":selected").attr("name") }
    }

    $.get({ url: url, cache: false, data })
        .then(function (response) {
            $("#tablaCursos").children('tbody').empty("");
            var total = response.count;
            var items = response.courses;
            var pages = Math.ceil(total / pageSize);
            $("#btnNext").addClass('disabled');
            if (pages > currentPage + 1) {
                $("#btnNext").removeClass('disabled');
            }
            $("#btnBack").addClass('disabled');
            if (currentPage > 0) {
                $("#btnBack").removeClass('disabled');
            }
            var tableBody = $('#tablaCursos').children('tbody');
            for (var i = 0; i < items.length; i++) {
                tableBody.append(
                    "<tr>" +
                    "<td>" + items[i]['nombre'] + "</td>" +
                    "<td>" + items[i]['fechaInicio'] + "</td>" +
                    "<td>" + items[i]['fechaFin'] + "</td>" +
                    "<td>" + items[i]['numParticipantes'] + "</td>" +
                    "<td>" + items[i]['lugar'] + "</td>" +
                    "<td>" + items[i]['horario'] + "</td>" +
                    '<td> <a class="ui button" href="' + window.location.origin + "/InfoCurso/" + items[i]['_id'] + '">Editar</a></td>' +
                    "</tr>"
                );
            }
        }).fail(function (data, textStatus, xhr) {
            window.alert("Error tabla");
            console.log([data, textStatus, xhr]);
        });

}
