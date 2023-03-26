$(document).ready(function () {

    //validarInicioSesion();
    crearPosiciones();        
    //iniciarBatalla();
});     

function validarInicioSesion() {
    
    $("#panelMensajeCarga").modal("show");

    if (sessionStorage.getItem("idUsuario") === null) {
        
        irPaginaInicio();

    } else {
        
        //crearPosiciones();        
        //iniciarBatalla();
    }
}

function iniciarBatalla() {  
    
    sessionStorage.setItem("idBatalla", 1);
    sessionStorage.setItem("colorUsuario1", "Rojo");
    sessionStorage.setItem("idUsuario1", 1);
    sessionStorage.setItem("nombreUsuario1", "Gonzalo Donoso");
    sessionStorage.setItem("colorUsuario2", "Azul");
    sessionStorage.setItem("idUsuario2", 2);
    sessionStorage.setItem("nombreUsuario2", "Andres Ramirez");
    sessionStorage.setItem("accionesEjecucion", "SIN ACCIONES EN EJECUCION");
    sessionStorage.setItem("botonesPresionados", "SIN BOTONES PRESIONADOS");
    sessionStorage.setItem("ataquesHabilidadesPrevias", "SIN ATAQUES O HABILIDADES PREVIAS");
    sessionStorage.setItem("movimientosPrevios", "SIN MOVIMIENTOS PREVIOS");
    sessionStorage.setItem("terminosTurnoBatalla", "SIN TERMINOS DE TURNO O BATALLA");
    crearPersonajes(1, 1, 0, 6, 15, "Berserker", "Rojo", 8, 18, "AUMENTA DEFENSA", 8, 3, "GUNDIR", "SANAR HERIDA", "Derecha", "6T", 40, 1);
    crearPersonajes(2, 3, 1, 3, 18, "Cazador", "Azul", 6, 10, "CURA", 10, 4, "JACK", "DEFENSA", "Izquierda", "6J", 25, 2);
    console.log("SE INICIÓ LA BATALLA SIN PROBLEMAS.");

    /*let desafio = {

        "id": sessionStorage.getItem("idDesafio"),
    };    
    let backendUrl = sessionStorage.getItem("backendURL");
    let url = backendUrl + "/" + "index.php/batallas?desafio=" + JSON.stringify(desafio);

    $.ajax({
        url: url,
        method: "GET",
        success: function (provisoriaRespuesta) {

            let provisoriaRespuestaBatalla = JSON.parse(provisoriaRespuesta);
            sessionStorage.setItem("idBatalla", 1);
            sessionStorage.setItem("colorUsuario1", "Rojo");
            sessionStorage.setItem("idUsuario1", 1);
            sessionStorage.setItem("nombreUsuario1", "Gonzalo Donoso");
            sessionStorage.setItem("colorUsuario2", "Azul");
            sessionStorage.setItem("idUsuario2", 2);
            sessionStorage.setItem("nombreUsuario2", "Andres Ramirez");
            let personaje1 = provisoriaRespuestaBatalla[3].personaje;
            let personaje2 = provisoriaRespuestaBatalla[4].personaje;
            sessionStorage.setItem("accionesEjecucion", "SIN ACCIONES EN EJECUCION");
            sessionStorage.setItem("botonesPresionados", "SIN BOTONES PRESIONADOS");
            sessionStorage.setItem("ataquesHabilidadesPrevias", "SIN ATAQUES O HABILIDADES PREVIAS");
            sessionStorage.setItem("movimientosPrevios", "SIN MOVIMIENTOS PREVIOS");
            sessionStorage.setItem("terminosTurnoBatalla", "SIN TERMINOS DE TURNO O BATALLA");
            crearPersonajes(1, 1, 0, 6, 15, "Centurion", "Rojo", 8, 18, "AUMENTA DEFENSA", 8, 3, "GUNDIR", "SANAR HERIDA", "Arriba", "G3", 40, 1);
            crearPersonajes(2, 3, 1, 3, 18, "cazador", "Azul", 6, 10, "CURA", 10, 4, "JACK", "DEFENSA", "Abajo", "H3", 25, 2);
            console.log("SE INICIÓ LA BATALLA SIN PROBLEMAS.");
            buscarTurno();
        }
    });*/
}

var listaPosiciones = [];
var listaPersonajes = [];
var listaCuadrados = [];
var listaBotones = [];
var ataque = {
    "ataque": "",
    "defensa": "",
    "danoPersonaje": "",
    "danoArmadura": "",
    "posicion": "",
    "resultado": "",
    "idBatalla": "",
    "idPersonaje1": "",
    "idPersonaje2": "",
    "idTurno": ""
};
var habilidad = {
    "alcance": "",
    "ataque": "",
    "defensa": "",
    "danoArmadura": "",
    "danoPersonaje": "",
    "habilidad": "",
    "posicion": "",
    "resultado": "",
    "idBatalla": "",
    "idPersonaje1": "",
    "idPersonaje2": "",
    "idTurno": "",
    "idUsuario1": "",
    "idUsuario2": ""
};
var movimiento = {
    "posicion": "",
    "orientacion": "",
    "idPersonaje": "",
    "idUsuarioTurno": "",
    "idTurno": ""
};
var accionRegistrada = "";

function crearPosiciones() {

    let columna = 0;
    let letraColumna;
    let fila = 0;    
    let aumentoCoordenadasX = 0;
    let aumentoCoordenadasY = 0;
    let disminucionCoordenadasX = 0;
    let segundoAumentoCoordenadasY = 0;

    for (let i = 1; i < 401; i++) {

        columna++;        
        aumentoCoordenadasX = (aumentoCoordenadasX + 32);
        aumentoCoordenadasY = (aumentoCoordenadasY + 16);

        if (columna > 20) {

            columna = 1;            
            disminucionCoordenadasX = (disminucionCoordenadasX + 32);
            segundoAumentoCoordenadasY = (segundoAumentoCoordenadasY + 16);
            aumentoCoordenadasX = (32 - disminucionCoordenadasX);
            aumentoCoordenadasY = (16 + segundoAumentoCoordenadasY);
        }
        
        if (columna === 1) {

            letraColumna = "A";

        } else if (columna === 2) {

            letraColumna = "B";

        } else if (columna === 3) {

            letraColumna = "C";

        } else if (columna === 4) {

            letraColumna = "D";

        } else if (columna === 5) {

            letraColumna = "E";

        } else if (columna === 6) {

            letraColumna = "F";

        } else if (columna === 7) {

            letraColumna = "G";

        } else if (columna === 8) {

            letraColumna = "H";

        } else if (columna === 9) {

            letraColumna = "I";

        } else if (columna === 10) {

            letraColumna = "J";

        } else if (columna === 11) {

            letraColumna = "K";

        } else if (columna === 12) {

            letraColumna = "L";

        } else if (columna === 13) {

            letraColumna = "M";

        } else if (columna === 14) {

            letraColumna = "N";

        } else if (columna === 15) {

            letraColumna = "O";

        } else if (columna === 16) {

            letraColumna = "P";

        } else if (columna === 17) {

            letraColumna = "Q";

        } else if (columna === 18) {

            letraColumna = "R";

        } else if (columna === 19) {

            letraColumna = "S";

        } else if (columna === 20) {

            letraColumna = "T";
        }

        let x = (i / 20);

        if (fila < x) {

            fila++;
        }

        let nombre = (fila + letraColumna);        
        let posicion = {    
            "columna": columna,                       
            "coordenadaX": (616 + aumentoCoordenadasX),
            "coordenadaY": (20 + aumentoCoordenadasY),            
            "disponibilidad": true,
            "fila": fila,
            "nombre": nombre,
            "profundidad": i
        };                
        this.listaPosiciones.push(posicion);
    }
}

function crearPersonajes(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
    
    let idPersonaje = parseInt(a);    
    let alcance = parseInt(b);
    let alcanceHabilidad = parseInt(c);
    let armadura = parseInt(d);
    let ataque = parseInt(e);
    let categoria = f;
    let color = g;
    let dano = parseInt(h);
    let defensa = parseInt(i);
    let descripcionHabilidad = j;
    let iniciativa = parseInt(k);
    let movimiento = parseInt(l);
    let nombre = m; 
    let nombreHabilidad = n;
    let orientacion = o;
    let posicion = p;
    let salud = parseInt(q);    
    let idUsuario = parseInt(r);
    let personaje = {
        "idPersonaje": idPersonaje,
        "alcance": alcance,
        "alcanceHabilidad": alcanceHabilidad,
        "armadura": armadura,
        "ataque": ataque,
        "categoria": categoria,
        "color": color,
        "coordenadaX": "",
        "coordenadaY": "",
        "dano": dano,
        "defensa": defensa,
        "descripcionHabilidad": descripcionHabilidad,
        "iniciativa": iniciativa,
        "movimiento": movimiento,
        "nombre": nombre,
        "nombreHabilidad": nombreHabilidad,
        "orientacion": orientacion,
        "posicion": posicion,
        "provisoriaArmadura": armadura,   
        "provisoriaSalud": salud,     
        "salud": salud, 
        "idUsuario": idUsuario
    };
    this.listaPersonajes.push(personaje);       

    if (this.listaPersonajes.length === 2) {

        let plantilla;
        let profundidad;
        let coordenadaX = 0;
        let coordenadaY = 0;
        let saludCoordenadaX = 0;
        let saludCoordenadaY = 0;
        let nombreCoordenadaX = 0;
        let nombreCoordenadaY = 0;
              
        

        for (let x = 0; x < this.listaPersonajes.length; x++) {

            for (let y = 0; y < this.listaPosiciones.length; y++) {

                if (this.listaPersonajes[x].posicion === this.listaPosiciones[y].nombre) {
                    
                    profundidad = this.listaPosiciones[y].profundidad;

                    coordenadaX = (this.listaPosiciones[y].coordenadaX - 52);
                    coordenadaY = (this.listaPosiciones[y].coordenadaY - 88);
                    nombreCoordenadaX = (this.listaPosiciones[y].coordenadaX);
                    nombreCoordenadaY = (this.listaPosiciones[y].coordenadaY - 71);
                    saludCoordenadaX = (this.listaPosiciones[y].coordenadaX);
                    saludCoordenadaY = (this.listaPosiciones[y].coordenadaY - 55);                    
                    this.listaPosiciones[y].disponibilidad = false;
                }
            }

            plantilla = `<img `;
            plantilla += `height="160px" `;
            plantilla += `id="personaje${this.listaPersonajes[x].idPersonaje}" `;
            plantilla += `src="../../Imagenes/Personajes/Miniaturas/${this.listaPersonajes[x].color}/${this.listaPersonajes[x].categoria}/${this.listaPersonajes[x].orientacion}.png" `;
            plantilla += `style="left: ${coordenadaX}px; position: absolute; top: ${coordenadaY}px; z-index: ${profundidad};" `;
            plantilla += `width="160px">`;
            plantilla += `<p `;
            plantilla += `align="center" `;
            plantilla += `style="background-color: green; border-style: solid; border-width: 1px; color: black; font-size: 10px; height: 15px; left: ${saludCoordenadaX}px; position: absolute; top: ${saludCoordenadaY}px; width: 56px; z-index: ${profundidad};">`;
            plantilla += `<b>${this.listaPersonajes[x].salud}/${this.listaPersonajes[x].provisoriaSalud}</b></p>`;
            plantilla += `<p `;
            plantilla += `align="center" `;
            plantilla += `style="background-color: white; border-style: solid; border-width: 1px; color: black; font-size: 10px; height: 15px; left: ${nombreCoordenadaX}px; position: absolute; top: ${nombreCoordenadaY}px; width: 56px; z-index: ${profundidad};">`;
            plantilla += `<b>${this.listaPersonajes[x].nombre}</b></p>`;
            $("#contenedorTablero").append(plantilla);
        }
    }
    
    obtenerDatosPersonaje();
}

function borrarCuadradosBotones() {

    for (let i = 0; i < this.listaPersonajes.length; i++) {

        let idImagenPersonaje = "personaje" + this.listaPersonajes[i].idPersonaje;
        document.getElementById(idImagenPersonaje).style.opacity = "1";
    }

    let contenedorTablero = document.getElementById("contenedorTablero");

    for (let i = 0; i < this.listaBotones.length; i++) {

        let idBoton = "boton" + this.listaBotones[i].id;
        let boton = document.getElementById(idBoton);
        
        if (boton !== null) {
            
            contenedorTablero.removeChild(boton);           
        }        
    }

    for (let i = 0; i < this.listaCuadrados.length; i++) {

        let idCuadrado = "cuadrado" + this.listaCuadrados[i].id;
        let cuadrado = document.getElementById(idCuadrado);
        
        if (cuadrado !== null) {
            
            contenedorTablero.removeChild(cuadrado);            
        }
    }
    
    let cuadradoSeleccionado = document.getElementById("cuadradoSeleccionado");

    if (cuadradoSeleccionado !== null) {

        contenedorTablero.removeChild(cuadradoSeleccionado);
    }

    this.listaBotones = [];
    this.listaCuadrados = [];
    obtenerDatosPersonaje();
}

function cancelarAccion() {
        
    sessionStorage.setItem("botonesPresionados", "SIN BOTONES PRESIONADOS");
    let ataquesHabilidadesPrevias = sessionStorage.getItem("ataquesHabilidadesPrevias");
    let movimientosPrevios = sessionStorage.getItem("movimientosPrevios");
    let terminosTurnoBatalla = sessionStorage.getItem("terminosTurnoBatalla");
    
    if (ataquesHabilidadesPrevias === "SIN ATAQUES O HABILIDADES PREVIAS") {
        
        $("#botonAtaque").removeAttr("disabled");
        $("#botonHabilidad").removeAttr("disabled");
        $("#botonAtaque").addClass("btn-danger").removeClass("btn-outline-danger");
        $("#botonHabilidad").addClass("btn-success").removeClass("btn-outline-success");
    }
    
    if (movimientosPrevios === "SIN MOVIMIENTOS PREVIOS") {

        $("#botonMovimiento").removeAttr("disabled");
        $("#botonMovimiento").addClass("btn-primary").removeClass("btn-outline-primary");
    }
    
    if (terminosTurnoBatalla === "SIN TERMINOS DE TURNO O BATALLA") {

        $("#botonTerminarTurno").removeAttr("disabled");
        $("#botonTerminarBatalla").removeAttr("disabled");
        $("#botonTerminarTurno").addClass("btn-warning").removeClass("btn-outline-warning");
        $("#botonTerminarBatalla").addClass("btn-dark").removeClass("btn-outline-dark");
    }
    
    $("#panelMensajes").modal("hide");
    borrarCuadradosBotones();
}

function crearCuadradosAtaqueHabilidadMovimiento(accion, posicionSeleccionda) {
    
    let idPersonajeTurno = 1;    
    let idUsuarioTurno = 1;
    let idUsuario = parseInt(sessionStorage.getItem("idUsuario1"));
    let usuarioTurno = false;
    
    if (idUsuarioTurno === idUsuario) {
        
        usuarioTurno = true;
        
    } else {
        
        usuarioTurno = false;        
    }
    
    if (usuarioTurno === true) {        
        
        borrarCuadradosBotones();    
    }
    
    let alcancePersonaje;
    let colorCuadrado;   
    let posicionPersonaje;
    
    for (let i = 0; i < this.listaPersonajes.length; i++) {

        let idImagenPersonaje = "personaje" + this.listaPersonajes[i].idPersonaje;
        document.getElementById(idImagenPersonaje).style.opacity = "0.5";

        if (this.listaPersonajes[i].idPersonaje === idPersonajeTurno && this.listaPersonajes[i].idUsuario === idUsuarioTurno) {

            if (accion === "ATAQUE") {

                alcancePersonaje = parseInt(this.listaPersonajes[i].alcance);
                colorCuadrado = "Rojo";

            } else if (accion === "HABILIDAD") {

                alcancePersonaje = parseInt(this.listaPersonajes[i].alcanceHabilidad);
                colorCuadrado = "Amarillo";

            } else if (accion === "MOVIMIENTO") {

                alcancePersonaje = parseInt(this.listaPersonajes[i].movimiento);
                colorCuadrado = "Azul";
            }

            posicionPersonaje = this.listaPersonajes[i].posicion;
        }
    }     
    
    let columna;
    let fila; 

    for (let i = 0; i < this.listaPosiciones.length; i++) {

        if (this.listaPosiciones[i].nombre === posicionPersonaje) {

            columna = this.listaPosiciones[i].columna;
            fila = this.listaPosiciones[i].fila;
        }
    }

    let limiteVerticalSuperior = (fila - alcancePersonaje);
    let limiteVerticalInferior = (fila + alcancePersonaje);
    let incrementoIzquierdo = 0;
    let incrementoDerecho = 0;

    if (limiteVerticalSuperior === 0) {

        limiteVerticalSuperior = 1;
        incrementoIzquierdo = (1);
        incrementoDerecho = (1);

    } else if (limiteVerticalSuperior < 0) {

        let x = ((limiteVerticalSuperior * -1) + 1);

        limiteVerticalSuperior = 1;
        incrementoIzquierdo = (x);
        incrementoDerecho = (x);
    }

    let X;

    if (columna === 20) {

        X = 20;

    } else {

        X = 20;
    }

    for (let i = 0; i < this.listaPosiciones.length; i++) {

        if (this.listaPosiciones[i].fila >= limiteVerticalSuperior && this.listaPosiciones[i].fila <= limiteVerticalInferior) {

            if (this.listaPosiciones[i].columna >= (columna - incrementoIzquierdo) && this.listaPosiciones[i].columna <= (columna + incrementoDerecho)) {
                                  
                let posicionInvalida = false;                  
                                  
                for (let j = 0; j < this.listaPersonajes.length; j++) {

                    if (this.listaPersonajes[j].posicion === this.listaPosiciones[i].nombre) {
                                                
                        if (this.listaPersonajes[j].idUsuario === idUsuarioTurno || this.listaPersonajes[j].provisoriaSalud <= 0) {
                            
                            posicionInvalida = true;                            
                        }
                    }
                } 
                                     
                if (accion === "ATAQUE" && posicionInvalida === false) {
                    
                    let cuadradoCoordenadaX = (this.listaPosiciones[i].coordenadaX - 8);
                    let cuadradoCoordenadaY = (this.listaPosiciones[i].coordenadaY - 4);
                    let plantillaCuadrados = `<img `;
                    plantillaCuadrados += `height="36px" `;
                    plantillaCuadrados += `id="cuadrado${this.listaPosiciones[i].nombre}" `;
                    plantillaCuadrados += `src="../../Imagenes/Cuadrados/${colorCuadrado}A.png" `;
                    plantillaCuadrados += `style="left: ${cuadradoCoordenadaX}px; position: absolute; top: ${cuadradoCoordenadaY}px; z-index: 0;" `;
                    plantillaCuadrados += `width="72px">`;
                    $("#contenedorTablero").append(plantillaCuadrados);
                    let cuadrado = {

                        "id": this.listaPosiciones[i].nombre
                    };
                    this.listaCuadrados.push(cuadrado);
                    
                    if (this.listaPosiciones[i].disponibilidad === false && posicionInvalida === false && usuarioTurno === true) {
                        
                        let botonCoordendaX = (this.listaPosiciones[i].coordenadaX + 5);
                        let botonCoordenadaY = (this.listaPosiciones[i].coordenadaY - 5);
                        let plantillaBotones = `<button `;
                        plantillaBotones += `class="btn btn-link-primary" `;
                        plantillaBotones += `id="boton${this.listaPosiciones[i].nombre}" `;
                        plantillaBotones += `onclick="seleccionarPosicionPersonaje('${this.listaPosiciones[i].nombre}', '${accion}')" `;
                        plantillaBotones += `src="../../Imagenes/Cuadrados/AzulA.png" `;
                        plantillaBotones += `style="left: ${botonCoordendaX}px; position: absolute; top: ${botonCoordenadaY}px; z-index: 401;" `;
                        plantillaBotones += `title="Posición: ${this.listaPosiciones[i].nombre}">`;
                        plantillaBotones += `<i class="fa-solid fa-arrows-to-circle"></i></button>`;
                        $("#contenedorTablero").append(plantillaBotones);
                        let boton = {

                            "id": this.listaPosiciones[i].nombre
                        };
                        this.listaBotones.push(boton);
                    }
                    
                } else if (accion === "HABILIDAD") {

                    let cuadradoCoordenadaX = (this.listaPosiciones[i].coordenadaX - 8);
                    let botonCoordendaX = (this.listaPosiciones[i].coordenadaX + 5);
                    let cuadradoCoordenadaY = (this.listaPosiciones[i].coordenadaY - 4);
                    let botonCoordenadaY = (this.listaPosiciones[i].coordenadaY - 5);
                    let plantillaCuadrados = `<img `;
                    plantillaCuadrados += `height="36px" `;
                    plantillaCuadrados += `id="cuadrado${this.listaPosiciones[i].nombre}" `;
                    plantillaCuadrados += `src="../../Imagenes/Cuadrados/${colorCuadrado}A.png" `;
                    plantillaCuadrados += `style="left: ${cuadradoCoordenadaX}px; position: absolute; top: ${cuadradoCoordenadaY}px; z-index: 0;" `;
                    plantillaCuadrados += `width="72px">`;
                    $("#contenedorTablero").append(plantillaCuadrados);
                    let cuadrado = {

                        "id": this.listaPosiciones[i].nombre
                    };
                    this.listaCuadrados.push(cuadrado);
                    
                    if (this.listaPosiciones[i].disponibilidad === false && usuarioTurno === true) {

                        let plantillaBotones = `<button `;
                        plantillaBotones += `class="btn btn-link-primary" `;
                        plantillaBotones += `id="boton${this.listaPosiciones[i].nombre}" `;
                        plantillaBotones += `onclick="seleccionarPosicionPersonaje('${this.listaPosiciones[i].nombre}', '${accion}')" `;
                        plantillaBotones += `src="../../Imagenes/Cuadrados/AzulA.png" `;
                        plantillaBotones += `style="left: ${botonCoordendaX}px; position: absolute; top: ${botonCoordenadaY}px; z-index: 401;" `;
                        plantillaBotones += `title="Posición: ${this.listaPosiciones[i].nombre}">`;
                        plantillaBotones += `<i class="fa-solid fa-arrows-to-circle"></i></button>`;
                        $("#contenedorTablero").append(plantillaBotones);
                        let boton = {

                            "id": this.listaPosiciones[i].nombre
                        };
                        this.listaBotones.push(boton);
                    }
                    
                } else if (accion === "MOVIMIENTO" && this.listaPosiciones[i].disponibilidad === true) {
                   
                    let cuadradoCoordenadaX = (this.listaPosiciones[i].coordenadaX - 8);
                    let cuadradoCoordenadaY = (this.listaPosiciones[i].coordenadaY - 4);
                    let botonCoordendaX = (this.listaPosiciones[i].coordenadaX + 8);
                    let botonCoordenadaY = (this.listaPosiciones[i].coordenadaY + 4);   
                    let plantillaCuadrados = `<img `;
                    plantillaCuadrados += `height="36px" `;
                    plantillaCuadrados += `id="cuadrado${this.listaPosiciones[i].nombre}" `;
                    plantillaCuadrados += `src="../../Imagenes/Cuadrados/${colorCuadrado}A.png" `;
                    plantillaCuadrados += `style="left: ${cuadradoCoordenadaX}px; position: absolute; top: ${cuadradoCoordenadaY}px; z-index: 0;" `;
                    plantillaCuadrados += `width="72px">`;
                    $("#contenedorTablero").append(plantillaCuadrados);
                    let cuadrado = {

                        "id": this.listaPosiciones[i].nombre
                    };
                    this.listaCuadrados.push(cuadrado);
                    
                    if (this.listaPosiciones[i].disponibilidad === true && usuarioTurno === true) {
                                                
                        let plantillaBotones = `<button `;
                        plantillaBotones += `id="boton${this.listaPosiciones[i].nombre}" `;
                        plantillaBotones += `onclick="seleccionarPosicionPersonaje('${this.listaPosiciones[i].nombre}', '${accion}')" `;
                        plantillaBotones += `src="../../Imagenes/Cuadrados/AzulA.png" `;
                        plantillaBotones += `style="background-color: transparent; border: none; border-radius: 50%; height: 20px; left: ${botonCoordendaX}px; position: absolute; top: ${botonCoordenadaY}px; z-index: 401; width: 40px;" `;
                        plantillaBotones += `title="Posición: ${this.listaPosiciones[i].nombre}">`;
                        plantillaBotones += `</button>`;
                        $("#contenedorTablero").append(plantillaBotones);

                        let boton = {

                            "id": this.listaPosiciones[i].nombre
                        };
                        this.listaBotones.push(boton);                        
                    }
                }
            }

            if (this.listaPosiciones[i].columna === X) {

                if (this.listaPosiciones[i].fila < fila) {

                    incrementoIzquierdo = (incrementoIzquierdo + 1);
                    incrementoDerecho = (incrementoDerecho + 1);

                } else {

                    incrementoIzquierdo = (incrementoIzquierdo - 1);
                    incrementoDerecho = (incrementoDerecho - 1);
                }
            }
        }
    }
    
    if (usuarioTurno === false) {

        let coordenadaX;
        let coordenadaY;

        for (let i = 0; i < this.listaPosiciones.length; i++) {

            if (this.listaPosiciones[i].nombre === posicionSeleccionda) {

                coordenadaX = (parseInt(this.listaPosiciones[i].coordenadaX) - 8);
                coordenadaY = (parseInt(this.listaPosiciones[i].coordenadaY) - 4);
            }
        }

        let plantillaCuadrado = `<img `;
        plantillaCuadrado += `height="36px" `;
        plantillaCuadrado += `id="cuadradoSeleccionado" `;
        plantillaCuadrado += `src="../../Imagenes/Cuadrados/${colorCuadrado}B.png" `;
        plantillaCuadrado += `style="left: ${coordenadaX}px; position: absolute; top: ${coordenadaY}px; z-index: 0;" `;
        plantillaCuadrado += `width="72px">`;
        $("#contenedorTablero").append(plantillaCuadrado);
    }
}

function confimarAccion(accion, posicion, personaje) {
    
}

function seleccionarPosicionPersonaje(posicion, accion) {        
    
    let coordenadaX;
    let coordenadaY;    
    
    for (let i = 0; i < this.listaPosiciones.length; i++) {
        
        if (this.listaPosiciones[i].nombre === posicion) {
            
            coordenadaX = (parseInt(this.listaPosiciones[i].coordenadaX) - 8);
            coordenadaY = (parseInt(this.listaPosiciones[i].coordenadaY) - 4);            
        }        
    }    
    
    let colorCuadrado;
    
    if (accion === "ATAQUE") {
        
        colorCuadrado = "Rojo";
        
    } else if (accion === "HABILIDAD") {
        
        colorCuadrado = "Amarillo";
        
    } else if (accion === "MOVIMIENTO") {
        
        colorCuadrado = "Azul";        
    }   
    
    let plantillaCuadrado = `<img `;
    plantillaCuadrado += `height="36px" `;
    plantillaCuadrado += `id="cuadradoSeleccionado" `;
    plantillaCuadrado += `src="../../Imagenes/Cuadrados/${colorCuadrado}B.png" `;
    plantillaCuadrado += `style="left: ${coordenadaX}px; position: absolute; top: ${coordenadaY}px; z-index: 0;" `;
    plantillaCuadrado += `width="72px">`;
    $("#contenedorTablero").append(plantillaCuadrado); 
        
    for (let i = 0; i < this.listaBotones.length; i++) {
        
        let idBoton = "boton" + this.listaBotones[i].id;
        document.getElementById(idBoton).setAttribute("disabled", true);
    }    
    
    let idPersonajeTurno = 1;
    let idUsuarioTurno =  1;
    let tituloPanelMensajes;
    let mensajePanelMensajes;    
    
    if (accion === "ATAQUE") {  
        
        let nombrePersonaje1;
        let nombrePersonaje2;
        let idPersonaje2;
        let idUsuario1 = 1;
        let idUsuario2;

        for (let i = 0; i < this.listaPersonajes.length; i++) {

            if (this.listaPersonajes[i].idPersonaje === idPersonajeTurno && this.listaPersonajes[i].idUsuario === idUsuarioTurno) {

                nombrePersonaje1 = this.listaPersonajes[i].nombre;
            }
        }

        for (let i = 0; i < this.listaPersonajes.length; i++) {

            if (this.listaPersonajes[i].posicion === posicion) {
                
                nombrePersonaje2 = this.listaPersonajes[i].nombre;
                idPersonaje2 = this.listaPersonajes[i].idPersonaje;
                idUsuario2 = this.listaPersonajes[i].idUsuario;
                $("#campoNombrePersonaje2").val(this.listaPersonajes[i].nombre);
                $("#campoArmaduraPersonaje2").val(this.listaPersonajes[i].provisoriaArmadura + "/" + this.listaPersonajes[i].armadura);
                $("#campoSaludPersonaje2").val(this.listaPersonajes[i].provisoriaSalud + "/" + this.listaPersonajes[i].salud);
                let imagenRetratoPersonaje;

                if (this.listaPersonajes[i].idPersonaje === idPersonaje2 && this.listaPersonajes[i].idUsuario === idUsuario2 && idUsuario2 === idUsuario1) {

                    let colorUsuario1 = sessionStorage.getItem("colorUsuario1");
                    imagenRetratoPersonaje = `../../Imagenes/Personajes/Retratos/${this.listaPersonajes[i].categoria}/${colorUsuario1}.png`;
                    document.getElementById("retratoPersonaje2").src = imagenRetratoPersonaje;

                } else {

                    let colorUsuario2 = sessionStorage.getItem("colorUsuario2");
                    imagenRetratoPersonaje = `../../Imagenes/Personajes/Retratos/${this.listaPersonajes[i].categoria}/${colorUsuario2}.png`;
                    document.getElementById("retratoPersonaje2").src = imagenRetratoPersonaje;
                }
            }
        }
        
        tituloPanelMensajes = "CONFIRMAR ATAQUE";
        mensajePanelMensajes = "¿Quiere que " + nombrePersonaje1.toUpperCase() + " ataque a : " + nombrePersonaje2.toUpperCase() + "?";
        $("#tituloPanelMensajes").text(tituloPanelMensajes);
        $("#mensajePanelMensajes").text(mensajePanelMensajes);
        $("#panelMensajes").modal("show");        
        this.accionRegistrada = "ATAQUE";
        this.ataque = {            
            "ataque": "",
            "defensa": "",            
            "danoArmadura": "",
            "danoPersonaje": "",
            "posicion": posicion,
            "resultado": "",
            "idBatalla": sessionStorage.getItem("idBatalla"),
            "idPersonaje1": idPersonajeTurno,
            "idPersonaje2": idPersonaje2,
            "idTurno": sessionStorage.getItem("idTurno"),
            "idUsuario1": idUsuarioTurno,
            "idUsuario2": idUsuario2         
        };
        
    } else if (accion === "HABILIDAD") {
        
        let nombrePersonaje1;
        let nombrePersonaje2;
        let idPersonaje2;
        let idUsuario1 = parseInt(sessionStorage.getItem("idUsuario1"));
        let idUsuario2;

        for (let i = 0; i < this.listaPersonajes.length; i++) {

            if (this.listaPersonajes[i].idPersonaje === idPersonajeTurno && this.listaPersonajes[i].idUsuario === idUsuarioTurno) {

                nombrePersonaje1 = this.listaPersonajes[i].nombre;
            }
        }

        for (let i = 0; i < this.listaPersonajes.length; i++) {

            if (this.listaPersonajes[i].posicion === posicion) {
                
                nombrePersonaje2 = this.listaPersonajes[i].nombre;
                idPersonaje2 = this.listaPersonajes[i].idPersonaje;
                idUsuario2 = this.listaPersonajes[i].idUsuario;
                $("#campoNombrePersonaje2").val(this.listaPersonajes[i].nombre);
                $("#campoArmaduraPersonaje2").val(this.listaPersonajes[i].provisoriaArmadura + "/" + this.listaPersonajes[i].armadura);
                $("#campoSaludPersonaje2").val(this.listaPersonajes[i].provisoriaSalud + "/" + this.listaPersonajes[i].salud);
                let imagenRetratoPersonaje;

                if (this.listaPersonajes[i].idPersonaje === idPersonaje2 && this.listaPersonajes[i].idUsuario === idUsuario2 && idUsuario2 === idUsuario1) {

                    let colorUsuario1 = sessionStorage.getItem("colorUsuario1");
                    imagenRetratoPersonaje = `../../Imagenes/Personajes/Retratos/${this.listaPersonajes[i].categoria}/${colorUsuario1}.png`;
                    document.getElementById("retratoPersonaje2").src = imagenRetratoPersonaje;

                } else {

                    let colorUsuario2 = sessionStorage.getItem("colorUsuario2");
                    imagenRetratoPersonaje = `../../Imagenes/Personajes/Retratos/${this.listaPersonajes[i].categoria}/${colorUsuario2}.png`;
                    document.getElementById("retratoPersonaje2").src = imagenRetratoPersonaje;
                }
            }
        }
        
        tituloPanelMensajes = "CONFIRMAR HABILIDAD";
        mensajePanelMensajes = "¿Quiere que " + nombrePersonaje1.toUpperCase() + " use su habilidad en : " + nombrePersonaje2.toUpperCase() + "?";
        $("#tituloPanelMensajes").text(tituloPanelMensajes);
        $("#mensajePanelMensajes").text(mensajePanelMensajes);
        $("#panelMensajes").modal("show");        
        this.accionRegistrada = "ATAQUE";
        this.ataque = {            
            "ataque": "",
            "defensa": "",            
            "danoArmadura": "",
            "danoPersonaje": "",
            "posicion": posicion,
            "resultado": "",
            "idBatalla": sessionStorage.getItem("idBatalla"),
            "idPersonaje1": idPersonajeTurno,
            "idPersonaje2": idPersonaje2,
            "idTurno": sessionStorage.getItem("idTurno"),
            "idUsuario1": idUsuarioTurno,
            "idUsuario2": idUsuario2         
        };

    } else if (accion === "MOVIMIENTO") {       
                   
        let nombrePersonaje;

        for (let i = 0; i < this.listaPersonajes.length; i++) {

            if (this.listaPersonajes[i].idPersonaje === idPersonajeTurno) {

                nombrePersonaje = this.listaPersonajes[i].nombre;
                posicionPersonaje = this.listaPersonajes[i].posicion;;
            }
        }
        
        let coordenadaInicialX;
        let coordenadaInicialY;
        let columnaInicial;
        let filaInicial;
        let coordenadaFinalX;
        let coordenadaFinalY;
        let columnaFinal;
        let filaFinal;
        
        for (let i = 0; i < this.listaPosiciones.length; i++) {

            if (this.listaPosiciones[i].nombre === posicionPersonaje) {

                coordenadaInicialX = parseInt(this.listaPosiciones[i].coordenadaX);
                coordenadaInicialY = parseInt(this.listaPosiciones[i].coordenadaY);
                columnaInicial = parseInt(this.listaPosiciones[i].columna);
                filaInicial = parseInt(this.listaPosiciones[i].fila);
            }

            if (this.listaPosiciones[i].nombre === posicion) {

                coordenadaFinalX = parseInt(this.listaPosiciones[i].coordenadaX);
                coordenadaFinalY = parseInt(this.listaPosiciones[i].coordenadaY);
                columnaFinal = parseInt(this.listaPosiciones[i].columna);
                filaFinal = parseInt(this.listaPosiciones[i].fila);
            }
        }
        
        let orientacionPersonaje;

        if (columnaInicial === columnaFinal & filaInicial > filaFinal) {
            
            orientacionPersonaje = "Arriba";

        } else if (columnaInicial < columnaFinal & filaInicial > filaFinal) {
            
            orientacionPersonaje = "Arriba";

        } else if (columnaInicial < columnaFinal & filaInicial === filaFinal) {
            
            orientacionPersonaje = "Derecha";

        } else if (columnaInicial < columnaFinal & filaInicial < filaFinal) {
            
            orientacionPersonaje = "Derecha";

        } else if (columnaInicial === columnaFinal & filaInicial < filaFinal) {
            
            orientacionPersonaje = "Abajo";

        } else if (columnaInicial > columnaFinal & filaInicial < filaFinal) {
            
            orientacionPersonaje = "Abajo";

        } else if (columnaInicial > columnaFinal & filaInicial === filaFinal) {
            
            orientacionPersonaje = "Izquierda";

        } else if (columnaInicial > columnaFinal & filaInicial > filaFinal) {
            
            orientacionPersonaje = "Izquierda";
        }
        
        tituloPanelMensajes = "CONFIRMAR MOVIMIENTO";
        mensajePanelMensajes = "¿Quiere mover a " + nombrePersonaje.toUpperCase() + " a esta posición: " + posicion + "?";
        $("#tituloPanelMensajes").text(tituloPanelMensajes);
        $("#mensajePanelMensajes").text(mensajePanelMensajes);
        $("#panelMensajes").modal("show"); 
        this.movimiento = {
            "posicion": posicion,
            "orientacion": orientacionPersonaje,
            "idPersonaje": idPersonajeTurno
        };
    }   
}

function mostrarPanelMensajes(accion) {
    
    if (accion === "TERMINAR BATALLA") {

        tituloPanelMensajes = "TERMINAR BATALLA";
        mensajePanelMensajes = "¿Quiere terminar la batalla?";
        $("#tituloPanelMensajes").text(tituloPanelMensajes);
        $("#mensajePanelMensajes").text(mensajePanelMensajes);
        $("#panelMensajes").modal("show");
        this.accionRegistrada = "TERMINAR BATALLA";

    } else if (accion === "TERMINAR TURNO") {

        tituloPanelMensajes = "TERMINAR TURNO";
        mensajePanelMensajes = "¿Quiere terminar su turno?";
        $("#tituloPanelMensajes").text(tituloPanelMensajes);
        $("#mensajePanelMensajes").text(mensajePanelMensajes);
        $("#panelMensajes").modal("show");
        this.accionRegistrada = "TERMINAR TURNO";
    }
}

function registrarAccion() {

    document.getElementById("botonCancelarAccion1").setAttribute("disabled", true);
    $("#botonCancelarAccion1").addClass("btn-outline-danger").removeClass("btn-danger");
    sessionStorage.setItem("accionesEjecucion", "ACCION EN EJECUCION");

    if (this.accionRegistrada === "ATAQUE") {
        
        for (let i = 0; i < this.listaPersonajes.length; i++) {

            if (this.listaPersonajes[i].idUsuario === parseInt(this.ataque.idPersonaje1) && this.listaPersonajes[i].idUsuario === parseInt(this.ataque.idUsuario1)) {

                let idImagenPersonaje1 = "personaje" + this.listaPersonajes[i].idUsuario + "-" + this.listaPersonajes[i].idUsuario;
                document.getElementById(idImagenPersonaje1).style.opacity = "1";
            }
            
            if (this.listaPersonajes[i].idUsuario === parseInt(this.ataque.idPersonaje2) && this.listaPersonajes[i].idUsuario === parseInt(this.ataque.idUsuario2)) {

                let idImagenPersonaje2 = "personaje" + this.listaPersonajes[i].idUsuario + "-" + this.listaPersonajes[i].idUsuario;
                document.getElementById(idImagenPersonaje2).style.opacity = "1";
            }
        }        

        let contenedorTablero = document.getElementById("contenedorTablero");

        for (let i = 0; i < this.listaBotones.length; i++) {

            let idBoton = "boton" + this.listaBotones[i].id;
            let boton = document.getElementById(idBoton);
            contenedorTablero.removeChild(boton);
        }

        let backendUrl = sessionStorage.getItem("backendURL");
        let url = backendUrl + "/" + "index.php/batallas?ataque=" + JSON.stringify(this.ataque);

        $.ajax({
            url: url,
            method: "POST",
            success: function (provisoriaRespuesta) {

                if (provisoriaRespuesta !== "Ataque registrado.") {

                    $("#alertaVisual").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
                    $("#alertaVisual").addClass("show").removeClass("fade");
                    $("#mensajeAlertaVisual").text("Ha ocurrido un error al intentar registrar el ataque en la base de datos.");

                } else {

                    sessionStorage.setItem("ataquesHabilidadesPrevias", "ATAQUE O HABILIDAD REGISTRADO");
                    this.ataque = {
                        "ataque": "",
                        "defensa": "",
                        "danoPersonaje": "",
                        "danoArmadura": "",
                        "posicion": "",
                        "resultado": "",
                        "idBatalla": "",
                        "idPersonaje1": "",
                        "idPersonaje2": "",
                        "idTurno": ""
                    };
                    this.accionRegistrada = "";                   
                    console.log("SE REGISTRÓ UN ATAQUE EN LA BASE DE DATOS.");
                }
            }
        });    

    } else if (this.accionRegistrada === "HABILIDAD") {
        
        for (let i = 0; i < this.listaPersonajes.length; i++) {

            if (this.listaPersonajes[i].idUsuario === parseInt(this.ataque.idPersonaje1) && this.listaPersonajes[i].idUsuario === parseInt(this.ataque.idUsuario1)) {

                let idImagenPersonaje1 = "personaje" + this.listaPersonajes[i].idUsuario + "-" + this.listaPersonajes[i].idUsuario;
                document.getElementById(idImagenPersonaje1).style.opacity = "1";
            }
            
            if (this.listaPersonajes[i].idUsuario === parseInt(this.ataque.idPersonaje2) && this.listaPersonajes[i].idUsuario === parseInt(this.ataque.idUsuario2)) {

                let idImagenPersonaje2 = "personaje" + this.listaPersonajes[i].idUsuario + "-" + this.listaPersonajes[i].idUsuario;
                document.getElementById(idImagenPersonaje2).style.opacity = "1";
            }
        }        

        let contenedorTablero = document.getElementById("contenedorTablero");

        for (let i = 0; i < this.listaBotones.length; i++) {

            let idBoton = "boton" + this.listaBotones[i].id;
            let boton = document.getElementById(idBoton);
            contenedorTablero.removeChild(boton);
        }

        let backendUrl = sessionStorage.getItem("backendURL");
        let url = backendUrl + "/" + "index.php/batallas?habilidad=" + JSON.stringify(this.habilidad);

        $.ajax({
            url: url,
            method: "POST",
            success: function (provisoriaRespuesta) {

                if (provisoriaRespuesta !== "Habilidad registrada.") {

                    $("#alertaVisual").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
                    $("#alertaVisual").addClass("show").removeClass("fade");
                    $("#mensajeAlertaVisual").text("Ha ocurrido un error al intentar registrar el ataque en la base de datos.");

                } else {

                    sessionStorage.setItem("ataquesHabilidadesPrevias", "ATAQUE O HABILIDAD REGISTRADO");
                    this.habilidad = {
                        "ataque": "",
                        "defensa": "",
                        "danoPersonaje": "",
                        "danoArmadura": "",
                        "posicion": "",
                        "resultado": "",
                        "idBatalla": "",
                        "idPersonaje1": "",
                        "idPersonaje2": "",
                        "idTurno": ""
                    };
                    this.accionRegistrada = "";                   
                    console.log("SE REGISTRÓ UNA HABILIDAD EN LA BASE DE DATOS.");
                }
            }
        });    

    } else if (this.accionRegistrada === "MOVIMIENTO") {

        for (let i = 0; i < this.listaPersonajes.length; i++) {

            if (this.listaPersonajes[i].idPersonaje === 1) {

                let idImagenPersonaje = "personaje" + this.listaPersonajes[i].idPersonaje;
                document.getElementById(idImagenPersonaje).style.opacity = "1";
            }
        }

        let contenedorTablero = document.getElementById("contenedorTablero");

        for (let i = 0; i < this.listaBotones.length; i++) {

            let idBoton = "boton" + this.listaBotones[i].id;
            let boton = document.getElementById(idBoton);
            contenedorTablero.removeChild(boton);
        }
        
        this.moverPersonaje(); 

        /*let backendUrl = sessionStorage.getItem("backendURL");
        let url = backendUrl + "/" + "index.php/batallas?movimiento=" + JSON.stringify(this.movimiento);

        $.ajax({
            url: url,
            method: "POST",
            success: function (provisoriaRespuesta) {
                
                console.log(provisoriaRespuesta);

                if (provisoriaRespuesta !== "Movimiento registrado.") {

                    $("#alertaVisual").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
                    $("#alertaVisual").addClass("show").removeClass("fade");
                    $("#mensajeAlertaVisual").text("Ha ocurrido un error al intentar registrar el movimiento en la base de datos.");

                } else {

                    sessionStorage.setItem("movimientosPrevios", "MOVIMIENTO REGISTRADO");
                    this.movimiento = {
                        "posicion": "",
                        "orientacion": "",
                        "idBatalla": "",
                        "idPersonaje": "",
                        "idUsuarioTurno": "",
                        "idTurno": ""
                    };
                    this.accionRegistrada = "";
                    console.log("SE REGISTRÓ UN MOVIMIENTO EN LA BASE DE DATOS.");
                }
            }
        });*/

    } else if (this.accionRegistrada === "TERMINAR TURNO") {

        let terminarTurno = {            
            "numeroTurno": $("#campoNumeroTurno").val(),          
            "idBatalla": sessionStorage.getItem("idBatalla"),
            "idDesafio": sessionStorage.getItem("idDesafio"),
            "idPersonaje": sessionStorage.getItem("idPersonajeTurno"),
            "idTurno": sessionStorage.getItem("idTurno"),
            "idUsuario": sessionStorage.getItem("idUsuarioTurno")
        };
        let backendUrl = sessionStorage.getItem("backendURL");
        let url = backendUrl + "/" + "index.php/batallas?terminarTurno=" + JSON.stringify(terminarTurno);

        $.ajax({
            url: url,
            method: "PUT",
            success: function (respuesta) {
                
                console.log(respuesta);

                if (respuesta !== "Turno terminado.") {

                    $("#alertaVisual").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
                    $("#alertaVisual").addClass("show").removeClass("fade");
                    $("#mensajeAlertaVisual").text("Ha ocurrido un error al intentar registrar el termino del turno en la base de datos.");

                } else {

                    sessionStorage.setItem("ataquesHabilidadesPrevias", "SIN ATAQUES O HABILIDADES PREVIAS");
                    sessionStorage.setItem("movimientosPrevios", "SIN MOVIMIENTOS PREVIOS");
                    sessionStorage.setItem("botonesPresionados", "SIN BOTONES PRESIONADOS");
                    this.ataque = {
                        "posicion": "",
                        "ataque": "",
                        "defensa": "",
                        "dano": "",
                        "resultado": "",
                        "idPersonaje1": "",
                        "idPersonaje2": "",
                        "idTurno": "",
                        "idBatalla": ""
                    };
                    this.habilidad = {
                        "posicion": "",
                        "ataque": "",
                        "defensa": "",
                        "dano": "",
                        "resultado": "",
                        "idPersonaje1": "",
                        "idPersonaje2": "",
                        "idTurno": "",
                        "idBatalla": ""
                    };
                    this.movimiento = {
                        "posicion": "",
                        "orientacion": "",
                        "idPersonaje": "",
                        "idUsuarioTurno": "",
                        "idTurno": ""
                    };
                    this.accionRegistrada = "";
                    console.log("SE REGISTRÓ EL TÉRMINO DE UN TURNO EN LA BASE DE DATOS.");
                }
            }
        });

    } else if (this.accionRegistrada === "TERMINAR BATALLA") {

        let terminarBatalla = {

            "idBatalla": sessionStorage.getItem("idBatalla"),
            "idUsuario": sessionStorage.getItem("idUsuario")
        };
        let backendUrl = sessionStorage.getItem("backendURL");
        let url = backendUrl + "/" + "index.php/batallas?terminarBatalla=" + JSON.stringify(terminarBatalla);

        $.ajax({
            url: url,
            method: "PUT",
            success: function (provisoriaRespuesta) {

                if (provisoriaRespuesta !== "La batalla ha terminado.") {

                    $("#alertaVisual").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
                    $("#alertaVisual").addClass("show").removeClass("fade");
                    $("#mensajeAlertaVisual").text("Ha ocurrido un error al intentar registrar que sea que se rendido en la base de datos.");
                    
                } else {
                    
                    console.log("SE REGISTRÓ EL TÉRMINO DE UNA BATALLA EN LA BASE DE DATOS.");                    
                }
            }
        });
    }
}

function atacarPersonaje(idAtaque, ataque, danoArmadura, danoPersonaje, defensa, resultado, provisorioIdPersonaje2, provisorioIdUsuario2) {

    let idPersonajeTurno = parseInt(sessionStorage.getItem("idPersonajeTurno"));
    let idUsuarioTurno = parseInt(sessionStorage.getItem("idUsuarioTurno"));  
    let idUsuario = parseInt(sessionStorage.getItem("idUsuario")); 
    let usuarioTurno = false; 
    let personajeMedico = false;
    let nuevaSalud = 0;
    let idPersonaje2 = parseInt(provisorioIdPersonaje2);
    let idUsuario2 = parseInt(provisorioIdUsuario2);
    
    for (let i = 0; i < this.listaPersonajes.length; i++) {
        
        if (this.listaPersonajes[i].idPersonaje === idPersonajeTurno) {

            if (this.listaPersonajes[i].categoria === "Medico") {

                personajeMedico = true;
            }
        }

        if (this.listaPersonajes[i].idPersonaje === idPersonajeTurno && this.listaPersonajes[i].idUsuario === idUsuario && idUsuarioTurno === idUsuario) {

            if (this.listaPersonajes[i].idUsuario === idUsuario) {

                usuarioTurno = true;
            }
        }
        
        if (this.listaPersonajes[i].idPersonaje === idPersonaje2 && this.listaPersonajes[i].idUsuario === idUsuario2) {
            
            if (personajeMedico === false) {

                let provisoriaArmadura = parseInt(this.listaPersonajes[i].provisoriaArmadura);
                let nuevaProvisoriaArmadura = (provisoriaArmadura - parseInt(danoArmadura));
                this.listaPersonajes[i].provisoriaArmadura = nuevaProvisoriaArmadura;
                let provisoriaSalud = parseInt(this.listaPersonajes[i].provisoriaSalud);
                let nuevaProvisoriaSalud = (provisoriaSalud - parseInt(danoPersonaje));
                this.listaPersonajes[i].provisoriaSalud = nuevaProvisoriaSalud;
                $("#campoArmaduraPersonaje2").val(this.listaPersonajes[i].provisoriaArmadura + "/" + this.listaPersonajes[i].armadura);
                $("#campoSaludPersonaje2").val(this.listaPersonajes[i].provisoriaSalud + "/" + this.listaPersonajes[i].salud);
                let imagenRetratoPersonaje = `../../Imagenes/Personajes/Retratos/${this.listaPersonajes[i].categoria}/${this.listaPersonajes[i].color}.png`;
                document.getElementById("retratoPersonaje2").src = imagenRetratoPersonaje;

                if (nuevaProvisoriaSalud <= 0) {

                    let idImagenPersonaje2 = "personaje" + idPersonaje2 + "-" + idUsuario2;
                    document.getElementById(idImagenPersonaje2).src = "../../Imagenes/Personajes/Miniaturas/Gris/Muerto.png";
                }
                
            } else {
                
                let provisoriaArmadura = parseInt(this.listaPersonajes[i].provisoriaArmadura);
                let nuevaProvisoriaArmadura = (provisoriaArmadura - 0);
                this.listaPersonajes[i].provisoriaArmadura = nuevaProvisoriaArmadura;
                let provisoriaSalud = parseInt(this.listaPersonajes[i].provisoriaSalud);
                let nuevaProvisoriaSalud = (provisoriaSalud + parseInt(ataque));
                nuevaSalud = nuevaProvisoriaSalud;
                this.listaPersonajes[i].provisoriaSalud = nuevaProvisoriaSalud;
                $("#campoArmaduraPersonaje2").val(this.listaPersonajes[i].provisoriaArmadura + "/" + this.listaPersonajes[i].armadura);
                $("#campoSaludPersonaje2").val(this.listaPersonajes[i].provisoriaSalud + "/" + this.listaPersonajes[i].salud);
                let imagenRetratoPersonaje = `../../Imagenes/Personajes/Retratos/${this.listaPersonajes[i].categoria}/${this.listaPersonajes[i].color}.png`;
                document.getElementById("retratoPersonaje2").src = imagenRetratoPersonaje;                
            }
        }
    }
    
    if (personajeMedico === false) {
        
        $(botonAnimacion).removeClass("btn-success");
        $(botonAnimacion).addClass("btn-danger");
        $(iconoAnimacion).removeClass("fa-solid fa-hand-holding-medical");
        $(iconoAnimacion).addClass("fa-solid fa-hand-fist");

        $("#tituloPanelAnimacion").text(resultado);
        $("#ataque").text("ATAQUE: " + ataque + "!");
        $("#defensa").text("DEFENSA: " + defensa + "!");
        $("#danoArmadura").text("ARMADURA: " + "- " + danoArmadura + "!");
        $("#danoPersonaje").text("SALUD PERSONAJE: " + "- " + danoPersonaje + "!");
        $("#panelAnimacion").modal("show");

    } else {
        
        $(botonAnimacion).removeClass("btn-danger");
        $(botonAnimacion).addClass("btn-success");
        $(iconoAnimacion).removeClass("fa-solid fa-hand-fist");
        $(iconoAnimacion).addClass("fa-solid fa-hand-holding-medical");

        $("#tituloPanelAnimacion").text("SANACION EL PERSONAJE RECUPERA" + ataque + "PUNTOS DE SALUD.");
        $("#ataque").text("SANACIÓN : +" + ataque + "!");
        $("#defensa").text("DEFENSA: " + defensa + "!");
        $("#danoArmadura").text("ARMADURA: " + danoArmadura + "!");
        $("#danoPersonaje").text("SALUD PERSONAJE: " + nuevaSalud + "!");
        $("#panelAnimacion").modal("show");
    }
    
    let numeroImagen = 1;
    let velocidadAnimacion = 250;
    
    setTimeout(function () {
        
        setTimeout(function () {
            
            clearInterval(idFuncionRepetitiva);
            $("#campoNombrePersonaje2").val("");
            $("#campoArmaduraPersonaje2").val("");
            $("#campoSaludPersonaje2").val("");            
            let imagenRetratoPersonaje = `../../Imagenes/Personajes/Retratos/sinRetrato.png`;
            document.getElementById("retratoPersonaje2").src = imagenRetratoPersonaje;
            $("#panelAnimacion").modal("hide");
            borrarCuadradosBotones();            

            if (usuarioTurno === true) {

                let terminarAtaque = {

                    "idAtaque": idAtaque
                };
                let backendUrl = sessionStorage.getItem("backendURL");
                let url = backendUrl + "/" + "index.php/batallas?terminarAtaque=" + JSON.stringify(terminarAtaque);

                $.ajax({
                    url: url,
                    method: "PUT",
                    success: function (provisoriaRespuesta) {

                        if (provisoriaRespuesta !== "Ataque terminado.") {

                            $("#alertaVisual").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
                            $("#alertaVisual").addClass("show").removeClass("fade");
                            $("#mensajeAlertaVisual").text("Ha ocurrido un error al intentar registrar el termino del ataque en la base de datos.");

                        } else {

                            sessionStorage.setItem("botonesPresionados", "SIN BOTONES PRESIONADOS");                            
                            console.log("SE TERMINÓ DE REALIZAR UN ATAQUE Y SE REGISTRÓ EN LA BASE DE DATOS.");
                            buscarTurno();
                        }
                    }
                });

            } else {

                buscarTurno();
            }

        }, 5000); 
        
        let ataqueSanacion;
        
        if (personajeMedico === false) {            
            
            ataqueSanacion = "Ataques";
            
        } else {

            ataqueSanacion = "Sanacion";
        }

        function animarAtaque() {

            let imagen = `../../Imagenes/${ataqueSanacion}/${numeroImagen}.png`;
            document.getElementById("animacionAtaqueHabilidad").src = imagen;
            numeroImagen++;
            console.log("SE ESTÁ REALIZANDO UN ATAQUE...");

            if (numeroImagen === 7) {

                numeroImagen = 1;
            }
        }

        idFuncionRepetitiva = setInterval(animarAtaque, velocidadAnimacion);

    }, 1000);
}

function moverPersonaje() {
    
    let idPersonajeTurno = 1;
    
    console.log("SE ESTA EJECUTANDO EL MOVIMIENTO...");
    let idImagenPersonajeTurno = "personaje" + idPersonajeTurno;
    let colorPersonaje;
    let categoriaPersonaje;
    let nombrePersoanje;
    
    let posicionInicial; 
    let columnaInicial;
    let filaInicial;
    
    for (let i = 0; i < this.listaPersonajes.length; i++) {

        if (this.listaPersonajes[i].idPersonaje === idPersonajeTurno) {
            
            posicionInicial = this.listaPersonajes[i].posicion;
            break;
            
            /*let imagen = `../../Imagenes/Movimientos/1.png`;
            document.getElementById(idImagenPersonajeTurno).src = imagen;
            document.getElementById(idImagenPersonajeTurno).style.opacity = "1";
            categoriaPersonaje = this.listaPersonajes[i].categoria;
            colorPersonaje = this.listaPersonajes[i].color;
            nombrePersoanje = this.listaPersonajes[i].nombre;
            posicionInicial = this.listaPersonajes[i].posicion;*/            
        }
    }
    
    for (let i = 0; i < this.listaPosiciones.length; i++) {
        
        if (this.listaPosiciones[i].nombre === posicionInicial) {
            
            columnaInicial = this.listaPosiciones[i].columna;
            filaInicial = this.listaPosiciones[i].fila;
        }
        
        if (this.listaPosiciones[i].nombre === posicionInicial) {
            
            columnaInicial = this.listaPosiciones[i].columna;
            filaInicial = this.listaPosiciones[i].fila;
        }
    }
    
    console.log("POSICION: " + posicionInicial + " COLUMNA: " + columnaInicial + " FILA: " + filaInicial);
    
    /*let coordenadaXFlechaMovimiento;
    let coordenadaYFlechaMovimiento;
    let profundidadFlechaMovimiento;
    
    for (let i = 0; i < this.listaPosiciones.length; i++) {

        if (this.listaPosiciones[i].nombre === posicionFinal) {

            coordenadaXFlechaMovimiento = (this.listaPosiciones[i].coordenadaX + 4);
            coordenadaYFlechaMovimiento = (this.listaPosiciones[i].coordenadaY - 44);
            profundidadFlechaMovimiento = this.listaPosiciones[i].profundidad;

        }
    }
    
    let plantillaFlechaMovimiento = `<img `;
    plantillaFlechaMovimiento += `height="68px" `;
    plantillaFlechaMovimiento += `id="flechaMovimiento" `;
    plantillaFlechaMovimiento += `src="../../Imagenes/Movimientos/5.png" `;
    plantillaFlechaMovimiento += `style="left: ${coordenadaXFlechaMovimiento}px; position: absolute; top: ${coordenadaYFlechaMovimiento}px; z-index: ${profundidadFlechaMovimiento};" `;
    plantillaFlechaMovimiento += `width="44px">`;
    $("#contenedorTablero").append(plantillaFlechaMovimiento);
    let idUsuario = parseInt(sessionStorage.getItem("idUsuario"));
    let usuarioTurno = false; 
    
    if (idUsuario === idUsuarioTurno) {
        
        usuarioTurno = true; 
        
    } else {
        
        usuarioTurno = false;         
    }

    function terminarMovimiento() {

        clearInterval(idFuncionRepetitiva);
        let coordenadaX;
        let coordenadaY;        
        let profundidadPersonaje;

        for (let i = 0; i < this.listaPosiciones.length; i++) {

            if (this.listaPosiciones[i].nombre === posicionInicial) {

                this.listaPosiciones[i].disponibilidad = true;
            }

            if (this.listaPosiciones[i].nombre === posicionFinal) {

                this.listaPosiciones[i].disponibilidad = false;
                
                if (orientacion === "Arriba" || orientacion === "Derecha") {

                    coordenadaX = (this.listaPosiciones[i].coordenadaX + 4);
                    coordenadaY = (this.listaPosiciones[i].coordenadaY - 44);

                } else if (orientacion === "Abajo" ) {

                    coordenadaX = (this.listaPosiciones[i].coordenadaX + 8);
                    coordenadaY = (this.listaPosiciones[i].coordenadaY - 44);
                    
                } else {
                    
                    coordenadaX = (this.listaPosiciones[i].coordenadaX + 8);
                    coordenadaY = (this.listaPosiciones[i].coordenadaY - 44);                    
                }
                
                profundidadPersonaje = this.listaPosiciones[i].profundidad;
            }
        }

        for (let i = 0; i < this.listaPersonajes.length; i++) {

            let idImagenPersonaje = "personaje" + this.listaPersonajes[i].idPersonaje + "-" + this.listaPersonajes[i].idUsuario;
            document.getElementById(idImagenPersonaje).style.opacity = "1";

            if (this.listaPersonajes[i].idPersonaje === idPersonajeTurno && this.listaPersonajes[i].idUsuario === idUsuarioTurno) {

                this.listaPersonajes[i].posicion = posicionFinal;
                let imagen = `../../Imagenes/Personajes/Miniaturas/${colorPersonaje}/${categoriaPersonaje}/${orientacionPersonaje}.png`;
                document.getElementById(idImagenPersonajeTurno).src = imagen;
                document.getElementById(idImagenPersonajeTurno).style.left = coordenadaX + "px";
                document.getElementById(idImagenPersonajeTurno).style.position = "absolute";
                document.getElementById(idImagenPersonajeTurno).style.title = nombrePersoanje;
                document.getElementById(idImagenPersonajeTurno).style.top = coordenadaY + "px";
                document.getElementById(idImagenPersonajeTurno).style.zIndex = profundidadPersonaje;
            }
        }
        
        let contenedorTablero = document.getElementById("contenedorTablero");  

        for (let i = 0; i < this.listaCuadrados.length; i++) {

            let idCuadrado = "cuadrado" + this.listaCuadrados[i].id;
            let cuadrado = document.getElementById(idCuadrado);           
            contenedorTablero.removeChild(cuadrado);
        }

        this.listaCuadrados = [];
        let cuadradoSeleccionado = document.getElementById("cuadradoSeleccionado");
        let flechaMovimiento = document.getElementById("flechaMovimiento");
        contenedorTablero.removeChild(cuadradoSeleccionado);
        contenedorTablero.removeChild(flechaMovimiento);
               
        if (usuarioTurno === true) {

            let terminarMovimiento = {                
                "idMovimiento": idMovimiento
            };
            let backendUrl = sessionStorage.getItem("backendURL");
            let url = backendUrl + "/" + "index.php/batallas?terminarMovimiento=" + JSON.stringify(terminarMovimiento);

            $.ajax({
                url: url,
                method: "PUT",
                success: function (provisoriaRespuesta) {

                    if (provisoriaRespuesta !== "Movimiento terminado.") {

                        $("#alertaVisual").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
                        $("#alertaVisual").addClass("show").removeClass("fade");
                        $("#mensajeAlertaVisual").text("Ha ocurrido un error al intentar registrar el termino del movimiento en la base de datos.");

                    } else {
                        
                        sessionStorage.setItem("accionesEjecucion", "SIN ACCIONES EN EJECUCION");                        
                        sessionStorage.setItem("botonesPresionados", "SIN BOTONES PRESIONADOS");
                        console.log("SE TERMINÓ DE REALIZAR UN MOVIMIENTO Y SE REGISTRÓ EN LA BASE DE DATOS.");
                        buscarTurno();
                    }
                }
            });
            
        } else {
                        
            buscarTurno();
        }
    }
    
    let velocidadAnimacion = 250;
    let numeroImagen1 = 1;
    let numeroImagen2 = 5;
    let numeroCiclos = 0;

    function animacion() {

        let imagen1 = `../../Imagenes/Movimientos/${numeroImagen1}.png`;
        let imagen2 = `../../Imagenes/Movimientos/${numeroImagen2}.png`;
        document.getElementById(idImagenPersonajeTurno).src = imagen1;
        document.getElementById("flechaMovimiento").src = imagen2;
        numeroImagen1++;
        numeroImagen2++;
        
        if (numeroImagen1 === 4) {
            
            numeroImagen1 = 1;
            numeroImagen2 = 5; 
            numeroCiclos++;
            
            if (numeroCiclos === 5) {
                
                terminarMovimiento();                
            }
        }
    }

    idFuncionRepetitiva = setInterval(animacion, velocidadAnimacion);*/
}

function obtenerDatosPersonaje () {
    
    let idPersonajeTurno = 1;
    let idUsuarioTurno = 1;    
    let idUsuario1 = parseInt(sessionStorage.getItem("idUsuario1"));    
    let colorUsuario1 = sessionStorage.getItem("colorUsuario1");
    let colorUsuario2 = sessionStorage.getItem("colorUsuario2");
    let nombreUsuario1 = sessionStorage.getItem("nombreUsuario1");
    let nombreUsuario2 = sessionStorage.getItem("nombreUsuario2");
    let personajeMedico = false;
    
    for (let i = 0; i < this.listaPersonajes.length; i++) {
        
        if (this.listaPersonajes[i].idPersonaje === idPersonajeTurno && this.listaPersonajes[i].idUsuario === idUsuarioTurno) {
            
            $("#campoNombrePersonaje1").val(this.listaPersonajes[i].nombre);            
            $("#campoArmaduraPersonaje1").val(this.listaPersonajes[i].provisoriaArmadura + "/" + this.listaPersonajes[i].armadura);
            $("#campoSaludPersonaje1").val(this.listaPersonajes[i].provisoriaSalud + "/" + this.listaPersonajes[i].salud);            
            document.getElementById("botonHabilidad").title = (this.listaPersonajes[i].nombreHabilidad + ": " + this.listaPersonajes[i].descripcionHabilidad);
            let imagenRetratoPersonaje;
            
            if (this.listaPersonajes[i].categoria === "Medico") {
                
                personajeMedico = true;
                
            }
            
            if (this.listaPersonajes[i].idPersonaje === idPersonajeTurno && this.listaPersonajes[i].idUsuario === idUsuarioTurno && idUsuarioTurno === idUsuario1) {
                
                imagenRetratoPersonaje = `../../Imagenes/Personajes/Retratos/${this.listaPersonajes[i].categoria}/${colorUsuario1}.png`;
                document.getElementById("retratoPersonaje1").src = imagenRetratoPersonaje; 
                $("#campoNombreJugador").val(nombreUsuario1);  
                
            } else {
                
                imagenRetratoPersonaje = `../../Imagenes/Personajes/Retratos/${this.listaPersonajes[i].categoria}/${colorUsuario2}.png`;
                document.getElementById("retratoPersonaje1").src = imagenRetratoPersonaje;
                $("#campoNombreJugador").val(nombreUsuario2); 
            } 
            
            let idUsuario = parseInt(sessionStorage.getItem("idUsuario"));
            
            if (this.listaPersonajes[i].idUsuario === idUsuarioTurno && idUsuarioTurno === idUsuario) {
                               
                $("#botonAtaque").removeAttr("disabled");
                $("#botonAtaque").addClass("btn-danger").removeClass("btn-outline-danger");
                $("#botonHabilidad").removeAttr("disabled");
                $("#botonHabilidad").addClass("btn-success").removeClass("btn-outline-success");
                $("#botonMovimiento").removeAttr("disabled");
                $("#botonMovimiento").addClass("btn-primary").removeClass("btn-outline-primary");
                $("#botonCancelarAccion1").removeAttr("disabled");
                $("#botonCancelarAccion1").addClass("btn-danger").removeClass("btn-outline-danger"); 
                
            }
        }        
    }   
}

/*function buscarTurno() {  
    
    function buscar() { 
        
        let batalla = {
            "id": sessionStorage.getItem("idBatalla")
        };        
        let backendUrl = sessionStorage.getItem("backendURL");
        let url = backendUrl + "/" + "index.php/batallas?batalla=" + JSON.stringify(batalla);

        $.ajax({
            url: url,
            method: "GET",
            success: function (RespuestaExterior) {

                if (RespuestaExterior === "La batalla ha terminado.") {
                    
                    clearInterval(idFuncionRepetitiva);
                    console.log("LA BATALLA HA TERMINADO.");
                    let resultadoBatalla = {
                        "idBatalla": sessionStorage.getItem("idBatalla"),                        
                        "idUsuario": sessionStorage.getItem("idUsuario")  
                    };                    
                    url = backendUrl + "/" + "index.php/batallas?resultadoBatalla=" + JSON.stringify(resultadoBatalla);

                    $.ajax({
                        url: url,
                        method: "GET",
                        success: function (provisoriaRespuestaInterior) {                           
                            
                            let respuestaInterior = JSON.parse(provisoriaRespuestaInterior);

                            if (respuestaInterior[0].resultadoBatalla === "VICTORIA") {
                                
                                $("#panelMensajesVictoria").modal("show");

                            } else if (respuestaInterior[0].resultadoBatalla === "DERROTA") {

                                $("#panelMensajesDerrota").modal("show");
                            }
                        }
                    });
                    
                } else {   
                    
                    let provisoriaRespuestaTurno = JSON.parse(RespuestaExterior);
                    console.log(provisoriaRespuestaTurno);
                    let idTurno =  parseInt(provisoriaRespuestaTurno[0].idTurno);
                    sessionStorage.setItem("idTurno", provisoriaRespuestaTurno[0].idTurno);
                    sessionStorage.setItem("idPersonajeTurno", provisoriaRespuestaTurno[0].idPersonaje);
                    sessionStorage.setItem("idUsuarioTurno", provisoriaRespuestaTurno[0].idUsuario);
                    $("#campoNumeroTurno").val(parseInt(provisoriaRespuestaTurno[0].numeroTurno)); 
                    $("#panelMensajeCarga").modal("hide");
                    
                    if (provisoriaRespuestaTurno[0].idAtaque !== "SIN ATAQUES") {
                        
                        clearInterval(idFuncionRepetitiva);
                        console.log("SE DETUVO EL BUSCADOR DE TURNOS.");                        
                        let obtenerAtaque = {  
                            "idTurno": idTurno
                        };                        
                        url = backendUrl + "/" + "index.php/batallas?obtenerAtaque=" + JSON.stringify(obtenerAtaque);

                        $.ajax({
                            url: url,
                            method: "GET",
                            success: function (provisoriaRespuestaInterior) {
                                
                                let respuestaInterior = JSON.parse(provisoriaRespuestaInterior); 
                                console.log("SE ENCONTRÓ UN ATAQUE REGISTRADO EN LA BASE DE DATOS.");                                
                                let idUsuario = parseInt(sessionStorage.getItem("idUsuario"));
                                
                                if (idUsuario !== parseInt(respuestaInterior[0].idUsuario1)) {

                                    crearCuadradosAtaqueHabilidadMovimiento("ATAQUE", respuestaInterior[0].posicion);
                                }
                                
                                atacarPersonaje(respuestaInterior[0].idAtaque, respuestaInterior[0].ataque, respuestaInterior[0].danoArmadura, respuestaInterior[0].danoPersonaje, respuestaInterior[0].defensa, respuestaInterior[0].resultado, respuestaInterior[0].idPersonaje2, respuestaInterior[0].idUsuario2);
                            }
                        });
                    }
                    
                    if (provisoriaRespuestaTurno[0].idMovimiento !== "SIN MOVIMIENTO") {
                        
                        clearInterval(idFuncionRepetitiva);
                        console.log("SE DETUVO EL BUSCADOR DE TURNOS.");                        
                        let obtenerMovimiento = {     
                            "idTurno": idTurno
                        };                                            
                        url = backendUrl + "/" + "index.php/batallas?obtenerMovimiento=" + JSON.stringify(obtenerMovimiento);

                        $.ajax({
                            url: url,
                            method: "GET",
                            success: function (provisoriaRespuestaInterior) {
                                
                                let respuestaInterior = JSON.parse(provisoriaRespuestaInterior); 
                                console.log("SE ENCONTRÓ UN MOVIMIENTO REGISTRADO EN LA BASE DE DATOS.");                                
                                let idUsuario = parseInt(sessionStorage.getItem("idUsuario"));
                                
                                if (idUsuario !== parseInt(respuestaInterior[0].idUsuario)) {

                                    crearCuadradosAtaqueHabilidadMovimiento("MOVIMIENTO", respuestaInterior[0].posicion);
                                }

                                moverPersonaje(respuestaInterior[0].idMovimiento,respuestaInterior[0].orientacion, respuestaInterior[0].posicion);
                            }
                        });
                    } 
                    
                    obtenerDatosPersonaje();
                }
            }
        });
        console.log("SE ESTÁ EJECUTANDO EL BUSCADOR DE TURNOS...");
    }

    idFuncionRepetitiva = setInterval(buscar, 2000);
}*/
