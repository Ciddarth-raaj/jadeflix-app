import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

import Styles from '../Constants/styles';
import Colors from '../Constants/colors';

import NavigationDrawer from './NavigationDrawer';

export default class GlobalWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationVisibility: false,
      menu: {
        home: {
          title: 'Overview',
          selected: false,
          pageName: 'Home',
          icon: require('../Assets/icon-grey/home.png'),
          selectedIcon: require('../Assets/icon-selected/home.png'),
        },
        products: {
          title: 'Products',
          selected: false,
          pageName: 'Products',
          icon: require('../Assets/icon-grey/products.png'),
          selectedIcon: require('../Assets/icon-selected/products.png'),
        },
        category: {
          title: 'Category',
          selected: false,
          pageName: 'Category',
          icon: require('../Assets/icon-grey/category.png'),
          selectedIcon: require('../Assets/icon-selected/category.png'),
        },
        orders: {
          title: 'Orders',
          selected: false,
          pageName: 'Orders',
          icon: require('../Assets/icon-grey/cart.png'),
          selectedIcon: require('../Assets/icon-selected/cart.png'),
        },
      },
    };
  }

  componentDidMount() {
    let {menu} = this.state;
    if (menu[this.props.tag] != undefined) {
      menu[this.props.tag].selected = true;
      this.setState({menu: menu});
    }
  }

  render() {
    const {menu, navigationVisibility} = this.state;
    const {children, tag, navigation} = this.props;
    return (
      <SafeAreaView style={styles.wrapper}>
        {/* {navigationVisibility && (
          <NavigationDrawer
            menu={menu}
            setVisibility={v => this.setState({navigationVisibility: v})}
            navigation={navigation}
          />
        )} */}
        {/* <TouchableOpacity
          onPress={() => this.setState({navigationVisibility: true})}
          style={styles.buttonWrapper}>
          <Image
            source={require('../Assets/menu.png')}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>{menu[tag]?.title}</Text>
          <View style={Styles.line} />
        </View> */}
        <ScrollView style={{height: '90%'}}>{children}</ScrollView>
        <View style={styles.footerMenu}>
          {Object.keys(menu).map(m => (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => this.props.navigation.navigate(menu[m].pageName)}>
              <Image
                source={menu[m].selected ? menu[m].selectedIcon : menu[m].icon}
                style={styles.menuIcon}
              />
              <Text
                style={[
                  styles.menuText,
                  menu[m].selected && styles.menuTextSelected,
                ]}>
                {menu[m].title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  wrapper: {
    padding: 20,
    // height: '100%',
  },
  buttonWrapper: {
    padding: 10,
    backgroundColor: Colors.primary,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  footerMenu: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor: '#c9c9c9',
    borderTopWidth: 1,
    paddingTop: 10,
  },
  menuItem: {
    alignItems: 'center',
  },
  menuIcon: {
    width: 25,
    height: 25,
    marginBottom: 5,
  },
  menuText: {
    fontSize: 13,
    color: 'gray',
  },
  menuTextSelected: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
});
