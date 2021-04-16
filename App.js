import React from 'react';
import {View} from 'react-native';

// import 'react-native-gesture-handler';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './Pages/Home';
import Products from './Pages/Products';
import Category from './Pages/Category';
import Orders from './Pages/Orders';
import CreateProduct from './Pages/CreateProduct';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const Stack = createStackNavigator();

    const MyTheme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: '#FFFFFF',
      },
    };

    return (
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="CreateProduct" component={CreateProduct} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Products" component={Products} />
          {/* <Stack.Screen name="CreateProduct" component={CreateProduct} /> */}
          <Stack.Screen name="Category" component={Category} />
          <Stack.Screen name="Orders" component={Orders} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
