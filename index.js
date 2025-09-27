#!/usr/bin/envr node
import https from 'https';

const city = process.argv.slice(2).join('');
if (!city){
  console.error(" > Please provide a city name. Example -> node index.js London");
  process.exit(1);
}

const api='fb690e45c9fe3c5ddf9a9d0acfa85487';

const url=`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${api}&units=metric`;

https.get(url,(res)=>{
  let data='';
  res.on('data',(chunk)=>{
    data+=chunk;
  });

  res.on('end',()=>{
    try {
      const weather =JSON.parse(data);
      if (weather.cod!==200){
        console.error(` > API error: ${weather.message}`)
        process.exit(1);
      }

      console.log(`\nWeather in ${weather.name}, ${weather.sys.country}`);
      console.log(`Temperature : ${weather.main.temp}°C`);
      console.log(`Feels like  : ${weather.main.feels_like}°C`);
      console.log(`Conditions  : ${weather.weather[0].description}`);
      console.log(`Humidity    : ${weather.main.humidity}%`);
      console.log(`Wind speed  : ${weather.wind.speed} m/s\n`);
    }catch(error){
      console.error(` > Failed to parse weather data`,error.message);
    }
});
  }).on('error',(err)=>{
    console.log(city);
    console.error(' > Request error:',err.message);
  });