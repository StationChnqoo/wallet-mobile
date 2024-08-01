import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksProp} from '..';
import SearchBar from './SearchBar';

interface MyProps {
  navigation?: RootStacksProp;
}

const OrderScreen: React.FC<MyProps> = props => {
  const [keyword, setKeyword] = useState('');
  const [filterStatus, setFilterStatus] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: '#fafafa'}}>
      <View
        style={{height: useSafeAreaInsets().top, backgroundColor: 'white'}}
      />
      <SearchBar
        onFilterPress={() => {
          setFilterStatus(!filterStatus);
        }}
        onSearchPress={() => {}}
        filterStatus={filterStatus}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default OrderScreen;
