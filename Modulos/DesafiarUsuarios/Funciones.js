$(document).ready(function () {

    validarInicioSesion();
});     

function validarInicioSesion() {

    $("#panelMensajeCarga").modal("show");
    
    if (sessionStorage.getItem("idUsuario") === null) {

        let frontendURL = sessionStorage.getItem("frontendURL");
        location.href = frontendURL + "/" + "Modulos/IniciarSesion/Pagina.php";

    } else {

        buscarUsuarios();
    }
}

function buscarUsuarios() {

    let backendURL = sessionStorage.getItem("backendURL");
    let url = backendURL + "/" + "index.php/usuarios?usuarios1";

    $.ajax({
        url: url,
        method: "GET",
        success: function (provisoriaRespuesta) {

            let respuesta = JSON.parse(provisoriaRespuesta);
            let plantilla = "";

            for (let i = 0; i < respuesta.length; i++) {
                
                plantilla += `<div class="container form-control" id="div1" style="background-color: #d1e7dd; color: #0f5132;">`;
                plantilla += `<span><i class="fa-solid fa-user-large"></i>&nbsp;&nbsp;<b>${respuesta[i].nombre}</b></span>`;
                plantilla += `<p><b>VIGENTE</b></p>`;
                plantilla += `<button class="btn btn-primary" onclick="seleccionarUsuario('${respuesta[i].nombre}')" type="button"><i class="fa-regular fa-circle-check"></i></button>`;
                plantilla += `</div>`;
                plantilla += `<br>`;
            }
            
            $("#contenedorUsuarios").html(plantilla);
            setTimeout(function () {

                $("#panelMensajeCarga").modal("hide");
            }, 1000);
        }
    });
}

function buscarUsuario() {

    let nombre = $("#nombreUsuario").val();

    if (nombre !== "") {
        
        nombreUsuario = sessionStorage.getItem("nombreUsuario");

        if (nombre.toUpperCase() !== nombreUsuario.toUpperCase()) {

            let nombreUsuario = {
                "nombre": nombre
            };
            let backendURL = sessionStorage.getItem("backendURL");
            let url = backendURL + "/" + "index.php/desafios?nombreUsuario=" + JSON.stringify(nombreUsuario);

            $.ajax({
                url: url,
                method: "GET",
                success: function (provisoriaRespuesta) {

                    if (provisoriaRespuesta === "Este usuario no está registrado.") {

                        $("#nombreUsuario").val("");
                        $("#nombreUsuario").focus();
                        $("#mensajeAlertaVisual").text(provisoriaRespuesta);
                        $("#alertaVisual").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
                        $("#alertaVisual").addClass("show").removeClass("fade");

                    } else {

                        let respuesta = JSON.parse(provisoriaRespuesta);
                        sessionStorage.setItem("idUsuario2", respuesta[0].idUsuario);
                        $("#mensajeAlertaVisual").text(nombre + " esta registrado, puede desafiarlo a una batalla.");
                        $("#alertaVisual").addClass("alert-success").removeClass("alert-danger").removeClass("alert-warning");
                        $("#alertaVisual").addClass("show").removeClass("fade");
                        document.getElementById("nombreUsuario").setAttribute("readonly", true);
                        document.getElementById("botonBuscarUsuario").setAttribute("disabled", true);
                        $("#botonAmarillo").removeAttr("disabled");
                        $("#botonAzul").removeAttr("disabled");
                        $("#botonMorado").removeAttr("disabled");
                        $("#botonNaranjo").removeAttr("disabled");
                        $("#botonRojo").removeAttr("disabled");
                        $("#botonVerde").removeAttr("disabled");
                    }
                }
            });
            
        } else {
            
            $("#nombreUsuario").focus();
            $("#nombreUsuario").val("");
            $("#mensajeAlertaVisual").text("No puede desafiarse así mismo.");
            $("#alertaVisual").addClass("alert-warning").removeClass("alert-success").removeClass("alert-danger");
            $("#alertaVisual").addClass("show").removeClass("fade");
        }
        
    } else {

        $("#mensajeAlertaVisual").text("Debe escribir el nombre de un usuario para poder realizar esta acción.");
        $("#alertaVisual").addClass("alert-warning").removeClass("alert-success").removeClass("alert-danger");
        $("#alertaVisual").addClass("show").removeClass("fade");
        $("#nombreUsuario").focus();
    }
}

function seleccionarUsuario (nombreUsuario) {
    
    $("#nombreUsuario").val(nombreUsuario); 
    buscarUsuario();
}

function seleccionarColor(color) {

    $("#tituloColorSeleccionado").text("Escoja el color de su escuadrón:");

    if (color === "Amarillo") {

        document.getElementById("colorSeleccionado").style.color = "#C59D10";

    } else if (color === "Azul") {

        document.getElementById("colorSeleccionado").style.color = "#1029C5";

    } else if (color === "Morado") {

        document.getElementById("colorSeleccionado").style.color = "#7010C5";

    } else if (color === "Naranjo") {

        document.getElementById("colorSeleccionado").style.color = "#C55110";

    } else if (color === "Rojo") {

        document.getElementById("colorSeleccionado").style.color = "#C5101A";

    } else if (color === "Verde") {

        document.getElementById("colorSeleccionado").style.color = "#47C510";
    }

    sessionStorage.setItem("colorUsuario1", color);
    $("#colorSeleccionado").text(" " + color);
    let nombreUsuario = $("#nombreUsuario").val();
    $("#tituloUsuario").text("¿Quiere desafiar a " + nombreUsuario + " a una batalla?");
    $("#botonAceptarDesafio").removeAttr("disabled");
    $("#botonRechazarDesafio").removeAttr("disabled");
}

function registrarDesafio() {

    let provisoriaFecha = new Date();
    let provisorioDia = provisoriaFecha.getDate();
    let provisorioMes = (provisoriaFecha.getMonth() + 1);
    let anio = provisoriaFecha.getFullYear();
    let provisoriaHora = provisoriaFecha.getHours();
    let provisoriaMinuto = provisoriaFecha.getMinutes();
    let provisoriaSegundo = provisoriaFecha.getSeconds();
    let dia;
    let mes;    
    let hora;
    let minuto;
    let segundo;
    let fechaDesafio;
    
    if (provisorioDia < 10) {

        dia = `0${provisorioDia}`;

    } else {

        dia = provisorioDia;
    }
    if (provisorioMes < 10) {

        mes = `0${provisorioMes}`;

    } else {

        mes = provisorioMes;
    }
    if (provisoriaHora < 10) {

        hora = `0${provisoriaHora}`;

    } else {

        hora = provisoriaHora;
    }
    if (provisoriaMinuto < 10) {

        minuto = `0${provisoriaMinuto}`;

    } else {

        minuto = provisoriaMinuto;
    }
    if (provisoriaSegundo < 10) {

        segundo = `0${provisoriaSegundo}`;

    } else {

        segundo = provisoriaSegundo;
    }
    
    fechaDesafio = `${dia}/${mes}/${anio} ${hora}:${minuto}:${segundo}`;
    
    let desafio = {
        "estado": "VIGENTE",
        "fecha": fechaDesafio,
        "idUsuario1": sessionStorage.getItem("idUsuario"),
        "idUsuario2": sessionStorage.getItem("idUsuario2"),
        "colorUsuario1": sessionStorage.getItem("colorUsuario1")
    };
    
    let backendURL = sessionStorage.getItem("backendURL"); 
    let url = backendURL + "/" + "index.php/desafios?desafio=" + JSON.stringify(desafio);

    $.ajax({
        url: url,
        method: "POST",
        success: function (provisoriaRespuestaExterior) {

            if (provisoriaRespuestaExterior !== "Este usuario ya tiene un desafío anterior vigente.") {

                $("#panelMensajesDesafio").modal("show");
                url = backendURL + "/" + "index.php/desafios?desafio=" + JSON.stringify(desafio);

                $.ajax({
                    url: url,
                    method: "GET",
                    success: function (provisoriaRespuestaInterior) {

                        let respuestaInterior = JSON.parse(provisoriaRespuestaInterior);
                        sessionStorage.setItem("idDesafio", respuestaInterior[0].idDesafio);
                        buscarRespuesta();
                    }
                });

            } else if (provisoriaRespuestaExterior === "Este usuario ya tiene un desafío anterior vigente.") {

                $("#mensajeAlertaVisual").text(provisoriaRespuestaExterior);
                $("#alertaVisual").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
                $("#alertaVisual").addClass("show").removeClass("fade");
            }
        }
    });
}

function buscarRespuesta() { 
    
    let segundosRestantes = 24;

    function buscar() {    

        let idDesafio = {

            "id": sessionStorage.getItem("idDesafio"),
        };
        
        let backendURL = sessionStorage.getItem("backendURL"); 
        let url = backendURL + "/" + "index.php/desafios?idDesafio=" + JSON.stringify(idDesafio);

        $.ajax({
            url: url,
            method: "GET",
            success: function (provisoriaRespuestaExterior) {

                if (provisoriaRespuestaExterior !== "Sin Respuesta.") {
                    
                    clearInterval(idEjecutorFuncion);

                    $("#panelMensajesDesafio").modal("hide");

                    let respuestaExterior = JSON.parse(provisoriaRespuestaExterior);

                    if (respuestaExterior[0].estadoDesafio === "ACEPTADO") {

                        let frontendURL = sessionStorage.getItem("frontendURL");
                        location.href = frontendURL + "/" + "Modulos/Batallas/Pagina.php";

                    } else if (respuestaExterior[0].estadoDesafio === "RECHAZADO") {

                        $("#panelMensajesDesafioRechazado").modal("show");
                    }

                } else if (provisoriaRespuestaExterior === "Sin Respuesta.") { 

                    if (segundosRestantes >= 0) {

                        $("#mensajeCuentaRegresiva").text(segundosRestantes);
                        segundosRestantes--;

                    } else {

                        let desafioRechazado = {

                            "idDesafio": sessionStorage.getItem("idDesafio")
                        };
                        
                        url = backendURL + "/" + "index.php/desafios?desafioRechazado=" + JSON.stringify(desafioRechazado);

                        $.ajax({
                            url: url,
                            method: "PUT",
                            success: function (provisoriaRespuestaInterior) {
                                
                                if (provisoriaRespuestaInterior === "Desafío rechazado.") {

                                    clearInterval(idEjecutorFuncion);
                                    sessionStorage.removeItem("idDesafio");
                                    $("#panelMensajesDesafio").modal("hide");
                                    $("#panelMensajesDesafioRechazado").modal("show");
                                }
                            }
                        });
                    }
                }
            }
        });
    }

    let idEjecutorFuncion = setInterval(buscar, 1000);
}


function cancelar () {
    
    irPagina("DesafiarUsuarios");
}
