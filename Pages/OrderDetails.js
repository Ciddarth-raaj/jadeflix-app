import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Share,
  Button,
  ScrollView,
  Image,
} from 'react-native';
import GlobalWrapper from '../Components/GlobalWrapper';
import OrderProductCard from '../Components/OrderProductCard';
// import styles from '../Constants/styles';

export default class OrderId extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: '1',
          name: 'The lean startup',
          price: '100',
          qty: '2',
          total: '200',
        },
        {
          id: '2',
          name: 'The lean startup',
          price: '100',
          qty: '2',
          total: '200',
        },
        {
          id: '3',
          name: 'The lean startup',
          price: '100',
          qty: '2',
          total: '200',
        },
        {
          id: '4',
          name: 'The lean startup',
          price: '100',
          qty: '2',
          total: '200',
        },
      ],
    };
  }

  render() {
    const {items} = this.state;
    return (
      <SafeAreaView>
        <GlobalWrapper tag={'order_id'} navigation={this.props.navigation}>
          <View style={styles.topContent}>
            <View style={styles.topContentView}>
              <Text style={styles.contentText}>
                {'Customer Name : '}
                <Text style={styles.contentTextSpan}>Random</Text>
              </Text>
              <Text style={styles.contentText}>
                {'Customer Number : '}
                <Text style={styles.contentTextSpan}>Random</Text>
              </Text>
            </View>
            <View style={styles.topContentView}>
              <Text style={styles.contentText}>
                {'Customer Number : '}
                <Text style={styles.contentTextSpan}>Address</Text>
              </Text>
            </View>

            <View style={styles.topContentView}>
              <Text style={styles.contentText}>
                {'Status : '}
                <Text style={styles.contentTextSpan}>Random</Text>
              </Text>
            </View>
          </View>

          <View style={styles.bottomcontent}>
            <Text>Products</Text>
            <View style={styles.line} />
            <View>
              {items.map(item => (
                <OrderProductCard
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  qty={item.qty}
                  total={item.total}
                />
              ))}
            </View>
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
  //   .topContent {
  //     display: flex;
  //     justify-content: space-between;
  //     background-color: #efefef;
  //     padding: 10px;
  //     border-radius: 10px;
  //     flex-wrap: wrap;
  //   }

  topContent: {
    display: 'flex',
    // flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#efefef',
    padding: 10,
    borderRadius: 10,
    flexWrap: 'wrap',
  },

  topContentView: {
    flex: 1,
  },

  contentText: {
    fontWeight: 'bold',
    margin: 10,
  },

  contentTextSpan: {
    fontWeight: 'normal',
  },

  bottomcontent: {
    marginTop: 20,
  },

  //   .line {
  //     margin-bottom: 10px;
  //     margin-top: 10px;
  //     height: 1px;
  //     width: 100%;
  //     background: rgb(226, 226, 226);
  //   }

  line: {
    marginBottom: 10,
    marginTop: 10,
    height: 1,
    width: '100%',
    backgroundColor: 'rgb(226, 226, 226)',
  },
});
