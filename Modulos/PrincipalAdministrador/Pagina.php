<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">        
        <!--Estos <links> contienen la CDN de Bootstrap que dan estilo e iconos a la página web.-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">
        <!--Este <script></script> contienen la CDN de Font Awesome que dan iconos a la página web.-->
        <script src="https://kit.fontawesome.com/06c09b3cfb.js" crossorigin="anonymous"></script>
        <title>Perro Negro sitio web</title>
    </head>
    <body>
        <!--Este <nav></nav> contiene el menú de opciones.-->   
        <nav class="navbar navbar-expand-lg navbar-dark sticky-top" style="background-color:#6B6B6B;">
            <div class="container-fluid">
                <img height="50px" src="../../Imagenes/LogotipoEmpresa.png" width="50px">
                <a class="btn nav-link" aria-current="page" onclick="terminarSesion()" style="color: #842029;"><b>Terminar Sesión</b></a>
            </div>
        </nav>
        <main>
            <!--Este <div></div> contiene el panel con el mensaje de carga para el jugador.-->
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
            <div class="alert alert-success alert-dismissible show sticky-top" id="alertaVisual" role="alert">
                <p><b id="mensajeAlertaVisual"></b></p>
                <button aria-label="Close" class="btn-close" id="botonOcultarAlertaVisual" onclick="ocultarAlertaVisual()" type="button"></button>
            </div>
            <!--Este <div></div> contiene los resultados de las batallas del usuario y la tabla con sus personajes.-->
            <!--<div class="container form-control">
                <ul style="list-style-type: none;">
                    <li><span><b>Los tres mejores jugadores:</b></span></li>
                    <li><span><b>1.°</b>&nbsp;<b id="primerJugador"></b></span></li>
                    <li><span><b>2.°</b>&nbsp;<b id="segundoJugador"></b></span></li>
                    <li><span><b>3.°</b>&nbsp;<b id="tercerJugador"></b></span></li>                                            
                </ul>    
            </div>   
            <br>-->
            <div class="container form-control">
                <div class="row">
                    <div class="col">
                        <div class="container form-control">
                            <div class="row">
                                <div class="col">
                                    <ul style="list-style-type: none;">
                                        <li><span><i class="fa-solid fa-user-large" style="width: 20px;"></i>&nbsp;&nbsp;<b>Usuarios Vigentes:</b></span></li>
                                        <li><span><i class="fa-solid fa-user-large-slash" style="width: 20px;"></i>&nbsp;&nbsp;<b>Usuarios No Vigentes:</b></span></li>
                                        <li><span><i class="fa-solid fa-users" style="width: 20px;"></i>&nbsp;&nbsp;<b>Usuarios Totales:</b></span></li>
                                    </ul>  
                                </div>
                                <div class="col">
                                    <ul style="list-style-type: none;">
                                        <li><span><b id="usuariosVigentes"></b></span></li>
                                        <li><span><b id="usuariosNoVigentes"></b></span></li>
                                        <li><span><b id="usuariosTotales"></b></span></li>
                                    </ul>  
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="container form-control">
                            <div class="row">
                                <div class="col">
                                    <p><b>Nombre</b></p>
                                    <div class="input-group mb-3">                   
                                        <input class="form-control" id="nombreUsuario" placeholder="Nombre" type="text">
                                        <button class="btn btn-primary" id="botonBuscarUsuario" onclick="buscarUsuario()" type="button"><b>Buscar Usuario</b> <i class="fa-solid fa-magnifying-glass"></i><i class="fa-solid fa-users"></i></button>
                                        <button class="btn btn-secondary" onclick=" obtenerUsuarios()" type="button"><i class="fa-solid fa-arrows-rotate"></i></button>      
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="col form-control" style="height: 300px; overflow-y: scroll; width: 100%;">
                            <p><i class="fa-solid fa-users"></i> <b>USUARIOS</b></p>
                            <div id="contenedorUsuarios"></div>                       
                        </div>
                    </div> 
                    <div class="col">
                        <div class="container form-control">
                            <div class="row">
                                <div class="col">
                                    <ul style="list-style-type: none;">
                                        <li><span><i class="fa-solid fa-tag" style="width: 20px;"></i>&nbsp;&nbsp;<b>Solicitudes Realizadas:</b></span></li>
                                        <li><span><i class="fa-solid fa-user-tag" style="width: 20px;"></i>&nbsp;&nbsp;<b>Solicitudes Pendientes:</b></span></li>
                                        <li><span><i class="fa-solid fa-tags" style="width: 20px;"></i>&nbsp;&nbsp;<b>Solicitudes Totales:</b></span></li>
                                    </ul>  
                                </div>
                                <div class="col">
                                    <ul style="list-style-type: none;">
                                        <li><span><b id="solicitudesRealizadas"></b></span></li>
                                        <li><span><b id="solicitudesPendientes"></b></span></li>
                                        <li><span><b id="solicitudesTotales"></b></span></li>
                                    </ul>  
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="container form-control">
                            <div class="row">
                                <div class="col">
                                    <p><b>Numero de Solicitud</b></p>
                                    <div class="input-group mb-3">                   
                                        <input class="form-control" id="numeroSolicitud" placeholder="Numero de Solicitud " type="number">
                                        <button class="btn btn-primary" id="botonBuscarSolicitud" onclick="buscarSolicitud()" type="button"><b>Buscar Solicitud</b> <i class="fa-solid fa-magnifying-glass"></i><i class="fa-solid fa-user-tag"></i></button>
                                        <button class="btn btn-secondary" onclick="obtenerSolicitudes()" type="button"><i class="fa-solid fa-arrows-rotate"></i></button>      
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="col form-control" style="height: 300px; overflow-y: scroll; width: 100%;">
                            <p><i class="fa-solid fa-user-tag"></i> <b>SOLICITUDES DE PERSONAJES</b></p>
                            <div id="contenedorSolicitudes"></div>                       
                        </div>
                    </div>           
                </div>             
            </div>
        </main>
        <!--Estos <script></script> contienen la CDN de jQuery que dan funcionalidades a la página web.-->
        <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
        <!--Estos <script></script> contienen la CDN de Bootstrap que dan funcionalidades a la página web.-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>       
        <script src="Funciones.js"></script>
        <script src="../../Funciones/FuncionesComunes.js"></script>
    </body>
</html>