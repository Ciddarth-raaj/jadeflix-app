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
import CreateCategory from './Pages/CreateCategory';
import OrderId from './Pages/OrderDetails';
import Login from './Pages/Login';
import CreateShop from './Pages/CreateShop';
import Forgot from './Pages/Forgot';

import './Constants/variables';

import StoreHelper from './Helper/store';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: true,
      store_name: '',
      store_owner: '',
      store_image: '',
    };

    // this.checkRole();

    // if (this.props.pageProps.params !== undefined) {
    //   global.config.store_id = this.props.pageProps.params.id;
    //   global.config.store_slug = this.props.pageProps.params.store_name;
    // }
  }

  // componentDidMount() {
  //   const params = this.props.pageProps.params;
  //   if (
  //     this.props.router.pathname.startsWith('/admin') ||
  //     this.props.router.pathname.startsWith('/superadmin') ||
  //     this.props.router.pathname == '/'
  //   ) {
  //     return;
  //   }
  //   if (
  //     params === undefined ||
  //     params.id === undefined ||
  //     params.store_name === undefined
  //   ) {
  //     this.setState({valid: false});
  //   } else {
  //     this.checkStore(params.id, params.store_name);
  //   }
  // }

  checkStore(store_id, store_slug) {
    StoreHelper.getData(store_id, store_slug)
      .then(data => {
        if (data.code == 200) {
          this.setState({
            valid: true,
            store_name: data.store_name,
            store_owner: data.store_owner_name,
            store_image: data.store_picture,
          });
        } else {
          this.setState({valid: false});
        }
      })
      .catch(err => console.log(err));
  }

  // checkRole() {
  //   if (this.props.router.pathname.startsWith('/superadmin')) {
  //     return;
  //   } else if (this.props.router.pathname.startsWith('/admin')) {
  //     this.adminInit();
  //   } else {
  //     this.userInit();
  //   }
  // }

  // userInit() {
  // 	try {
  // 		const token = localStorage.getItem("token");
  // 		if (token !== undefined || token !== null) {
  // 			global.config.accessToken = token;
  // 		}
  // 	} catch (err) {
  // 		// console.log(err);
  // 	}
  // }

  userInit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== undefined || token !== null) {
        global.config.accessToken = token;
      }
    } catch (e) {
      // saving error
    }
  };

  // adminInit() {
  // 	try {
  // 		const token = localStorage.getItem("tokenAdmin");
  // 		const store_id = localStorage.getItem("store_id");
  // 		if (
  // 			token === null &&
  // 			!this.props.router.pathname.startsWith("/admin/login") &&
  // 			!this.props.router.pathname.startsWith("/admin/register") &&
  // 			!this.props.router.pathname.startsWith("/admin/forgot")
  // 		) {
  // 			window.location = "/admin/login";
  // 		} else if (
  // 			(store_id == "null" || store_id == null) &&
  // 			!this.props.router.pathname.startsWith("/admin/create-shop") &&
  // 			!this.props.router.pathname.startsWith("/admin/login") &&
  // 			!this.props.router.pathname.startsWith("/admin/register") &&
  // 			!this.props.router.pathname.startsWith("/admin/forgot")
  // 		) {
  // 			global.config.accessToken = token;
  // 			window.location = "/admin/create-shop";
  // 		} else if (
  // 			store_id != "null" &&
  // 			store_id != null &&
  // 			this.props.router.pathname.startsWith("/admin/create-shop")
  // 		) {
  // 			global.config.accessToken = token;
  // 			window.location = "/admin";
  // 		} else {
  // 			global.config.accessToken = token;
  // 		}
  // 	} catch (err) {
  // 		// console.error(err);
  // 	}
  // }

  adminInit = async () => {
    try {
      const token = await AsyncStorage.getItem('tokenAdmin');
      const store_id = await AsyncStorage.getItem('store_id');
      if (
        token === null &&
        !this.props.router.pathname.startsWith('/admin/login') &&
        !this.props.router.pathname.startsWith('/admin/register') &&
        !this.props.router.pathname.startsWith('/admin/forgot')
      ) {
        window.location = '/admin/login';
      } else if (
        (store_id == 'null' || store_id == null) &&
        !this.props.router.pathname.startsWith('/admin/create-shop') &&
        !this.props.router.pathname.startsWith('/admin/login') &&
        !this.props.router.pathname.startsWith('/admin/register') &&
        !this.props.router.pathname.startsWith('/admin/forgot')
      ) {
        global.config.accessToken = token;
        window.location = '/admin/create-shop';
      } else if (
        store_id != 'null' &&
        store_id != null &&
        this.props.router.pathname.startsWith('/admin/create-shop')
      ) {
        global.config.accessToken = token;
        window.location = '/admin';
      } else {
        global.config.accessToken = token;
      }
    } catch (e) {
      // error reading value
    }
  };

  render() {
    const Stack = createStackNavigator();

    const MyTheme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: '#FFFFFF',
      },
    };

    const {valid, store_name, store_owner, store_image} = this.state;

    return (
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen name="CreateProduct" component={CreateProduct} />
          <Stack.Screen name="Category" component={Category} />
          <Stack.Screen name="Orders" component={Orders} />
          <Stack.Screen name="CreateCategory" component={CreateCategory} />
          <Stack.Screen name="OrderDetails" component={OrderId} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CreateShop" component={CreateShop} />
          <Stack.Screen name="Forgot" component={Forgot} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
