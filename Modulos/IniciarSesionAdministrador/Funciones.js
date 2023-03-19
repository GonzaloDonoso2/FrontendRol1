function iniciarSesion() {

    let correoElectronico = $("#correoElectronico").val();
    let contrasena = $("#contrasena").val();
    let mensaje = "Debe ingresar su correo electrónico y contraseña para poder realizar esta acción.";

    if (correoElectronico === "" | contrasena === "") {
        
        $("#alertaVisual").addClass("alert-warning").removeClass("alert-danger").removeClass("alert-success");
        $("#alertaVisual").addClass("show").removeClass("fade");
        $("#mensajeAlertaVisual").text(mensaje);
        $("#correoElectronico").focus();       

    } else {
        
        let inicioSesion2 = {
            "correoElectronico": correoElectronico,
            "contrasena": contrasena
        };        
        let backendURL = sessionStorage.getItem("backendURL");         
        let url = backendURL + "/" + "index.php/usuarios?inicioSesion2=" + JSON.stringify(inicioSesion2); 

        $.ajax({   
                      
            url: url,
            method: "GET",
            success: function (provisoriaRespuesta) {
                
                console.log(provisoriaRespuesta);
                
                if (provisoriaRespuesta !== "Este usuario no está registrado.") {
                    
                    let respuesta = JSON.parse(provisoriaRespuesta);
                    sessionStorage.setItem("idUsuario", respuesta[0].id);
                    sessionStorage.setItem("nombreUsuario", respuesta[0].nombre);
                    irPagina("PrincipalAdministrador");

                } else {   
                    
                    $("#alertaVisual").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");                    
                    $("#alertaVisual").addClass("show").removeClass("fade");
                    $("#mensajeAlertaVisual").text("Su correo electrónico o contraseña no están registrados.");
                    $("#correoElectronicoUsuario").focus();
                    $("#correoElectronicoUsuario").val("");
                    $("#contrasenaUsuario").val("");
                }
            }
        });
    }
}


