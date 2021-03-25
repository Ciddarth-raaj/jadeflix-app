import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';

import GlobalWrapper from '../Components/GlobalWrapper';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView>
        <GlobalWrapper tag={'home'}>
          <View>
            <Text>Test</Text>
          </View>
        </GlobalWrapper>
      </SafeAreaView>
    );
  }
}
