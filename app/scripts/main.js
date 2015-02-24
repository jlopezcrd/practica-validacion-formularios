$(document).ready(function () {

    console

    $('#complexify #password').complexify({}, function (valid, complexity) {
        var progressBar = $('#complexify #complexity-bar');

        progressBar.toggleClass('progress-bar-success', valid);
        progressBar.toggleClass('progress-bar-danger', !valid);
        progressBar.css({'width': complexity + '%'});

        $('#complexify #complexity').text(Math.round(complexity) + '%');
    });

    $("#apellidos").keyup(function () {
        //$("#nombre_empresa").text($("#apellidos").text() + $("#apellidos").text());
        $("#nombre_empresa").val("");
        $("#nombre_empresa").val($("#nombre").val() + " " + $("#apellidos").val());
    });

    /* COMPROBACIONES RADIO BUTTON DEMANDANTE */
    $("#demandante-empresa").click(function() {
        if($("#demandante-empresa").is(':checked')) {
            $("#empresa").text("Empresa");
            $("#nombre_empresa").prop( "disabled", false );
            $("#nombre_empresa").prop( "placeholder", "Empresa");
            $("#nif-label").text("CIF:");
            $("#nif").prop( "placeholder", "Cif");
        }
    });

    $("#demandante-particular").click(function() {
        if($("#demandante-particular").is(':checked')) {
            $("#empresa").text("Nombre:");
            $("#nombre_empresa").val($("#nombre").val() + " " + $("#apellidos").val());
            $("#nombre_empresa").prop( "disabled", true );
            $("#nif-label").text("NIF:");
            $("#nif").prop( "placeholder", "Nif");
        }
    });
    /* FIN COMPROBACIONES RADIO BUTTON DEMANDANTE */

    /* COMPROBACIONES CODIGO POSTAL  */

    $("#cp").change(function(event) {
        if($("#cp").val().length > 5 ) {
            $("#cp").val("");
        }
        if($("#cp").val().length == 4 ) {
            $("#cp").val("0" + $("#cp").val());
        }
        if($("#cp").val().length == 3 ) {
            $("#cp").val("00" + $("#cp").val());
        }
        if($("#cp").val().length == 2 ) {
            $("#cp").val("000" + $("#cp").val());
        }
        if($("#cp").val().length == 1 ) {
            $("#cp").val("0000" + $("#cp").val());
        }
    });

    /* FIN COMPROBACIONES CODIGO POSTAL */

    /* COMPROBACIONES FORM */
    $("#miform").submit(function(event) {
        event.preventDefault();

        $("#miform").validate({
            errorElement: 'span',
            errorElementClass: 'has-error has-feedback',
            errorClass: 'has-error has-feedback',
                // REGLAS
                rules: {
                    nombre: "required",
                    apellidos: "required",
                    telefono: {
                        required: true,
                        digits: true,
                        minlength: 9
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    remail: {
                        required: true,
                        email: true
                    },
                    nif: "required",
                    nombre_empresa: "required",
                    direccion: "required",
                    cp: {
                        required: true,
                        maxlength: 5
                    },
                    localidad: "required",
                    provincia: "required",
                    pais: "required",
                    codigo_iban: "required",
                    usuario: "required",
                    password: {
                        required: true,
                        minlength: 5
                    },
                    repassword: {
                        required: true,
                        minlength: 5
                    }
                },

                // Specify the validation error messages
                messages: {
                    nombre: "El campo nombre es requerido",
                    apellidos: "El campo apellidos es requerido",
                    telefono: {
                        required: "El telefono es necesario",
                        minlength: "El numero debe tener 9 caracteres como minimo"
                    },
                    email: {
                        required: "El campo email es requerido",
                        email: "Debe ser tipo email"
                    },
                    remail: {
                        required: "El campo repetir email es requerido",
                        email: "Debe ser tipo email"
                    },
                    cif: "El campo cif es requerido",
                    nombre_empresa: "El campo nombre de empresa es requerido",
                    direccion: "El campo direccion es requerido",
                    cp: "El campo cp es requerido",
                    localidad: "El campo localidad es requerido",
                    provincia: "El campo provincia es requerido",
                    pais: "El campo pais es requerido",
                    codigo_iban: "El campo codigo_iban es requerido",
                    usuario: "El campo usuario es requerido",
                    password: {
                        required: "El campo password es requerido",
                        minlength: "La longitud minima debe ser 5"
                    },
                    repassword: {
                        required: "El campo repetir password es requerido",
                        minlength: "La longitud minima debe ser 5"
                    }
                },

                submitHandler: function(form) {
                    form.submit();
                }
            });
});
/* FIN COMPROBACIONES RADIO BUTTON DEMANDANTE */
});