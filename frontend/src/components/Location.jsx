import React from 'react';

class Location extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLocation: undefined,
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

  render() {
    return <div>{this.state.currentLocation}</div>;
  }
}

export default Location;
