<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">        
        <!--Estos <links> contienen la CDN de Bootstrap que dan estilo e iconos a la página web.-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">
        
        <!--Estos <links> contienen.-->
        <link rel="stylesheet" href="../../LibreriasExternas/Select2/css/select2.min.css">
        <link rel="stylesheet" href="../../LibreriasExternas/Select2/css/select2-bootstrap.min.css">
        
        <!--Este <script></script> contienen la CDN de Font Awesome que dan iconos a la página web.-->
        <script src="https://kit.fontawesome.com/06c09b3cfb.js" crossorigin="anonymous"></script>
        <title>Perro Negro sitio web</title>
    </head>
    <body>
        <!--Este <nav></nav> contiene el menú de opciones.-->  
        <header class="sticky-top">
            <nav class="navbar navbar-expand-lg navbar-dark" style="background-color:#6B6B6B;">
                <div class="container-fluid">
                    <img height="50px" src="../../Imagenes/LogotipoEmpresa.png" width="50px">
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page">Perro Negro sitio web</a>
                            </li>
                            <li class="nav-item">
                                <a class="btn nav-link active" aria-current="page" onclick="irPagina('Tiradas')">Tiradas</a>
                            </li>
                            <li class="nav-item">
                                <a class="btn nav-link" aria-current="page" onclick="irPagina('Batallas')">Batallas</a>
                            </li> 
                        </ul>
                    </div>
                    <a class="btn nav-link" aria-current="page" onclick="terminarSesion()" style="color: #842029;"><b>Terminar Sesión</b></a>
                </div>          
            </nav>  
            <!--Este <div></div> contiene la alerta visual.-->
            <div class="alert alert-success alert-dismissible show" id="alertaVisual" role="alert">
                <p><b id="mensajeAlertaVisual"></b></p>
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
            <!--Este <div></div> contiene los resultados de las batallas del usuario y la tabla con sus personajes.-->
            <div class="container">                
                <div class="row">
                    <div class="col" style="text-align: center;">
                        <div class="form-floating">
                            <input class="form-control" id="campoNombrePersonaje" placeholder="Nombre del Personaje" style="text-align: center;" type="text">
                            <label for="campoNombrePersonaje"><b>Nombre del Personaje</b></label>
                        </div>
                        <br>
                        <img class="img-fluid rounded-start" id="retratoPersonaje" src="../../Imagenes/Personaje.jpg" style="border-style: solid; border-radius: 5px; border-width: 1px; height: 243px; width: 190px;">                                 
                    </div>
                    <div class="col" style="text-align: center;">
                        <div class="form-floating">                                    
                            <input class="form-control" max="95" min="45" id="campoPuntuacionAgilidad" step="5" style="text-align: center;" type="number" onchange="puntuacionAtributo('Agilidad')" value="45">
                            <label for="campoPuntuacionAgilidad"><b id="etiquetaPuntuacionAgilidad">Agilidad (45) = Critico (9)!</b></label>
                        </div>
                        <div class="form-floating">                                    
                            <input class="form-control" max="95" min="45" id="campoPuntuacionDestreza" step="5" style="text-align: center;" type="number" onchange="puntuacionAtributo('Destreza')" value="45">
                            <label for="campoPuntuacionDestreza"><b id="etiquetaPuntuacionDestreza">Destreza (45) = Critico (9)!</b></label>
                        </div>
                        <div class="form-floating">                                    
                            <input class="form-control" max="95" min="45" id="campoPuntuacionInteligencia" step="5" style="text-align: center;" type="number" onchange="puntuacionAtributo('Inteligencia')" value="45">
                            <label for="campoPuntuacionInteligencia"><b id="etiquetaPuntuacionInteligencia">Inteligencia (45) = Critico (9)!</b></label>
                        </div>
                        <div class="form-floating">                                    
                            <input class="form-control" max="95" min="45" id="campoPuntuacionFuerza" step="5" style="text-align: center;" type="number" onchange="puntuacionAtributo('Fuerza')" value="45">
                            <label for="campoPuntuacionFuerza"><b id="etiquetaPuntuacionFuerza">Fuerza (45) = Critico (9)!</b></label>
                        </div>
                        <div class="form-floating">                                    
                            <input class="form-control" max="95" min="45" id="campoPuntuacionPercepcion" step="5" style="text-align: center;" type="number" onchange="puntuacionAtributo('Percepcion')" value="45">
                            <label for="campoPuntuacionPercepcion"><b id="etiquetaPuntuacionPercepcion">Percepción (45) = Critico (9)!</b></label>
                        </div>
                        <div class="form-floating">                                    
                            <input class="form-control" max="95" min="45" id="campoPuntuacionResistencia" step="5" style="text-align: center;" type="number" onchange="puntuacionAtributo('Resistencia')" value="45">
                            <label for="campoPuntuacionResistencia"><b id="etiquetaPuntuacionResistencia">Resistencia (45) = Critico (9)!</b></label>
                        </div>                              
                    </div> 
                    <div class="col" style="text-align: center;">
                        <div class="form-floating">                                    
                            <input class="form-control" id="etiquetaBonificacionAgilidad" readonly style="font-weight: bold; text-align: center;" type="text" value="+0/1">
                            <label for="etiquetaBonificacionAgilidad"><b>Bonificación/Movimiento Por Turno</b></label>
                        </div> 
                        <div class="form-floating">                                    
                            <input class="form-control" id="etiquetaBonificacionDestreza" readonly style="font-weight: bold; text-align: center;" type="text" value="+0">
                            <label for="etiquetaBonificacionDestreza"><b>Bonificación</b></label>
                        </div>
                        <div class="form-floating">                                    
                            <input class="form-control" id="etiquetaBonificacionInteligencia" readonly style="font-weight: bold; text-align: center;" type="text" value="+0">
                            <label for="etiquetaBonificacionInteligencia"><b>Bonificación</b></label>
                        </div>
                        <div class="form-floating">                                    
                            <input class="form-control" id="etiquetaBonificacionFuerza" readonly style="font-weight: bold; text-align: center;" type="text" value="+0">
                            <label for="etiquetaBonificacionFuerza"><b>Bonificación</b></label>
                        </div>
                        <div class="form-floating">                                    
                            <input class="form-control" id="etiquetaBonificacionPercepcion" readonly style="font-weight: bold; text-align: center;" type="text" value="+0">
                            <label for="etiquetaBonificacionPercepcion"><b>Bonificación</b></label>
                        </div>
                        <div class="form-floating">                                    
                            <input class="form-control" id="etiquetaBonificacionResistencia" readonly style="font-weight: bold; text-align: center;" type="text" value="+0/10">
                            <label for="etiquetaBonificacionResistencia"><b>Bonificación/Salud Máxima</b></label>
                        </div>
                    </div>                
                </div> 
                <br>
                <div class="row">
                    <div class="col">
                        <select class="form-control" id="listaArmasPrimaria" onchange="puntuacionArma('Primaria')">
                            <option value="0">Seleccione su Arma Primaria</option>
                        </select>
                        <br>
                        <div class="form-floating">                                    
                            <input class="form-control" id="etiquetaAlcanceArmaPrimaria" readonly style="font-weight: bold; text-align: center;" type="text" value="0">
                            <label for="etiquetaAlcanceArmaPrimaria"><b>Alcance</b></label>
                        </div>
                        <div class="form-floating">                                    
                            <input class="form-control" id="etiquetaDanoTipoDanoArmaPrimaria" readonly style="font-weight: bold; text-align: center;" type="text" value="0 - Sin Tipo Daño">
                            <label for="etiquetaDanoTipoDanoArmaPrimaria"><b>Daño y Tipo de Daño</b></label>
                        </div>
                        <div class="form-floating">                                    
                            <input class="form-control" id="etiquetaTipoArmaPrimaria" readonly style="font-weight: bold; text-align: center;" type="text" value="Sin Tipo">
                            <label for="etiquetaTipoArmaPrimaria"><b>Tipo</b></label>
                        </div>
                        <div class="form-floating">                                    
                            <input class="form-control" id="etiquetaFuerzaNecesariaArmaPrimaria" readonly style="font-weight: bold; text-align: center;" type="text" value="0">
                            <label for="etiquetaFuerzaNecesariaArmaPrimaria"><b>Fuerza Necesaria</b></label>
                        </div>   
                        <div class="form-floating">                                    
                            <input class="form-control" id="etiquetaResistenciaArmaPrimaria" readonly style="font-weight: bold; text-align: center;" type="text" value="0">
                            <label for="etiquetaResistenciaArmaPrimaria"><b>Resistencia</b></label>
                        </div>  
                    </div>
                    <div class="col">
                        <select class="form-control" id="listaArmasSecundaria" onchange="puntuacionArma('Secundaria')">
                            <option value="0">Seleccione su Arma Secundaria</option>
                        </select>
                        <br>
                        <div class="form-floating">                                    
                            <input class="form-control" id="etiquetaAlcanceArmaSecundaria" readonly style="font-weight: bold; text-align: center;" type="text" value="0">
                            <label for="etiquetaAlcanceArmaSecundaria"><b>Alcance</b></label>
                        </div>
                        <div class="form-floating">                                    
                            <input class="form-control" id="etiquetaDanoTipoDanoArmaSecundaria" readonly style="font-weight: bold; text-align: center;" type="text" value="0 - Sin Tipo Daño">
                            <label for="etiquetaDanoTipoDanoArmaSecundaria"><b>Daño y Tipo de Daño</b></label>
                        </div>
                        <div class="form-floating">                                    
                            <input class="form-control" id="etiquetaTipoArmaSecundaria" readonly style="font-weight: bold; text-align: center;" type="text" value="Sin Tipo">
                            <label for="etiquetaTipoArmaSecundaria"><b>Tipo</b></label>
                        </div>
                        <div class="form-floating">                                    
                            <input class="form-control" id="etiquetaFuerzaNecesariaArmaSecundaria" readonly style="font-weight: bold; text-align: center;" type="text" value="0">
                            <label for="etiquetaFuerzaNecesariaArmaSecundaria"><b>Fuerza Necesaria</b></label>
                        </div>   
                        <div class="form-floating">                                    
                            <input class="form-control" id="etiquetaResistenciaArmaSecundaria" readonly style="font-weight: bold; text-align: center;" type="text" value="0">
                            <label for="etiquetaResistenciaArmaSecundaria"><b>Resistencia</b></label>
                        </div> 
                    </div>
                    <div class="col">
                        <select class="form-control" id="listaArmaduras" onchange="puntuacionArmadura()">
                            <option value="0">Seleccione su Armadura</option>
                            <option value="1">ARMADURA LIGERA</option>
                            <option value="2">ARMADURA LIGERA</option>
                            <option value="3">ARMADURA MEDIANA</option>
                            <option value="4">ARMADURA PESADA</option>
                        </select>
                        <br>
                        <div class="form-floating">                                    
                            <input class="form-control" id="etiquetaDefensaArmadura" readonly style="font-weight: bold; text-align: center;" type="text" value="0">
                            <label for="etiquetaDefensaArmadura"><b>Defensa</b></label>
                        </div>
                        <div class="form-floating">                                    
                            <input class="form-control" id="etiquetaPenalizacionAgilidadArmadura" readonly style="font-weight: bold; text-align: center;" type="text" value="0">
                            <label for="etiquetaPenalizacionAgilidadArmadura"><b>Penalización Agilidad</b></label>
                        </div>
                        <div class="form-floating">                                    
                            <input class="form-control" id="etiquetaPenalizacionMovimientoPorTurnoArmadura" readonly style="font-weight: bold; text-align: center;" type="text" value="0">
                            <label for="etiquetaPenalizacionMovimientoPorTurnoArmadura"><b>Penalización Movimiento Por Turno</b></label>
                        </div>
                        <br>
                        <button class="btn btn-success" id="botonRegistrar" onclick="registrarPersonaje()" type="button"><b>REGISTRAR PERSONAJE</b></button>
                    </div>
                </div>
            </div>  
        </main>
        <!--Este <script></script> contien la CDN de jQuery que dan funcionalidades a la página web.-->
        <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
        <!--Este <script></script> contien la CDN de Bootstrap que dan funcionalidades a la página web.-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script> 
        
        <!--Este <script></script> contien.-->
        <script src="../../LibreriasExternas/Select2/js/select2.full.min.js"></script>
        
        <script src="Funciones.js"></script>
        <script src="../../Funciones/FuncionesComunes.js"></script>
    </body>
</html>