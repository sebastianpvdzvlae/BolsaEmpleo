var pageSize = 24;
var currentPage = 0;
var provincia = {};
var cantonNumber = 0;
$(document).ready(function () {
    var data = { page: currentPage, pageSize: pageSize }
    $.get({ url: serverUrl + "/provinces/", cache: false, data })
    .then(function (response) {
        $("#provincia").find("option").remove();
        $.map(response.items, function (province) {
            $("#provincia").append('<option name="' + province.nombre +'" value = "' + province._id + '">' + province.nombre +'</option>');
        });
        upProvincia();
    }).fail(function (data, textStatus, xhr) {
        console.log([data, textStatus, xhr]);
    });
    if ($("#hiddenId").val()) cargarArtesano($("#hiddenId").val());
    $("#provincia").change(function () {
        upProvincia();
    });
    $("#canton").change(function () {
        upParroquia();
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
       url: serverUrl + "/users/" + $("#hiddenId").val(),
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(user),
        dataType: "json"
    }).then(function (response) {
        console.log(response._id);
        window.alert("Datos guardados con exito");
        window.location.reload(true);
    }).fail(function (data, textStatus, xhr) {
        window.alert("Hubo un error al guardar los datos");            
        console.log([data, textStatus, xhr]);
    });
}

function cargarArtesano(userId){
    $.get({ url: (serverUrl + "/users/" + userId), cache: false, data:{ }})
    .then(function (response){
        $("#opciones").val(response.tipoId);
        $("#txt_id").val(response.identificacion);
        $("#txt_apellidos").val(response.apellidos);
        $("#txt_nombres").val(response.nombres);
        $("#txt_direccion").val(response.direccion);
        for (var i = 0; i < response.telefonos.length; i++){
            if (i == 0) $("#inputTelefono").val(response.telefonos[i]);
            else {
                agregarTelefono();
                $("#telf" + i).val(response.telefonos[i]);
            }
        }
        $("#provincia").val('5c0e62fd76045e50fc434fe9');
        upProvincia();
        $("#canton").val(1);
        upParroquia();
        $("#parroquia").val(4);

    }).fail(function (data, textStatus, xhr) {
        console.log([data, textStatus, xhr]);
    });
}

function agregarTelefono() {
    var div = document.getElementById('idDiv');
    var count = div.getElementsByTagName('input').length;
    var btn_menos = document.getElementById('btn_menos');
    var btn_mas = document.getElementById('btn_mas');
    if (count == 1) {
        btn_menos.style.display = 'block';
    }

    if (count == 6) {
        btn_mas.style.display = 'none';
    }

    if (count < 6) {
        var nuevo = document.createElement('div');
        nuevo.setAttribute("id","nuevo"+count);
        nuevo.innerHTML = "<input type=\"text\" id=\"telf" + count + "\"/>";
        div.appendChild(nuevo);
    }
}

function quitarTelefono() {
    var div = document.getElementById('idDiv');
    var count = div.getElementsByTagName('input').length;
    var btn_menos = document.getElementById('btn_menos');
    var btn_mas = document.getElementById('btn_mas');

    if (count == 2) {
        btn_menos.style.display = 'none';
    }

    if (count == 6) {
        btn_mas.style.display = 'block';
    }
    var st = "nuevo" + (count-1);
    var element = document.getElementById(st);
    div.removeChild(element);
}


function upProvincia(){
    $.get({ url: serverUrl + "/provinces/" + $('#provincia').find(":selected").val(), cache: false, data : {} })
        .then(function (response) {
            provincia = response;
            $("#canton").find("option").remove();
            var i = 0;
            $.map(response.cantones, function (canton) {
                $("#canton").append('<option name="' + canton.nombre + '" value = ' + i + '>' + canton.nombre + '</option>');
                i++;
            });
            $("#parroquia").find("option").remove();
            i = 0;
            $.map(provincia.cantones[parseInt($('#canton').find(":selected").val())].parroquias, function (parroquia) {
                $("#parroquia").append('<option name="' + parroquia + '" value = ' + i + '>' + parroquia + '</option>');
                i++;
            });

        }).fail(function (data, textStatus, xhr) {
            console.log([data, textStatus, xhr]);
        });
}

function upCanton(){
    $("#canton").find("option").remove();
    var i = 0;
    $.map(provincia.cantones, function (canton) {
        $("#canton").append('<option name="' + canton.nombre + '" value = ' + i + '>' + canton.nombre + '</option>');
        i++;
    });
}

function upParroquia(){
    $("#parroquia").find("option").remove();
    var i = 0;
    $.map(provincia.cantones[parseInt($('#canton').find(":selected").val())].parroquias, function (parroquia) {
        $("#parroquia").append('<option name="' + parroquia + '" value = ' + i + '>' + parroquia + '</option>');
        i++;
    });
}

function loadParroquia(cantonNumber) {
    $("#parroquia").find("option").remove();
    var i = 0;
    $.map(provincia.cantones[cantonNumber].parroquias, function (parroquia) {
        $("#parroquia").append('<option name="' + parroquia + '" value = ' + i + '>' + parroquia + '</option>');
        i++;
    });
}