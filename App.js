import React from 'react';
import {View} from 'react-native';

import Home from './Pages/Home';
import Products from './Pages/Products';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Products />;
  }
}
