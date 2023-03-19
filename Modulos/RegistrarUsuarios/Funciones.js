$(document).ready(function () {

    $("#nombre").focus();
});     

function verificarNombreCorreoElectronico(x) {

    if (x === "NOMBRE") {

        nombre = $("#nombre").val();
        let mensaje = "";

        if (nombre === "") {

            mensaje = "Debe ingresar su nombre para poder realizar esta acción.";
            $("#alertaVisual").addClass("alert-warning").removeClass("alert-danger").removeClass("alert-success");
            $("#alertaVisual").addClass("show").removeClass("fade");
            $("#mensajeAlertaVisual").text(mensaje);
            $("#nombre").focus();

        } else {

            let nombreUsuario = {
                
                "id": sessionStorage.getItem("idUsuario"), 
                "nombre": nombre
            };
            let backendURL = sessionStorage.getItem("backendURL");
            let url = backendURL + "/" + "index.php/usuarios?nombreUsuario1=" + JSON.stringify(nombreUsuario);

            $.ajax({

                url: url,
                method: "GET",
                success: function (respuesta) {
                    
                    if (respuesta === "Este nombre no está registrado.") {

                        mensaje = respuesta;
                        $("#alertaVisual").addClass("alert-success").removeClass("alert-danger").removeClass("alert-warning");
                        $("#alertaVisual").addClass("show").removeClass("fade");
                        $("#mensajeAlertaVisual").text(mensaje);
                        $("#correoElectronico").focus();
                        $("#correoElectronico").removeAttr("readonly");
                        $("#botonBuscar2").removeAttr("disabled");
                        $("#botonBuscar2").addClass("btn-secondary").removeClass("btn-outline-secondary");
                        $("#botonBuscar1").addClass("btn-outline-secondary").removeClass("btn-secondary");
                        document.getElementById("nombre").setAttribute("readonly", true);
                        document.getElementById("botonBuscar1").setAttribute("disabled", true);                        

                    } else {

                        mensaje = respuesta;
                        $("#alertaVisual").addClass("alert-warning").removeClass("alert-danger").removeClass("alert-success");
                        $("#alertaVisual").addClass("show").removeClass("fade");
                        $("#mensajeAlertaVisual").text(mensaje);
                        $("#nombre").focus();
                        $("#nombre").val("");
                    }
                }
            });
        }

    } else if (x === "CORREO ELECTRONICO") {

        correoElectronico = $("#correoElectronico").val();
        let mensaje = "";

        if (correoElectronico === "") {

            mensaje = "Debe ingresar su correo electrónico para poder realizar esta acción.";
            $("#alertaVisual").addClass("alert-warning").removeClass("alert-danger").removeClass("alert-success");
            $("#alertaVisual").addClass("show").removeClass("fade");
            $("#mensajeAlertaVisual").text(mensaje);
            $("#correoElectronico").focus();

        } else {

            let correoElectronicoUsuario = {
                
                "id": sessionStorage.getItem("idUsuario"), 
                "correoElectronico": correoElectronico
            };
            let backendURL = sessionStorage.getItem("backendURL");
            let url = backendURL + "/" + "index.php/usuarios?correoElectronicoUsuario1=" + JSON.stringify(correoElectronicoUsuario);

            $.ajax({

                url: url,
                method: "GET",
                success: function (respuesta) {
                    
                    if (respuesta === "Este correo electrónico no está registrado.") {

                        mensaje = respuesta;
                        $("#alertaVisual").addClass("alert-success").removeClass("alert-danger").removeClass("alert-warning");
                        $("#alertaVisual").addClass("show").removeClass("fade");
                        $("#mensajeAlertaVisual").text(mensaje);
                        $("#contrasena1").focus();
                        $("#contrasena1").removeAttr("readonly");
                        $("#contrasena2").removeAttr("readonly");
                        $("#botonRegistrar").removeAttr("disabled");
                        $("#botonRegistrar").addClass("btn-success").removeClass("btn-outline-success");
                        $("#botonBuscar2").addClass("btn-outline-secondary").removeClass("btn-secondary");
                        document.getElementById("correoElectronico").setAttribute("readonly", true);
                        document.getElementById("botonBuscar2").setAttribute("disabled", true);                       

                    } else {

                        mensaje = respuesta;
                        $("#alertaVisual").addClass("alert-warning").removeClass("alert-danger").removeClass("alert-success");
                        $("#alertaVisual").addClass("show").removeClass("fade");
                        $("#mensajeAlertaVisual").text(mensaje);
                        $("#correo electrónico").focus();
                        $("#correo electrónico").val("");
                    }
                }
            });
        }        
    }
}

function registrarUsuario() {
    
    let contrasena1 = $("#contrasena1").val();
    let contrasena2 = $("#contrasena2").val();
    let mensaje = "";

    if (contrasena1 === "" || contrasena2 === "") {

        mensaje = "Debe ingresar su contraseña y confirmarla para poder realizar esta acción.";
        $("#alertaVisual").addClass("alert-warning").removeClass("alert-danger").removeClass("alert-success");
        $("#alertaVisual").addClass("show").removeClass("fade");
        $("#mensajeAlertaVisual").text(mensaje);
        $("#contrasena1").focus();

    } else if (contrasena1 !== contrasena2) {

        mensaje = "Su contraseña no coincide con la confirmación.";
        $("#alertaVisual").addClass("alert-warning").removeClass("alert-danger").removeClass("alert-success");
        $("#alertaVisual").addClass("show").removeClass("fade");
        $("#mensajeAlertaVisual").text(mensaje);
        $("#contrasena1").focus();
        $("#contrasena1").val("");
        $("#contrasena2").val("");

    } else {
        
        let nombre = $("#nombre").val();
        let correoElectronico = $("#correoElectronico").val();
        let usuario = {
            
            "nombre": nombre,
            "correoElectronico": correoElectronico,
            "contrasena": contrasena1
        };
        let backendURL = sessionStorage.getItem("backendURL");
        let url = backendURL + "/" + "index.php/usuarios?usuario=" + JSON.stringify(usuario);

        $.ajax({

            url: url,
            method: "POST",
            success: function (respuesta) {
                
                console.log(respuesta);

                if (respuesta === "El usuario fue registrado de manera exitosa.") {

                    mensaje = respuesta;
                    $("#alertaVisual").addClass("alert-success").removeClass("alert-danger").removeClass("alert-warning");
                    $("#alertaVisual").addClass("show").removeClass("fade");
                    $("#mensajeAlertaVisual").text(mensaje);
                    setTimeout(function () {

                        irPaginaInicio();
                    }, 1000);

                } else {

                    mensaje = "Ocurrió un error al intentar realizar esta acción.";
                    $("#alertaVisual").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
                    $("#alertaVisual").addClass("show").removeClass("fade");
                    $("#mensajeAlertaVisual").text(mensaje);
                }
            }
        });
    }
}

function cancelar() {
    
    $("#nombre").focus();
    $("#nombre").val("");    
    $("#correoElectronico").val("");
    $("#contrasena1").val("");
    $("#contrasena2").val("");
    $("#nombre").removeAttr("readonly");
    $("#botonBuscar1").removeAttr("disabled");
    $("#botonBuscar1").addClass("btn-secondary").removeClass("btn-outline-secondary");
    $("#botonBuscar2").addClass("btn-outline-secondary").removeClass("btn-secondary");
    $("#botonRegistrar").addClass("btn-outline-success").removeClass("btn-success");
    document.getElementById("correoElectronico").setAttribute("readonly", true);
    document.getElementById("contrasena1").setAttribute("readonly", true);
    document.getElementById("contrasena2").setAttribute("readonly", true);
    document.getElementById("botonBuscar2").setAttribute("disabled", true);
    document.getElementById("botonRegistrar").setAttribute("disabled", true);
}
