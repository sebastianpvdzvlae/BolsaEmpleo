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
            $("#tablaArtesanos").find("tbody").remove();
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
            var tbl = document.getElementById("tablaArtesanos");
            var tblBody = document.createElement("tbody");
            var id;//asignar valor a esta variable
            for (var i = 0; i < items.length; i++) {
                var fila = document.createElement("tr");
                var celda = document.createElement("td");
                var textoCelda = document.createTextNode(items[i]['nombres']);
                celda.appendChild(textoCelda);
                fila.appendChild(celda);
                celda = document.createElement("td");
                textoCelda = document.createTextNode(items[i]['apellidos']);
                celda.appendChild(textoCelda);
                fila.appendChild(celda);
                celda = document.createElement("td");
                textoCelda = document.createTextNode(items[i]['servicios']);
                celda.appendChild(textoCelda);
                fila.appendChild(celda);
                celda = document.createElement("td");
                textoCelda = document.createTextNode(items[i]['telefonos']);
                celda.appendChild(textoCelda);
                fila.appendChild(celda);
                celda = document.createElement("td");
                textoCelda = document.createTextNode(items[i]['direccion']);
                celda.appendChild(textoCelda);
                fila.appendChild(celda);
                celda = document.createElement("td");
                boton = document.createElement("input");
                boton.type = "button";
                boton.value = "Editar Informacion";
                boton.onclick="javascript:redirigir(id)"
                celda.appendChild(boton);
                fila.appendChild(celda);
                tblBody.appendChild(fila);
            }
            tbl.appendChild(tblBody);
        }).fail(function (data, textStatus, xhr) {
            window.alert("Error tabla");
            console.log([data, textStatus, xhr]);
        });

}

function redirigir(id) {
    location.href = serverUrl+"/RegistrarArtesano"+id
        
}
