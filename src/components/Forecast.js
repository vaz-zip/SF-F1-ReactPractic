import * as React from "react";
import  { useState, useEffect } from "react";
import axios from "axios"; 

import "../styles/Forecast.css";
//import "../styles/media-qeries.css";



const apiKey = "42f482dc102b0f6d5418c8111f6a2c84"
const geolocationKey = "701ac98267dc46deb43cd6ac595727ff"
// const url = "http://api.openweathermap.org/data/2.5/weather?q=${city},rus&APPID="+apiKey+"&units=metric&lang=ru"




//https://disk.yandex.ru/d/gmQX0J6SnJtNIA

function Forecast(props) {
    
    const [city, setCity] = useState('-------'); // отслеживаем изменение города
    const [weather, setWeather] = useState([]);
    const [wind, setWind]= useState([]);
    const [hour, setHour] = useState([]);
    const [hour_dt, setHour_dt] = useState([]);
    const [daily, setDaily] = useState([]);
    const [daily_weather, setDaily_weather] = useState([]);
    const [lat, setLat] = useState('58.0174')
    const [lon, setLon] = useState('56.2855')
        
    // const [day, setHourly] = useState([]);
    const [feels_like, setFeels_like] = useState([]);
    // const [week, setWeek] = useState([]);
    const citilist = ['-------', 'Самара', 'Анадырь', 'Москва', 'Санкт-Петербург','Магадан', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород',
    'Челябинск', 'Ростов-на-Дону', 'Уфа', 'Омск', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград', 'Якутск'];


    // Наполняем содержимое select
    const options = citilist.map((text, index) => {
        return <option key={index}>{text}</option>;
    });



    // Функции вычисления текущей геопзиции
    function getMyPosition() {
        navigator.geolocation.getCurrentPosition(onSuccess);
    };
    function onSuccess(geolocationData) {
        setLoading(true);
        setLat(geolocationData.coords.latitude);
        setLon(geolocationData.coords.longitude);
        axios.get(`https://api.ipgeolocation.io/timezone?apiKey=${geolocationKey}&lat=${lat}&lng=${lon}`).then(res => {
            setCity(res.data.geo.city);
            setLoading(false);
        });
    };
      
    

    useEffect(() => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},rus&APPID=${apiKey}&units=metric&lang=ru`).then(res => {
            console.log(res);
            setCity(res.data);
            setWeather(res.data.main);
            setFeels_like(res.data.main.feels_like);
            setWind(res.data.wind);
            setLat(res.data.coord.lat);
            setLon(res.data.coord.lon);
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=en&APPID=${apiKey}`).then(res => {
            console.log(res);
            setHour(res.data.hourly);
            setHour_dt(res.data.hourly.map(time => <p>{new Date(time.dt * 1000).toLocaleTimeString()}</p>));
            setDaily(res.data.daily.map(y => <p>{new Date(y.dt * 1000).toLocaleDateString()}</p>));
            setDaily_weather(res.data.daily);
        });
    });
}, [city, apiKey]);
    
    
    return (
        <div className="cover"><center>
            <select value={city} onChange={e=>setCity(e.target.value)}>
                <option disabled>Выберите город</option>
                 {options}
            </select></center>
            <table><center>
                <div class='td1'>
                    <td>
                        <p>В городе {city.name} сегодня</p>
                        <p>Температура {weather.temp}<sup>o</sup>C</p>
                        <p>Ощущается как {feels_like} &deg;C</p>
                        <p>Атмосферное давление {weather.pressure} мм.рт.ст</p>
                        <p>Влажность {weather.humidity} мм</p>
                        <p>Скорость ветра {wind.speed} М/С</p>
                        <p>На 2-е суток:</p>
                        <p>{hour.map(x  =><p> {x.temp}</p>)}</p>
                        <p>Погода на неделю: {daily}</p>
                        <p>{daily_weather.map(z  =>  <p>{z.temp.day} </p>)}</p>
                    </td>
                </div>        
            </center></table>
        </div>
    );

}



export default Forecast 
