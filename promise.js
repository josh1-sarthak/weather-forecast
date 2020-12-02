const btn = document.querySelector('button');
const rightSection = document.querySelector('#right');

const getData = () => {
    const form = document.querySelector('form');
    let searchKey= form.querySelector('#location').value;
    let choice = form.querySelector('input[name="tempUnit"]:checked').value;
    form.reset();

    fetch(` https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${searchKey}&units=${choice}&appid=d5a6321f1fc003fa5677807979b6abd1`, {mode: 'cors'})
    .then((response) => {
        return response.json();
    })
    .then((data) => { // data is nothing but response.json()
        const weatherData = weatherFactory(data.name, data.sys.country, data.coord, data.visibility, data.sys.sunrise, data.sys.sunset, data.weather[0].description, data.wind.speed, data.main);
        const unit = choice === 'metric' ?  '\xB0C' : 'F';
        const content=`
        <strong> City </strong>: ${weatherData.name} <br>
        <strong> Country </strong>: ${weatherData.country} <br>
        <strong> Latitude </strong>: ${weatherData.coordinates.lat} <strong> Longitude </strong>: ${weatherData.coordinates.lon} <br>
        <strong> Status </strong>: ${weatherData.description} <br>
        <strong> Visibility </strong>: ${weatherData.visibility} meter <br>
        <strong> Sunrise </strong>: ${weatherData.riseStr} <strong> Sunset </strong>: ${weatherData.setStr} <br>
        <strong> Temperature </strong>: ${weatherData.crux.temp} ${unit} <br>
        <strong> Feels like </strong>: ${weatherData.crux.feels_like} ${unit} <br>
        <strong> Minimum Temp </strong>: ${weatherData.crux.temp_min} ${unit} <br>
        <strong> Maximum Temp </strong>: ${weatherData.crux.temp_max} ${unit} <br>
        <strong> Humidity </strong>: ${weatherData.crux.humidity} % <br>
        `
        rightSection.innerHTML=content;
        
        const status = weatherData.description;
        displayImage(status);
    });
}


const displayImage = (status) => {
    fetch(` https://cors-anywhere.herokuapp.com/http://api.giphy.com/v1/gifs/translate?api_key=REwSrYlYVnhDXZ3iv8yhevyx1irXVk4F&s=${status}`, {mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
        const imageUrl= response.data.images.original.url;
        rightSection.style.backgroundImage = `url('${imageUrl}')`;
    });
}

    
const weatherFactory = (name, country, coordinates, visibility, sunrise, sunset, description, windSpeed, crux) => {
const riseDate= new Date(sunrise*1000);
const riseStr = riseDate.toLocaleTimeString();
const setDate= new Date(sunset*1000);
const setStr = setDate.toLocaleTimeString();
return { name, country, coordinates, visibility, riseStr, setStr, description, windSpeed, crux };
}

btn.addEventListener('click', getData);