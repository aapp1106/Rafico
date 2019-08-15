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
	Get_Ciudades();
	
	
	$("#btnGuardarRegistrar").on("click", function () { SaveRegistrar(); });


});



function SaveRegistrar() {
	
	var form_data = new FormData();
	var formURL = 'http://167.86.106.173:8989/Registrar/InsertRegistrarPage';

	var Params = { 
		Cedula: $('#Cedula').val(), 
		Nombre: $('#name').val(), 
		Celular: $('#Celular').val(), 
		MunicipioParent: $('#Ciudad').val(), 
		Referente : 2029,
		UserReg : 2029,
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
				alert("¡Hecho!");
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
				alert("error dentro");
				swal({
					title: "¡Atención!",
					text: "Algo salio mal",
					confirmButtonColor: "#66BB6A",
					type: "warning"
				})
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert("error fuera");
			console.log(errorThrown);
		}
	});
	
    
}



function Get_Ciudades() {
    var formURL = 'http://167.86.106.173:8989/ConfiCampana/GetMunicipios';
    $.ajax(
        {
            url: formURL,
            content: "application/json; charset=utf-8",
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (!data.Is_Error) {
                    var DataPartido = data.Objeto;
                    var HtmlMunicipio = "";
                    HtmlMunicipio += "<option value=''>Seleccionar</option>";
                    $.each(DataPartido, function (index, item) {
                        if(item.Co_Depar == 20){
							HtmlMunicipio += "<option value=" + item.Id_Muni + ">" + item.Des_Muni + "</option>";
						}
                            
                    })
                    $('#Ciudad').html(HtmlMunicipio);
                } else {
                    alert(data);
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}

