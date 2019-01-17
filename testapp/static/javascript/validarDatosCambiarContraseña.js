function validarDatosCambiarContraseña(){  
    var newpass = document.getElementById("newpassword").value;
    var newpass2 = document.getElementById("newpassword2").value;
    if(camposVacios()){//campos llenos
        if(newpass == newpass2){
            botonCambioClave();
        }else{
            alert("Las nuevas contraseñas no coinciden");
            document.getElementById("newpassword").style.borderColor="#E70D34";
            document.getElementById("newpassword2").style.borderColor="#E70D34";
        }
    }    
}

function camposVacios(){
    var pass  = document.getElementById("password").value;
    var newpass = document.getElementById("newpassword").value;
    var newpass2 = document.getElementById("newpassword2").value;

    if(pass =="" || newpass=="" || newpass2==""){
        alert("Campos Obligatorios Vacíos");
        if(pass==""){
            document.getElementById("password").style.borderColor="#E70D34";
        }
        if(newpass==""){
            document.getElementById("newpassword").style.borderColor="#E70D34";
        }
        if(newpass2==""){
            document.getElementById("newpassword2").style.borderColor="#E70D34";
        }
        return false;
    }else{
        return true;
    }
}

