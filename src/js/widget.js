'use strict';

const COUNTRY = 'bilbao',
      API_ID = '4ee841cfbd26ba9d323591e315799f67',
      END_POINT = 'http://api.openweathermap.org/data/2.5/weather',
      KELVIN = -273.15;

class Widget {

    constructor(country, wrapper_id) {
        this.country = country;
        this.wrapper = document.getElementById(wrapper_id);
        console.debug(`Widget:constructor ${this.country}`);

        this.data = null; //json data
        var id =this.paint();
        console.log(id);
        this.listenners();
        this.repaint(id);

    }

    paint() {
        console.debug(`Widget:paint card`);
        let card = `<div id="widget-${this.country}" class="weather-card">
                        <button id="widget-btn-${this.country}">x</button>
                        <div class="weather-icon cloud"></div>
                        <h1 id="widget-temp-${this.country}">Xº</h1>
                        <p>cargando...</p>
                    </div>`;
        this.wrapper.innerHTML += card;
        return this.country;
    }

    listenners() {
        let button = document.getElementById(`widget-btn-${this.country}`);
        button.addEventListener('click', this.destroy);
    }

    callApi() {
        console.debug('Widget:callApi');
        var promesa = this.ajaxGet(`${END_POINT}?q=${this.country}&appid=${API_ID}`);
        return promesa;

    }

    repaint(id) {
        console.debug('Widget:repaint');
        var promesa = this.callApi();
        promesa.then(function (data) {
            let json = JSON.parse(data);
            console.log('response openWheather %o', json);
            let widget = document.getElementById(`widget-${id}`);
            widget.querySelector('p').textContent = json.name;
            let temp = Math.round(json.main.temp + KELVIN);
            widget.querySelector('h1').textContent = `${temp}º`;
        }).catch(function (error) {
            console.warn('openWheather Error %o', error);
            widget.querySelector('p').textContent = 'Error';
        });
    }

    destroy() {
        console.debug('Widget:destroy');
        let widget = this.parentNode;
        widget.style.animation = 'disappear 1.1s';
        setInterval(() => {
            widget.remove();
        }, 1000);
    }

    ajaxGet(url) {
        return new Promise(function (resolve, reject) {
            let req = new XMLHttpRequest();
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

};
