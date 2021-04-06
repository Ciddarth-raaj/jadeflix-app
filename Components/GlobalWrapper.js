import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Styles from '../Constants/styles';

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
        },
        products: {
          title: 'Products',
          selected: false,
          pageName: 'Products',
        },
        category: {
          title: 'Category',
          selected: false,
          pageName: 'Category',
        },
        orders: {
          title: 'Orders',
          selected: false,
          pageName: 'Orders',
        },
      },
    };
  }

  render() {
    const {menu, navigationVisibility} = this.state;
    const {children, tag, navigation} = this.props;
    return (
      <View style={styles.wrapper}>
        {navigationVisibility && (
          <NavigationDrawer
            menu={menu}
            setVisibility={v => this.setState({navigationVisibility: v})}
            navigation={navigation}
          />
        )}
        <TouchableOpacity
          onPress={() => this.setState({navigationVisibility: true})}>
          <Text>{'Open'}</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>{menu[tag].title}</Text>
          <View style={Styles.line} />
        </View>
        <ScrollView style={{height: '100%'}}>{children}</ScrollView>
      </View>
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
});
