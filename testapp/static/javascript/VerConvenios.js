var pageSize = 5;
var currentPage = 0;
$(document).ready(function () {
    tablaConvenios(0);
    $("#btnNext").on('click', {}, function () {
        if ($(this).hasClass('disabled')) return;
        currentPage++;
        tablaConvenios(currentPage);
    });

    $("#btnBack").on('click', {}, function () {
        if ($(this).hasClass('disabled')) return;
        currentPage--;
        tablaConvenios(currentPage);
    });
});

function tablaConvenios(page) {
    url = serverUrl + "/acuerdos/";
    var data = { page: page, pageSize: pageSize }

    $.get({ url: url, cache: false, data })
        .then(function (response) {
            $("#tablaAcuerdos").find("tbody").remove();
            var count = response.count;
            var acuerdos = response.acuerdos;
            var pages = Math.ceil(count / pageSize);
            $("#btnNext").addClass('disabled');
            if (pages > currentPage + 1) {
                $("#btnNext").removeClass('disabled');
            }
            $("#btnBack").addClass('disabled');
            if (currentPage > 0) {
                $("#btnBack").removeClass('disabled');
            }
            var tbl = document.getElementById("tablaAcuerdos");
            var tblBody = document.createElement("tbody");
            for (var i = 0; i < acuerdos.length; i++) {
                var fila = document.createElement("tr");
                var celda = document.createElement("td");
                var textoCelda = document.createTextNode(acuerdos[i]['acuerdo']);
                celda.appendChild(textoCelda);
                fila.appendChild(celda);
                celda = document.createElement("td");
                textoCelda = document.createTextNode(acuerdos[i]['cliente']);
                celda.appendChild(textoCelda);
                fila.appendChild(celda);
                celda = document.createElement("td");
                textoCelda = document.createTextNode(acuerdos[i]['artesano']);
                celda.appendChild(textoCelda);
                fila.appendChild(celda);
                celda = document.createElement("td");
                textoCelda = document.createTextNode(acuerdos[i]['fechaInicio']);
                celda.appendChild(textoCelda);
                fila.appendChild(celda);
                celda = document.createElement("td");
                textoCelda = document.createTextNode(acuerdos[i]['fechaFin']);
                celda.appendChild(textoCelda);
                fila.appendChild(celda);
                celda = document.createElement("td");
                textoCelda = document.createTextNode(acuerdos[i]['valor']);
                celda.appendChild(textoCelda);
                fila.appendChild(celda);
                celda = document.createElement("td");
                textoCelda = document.createTextNode(acuerdos[i]['comentario']);
                celda.appendChild(textoCelda);
                fila.appendChild(celda);
                tblBody.appendChild(fila);
            }
            tbl.appendChild(tblBody);
        }).fail(function (data, textStatus, xhr) {
            window.alert("Error tabla");
            console.log([data, textStatus, xhr]);
        });

}