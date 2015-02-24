$(document).ready(function () {

    // $(function () {
    //     $("#password").complexify({}, function (valid, complexity) {
    //         document.getElementById("PassValue").value = complexity;
    //     });
    // });

$('#complexify #password').complexify({}, function (valid, complexity) {
    var progressBar = $('#complexify #complexity-bar');

    progressBar.toggleClass('progress-bar-success', valid);
    progressBar.toggleClass('progress-bar-danger', !valid);
    progressBar.css({'width': complexity + '%'});

    $('#complexify #complexity').text(Math.round(complexity) + '%');
});

$("#miform").submit(function(event) {
    event.preventDefault();
    console.log("hola");

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
                    cif: "required",
                    nombre_empresa: "required",
                    direccion: "required",
                    cp: "required",
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
                    telefono: "El campo telefono es requerido y debe contener 9 digitos",
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
});