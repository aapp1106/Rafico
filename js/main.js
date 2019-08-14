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
	var formURL = 'http://167.86.106.173:8090/Registrar/InsertRegistrarPage';

	var Params = { 
		Cedula: $('#Cedula').val(), 
		Nombre: $('#name').val(), 
		Celular: $('#Celular').val(), 
		MunicipioParent: 'BOSCONIA', 
		Referente : 2025,
		UserReg : 2025,
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
    var formURL = 'http://167.86.106.173:8090/Registrar/GetBarrios';
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
                        if (item.Municipio == null) {
                            HtmlMunicipio += "<option value=" + item.Municipio + ">" + "Sin Municipio" + "</option>";
                        } else
                            HtmlMunicipio += "<option value=" + item.Municipio + ">" + item.Municipio + "</option>";
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

