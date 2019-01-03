  function botonGuardar() {       

        var tipoUsuario = tipoUser.options[tipoUser.selectedIndex];
        var tipoIdentificacion = tipoId.options[tipoId.selectedIndex];
        var identificacion  = document.getElementById("identificacion");
        var nombres = document.getElementById("nombres");
        var apellidos = document.getElementById("apellidos");
        var email = document.getElementById("email");
        var password = document.getElementById("password");
        var password2 = document.getElementById("password2");
        if(password.value == password2.value){
            var user = {
                tipoUser: tipoUsuario.value,
                tipoId: tipoIdentificacion.value,
                identificacion: identificacion.value,
                email: email.value,
                apellidos: apellidos.value,
                nombres: nombres.value,
                direccion: "",
                ubicacion:{
                    provincia: "",
                    canton:"",
                    parroquia: "",
                },
                telefonos : [],
                password: password.value,
                estado: true,
                intentos: 0,
                servicios: []
            }
            url = serverUrl + '/users/';
            console.log(user);
            $.ajaxSetup({
                headers: { 'Allow-Control-Allow-Origin': '*' }
            });
           $.ajax({
                url: url,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(user),
                dataType: "json"
            }).then(function (response) {
                console.log(response._id);
                window.alert("Usuario registrado exitosamente!");
                window.location.href = "Login";
            }).fail(function (data, textStatus, xhr) {
                window.alert("No se puede registrar el usuario");            
                console.log([data, textStatus, xhr]);
            });
        }else{
            window.alert("Las contraseñas no coinciden");
        }
        
  }  
       
