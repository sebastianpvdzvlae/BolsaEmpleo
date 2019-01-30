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

function cambioEstado(id,estadoActual){
    var est= estadoActual?"lock":"unlock";
    var action = {
        action: est
    }
    $.ajax({
        type: "POST",
        url: serverUrl + "/sessions/unlock-users/" + id,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(action),
        dataType: "json"
    }).then(function (response) {
        window.location.reload(true);
    }).fail(function(data, textStatus, xhr){
        console.log("Error Post");
        console.log([data, textStatus, xhr]);
    });

}

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
                "<td><label>" + items[i]['tipoUser'] + "</label></td>" +
                "<td>" + '<a class="ui green button" id="'+ items[i]["identificacion"] +
                '" onclick="cambioEstado(\''+items[i]["_id"]+'\','+items[i]['estado']+')">' + 
                ((items[i]['estado']) ? "Bloquear" : "Desbloquear") + "</a>" + "</td>" +
                "</tr>"
            );

            if (items[i]['estado'])
                document.getElementById(items[i]['identificacion']).setAttribute('class','ui red button');

            
        }
    }).fail(function (data, textStatus, xhr) {
        window.alert("Error tabla");
        console.log([data, textStatus, xhr]);
    });
}   
