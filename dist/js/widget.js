'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var COUNTRY = 'bilbao',
    API_ID = '4ee841cfbd26ba9d323591e315799f67',
    END_POINT = 'http://api.openweathermap.org/data/2.5/weather';

var Widget = function () {
    function Widget(country, wrapper_id) {
        _classCallCheck(this, Widget);

        this.country = country;
        this.wrapper = document.getElementById(wrapper_id);
        this.data = null; //json data

        this.paint();
        this.listenners();
        this.callApi();

        console.debug('Widget:constructor ' + this.country);
    }

    _createClass(Widget, [{
        key: 'paint',
        value: function paint() {
            var card = '<div id="widget-' + this.country + '" class="weather-card">\n                        <button id="widget-btn-' + this.country + '">x</button>\n                        <div class="weather-icon"></div>\n                        <h1>X\xBA</h1>\n                        <p>cargando...</p>\n                    </div>';
            this.wrapper.innerHTML += card;
            console.debug('Widget:paint card');
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
        }
    }, {
        key: 'repaint',
        value: function repaint() {
            console.debug('Widget:repaint');
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
    }]);

    return Widget;
}();

;
