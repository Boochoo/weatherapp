const debug = require('debug')('weathermap');

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');

const appId = process.env.APPID || '';
const mapURI =
  process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const targetCity = process.env.TARGET_CITY || 'Helsinki,fi';

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

const fetchWeather = async () => {
  const endpoint = `${mapURI}/forecast?q=${targetCity}&appid=${appId}&units=metric&`;
  const response = await fetch(endpoint);
  return response ? response.json() : {};
};

const initWeatherData = async () => {
  const weatherData = await fetchWeather();
  const forecastArray = weatherData.list.slice(0, 5);
  const tempRounded = Math.round(weatherData.list[0].main.temp_max);

  return {
    weatherInfo: weatherData.list[0].weather[0],
    report: {
      city: weatherData.city.name,
      temp: tempRounded,
    },
    forecasts: forecastArray,
  };
};

router.get('/api/weather', async ctx => {
  const weatherData = await initWeatherData();

  console.log(weatherData);
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData || {};
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
console.log(`Using API key ${appId}`);
