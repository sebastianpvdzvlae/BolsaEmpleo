function botonCambioClave(){
    var password = document.getElementById("password");
    var newPassword = document.getElementById("newpassword");
    var newPassword2 = document.getElementById("newpassword2");
    
    var id = $("#ID");
    url = serverUrl + '/users/' + id;

    $.get({ url: url, cache: false})
    .then(function (response){
        var items = response.items;
        var currentPassword = document.createTextNode(items[0]['password']);
        if(password.value == currentPassword){
            if(newPassword.value == newPassword2.value){
                var user = {
                    oldPassword:password.value,
                    newPassword: newPassword.value
                }
                $.ajax({
                    url: url,
                    type: "PUT",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(user),
                    dataType: "json"
                }).then(function (response) {
                    console.log(response._id);
                    window.alert("Contraseña cambiada exitosamente!");
                    window.location.href = "Login";
                }).fail(function (data, textStatus, xhr) {
                    window.alert("No se puede cambiar la contraseña");            
                    console.log([data, textStatus, xhr]);
                });
            }else{
                window.alert("Las nuevas contraseñas no coinciden");
            }
        }else{
            window.alert("Contraseña actual ingresada incorrecta");
        }
    }).fail(function (data, textStatus, xhr) {
        window.alert("Error");
        console.log([data, textStatus, xhr]);
    });
    
}