function botonGuardar() {   
    var nombreCurso = document.getElementById("curso");
    var fecha_inicio = document.getElementById("fechaInicio");
	var fecha_fin = document.getElementById("fechaFin");
	var numParticipantes = document.getElementById("numParticipantes");
	var lugar = document.getElementById("lugar");
	var horario = document.getElementById("horario");
	
	var info_curso = {
		curso: nombreCurso.value,
		fecha_inicio: fecha_inicio.value,
		fecha_fin: fecha_fin.value,
	    numParticipantes: numParticipantes.value,
		lugar: lugar.value,
		horario: horario.value
	}
	url='http://127.0.0.1:5000/sessions/';
	console.log(info_curso);
    $.ajax({
		url: url,
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(info_curso),
		dataType: "json"
	}).then(function (response) {
		console.log(response._id);
		window.alert("Información de Curso registrado con éxito");
	}).fail(function (data, textStatus, xhr) {
		window.alert("Error");
		console.log([data, textStatus, xhr]);
	});

	
}