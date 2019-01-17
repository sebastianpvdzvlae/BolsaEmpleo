function soloNumeros(e) {
    var key = window.Event ? e.which : e.keyCode
    return (key >= 48 && key <= 57)
}

function soloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    especiales = "8-37-39-46";

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}

function validarCedula(ced) {
    var i;
    var cedula = ced;
    var acumulado;
    var instancia;
    acumulado = 0;
    if (ced.length != 10) {
        alert("Cédula no Válida");
        return false;
    }
    for (i = 1; i <= 9; i++) {
        if (i % 2 != 0) {
            instancia = cedula.substring(i - 1, i) * 2;
            if (instancia > 9) instancia -= 9;
        }
        else instancia = cedula.substring(i - 1, i);
        acumulado += parseInt(instancia);
    }
    while (acumulado > 0)
        acumulado -= 10;
    if (cedula.substring(9, 10) != (acumulado * -1)) {
        alert("Cédula no válida");
        return false;
    } else {
        console.log("cedula valida");
        return true;
    }
}

function validarRUC(RUC) {
    var acumulado = 0;
    var instancia;
    var ruc = RUC;
    for (i = 0; i < ruc.length; i++) {
        z = ruc.substring(i, i + 1);
        if ((z != "0") && (z != "1") && (z != "2") && (z != "3") && (z != "4") && (z != "5") && (z != "6") && (z != "7") && (z != "8") && (z != "9")) {
            alert("Ruc Invalido"); return false;
        }
    }
    if (ruc.length != 13) {
        alert("Ruc Invalido"); return false;
    }
    if ((ruc.substring(0, 2) > 22) || (ruc.substring(0, 2) < 1)) {
        alert("Ruc Invalido"); return false;
    }
    if (ruc.substring(2, 3) >= 6) {
        alert("Ruc Invalido"); return false;
    }
    for (i = 1; i <= 9; i++) {
        if (i % 2 != 0) {
            instancia = ruc.substring(i - 1, i) * 2;
            if (instancia > 9) instancia -= 9;
        }
        else instancia = ruc.substring(i - 1, i);
        acumulado += parseInt(instancia);
    }
    while (acumulado > 0)
        acumulado -= 10;
    if (ruc.substring(9, 10) != (acumulado * -1)) {
        alert("Ruc Invalido"); return false;
    }
    if ((ruc.substring(10, 13) != 001))
    {
        alert("Ruc Invalido"); return false;
    }
    console.log("Ruc Valido");
    return true;
}


function validarCorreo(email) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}

function validarfechaFinMayor(fechaFin, fechaInicio){
    if(fechaFin>fechaInicio){
        return true;
    }else{
        alert("La fecha de Fin debe ser mayor a la fecha de Inicio");
        return false;
    }
}


function cambiarColorCampo(elemento) {
    if ($(elemento).val() != "") {
        $(elemento).css("border-color", "");
    }
}
