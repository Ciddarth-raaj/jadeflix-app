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
    return (
      <View style={styles.wrapper}>
        <Image
          source={{
            uri:
              'https://jadeflix.s3.amazonaws.com/products/flower-nice-9eb474c5-cbb2-431d-91d5-7d6e40809b83.jpg',
          }}
          style={styles.image}
        />
        <Text style={styles.nameText}>{'Test'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginBottom: 10,
  },
  nameText: {
    fontWeight: 'bold',
  },
});
