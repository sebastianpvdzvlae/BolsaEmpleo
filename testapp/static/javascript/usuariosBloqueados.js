var pageSize = 10;
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
        $("#tablaArtesanos").find("tbody").remove();
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
        var tbl = document.getElementById("tablaArtesanos");
        var tblBody = document.createElement("tbody");
        for (var i = 0; i < items.length; i++) {
            var fila = document.createElement("tr");
            var celda = document.createElement("td");
            var button = document.createElement("button");
            var txtBtnEstado = "Desbloquear";

            var textoCelda = document.createTextNode(items[i]['nombres']);
            celda.appendChild(textoCelda);
            fila.appendChild(celda);
            celda = document.createElement("td");

            textoCelda = document.createTextNode(items[i]['apellidos']);
            celda.appendChild(textoCelda);
            fila.appendChild(celda);
            celda = document.createElement("td");

            textoCelda = document.createTextNode(items[i]['identificacion']);
            celda.appendChild(textoCelda);
            fila.appendChild(celda);
            celda = document.createElement("td");

            textoCelda = document.createTextNode(items[i]['email']);
            celda.appendChild(textoCelda);
            fila.appendChild(celda);
            celda = document.createElement("td");

            textoCelda = document.createTextNode((items[i]['estado'])?"Desbloqueado":"Bloqueado");
            celda.appendChild(textoCelda);
            fila.appendChild(celda);
 
            if(items[i]['estado'])
                txtBtnEstado = "Bloquear"
            button.appendChild(textoCelda);
            button.onclick = function (id){
                $.get({ url: serverUrl + "/sessions/" + id, cache: false, data : {} }).then(function (response) {});
            };
            celda.appendChild(button);
            fila.appendChild(celda);
            button = document.createElement("button");

            tblBody.appendChild(fila);
        }
        tbl.appendChild(tblBody);
    }).fail(function (data, textStatus, xhr) {
        window.alert("Error tabla");
        console.log([data, textStatus, xhr]);
    });

}
