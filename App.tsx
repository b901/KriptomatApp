import * as React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import HomeStack from './src/navigation/HomeStack';
import Footer from './src/components/Footer';
import {PRIMARY_BLUE} from './src/constants/colors';

const App = () => {
  const {container} = styles;

  return (
    // @ts-ignore
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={container}>
          <StatusBar backgroundColor={PRIMARY_BLUE} />
          <HomeStack />
          <Footer />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
