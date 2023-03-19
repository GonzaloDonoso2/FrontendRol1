function ocultarAlertaVisual() {

    $("#alertaVisual").addClass("fade").removeClass("show");
}

function irPaginaIniciarSesion() {
    
    $("#panelMensajeCarga").modal("show");
    let frontendURL = sessionStorage.getItem("frontendURL");
    setTimeout(function () {
        
        $("#panelMensajeCarga").modal("hide"); 
    }, 1000);
    setTimeout(function () {
             
        location.href = frontendURL + "/" + "Modulos/IniciarSesion/Pagina.php";
    }, 1500); 
}

function irPaginaInicio() {
    
    $("#panelMensajeCarga").modal("show");
    let frontendURL = sessionStorage.getItem("frontendURL");
    setTimeout(function () {
        
        $("#panelMensajeCarga").modal("hide"); 
    }, 1000);
    setTimeout(function () {
             
        location.href = frontendURL + "/" + "index.php";     
    }, 1500); 
}

function irPagina(modulo) {
    
    $("#panelMensajeCarga").modal("show");
    let frontendURL = sessionStorage.getItem("frontendURL");
    setTimeout(function () {
        
        $("#panelMensajeCarga").modal("hide"); 
    }, 1000);
    setTimeout(function () {
        
        location.href = frontendURL + "/" + "Modulos/" + modulo + "/Pagina.php";
    }, 1500);    
}

function terminarSesion() {
    
    $("#panelMensajeCarga").modal("show");
    let frontendURL = sessionStorage.getItem("frontendURL");
    setTimeout(function () {

        sessionStorage.removeItem("idUsuario");
        sessionStorage.removeItem("nombreUsuario");
        $("#panelMensajeCarga").modal("hide");
    }, 1000);
    setTimeout(function () {

        location.href = frontendURL + "/" + "index.php";
    }, 1500);
}


