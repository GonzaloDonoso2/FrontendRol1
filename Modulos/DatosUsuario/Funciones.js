$(document).ready(function () {
    
    validarInicioSesion();
});

function validarInicioSesion() {
    
    $("#panelMensajeCarga").modal("show");
    
    if (sessionStorage.getItem("idUsuario") === null) {        
        
        irPaginaInicio();
        
    } else {
        
        obtenerUsuario();
        buscarDesafios();
    }   
}

function obtenerUsuario() { 

    let id = {
        
        "id": sessionStorage.getItem("idUsuario")
    };
    let backendURL = sessionStorage.getItem("backendURL");      
    let url = backendURL + "/" + "index.php/usuarios?id=" + JSON.stringify(id);

    $.ajax({
        url: url,
        method: "GET",
        success: function (respuesta) {  

            let listaUsuarios = JSON.parse(respuesta);
            $("#nombre").val(listaUsuarios[0].nombre);
            $("#correoElectronico").val(listaUsuarios[0].correoElectronico);
            $("#contrasena1").val(listaUsuarios[0].contrasena);
            setTimeout(function () {

                $("#panelMensajeCarga").modal("hide");
            }, 1500);
        }
    });
}

function habilitarVerificador(x) {

    if (x === "NOMBRE") {

        $("#nombre").removeAttr("readonly");
        $("#botonBuscar1").removeAttr("disabled");        
        $("#botonBuscar1").addClass("btn-secondary").removeClass("btn-outline-secondary");
        $("#botonEditar1").addClass("btn-outline-primary").removeClass("btn-primary");
        document.getElementById("botonEditar1").setAttribute("disabled", true);

    } else if (x === "CORREO ELECTRONICO") {

        $("#correoElectronico").removeAttr("readonly");
        $("#botonBuscar2").removeAttr("disabled");
        $("#botonBuscar2").addClass("btn-secondary").removeClass("btn-outline-secondary");
        $("#botonEditar2").addClass("btn-outline-primary").removeClass("btn-primary");
        $("#botonBuscar2").addClass("btn-secondary").removeClass("btn-outline-secondary");
        document.getElementById("botonEditar2").setAttribute("disabled", true);

    } else if (x === "CONTRASENA") {

        $("#contrasena1").removeAttr("readonly");
        $("#contrasena2").removeAttr("readonly");
        $("#botonRegistrar3").removeAttr("disabled");
        $("#botonEditar3").addClass("btn-outline-primary").removeClass("btn-primary");
        $("#botonRegistrar3").addClass("btn-success").removeClass("btn-outline-success");
        document.getElementById("botonEditar3").setAttribute("disabled", true);
    }
}

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
            let url = backendURL + "/" + "index.php/usuarios?nombreUsuario2=" + JSON.stringify(nombreUsuario);

            $.ajax({

                url: url,
                method: "GET",
                success: function (respuesta) {
                    
                    if (respuesta === "Este nombre no está registrado.") {

                        mensaje = respuesta;
                        $("#alertaVisual").addClass("alert-success").removeClass("alert-danger").removeClass("alert-warning");
                        $("#alertaVisual").addClass("show").removeClass("fade");
                        $("#mensajeAlertaVisual").text(mensaje);
                        $("#botonRegistrar1").removeAttr("disabled");
                        $("#botonRegistrar1").addClass("btn-success").removeClass("btn-outline-success");
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
            let url = backendURL + "/" + "index.php/usuarios?correoElectronicoUsuario2=" + JSON.stringify(correoElectronicoUsuario);

            $.ajax({

                url: url,
                method: "GET",
                success: function (respuesta) {
                    
                    console.log(respuesta);
                    
                    if (respuesta === "Este correo electrónico no está registrado.") {

                        mensaje = respuesta;
                        $("#alertaVisual").addClass("alert-success").removeClass("alert-danger").removeClass("alert-warning");
                        $("#alertaVisual").addClass("show").removeClass("fade");
                        $("#mensajeAlertaVisual").text(mensaje);
                        $("#botonRegistrar2").removeAttr("disabled");
                        $("#botonRegistrar2").addClass("btn-success").removeClass("btn-outline-success");
                        $("#botonBuscar2").addClass("btn-outline-secondary").removeClass("btn-secondary");
                        document.getElementById("correoElectronico").setAttribute("readonly", true);
                        document.getElementById("botonBuscar1").setAttribute("disabled", true);                        

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

function registrarNombreCorreoElectronicoContrasena(x) {
    
    if (x === "NOMBRE") {
        
        let nombre = $("#nombre").val();  
        let nombreUsuario = {
            "id": sessionStorage.getItem("idUsuario"),
            "nombre": nombre
        };
        let backendURL = sessionStorage.getItem("backendURL");
        let url = backendURL + "/" + "index.php/usuarios?nombreUsuario=" + JSON.stringify(nombreUsuario);
        let mensaje = "";

        $.ajax({

            url: url,
            method: "PUT",
            success: function (respuesta) {

                if (respuesta === "El nombre del usuario fue editado de manera exitosa.") {

                    mensaje = respuesta;
                    $("#alertaVisual").addClass("alert-success").removeClass("alert-danger").removeClass("alert-warning");
                    $("#alertaVisual").addClass("show").removeClass("fade");
                    $("#mensajeAlertaVisual").text(mensaje);
                    $("#botonEditar1").removeAttr("disabled");
                    $("#botonEditar1").addClass("btn-primary").removeClass("btn-outline-primary");
                    $("#botonBuscar1").addClass("btn-outline-secondary").removeClass("btn-secondary");
                    $("#botonRegistrar1").addClass("btn-outline-success").removeClass("btn-success");
                    document.getElementById("nombre").setAttribute("readonly", true);
                    document.getElementById("botonBuscar1").setAttribute("disabled", true);  
                    document.getElementById("botonRegistrar1").setAttribute("disabled", true);  

                } else {

                    mensaje = "El nombre del usuario no pudo ser registrado.";
                    $("#alertaVisual").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
                    $("#alertaVisual").addClass("show").removeClass("fade");
                    $("#mensajeAlertaVisual").text(mensaje);
                    $("#botonEditar1").removeAttr("disabled");
                    $("#botonEditar1").addClass("btn-primary").removeClass("btn-outline-primary");
                    $("#botonBuscar1").addClass("btn-outline-secondary").removeClass("btn-secondary");
                    $("#botonRegistrar1").addClass("btn-outline-success").removeClass("btn-success");
                    document.getElementById("nombre").setAttribute("readonly", true);
                    document.getElementById("botonBuscar1").setAttribute("disabled", true);  
                    document.getElementById("botonRegistrar1").setAttribute("disabled", true); 
                }
            }
        });
        
    } else if (x === "CORREO ELECTRONICO") {
        
        let correoElectronico = $("#correoElectronico").val();  
        let correoElectronicoUsuario = {
            "id": sessionStorage.getItem("idUsuario"),
            "correoElectronico": correoElectronico
        };
        let backendURL = sessionStorage.getItem("backendURL");
        let url = backendURL + "/" + "index.php/usuarios?correoElectronicoUsuario=" + JSON.stringify(correoElectronicoUsuario);
        let mensaje = "";

        $.ajax({

            url: url,
            method: "PUT",
            success: function (respuesta) {

                if (respuesta === "El correo electrónico del usuario fue editado de manera exitosa.") {

                    mensaje = respuesta;
                    $("#alertaVisual").addClass("alert-success").removeClass("alert-danger").removeClass("alert-warning");
                    $("#alertaVisual").addClass("show").removeClass("fade");
                    $("#mensajeAlertaVisual").text(mensaje);
                    $("#botonEditar2").removeAttr("disabled");
                    $("#botonEditar2").addClass("btn-primary").removeClass("btn-outline-primary");
                    $("#botonBuscar2").addClass("btn-outline-secondary").removeClass("btn-secondary");
                    $("#botonRegistrar2").addClass("btn-outline-success").removeClass("btn-success");
                    document.getElementById("correoElectronico").setAttribute("readonly", true);
                    document.getElementById("botonBuscar2").setAttribute("disabled", true);  
                    document.getElementById("botonRegistrar2").setAttribute("disabled", true);  

                } else {

                    mensaje = "El nombre del usuario no pudo ser registrado.";
                    $("#alertaVisual").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
                    $("#alertaVisual").addClass("show").removeClass("fade");
                    $("#mensajeAlertaVisual").text(mensaje);
                    $("#botonEditar2").removeAttr("disabled");
                    $("#botonEditar2").addClass("btn-primary").removeClass("btn-outline-primary");
                    $("#botonBuscar2").addClass("btn-outline-secondary").removeClass("btn-secondary");
                    $("#botonRegistrar2").addClass("btn-outline-success").removeClass("btn-success");
                    document.getElementById("correoElectronico").setAttribute("readonly", true);
                    document.getElementById("botonBuscar2").setAttribute("disabled", true);  
                    document.getElementById("botonRegistrar2").setAttribute("disabled", true); 
                }
            }
        });

    }  else if (x === "CONTRASENA") {
        
        let contrasena1 = $("#contrasena1").val();
        let contrasena2 = $("#contrasena2").val();
        let mensaje = "";

        if (contrasena1 === "" || contrasena2 === "") {

            mensaje = "Debe ingresar su contraseña y confirmarla para poder realizar esta acción.";
            $("#alertaVisual").addClass("alert-warning").removeClass("alert-danger").removeClass("alert-success");
            $("#alertaVisual").addClass("show").removeClass("fade");
            $("#mensajeAlertaVisual").text(mensaje);
            $("#contrasena1").focus();

        } else if (contrasena1 !== contrasena2)  {
            
            mensaje = "Su contraseña no coincide con la confirmación.";
            $("#alertaVisual").addClass("alert-warning").removeClass("alert-danger").removeClass("alert-success");
            $("#alertaVisual").addClass("show").removeClass("fade");
            $("#mensajeAlertaVisual").text(mensaje);
            $("#contrasena1").focus();
            $("#contrasena1").val("");
            $("#contrasena2").val("");
            
        } else {  

            let contrasenaUsuario = {
                
                "id": sessionStorage.getItem("idUsuario"), 
                "contrasena": contrasena1
            };
            let backendURL = sessionStorage.getItem("backendURL");
            let url = backendURL + "/" + "index.php/usuarios?contrasenaUsuario=" + JSON.stringify(contrasenaUsuario);

            $.ajax({

                url: url,
                method: "PUT",
                success: function (respuesta) {
                    
                    if (respuesta === "La contraseña del usuario fue editada de manera exitosa.") {

                        mensaje = respuesta;
                        $("#alertaVisual").addClass("alert-success").removeClass("alert-danger").removeClass("alert-warning");
                        $("#alertaVisual").addClass("show").removeClass("fade");
                        $("#mensajeAlertaVisual").text(mensaje);
                        $("#contrasena2").val("");
                        $("#botonEditar3").removeAttr("disabled");
                        $("#botonEditar3").addClass("btn-primary").removeClass("btn-outline-primary");;
                        $("#botonRegistrar3").addClass("btn-outline-success").removeClass("btn-success");
                        document.getElementById("contrasena1").setAttribute("readonly", true);
                        document.getElementById("contrasena2").setAttribute("readonly", true);
                        document.getElementById("botonRegistrar3").setAttribute("disabled", true);                        

                    } else {

                        mensaje = respuesta;
                        $("#alertaVisual").addClass("alert-warning").removeClass("alert-danger").removeClass("alert-success");
                        $("#alertaVisual").addClass("show").removeClass("fade");
                        $("#mensajeAlertaVisual").text(mensaje);
                        $("#contrasena2").val("");
                        $("#botonEditar3").removeAttr("disabled");
                        $("#botonEditar3").addClass("btn-primary").removeClass("btn-outline-primary");;
                        $("#botonRegistrar3").addClass("btn-outline-success").removeClass("btn-success");
                        document.getElementById("contrasena1").setAttribute("readonly", true);
                        document.getElementById("contrasena2").setAttribute("readonly", true);
                        document.getElementById("botonRegistrar3").setAttribute("disabled", true);       
                    }
                }
            });
        }        
    }
}

function cancelar() {
    
    $("#nombre").val("");    
    $("#correoElectronico").val("");
    $("#contrasena1").val("");
    $("#contrasena2").val("");
    $("#botonEditar1").removeAttr("disabled");
    $("#botonEditar2").removeAttr("disabled");
    $("#botonEditar3").removeAttr("disabled");
    $("#botonEditar1").addClass("btn-primary").removeClass("btn-outline-primary");
    $("#botonEditar2").addClass("btn-primary").removeClass("btn-outline-primary");
    $("#botonEditar3").addClass("btn-primary").removeClass("btn-outline-primary");
    $("#botonBuscar1").addClass("btn-outline-secondary").removeClass("btn-secondary");
    $("#botonBuscar2").addClass("btn-outline-secondary").removeClass("btn-secondary");
    $("#botonRegistrar1").addClass("btn-outline-success").removeClass("btn-success");
    $("#botonRegistrar2").addClass("btn-outline-success").removeClass("btn-success");
    $("#botonRegistrar3").addClass("btn-outline-success").removeClass("btn-success");
    document.getElementById("nombre").setAttribute("readonly", true);
    document.getElementById("correoElectronico").setAttribute("readonly", true);
    document.getElementById("contrasena1").setAttribute("readonly", true);
    document.getElementById("contrasena2").setAttribute("readonly", true);
    document.getElementById("botonBuscar1").setAttribute("disabled", true);
    document.getElementById("botonBuscar2").setAttribute("disabled", true); 
    document.getElementById("botonRegistrar1").setAttribute("disabled", true); 
    document.getElementById("botonRegistrar2").setAttribute("disabled", true); 
    document.getElementById("botonRegistrar3").setAttribute("disabled", true);
    obtenerUsuario();
}

function buscarDesafios() {

    function buscar() { 
        
        let usuario = {

            "idUsuario": sessionStorage.getItem("idUsuario")
        };
        let backendURL = sessionStorage.getItem("backendURL");
        let url = backendURL + "/" + "index.php/desafios?usuario=" + JSON.stringify(usuario);

        $.ajax({
            url: url,
            method: "GET",
            success: function (provisoriaRespuesta) {

                if (provisoriaRespuesta !== "Sin desafios vigentes.") {

                    clearInterval(idFuncionRepetitiva);
                    let respuesta = JSON.parse(provisoriaRespuesta);
                    let mensaje = "El " + respuesta[0].fecha + " fue desafiado por el usuario " + respuesta[0].nombreUsuario1 + " a una batalla, vuelva a la página principal para aceptar el desafío o el desafío será rechazado.";
                    $("#alertaVisual").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
                    $("#alertaVisual").addClass("show").removeClass("fade");
                    $("#mensajeAlertaVisual").text(mensaje);
                }
            }
        });
    }

    idFuncionRepetitiva = setInterval(buscar, 3000);
}