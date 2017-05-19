window.onload = function () {

  //comenzamos
  //var x = 5;
  //console.log("variable x = " + x);

  const COUNTRY = 'bilbao';
  const API_ID = '4ee841cfbd26ba9d323591e315799f67';
  const END_POINT = 'http://api.openweathermap.org/data/2.5/weather';

  const KELVIN = -273.15;

  var promesa = ajaxGet(`${END_POINT}?q=${COUNTRY}&appid=${API_ID}`);


  promesa.then(function(data){
      let json = JSON.parse(data);
      console.log('response openWheather %o', json);
      let widget = document.getElementById('widget-bilbao');
      widget.querySelector('p').textContent = json.name;
      let temp = Math.round(json.main.temp + KELVIN);
      widget.querySelector('h1').textContent = `${temp}º`;
  }).catch(function(error){
      console.warn('openWheather Error %o', error);
      widget.querySelector('p').textContent = 'Error';
  });


  /* Ejercicio Clases
  //crear dos Orcos y que saluden
  var orco1 = new Orco();
  orco1.saluda();

  var orco2 = new Orco('Tomasin');
  orco2.saluda();
  */


 /* Ejercicio Promesas
  //llamada a  la funcion de promesa
  hacerAlgoPromesa()
      .then = () => {
        console.info('Terminada Ejecucion :-) ');
      };


    hacerAlgoPromesa(13)
      .then( function() {
        console.info('Terminada Ejecucion :-) ')

      }).catch( function(){
        console.info('Ejecución con ERROR timeout 7 seg');
      });

   */

};



///////////////////////////////////////////////////
//Variables nuevas
///////////////////////////////////////////////////

const PI = 3.14;

const PERSONA = {
  id: '01',
  name: 'David'
};

function funcion_let( nombre ) {
  console.log(miVar);
  if (true) {
    let _miVar = `Hola ${nombre}`;
  }
  console.log(miVar);
};


/**
   Metodo para realizar una llamada Ajax por GET
   return: Promise
*/
function ajaxGet(url) {
    return new Promise(function(resolve, reject) {
        let req = new XMLHttpRequest();
        req.open("GET", url);
        req.onload = function() {
            if (req.status === 200) {
                resolve(req.response);
            } else {
                reject(new Error(req.statusText));
            }
        };

        req.onerror = function() {
            reject(new Error("Network error"));
        };

        req.send();
    });
}

//export default { ajaxGet };


///////////////////////////////////////////////////
// Clases
///////////////////////////////////////////////////

class Orco {

    constructor( nombre = "Anorg" ){
        this.nombre = nombre;
    }

    saluda(){
        console.info(`Mi nombre es ${this.nombre}`);
    }

}



///////////////////////////////////////////////////
// Arrow
///////////////////////////////////////////////////

function lista_compra(){
    const lista = ["pizza","cerveza","condornices"];
    lista.forEach( elemento => { console.log( elemento ); });
}



///////////////////////////////////////////////////
// Promesas
///////////////////////////////////////////////////

function hacerAlgoPromesa( parametro ) {
 function haciendoalgo(resolve, reject) {
    console.log('hacer algo que ocupa un tiempo...');

    if ( parametro == 13 ) {
        setTimeout(reject, 7000);
    }else{
        setTimeout(resolve, 4000);
    }

 }
 return new Promise( haciendoalgo );
}


function close_widget(){
    console.info('cerrar Widget');
    let widget = document.getElementById('widget-bilbao');

    widget.style.animation = 'disappear 1.1s';
    setInterval(()=>{ widget.remove(); }, 1000);


};
