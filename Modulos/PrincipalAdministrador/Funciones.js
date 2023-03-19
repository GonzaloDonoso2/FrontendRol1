$(document).ready(function () {
    
    validarInicioSesion();
});

function validarInicioSesion() {
    
    $("#panelMensajeCarga").modal("show");
    
    if (sessionStorage.getItem("idUsuario") === null) {        
        
        irPaginaInicio();
        
    } else {
        
        mostrarSaludoInicial();
        obtenerMejoresResultadosBatallas();
        obtenerUsuarios();
        obtenerSolicitudes();
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

function obtenerMejoresResultadosBatallas() {
    
    let backendURL = sessionStorage.getItem("backendURL");    
    let url = backendURL + "/" + "index.php/batallas?mejoresResultadosBatallas";
    
    $.ajax({
        url: url,
        method: "GET",
        success: function (provisoriaRespuesta) {            
            
            let respuesta = JSON.parse(provisoriaRespuesta);
            $("#primerJugador").text(" " + respuesta[0].nombreUsuario);            
            $("#segundoJugador").text(" " + respuesta[1].nombreUsuario);
            $("#tercerJugador").text(" " + respuesta[2].nombreUsuario);
        }
    });
}

function buscarUsuario() {

    let nombre = $("#nombreUsuario").val();

    if (nombre !== "") {

        let nombreUsuario = {
            "nombre": nombre
        };
        let backendURL = sessionStorage.getItem("backendURL");
        let url = backendURL + "/" + "index.php/usuarios?buscarUsuario=" + JSON.stringify(nombreUsuario);

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
                    let plantilla = "";

                    if (respuesta[0].estadoUsuario === "VIGENTE") {

                        plantilla += `<div class="container form-control" id="div1" style="background-color: #d1e7dd; color: #0f5132;">`;
                        plantilla += `<span><i class="fa-solid fa-user-large"></i>&nbsp;&nbsp;<b>${nombre}</b></span>`;
                        plantilla += `<p id="p1">${respuesta[0].estadoUsuario}</p>`;
                        plantilla += `<button class="btn btn-danger" id="boton1" onclick="habilitarDeshabilitarUsuario(1, ${respuesta[0].idUsuario})" type="button"><i class="fa-solid fa-user-large-slash" id="icon1"></i></button>`;
                        plantilla += `</div>`;
                        plantilla += `<br>`;

                    } else {

                        plantilla += `<div class="container form-control" id="div1" style="background-color: #f8d7da; color: #842029;">`;
                        plantilla += `<span><i class="fa-solid fa-user-large"></i>&nbsp;&nbsp;<b>${nombre}</b></span>`;
                        plantilla += `<p id="p1">${respuesta[0].estadoUsuario}</p>`;
                        plantilla += `<button class="btn btn-success" id="boton1" onclick="habilitarDeshabilitarUsuario(1, ${respuesta[0].idUsuario})" type="button"><i class="fa-solid fa-user-large" id="icon1"></i></button>`;
                        plantilla += `</div>`;
                        plantilla += `<br>`;
                    }
                    
                    $("#contenedorUsuarios").html(plantilla);
                    $("#nombreUsuario").val("");
                    $("#nombreUsuario").focus();
                }
            }
        });

    } else {

        $("#mensajeAlertaVisual").text("Debe escribir el nombre de un usuario para poder realizar esta acción.");
        $("#alertaVisual").addClass("alert-warning").removeClass("alert-success").removeClass("alert-danger");
        $("#alertaVisual").addClass("show").removeClass("fade");
        $("#nombreUsuario").focus();
    }
}

function obtenerUsuarios() {
    
    let backendURL = sessionStorage.getItem("backendURL");
    let url = backendURL + "/" + "index.php/usuarios?usuarios2";

    $.ajax({
        url: url,
        method: "GET",
        success: function (provisoriaRespuesta) {

            let respuesta = JSON.parse(provisoriaRespuesta);           
            let usuariosVigentes = 0;
            let usuariosNoVigentes = 0;
            let usuariosTotales = 0;
            let plantilla = "";

            for (let i = 0; i < respuesta.length; i++) {
                
                if (respuesta[i].estado === "VIGENTE") {
                    
                    plantilla += `<div class="container form-control" id="div${i + 1}" style="background-color: #d1e7dd; color: #0f5132;">`;
                    plantilla += `<span><i class="fa-solid fa-user-large"></i>&nbsp;&nbsp;<b>${respuesta[i].nombre}</b></span>`;
                    plantilla += `<p id="p${i + 1}">${respuesta[i].estado}</p>`;
                    plantilla += `<button class="btn btn-danger" id="boton${i + 1}" onclick="habilitarDeshabilitarUsuario(${i + 1}, ${respuesta[i].id})" type="button"><i class="fa-solid fa-user-large-slash" id="icon${i + 1}"></i></button>`;
                    plantilla += `</div>`;
                    plantilla += `<br>`;
                    usuariosVigentes++;

                } else {
                    
                    plantilla += `<div class="container form-control" id="div${i + 1}" style="background-color: #f8d7da; color: #842029;">`;
                    plantilla += `<span><i class="fa-solid fa-user-large"></i>&nbsp;&nbsp;<b>${respuesta[i].nombre}</b></span>`;
                    plantilla += `<p id="p${i + 1}">${respuesta[i].estado}</p>`;
                    plantilla += `<button class="btn btn-success" id="boton${i + 1}" onclick="habilitarDeshabilitarUsuario(${i + 1}, ${respuesta[i].id})" type="button"><i class="fa-solid fa-user-large" id="icon${i + 1}"></i></button>`;
                    plantilla += `</div>`;
                    plantilla += `<br>`;
                    usuariosNoVigentes++;
                }
                
                usuariosTotales = (usuariosVigentes + usuariosNoVigentes); 
                $("#usuariosVigentes").text(" " + usuariosVigentes);
                $("#usuariosNoVigentes").text(" " + usuariosNoVigentes);
                $("#usuariosTotales").text(" " + usuariosTotales); 
            }

            $("#contenedorUsuarios").html(plantilla);
            $("#nombreUsuario").val("");
            $("#nombreUsuario").focus();
        }
    });
}

function habilitarDeshabilitarUsuario(x, y) {

    let p = "#p" + x;
    let estado = $(p).text();
    let idUsuario = y;
    let usuario = {
        "id": idUsuario
    };

    if (estado === "VIGENTE") {
        
        let backendURL = sessionStorage.getItem("backendURL");
        let url = backendURL + "/" + "index.php/usuarios?deshabilitarUsuario=" + JSON.stringify(usuario);

        $.ajax({
            url: url,
            method: "PUT",
            success: function (respuesta) {

                if (respuesta === "El usuario fue deshabilitado de manera exitosa.") {
                    
                    let provisorioUsuariosVigentes = $("#usuariosVigentes").text();
                    let porvisorioUsuariosNoVigentes = $("#usuariosNoVigentes").text();
                    let usuariosVigentes = (parseInt(provisorioUsuariosVigentes) - 1);
                    let usuariosNoVigentes = (parseInt(porvisorioUsuariosNoVigentes) + 1);
                    $("#usuariosNoVigentes").text(usuariosNoVigentes); 
                    
                    if (usuariosVigentes < 1) {
                        
                        $("#usuariosVigentes").text(0); 
                        
                    } else {
                        
                        $("#usuariosVigentes").text(usuariosVigentes);                         
                    }

                    let div = "div" + x;
                    let boton = "#boton" + x;
                    let icon = "#icon" + x;
                    let p = "#p" + x;
                    document.getElementById(div).style.backgroundColor = "#f8d7da";
                    document.getElementById(div).style.color = "#842029";
                    $(boton).removeClass("btn-danger");
                    $(boton).addClass("btn-success");
                    $(icon).removeClass("fa-solid fa-user-large-slash");
                    $(icon).addClass("fa-solid fa-user-large");
                    $(p).text("NO VIGENTE");
                    let mensaje = respuesta;
                    $("#alertaVisual").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
                    $("#alertaVisual").addClass("show").removeClass("fade");
                    $("#mensajeAlertaVisual").text(mensaje);
                }
            }
        });        

    } else if (estado === "NO VIGENTE") {
        
        let backendURL = sessionStorage.getItem("backendURL");
        let url = backendURL + "/" + "index.php/usuarios?habilitarUsuario=" + JSON.stringify(usuario);

        $.ajax({
            url: url,
            method: "PUT",
            success: function (respuesta) {

                if (respuesta === "El usuario fue habilitado de manera exitosa.") {
                    
                    let provisorioUsuariosVigentes = $("#usuariosVigentes").text();
                    let porvisorioUsuariosNoVigentes = $("#usuariosNoVigentes").text();
                    let usuariosVigentes = (parseInt(provisorioUsuariosVigentes) + 1);
                    let usuariosNoVigentes = (parseInt(porvisorioUsuariosNoVigentes) - 1);
                    $("#usuariosVigentes").text(usuariosVigentes); 
                    
                    if (usuariosNoVigentes < 1) {
                        
                        $("#usuariosNoVigentes").text(0); 
                        
                    } else {
                        
                        $("#usuariosNoVigentes").text(usuariosNoVigentes);                         
                    }

                    let div = "div" + x;
                    let boton = "#boton" + x;
                    let icon = "#icon" + x;
                    let p = "#p" + x;
                    document.getElementById(div).style.backgroundColor = "#d1e7dd";
                    document.getElementById(div).style.color = "#0f5132";
                    $(boton).removeClass("btn-success");
                    $(boton).addClass("btn-danger");
                    $(icon).removeClass("fa-solid fa-user-large");
                    $(icon).addClass("fa-solid fa-user-large-slash");
                    $(p).text("VIGENTE");
                    let mensaje = respuesta;
                    $("#alertaVisual").addClass("alert-success").removeClass("alert-danger").removeClass("alert-warning");
                    $("#alertaVisual").addClass("show").removeClass("fade");
                    $("#mensajeAlertaVisual").text(mensaje);
                }
            }
        });
    }
}

function buscarSolicitud() {

    let numeroSolicitud = $("#numeroSolicitud").val();

    if (numeroSolicitud !== "" && numeroSolicitud !== "0" && numeroSolicitud !== "e" && numeroSolicitud !== "E") {

        let solicitudPersonaje = {
            "idSolicitud": numeroSolicitud
        };
        let backendURL = sessionStorage.getItem("backendURL");
        let url = backendURL + "/" + "index.php/personajes?obtenerSolicitud=" + JSON.stringify(solicitudPersonaje);

        $.ajax({
            url: url,
            method: "GET",
            success: function (provisoriaRespuesta) {
                
                console.log(provisoriaRespuesta);

                if (provisoriaRespuesta === "Esta solicitud no está registrada.") {

                    $("#numeroSolicitud").val("");
                    $("#numeroSolicitud").focus();
                    $("#mensajeAlertaVisual").text(provisoriaRespuesta);
                    $("#alertaVisual").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
                    $("#alertaVisual").addClass("show").removeClass("fade");

                } else {

                    let respuesta = JSON.parse(provisoriaRespuesta);
                    let plantilla = "";

                    if (respuesta[0].estado === "PENDIENTE") {

                        plantilla += `<div class="container form-control" id="div2${0 + 1}" style="background-color: #f8d7da; color: #842029;">`;
                        plantilla += `<span><i class="fa-solid fa-user-tag"></i>&nbsp;&nbsp;<b>Solicitud Numero: ${respuesta[0].idSolicitud}</b></span>`;
                        plantilla += `<p id="p2${0 + 1}">${respuesta[0].estado}</p>`;
                        plantilla += `<p>Fecha de la solicitud: <b>${respuesta[0].fecha}</b></p>`;
                        plantilla += `<p>Solicitud realizada por el jugador: <b>${respuesta[0].usuario}</b></p>`;
                        plantilla += `<p>Personaje solicitado: <b>${respuesta[0].personaje}</b></p>`;
                        plantilla += `<button class="btn btn-success" id="boton2${0 + 1}" onclick="aceptarSolicitud(${0 + 1}, ${respuesta[0].idSolicitud})" type="button"><i class="fa-regular fa-circle-check"></i></button>`;
                        plantilla += `</div>`;
                        plantilla += `<br>`;

                    } else {

                        plantilla += `<div class="container form-control" style="background-color: #d1e7dd; color: #0f5132;">`;
                        plantilla += `<span><i class="fa-solid fa-user-tag"></i>&nbsp;&nbsp;<b>Solicitud Numero: ${respuesta[0].idSolicitud}</b></span>`;
                        plantilla += `<p>${respuesta[0].estado}</p>`;
                        plantilla += `<p>Fecha de la solicitud: <b>${respuesta[0].fecha}</b></p>`;
                        plantilla += `<p>Solicitud realizada por el jugador: <b>${respuesta[0].usuario}</b></p>`;
                        plantilla += `<p>Personaje solicitado: <b>${respuesta[0].personaje}</b></p>`;
                        plantilla += `</div>`;
                        plantilla += `<br>`;
                    }

                    $("#contenedorSolicitudes").html(plantilla);
                    $("#numeroSolicitud").val("");
                    $("#numeroSolicitud").focus();
                }
            }
        });

    } else {

        $("#mensajeAlertaVisual").text("Debe escribir el numero de la solicitud para poder realizar esta acción.");
        $("#alertaVisual").addClass("alert-warning").removeClass("alert-success").removeClass("alert-danger");
        $("#alertaVisual").addClass("show").removeClass("fade");
        $("#nombreUsuario").focus();
    }
}

function obtenerSolicitudes() {
    
    let backendURL = sessionStorage.getItem("backendURL");
    let url = backendURL + "/" + "index.php/personajes?obtenerSolicitudes";

    $.ajax({
        url: url,
        method: "GET",
        success: function (provisoriaRespuesta) {

            let respuesta = JSON.parse(provisoriaRespuesta);           
            let solicitudesRealizadas = 0;
            let solicitudesPendientes = 0;
            let solicitudesTotales = 0;
            let plantilla = "";

            for (let i = 0; i < respuesta.length; i++) {
                
                if (respuesta[i].estado === "PENDIENTE") {
                    
                    plantilla += `<div class="container form-control" id="div2${i + 1}" style="background-color: #f8d7da; color: #842029;">`;
                    plantilla += `<span><i class="fa-solid fa-user-tag"></i>&nbsp;&nbsp;<b>Solicitud Numero: ${respuesta[i].idSolicitud}</b></span>`;
                    plantilla += `<p id="p2${i + 1}">${respuesta[i].estado}</p>`;
                    plantilla += `<p>Fecha de la solicitud: <b>${respuesta[i].fecha}</b></p>`;
                    plantilla += `<p>Solicitud realizada por el jugador: <b>${respuesta[i].usuario}</b></p>`;
                    plantilla += `<p>Personaje solicitado: <b>${respuesta[i].personaje}</b></p>`;
                    plantilla += `<button class="btn btn-success" id="boton2${i + 1}" onclick="aceptarSolicitud(${i + 1}, ${respuesta[i].idSolicitud})" type="button"><i class="fa-regular fa-circle-check"></i></button>`;
                    plantilla += `</div>`;
                    plantilla += `<br>`;
                    solicitudesPendientes++;

                } else {
                    
                    plantilla += `<div class="container form-control" style="background-color: #d1e7dd; color: #0f5132;">`;
                    plantilla += `<span><i class="fa-solid fa-user-tag"></i>&nbsp;&nbsp;<b>Solicitud Numero: ${respuesta[i].idSolicitud}</b></span>`;
                    plantilla += `<p>${respuesta[i].estado}</p>`;
                    plantilla += `<p>Fecha de la solicitud: <b>${respuesta[i].fecha}</b></p>`;
                    plantilla += `<p>Solicitud realizada por el jugador: <b>${respuesta[i].usuario}</b></p>`;
                    plantilla += `<p>Personaje solicitado: <b>${respuesta[i].personaje}</b></p>`;
                    plantilla += `</div>`;
                    plantilla += `<br>`;                  
                    solicitudesRealizadas++;
                }
                
                solicitudesTotales = (solicitudesRealizadas + solicitudesPendientes); 
                $("#solicitudesRealizadas").text(" " + solicitudesRealizadas);
                $("#solicitudesPendientes").text(" " + solicitudesPendientes);
                $("#solicitudesTotales").text(" " + solicitudesTotales); 
            }

            $("#contenedorSolicitudes").html(plantilla);
            $("#numeroSolicitud").val("");
            $("#numeroSolicitud").focus();
        }
    });
}

function aceptarSolicitud(x, y) {

    let aceptarSolicitud = {
        "idSolicitud": y
    };
    let backendURL = sessionStorage.getItem("backendURL");
    let url = backendURL + "/" + "index.php/personajes?aceptarSolicitud=" + JSON.stringify(aceptarSolicitud);

    $.ajax({
        url: url,
        method: "PUT",
        success: function (respuesta) {
            
            console.log(respuesta);

            if (respuesta === "Solicitud aceptada y registrada de manera exitosa.") {

                let provisorioSolicitudesRealizadas = $("#solicitudesRealizadas").text();
                let porvisorioSolicitudesPendientes = $("#solicitudesPendientes").text();
                let solicitudesRealizadas = (parseInt(provisorioSolicitudesRealizadas) + 1);
                let solicitudesPendientes = (parseInt(porvisorioSolicitudesPendientes) - 1);
                $("#solicitudesRealizadas").text(solicitudesRealizadas);

                if (solicitudesPendientes < 1) {

                    $("#solicitudesPendientes").text(0);

                } else {

                    $("#solicitudesPendientes").text(solicitudesPendientes);
                }

                let div = "div2" + x;
                let p = "#p2" + x;
                let boton = "boton2" + x;
                let boton2 = "#boton2" + x;
                document.getElementById(div).style.backgroundColor = "#d1e7dd";
                document.getElementById(div).style.color = "#0f5132";
                $(p).text("REALIZADA");
                $(boton2).removeClass("btn-success");
                $(boton2).addClass("btn-outline-success");
                document.getElementById(boton).setAttribute("disabled", true)
                

                let mensaje = respuesta;
                $("#alertaVisual").addClass("alert-success").removeClass("alert-danger").removeClass("alert-warning");
                $("#alertaVisual").addClass("show").removeClass("fade");
                $("#mensajeAlertaVisual").text(mensaje);
            }
        }
    });
}
