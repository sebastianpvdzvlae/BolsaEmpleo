var pageSize = 5;
var currentPage = 0;
$(document).ready(function () {
    tablaArtesanos(0);
    $("#btnNext").on('click', {}, function () {
        if ($(this).hasClass('disabled')) return;
        currentPage++;
        tablaArtesanos(currentPage);
    });

    $("#btnBack").on('click', {}, function () {
        if ($(this).hasClass('disabled')) return;
        currentPage--;
        tablaArtesanos(currentPage);
    });
});

function tablaArtesanos(page) {
    var txtBusqueda = $("#txtBusqueda").val()
    if (txtBusqueda == ""){
        url = serverUrl + "/artesanos/";
        var data = { page: page, pageSize: pageSize }
    }
    else{
        url = serverUrl + "/artesanos/artesanos-by-service";
        var data = { page: page, pageSize: pageSize, service: txtBusqueda}
    }
    $.get({ url: url, cache: false, data })
    .then(function (response) {
        $("#tablaArtesanos").children('tbody').empty("");
        var total = response.total;
        var items = response.items;
        var pages = Math.ceil(total / pageSize);
        $("#btnNext").addClass('disabled');
        if (pages > currentPage+1) {
            $("#btnNext").removeClass('disabled');
        }
        $("#btnBack").addClass('disabled');
        if (currentPage > 0) {
            $("#btnBack").removeClass('disabled');
        }
        var tableBody = $('#tablaArtesanos').children('tbody');
        for (var i = 0; i < items.length; i++) {
            tableBody.append(
                "<tr>" + 
                "<td>" + items[i]['nombres'] + "</td>" +
                "<td>" + items[i]['apellidos'] + "</td>" +
                "<td>" + items[i]['servicios'] + "</td>" +
                "<td>" + items[i]['telefonos'] + "</td>" +
                "<td>" + items[i]['direccion'] + "</td>" +
                "</tr>"
                );
        }
    }).fail(function (data, textStatus, xhr) {
        window.alert("Error tabla");
        console.log([data, textStatus, xhr]);
    });

}
