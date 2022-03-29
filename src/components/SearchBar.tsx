import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {WHITE, GRAY, DARK_GRAY} from '../constants/colors';
import {useState} from 'react';

type SearchBarProps = {
  handleSearch: Function;
};

const SearchBar = ({handleSearch}: SearchBarProps) => {
  const {container, input, shadow, iconSection, inputSection, closeButton} =
    styles;

  const [searchedText, setSearchedText] = useState('');

  const search = (query: string): void => {
    setSearchedText(query);
    handleSearch(query);
  };

  const clearSearch = (): void => {
    setSearchedText('');
    handleSearch('');
  };

  return (
    <View style={[container, shadow]}>
      <View style={iconSection}>
        <Icon name="search" size={20} color={GRAY} />
      </View>
      <View style={inputSection}>
        <TextInput
          placeholder={'Search'}
          style={input}
          onChangeText={query => search(query)}
          value={searchedText}
        />
      </View>
      <View style={iconSection}>
        <TouchableOpacity style={closeButton} onPress={clearSearch}>
          <Icon name="close" size={20} color={GRAY} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: WHITE,
    flexDirection: 'row',
  },
  input: {
    height: 50,
    backgroundColor: WHITE,
  },
  shadow: {
    shadowColor: DARK_GRAY,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  iconSection: {
    height: 50,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputSection: {
    height: 50,
    flex: 1,
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchBar;
