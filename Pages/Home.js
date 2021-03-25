import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';

import Colors from '../Constants/colors';

import GlobalWrapper from '../Components/GlobalWrapper';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
