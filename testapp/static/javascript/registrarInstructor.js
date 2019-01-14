url = serverUrl + "/instructors/"; 

function registrarInstructor() {   
    var tipoID = document.getElementById("tipoID");
    var tipoIDSelect = tipoID.options[tipoID.selectedIndex];
	var id = document.getElementById("id");
	var nombres = document.getElementById("nombres");
	var apellidos = document.getElementById("apellidos");
	var telf = document.getElementById("telf");
	
	var instructor = {
		tipoId: tipoIDSelect.value,
		identificacion: id.value,
		nombres: nombres.value,
		apellidos: apellidos.value,
		telefono: telf.value
	}
	console.log(instructor);
    $.ajax({
		url: url,
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(instructor),
		dataType: "json"
	}).then(function (response) {
		console.log(response._id);
        window.alert("Registro exitoso");
        window.location.reload(true);
	}).fail(function (data, textStatus, xhr) {
		window.alert("Error");
		console.log([data, textStatus, xhr]);
	});

	
}