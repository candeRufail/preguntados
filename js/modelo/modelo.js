
/*
 * Modelo
 */
var Modelo = function () {
  this.preguntas = [];
  this.ultimoId = 0;
  this.cargar();

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntasBorradas = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.votoAgregado = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta.
  //vas a tener que recorrer la lista de preguntas del modelo.
  //Tip: cuidado con la primer pregunta que se agrega que no tendrá ningún id con el cual compararse. 
  //Por lo que deberá tener un valor por defecto.
  obtenerUltimoId: function () {
    var ultimoId = this.preguntas.length
    return ultimoId > 0 ? ultimoId : 0;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function (nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = { 'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas };
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function (id) {
    this.preguntas = this.preguntas.filter(pregunta => pregunta.id !== id);
    this.guardar();
    this.preguntaEliminada.notificar();

  },
  borrarTodo: function () {
    this.preguntas = [];
    this.guardar();
    this.preguntasBorradas.notificar();

  },
  editarPregunta: function (id, nvaPregunta) {
    let pregEditada = this.preguntas.find(element => element.id === id);
    pregEditada.textoPregunta = nvaPregunta;
    this.guardar();
    this.preguntaEditada.notificar();
  },
 
 /* agregarVoto: function (nombrePregunta, respuestaSeleccionada) {
    var pregunta = this.preguntas.find(pregunta => pregunta.textoPregunta == nombrePregunta);
    var respuesta = pregunta.cantidadPorRespuesta.find(respuesta => respuesta.textoRespuesta == respuestaSeleccionada);
    console.log(respuesta);
    respuesta.cantidad++;
    this.guardar();
    this.votoAgregado.notificar();

    

  },*/
  // me da error cuando hago doble click en enviar respuestas
  agregarVoto: function(nombrePregunta,respuestaSeleccionada){
    
    var pregunta = this.preguntas.find(pregunta => pregunta.textoPregunta == nombrePregunta);
    var respuesta = pregunta.cantidadPorRespuesta.find(respuesta => respuesta.textoRespuesta == respuestaSeleccionada);
    respuesta.cantidad += 1;
    this.guardar();
    this.votoAgregado.notificar();
  },




  //se guardan las preguntas(
  guardar: function () {
    localStorage.setItem("preguntas", JSON.stringify(this.preguntas));
  },

  cargar: function () {
    this.preguntas = JSON.parse(localStorage.getItem("preguntas"))
  },


};
