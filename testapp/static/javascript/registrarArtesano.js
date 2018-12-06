function botonGuardar(){
    console.log("function guardar triggered");
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
    }
    url='http://127.0.0.1:5000/users/';
    console.log(user);
   $.ajax({
        url: url,
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