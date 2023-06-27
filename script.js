const apiKey = "99d99addc0d97cb3287348eda392b81e";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;


async function getWeatherByLocation(city) {

    const resp = await fetch(url(city), {
        origin: "cros"
    });
    const respData = await resp.json();

    addWeatherToPage(respData);

}

function addWeatherToPage(data) {
    const temp = Ktoc(data.main.temp);

    const weather = document.createElement('div')
    weather.classList.add('weather');

    const location = document.createElement('span');
    location.classList.add('location');
    location.innerHTML = data.name;

    const icon = document.createElement('img');
    icon.classList.add('icon');
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    icon.alt = data.weather[0].description;

    const conditions = document.createElement('p');
    conditions.classList.add('conditions');
    conditions.innerHTML = data.weather[0].description;

    const tempElem = document.createElement('p');
    tempElem.classList.add('temp');
    tempElem.innerHTML = `${temp}°C`;

    weather.appendChild(location);
    weather.appendChild(icon);
    weather.appendChild(conditions);
    weather.appendChild(tempElem);

    //   cleanup 
    main.innerHTML = "";
    main.appendChild(weather);
};


function Ktoc(K) {
    return Math.floor(K - 273.15);
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }

});