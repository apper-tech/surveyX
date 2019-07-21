import React from 'react';
import ParticipateLayout from '../_layout/Participate';
class ParticipateScreen extends React.Component {
  componentDidMount() {

  }

  render() {
    let params = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    if (params === 'participate')
      params = '';
    return <ParticipateLayout code={params} drizzle={this.props.drizzle} ></ParticipateLayout>
  }
}


export default ParticipateScreen;