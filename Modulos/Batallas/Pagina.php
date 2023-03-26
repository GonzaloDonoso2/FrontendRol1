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
        <header class="sticky-top">
            <!--Este <nav></nav> contiene el menú de opciones.-->      
            <nav class="navbar navbar-expand-lg navbar-dark" style="background-color:#6B6B6B;">               
                <div class="container-fluid">
                    <img height="50px" src="../../Imagenes/LogotipoEmpresa.png" width="50px">
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page">Perro Negro sitio web</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <!--Este <div></div> contiene la alerta visual.-->
            <div class="alert alert-success alert-dismissible show" id="alertaVisual" role="alert">
                <p><b id="mensajeAlertaVisual">Ha comenzado una batalla...</b></p>
                <button aria-label="Close" class="btn-close" id="botonOcultarAlertaVisual" onclick="ocultarAlertaVisual()" type="button"></button>
            </div>
        </header>        
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
            <!--Este <div></div> contiene el tablero de juego.-->
            <div id="contenedorTablero" style="position: relative;">
                <img id="imagenTablero" src="../../Imagenes/Tablero.png">        
                <!--<div style="left: 238px; position:absolute; top: 1px; z-index: 0;">
                    <form class="form-floating">
                        <input class="form-control" id="campoNombreJugador" readonly style="text-align: center;" type="text">
                        <label for="campoIndicadorTurno">Turno del jugador</label>
                    </form>
                </div>
                <div style="left: 238px; position: absolute; top: 60px; z-index: 0;">
                    <form class="form-floating">
                        <input class="form-control" id="campoNumeroTurno" readonly style="height: 52px; text-align: center;" type="text">
                        <label for="campoIndicadorTurno">Turno Número:</label>
                    </form>
                </div>
                <div style="left: 30px; position: absolute; top: 1px; z-index: 0;">
                    <form class="form-floating">
                        <input class="form-control" id="campoNombrePersonaje1" readonly style="text-align: center;" type="text">
                        <label for="campoNombrePersonaje1"><i class="fa-solid fa-user"></i> Turno del personaje:</label>
                    </form>
                </div>
                <img id="retratoPersonaje1" src="" style="border-style: solid; border-radius: 5px; border-width: 1px; height: 105px; left: 30px; position: absolute; top: 60px; width: 78px; z-index: 0;">                
                <div style="left: 109px; position: absolute; top: 60px; z-index: 0;">
                    <form class="form-floating">
                        <input class="form-control" id="campoArmaduraPersonaje1" readonly style="height: 52px; text-align: center; width: 128px;" type="text">
                        <label for="campoAmaduraPersonaje1"><i class="fa-solid fa-shield"></i> Armadura:</label>
                    </form>
                </div>
                <div style="left: 109px; position: absolute; top: 113px; z-index: 0;">
                    <form class="form-floating">
                        <input class="form-control" id="campoSaludPersonaje1" readonly style="height: 52px; text-align: center; width: 128px;" type="text">
                        <label for="campoSaludPersonaje1"><i class="fa-solid fa-heart"></i> Salud:</label>
                    </form>
                </div> 
                <div style="left: 30px; position: absolute; top: 166px; z-index: 0;">
                    <form class="form-floating">
                        <button
                            class="btn btn-outline-danger"
                            disabled
                            id="botonAtaque"
                            onclick="crearCuadradosAtaqueHabilidadMovimiento('ATAQUE')"
                            style="width: 41px;"
                            title=""
                            type="button">
                            <i class="fa-solid fa-hand-fist"></i></button>
                        <button
                            class="btn btn-outline-success"
                            disabled
                            id="botonHabilidad"
                            onclick="crearCuadradosAtaqueHabilidadMovimiento('HABILIDAD')"
                            style="width: 41px;"
                            title="Usar Habilidad"
                            type="button">
                            <i class="fa-solid fa-hand-holding-medical"></i></button>
                        <button
                            class="btn btn-outline-primary"
                            id="botonMovimiento"
                            onclick="crearCuadradosAtaqueHabilidadMovimiento('MOVIMIENTO')"
                            style="width: 41px;"
                            title="Moverse" 
                            type="button">
                            <i class="fa-solid fa-arrows-up-down-left-right"></i></button>
                    </form>
                </div>
                <div style="left: 30px; position: absolute; top: 205px; z-index: 0;">
                    <form class="form-floating">
                        <button 
                            class="btn btn-outline-warning"
                            disabled
                            id="botonTerminarTurno"
                            onclick="mostrarPanelMensajes('TERMINAR TURNO')"
                            style="width: 41px;"
                            title="Terminar Turno"
                            type="button">
                            <i class="fa-solid fa-hand"></i></button>
                        <button 
                            class="btn btn-outline-dark"
                            disabled
                            id="botonTerminarBatalla" 
                            onclick="mostrarPanelMensajes('TERMINAR BATALLA')"
                            style="width: 41px;"
                            title="Terminar Batalla" 
                            type="button">
                            <i class="fa-solid fa-flag"></i></button>  
                        <button 
                            class="btn btn-outline-danger"
                            disabled
                            id="botonCancelarAccion1" 
                            onclick="cancelarAccion()"
                            style="width: 41px;"
                            title="Cancelar Accion" 
                            type="button">
                            <i class="fa-solid fa-ban"></i></button> 
                    </form>
                </div> 
                <div style="left: 1141px; position: absolute; top: 1px; z-index: 0;">
                    <form class="form-floating">
                        <input class="form-control" id="campoNombrePersonaje2" readonly style="text-align: center;" type="text">
                        <label for="campoNombrePersonaje2"><i class="fa-solid fa-user"></i> Personaje:</label>
                    </form>
                </div>
                <img id="retratoPersonaje2" src="../../Imagenes/Personajes/Retratos/sinRetrato.png" style="border-style: solid; border-radius: 5px; border-width: 1px; height: 105px; left: 1270px; position: absolute; top: 60px; width: 78px; z-index: 0;">                
                <div style="left: 1141px; position: absolute; top: 60px; z-index: 0;">
                    <form class="form-floating">
                        <input class="form-control" id="campoArmaduraPersonaje2" readonly style="height: 52px; text-align: center; width: 128px;" type="text">
                        <label for="campoAmaduraPersonaje2"><i class="fa-solid fa-shield"></i> Armadura:</label>
                    </form>
                </div>
                <div style="left: 1141px; position: absolute; top: 113px; z-index: 0;">
                    <form class="form-floating">
                        <input class="form-control" id="campoSaludPersonaje2" readonly style="height: 52px; text-align: center; width: 128px;" type="text">
                        <label for="campoSaludPersonaje2"><i class="fa-solid fa-heart"></i> Salud:</label>
                    </form>
                </div>--> 
            </div>
            <!--Este <div></div> contiene el panel con el mensaje de carga para el jugador.-->
            <div class="modal fade" id="panelMensajeCarga" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header" style="background-color: #fff3cd; color: #664d03; justify-content: center;">
                            <h5 class="modal-title"><b>Preparando la batalla</b></h5>                   
                        </div>
                        <div class="modal-body">
                            <div class="d-flex justify-content-center">
                                <div class="spinner-border text-warning" style="width: 6rem; height: 6rem;" role="status">
                                    <span class="sr-only">Preparando la batalla...</span>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>           
            <!--Este <div></div> contiene el panel con mensajes para el jugador.-->
            <div class="modal fade" id="panelMensajes" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header" style="background-color: #fff3cd; color: #664d03; justify-content: center;">
                            <h5 class="modal-title"><b id="tituloPanelMensajes"></b></h5>
                        </div>
                        <div class="modal-body">
                            <h6 style="text-align: center;" id="mensajePanelMensajes"></h6>
                        </div>
                        <div class="modal-footer" style="justify-content: center;">
                            <button class="btn btn-success" data-bs-dismiss="modal" id="botonConfirmarAccion" onclick="confirmarAccion()" type="button"><b>Confirmar Acción</b></button>
                            <button class="btn btn-danger" data-bs-dismiss="modal" id="botonCancelarAccion2" onclick="cancelarAccion()" type="button"><b>Cancelar Acción</b></button>
                        </div>
                    </div>
                </div>
            </div>
            <!--Este <div></div> contiene el panel con las animaciones.-->
            <div class="modal fade" id="panelAnimacion" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header" style="background-color: #fff3cd; color: #664d03; justify-content: center;">
                            <h6><b id="tituloPanelAnimacion"></b></h6>
                        </div>
                        <div class="modal-footer" style="justify-content: center;">
                            <img height="128px" id="animacionAtaqueHabilidad" src="../../Imagenes/Ataques/1.png" width="200px">
                        </div>
                        <div class="modal-footer" style="justify-content: center;">
                            <button 
                                class="btn btn-danger" 
                                id="botonAnimacion"
                                type="button">                                
                                <i class="fa-solid fa-hand-fist" id="iconoAnimacion"></i>
                                <b id="ataque">ATAQUE:</b>
                            </button>
                            <button 
                                class="btn btn-primary"                                
                                type="button">
                                <i class="fa-solid fa-user-shield"></i>
                                <b id="defensa">DEFENSA:</b>
                            </button>
                        </div>
                        <div class="modal-footer" style="justify-content: center;">                          
                            <button 
                                class="btn btn-secondary"                                
                                type="button">
                                <i class="fa-solid fa-shield"></i>
                                <b id="danoArmadura">ARMADURA:</b>
                            </button>
                            <button 
                                class="btn btn-danger"                                
                                type="button">
                                <i class="fa-solid fa-heart"></i>
                                <b id="danoPersonaje">PERSONAJE:</b>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!--Este <div></div> contiene el panel con mensajes del resultado de la batalla (VICTORIA) para el jugador.-->
            <div class="modal fade" id="panelMensajesVictoria" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header" style="background-color: #d1e7dd; color: #0f5132; justify-content: center;">
                            <h5><b>VICTORIA</b></h5>
                        </div>
                        <div class="modal-footer" style="justify-content: center;">
                            <button class="btn btn-success" data-bs-dismiss="modal" onclick="irPagina('Principal')" title="Ir a la página principal." type="button">Ir a la página principal <i class="fa-solid fa-arrow-turn-down-left"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <!--Este <div></div> contiene el panel con mensajes del resultado de la batalla (DERROTA) para el jugador.-->
            <div class="modal fade" id="panelMensajesDerrota" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header" style="background-color: #f8d7da; color: #842029; justify-content: center;">
                            <h5><b>DERROTA</b></h5>
                        </div>
                        <div class="modal-footer" style="justify-content: center;">
                            <button class="btn btn-danger" data-bs-dismiss="modal" onclick="irPagina('Principal')" title="Ir a la página principal." type="button">Ir a la página principal <i class="fa-solid fa-arrow-turn-down-left"></i></button>
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