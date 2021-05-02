import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Button,
  ScrollView,
} from 'react-native';

import Colors from '../Constants/colors';
import Styles from '../Constants/styles';

import GlobalWrapper from '../Components/GlobalWrapper';
import OrderCard from '../Components/OrderCard';

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <GlobalWrapper tag={'orders'} navigation={this.props.navigation}>
        <View style={styles.wrapperStyle}>
          <OrderCard navigation={this.props.navigation} />
          <OrderCard navigation={this.props.navigation} />
        </View>
      </GlobalWrapper>
    );
  }
}

const styles = StyleSheet.create({
  wrapperStyle: {
    padding: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
