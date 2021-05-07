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

export default class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async shareLink() {
    try {
      const result = await Share.share({
        url: 'jadeflix.com/luxgenic/2',
        message: 'jadeflix.com/luxgenic/2',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  render() {
    const {
      id,
      name,
      mrp,
      sp,
      stock,
      imgLink,
      setStock,
      storeDetails,
    } = this.props;
    return (
      <View style={styles.wrapper}>
        <View style={styles.innerWrapper}>
          <Image
            source={{
              uri: {imgLink},
            }}
            style={styles.image}
          />
          <View style={styles.contentWrapper}>
            <Text style={styles.nameText}>{name}</Text>
            <View style={styles.priceWrapper}>
              <Text style={styles.spText}>{`\u20A8 ${sp}`}</Text>
              <Text style={styles.mrpText}>{`\u20A8 ${mrp}`}</Text>
            </View>
            <Text style={[styles.stockText, styles.stockGreen]}>{stock}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => this.shareLink()}>
          <Text>Share</Text>
        </TouchableOpacity>
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
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  innerWrapper: {
    flexDirection: 'row',
  },
  contentWrapper: {
    marginLeft: 20,
    height: 100,
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
  shareButton: {
    backgroundColor: Colors.primaryLight,
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});
