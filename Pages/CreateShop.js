import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Button,
  TextInput,
  Image,
} from 'react-native';
import GlobalWrapper from '../Components/GlobalWrapper';
import Styles from '../Constants/styles';
import Colors from '../Constants/colors';
import * as ImagePicker from 'react-native-image-picker';

export default class CreateShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }

  handleImage = () => {
    const options = {noData: true};
    ImagePicker.launchImageLibrary(options, response => {
      console.log('response', response);
      if (response.uri) {
        this.setState({image: response});
      }
    });
  };

  render() {
    const {image} = this.state;
    return (
      <SafeAreaView>
        <GlobalWrapper tag={'createshop'} navigation={this.props.navigation}>
          <View style={styles.flex}>
            <Text style={styles.imageMainHeading}>{'Welcome To Jadeflix'}</Text>
            <View style={styles.imageContent}>
              <Text style={styles.imageHeading}>{'Upload Store Logo'}</Text>

              {/* <TextInput
              style={styles.input}
              type="file"
              id="fileUpload"
              accept="image/*"
              name="image-upload"
              //   onChange={this.handleImage}
            /> */}

              <View style={styles.label}>
                <Button
                  title="Choose File"
                  // for="fileUpload"
                  onPress={this.handleImage}
                />
                {/* Select file
              </Button> */}
              </View>

              <View style={styles.imgHolder}>
                {image && (
                  <Image source={{uri: image.uri}} style={styles.img} />
                )}
              </View>
            </View>
            <View style={styles.rightContent}>
              <TextInput
                style={styles.inputText}
                placeholder="Store Name"
                //   value={category_name}
                //   onChange={e => this.setState({category_name: e.target.value})}
              />
              <TextInput
                style={styles.inputText}
                placeholder="Store Phone Number"
                keyboardType="numeric"
                //   value={category_name}
                //   onChange={e => this.setState({category_name: e.target.value})}
              />
              <TextInput
                style={styles.inputText}
                placeholder="Store Owner Name"
                //   value={category_name}
                //   onChange={e => this.setState({category_name: e.target.value})}
              />
              <TextInput
                style={styles.inputText}
                placeholder="Store Email"
                //   value={category_name}
                //   onChange={e => this.setState({category_name: e.target.value})}
              />
              <TouchableOpacity
                style={styles.buttonWrapper}
                //   onPress={() => this.props.navigation.navigate('CreateProduct')}
              >
                <Text style={styles.buttonText}> {'Create Shop'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </GlobalWrapper>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  imgHolder: {
    width: 150,
    height: 150,
    backgroundColor: 'grey',
  },
  img: {
    width: 150,
    height: 150,
  },

  label: {
    backgroundColor: Colors.primary,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  image: {
    marginTop: 300,
  },
  imageContent: {
    width: 350,
    backgroundColor: '#efefef',
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 30,
  },

  imageHeading: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageMainHeading: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 26,
    marginBottom: 20,
    marginTop: 20,
  },

  label: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#929292',
    paddingBottom: 10,
  },

  flex: {
    display: 'flex',
    flexDirection: 'column',
  },

  inputText: {
    width: 400,
    height: 40,
    backgroundColor: '#efefef',
    borderRadius: 9,
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },

  rightContent: {
    marginTop: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },
  buttonWrapper: {
    padding: 15,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
});
