import React from 'react';
import {View} from 'react-native';

import Home from './Pages/Home';
import Products from './Pages/Products';
import Category from './Pages/Category';
import Orders from './Pages/Orders';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Orders />;
  }
}
