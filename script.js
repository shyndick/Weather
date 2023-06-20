class Weather {
    constructor() {
        this.data=[]
        this.weather=[]
        this.init()
    }

    init() {
        const weatherApp = document.querySelector('.site');
        weatherApp.innerHTML = `<div class="weather_app">    
                                    <div class="up">
                                        <div class="header">
                                            <h2>Погода в вашем городе</h2>
                                        </div>
                                        <div class="inputs">
                                            <input class="input"type="text" value="Brest">
                                        </div>
                                        <div class="button">
                                            <button class="btn">Найти</button>
                                        </div>
                                    </div>
                                    <div class="down">
                                        <ul class='weather_items'></ul>
                                    </div>
                                </div>  
                                `
        this.siti()
        this.clickBtn()
    }

    sitiLocation(siti) {
        let sitiLoc = fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${siti}&limit=5&appid=15be81ae52b1e89db50ef966fe4f2113`);
        sitiLoc.then(response => response.json()).then(json => {
            if(json.length === 0) {
                const ul = document.querySelector('.weather_items');
                let li = '';
                    li='<li class="content">К сожалению мы не смогли найти такой город</li>'
                    ul.innerHTML = li
            }
            for(let i = 0; i < json.length; i++){
                this.data.push(json[i])
            }
        this.data.forEach(({lat, lon})=>{
            this.sitiWeather(lat, lon)
        })
    })
    }

    sitiWeather(lat, lon) {
            let weather = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ru&appid=15be81ae52b1e89db50ef966fe4f2113&units=metric`)
            weather.then(response => response.json())
                                    .then(json => {
                                        this.weather.push(json)
                                        this.addWeather(this.weather)
                                    })

            
        }

    siti() {
        let input = document.querySelector('.input')
        return input
    }

    listener() {
            let inputValue = this.siti().value
            if(inputValue ){
                this.remove()
                this.sitiLocation(inputValue)
                this.data=[]
                this.siti().value=''
            }
    }

    clickBtn() {
        const btn = document.querySelector('.btn')
        btn.addEventListener('click', () =>{
            this.listener()
        })
        window.addEventListener('keydown', (e) =>{
            if(e.code === 'Enter') {
                this.listener()
            }
            
        })
    }

    remove() {
        const ul=document.querySelector('.weather_items');
        ul.innerHTML='';
        this.weather=[]
    }

    addWeather(arr) {
        const ul = document.querySelector('.weather_items');
        let li = '';
        arr.forEach(({main:{temp}, name, sys:{country}, visibility, wind:{deg, speed}})=>{
            li += `<li class="content">
                                        <p>Город: ${name}</p>
                                        <p>Страна: ${country}</p>
                                        <p>Скорость ветра: ${speed} м/с</p>
                                        <p>Направление ветера: ${deg}&deg;</p>
                                        <p>Температура: ${Math.floor(temp)}&#8451;</p>
                                        <p>Видимость: ${visibility} м.</p>
                                        
                                    </li>`
                                    ul.innerHTML = li;  
                                                    
        }) 

        
    }

}

window.addEventListener('load', ()=> {
    const weather = new Weather()
})


