
const preguntaEscrita = document.getElementById('preguntaEscrita'); //input de texto
const preguntasContainer = document.getElementById('preguntasContainer');
const botonSubir = document.getElementById('botonSubir');
const contenidoPrevioHistorico = document.getElementById('contenidoPrevioHistorico');
let preguntaArriba;

const database = firebase.database();

registrarPregunta = () => {
    if (preguntaEscrita.value === '') {
        alert('campo Vacio');
        return;
    }
    else {
        if (preguntaArriba === undefined) {

            let referencia = database.ref('preguntas').push();
            let publicacionPregunta = {
                id: referencia.key,
                nivel: 1, //nivel de las preguntas
                pregunta: preguntaEscrita.value, //que escriba el texto de la pregunta
            };

            preguntaArriba = publicacionPregunta;

            referencia.set(publicacionPregunta);
        }
        else {
            //console.log (preguntaArriba);
            preguntaArriba.nivel = 2;
            database.ref('preguntas/' + preguntaArriba.id).set(preguntaArriba);

            let referencia = database.ref('preguntas').push();
            let publicacionPregunta = {
                id: referencia.key,
                nivel: 1, //nivel de las preguntas
                pregunta: preguntaEscrita.value, //que escriba el texto de la pregunta
            };

            preguntaArriba = publicacionPregunta;

            referencia.set(publicacionPregunta);
        }
    }



    preguntaEscrita.value = '';
}

botonSubir.addEventListener('click', registrarPregunta);

database.ref('preguntas').on('value', function (data) {
    preguntasContainer.innerHTML = ""; //para que se puedan crear nuevas tareas sin que se copien

    data.forEach(
        publicacionPregunta => {
            let valor = publicacionPregunta.val();

            if (valor.nivel === 1) {

            preguntasContainer.innerHTML = ''
            let bloquePregunta = new Pregunta(valor);
            preguntasContainer.appendChild(bloquePregunta.render());

            }


            

        }
    )
});

database.ref('preguntas').on('value', function (data) {
    contenidoPrevioHistorico.innerHTML = ""; //para que se puedan crear nuevas tareas sin que se copien

    data.forEach(
        publicacionPregunta => {
            let valor = publicacionPregunta.val();

            if (valor.nivel === 2) {

            contenidoPrevioHistorico.value = ''
            let bloquePregunta = new Pregunta(valor);
            contenidoPrevioHistorico.appendChild(bloquePregunta.render());

            }


            

        }
    )
});