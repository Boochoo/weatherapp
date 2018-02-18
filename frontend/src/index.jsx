import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;

console.log({ baseURL });

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    // console.log(response.json());

    return response.json();
  } catch (error) {
    console.error(error); // remove consoles
  }

  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
      city: '',
      temp: '',
      forecastList: [],
    };
  }

  async componentWillMount() {
    const weather = await getWeatherFromApi();
    console.log(weather);

    const forecastList = weather.forecasts.map(x => {
      return [x.dt_txt.slice(11, 16), x.main.temp_max, x.weather[0].icon];
    });

    this.setState({
      icon: weather.weatherInfo.icon.slice(0, -1),
      city: weather.report.city,
      temp: weather.report.temp,
      forecastList,
    });
  }

  render() {
    const { icon, city, temp, forecastList } = this.state;
    const forecastTime = forecastList.map(x => {
      return (
        <div className="forecast__container" key={x[0]}>
          <p>{Math.round(x[1])}&deg;C</p>
          <p>{x[0]}</p>
          <img alt={x.dt} src={`/img/${x[2].slice(0, -1)}.svg`} />
        </div>
      );
    });

    return (
      <div>
        <div className="main__weather-wrapper">
          <div className="icon">
            {icon && <img alt={icon} src={`/img/${icon}.svg`} />}
          </div>
          <h1>{temp}&deg;C</h1>
          <p> {city}</p>
        </div>

        <div className="forecast__wrapper">{forecastTime}</div>
      </div>
    );
  }
}

ReactDOM.render(<Weather />, document.getElementById('app'));
