function cargarDatos(){

    artesano = {
        "count": 1,
        "users": [
            {
                "_id": "5bf564047535291b48726281",
                "tipoUser": "admin",
                "tipoId": "Cédula",
                "identificacion": "1721225512",
                "email": "juan@mail.com",
                "apellidos": "Sulca Coral",
                "nombres": "Juan Martin",
                "direccion": "San Rafael",
                "ubicacion": {
                    "provincia": "Pichincha",
                    "canton": "Rumiñahui",
                    "parroquia": "San Rafael"
                },
                "telefonos": [
                    "0987371334",
                    "6018710"
                ],
                "password": "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4"
            }
        ]
    }
    var i;
    var telf = 'inputTelefono';

    document.getElementById('txt_tipoId').value = artesano.users[0].tipoId;
    document.getElementById('txt_id').value = artesano.users[0].identificacion;
    document.getElementById('txt_apellidos').value = artesano.users[0].apellidos;
    document.getElementById('txt_nombres').value = artesano.users[0].nombres;
    document.getElementById('txt_direccion').value = artesano.users[0].direccion;
    if(artesano.users[0].telefonos[1] == undefined) console.log("si");
    for(i=0; i<6; i++){
        telf = 'inputTelefono'+i;
        if(!(artesano.users[0].telefonos[i] == undefined)){
            document.getElementById(telf).value = artesano.users[0].telefonos[i];
        }        
    }
    provincias.options[0].text = artesano.users[0].ubicacion.provincia;
    cantones.options[0].text = artesano.users[0].ubicacion.canton;
    parroquias.options[0].text = artesano.users[0].ubicacion.parroquia;


}