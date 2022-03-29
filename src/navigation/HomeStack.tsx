import * as React from 'react';
import Home from '../screens/Home/Home';
import SingleCurrency from '../screens/SingleCurrency/SingleCurrency';
import KriptomatLogo from '../assets/logos/KriptomatLogo';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HOME, SINGLE_CURRENCY} from '../constants/routes';
import {WHITE} from '../constants/colors';

const HomeStackNavigator = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen
        name={HOME}
        component={Home}
        options={{
          headerTitle: () => <KriptomatLogo />,
          headerStyle: {
            backgroundColor: WHITE,
          },
        }}
      />
      <HomeStackNavigator.Screen
        name={SINGLE_CURRENCY}
        component={SingleCurrency}
        options={{
          headerBackTitle: '',
          headerTitle: '',
          headerStyle: {
            backgroundColor: WHITE,
          },
        }}
      />
    </HomeStackNavigator.Navigator>
  );
};

export default HomeStack;
