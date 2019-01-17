function validarDatosCrearCurso(){  
    if(camposVacios()){//campos llenos
        crearCurso();
    }    
}

function camposVacios(){
    var nombreCurso  = document.getElementById("nombreCurso").value;
    var descripcion = document.getElementById("descripcion").value;

    if(nombreCurso == "" || descripcion == ""){
        alert("Campos Obligatorios Vacíos");
        if(nombreCurso == ""){
            document.getElementById("nombreCurso").style.borderColor="#E70D34";
        }
        if(descripcion == ""){
            document.getElementById("descripcion").style.borderColor="#E70D34";
        }
    }else{
        return true;
    }
}

