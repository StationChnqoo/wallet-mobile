import type {PropsWithChildren} from 'react';
import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {RootStacksProp} from '..';
import MarketItem from '@src/components/MarketItem';

interface MyProps {
  navigation?: RootStacksProp;
}

const MarketScreen: React.FC<MyProps> = props => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{height: useSafeAreaInsets().top, backgroundColor: '#fff'}}
      />
      <FlatList
        data={Array.from({length: 10}, _ => `${_}`)}
        renderItem={info => <MarketItem />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default MarketScreen;
