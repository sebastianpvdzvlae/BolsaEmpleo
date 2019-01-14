  function login() {   
            var email = document.getElementById("email");
            var password  = document.getElementById("password");
            var user = {
                email: email.value,
                password: password.value
            }
            url='http://127.0.0.1:5000/sessions/';
            console.log(user);
           $.ajax({
                url: url,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(user),
                dataType: "json"
            }).then(function (response) {
                console.log(response._id);
                window.alert("Inicio de sesion exitoso");
            }).fail(function (data, textStatus, xhr) {
                window.alert("Credenciales invalidas");
                console.log([data, textStatus, xhr]);
            });
        }