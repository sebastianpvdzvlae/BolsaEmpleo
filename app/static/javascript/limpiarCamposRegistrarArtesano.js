function limpiarCampos(){
    document.getElementById("opciones").selectedIndex = "0";
    document.getElementById('txt_id').value = "";
    document.getElementById('txt_apellidos').value = "";
    document.getElementById('txt_nombres').value = "";
    document.getElementById('txt_direccion').value = "";    
    document.getElementById('txt_telefono').value = "";
    limpiarTelefono();
    document.getElementById("provincias").selectedIndex = "0";
    document.getElementById("cantones").selectedIndex = "0";
    document.getElementById("parroquias").selectedIndex = "0";
}

function limpiarTelefono(){
    var table = document.getElementById('idTable');
    var count = table.getElementsByTagName('tr').length;
    while(count > 0){
        count = table.getElementsByTagName('tr').length;
        table.deleteRow(count-1);
    }
    btn_menos.style.display = 'none';
    btn_mas.style.display = 'block';
}
	
