function tablaArtesanos(page, pageSize) {
    url = serverUrl + "/artesanos/";
    $.get({ url: url, cache: false, data: { page: page, pageSize: pageSize } }
    ).then(function (response) {
        count = response.count;
        items = response.users;
        var tbl = document.getElementById("tablaArtesanos");
        var tblBody = document.createElement("tbody");
        for (var i = 0; i < count; i++) {
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
            tblBody.appendChild(fila);
        }
        tbl.appendChild(tblBody);
    }).fail(function (data, textStatus, xhr) {
        window.alert("Error tabla");
        console.log([data, textStatus, xhr]);
    });

}