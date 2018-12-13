var pageSize = 24;
var currentPage = 0;
url = serverUrl + "/provinces/";
var provincia = {};
var id = 000;
$(document).ready(function () {
    //$();
    var data = { page: currentPage, pageSize: pageSize }
    $.get({ url: url, cache: false, data })
    .then(function (response) {
        $("#provincia").find("option").remove();
        $.map(response.items, function (province) {
            $("#provincia").append('<option value = "' + province._id + '">' + province.nombre +'</option>');
        });
        $.get({ url: url + $('#provincia').find(":selected").val(), cache: false })
            .then(function (response) {
                provincia = response;
                $("#canton").find("option").remove();
                var i = 0;
                $.map(response.cantones, function (canton) {
                    $("#canton").append('<option value = "' + i + '">' + canton.nombre + '</option>');
                    i++;
                });
                $("#parroquia").find("option").remove();
                i = 0;
                $.map(provincia.cantones[parseInt($('#canton').find(":selected").val())].parroquias, function (parroquia) {
                    $("#parroquia").append('<option value = "' + i + '">' + parroquia + '</option>');
                    i++;
                });

            }).fail(function (data, textStatus, xhr) {
                console.log([data, textStatus, xhr]);
            });
    }).fail(function (data, textStatus, xhr) {
        console.log([data, textStatus, xhr]);
    });
    $("#provincia").change(function () {
        $.get({ url: url + this.value, cache: false})
        .then(function (response) {
            provincia = response;
            $("#canton").find("option").remove();
            var i = 0;
            $.map(response.cantones, function (canton) {
                $("#canton").append('<option value = "' + i + '">' + canton.nombre + '</option>');
                i++;
            });
            $("#parroquia").find("option").remove();
            i = 0;
            $.map(provincia.cantones[parseInt($('#canton').find(":selected").val())].parroquias, function (parroquia) {
                $("#parroquia").append('<option value = "' + i + '">' + parroquia + '</option>');
                i++;
            });
        }).fail(function (data, textStatus, xhr) {
            console.log([data, textStatus, xhr]);
        });
    });
    $("#canton").change(function () {
        console.log("canton changed!");
        $("#parroquia").find("option").remove();
        var i = 0;
        $.map(provincia.cantones[parseInt($('#canton').find(":selected").val())].parroquias, function (parroquia) {
            $("#parroquia").append('<option value = "' + i + '">' + parroquia + '</option>');
            i++;
        });
    });
});

function registrarArtesano(){
    var tipoIdentificacion = opciones.options[opciones.selectedIndex];
    var identificacion = document.getElementById("txt_id");
    var nombres = document.getElementById("txt_nombres");
    var apellidos = document.getElementById("txt_apellidos");
    var direccion = document.getElementById("txt_direccion");
    var provincias = $("#provincia").val();
    var cantones = $("#canton").val();
    var parroquias = $("#parroquia").val();
    var telf0 = document.getElementById("inputTelefono");
    var table = document.getElementById('idTable');
    var telefono = new Array();
    telefono.push(telf0.value);
    var i;
    for(i=1; i<table.rows.length; i++){
        var idTelf = "telf"+i;
        var input = document.getElementById(idTelf);
        telefono.push(input.value);
    }
    var user = {
        tipoId: tipoIdentificacion.value,
        identificacion: identificacion.value,
        apellidos: apellidos.value,
        nombres: nombres.value,
        direccion: direccion.value,
        ubicacion:{
            provincia: provincia.nombre,
            canton: provincia.cantones[cantones].nombre,
            parroquia: provincia.cantones[cantones].parroquias[parroquias],
        },
        telefonos: telefono
    };
    console.log(user);
   $.ajax({
        url: serverUrl + "/users/" + id,
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(user),
        dataType: "json"
    }).then(function (response) {
        console.log(response._id);
        window.alert("Datos guardados con exito");
    }).fail(function (data, textStatus, xhr) {
        window.alert("Hubo un error al guardar los datos");            
        console.log([data, textStatus, xhr]);
    });
}