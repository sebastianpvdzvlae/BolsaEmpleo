function llenarTabla(){
    
	items = {
	"count" : 20,
	"items" : ["Albañil","Arquitecto", "Plomero", "Electricista",  "Asistente Contable", "Construcción", "Servicio General", "Mecánico", "Asistente Comercial", "Servicio de Ventas", "Panelero",
			   "Mecánico Industrial", "Metalmecánico", "Servicio Técnico", "Peón", "Ayudante", "Soldador", "Operador", "Pintor", "Telecomunicador"]
	}

	var tbl = document.getElementById("tablaPrueba");
	var tblBody = document.createElement("tbody");
	var contador = 0;
	for (var i = 0; i < 5; i++) {
		var fila = document.createElement("tr"); 
		for(var j = 0; j < 4; j++){
			var celda = document.createElement("td");
			celda.innerHTML = "<input type = 'checkbox'>"+items.items[contador]; 
			fila.append(celda); 
			contador++;
		}   
		tblBody.appendChild(fila);
	}
	tbl.appendChild(tblBody);    

}