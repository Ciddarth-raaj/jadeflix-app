import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Styles from '../Constants/styles';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: {
        home: {
          title: 'Overview',
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
        <View>{children}</View>
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
  },
});
