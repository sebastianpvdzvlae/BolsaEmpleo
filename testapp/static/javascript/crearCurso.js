url = serverUrl + "/courses/"; 

function crearCurso() {   
    var nombre_curso = document.getElementById("nombreCurso");
    var descripcion_curso  = document.getElementById("descripcion");
	var curso = {
		nombre: nombre_curso.value,
		descripcion: descripcion_curso.value
	}
	console.log(curso);
    $.ajax({
		url: url,
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(curso),
		dataType: "json"
	}).then(function (response) {
		console.log(response._id);
        window.alert("Creación de curso exitoso");
        window.location.reload(true);
	}).fail(function (data, textStatus, xhr) {
		window.alert("Error, no se puede crear Curso");
		console.log([data, textStatus, xhr]);
	});
}
