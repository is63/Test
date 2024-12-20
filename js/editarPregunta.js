window.addEventListener("DOMContentLoaded", function () {

    //Boton de Guardar
    let botonGuardar = this.document.getElementById("botonGuardar");

    //Boton de cancelar
    let botonCancelar = this.document.getElementById("botonCancelar");

    //Guardo los botones del Footer de Volver y Salir
    let botonVolver = document.getElementById("botonVolver");
    let botonSalir = document.getElementById("botonSalir");


    //Recupero el usuario que ha iniciado Sesion
    let usuarioSesion = (localStorage.getItem("usuarioSesion"));

    //Si no hay un usuario registrado o esta vacio, redirige al index para iniciar sesion
    if (usuarioSesion == "" || usuarioSesion == undefined) {
        window.location.href = "index.html";
    }

    //Crear array de preguntas que no se borre como en el index
    let preguntas = [];
    //Si el localStorage de preguntas existe lo almaceno en preguntas
    if (localStorage.getItem("preguntas")) {
        preguntas = JSON.parse(localStorage.getItem("preguntas"));
    }

    //Guardo el array de categorias
    let categorias = JSON.parse(localStorage.getItem("categorias"));
    //Si no existe el array de categorías lo creo de nuevo
    if (!categorias) {
        categorias = ["ADAS", "Señales", "Carreteras"];
        localStorage.setItem("categorias", JSON.stringify(categorias));
    }

    //Guardo el select donde aparecen las categorias
    let selectCategoria = document.getElementById("selectCategorias");

    //Recorro el array de categorias para mostrarlo en el select
    categorias.forEach(categoria => {
        //Creo el elemento option, le asigno el valor y lo añado al select
        let opcion = document.createElement("option");
        opcion.setAttribute("value", categoria);
        opcion.textContent = categoria;
        selectCategoria.appendChild(opcion);

    });

    //guardo el titulo para mostrar mas adelante el mensaje de error abajo suyo
    let titulopreguntas = this.document.getElementById("editarPreguntas").firstElementChild;


    //Creo un elemento p para mostrar el mensaje de error por si la pregunta en blanco
    let mensajeErrorPregunta = document.createElement("p");
    //Pongo el mensaje en blaco para que sea flash y se vacie al actualizar
    mensajeErrorPregunta.textContent = "";

    //Creo un elemento p para mostrar el mensaje de error por si no se elige categoria
    let mensajeErrorCategoria = document.createElement("p");
    //Pongo el mensaje en blaco para que sea flash y se vacie al actualizar
    mensajeErrorCategoria.textContent = "";

    //Creo un elemento p para mostrar el mensaje de error por si hay una respuesta en blanco
    let mensajeErrorRespuestas = document.createElement("p");
    //Pongo el mensaje el blanco por si falla mas de 1 vez no se acumulen
    mensajeErrorRespuestas.textContent = "";

    //Creo un elemento p para mostrar el mensaje de error por si no se ha seleccionado ninguna respuesta como correcta
    let mensajeErroCorrecta = document.createElement("p");
    mensajeErroCorrecta.textContent = "";


    //Guardo el elemento donde se va a mostrar el rol que se ha seleccionado
    let mostrarRol = document.getElementById("rol");

    //Recupero el rol seleccionado en la página anterior
    let rol = localStorage.getItem("rolSesion");

    //si esta vacio o no existe, hago una redireccion al index para que inicie Sesion
    if (rol == "" || rol == undefined) {
        window.location.href = "index.html";
    }
    //Si el rol no esta vacio, lo muestro en elemento del header
    else {
        //Creo un elemento a para guardarlo y le doy un estilo
        let mensajeRol = document.createElement("a");
        mensajeRol.style.color = "green";
        mensajeRol.textContent = rol;
        //Lo muestro en el Header
        mostrarRol.append(mensajeRol);
    }


    //Boton de Guardar  
    botonGuardar.addEventListener("click", function (event) {
        event.preventDefault();

        //  Guardo los valores del formulario  

        let pregunta = document.getElementById("pregunta").value;

        let categoria = document.getElementById("selectCategorias").value;

        let respuesta1 = document.getElementById("respuesta1").value;

        let respuesta2 = document.getElementById("respuesta2").value;

        let respuesta3 = document.getElementById("respuesta3").value;

        // Guardo los valores del radiobutton
        let valores = document.getElementsByName("respuestaCorrecta");
        let valorCorrecto;

        //Recorro el radiobutton buscando el valor seleccionado
        for (let i = 0; i < valores.length; i++) {

            if (valores[i].checked) {//Si el valor esta selecionado
                valorCorrecto = valores[i].value; //guardo el valor selecionado 
                break; //Salgo del bucle
            }
        }

        //  Si no hay seleccionada una respuesta correcta salta un mensaje de error de debajo del titulo 
        if (valorCorrecto == undefined || valorCorrecto == "" || valorCorrecto == null) {
            //Le doy un estilo al mensaje de error
            mensajeErroCorrecta.textContent = "Selecciona una respuesta correcta";
            mensajeErroCorrecta.style.color = "red";
            mensajeErroCorrecta.style.margin = "1.5vh";
            mensajeErroCorrecta.style.textAlign = "center";
            mensajeErroCorrecta.style.fontWeight = "bolder";
            mensajeErroCorrecta.style.fontSize = "20px";

            titulopreguntas.after(mensajeErroCorrecta);

        }

        //  Si las algunas de las preguntas esta en blanco salta un mensaje de error de debajo del titulo 
        if (respuesta1 == "" || respuesta2 == "" || respuesta3 == "") {
            //Le doy un estilo al mensaje de error
            mensajeErrorRespuestas.textContent = "Completa las respuestas";
            mensajeErrorRespuestas.style.color = "red";
            mensajeErrorRespuestas.style.margin = "1.5vh";
            mensajeErrorRespuestas.style.textAlign = "center";
            mensajeErrorRespuestas.style.fontWeight = "bolder";
            mensajeErrorRespuestas.style.fontSize = "20px";

            titulopreguntas.after(mensajeErrorRespuestas);

        }

        if (!categoria) {
            //Le doy un estilo al mensaje de error
            mensajeErrorCategoria.textContent = "Selecciona una categoria valida";
            mensajeErrorCategoria.style.color = "red";
            mensajeErrorCategoria.style.margin = "1.5vh";
            mensajeErrorCategoria.style.textAlign = "center";
            mensajeErrorCategoria.style.fontWeight = "bolder";
            mensajeErrorCategoria.style.fontSize = "20px";

            titulopreguntas.after(mensajeErrorCategoria);
        };

        //Si la pregunta esta en blanco, muestro un mensaje de error debajo del titulo        
        if (pregunta == "" || pregunta.replace(/\s+/g, '').trim()) { //El .replace ese con el trim() es para intentar quitar los espacios en blanco y saltos de linea (no lo hace completamente pero algo ayuda, ademas de que el codigo esta estructurado segun lo que devuelve esto a si que si lo cambio no funcionara casi nada relacionado con las preguntas)
            //Le doy un estilo al mensaje de error
            mensajeErrorPregunta.textContent = "Completa la pregunta";
            mensajeErrorPregunta.style.color = "red";
            mensajeErrorPregunta.style.margin = "1.5vh";
            mensajeErrorPregunta.style.textAlign = "center";
            mensajeErrorPregunta.style.fontWeight = "bolder";
            mensajeErrorPregunta.style.fontSize = "20px";

            titulopreguntas.after(mensajeErrorPregunta);

        }

        //Si los campos anteriores estan completos, dejo el mensaje de error en blanco para eliminarlo de la vista 
        if (!(respuesta1 == "" || respuesta2 == "" || respuesta3 == "")) {
            mensajeErrorRespuestas.textContent = "";
        } if (!(valorCorrecto == undefined || valorCorrecto == "" || valorCorrecto == null)) {
            mensajeErroCorrecta.textContent = "";
        }
        if (!(pregunta == "")) {
            mensajeErrorPregunta.textContent = ""
        }

        //Si algunos hay algun error detengo la ejecucion de la página
        if (
            (valorCorrecto == undefined || valorCorrecto == "" || valorCorrecto == null)
            || (respuesta1 == "" || respuesta2 == "" || respuesta3 == "")
            || (pregunta == "" || (categoria == ""))
        ) {
            console.log("deberia detenerse la ejecuccion del programa");
            return;
        }

        //Si no hay ningun error guardo la pregunta en el array de preguntas y lo almaceno en el LocalStorage
        else {
            let preguntaCompleta = `${pregunta} | ${categoria} | ${respuesta1} | ${respuesta2} | ${respuesta3} | ${valorCorrecto}`;
            preguntas.push(preguntaCompleta);

            localStorage.setItem("preguntas", JSON.stringify(preguntas));

            //Redirecciono a la pagina de Gestionar Preguntas
            window.location.href = "gestionPreguntas.html";
        }

    });

    //  Boton de Cancelar  //
    botonCancelar.addEventListener("click", function (event) { //si cancela se refresca la pagina para que se pierda lo introducido
        event.preventDefault();
        window.location.reload();
    });

    //  Boton de Volver del Footer  //
    botonVolver.addEventListener("click", () => {
        //Redirecciona a la página anterior 
        window.location.href = "elegirExamen.html";
    });

    botonSalir.addEventListener("click", function () {
        //Redireccciona al index a que inicie sesion de nuevo
        window.location.href = "index.html";

    });

});