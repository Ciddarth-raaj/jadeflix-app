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

import OrderHelper from '../Helper/order';

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    this.getOrders();
  }

  getOrders() {
    OrderHelper.getAdmin()
      .then(data => {
        this.setState({orders: data});
        console.log(data);
      })
      .catch(err => console.log(err));
  }

  render() {
    const {orders} = this.state;
    return (
      <SafeAreaView>
        <GlobalWrapper tag={'orders'} navigation={this.props.navigation}>
          <View style={styles.wrapperStyle}>
            {orders.map(o => (
              <OrderCard
                id={o.order_id}
                total={o.total_price}
                total_items={o.total_items}
                status={o.status}
                created_at={o.created_at}
                navigation={this.props.navigation}
              />
            ))}
            {/* <OrderCard navigation={this.props.navigation} />
            <OrderCard navigation={this.props.navigation} /> */}
          </View>
        </GlobalWrapper>
      </SafeAreaView>
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
