url = serverUrl + "/instructors/"; 

function registrarInstructor() {   
    var tipoID = document.getElementById("tipoID");
    var tipoIDSelect = tipoID.options[tipoID.selectedIndex];
	var id = document.getElementById("id");
	var nombres = document.getElementById("nombres");
	var apellidos = document.getElementById("apellidos");
    var telefono = document.getElementById("telefono");

	var instructor = {
		tipoId: tipoIDSelect.value,
		identificacion: id.value,
		nombres: nombres.value,
		apellidos: apellidos.value,
		telefono: telefono.value
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
        registrarInstructorCurso(response._id);
        window.alert("Registro exitoso");
        window.location.reload(true);
	}).fail(function (data, textStatus, xhr) {
		window.alert("Error Instructor");
		console.log([data, textStatus, xhr]);
        });
    
}

function registrarInstructorCurso(idInstructor) {
    url = serverUrl + "/courses/" + $("#hiddenId").val() + "/curso"; 
    var instructor = {
        instructor: idInstructor
    }
    console.log(instructor);
    $.ajax({
        url: url,
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(instructor), 
        dataType: "json"
    }).then(function (response) {
    }).fail(function (data, textStatus, xhr) {
        window.alert("Error Curso");
        console.log([data, textStatus, xhr]);
    });


}