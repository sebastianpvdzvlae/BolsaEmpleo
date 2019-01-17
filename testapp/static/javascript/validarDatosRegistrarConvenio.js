function validarDatosRegistrarConvenio(){    
    var fechaInicio = document.getElementById("fechaInicio").value;
    var fechaFin = document.getElementById("fechaFin").value;
    if(camposVacios()){//campos llenos
        if(validarfechaFinMayor(fechaFin, fechaInicio)){
            botonGuardar();
        }else{            
            document.getElementById("fechaFin").style.borderColor="#E70D34";
        }
    }    
}

function camposVacios(){
    var acuerdoDe  = document.getElementById("acuerdo").value;
    var descripcionTarea = document.getElementById("descripcion").value;
    var valorContrato = document.getElementById("valor").value;
    var fechaInicio = document.getElementById("fechaInicio").value;
    var fechaFin = document.getElementById("fechaFin").value;

    if(acuerdoDe == "" || descripcionTarea == "" || valorContrato == "" || !isNaN(fechaInicio) || !isNaN(fechaFin)){
        alert("Campos Obligatorios Vacíos");
        if(acuerdoDe == ""){
            document.getElementById("acuerdo").style.borderColor="#E70D34";
        }
        if(descripcionTarea == ""){
            document.getElementById("descripcion").style.borderColor="#E70D34";
        }
        if(valorContrato == ""){
            document.getElementById("valor").style.borderColor="#E70D34";
        }
        if(!isNaN(fechaInicio)){
            document.getElementById("fechaInicio").style.borderColor="#E70D34";
        }
        if(!isNaN(fechaFin)){
            document.getElementById("fechaFin").style.borderColor="#E70D34";
        }
    }else{
        return true;
    }
}

