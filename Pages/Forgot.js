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
import Styles from '../Constants/styles';
import Colors from '../Constants/colors';

import AdminHelper from '../Helper/admin';

export default class Forgot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      sentOtp: false,
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

  checkInput() {
    const {password, otp} = this.state;

    if (password == '' || otp == '') {
      alert('Fill all fields!');
    } else if (otp.length !== 4) {
      alert('Invalid OTP!');
    } else {
      AdminHelper.changePassword(otp, password)
        .then(data => {
          if (data.code == 200) {
            alert('Password successfully chnaged!');
            window.location = '/admin/login';
          } else if (data.code == 400) {
            alert('OTP is incorrect!');
          } else {
            alert('Error changing password!');
          }
        })
        .catch(err => {
          alert('Error changing password!');
          console.log(err);
        });
    }
  }

  async sendOtp() {
    const {phone} = this.state;

    if (phone.length == 10 && !isNaN(phone)) {
      AdminHelper.sendForgotOtp(phone)
        .then(data => {
          if (data.code == 200) {
            alert('OTP Sent to your phone!');
            this.setState({sentOtp: true});
          } else if (data.code == 400) {
            alert('Phone Number Not found!');
          } else {
            alert('Error sending OTP!');
          }
        })
        .catch(err => console.log(err));
    } else {
      alert('Invalid Phone Number!');
    }
  }

  render() {
    const {phone, password, sentOtp, otp} = this.state;
    return (
      <SafeAreaView>
        <View style={styles.wrapper}>
          <Text style={styles.heading}>Forgot Password</Text>

          <View style={styles.fieldHolder}>
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={phone}
              keyboardType="numeric"
              onChangeText={value => this.updatePhone(value)}
            />
          </View>

          {sentOtp && (
            <View>
              <View style={styles.fieldHolder}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={value =>
                    this.setState({
                      password: value,
                    })
                  }
                />
              </View>
              <View style={styles.fieldHolder}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter OTP"
                  value={otp}
                  onChangeText={value =>
                    this.setState({
                      otp: value,
                    })
                  }
                />
              </View>
            </View>
          )}

          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={() => (sentOtp ? this.checkInput() : this.sendOtp())}>
            <Text style={Styles.buttonText}>
              {sentOtp ? 'Change Password' : 'Send OTP'}
            </Text>
          </TouchableOpacity>
        </View>
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
    padding: 20,
    height: '100%',
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
