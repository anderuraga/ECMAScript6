'use strict';

const COUNTRY = 'bilbao',
      API_ID = '4ee841cfbd26ba9d323591e315799f67',
      END_POINT = 'http://api.openweathermap.org/data/2.5/weather';

class Widget{

    constructor(country, wrapper_id ){
        this.country = country;
        this.wrapper = document.getElementById(wrapper_id);
        this.data = null; //json data

        this.paint();
        this.listenners();
        this.callApi();



        console.debug(`Widget:constructor ${this.country}`);
    }


    paint(){
        let card = `<div id="widget-${this.country}" class="weather-card">
                        <button id="widget-btn-${this.country}">x</button>
                        <div class="weather-icon"></div>
                        <h1>Xº</h1>
                        <p>cargando...</p>
                    </div>`;
        this.wrapper.innerHTML += card;
        console.debug(`Widget:paint card`);
    }

    listenners(){
        let button = document.getElementById(`widget-btn-${this.country}`);
        button.addEventListener('click', this.destroy);
    }

    callApi(){
        console.debug('Widget:callApi');
    }

    repaint(){
        console.debug('Widget:repaint');
    }

    destroy(){
        console.debug('Widget:destroy');
        let widget = this.parentNode;
        widget.style.animation = 'disappear 1.1s';
        setInterval(()=>{ widget.remove(); }, 1000);
    }

};
