import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

import Styles from '../Constants/styles';
import Colors from '../Constants/colors';

export default class NavigationDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {menu, setVisibility} = this.props;
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setVisibility(false)}>
          <Text>{'X'}</Text>
        </TouchableOpacity>
        {Object.keys(menu).map(m => (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(menu[m].pageName)}>
            <Text style={styles.menuText}>{menu[m].title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: '100%',
    width: 200,
    backgroundColor: Colors.primary,
    position: 'absolute',
    zIndex: 10,
    alignItems: 'center',
    paddingTop: 30,
  },
  menuText: {
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    left: 220,
    top: 20,
  },
});
