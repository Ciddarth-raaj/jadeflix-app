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

export default class OrderProductCard extends React.Component {
  render() {
    const {id, name, price, total, qty} = this.props;
    return (
      <View style={styles.wrapper}>
        <Text style={styles.content}>{id}</Text>
        <Text style={styles.content}>{name}</Text>
        <Text style={styles.content}>{price}</Text>
        <Text style={styles.content}>{qty}</Text>
        <Text style={styles.content}>{total}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#efefef',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
});
