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
import ProductCard from '../Components/ProductCard';

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView>
        <GlobalWrapper tag={'products'} navigation={this.props.navigation}>
          <TouchableOpacity style={Styles.buttonWrapper}>
            <Text style={Styles.buttonText}>Add Product</Text>
          </TouchableOpacity>

          <View style={styles.wrapperStyle}>
            <ProductCard />
            <ProductCard />
          </View>
        </GlobalWrapper>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapperStyle: {
    padding: 10,
  },
});
