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
import * as ImagePicker from 'react-native-image-picker';
import Colors from '../Constants/colors';
import Styles from '../Constants/styles';

import CategoryHelper from '../Helper/category';
import ImageHelper from '../Helper/image';

export default class CreateCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      category_name: '',
      imageFile: undefined,
      // loading: false,
    };
  }

  handleImage = () => {
    const options = {noData: true};
    ImagePicker.launchImageLibrary(options, response => {
      console.log('response', response);
      if (response.uri) {
        this.setState({image: response, imageFile: ''});
      }
    });
  };

  checkData = async () => {
    this.setState({loading: true});
    const {category_name, imageFile, image} = this.state;

    const alertInitText = 'Fill these fields to continue:\n';
    let alertText = alertInitText;

    if (category_name === '') {
      alertText += '• Category Name\n';
    }
    if (imageFile === undefined) {
      alertText += '• Category Image\n';
    }

    if (alertText !== alertInitText) {
      alert(alertText);
      return;
    }

    try {
      const imgLink = await ImageHelper.upload(
        imageFile,
        category_name,
        'category',
      );

      const data = {
        category_name: category_name,
        image: imgLink.remoteUrl,
      };

      CategoryHelper.create(data)
        .then(data => {
          alert('Category Created!');
          window.location = '/admin/category';
        })
        .catch(err => {
          console.log(err);
          alert('Error Creating Category!');
        })
        .finally(() => this.setState({loading: false}));
    } catch (err) {
      this.setState({loading: false});
      console.log(err);
    }
  };

  render() {
    const {image, category_name} = this.state;
    return (
      <SafeAreaView>
        <GlobalWrapper
          tag={'create_category'}
          navigation={this.props.navigation}>
          <View style={styles.flex}>
            <View style={styles.imageContent}>
              <Text style={styles.imageHeading}>{'Upload Category Image'}</Text>

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
                placeholder="Category Name"
                value={category_name}
                onChangeText={value => this.setState({category_name: value})}
              />
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => this.checkData()}
                //   onPress={() => this.props.navigation.navigate('CreateProduct')}
              >
                <Text style={styles.buttonText}> {'Create Category'}</Text>
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
