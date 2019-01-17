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
    //var txtBusqueda = $("#txtBusqueda").val()
    
    url = serverUrl + "/users/"; //revisar ubicacion del correoelectronico
    var data = { page: page, pageSize: pageSize }

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
                "<td><label>" + items[i]['nombres'] + "</label></td>" +
                "<td><label>" + items[i]['apellidos'] + "</label></td>" +
                "<td><label>" + items[i]['identificacion'] + "</label></td>" +
                "<td><label>" + items[i]['email'] + "</label></td>" +
                "<td>" + '<a class="ui green button" id="btnUnlock">' + ((items[i]['estado']) ? "Bloquear" : "Desbloquear") + "</a>" + "</td>" +
                "</tr>"
            );
            $("#btnUnlock").onclick = function (id){
                $.get({ url: serverUrl + "/sessions/" + id, cache: false, data : {} }).then(function (response) {});
                window.location.reload(true);
            };
        }
    }).fail(function (data, textStatus, xhr) {
        window.alert("Error tabla");
        console.log([data, textStatus, xhr]);
    });

}
