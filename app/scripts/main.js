$(document).ready(function () {


    $('#provincia').load("http://jorgelopez.infenlaces.com/validacion/consultar_provincias.php");

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
            $("#nif").prop( "name", "cif");
            $("#nif").prop( "id", "cif");
        }
    });

    $("#demandante-particular").click(function() {
        if($("#demandante-particular").is(':checked')) {
            $("#empresa").text("Nombre:");
            $("#nombre_empresa").val($("#nombre").val() + " " + $("#apellidos").val());
            $("#nombre_empresa").prop( "disabled", true );
            $("#nif-label").text("NIF:");
            $("#cif").prop( "placeholder", "Nif");
            $("#cif").prop( "name", "nif");
            $("#cif").attr( "id", "nif");
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

    /* COMPROBACIONES USUARIO */
    $("#email").change(function(event) {
        $("#usuario").val($("#email").val());
        if($("#email").val().length <= 4){
            alert("EL usuario debe contener 4 caracteres minimo");
        }
    });
    /*  FIN */

    /* COMPROBACION CONTRASEÑAS IGUALES */

    $("#repassword").change(function(event) {
        if($("#repassword").val() != $("#password").val()){
            alert("El password no coincide");
        }
    });

    /* FIN CONTRASEÑAS IGUALES */

    /* CODIGO POSTAL LOCALIDAD */
    $("#cp").keyup(function () {
        var cod = parseInt($("#cp").val().substring(0,2));
        $("#provincia option[value="+cod+"]").attr("selected",true);
    });

    /* COMPROBACIONES FORM */

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
                        email: true,
                        remote: {
                            url: "http://jorgelopez.infenlaces.com/validacion/consultar_usuario.php",
                            type: "get",
                            data: {
                                email: function() {
                                    return $( "#email" ).val();
                                }
                            }
                        }
                    },
                    remail: {
                        required: true,
                        email: true
                    },
                    nif: {
                        required: true,
                        remote: {
                            url: "http://jorgelopez.infenlaces.com/validacion/consultar_nif.php",
                            type: "get",
                            data: {
                                nif: function() {
                                    return $( "#nif" ).val();
                                }
                            }
                        }
                    },
                    cif: {
                        required: true,
                        cifES: true
                    },
                    nombre_empresa: "required",
                    direccion: "required",
                    cp: {
                        required: true,
                        maxlength: 5
                    },
                    localidad: "required",
                    provincia: "required",
                    pais: "required",
                    codigo_iban: {
                        required: true,
                        iban: true
                    },
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
                        email: "Debe ser tipo email",
                        remote: "Ese email ya esta registrado"
                    },
                    remail: {
                        required: "El campo repetir email es requerido",
                        email: "Debe ser tipo email"
                    },
                    nif: "El nif introducido esta usado",
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
                    var pago;
                    if ($("#optionsRadios1").is(':checked')) {
                        pago="mensual será de 50€";
                    }
                    if ($("#optionsRadios2").is(':checked')) {
                        pago="trimestral será de 140€";
                    }
                    if ($("#optionsRadios3").is(':checked')) {
                        pago="anual será de 550€";
                    }

                    var alerta=confirm('Su cuota es de:  '+pago+' ¿Esta de acuerdo?');
                    if(alerta==true){
                        alert("Alta correcta!");
                        form.submit();
                    }else{
                        alert("No se ha procedido al alta");
                    }
                }
            });

$.validator.addMethod( "cifES", function( value ) {
    "use strict";

    var num = [],
    controlDigit, sum, i, count, tmp, secondDigit;

    value = value.toUpperCase();

    // Quick format test
    if ( !value.match( "((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)" ) ) {
        return false;
    }

    for ( i = 0; i < 9; i++ ) {
        num[ i ] = parseInt( value.charAt( i ), 10 );
    }

    // Algorithm for checking CIF codes
    sum = num[ 2 ] + num[ 4 ] + num[ 6 ];
    for ( count = 1; count < 8; count += 2 ) {
        tmp = ( 2 * num[ count ] ).toString();
        secondDigit = tmp.charAt( 1 );

        sum += parseInt( tmp.charAt( 0 ), 10 ) + ( secondDigit === "" ? 0 : parseInt( secondDigit, 10 ) );
    }

    /* The first (position 1) is a letter following the following criteria:
     *  A. Corporations
     *  B. LLCs
     *  C. General partnerships
     *  D. Companies limited partnerships
     *  E. Communities of goods
     *  F. Cooperative Societies
     *  G. Associations
     *  H. Communities of homeowners in horizontal property regime
     *  J. Civil Societies
     *  K. Old format
     *  L. Old format
     *  M. Old format
     *  N. Nonresident entities
     *  P. Local authorities
     *  Q. Autonomous bodies, state or not, and the like, and congregations and religious institutions
     *  R. Congregations and religious institutions (since 2008 ORDER EHA/451/2008)
     *  S. Organs of State Administration and regions
     *  V. Agrarian Transformation
     *  W. Permanent establishments of non-resident in Spain
     */
     if ( /^[ABCDEFGHJNPQRSUVW]{1}/.test( value ) ) {
        sum += "";
        controlDigit = 10 - parseInt( sum.charAt( sum.length - 1 ), 10 );
        value += controlDigit;
        return ( num[ 8 ].toString() === String.fromCharCode( 64 + controlDigit ) || num[ 8 ].toString() === value.charAt( value.length - 1 ) );
    }

    return false;

}, "Please specify a valid CIF number." );

$.validator.addMethod("iban", function(value, element) {
        // some quick simple tests to prevent needless work
        if (this.optional(element)) {
            return true;
        }

        // remove spaces and to upper case
        var iban = value.replace(/ /g, "").toUpperCase(),
        ibancheckdigits = "",
        leadingZeroes = true,
        cRest = "",
        cOperator = "",
        countrycode, ibancheck, charAt, cChar, bbanpattern, bbancountrypatterns, ibanregexp, i, p;

        if (!(/^([a-zA-Z0-9]{4} ){2,8}[a-zA-Z0-9]{1,4}|[a-zA-Z0-9]{12,34}$/.test(iban))) {
            return false;
        }

        // check the country code and find the country specific format
        countrycode = iban.substring(0, 2);
        bbancountrypatterns = {
            "AL": "\\d{8}[\\dA-Z]{16}",
            "AD": "\\d{8}[\\dA-Z]{12}",
            "AT": "\\d{16}",
            "AZ": "[\\dA-Z]{4}\\d{20}",
            "BE": "\\d{12}",
            "BH": "[A-Z]{4}[\\dA-Z]{14}",
            "BA": "\\d{16}",
            "BR": "\\d{23}[A-Z][\\dA-Z]",
            "BG": "[A-Z]{4}\\d{6}[\\dA-Z]{8}",
            "CR": "\\d{17}",
            "HR": "\\d{17}",
            "CY": "\\d{8}[\\dA-Z]{16}",
            "CZ": "\\d{20}",
            "DK": "\\d{14}",
            "DO": "[A-Z]{4}\\d{20}",
            "EE": "\\d{16}",
            "FO": "\\d{14}",
            "FI": "\\d{14}",
            "FR": "\\d{10}[\\dA-Z]{11}\\d{2}",
            "GE": "[\\dA-Z]{2}\\d{16}",
            "DE": "\\d{18}",
            "GI": "[A-Z]{4}[\\dA-Z]{15}",
            "GR": "\\d{7}[\\dA-Z]{16}",
            "GL": "\\d{14}",
            "GT": "[\\dA-Z]{4}[\\dA-Z]{20}",
            "HU": "\\d{24}",
            "IS": "\\d{22}",
            "IE": "[\\dA-Z]{4}\\d{14}",
            "IL": "\\d{19}",
            "IT": "[A-Z]\\d{10}[\\dA-Z]{12}",
            "KZ": "\\d{3}[\\dA-Z]{13}",
            "KW": "[A-Z]{4}[\\dA-Z]{22}",
            "LV": "[A-Z]{4}[\\dA-Z]{13}",
            "LB": "\\d{4}[\\dA-Z]{20}",
            "LI": "\\d{5}[\\dA-Z]{12}",
            "LT": "\\d{16}",
            "LU": "\\d{3}[\\dA-Z]{13}",
            "MK": "\\d{3}[\\dA-Z]{10}\\d{2}",
            "MT": "[A-Z]{4}\\d{5}[\\dA-Z]{18}",
            "MR": "\\d{23}",
            "MU": "[A-Z]{4}\\d{19}[A-Z]{3}",
            "MC": "\\d{10}[\\dA-Z]{11}\\d{2}",
            "MD": "[\\dA-Z]{2}\\d{18}",
            "ME": "\\d{18}",
            "NL": "[A-Z]{4}\\d{10}",
            "NO": "\\d{11}",
            "PK": "[\\dA-Z]{4}\\d{16}",
            "PS": "[\\dA-Z]{4}\\d{21}",
            "PL": "\\d{24}",
            "PT": "\\d{21}",
            "RO": "[A-Z]{4}[\\dA-Z]{16}",
            "SM": "[A-Z]\\d{10}[\\dA-Z]{12}",
            "SA": "\\d{2}[\\dA-Z]{18}",
            "RS": "\\d{18}",
            "SK": "\\d{20}",
            "SI": "\\d{15}",
            "ES": "\\d{20}",
            "SE": "\\d{20}",
            "CH": "\\d{5}[\\dA-Z]{12}",
            "TN": "\\d{20}",
            "TR": "\\d{5}[\\dA-Z]{17}",
            "AE": "\\d{3}\\d{16}",
            "GB": "[A-Z]{4}\\d{14}",
            "VG": "[\\dA-Z]{4}\\d{16}"
        };

        bbanpattern = bbancountrypatterns[countrycode];
        // As new countries will start using IBAN in the
        // future, we only check if the countrycode is known.
        // This prevents false negatives, while almost all
        // false positives introduced by this, will be caught
        // by the checksum validation below anyway.
        // Strict checking should return FALSE for unknown
        // countries.
        if (typeof bbanpattern !== "undefined") {
            ibanregexp = new RegExp("^[A-Z]{2}\\d{2}" + bbanpattern + "$", "");
            if (!(ibanregexp.test(iban))) {
                return false; // invalid country specific format
            }
        }

        // now check the checksum, first convert to digits
        ibancheck = iban.substring(4, iban.length) + iban.substring(0, 4);
        for (i = 0; i < ibancheck.length; i++) {
            charAt = ibancheck.charAt(i);
            if (charAt !== "0") {
                leadingZeroes = false;
            }
            if (!leadingZeroes) {
                ibancheckdigits += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charAt);
            }
        }

        // calculate the result of: ibancheckdigits % 97
        for (p = 0; p < ibancheckdigits.length; p++) {
            cChar = ibancheckdigits.charAt(p);
            cOperator = "" + cRest + "" + cChar;
            cRest = cOperator % 97;
        }
        return cRest === 1;
    }, "Please specify a valid IBAN");

/* FIN COMPROBACIONES RADIO BUTTON DEMANDANTE */
});