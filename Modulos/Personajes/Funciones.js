$(document).ready(function () {
    
    validarInicioSesion();
});

function validarInicioSesion() {
    
    $("#panelMensajeCarga").modal("show");
    
    if (sessionStorage.getItem("idUsuario") === null) {        
        
        irPaginaInicio();
        
    } else {
        
        mostrarSaludoInicial();
        obtenerPersonajes();
    }   
}

function mostrarSaludoInicial() {
    
    let mensaje = "Bienvenido " + sessionStorage.getItem("nombreUsuario");
    $("#contenedorAlertaVisual").addClass("alert-success").removeClass("alert-danger").removeClass("alert-warning");
    $("#contenedorAlertaVisual").addClass("show").removeClass("fade");
    $("#mensajeAlertaVisual").text(mensaje);
    $("#nombreUsuario").text(" " + sessionStorage.getItem("nombreUsuario"));
}

function obtenerPersonajes() {
    
    let backendURL = sessionStorage.getItem("backendURL");
    let url = backendURL + "/" + "index.php/personajes?obtenerPersonajes1";

    $.ajax({
        url: url,
        method: "GET",
        success: function (provisoriaRespuestaExterior) {
            
            let respuesta = JSON.parse(provisoriaRespuestaExterior);
            let plantilla = "";

            for (let i = 0; i < respuesta.length; i++) {

                let aleatorioColor = Math.ceil(Math.random() * 6);
                let color;

                if (aleatorioColor === 1) {

                    color = "Amarillo";

                } else if (aleatorioColor === 2) {

                    color = "Azul";

                } else if (aleatorioColor === 3) {

                    color = "Morado";

                } else if (aleatorioColor === 4) {

                    color = "Naranjo";

                } else if (aleatorioColor === 5) {

                    color = "Rojo";

                } else if (aleatorioColor === 6) {

                    color = "Verde";
                }

                plantilla += `<div class="container form-control">`;
                plantilla += `<div class="row">`; 
                plantilla += `<div class="col">`;
                plantilla += `<h5><b>${respuesta[i].nombre}</b></h5>`;
                plantilla += `<h6><b>Categoría:</b> ${respuesta[i].categoria}</h6>`;
                plantilla += `<img height="210" style="border-style: solid; border-radius: 5px; border-width: 1px;" src="../../Imagenes/Personajes/Retratos/${respuesta[i].categoria}/${color}.png" width="156">`;
                plantilla += `</div>`;
                plantilla += `<div class="col">`;
                plantilla += `<h6 style="text-align: center;"><b>ATRIBUTOS</b></h6>`;
                plantilla += `<ul style="list-style-type: none;">`;
                plantilla += `<li><b>Alcance:</b> ${respuesta[i].alcance}</li>`;
                plantilla += `<li><b>Armadura:</b> ${respuesta[i].armadura}</li>`;
                plantilla += `<li><b>Ataque:</b> ${respuesta[i].ataque}</li>`;
                plantilla += `<li><b>Daño:</b> ${respuesta[i].dano}</li>`;
                plantilla += `<li><b>Defensa:</b> ${respuesta[i].defensa}</li>`;
                plantilla += `<li><b>Iniciativa:</b> ${respuesta[i].iniciativa}</li>`;
                plantilla += `<li><b>Movimiento:</b> ${respuesta[i].movimiento}</li>`;
                plantilla += `<li><b>Salud:</b> ${respuesta[i].salud}</li></ul>`;
                plantilla += `</div>`;
                plantilla += `<div class="col">`;
                plantilla += `<h6 style="text-align: center;"><b>HABILIDADES</b></h6>`;
                plantilla += `<h6><b>Habilidad:</b> ${respuesta[i].nombreHabilidad}</h6>`;
                plantilla += `<img height="60" style="border-style: solid; border-radius: 5px; border-width: 1px;" src="../../Imagenes/Habilidades/${respuesta[i].nombreHabilidad}.png" width="108">`;
                plantilla += `<p><b>Alcance:</b> ${respuesta[i].alcanceHabilidad}</p>`;
                plantilla += `<p><b>Descripción:</b> ${respuesta[i].descripcionHabilidad}</p>`;
                plantilla += `<button class="btn btn-success" onclick="adquerirPersonaje(${respuesta[i].id})" type="button"><i class="fa-solid fa-user-plus"></i></button>`;
                plantilla += `</div>`;                
                plantilla += `</div>`;
                plantilla += `</div>`;
                plantilla += `<br>`;                
            }

            $("#contenedorPersonajes").html(plantilla);
            setTimeout(function () {

                $("#panelMensajeCarga").modal("hide");
            }, 1000);
        }
    });
}

function adquerirPersonaje(idPersonaje) {
    
    let solicitudPersonaje = {
        "idUsuario": sessionStorage.getItem("idUsuario"),
        "idPersonaje": idPersonaje
    }    
    let backendURL = sessionStorage.getItem("backendURL");
    let url = backendURL + "/" + "index.php/personajes?solicitudPersonaje=" + JSON.stringify(solicitudPersonaje);

    $.ajax({
        url: url,
        method: "POST",
        success: function (respuesta) {
            
            console.log(respuesta);

            if (respuesta === "El jugador ya tiene este personaje.") {
                
                let mensaje = respuesta;
                $("#alertaVisual").addClass("alert-warning").removeClass("alert-danger").removeClass("alert-success");
                $("#alertaVisual").addClass("show").removeClass("fade");
                $("#mensajeAlertaVisual").text(mensaje);

            } else {
                
                let mensaje = respuesta;
                $("#alertaVisual").addClass("alert-success").removeClass("alert-danger").removeClass("alert-warning");
                $("#alertaVisual").addClass("show").removeClass("fade");
                $("#mensajeAlertaVisual").text(mensaje);                
            }
        }
    });
}
