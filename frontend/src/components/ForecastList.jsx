import React from 'react';

// Api
import getWeatherFromApi from '../data/api';

export default class ForecastList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forecastList: [],
    };
  }

  async componentWillMount() {
    const weather = await getWeatherFromApi();

    const forecastList = weather.forecasts.map(x => [
      x.dt_txt.slice(11, 16),
      x.main.temp_max,
      x.weather[0].icon,
    ]);

    this.setState({
      forecastList,
    });
  }

  render() {
    const { forecastList } = this.state;

    const forecastTime = forecastList.map(x => (
      <div className="forecast__container" key={x[0]}>
        <p>{Math.round(x[1])}&deg;</p>
        <img alt={x.dt} src={`/img/${x[2].slice(0, -1)}.svg`} />
        <p>{x[0]}</p>
      </div>
    ));

    return (
      <div>
        <div className="forecast__wrapper">{forecastTime}</div>
      </div>
    );
  }
}
