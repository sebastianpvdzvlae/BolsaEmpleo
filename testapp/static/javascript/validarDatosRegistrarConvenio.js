function validarDatosRegistrarConvenio(){
    if(camposVacios()){//campos llenos
        botonGuardar();
    }
}

function camposVacios(){
    var acuerdoDe  = document.getElementById("acuerdo").value;
    var descripcionTarea = document.getElementById("descripcion").value;
    var valorContrato = document.getElementById("valor").value

    if(acuerdoDe == "" || descripcionTarea == "" || valorContrato == ""){
        alert("Campos Obligatorios Vaciós");
        if(acuerdoDe == ""){
            document.getElementById("acuerdo").style.borderColor="#E70D34";
        }
        if(descripcionTarea == ""){
            document.getElementById("descripcion").style.borderColor="#E70D34";
        }
        if(valorContrato == ""){
            document.getElementById("valor").style.borderColor="#E70D34";
        }
    }else{
        return true;
    }
}

