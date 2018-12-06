function llenarTabla(){
    
	items = {
	"count" : 3,
	"items" : [
			{
				"att1" : "asd1",
				"att2" : 1,
				"att3" : "algo"
			},
			{
				"att1" : "asd2",
				"att2" : 2,
				"att3" : "algo"
			},
			{
				"att1" : "asd3",
				"att2" : 3,
				"att3" : "algo"
			}
		]
	}

	var tbl = document.getElementById("tablaPrueba");
	var tblBody = document.createElement("tbody");
	for (var i = 0; i < items.count; i++) {
		var fila = document.createElement("tr"); 
		var objeto = items.items[i];
		Object.keys(objeto).forEach(prop=>{
			var celda = document.createElement("td");
			var textoCelda = document.createTextNode(objeto[prop]);
			celda.appendChild(textoCelda);
			fila.appendChild(celda);
		});
		tblBody.appendChild(fila);
	}
	tbl.appendChild(tblBody); 

}