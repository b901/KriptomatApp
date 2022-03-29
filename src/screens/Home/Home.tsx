import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchBar from '../../components/SearchBar';
import CoinCard from '../../components/CoinCard';
import {GRAY} from '../../constants/colors';
import {getCoinsStart} from '../../redux/actions/coinActions';

const Home = ({navigation, getCoins, coins, isLoading}) => {
  const {
    container,
    sortMenuContainer,
    nameSortSection,
    priceSortSection,
    sortText,
    sortButton,
    activityIndicatorContainer,
  } = styles;

  const [coinsList, setCoinsList] = useState(coins);
  const [sortedByName, setSortedByName] = useState('');
  const [sortedByPrice, setSortedByPrice] = useState('');

  useEffect(() => {
    getCoins();
  }, [getCoins]);

  const renderItem = ({item}) => (
    <CoinCard data={item} navigation={navigation} />
  );

  const sortByName = () => {
    let sortedByNameList = null;

    if (!sortedByName || sortedByName === 'desc') {
      sortedByNameList = []
        .concat(coins)
        .sort((a, b) => a.name.localeCompare(b.name));
      setSortedByName('asc');
    } else {
      sortedByNameList = []
        .concat(coins)
        .sort((a, b) => b.name.localeCompare(a.name));
      setSortedByName('desc');
    }

    setCoinsList(sortedByNameList);
  };

  const sortByPrice = () => {
    let sortedByPriceList = null;

    if (!sortedByPrice || sortedByPrice === 'desc') {
      sortedByPriceList = []
        .concat(coins)
        .sort((a, b) => a.current_price - b.current_price);
      setSortedByPrice('asc');
    } else {
      sortedByPriceList = []
        .concat(coins)
        .sort((a, b) => b.current_price - a.current_price);
      setSortedByPrice('desc');
    }

    setCoinsList(sortedByPriceList);
  };

  const renderSortMenu = () => {
    return (
      <View style={sortMenuContainer}>
        <View style={nameSortSection}>
          <TouchableOpacity style={sortButton} onPress={sortByName}>
            <Text style={sortText}>Coin</Text>
            <Icon name="sort" size={15} color={GRAY} />
          </TouchableOpacity>
        </View>
        <View style={priceSortSection}>
          <TouchableOpacity style={sortButton} onPress={sortByPrice}>
            <Text style={sortText}>Price</Text>
            <Icon name="sort" size={15} color={GRAY} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const searchCoins = (query: string): void => {
    const filteredCoinsList = coins?.filter(coin => {
      if (coin?.name?.includes(query) || coin?.symbol?.includes(query)) {
        return true;
      }
      return false;
    });
    setCoinsList(filteredCoinsList);
  };

  const renderSpinnerOrItems = () => {
    if (!isLoading) {
      return (
        <FlatList
          data={(coinsList.length > 0 && coinsList) || coins}
          renderItem={renderItem}
          keyExtractor={item => item?.id}
          ListHeaderComponent={renderSortMenu}
        />
      );
    }
    return (
      <View style={activityIndicatorContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  };

  return (
    <View style={container}>
      <SearchBar handleSearch={searchCoins} />
      {renderSpinnerOrItems()}
    </View>
  );
};

const mapStateToProps = state => {
  return {
    coins: state?.coins?.coins,
    isLoading: state?.coins?.isLoading,
  };
};

const mapDispatchToProps = {
  getCoins: getCoinsStart,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
  },
  sortMenuContainer: {
    width: '100%',
    height: 35,
    flexDirection: 'row',
  },
  nameSortSection: {
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  priceSortSection: {
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  sortText: {
    color: GRAY,
    fontWeight: '600',
    marginRight: 5,
  },
  sortButton: {
    flexDirection: 'row',
  },
  activityIndicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
