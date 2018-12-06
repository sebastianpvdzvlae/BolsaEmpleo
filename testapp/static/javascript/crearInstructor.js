function botonGuardar() {   
    var tipoID = document.getElementById("tipoID");
    var tipoIDSelect = tipoID.options[tipoID.selectedIndex];
	var id = document.getElementById("id");
	var nombres = document.getElementById("nombres");
	var apellidos = document.getElementById("apellidos");
	var telf = document.getElementById("telf");
	
	var instructor = {
		tipoIDSelect: tipoIDSelect.value,
		id: id.value,
		nombres: nombres.value,
		apellidos: apellidos.value,
		telf: telf.value
	}
	url='http://127.0.0.1:5000/sessions/';
	console.log(instructor);
    $.ajax({
		url: url,
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(instructor),
		dataType: "json"
	}).then(function (response) {
		console.log(response._id);
		window.alert("Registro éxito");
	}).fail(function (data, textStatus, xhr) {
		window.alert("Error");
		console.log([data, textStatus, xhr]);
	});

	
}