var pageSize = 24;
var currentPage = 0;
url = serverUrl + "/provinces/";
var provincia = {};
$(document).ready(function () {
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
                    console.log(canton);
                    $("#canton").append('<option value = "' + i + '">' + canton.nombre + '</option>');
                    i++;
                });

            }).fail(function (data, textStatus, xhr) {
                console.log([data, textStatus, xhr]);
            });
        $("#parroquia").find("option").remove();
        var i = 0;
        $.map(provincia.cantones[parseInt($('#canton').find(":selected").val())].parroquias, function (parroquia) {
            console.log(parroquia);
            $("#parroquia").append('<option value = "' + i + '">' + parroquia + '</option>');
            i++;
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
                console.log(canton);
                $("#canton").append('<option value = "' + i + '">' + canton.nombre + '</option>');
                i++;
            });
        }).fail(function (data, textStatus, xhr) {
            console.log([data, textStatus, xhr]);
        });
    });
    $("#canton").change(function () {
        $("#parroquia").find("option").remove();
        var i = 0;
        $.map(provincia.cantones[parseInt($('#provincia').find(":selected").val())].parroquias, function (parroquia) {
            console.log(parroquia);
            $("#parroquia").append('<option value = "' + i + '">' + parroquia + '</option>');
            i++;
        });
    });
});

function botonGuardar(){
    var tipoIdentificacion = opciones.options[opciones.selectedIndex];
    var identificacion  = document.getElementById("identificacion");
    var nombres = document.getElementById("nombres");
    var apellidos = document.getElementById("apellidos");
    var direccion = document.getElementById("direccion");
    var provincia = provincias.options[provincias.selectedIndex];
    var canton = cantones.options[cantones.selectedIndex];
    var parroquia = parroquias.options[parroquias.selectedIndex];
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
    for(i=table.rows.length+1; i<=6; i++){
        telefono.push("");
    }
    for(i=0; i<6;i++){
        alert(telefono[i]);
    }

    var user = {
        tipoUser : "Artesano",
        tipoId: tipoIdentificacion.value,
        identificacion: identificacion.value,
        email: "",
        apellidos: apellidos.value,
        nombres: nombres.value,
        direccion: direccion.value,
        ubicacion:{
            provincia: provincia.value,
            canton: canton.value,
            parroquia: parroquia.value,
        },
        telefonos: telefono,
        password: ""
    };
    console.log(user);
   $.ajax({
        url: serverUrl + "/users/",
        type: "POST",
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