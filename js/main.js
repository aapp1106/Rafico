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


	form_RegistrarFirma = Validador("form_Registrar", {
        Cedula: {
            required: true,
            StringEmpty: true
		},
		name: {
            required: true,
            StringEmpty: true
        },
        Celular: {
            required: true,
            StringEmpty: true
        },
        Ciudad: {
            required: true,
            StringEmpty: true
        }
    }
    );



});


function soloNumeros(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "0123456789";
    especiales = "8-37-39-46";

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}


function SaveRegistrar() {

	if (form_RegistrarFirma.form()) {
	
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
					swal.fire({
						title: "¡Creado!",
						text: "Se ha creado correctamente.",
						type: "success"
					})
					.then((willDelete) => {
						if (willDelete) {
							location.reload(true);
						}
					});
				}
				else {
					Swal.fire(
						'¡Atención!',
						data.Msj,
						'warning'
					  )
					
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
			}
		});
		
	}else{
		Swal.fire(
			'¡Atención!',
			'llene todos los campos',
			'warning'
		  )
	}
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
					$('#Ciudad').select2();
                } else {
                    alert(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}

