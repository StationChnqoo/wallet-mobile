import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksProp} from '..';
import SearchBar from './components/SearchBar';

interface MyProps {
  navigation?: RootStacksProp;
}

const OrderScreen: React.FC<MyProps> = props => {
  const [keyword, setKeyword] = useState('');
  const [filterStatus, setFilterStatus] = useState(false);
  const [filters, setFilters] = useState([]);

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
        filters={filters}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default OrderScreen;
