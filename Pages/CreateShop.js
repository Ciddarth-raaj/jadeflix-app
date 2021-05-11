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
      store_name: '',
      store_owner: '',
      phone: '',
      email: '',
      imageFile: undefined,
      loading: false,
    };
  }

  handleImage = () => {
    const options = {noData: true};
    ImagePicker.launchImageLibrary(options, response => {
      console.log('response', response);
      if (response.uri) {
        this.setState({image: response, imageFile: response});
      }
    });
  };

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  checkValues = async () => {
    const {
      profileImg,
      image,
      store_name,
      store_owner,
      phone,
      email,
      imageFile,
    } = this.state;

    const alertInitText = 'Fill these fields to continue:\n';
    let alertText = alertInitText;

    if (store_name === '') {
      alertText += '• Store Name\n';
    }
    if (store_owner === '') {
      alertText += '• Store Owner Name\n';
    }
    if (phone === '') {
      alertText += '• Store Phone Number\n';
    } else if (phone.length < 10) {
      alertText += '• Invalid Phone Number\n';
    }
    if (email === '') {
      alertText += '• Store Email\n';
    } else if (!this.validateEmail(email)) {
      alertText += '• Invalid Email ID\n';
    }
    if (imageFile === undefined) {
      alertText += '• Store Logo\n';
    }

    if (alertText !== alertInitText) {
      alert(alertText);
      return;
    }

    try {
      this.setState({loading: true});
      const {is_available} = await StoreHelper.preCheck(store_name);

      if (is_available) {
        const imgLink = await ImageHelper.upload(
          imageFile,
          store_name,
          store_name,
        );

        const data = {
          store_name: store_name,
          store_owner_name: store_owner,
          store_phone: phone,
          store_email: email,
          store_picture: imgLink.remoteUrl,
        };

        StoreHelper.create(data)
          .then(data => {
            if (data.code == 200) {
              alert('Store Successfully Created!\nLogin to Continue!');
              localStorage.clear();
              window.location = '/admin/login';
            } else {
              throw 'Error Creating!';
            }
          })
          .catch(err => {
            console.log(err);
            alert('Error Creating Shop! Try Again Later!');
          })
          .finally(() => this.setState({loading: false}));
      } else {
        this.setState({loading: false});
        alert('Store Name already exists!');
      }
    } catch (err) {
      this.setState({loading: false});
      alert('Error Creating Shop! Try Again Later!');
      console.log(err);
    }
  };

  updatePhone(phone) {
    if (
      phone.length <= 10 &&
      (parseInt(phone) > 0 || phone == '') &&
      phone.match('^[0-9]*$')
    )
      this.setState({phone: phone});
  }

  render() {
    const {image, store_name, store_owner, phone, email, loading} = this.state;
    return (
      <SafeAreaView>
        <GlobalWrapper tag={'createshop'} navigation={this.props.navigation}>
          <View style={styles.flex}>
            <Text style={styles.imageMainHeading}>{'Welcome To Jadeflix'}</Text>
            <View style={styles.imageContent}>
              <Text style={styles.imageHeading}>{'Upload Store Logo'}</Text>

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
                value={store_name}
                onChangeText={value => this.setState({store_name: value})}
              />
              <TextInput
                style={styles.inputText}
                placeholder="Store Phone Number"
                keyboardType="numeric"
                value={phone}
                onChangeText={value => this.updatePhone(value)}
              />
              <TextInput
                style={styles.inputText}
                placeholder="Store Owner Name"
                value={store_owner}
                onChangeText={value => this.setState({store_owner: value})}
              />
              <TextInput
                style={styles.inputText}
                placeholder="Store Email"
                value={email}
                onChangeText={value => this.setState({email: value})}
              />
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => this.checkValues()}>
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
