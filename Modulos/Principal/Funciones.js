$(document).ready(function () {
   
    validarInicioSesion();
});

function validarInicioSesion() {

    if (sessionStorage.getItem("idUsuario") === null) {

        irPaginaInicio();

    } else {
        
        $("#panelMensajeCarga").modal("show");        
        obtenerArmas();
        obtenerPersonaje();
    }
}

function obtenerArmas() {
    
    let backendURL = sessionStorage.getItem("backendURL");
    let url = backendURL + "/" + "index.php/armas?obtenerArmas";
    
    $.ajax({
        url: url,
        method: "GET",
        success: function (provisoriaRespuesta) {
            
            console.log(provisoriaRespuesta);
            
            let respuesta = JSON.parse(provisoriaRespuesta);
            let plantilla = "";

            for (let i = 0; i < respuesta.length; i++) {

                plantilla += `<option value=${respuesta[i].id}>${respuesta[i].nombre}</option>`;
            }

            $("#listaArmasPrimaria").append(plantilla);
            $("#listaArmasSecundaria").append(plantilla);
        }
    });
}

function obtenerPersonaje(){
    
    let usuario = {
        
      "id": sessionStorage.getItem("idUsuario")  
    };
    
    let backendURL = sessionStorage.getItem("backendURL");
    let url = backendURL + "/" + "index.php/personajes?usuario=" + JSON.stringify(usuario);
    
    $.ajax({
        url: url,
        method: "GET",
        success: function (provisoriaRespuesta) {
            
            console.log(provisoriaRespuesta);
            
            /*if (provisoriaRespuesta !== "Sin Personajes Registrados.") {

                let respuesta = JSON.parse(provisoriaRespuesta);
                
                for (let i = 0; i < respuesta.length; i++) {              
                    
                    $("#campoNombrePersonaje").val(respuesta[0].nombrePersonaje);                   
                    $("#campoPuntuacionAgilidad").val(respuesta[0].puntuacionAgilidad);
                    $("#campoPuntuacionDestreza").val(respuesta[0].puntuacionDestreza);
                    $("#campoPuntuacionInteligencia").val(respuesta[0].puntuacionInteligencia);
                    $("#campoPuntuacionFuerza").val(respuesta[0].puntuacionFuerza);
                    $("#campoPuntuacionPercepcion").val(respuesta[0].puntuacionPercepcion);
                    $("#campoPuntuacionResistencia").val(respuesta[0].puntuacionResistencia);
                    $("#listaArmasPrimaria").val(respuesta[0].idArmaPrimaria);
                    $("#listaArmasSecundaria").val(respuesta[0].idArmaSecundaria);
                    $("#listaArmaduras").val(respuesta[0].idArmadura);
                    puntuacionAtributo("Agilidad");
                    puntuacionAtributo("Destreza");
                    puntuacionAtributo("Inteligencia");
                    puntuacionAtributo("Fuerza");
                    puntuacionAtributo("Percepcion");
                    puntuacionAtributo("Resistencia");
                    puntuacionArma("Primaria");
                    puntuacionArma("Secundaria");
                    puntuacionArmadura();
                    document.getElementById("campoNombrePersonaje").setAttribute("readonly", true);
                    document.getElementById("campoPuntuacionAgilidad").setAttribute("readonly", true);
                    document.getElementById("campoPuntuacionDestreza").setAttribute("readonly", true);
                    document.getElementById("campoPuntuacionInteligencia").setAttribute("readonly", true);
                    document.getElementById("campoPuntuacionFuerza").setAttribute("readonly", true);
                    document.getElementById("campoPuntuacionPercepcion").setAttribute("readonly", true);
                    document.getElementById("campoPuntuacionResistencia").setAttribute("readonly", true);
                    document.getElementById("listaArmasPrimaria").setAttribute("disabled", true);
                    document.getElementById("listaArmasSecundaria").setAttribute("disabled", true);
                    document.getElementById("listaArmaduras").setAttribute("disabled", true);
                    $("#botonRegistrar").addClass("btn-outline-success").removeClass("btn-success");
                    document.getElementById("botonRegistrar").setAttribute("disabled", true);
                    let mensaje = ", ya tienes un personaje previamente registrado.";
                    mostrarSaludoInicial(mensaje);
                    $("#panelMensajeCarga").modal("hide");                    
                }

            } else {                
                
                convetirSelectSelect2();
                let mensaje = ", puedes crear un nuevo personaje.";
                mostrarSaludoInicial(mensaje);
                $("#panelMensajeCarga").modal("hide");  
            }*/
        }
    });         
}

function mostrarSaludoInicial(x) {
    
    let mensaje = "Bienvenido " + sessionStorage.getItem("nombreUsuario") + x;
    $("#contenedorAlertaVisual").addClass("alert-success").removeClass("alert-danger").removeClass("alert-warning");
    $("#contenedorAlertaVisual").addClass("show").removeClass("fade");
    $("#mensajeAlertaVisual").text(mensaje);
}

function convetirSelectSelect2(){

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
            
            let puntuacionAgilidadPersonaje = parseInt($("#campoPuntuacionAgilidad").val());
            let puntuacionDestrezaPersonaje = parseInt($("#campoPuntuacionDestreza").val());
            let puntuacionInteligenciaPersonaje = parseInt($("#campoPuntuacionInteligencia").val());
            let puntuacionFuerzaPersonaje = parseInt($("#campoPuntuacionFuerza").val());
            let puntuacionPercepcionPersonaje = parseInt($("#campoPuntuacionPercepcion").val());
            let puntuacionResistenciaPersonaje = parseInt($("#campoPuntuacionResistencia").val());
            let puntuacionTotal = (puntuacionAgilidadPersonaje + puntuacionDestrezaPersonaje + puntuacionInteligenciaPersonaje + puntuacionFuerzaPersonaje + puntuacionPercepcionPersonaje + puntuacionResistenciaPersonaje);
            let diferencia = 0;
            let mensaje = "";
            
            if (puntuacionTotal < 390) {

                diferencia = (390 - puntuacionTotal);
                mensaje = "Puntos restantes: " + diferencia + ".";
                $("#alertaVisual").addClass("alert-success").removeClass("alert-danger").removeClass("alert-warning");
                $("#alertaVisual").addClass("show").removeClass("fade");
                $("#mensajeAlertaVisual").text(mensaje);

            } else if (puntuacionTotal === 390) {
                
                mensaje = "Puntos sobrantes: 0.";
                $("#alertaVisual").addClass("alert-success").removeClass("alert-danger").removeClass("alert-warning");
                $("#alertaVisual").addClass("show").removeClass("fade");
                $("#mensajeAlertaVisual").text(mensaje);     
                
            } else if (puntuacionTotal > 390) {
                
                diferencia = (puntuacionTotal - 390);
                mensaje = "Puntos sobrantes: " + diferencia + ".";
                $("#alertaVisual").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
                $("#alertaVisual").addClass("show").removeClass("fade");
                $("#mensajeAlertaVisual").text(mensaje);                
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

        defensa = 0;
        penalizacionAgilidad = 0;
        penalizacionMovimientoPorTurno = 0;


    } else if (armadura != 0 && armadura === 2) {

        defensa = 4;
        penalizacionAgilidad = 0;
        penalizacionMovimientoPorTurno = 0;


    } else if (armadura != 0 && armadura === 3) {

        defensa = 6;
        penalizacionAgilidad = 10;
        penalizacionMovimientoPorTurno = 0;

    } else if (armadura != 0 && armadura === 4) {

        defensa = 8;
        penalizacionAgilidad = 20;
        penalizacionMovimientoPorTurno = 1;
    }

    $("#etiquetaDefensaArmadura").val(defensa);
    $("#etiquetaPenalizacionAgilidadArmadura").val(penalizacionAgilidad);
    $("#etiquetaPenalizacionMovimientoPorTurnoArmadura").val(penalizacionMovimientoPorTurno);   
}
    
function registrarPersonaje() {

    let nombrePersonaje = $("#campoNombrePersonaje").val();
    let puntuacionAgilidadPersonaje = parseInt($("#campoPuntuacionAgilidad").val());
    let puntuacionDestrezaPersonaje = parseInt($("#campoPuntuacionDestreza").val());
    let puntuacionInteligenciaPersonaje = parseInt($("#campoPuntuacionInteligencia").val());
    let puntuacionFuerzaPersonaje = parseInt($("#campoPuntuacionFuerza").val());
    let puntuacionPercepcionPersonaje = parseInt($("#campoPuntuacionPercepcion").val());
    let puntuacionResistenciaPersonaje = parseInt($("#campoPuntuacionResistencia").val());
    let puntuacionTotal = (puntuacionAgilidadPersonaje + puntuacionDestrezaPersonaje + puntuacionInteligenciaPersonaje + puntuacionFuerzaPersonaje + puntuacionPercepcionPersonaje + puntuacionResistenciaPersonaje);
    let armaPrimaria = parseInt($("#listaArmasPrimaria").val());
    let armaSecundaria = parseInt($("#listaArmasSecundaria").val());
    let armadura = parseInt($("#listaArmaduras").val());

    if (nombrePersonaje !== "") {

        if (puntuacionTotal === 390) {
            
            if (armaPrimaria !== 0 && armaSecundaria !== 0) {
                
                if (armadura !== 0) {

                    let personaje = {
                        "usuario": parseInt(sessionStorage.getItem("idUsuario")),
                        "nombre": nombrePersonaje,
                        "agilidad": puntuacionAgilidadPersonaje,
                        "destreza": puntuacionDestrezaPersonaje,
                        "inteligencia": puntuacionInteligenciaPersonaje,
                        "fuerza": puntuacionFuerzaPersonaje,
                        "percepcion": puntuacionPercepcionPersonaje,
                        "resistencia": puntuacionResistenciaPersonaje,
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
                                
                                $("#botonRegistrar").addClass("btn-outline-success").removeClass("btn-success");
                                document.getElementById("botonRegistrar").setAttribute("disabled", true);

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





