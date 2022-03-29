import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator,
  Image,
  Linking,
} from 'react-native';
import {connect} from 'react-redux';
// @ts-ignore
import moment from 'moment';
import {LineChart} from 'react-native-chart-kit';
import SwitchSelector from 'react-native-switch-selector';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/Button';
import {
  WHITE,
  DARK_GRAY,
  GRAY,
  PRIMARY_BLUE,
  LIGHT_GRAY,
} from '../../constants/colors';
import {getPriceHistoryStart} from '../../redux/actions/priceHistoryActions';

const SingleCurrency = ({
  route,
  getPriceHistory,
  prices,
  isLoading,
  navigation,
}) => {
  const {
    container,
    mainSection,
    overviewSection,
    mainDataSection,
    chartSection,
    buttonSection,
    priceAndPercentSection,
    priceSection,
    percentSection,
    mainPriceText,
    percentContainer,
    percentText,
    lowAndHighSection,
    spacer,
    highLowPriceText,
    hourText,
    overviewHeadlineSection,
    overviewHeadlineText,
    volumeAndMarketCapSection,
    volumeSection,
    overviewSmallText,
    overviewNumber,
    marketCapSection,
    circulationSupplyMainSection,
    circulationSupplySection,
    emptyOverviewSection,
    customSwitchSelectorStyle,
    negativePercentage,
    positivePercentage,
    negativePercentageContainer,
    positivePercentageContainer,
    activityIndicatorContainer,
  } = styles;

  const {data} = route.params;

  const chartData = {
    datasets: [
      {
        data: (prices.length > 0 && prices) || [0, 0, 0, 0, 0],
        color: () => 'rgba(14, 127, 213, 1)',
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: WHITE,
    backgroundGradientTo: WHITE,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    withDots: false,
    withShadow: false,
    withVerticalLines: false,
    withVerticalLabels: false,
    withHorizontalLabels: false,
  };

  const currentTimePeriod = moment().unix();

  const [timePeriodInThePast, setTimePeriodInThePast] = useState(
    moment().subtract(24, 'hours').unix(),
  );

  const renderHeaderTitle = () => {
    const {headerContainer, coinIcon, headerText, headerTitleSpacer} = styles;
    return (
      <View style={headerContainer}>
        <Image
          style={coinIcon}
          source={{
            uri: data?.image,
          }}
        />
        <View style={headerTitleSpacer} />
        <Text style={headerText}>{data?.name}</Text>
      </View>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => renderHeaderTitle(),
    });
  }, [navigation]);

  useEffect(() => {
    getPriceHistory(data?.id, timePeriodInThePast, currentTimePeriod);
  }, [data?.id, getPriceHistory, currentTimePeriod, timePeriodInThePast]);

  const options = [
    {label: '24h', value: '24h'},
    {label: '1W', value: '1W'},
    {label: '1M', value: '1M'},
    {label: '1Y', value: '1Y'},
    {label: 'All', value: 'All'},
  ];

  const setPeriod = (switchSelectorValue: string) => {
    if (switchSelectorValue === '24h') {
      setTimePeriodInThePast(moment().subtract(24, 'hours').unix());
    } else if (switchSelectorValue === '1W') {
      setTimePeriodInThePast(moment().subtract(7, 'days').unix());
    } else if (switchSelectorValue === '1M') {
      setTimePeriodInThePast(moment().subtract(1, 'months').unix());
    } else if (switchSelectorValue === '1Y') {
      setTimePeriodInThePast(moment().subtract(1, 'years').unix());
    }
  };

  const renderCorrectPercentageColorAndIcon = () => {
    if (data?.price_change_percentage_24h < 0) {
      return (
        <View style={[percentContainer, negativePercentageContainer]}>
          <Icon name="caret-down" size={25} color={'red'} />
          <Text style={[percentText, negativePercentage]}>
            {data?.price_change_percentage_24h.toPrecision(3)}%
          </Text>
        </View>
      );
    }
    return (
      <View style={[percentContainer, positivePercentageContainer]}>
        <Icon name="caret-up" size={25} color={'green'} />
        <Text style={[percentText, positivePercentage]}>
          {data?.price_change_percentage_24h.toPrecision(3)}%
        </Text>
      </View>
    );
  };

  return (
    <View style={container}>
      <View style={mainSection}>
        <View style={mainDataSection}>
          <View style={priceAndPercentSection}>
            <View style={priceSection}>
              <Text style={mainPriceText}>
                € {Number(data?.current_price).toLocaleString()}
              </Text>
            </View>
            <View style={percentSection}>
              {renderCorrectPercentageColorAndIcon()}
            </View>
          </View>
          <View style={lowAndHighSection}>
            <Text style={hourText}>24h Low </Text>
            <Text style={highLowPriceText}>
              € {Number(data?.low_24h).toLocaleString()}
            </Text>
            <View style={spacer} />
            <Text style={hourText}>24h High </Text>
            <Text style={highLowPriceText}>
              € {Number(data?.high_24h).toLocaleString()}
            </Text>
          </View>
        </View>
        <View style={chartSection}>
          {isLoading ? (
            <View style={activityIndicatorContainer}>
              <ActivityIndicator size={'large'} />
            </View>
          ) : (
            <LineChart
              withDots={false}
              data={chartData}
              width={Dimensions.get('window').width - 40}
              height={170}
              chartConfig={chartConfig}
              bezier
            />
          )}
          <SwitchSelector
            options={options}
            initial={0}
            onPress={value => setPeriod(value)}
            textColor={PRIMARY_BLUE}
            selectedColor={WHITE}
            buttonColor={PRIMARY_BLUE}
            borderColor={'transparent'}
            animationDuration={0}
            height={20}
            style={customSwitchSelectorStyle}
          />
        </View>
      </View>
      <View style={buttonSection}>
        <Button
          label={'Buy, Sell or Exchange Bitcoin'}
          onPress={() => Linking.openURL('https://app.kriptomat.io')}
        />
      </View>
      <View style={overviewSection}>
        <View style={overviewHeadlineSection}>
          <Text style={overviewHeadlineText}>Overview</Text>
        </View>
        <View style={volumeAndMarketCapSection}>
          <View style={volumeSection}>
            <Text style={overviewSmallText}>Volume (1d):</Text>
            <Text style={overviewNumber}>
              € {Number(data?.total_volume).toLocaleString()}
            </Text>
          </View>
          <View style={marketCapSection}>
            <Text style={overviewSmallText}>Market cap:</Text>
            <Text style={overviewNumber}>
              € {Number(data?.market_cap).toLocaleString()}
            </Text>
          </View>
        </View>
        <View style={circulationSupplyMainSection}>
          <View style={circulationSupplySection}>
            <Text style={overviewSmallText}>Circulation supply:</Text>
            <Text style={overviewNumber}>
              {`${Number(
                Math.round(data?.circulating_supply),
              ).toLocaleString()} ${data?.symbol?.toUpperCase()}`}
            </Text>
          </View>
          <View style={emptyOverviewSection} />
        </View>
        <View />
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    prices: state?.priceHistory?.prices,
    isLoading: state?.priceHistory?.isLoading,
  };
};

const mapDispatchToProps = {
  getPriceHistory: getPriceHistoryStart,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  mainSection: {
    paddingRight: 20,
    paddingLeft: 20,
    height: 300,
    width: '100%',
    marginTop: 10,
  },
  mainDataSection: {
    width: '100%',
    height: 55,
  },
  priceAndPercentSection: {
    flexDirection: 'row',
    height: '50%',
    width: '100%',
  },
  priceSection: {
    height: '100%',
    width: '50%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  percentSection: {
    height: '100%',
    width: '50%',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  percentContainer: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    height: 25,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'green',
    marginLeft: 5,
  },
  highLowPriceText: {
    fontSize: 12,
    fontWeight: '600',
  },
  hourText: {
    fontSize: 12,
    fontWeight: '300',
  },
  lowAndHighSection: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  spacer: {
    height: '100%',
    width: 20,
  },
  chartSection: {
    width: '100%',
    height: 250,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonSection: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
  overviewSection: {
    width: '100%',
  },
  mainPriceText: {
    fontSize: 24,
    fontWeight: '500',
    color: DARK_GRAY,
  },
  overviewHeadlineSection: {
    width: '100%',
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GRAY,
  },
  overviewHeadlineText: {
    color: DARK_GRAY,
    fontWeight: '600',
    fontSize: 20,
  },
  volumeAndMarketCapSection: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GRAY,
  },
  volumeSection: {
    width: '50%',
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
  },
  overviewSmallText: {
    fontWeight: '300',
    color: GRAY,
    marginBottom: 5,
  },
  overviewNumber: {
    fontWeight: '600',
    color: DARK_GRAY,
  },
  marketCapSection: {
    width: '50%',
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: LIGHT_GRAY,
  },
  circulationSupplyMainSection: {
    width: '100%',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GRAY,
    flexDirection: 'row',
  },
  circulationSupplySection: {
    width: '50%',
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: LIGHT_GRAY,
  },
  emptyOverviewSection: {
    width: '50%',
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: LIGHT_GRAY,
  },
  customSwitchSelectorStyle: {
    width: '75%',
  },
  negativePercentage: {
    color: 'red',
  },
  positivePercentage: {
    color: 'green',
  },
  negativePercentageContainer: {
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
  },
  positivePercentageContainer: {
    backgroundColor: 'rgba(0, 128, 0, 0.3)',
  },
  activityIndicatorContainer: {
    height: 170,
    width: Dimensions.get('window').width - 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -200,
  },
  coinIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  headerText: {
    fontWeight: '600',
    fontSize: 20,
    color: DARK_GRAY,
  },
  headerTitleSpacer: {
    width: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleCurrency);
