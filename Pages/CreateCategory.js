import React, {Component} from 'react';
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

export default class CreateCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      photo: true,
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

  imageHandler = e => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({image: reader.result});
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    this.setState({imageFile: e.target.files[0]});
  };

  render() {
    const {image, imageHandler, photo} = this.state;
    return (
      <SafeAreaView>
        <GlobalWrapper
          tag={'create_category'}
          navigation={this.props.navigation}>
          <View style={styles.flex}>
            <View style={styles.imageContent}>
              <Text style={styles.imageHeading}>
                {' '}
                {'Upload Category Image'}
              </Text>

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
              {/* <View>
              {photo ? (
                <Image
                  source={{
                    uri:
                      'https://images.unsplash.com/photo-1619443710840-b0e18ecb6e52?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1030&q=80',
                  }}
                  style={styles.img}
                />
              ) : (
                image && (
                  <Image
                    source={{uri: image.uri}}
                    style={styles.img}
                    onPress={this.setState({
                      photo: false,
                    })}
                  />
                )
              )}
            </View> */}
              <View style={styles.imgHolder}>
                {image && (
                  <Image source={{uri: image.uri}} style={styles.img} />
                )}
              </View>

              {/* <Image
              source={{
                uri:
                  'https://images.unsplash.com/photo-1619443710840-b0e18ecb6e52?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1030&q=80',
              }}
              style={styles.img}
            /> */}
            </View>
            <View style={styles.rightContent}>
              <TextInput
                style={styles.inputText}
                placeholder="Category Name"
                //   value={category_name}
                //   onChange={e => this.setState({category_name: e.target.value})}
              />
              <TouchableOpacity
                style={styles.buttonWrapper}
                //   onPress={() => this.props.navigation.navigate('CreateProduct')}
              >
                <Text style={styles.buttonText}> {'Create Category'}</Text>
              </TouchableOpacity>
              {/* <button
							className={styles.button}
							onClick={() => this.checkData()}
						>
							{"Create Category"}
						</button> */}
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
