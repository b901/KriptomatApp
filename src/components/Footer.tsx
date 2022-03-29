import React from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import Button from './Button';
import {DARK_GRAY, WHITE} from '../constants/colors';

const Footer = () => {
  const {container, shadow} = styles;

  return (
    <View style={[container, shadow]}>
      <Button
        label="Kriptomat account"
        onPress={() => Linking.openURL('https://app.kriptomat.io')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 80,
    zIndex: 1,
    backgroundColor: WHITE,
    paddingLeft: 20,
    paddingRight: 20,
  },
  shadow: {
    shadowColor: DARK_GRAY,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    elevation: 1,
  },
});

export default Footer;
