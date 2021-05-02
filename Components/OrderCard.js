import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';

import Styles from '../Constants/styles';
import Colors from '../Constants/colors';

export default class CategoryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => this.props.navigation.navigate('OrderDetails')}>
        <Text style={[styles.text, styles.boldText, styles.idText]}>{'1'}</Text>
        <Text style={styles.text}>{`Total Items : ${123}`}</Text>
        <Text
          style={[
            styles.text,
            styles.boldText,
            styles.priceText,
          ]}>{`\u20A8 ${100}`}</Text>
        <Text style={[styles.text, styles.boldText]}>{'Pending'}</Text>
        <Text style={[styles.boldText, styles.timeText, {fontSize: 16}]}>
          {'a month ago'}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  text: {
    marginBottom: 5,
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
  },
  idText: {
    color: Colors.primary,
  },
  priceText: {
    color: 'green',
  },
  timeText: {
    color: 'gray',
  },
});
