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

import ProductHelper from '../Helper/products';
import StoreHelper from '../Helper/store';

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.getProducts();
    this.getStoreData();
  }

  getStoreData = () => {
    StoreHelper.getDataAdmin()
      .then(data => {
        this.setState({
          store_id: data.store_id,
          store_slug: data.store_slug,
        });
      })
      .catch(err => console.log(err));
  };

  getProducts = () => {
    ProductHelper.getAdmin(0, 50, undefined)
      .then(data => this.setState({products: data}))
      .catch(err => console.log(err));
  };

  setStock = (id, val) => {
    const {products} = this.state;

    for (let i in products) {
      if (products[i].id === id) {
        products[i].stock = val;
        break;
      }
    }

    this.setState({products: products});
  };

  render() {
    const {products, store_id, store_slug} = this.state;
    return (
      <SafeAreaView>
        <GlobalWrapper tag={'products'} navigation={this.props.navigation}>
          <TouchableOpacity
            style={Styles.buttonWrapper}
            onPress={() => this.props.navigation.navigate('CreateProduct')}>
            <Text style={Styles.buttonText}>Add Product</Text>
          </TouchableOpacity>

          <View style={styles.wrapperStyle}>
            {products.map(p => (
              <ProductCard
                id={p.product_id}
                name={p.product_name}
                mrp={p.mrp}
                sp={p.sp}
                stock={p.is_active}
                imgLink={p.images[0].link}
                setStock={this.setStock}
                storeDetails={{
                  slug: store_slug,
                  id: store_id,
                }}
              />
            ))}
            {/* <ProductCard />
            <ProductCard /> */}
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
