var pageSize = 5;
var currentPage = 0;
url = serverUrl + "/services/"; 

$(document).ready(function () {
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

    $("#txtBusqueda").find("option").remove();
    $("#txtBusqueda").append('<option name=" " value = ""></option>');

    var data = { page: currentPage, pageSize: 20}
    $.get({ url: url, cache: false, data })
        .then(function (response) {
            $.map(response.items, function (service) {
                $("#txtBusqueda").append('<option name="' + service.name + '" value = "' + service.name + '">' + service.name + '</option>');
            });
        });

        var data = { page: currentPage, pageSize: pageSize }
        $.get({ url: serverUrl + "/provinces/", cache: false, data })
            .then(function (response) {
                $("#busquedaProvincia").find("option").remove();
                $.map(response.items, function (province) {
                    $("#busquedaProvincia").append('<option name="' + province.nombre + '" value = "' + province._id + '">' + province.nombre + '</option>');
                });
                upProvincia();
            }).fail(function (data, textStatus, xhr) {
                console.log([data, textStatus, xhr]);
            });
    
        $("#busquedaProvincia").change(function () {
            upProvincia();
        });
    
        $("#busquedaCanton").change(function () {
            upParroquia();
        });
    
    tablaArtesanosAdmin(0);
});


function tablaArtesanosAdmin(page) {
    var txtBusqueda = $("#txtBusqueda").val()
    if (txtBusqueda == "") {
        url = serverUrl + "/artesanos/";
        var data = { page: page, pageSize: pageSize }
    }
    else {
        url = serverUrl + "/artesanos/artesanos-by-service";
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

function upProvincia() {
    $.get({ url: serverUrl + "/provinces/" + $('#busquedaProvincia').find(":selected").val(), cache: false, data: {} })
        .then(function (response) {
            provincia = response;
            $("#busquedaCanton").find("option").remove();
            var i = 0;
            $.map(response.cantones, function (canton) {
                $("#busquedaCanton").append('<option name="' + canton.nombre + '" value = ' + i + '>' + canton.nombre + '</option>');
                i++;
            });
            $("#busquedaParroquia").find("option").remove();
            i = 0;
            $.map(provincia.cantones[parseInt($('#busquedaCanton').find(":selected").val())].parroquias, function (parroquia) {
                $("#busquedaParroquia").append('<option name="' + parroquia + '" value = ' + i + '>' + parroquia + '</option>');
                i++;
            });

        }).fail(function (data, textStatus, xhr) {
            console.log([data, textStatus, xhr]);
        });
}


function upParroquia(){
    $("#busquedaParroquia").find("option").remove();
    var i = 0;
    $.map(provincia.cantones[parseInt($('#busquedaCanton').find(":selected").val())].parroquias, function (parroquia) {
        $("#busquedaParroquia").append('<option name="' + parroquia + '" value = ' + i + '>' + parroquia + '</option>');
        i++;
    });
}