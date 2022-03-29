import * as React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {PRIMARY_BLUE, WHITE} from '../constants/colors';

type ButtonProps = {
  label: string;
  onPress: Function;
};

const Button = ({label, onPress}: ButtonProps) => {
  const {container, buttonText} = styles;

  return (
    <TouchableOpacity style={container} onPress={onPress}>
      <Text style={buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_BLUE,
    borderRadius: 10,
  },
  buttonText: {
    color: WHITE,
    fontWeight: '600',
  },
});

export default Button;
