$(document).ready(function () {
   
    validarInicioSesion();
});

function validarInicioSesion() {

    if (sessionStorage.getItem("idUsuario") === null) {

        irPaginaInicio();

    } else {
        
        $("#panelMensajeCarga").modal("show");
        mostrarSaludoInicial();
        ConvetirSelect2();

        setTimeout(function () {
            $("#panelMensajeCarga").modal("hide");
        }, 1000);
    }
}

function mostrarSaludoInicial() {
    
    let mensaje = "Bienvenido " + sessionStorage.getItem("nombreUsuario");
    $("#contenedorAlertaVisual").addClass("alert-success").removeClass("alert-danger").removeClass("alert-warning");
    $("#contenedorAlertaVisual").addClass("show").removeClass("fade");
    $("#mensajeAlertaVisual").text(mensaje);
    $("#nombreUsuario").text(" " + sessionStorage.getItem("nombreUsuario"));
}

function ConvetirSelect2(){
    
    let backendURL = sessionStorage.getItem("backendURL");
    let url = backendURL + "/" + "index.php/armas?obtenerArmas";
    
    $.ajax({
        url: url,
        method: "GET",
        success: function (provisoriaRespuesta) {
            
            let respuesta = JSON.parse(provisoriaRespuesta);
            let plantilla = "";

            for (let i = 0; i < respuesta.length; i++) {

                plantilla += `<option value=${respuesta[i].id}>${respuesta[i].nombre}</option>`;
            }

            $("#listaArmasPrimaria").append(plantilla);
            $("#listaArmasSecundaria").append(plantilla);
        }
    });     

    $("#listaArmasPrimaria").select2({
        theme: "bootstrap"
    });
    
    $("#listaArmasSecundaria").select2({
        theme: "bootstrap"
    });
}

function puntuacionAtributo(x) {

    let campoAtributoPersonaje = "#campoPuntuacion" + x;
    let puntuacionAtributo = parseInt($(campoAtributoPersonaje).val());

    if (puntuacionAtributo < 45 || puntuacionAtributo > 95) {

        let mensaje = "";

        if (puntuacionAtributo < 45) {

            mensaje = "La puntuación mínima de un atributo es de 45 puntos.";

        } else if (puntuacionAtributo > 95) {

            mensaje = "La puntuación máxima de un atributo es de 95 puntos.";
        }

        $("#alertaVisual").addClass("alert-warning").removeClass("alert-danger").removeClass("alert-success");
        $("#alertaVisual").addClass("show").removeClass("fade");
        $("#mensajeAlertaVisual").text(mensaje);

        setTimeout(function () {

            $(campoAtributoPersonaje).val(45);

            ocultarAlertaVisual();
        }, 2000);

    } else {

        if (puntuacionAtributo % 5) {

            let mensaje = "La puntuación de un atributo debe ser múltiplo de 5.";
            
            $("#alertaVisual").addClass("alert-warning").removeClass("alert-danger").removeClass("alert-success");
            $("#alertaVisual").addClass("show").removeClass("fade");
            $("#mensajeAlertaVisual").text(mensaje);

            setTimeout(function () {

                $(campoAtributoPersonaje).val(45);

                ocultarAlertaVisual();
            }, 2000);

        } else {

            let y = (puntuacionAtributo / 5);
            let criticoPuntuacionAtributo = parseInt(y.toFixed());
            let bonificacionAtributo = 0;
            let movimientoPorTurno = 1;
            let saludMaxima = 1;

            if (puntuacionAtributo === 95) {

                bonificacionAtributo = 5;
                movimientoPorTurno = 6;
                saludMaxima = 30;

            } else if (puntuacionAtributo === 90) {

                bonificacionAtributo = 4;
                movimientoPorTurno = 5;
                saludMaxima = 28;

            } else if (puntuacionAtributo === 85) {

                bonificacionAtributo = 4;
                movimientoPorTurno = 5;
                saludMaxima = 26;

            } else if (puntuacionAtributo === 80) {

                bonificacionAtributo = 3;
                movimientoPorTurno = 4;
                saludMaxima = 24;

            } else if (puntuacionAtributo === 75) {

                bonificacionAtributo = 3;
                movimientoPorTurno = 4;
                saludMaxima = 22;

            } else if (puntuacionAtributo === 70) {

                bonificacionAtributo = 2;
                movimientoPorTurno = 3;
                saludMaxima = 20;

            } else if (puntuacionAtributo === 65) {

                bonificacionAtributo = 2;
                movimientoPorTurno = 3;
                saludMaxima = 18;

            } else if (puntuacionAtributo === 60) {

                bonificacionAtributo = 1;
                movimientoPorTurno = 2;
                saludMaxima = 16;

            } else if (puntuacionAtributo === 55) {

                bonificacionAtributo = 1;
                movimientoPorTurno = 2;
                saludMaxima = 14;

            } else if (puntuacionAtributo === 50) {

                bonificacionAtributo = 0;
                movimientoPorTurno = 1;
                saludMaxima = 12;

            } else if (puntuacionAtributo === 45) {

                bonificacionAtributo = 0;
                movimientoPorTurno = 1;
                saludMaxima = 10;
            }

            let etiquetaPuntuacionAtributo = "#etiquetaPuntuacion" + x;

            if (x === "Percepcion") {

                $(etiquetaPuntuacionAtributo).text("Percepción (" + puntuacionAtributo + ") = Critico (" + criticoPuntuacionAtributo + ")!");

            } else {

                $(etiquetaPuntuacionAtributo).text(x + " (" + puntuacionAtributo + ") = Critico (" + criticoPuntuacionAtributo + ")!");
            }

            let etiquetaBonificacionAtributo = "#etiquetaBonificacion" + x;

            if (x === "Agilidad") {

                $(etiquetaBonificacionAtributo).val("+" + bonificacionAtributo + "/" + movimientoPorTurno);

            } else if (x === "Resistencia") {

                $(etiquetaBonificacionAtributo).val("+" + bonificacionAtributo + "/" + saludMaxima);

            } else {

                $(etiquetaBonificacionAtributo).val("+" + bonificacionAtributo);
            }
        }
    }
}

function puntuacionArma(x) {

    let listaArmas = "#listaArmas" + x;
    let idArma = parseInt($(listaArmas).val());

    let arma = {

        "id": idArma
    }

    let backendURL = sessionStorage.getItem("backendURL");
    let url = backendURL + "/" + "index.php/armas?arma=" + JSON.stringify(arma);

    $.ajax({
        url: url,
        method: "GET",
        success: function (provisoriaRespuesta) {

            let respuesta = JSON.parse(provisoriaRespuesta);
            let etiquetaAlcanceArma = "#etiquetaAlcanceArma" + x;
            let etiquetaDanoTipoDanoArma = "#etiquetaDanoTipoDanoArma" + x;
            let etiquetaTipoArma = "#etiquetaTipoArma" + x;
            let etiquetaFuerzaNecesaria = "#etiquetaFuerzaNecesariaArma" + x;
            let etiquetaResistencia = "#etiquetaResistenciaArma" + x;
            $(etiquetaAlcanceArma).val(respuesta[0].alcance);
            $(etiquetaDanoTipoDanoArma).val(respuesta[0].dano + " - " + respuesta[0].tipoDano);
            $(etiquetaTipoArma).val(respuesta[0].tipo);
            $(etiquetaFuerzaNecesaria).val(respuesta[0].fuerzaNecesaria);
            $(etiquetaResistencia).val(respuesta[0].resistencia);
        }
    });
}

function puntuacionArmadura() {

    let armadura = parseInt($("#listaArmaduras").val());
    let defensa = 0;
    let penalizacionAgilidad = 0;
    let penalizacionMovimientoPorTurno = 0;

    if (armadura != 0 && armadura === 1) {

        defensa = 4;
        penalizacionAgilidad = 0;
        penalizacionMovimientoPorTurno = 0;


    } else if (armadura != 0 && armadura === 2) {

        defensa = 6;
        penalizacionAgilidad = 10;
        penalizacionMovimientoPorTurno = 0;


    } else if (armadura != 0 && armadura === 3) {

        defensa = 8;
        penalizacionAgilidad = 20;
        penalizacionMovimientoPorTurno = 1;

    }

    $("#etiquetaDefensaArmadura").val(defensa);
    $("#etiquetaPenalizacionAgilidadArmadura").val(penalizacionAgilidad);
    $("#etiquetaPenalizacionMovimientoPorTurnoArmadura").val(penalizacionMovimientoPorTurno);   
}
    
function registrarPersonaje() {

    let nombre = $("#campoNombrePersonaje").val();
    let puntuacionAgilidad = parseInt($("#campoPuntuacionAgilidad").val());
    let puntuacionDestreza = parseInt($("#campoPuntuacionDestreza").val());
    let puntuacionInteligencia = parseInt($("#campoPuntuacionInteligencia").val());
    let puntuacionFuerza = parseInt($("#campoPuntuacionFuerza").val());
    let puntuacionPercepcion = parseInt($("#campoPuntuacionPercepcion").val());
    let puntuacionResistencia = parseInt($("#campoPuntuacionResistencia").val());
    let puntuacionTotal = (puntuacionAgilidad + puntuacionDestreza + puntuacionInteligencia + puntuacionFuerza + puntuacionPercepcion + puntuacionResistencia);
    let armaPrimaria = parseInt($("#listaArmasPrimaria").val());
    let armaSecundaria = parseInt($("#listaArmasSecundaria").val());
    let armadura = parseInt($("#listaArmaduras").val());

    if (nombre !== "") {

        if (puntuacionTotal === 390) {
            
            if (armaPrimaria !== 0 && armaSecundaria !== 0) {
                
                if (armadura !== 0) {

                    let personaje = {
                        "usuario": parseInt(sessionStorage.getItem("idUsuario")),
                        "nombre": nombre,
                        "agilidad": puntuacionAgilidad,
                        "destreza": puntuacionDestreza,
                        "inteligencia": puntuacionInteligencia,
                        "fuerza": puntuacionFuerza,
                        "percepcion": puntuacionPercepcion,
                        "resistencia": puntuacionResistencia,
                        "armaPrimaria": armaPrimaria,
                        "armaSecundaria": armaSecundaria,
                        "armadura": armadura
                    }

                    let backendURL = sessionStorage.getItem("backendURL");
                    let url = backendURL + "/" + "index.php/personajes?personaje=" + JSON.stringify(personaje);

                    $.ajax({
                        url: url,
                        method: "POST",
                        success: function (respuesta) {
                            
                            if (respuesta === "El personaje fue registrado de manera exitosa.") {

                                let mensaje = respuesta;
                                $("#alertaVisual").addClass("alert-success").removeClass("alert-danger").removeClass("alert-warning");
                                $("#alertaVisual").addClass("show").removeClass("fade");
                                $("#mensajeAlertaVisual").text(mensaje);

                                setTimeout(function () {

                                    ocultarAlertaVisual();
                                }, 2000);
                            }
                        }
                    });

                } else {

                    let mensaje = "Debe seleccionar una armadura de la lista.";
                    $("#alertaVisual").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
                    $("#alertaVisual").addClass("show").removeClass("fade");
                    $("#mensajeAlertaVisual").text(mensaje);

                    setTimeout(function () {

                        ocultarAlertaVisual();
                    }, 2000);
                }

            } else {

                let mensaje = "Debe seleccionar un arma de las dos lista.";
                $("#alertaVisual").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
                $("#alertaVisual").addClass("show").removeClass("fade");
                $("#mensajeAlertaVisual").text(mensaje);

                setTimeout(function () {

                    ocultarAlertaVisual();
                }, 2000);
            }

        } else {

            let mensaje = "";
            let diferencia = 0;

            if (puntuacionTotal < 390) {

                diferencia = (390 - puntuacionTotal);
                mensaje = "La puntuación mínima total es de 390 puntos, faltan " + diferencia + " puntos.";

            } else if (puntuacionTotal > 390) {

                diferencia = (puntuacionTotal - 390);
                mensaje = "La puntuación máxima total es de 390 puntos, sobran " + diferencia + " puntos.";
            }

            $("#alertaVisual").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
            $("#alertaVisual").addClass("show").removeClass("fade");
            $("#mensajeAlertaVisual").text(mensaje);

            setTimeout(function () {

                ocultarAlertaVisual();
            }, 2000);
        }

    } else {

        let mensaje = "El nombre no puede estar en blanco.";

        $("#alertaVisual").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
        $("#alertaVisual").addClass("show").removeClass("fade");
        $("#mensajeAlertaVisual").text(mensaje);

        setTimeout(function () {

            ocultarAlertaVisual();
        }, 2000);
    }
}





