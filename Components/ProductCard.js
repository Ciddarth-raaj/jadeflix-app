import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import Styles from '../Constants/styles';

export default class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.innerWrapper}>
          <Image
            source={{
              uri:
                'https://jadeflix.s3.amazonaws.com/products/flower-nice-9eb474c5-cbb2-431d-91d5-7d6e40809b83.jpg',
            }}
            style={styles.image}
          />
          <View style={styles.contentWrapper}>
            <Text style={styles.nameText}>{'Test'}</Text>
            <View style={styles.priceWrapper}>
              <Text style={styles.spText}>{'\u20A8 100'}</Text>
              <Text style={styles.mrpText}>{'\u20A8 100'}</Text>
            </View>
            <Text style={[styles.stockText, styles.stockGreen]}>
              {'In Stock'}
            </Text>
          </View>
        </View>
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
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
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
  image: {
    width: 130,
    height: 130,
    borderRadius: 20,
  },
  innerWrapper: {
    flexDirection: 'row',
  },
  contentWrapper: {
    marginLeft: 20,
    height: 130,
    justifyContent: 'space-around',
  },
  priceWrapper: {
    flexDirection: 'row',
  },
  spText: {
    marginRight: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },
  mrpText: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  nameText: {
    fontSize: 24,
  },
  stockText: {
    fontSize: 18,
  },
  stockGreen: {
    color: 'green',
  },
  stockRed: {
    color: 'red',
  },
});
