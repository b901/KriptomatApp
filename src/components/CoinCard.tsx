import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {LIGHT_GRAY, DARK_GRAY, GRAY} from '../constants/colors';
import {SINGLE_CURRENCY} from '../constants/routes';

const CoinCard = ({data, navigation}) => {
  const {
    container,
    iconSection,
    nameSection,
    dataSection,
    fullNameText,
    shortNameText,
    priceText,
    percentText,
    coinIcon,
    nameAndDataSection,
    percentSection,
    percentIconAndNumber,
    negativeNumber,
    positiveNumber,
  } = styles;

  const renderCorrectPercentageColorAndIcon = () => {
    if (data?.price_change_percentage_24h < 0) {
      return (
        <View style={percentIconAndNumber}>
          <Icon name="caret-down" size={20} color="red" />
          <Text style={[percentText, negativeNumber]}>
            {data?.price_change_percentage_24h?.toPrecision(3)}%
          </Text>
        </View>
      );
    }
    return (
      <View style={percentIconAndNumber}>
        <Icon name="caret-up" size={20} color="green" />
        <Text style={[percentText, positiveNumber]}>
          {data?.price_change_percentage_24h?.toPrecision(3)}%
        </Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={container}
      onPress={() => navigation.navigate(SINGLE_CURRENCY, {data})}>
      <View style={iconSection}>
        <Image
          style={coinIcon}
          source={{
            uri: data?.image,
          }}
        />
      </View>
      <View style={nameAndDataSection}>
        <View style={nameSection}>
          <View>
            <Text style={fullNameText}>{data?.name}</Text>
          </View>
          <View>
            <Text style={shortNameText}>{data?.symbol?.toUpperCase()}</Text>
          </View>
        </View>
        <View style={dataSection}>
          <View>
            <Text style={priceText}>${data?.current_price}</Text>
          </View>
          <View style={percentSection}>
            {renderCorrectPercentageColorAndIcon()}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GRAY,
    flexDirection: 'row',
  },
  iconSection: {
    height: '100%',
    width: '12%',
    justifyContent: 'center',
  },
  nameAndDataSection: {
    flexDirection: 'row',
    height: '100%',
    width: '88%',
  },
  nameSection: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%',
    width: '50%',
  },
  dataSection: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '100%',
    width: '50%',
  },
  priceText: {
    fontWeight: '700',
    color: DARK_GRAY,
  },
  percentText: {
    fontWeight: '700',
    color: 'green',
  },
  fullNameText: {
    fontWeight: '700',
    color: DARK_GRAY,
  },
  shortNameText: {
    fontWeight: '300',
    color: GRAY,
  },
  coinIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  percentSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentIconAndNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  negativeNumber: {
    color: 'red',
  },
  positiveNumber: {
    color: 'green',
  },
});

export default CoinCard;
