(function($) {
	"use strict"
	
	// Preloader
	$(window).on('load', function() {
		$("#preloader").delay(600).fadeOut();
	});

	// Mobile Toggle Btn
	$('.navbar-toggle').on('click',function(){
		$('#header').toggleClass('nav-collapse')
	});
	
})(jQuery);

$(document).ready(function () {

	$("#btnGuardarRegistrar").on("click", function () { SaveRegistrar(); });


});


function SaveRegistrar() {
	
	var form_data = new FormData();
	var formURL = '167.86.106.173:8989/Registrar/InsertRegistrar';

	var Params = { 
		Cedula: $('#Cedula').val(), 
		Nombre: $('#name').val(), 
		Correo: $('#email').val()
	};

	form_data.append('Parametros', JSON.stringify(Params));
	$.ajax(
	{
		url: formURL,
		content: "application/json; charset=utf-8",
		type: "POST",
		dataType: "json",
		data: form_data,
		contentType: false,
		processData: false,
		success: function (data) {
			if (!data.IsError) {
				swal({
					title: "¡Gracias!",
					text: "Te has registrado correctamente",
					confirmButtonColor: "#66BB6A",
					type: "success",
					closeOnConfirm: true,
					timer: 20000
				})
			}
			else {
				swal({
					title: "¡Atención!",
					text: "Algo salio mal",
					confirmButtonColor: "#66BB6A",
					type: "warning"
				})
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(errorThrown);
		}
	});
	
    
}