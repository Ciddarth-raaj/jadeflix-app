import React from 'react';
import {View} from 'react-native';

import Home from './Pages/Home';
import Products from './Pages/Products';
import Category from './Pages/Category';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Category />;
  }
}
