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
                <img height="50px" src="Imagenes/LogotipoEmpresa.png" width="50px">
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page">Perro Negro sitio web</a>
                        </li>
                        <li class="nav-item">
                            <a class="btn nav-link active" aria-current="page" onclick="irPaginaIniciarSesion()">Iniciar Sesión</a>
                        </li>
                    </ul>
                </div>
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
            <!--Este <div></div> contiene la imagen de portada y descripción del sitio web.--> 
            <div class="container">
                <div class="row">
                    <div class="col">
                        <img src="Imagenes/Portada.png" style="border-style: solid; border-radius: 5px; border-width: 1px; height: 260px; margin-top: 5%; width: 520px;">     
                    </div>
                    <div class="col">
                        <img height="100px" style="margin-left: 25%; margin-top: 5%;" src="Imagenes/LogotipoJuego.png" width="200px">                        
                        <ul>
                            <li>Regístrate y únete a una comunidad de más 100.000 jugadores, ¡juega ahora Eternal Beta!</li>
                            <li>Puedes contactar con nosotros para publicitar tu producto en nuestro sitio web y darlo a conocer a más de 100.000 personas.</li>
                        </ul>
                    </div>
                </div>
            </div>  
        </main>
        <!--Estos <script></script> contienen la CDN de jQuery que dan funcionalidades a la página web.-->
        <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
        <!--Estos <script></script> contienen la CDN de Bootstrap que dan funcionalidades a la página web.-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>       
        <script src="Funciones/FuncionesIndex.js"></script>
        <script src="Funciones/FuncionesComunes.js"></script>
    </body>
</html>