var pageSize = 24;
var currentPage = 0;
url = serverUrl + "/provinces/";
var provincia = {};
var cantonNumber = 0;
userData = {};
$(document).ready(function () {
    var data = { page: currentPage, pageSize: pageSize }
    $.get({ url: url, cache: false, data })
    .then(function (response) {
        provincia = response;
        $("#provincia").find("option").remove();
        $.map(response.items, function (province) {
            $("#provincia").append('<option name="' + province.nombre +'" value = "' + province._id + '">' + province.nombre +'</option>');
        });
    }).fail(function (data, textStatus, xhr) {
        console.log([data, textStatus, xhr]);
    });
    upProvincia();
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
    var div = document.getElementById('idDiv');
    var count = div.getElementsByTagName('div').length; 
    var telefono = new Array();
    telefono.push(telf0.value);
    var i;
    for(i=1; i<count; i++){
        var st = "telf" + (i);
        var element = document.getElementById(st);
        telefono.push(element.value);
    }
    console.log(telefono);
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
        userData = response;
        loadUser();

    }, function (data, textStatus, xhr) {
        console.log([data, textStatus, xhr]);
    });
}

function loadUser(){
    $("#opciones").val(userData.tipoId);
    $("#txt_id").val(userData.identificacion);
    $("#txt_apellidos").val(userData.apellidos);
    $("#txt_nombres").val(userData.nombres);
    $("#txt_direccion").val(userData.direccion);
    for (var i = 0; i < userData.telefonos.length; i++) {
        if (i == 0) $("#inputTelefono").val(userData.telefonos[i]);
        else {
            agregarTelefono();
            $("#telf" + i).val(userData.telefonos[i]);
        }
    }
    //$("#provincia").val('5c0e62fd76045e50fc434fe9');
    //upProvincia();
    prov = provincia;
    var cId = prov.cantones.findIndex(function (x) { return x.nombre == userData.ubicacion.canton });
    $("#canton").val(cId);
    upParroquia();
    var pId = prov.cantones[cId].parroquias.findIndex(function (x) { return x == userData.ubicacion.parroquia });
    $("#parroquia").val(pId);
    return;
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
    $.get({ url: url + '5c0e62fd76045e50fc434fe9', cache: false, data : {} })
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
    $.map(provincia.cantones[parseInt($('#canton').val())].parroquias, function (parroquia) {
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