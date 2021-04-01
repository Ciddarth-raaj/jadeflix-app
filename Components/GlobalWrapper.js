import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import Styles from '../Constants/styles';

export default class GlobalWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: {
        home: {
          title: 'Overview',
          selected: false,
        },
        products: {
          title: 'Products',
          selected: false,
        },
      },
    };
  }

  render() {
    const {menu} = this.state;
    const {children, tag} = this.props;
    return (
      <View style={styles.wrapper}>
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
    height: '100%',
  },
});
