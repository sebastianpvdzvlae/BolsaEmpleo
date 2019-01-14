function validarDatosInfoCurso(){    
    var fechaInicio = document.getElementById("fechaInicio").value;
    var fechaFin = document.getElementById("fechaFin").value;
    if(camposVacios()){//campos llenos
        if(validarfechaFinMayor(fechaFin, fechaInicio)){
            registrarInfoCurso();
        }else{            
            document.getElementById("fechaFin").style.borderColor="#E70D34";
        }
    }    
}

function camposVacios(){
    var fechaInicio = document.getElementById("fechaInicio").value;
	var fechaFin = document.getElementById("fechaFin").value;
	var numParticipantes = document.getElementById("numParticipantes").value;
	var lugar = document.getElementById("lugar").value;
	var horario = document.getElementById("horario").value;

    if(numParticipantes == "" || lugar == "" || horario == "" || !isNaN(fechaInicio) || !isNaN(fechaFin)){
        alert("Campos Obligatorios Vacíos");
        if(numParticipantes == ""){
            document.getElementById("numParticipantes").style.borderColor="#E70D34";
        }
        if(lugar == ""){
            document.getElementById("lugar").style.borderColor="#E70D34";
        }
        if(horario == ""){
            document.getElementById("horario").style.borderColor="#E70D34";
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

