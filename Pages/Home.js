import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Button,
} from 'react-native';

import Colors from '../Constants/colors';

import GlobalWrapper from '../Components/GlobalWrapper';

export default class Home extends React.Component {
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
      <SafeAreaView>
        <GlobalWrapper tag={'home'} navigation={this.props.navigation}>
          <View style={styles.itemCardWrapper}>
            <View style={styles.itemCard}>
              <Text style={styles.itemCardTitle}>{'Total Orders'}</Text>
              <Text style={styles.itemCardSubTitle}>{'4'}</Text>
            </View>

            <View style={styles.itemCard}>
              <Text style={styles.itemCardTitle}>{'Total Sales'}</Text>
              <Text style={styles.itemCardSubTitle}>{'\u20A8 1000'}</Text>
            </View>
          </View>

          <View style={styles.linkDiv}>
            <Text>{'jadeflix.com/luxgenic/2'}</Text>

            <Button onPress={() => this.shareLink()} title="Share" />
          </View>
        </GlobalWrapper>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  itemCardWrapper: {
    alignItems: 'center',
  },
  itemCard: {
    width: 250,
    margin: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  itemCardTitle: {
    color: 'rgb(175, 175, 175)',
    textTransform: 'uppercase',
    marginBottom: 30,
  },
  itemCardSubTitle: {
    fontSize: 26,
  },
  linkDiv: {
    padding: 20,
    width: '90%',
    backgroundColor: Colors.primaryLight,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
});
