'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var COUNTRY = 'bilbao',
    API_ID = '4ee841cfbd26ba9d323591e315799f67',
    END_POINT = 'http://api.openweathermap.org/data/2.5/weather',
    KELVIN = -273.15;

var Widget = function () {
    function Widget(country, wrapper_id) {
        _classCallCheck(this, Widget);

        this.country = country;
        this.wrapper = document.getElementById(wrapper_id);
        console.debug('Widget:constructor ' + this.country);

        this.data = null; //json data
        var id = this.paint();
        console.log(id);
        this.listenners();
        this.repaint(id);
    }

    _createClass(Widget, [{
        key: 'paint',
        value: function paint() {
            console.debug('Widget:paint card');
            var card = '<div id="widget-' + this.country + '" class="weather-card">\n                        <button id="widget-btn-' + this.country + '">x</button>\n                        <div class="weather-icon cloud"></div>\n                        <h1 id="widget-temp-' + this.country + '">X\xBA</h1>\n                        <p>cargando...</p>\n                    </div>';
            this.wrapper.innerHTML += card;
            return this.country;
        }
    }, {
        key: 'listenners',
        value: function listenners() {
            var button = document.getElementById('widget-btn-' + this.country);
            button.addEventListener('click', this.destroy);
        }
    }, {
        key: 'callApi',
        value: function callApi() {
            console.debug('Widget:callApi');
            var promesa = this.ajaxGet(END_POINT + '?q=' + this.country + '&appid=' + API_ID);
            return promesa;
        }
    }, {
        key: 'repaint',
        value: function repaint(id) {
            console.debug('Widget:repaint');
            var promesa = this.callApi();
            promesa.then(function (data) {
                var json = JSON.parse(data);
                console.log('response openWheather %o', json);
                var widget = document.getElementById('widget-' + id);
                widget.querySelector('p').textContent = json.name;
                var temp = Math.round(json.main.temp + KELVIN);
                widget.querySelector('h1').textContent = temp + '\xBA';
            }).catch(function (error) {
                console.warn('openWheather Error %o', error);
                widget.querySelector('p').textContent = 'Error';
            });
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            console.debug('Widget:destroy');
            var widget = this.parentNode;
            widget.style.animation = 'disappear 1.1s';
            setInterval(function () {
                widget.remove();
            }, 1000);
        }
    }, {
        key: 'ajaxGet',
        value: function ajaxGet(url) {
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
    }]);

    return Widget;
}();

;
