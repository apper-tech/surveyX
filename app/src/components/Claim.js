import React from 'react';
import RenderClaim from '../_layout/Claim'

class ClaimScreen extends React.Component {
  componentDidMount() {
    console.log(process.env.PUBLIC_URL);

  }

  render() {
    return (<RenderClaim drizzle={this.props.drizzle}></RenderClaim>);
  }
}


export default ClaimScreen;