function botonCambioClave() {
    var password = document.getElementById("password");
    var newPassword = document.getElementById("newpassword");
    var newPassword2 = document.getElementById("newpassword2");

    var id = $("#hiddenId").val();
    url = serverUrl + '/sessions/' + id;
        if (newPassword.value == newPassword2.value) {
            var user = {
                oldPassword: password.value,
                newPassword: newPassword.value
            }
            $.ajax({
                url: url,
                type: "PUT",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(user),
                dataType: "json"
            }).then(function (response) {
                console.log(response.passwordUpdated);
                window.alert("Contraseña cambiada exitosamente!");
                window.location.href = "index";
            }).fail(function (data, textStatus, xhr) {
                window.alert("No se puede cambiar la contraseña");
                console.log([data, textStatus, xhr]);
            });
        } else {
            window.alert("Las nuevas contraseñas no coinciden");
        }
}