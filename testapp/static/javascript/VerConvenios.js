var pageSize = 5;
var currentPage = 0;
$(document).ready(function () {
    if ($("#hiddenId").val()) tablaConvenios($("#hiddenId").val());
});

function tablaConvenios(userId) {
    var data = {}
    
    $.get({ url: (serverUrl + "/acuerdosUser/" + userId), cache: false, data})
    .then(function (response) {
        $("#tablaAcuerdos").children('tbody').empty("");
        var count = response.count;
        var acuerdos = response.items;
        var pages = Math.ceil(count / pageSize);
        $("#btnNext").addClass('disabled');
        if (pages > currentPage + 1) {
            $("#btnNext").removeClass('disabled');
        }
        $("#btnBack").addClass('disabled');
        if (currentPage > 0) {
            $("#btnBack").removeClass('disabled');
        }
        var tableBody = $('#tablaAcuerdos').children('tbody');
        for (var i = 0; i < acuerdos.length; i++) {
            tableBody.append(
                "<tr>" +
                "<td>" + acuerdos[i]['acuerdoUsuario']['nombres'] + "</td>" +
                "<td>" + acuerdos[i]['acuerdoUsuario']['tipoUser'] + "</td>" +
                "<td>" + acuerdos[i]['descripcion'] + "</td>" +
                "<td>" + acuerdos[i]['fechaInicio'] + "</td>" +
                "<td>" + acuerdos[i]['fechaFin'] + "</td>" +
                "<td>" + acuerdos[i]['valor'] + "</td>" +
                "<td>" + acuerdos[i]['comentario'] + "</td>" +
                "</tr>"
            );
        }
    }).fail(function (data, textStatus, xhr) {
        window.alert("Error tabla");
        console.log([data, textStatus, xhr]);
    });

}