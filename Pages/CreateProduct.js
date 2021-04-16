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
  TextInput,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import Colors from '../Constants/colors';
import Styles from '../Constants/styles';

import GlobalWrapper from '../Components/GlobalWrapper';

export default class CreateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: undefined,
    };
  }

  render() {
    return (
      <SafeAreaView>
        <GlobalWrapper tag={'products'} navigation={this.props.navigation}>
          <TextInput style={[Styles.inputBox]} placeholder={'Product Name'} />
          <TextInput style={[Styles.inputBox]} placeholder={'MRP'} />
          <TextInput style={[Styles.inputBox]} placeholder={'Selling Price'} />
          <TextInput
            style={[Styles.inputBox, {height: 100, paddingTop: 20}]}
            placeholder={'Description'}
            multiline={true}
            numberOfLines={4}
          />
          <ModalDropdown
            options={[
              'option 1',
              'option 2',
              'option 1',
              'option 2',
              'option 1',
              'option 2',
              'option 1',
              'option 2',
              'option 1',
              'option 2',
            ]}
            isFullWidth={true}
            onSelect={v => console.log(v)}
            style={[Styles.inputBox, {justifyContent: 'center'}]}
          />

          <TouchableOpacity
            style={[
              Styles.buttonWrapper,
              {width: '100%', alignItems: 'center', marginTop: 20},
            ]}>
            <Text style={Styles.buttonText}>Add Product</Text>
          </TouchableOpacity>
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
