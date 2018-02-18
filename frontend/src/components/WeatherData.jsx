import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

class WeatherData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherData: '',
      currentLocation: '',
    };
    this.getCurrentLocation = this.getCurrentLocation.bind(this);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCurrentLocation);
    }
  }

  getCurrentLocation(position) {
    const currPos = {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    };

    this.setState({ currentLocation: currPos });
  }
}

export default WeatherData;
