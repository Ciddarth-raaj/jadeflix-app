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

export default class Forgot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
    };
  }
  render() {
    const {phone} = this.state;
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
            />
          </View>

          <TouchableOpacity style={styles.buttonWrapper}>
            <Text style={Styles.buttonText}>Send OTP</Text>
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
