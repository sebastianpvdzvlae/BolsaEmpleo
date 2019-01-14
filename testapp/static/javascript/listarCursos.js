var pageSize = 5;
var currentPage = 0;

$(document).ready(function () {
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

function cargarTablaCursos(page) {
    url = serverUrl + "/courses/";
    var data = { page: page, pageSize: pageSize }

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
