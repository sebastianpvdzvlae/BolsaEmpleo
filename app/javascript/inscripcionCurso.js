function botonGuardar() {   
    
    var nombreCurso  = document.getElementById("descripcion");
	var idParticipante = document.getElementById("nombreInstructor");
		 
	var inscripcion_curso = {
		curso: nombreCurso.value,
		participante: idParticipante.value,
	
	}
	url='http://127.0.0.1:5000/sessions/';
	console.log(inscripcion_curso);
    $.ajax({
		url: url,
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(inscripcion_curso),
		dataType: "json"
	}).then(function (response) {
		console.log(response._id);
		window.alert("Inscripción exitosa");
	}).fail(function (data, textStatus, xhr) {
		window.alert("Error");
		console.log([data, textStatus, xhr]);
	});
}