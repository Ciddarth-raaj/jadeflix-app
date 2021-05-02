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
import '../Constants/variables';

import StoreHelper from '../Helper/store';

import GlobalWrapper from '../Components/GlobalWrapper';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      total_sales: 0,
      store_id: '',
      store_name: '',
      store_slug: '',
    };
    global.config.accessToken =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoiYWRtaW4iLCJzdG9yZV9pZCI6MSwiaWF0IjoxNjE5OTgwODA3LCJleHAiOjE2MjI1NzI4MDd9.G9ezcGAW__bqCCdUy4E6OXi0rp-bpvQTe1SFB-iCOZv1OTG4XBDiikLPx22huLCZaab5oIqCh3vMLlPuN-JbjQ';
  }

  componentDidMount() {
    this.getStatistics();
    this.getStoreData();
  }

  getStatistics() {
    StoreHelper.getStatistics()
      .then(data => {
        this.setState({count: data.count, total_sales: data.total_sales});
      })
      .catch(err => {
        alert(err);
        console.log(err);
      });
  }

  getStoreData() {
    StoreHelper.getDataAdmin()
      .then(data => {
        this.setState({
          store_id: data.store_id,
          store_name: data.store_name,
          store_slug: data.store_slug,
        });
      })
      .catch(err => console.log(err));
  }

  async shareLink() {
    const {store_id, store_slug} = this.state;
    try {
      const result = await Share.share({
        url: `jadeflix.com/${store_slug}/${store_id}`,
        message: `jadeflix.com/${store_slug}/${store_id}`,
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
    const {total_sales, count, store_id, store_slug} = this.state;
    return (
      <SafeAreaView>
        <GlobalWrapper tag={'home'} navigation={this.props.navigation}>
          <View style={styles.itemCardWrapper}>
            <View style={styles.itemCard}>
              <Text style={styles.itemCardTitle}>{'Total Orders'}</Text>
              <Text style={styles.itemCardSubTitle}>{count}</Text>
            </View>

            <View style={styles.itemCard}>
              <Text style={styles.itemCardTitle}>{'Total Sales'}</Text>
              <Text
                style={styles.itemCardSubTitle}>{`\u20A8 ${total_sales}`}</Text>
            </View>
          </View>

          <View style={styles.linkDiv}>
            <Text>{`jadeflix.com/${store_slug}/${store_id}`}</Text>

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
