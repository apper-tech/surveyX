import React from 'react';
import RenderHome from '../_layout/Home'

class HomeScreen extends React.Component {
  componentDidMount() {
    console.log(process.env.PUBLIC_URL);

  }

  render() {
    return (<RenderHome></RenderHome>);
  }
}


export default HomeScreen;