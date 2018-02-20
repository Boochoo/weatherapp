import React from 'react';
import ReactDOM from 'react-dom';

// Api
import getWeatherFromApi from './data/api';

// Components
import ForecastList from './components/ForecastList';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
      city: '',
      temp: '',
    };
  }

  async componentWillMount() {
    const weather = await getWeatherFromApi();

    this.setState({
      icon: weather.weatherInfo.icon.slice(0, -1),
      city: weather.report.city,
      temp: weather.report.temp,
    });
  }

  render() {
    const { icon, city, temp } = this.state;
    return (
      <div>
        <div className="main__weather-wrapper">
          <h1> {city}</h1>
          <div className="icon">
            {icon && <img alt={icon} src={`/img/${icon}.svg`} />}
          </div>
          <h1>{temp}&deg;</h1>
        </div>
        <ForecastList />
      </div>
    );
  }
}

ReactDOM.render(<Weather />, document.getElementById('app'));
