'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.onload = function () {

    //comenzamos
    //var x = 5;
    //console.log("variable x = " + x);

    var COUNTRY = 'bilbao';
    var API_ID = '4ee841cfbd26ba9d323591e315799f67';
    var END_POINT = 'http://api.openweathermap.org/data/2.5/weather';

    var KELVIN = -273.15;

    var promesa = ajaxGet(END_POINT + '?q=' + COUNTRY + '&appid=' + API_ID);

    promesa.then(function (data) {
        var json = JSON.parse(data);
        console.log('response openWheather %o', json);
        var widget = document.getElementById('widget-bilbao');
        widget.querySelector('p').textContent = json.name;
        var temp = Math.round(json.main.temp + KELVIN);
        widget.querySelector('h1').textContent = temp + '\xBA';
    }).catch(function (error) {
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

var PI = 3.14;

var PERSONA = {
    id: '01',
    name: 'David'
};

function funcion_let(nombre) {
    console.log(miVar);
    if (true) {
        var _miVar = 'Hola ' + nombre;
    }
    console.log(miVar);
};

/**
   Metodo para realizar una llamada Ajax por GET
   return: Promise
*/
function ajaxGet(url) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open("GET", url);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.response);
            } else {
                reject(new Error(req.statusText));
            }
        };

        req.onerror = function () {
            reject(new Error("Network error"));
        };

        req.send();
    });
}

//export default { ajaxGet };


///////////////////////////////////////////////////
// Clases
///////////////////////////////////////////////////

var Orco = function () {
    function Orco() {
        var nombre = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Anorg";

        _classCallCheck(this, Orco);

        this.nombre = nombre;
    }

    _createClass(Orco, [{
        key: 'saluda',
        value: function saluda() {
            console.info('Mi nombre es ' + this.nombre);
        }
    }]);

    return Orco;
}();

///////////////////////////////////////////////////
// Arrow
///////////////////////////////////////////////////

function lista_compra() {
    var lista = ["pizza", "cerveza", "condornices"];
    lista.forEach(function (elemento) {
        console.log(elemento);
    });
}

///////////////////////////////////////////////////
// Promesas
///////////////////////////////////////////////////

function hacerAlgoPromesa(parametro) {
    function haciendoalgo(resolve, reject) {
        console.log('hacer algo que ocupa un tiempo...');

        if (parametro == 13) {
            setTimeout(reject, 7000);
        } else {
            setTimeout(resolve, 4000);
        }
    }
    return new Promise(haciendoalgo);
}

function close_widget() {
    console.info('cerrar Widget');
    var widget = document.getElementById('widget-bilbao');

    widget.style.animation = 'disappear 1.1s';
    setInterval(function () {
        widget.remove();
    }, 1000);
};
