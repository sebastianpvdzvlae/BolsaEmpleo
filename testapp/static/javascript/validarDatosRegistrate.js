function validarDatosRegistrate(){
    var tipoIdentificacion = tipoId.options[tipoId.selectedIndex]
    var identificacion  = document.getElementById("identificacion").value;
    var correo = document.getElementById("email").value;
    
    if(camposVacios()){//campos llenos
        if(validarCorreo(correo)){//correo validado
            console.log("correo valido");
            if(tipoIdentificacion.value == "cedula"){
                if(validarCedula(identificacion)){
                     botonGuardar();
                }else{                    
                    document.getElementById("identificacion").style.borderColor="#E70D34";
                }
             } else if(tipoIdentificacion.value == "ruc"){
                 if(validarRUC(identificacion)){
                     botonGuardar();
                 }else{                    
                    document.getElementById("identificacion").style.borderColor="#E70D34";
                }
             } else{            
                 botonGuardar();
             }
        }else{
            alert("El correo electrónico ingresado no es correcto");
            document.getElementById("email").style.borderColor="#E70D34";
        }
    }
}

function camposVacios(){
    var tipoIdentificacion = tipoId.options[tipoId.selectedIndex]
    var identificacion  = document.getElementById("identificacion").value;
    var nombres = document.getElementById("nombres").value;
    var apellidos = document.getElementById("apellidos").value;
    var email = document.getElementById("email").value;
    var passw = document.getElementById("password").value;

    if(identificacion == "" || nombres == "" || apellidos == "" || email=="" || passw == ""){
        alert("Campos Obligatorios Vacíos");
        if(identificacion == ""){
            document.getElementById("identificacion").style.borderColor="#E70D34";
        }
        if(nombres == ""){
            document.getElementById("nombres").style.borderColor="#E70D34";
        }
        if(apellidos == ""){
            document.getElementById("apellidos").style.borderColor="#E70D34";
        }
        if(email==""){
            document.getElementById("email").style.borderColor="#E70D34";
        }
        if(passw == ""){
            document.getElementById("password").style.borderColor="#E70D34";
        }
    }else{
        return true;
    }
}

