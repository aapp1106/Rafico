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
	$("#btnGuardarRegistrar").on("click", function () { 
		postAjax('http://167.86.106.173:8069/Registrar/InsertRegistrarMovil/', { Cedula: $('#Cedula').val(), Nombre: $('#name').val(), Celular: $('#Celular').val(), Ciudad: $('#Ciudad').val(), Referente: "WEB", UserReg: 2019 }, function(data){ console.log(data); });
		
		
	});
	
	/*$("#btnGuardarRegistrar").on("click", function () { SaveRegistrar(); });*/


});


function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
 ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
 xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
    };
 xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
 xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
 xhr.send(params);
    return xhr;
}

function SaveRegistrar() {
	
	var form_data = new FormData();
	var formURL = '167.86.106.173:8989/Registrar/InsertRegistrarMovil';

	var Params = { 
		Cedula: $('#Cedula').val(), 
		Nombre: $('#name').val(), 
		Celular: $('#Celular').val(), 
		Municipio: $('#Ciudad').val(), 
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
				alert("¡Gracias");
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
    var formURL = 'http://167.86.106.173:8069/Registrar/GetMunicipiosUnicosDeContacto';
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

