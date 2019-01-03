function validarDatos() {
    var tipoIdentificacion = opciones.options[opciones.selectedIndex];
    var identificacion = document.getElementById("txt_id").value;
    //campos vacios
    if (camposVacios()) {//CAMPOS LLENOS
        if (tipoIdentificacion.value == 1) {
            if (validarCedula(identificacion)) {
                registrarArtesano();
            }else{                    
                document.getElementById("txt_id").style.borderColor="#E70D34";
            }
        } else if (tipoIdentificacion.value == 3) {
            if (validarRUC(identificacion)) {
                registrarArtesano();
            }else{                    
                document.getElementById("txt_id").style.borderColor="#E70D34";
            }
        } else {
            registrarArtesano();
        }
    }
}

function camposVacios(){
    var tipoIdentificacion = opciones.options[opciones.selectedIndex];
    var identificacion  = document.getElementById("txt_id").value;
    var nombres = document.getElementById("txt_nombres").value;
    var apellidos = document.getElementById("txt_apellidos").value;
    var direccion = document.getElementById("txt_direccion").value;
    var telf0 = document.getElementById("inputTelefono").value;

    if(identificacion == "" || nombres == "" || apellidos == "" || direccion=="" || telf0 == ""){
        alert("Campos Obligatorios Vaciós");
        if(identificacion == ""){
            document.getElementById("txt_id").style.borderColor="#E70D34";
        }
        if(nombres == ""){
            document.getElementById("txt_nombres").style.borderColor="#E70D34";
        }
        if(apellidos == ""){
            document.getElementById("txt_apellidos").style.borderColor="#E70D34";
        }
        if(direccion==""){
            document.getElementById("txt_direccion").style.borderColor="#E70D34";
        }
        if(telf0 == ""){
            document.getElementById("inputTelefono").style.borderColor="#E70D34";
        }
    }else{
        return true;
    }
}

