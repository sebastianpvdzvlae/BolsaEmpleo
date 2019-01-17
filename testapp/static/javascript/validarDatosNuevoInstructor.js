function validarDatosNuevoInstrcutor(){    
    if(camposVacios()){//campos llenos
        registrarInstructor();
    }    
}

function camposVacios(){
    var id = document.getElementById("id").value;
	var nombres = document.getElementById("nombres").value;
	var apellidos = document.getElementById("apellidos").value;
	var telf = document.getElementById("telf").value;

    if(id == "" || nombres == "" || apellidos == "" || telf == ""){
        alert("Campos Obligatorios Vacíos");
        if(id == ""){
            document.getElementById("id").style.borderColor="#E70D34";
        }
        if(nombres == ""){
            document.getElementById("nombres").style.borderColor="#E70D34";
        }
        if(apellidos == ""){
            document.getElementById("apellidos").style.borderColor="#E70D34";
        }
        if(telf == ""){
            document.getElementById("telf").style.borderColor="#E70D34";
        }
    }else{
        return true;
    }
}

