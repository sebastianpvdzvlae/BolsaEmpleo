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
                telefonos = [],
                password: password.value
            }
            url='http://127.0.0.1:5000/users/';
            console.log(user);
           $.ajax({
                url: url,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(user),
                dataType: "json"
            }).then(function (response) {
                console.log(response._id);
                
            }).fail(function (data, textStatus, xhr) {
                window.alert("Credenciales invalidas");            
                console.log([data, textStatus, xhr]);
            });
        }else{
            window.alert("Las contraseñas deben ser iguales");
        }
        
  }  
       
