<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Perro Negro sitio web</title>
        <!--Estos <links> contienen la CDN de Bootstrap que dan estilo e iconos a la página web.-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
        <!--Este <script></script> contienen la CDN de Font Awesome que dan iconos a la página web.-->
        <script src="https://kit.fontawesome.com/06c09b3cfb.js" crossorigin="anonymous"></script>
    </head>
    <body>        
        <nav class="navbar navbar-expand-lg navbar-dark" style="background-color:#6B6B6B;">
            <!--Este <div></div> contiene el menú de opciones.-->         
            <div class="container-fluid">
                <img height="50px" src="../../Imagenes/LogotipoEmpresa.png" width="50px">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page">Perro Negro sitio web</a>
                        </li>
                        <li class="nav-item">
                            <a class="btn nav-link active" aria-current="page" onclick="irPagina('Principal')">Volver Página Principal</a>
                        </li> 
                    </ul>
                </div>
                <a class="btn nav-link" aria-current="page" onclick="terminarSesion()" style="color: #842029;"><b>Terminar Sesión</b></a>
            </div>
        </nav>
        <main>
            <!--Este <div></div> el panel con el mensaje de carga para el jugador.-->
            <div class="modal fade" id="panelMensajeCarga" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header" style="background-color: #fff3cd; color: #664d03; justify-content: center;">
                            <h5 class="modal-title"><b>Espere por favor...</b></h5>                   
                        </div>
                        <div class="modal-body">
                            <div class="d-flex justify-content-center">
                                <div class="spinner-border text-warning" style="width: 6rem; height: 6rem;" role="status">
                                    <span class="sr-only">Espere por favor...</span>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>    
            <!--Este <div></div> contiene la alerta visual.-->
            <div class="alert alert-warning alert-dismissible fade" id="alertaVisual" role="alert">
                <p><b id="mensajeAlertaVisual"></b></p>
                <button aria-label="Close" class="btn-close" id="botonOcultarAlertaVisual" type="button"></button>                
            </div>            
            <!--Este <div></div> contiene el formulario para buscar usuarios y realizar los desafíos.-->
            <div class="container form-control">
                <div class="row">
                    <div class="col">
                        <p><b>Nombre</b></p>
                        <div class="input-group mb-3">                   
                            <input class="form-control" id="nombreUsuario" placeholder="Nombre" type="text">
                            <button class="btn btn-primary" id="botonBuscarUsuario" title="Busque a otros usuarios por su nombre para desafiarlos a una batalla." onclick="buscarUsuario()" type="button"><b>Buscar Usuario</b> <i class="fa-solid fa-magnifying-glass"></i><i class="fa-solid fa-users"></i></button>      
                        </div>
                        <p><b id="tituloColorSeleccionado">Escoja el color de su escuadrón</b><b id="colorSeleccionado"></b></p>
                        <button class="btn" disabled id="botonAmarillo" onclick="seleccionarColor('Amarillo')" style="background-color: #E5E5E5;" title="Amarillo" type="button"><img height="50px" src="../../Imagenes/Escudos/Amarillo.png" width="50px"></button>
                        <button class="btn" disabled id="botonAzul" onclick="seleccionarColor('Azul')" style="background-color: #E5E5E5;" title="Azul" type="button"><img height="50px" src="../../Imagenes/Escudos/Azul.png" width="50px"></button> 
                        <button class="btn" disabled id="botonMorado" onclick="seleccionarColor('Morado')" style="background-color: #E5E5E5;" title="Morado" type="button"><img height="50px" src="../../Imagenes/Escudos/Morado.png" width="50px"></button>               
                        <button class="btn" disabled id="botonNaranjo" onclick="seleccionarColor('Naranjo')" style="background-color: #E5E5E5;" title="Naranjo" type="button"><img height="50px" src="../../Imagenes/Escudos/Naranjo.png" width="50px"></button>               
                        <button class="btn" disabled id="botonRojo" onclick="seleccionarColor('Rojo')" style="background-color: #E5E5E5;" title="Rojo" type="button"><img height="50px" src="../../Imagenes/Escudos/Rojo.png" width="50px"></button>               
                        <button class="btn" disabled id="botonVerde" onclick="seleccionarColor('Verde')" style="background-color: #E5E5E5;" title="Verde" type="button"><img height="50px" src="../../Imagenes/Escudos/Verde.png" width="50px"></button> 
                        <p><b id="tituloUsuario">¿Quiere desafiar a este usuario a una batalla?</b></p>
                        <button class="btn btn-success" disabled id="botonAceptarDesafio" onclick="registrarDesafio()" title="Aceptar" type="button"><b>CONFIRMAR</b> <i class="bi bi-shield-check"></i></button>
                        <button class="btn btn-danger" onclick="cancelar()" type="button"><b>CANCELAR</b> <i class="bi bi-shield-x"></i></button> 
                    </div>
                    <div class="col">
                        <div class="col form-control" style="height: 300px; overflow-y: scroll; width: 100%;">
                            <p><i class="fa-solid fa-users"></i> <b>USUARIOS</p>
                            <div id="contenedorUsuarios"></div>                       
                        </div>
                    </div>                   
                </div>                
            </div>
            <!--Este <div></div> contiene el panel con el mensaje de espera al desafío realizado.-->
            <div class="modal modal-fade" id="panelMensajesDesafio" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header" style="background-color: #fff3cd; color: #664d03; justify-content: center;">
                            <h5><b>Esperando respuesta del desafío</b> <i class="bi bi-shield-exclamation"></i></h5>
                        </div>
                        <div class="modal-body">
                            <div class="col" style="background-color: #fff3cd; color: #664d03;">
                                <h1 id="mensajeCuentaRegresiva" style="font-size: 80px; text-align: center;"><i class="bi bi-exclamation-triangle"></i></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--Este <div></div> contiene el panel con el mensaje de aviso con el desafío rechazado.-->
            <div class="modal fade" id="panelMensajesDesafioRechazado" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header" style="background-color: #f8d7da; color: #842029; justify-content: center;">
                            <h5><b>Desafío Rechazado</b> <i class="bi bi-shield-x"></i></h5>
                        </div>
                        <div class="modal-footer" style="justify-content: center;">
                            <button class="btn btn-danger" data-bs-dismiss="modal" id="botonOcultarPanelMensajesDesafioRechazado" onclick="irPagina('DesafiarUsuarios')" title="Ir a la batalla." type="button">Cerrar <i class="bi bi-shield-x"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <!--Estos <script></script> contienen las CDN de jQuery y Bootstrap que dan funcionalidades a la página web.-->
        <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script> 
        <script src="Funciones.js"></script>
        <script src="../../Funciones/FuncionesComunes.js"></script>
    </body>
</html>