class Pregunta {

    constructor(publicacionPregunta){
        this.publicacionPregunta = publicacionPregunta;
    }

    

render = () => {

    const database = firebase.database();
    let totalVotos;
    let puntaje = 0;
    let numeroPregunta = document.createElement('div');
        numeroPregunta.className = 'numeroPreguntas'

    database.ref("votos").orderByChild("idPregunta").equalTo(this.publicacionPregunta.id).on("value", function (data){

        

        data.forEach(function(voto){
            totalVotos = data.numChildren();
            
            let value = voto.val();
            puntaje = puntaje + value.numeros; //conectado con android
            numeroPregunta.innerHTML = puntaje/totalVotos;
            
            
            
        });
        
        
        
        

    });

    let component = document.createElement('div');
    component.className = 'bloquePregunta';

    let nombrePregunta = document.createElement('div');
    nombrePregunta.className = 'nombrePreguntas'
    nombrePregunta.innerHTML = this.publicacionPregunta.pregunta;


    component.appendChild(nombrePregunta);
    component.appendChild(numeroPregunta);

    return component;
}

}