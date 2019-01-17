var pageSize = 5;
var currentPage = 0;
$(document).ready(function () {
    tablaArtesanosAdmin(0);
    $("#btnNext").on('click', {}, function () {
        if ($(this).hasClass('disabled')) return;
        currentPage++;
        tablaArtesanosAdmin(currentPage);
    });

    $("#btnBack").on('click', {}, function () {
        if ($(this).hasClass('disabled')) return;
        currentPage--;
        tablaArtesanosAdmin(currentPage);
    });
    $.get({ url: url, cache: false, data })
        .then(function (response) {
            $("#txtBusqueda").find("option").remove();
            $.map(response.services, function (service) {
                $("#txtBusqueda").append('<option name="' + service.nombre + '" value = "' + service._id + '">' + service.nombre + '</option>');
          
            });
});

function tablaArtesanosAdmin(page) {
    var txtBusqueda = $("#txtBusqueda").val()
    if (txtBusqueda == "") {
        url = serverUrl + "/artesanos/";
        var data = { page: page, pageSize: pageSize }
    }
    else {
        url = serverUrl + "/services/";
        var data = { page: page, pageSize: pageSize, service: txtBusqueda }
    }
    $.get({ url: url, cache: false, data })
        .then(function (response) {
            $("#tablaArtesanos").children('tbody').empty("");
            var total = response.total;
            var items = response.items;
            var pages = Math.ceil(total / pageSize);
            $("#btnNext").addClass('disabled');
            if (pages > currentPage + 1) {
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
                    '<td> <a class="ui button" href="' + window.location.origin + "/RegistrarArtesano/" + items[i]['_id'] + '">Editar</a></td>' +
                    "</tr>"
                );
            }
        }).fail(function (data, textStatus, xhr) {
            window.alert("Error tabla");
            console.log([data, textStatus, xhr]);
        });

}

function redirigir(id) {
    location.href = serverUrl+"/RegistrarArtesano/"+id
        
}
