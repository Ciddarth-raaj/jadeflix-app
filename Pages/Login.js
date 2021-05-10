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
} from 'react-native';
import GlobalWrapper from '../Components/GlobalWrapper';
import Styles from '../Constants/styles';
import Colors from '../Constants/colors';
import AdminHelper from '../Helper/admin';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      loginWithOtp: false,
      otp: '',
    };
  }

  updatePhone(phone) {
    if (
      phone.length <= 10 &&
      (parseInt(phone) > 0 || phone == '') &&
      phone.match('^[0-9]*$')
    )
      this.setState({phone: phone});
  }

  checkInput = () => {
    const {phone, password, loginWithOtp, otp} = this.state;

    if (phone.length < 10) {
      alert('Enter a valid phone number!');
    } else if (
      phone === '' ||
      (!loginWithOtp && password === '') ||
      (loginWithOtp && otp == '' && isNaN(otp) && otp.length !== 4)
    ) {
      alert('Fill all details to continue!');
    } else {
      if (loginWithOtp) {
        this.loginOtp(otp);
      } else {
        this.login(phone, password);
      }
    }
  };

  login(phone, password) {
    new AdminHelper.login(phone, password)
      .then(data => {
        if (data.code == 200) {
          this.setDataLogin(data);
        } else if (data.code == 204) {
          alert('Incorrect phone number or password!');
        }
      })
      .catch(err => {
        console.log(err);
        alert('An error occured! Try again later');
      });
  }

  loginOtp(otp) {
    new AdminHelper.loginWithOtp(otp)
      .then(data => {
        if (data.code == 200) {
          this.setDataLogin(data);
        } else {
          alert('Incorrect OTP!');
        }
      })
      .catch(err => {
        console.log(err);
        alert('An error occured! Try again later');
      });
  }

  // setDataLogin(data) {
  //   localStorage.setItem('tokenAdmin', data.token);
  //   localStorage.setItem('store_id', data.store_id);
  //   if (data.store_id == null) {
  //     window.location = '/admin/create-shop';
  //   } else {
  //     window.location = '/admin';
  //   }
  // }
  setDataLogin = async data => {
    try {
      await AsyncStorage.setItem('tokenAdmin', data.token);
      await AsyncStorage.setItem('store_id', data.store_id);
    } catch (e) {
      // saving error
    }
    if (data.store_id == null) {
      this.props.navigation.navigate('Orders');
    } else {
      this.props.navigation.navigate('CreateCategory');
    }
  };

  async sendOtp() {
    const {phone} = this.state;

    if (phone.length == 10 && !isNaN(phone)) {
      await AdminHelper.sendLoginOtp(phone);
      alert('OTP Sent to your phone!');
    } else {
      alert('Invalid Phone Number!');
    }
  }

  //   async sendOtp() {
  //     const {phone} = this.state;

  //     if (phone.length == 10 && !isNaN(phone)) {
  //       await AdminHelper.sendLoginOtp(phone);
  //       alert('OTP Sent to your phone!');
  //     } else {
  //       alert('Invalid Phone Number!');
  //     }
  //   }

  render() {
    const {loginWithOtp, password, otp, phone} = this.state;
    return (
      <SafeAreaView>
        <GlobalWrapper tag={'login'} navigation={this.props.navigation}>
          <View style={styles.wrapper}>
            <Text style={styles.heading}>Login</Text>
            <View style={styles.fieldHolder}>
              <TextInput
                style={styles.input}
                placeholder="Phone"
                value={phone}
                keyboardType="numeric"
                //   onChangeText={phone => this.updatePhone(e.target.value)}
                onChangeText={value => this.updatePhone(value)}
              />
              {loginWithOtp && (
                <Text style={styles.sendOTPText} onPress={() => this.sendOtp()}>
                  SEND OTP
                </Text>
              )}
            </View>
            {loginWithOtp ? (
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                value={otp}
                onChangeText={value => this.setState({otp: value})}
              />
            ) : (
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Password"
                value={password}
                onChangeText={value =>
                  this.setState({
                    password: value,
                  })
                }
              />
            )}

            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => this.checkInput()}>
              <Text style={Styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.bottomContent}>
              <Text>New to Jadeflix?</Text>
              <TouchableOpacity>
                <Text style={styles.textContent}>Create your Account Now</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => this.setState({loginWithOtp: !loginWithOtp})}>
              {loginWithOtp ? (
                <Text style={styles.bottomText}>Login with Password</Text>
              ) : (
                <Text style={styles.bottomText}>Login with OTP</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Forgot')}>
              <Text style={styles.bottomText}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
        </GlobalWrapper>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  fieldHolder: {
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  heading: {
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 25,
  },
  input: {
    position: 'relative',
    width: '100%',
    height: 40,
    borderRadius: 9,
    marginBottom: 21,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#efefef',
  },
  buttonWrapper: {
    padding: 15,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 21,
  },
  bottomContent: {
    display: 'flex',
    flexDirection: 'row',
  },
  textContent: {
    marginLeft: 6,
  },
  bottomText: {
    fontSize: 14,
    color: '#0088ff',
    marginTop: 10,
  },
  sendOTPText: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0088ff',
  },
});
