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
        <GlobalWrapper tag={'home'}>
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
    borderColor: Colors.primary,
    borderWidth: 2,
    padding: 20,
    borderRadius: 20,
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

// .overviewCard {
// 	width: 250px;
// 	/* height: 150px; */
// 	margin: 20px;
// 	background: #ffffff;
// 	box-shadow: 0 2px 6px 0 rgba(172, 172, 172, 0.5);
// 	border-radius: 20px;
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: center;
// 	padding: 20px;
// }

// .overviewCard .title {
// 	color: rgb(175, 175, 175);
// 	text-transform: uppercase;
// 	margin-bottom: 30px;
// }

// .overviewCard .subTitle {
// 	font-size: 26px;
// }
