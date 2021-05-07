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
import CategoryCard from '../Components/CategoryCard';

import CategoryHelper from '../Helper/category';

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    CategoryHelper.getAdmin()
      .then(data => {
        this.setState({categories: data});
      })
      .catch(err => console.log(err));
  };

  render() {
    const {categories} = this.state;
    return (
      <SafeAreaView>
        <GlobalWrapper tag={'category'} navigation={this.props.navigation}>
          <TouchableOpacity
            style={Styles.buttonWrapper}
            onPress={() => this.props.navigation.navigate('CreateCategory')}>
            <Text style={Styles.buttonText}>Add Category</Text>
          </TouchableOpacity>

          <View style={styles.wrapperStyle}>
            {categories.map(c => (
              <CategoryCard
                id={c.category_id}
                name={c.category_name}
                image={c.image}
              />
            ))}
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
