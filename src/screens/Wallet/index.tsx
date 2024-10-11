import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {MyWallet} from '@src/constants/Constants';
import {RealBuyFund} from '@src/constants/Interfaces';
import Services from '@src/constants/Services';
import x from '@src/constants/x';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksProp} from '..';
import WallectItem from './components/Item';

interface MyProps {
  navigation?: RootStacksProp;
}

const WalletScreen: React.FC<MyProps> = props => {
  const [datas, setDatas] = useState<RealBuyFund[]>([]);

  const renderListHeader = () => {
    return (
      <View>
        <View style={{height: 12}} />
        <View style={styles.card}>
          <Text
            style={{color: '#333', fontSize: x.scale(18), fontWeight: '500'}}>
            概览
          </Text>
        </View>
        <View style={{}} />
        <View style={{height: 12}} />
      </View>
    );
  };

  const calcCount = async () => {};

  const loadFundDetails = async () => {
    let _datas = [...MyWallet];
    for (let i = 0; i < _datas.length; i++) {
      let result = await new Services().selectTianTianFundDetail(_datas[i].id);
      let data = result.data?.[0];
      _datas[i].currentPrice = data.DWJZ;
      _datas[i].tiantianUpdateDate = data.FSRQ;
      _datas[i].rateToday = data.RZDF;
      // console.log(`loadFundDetails: ${_datas[i].id}`, data);
    }
    setDatas(_datas);
  };

  useFocusEffect(
    useCallback(() => {
      loadFundDetails();
      return function () {};
    }, []),
  );

  return (
    <View style={{flex: 1, backgroundColor: x.Color.PAGE}}>
      <View
        style={{height: useSafeAreaInsets().top, backgroundColor: 'white'}}
      />
      <FlatList
        data={datas}
        bounces={false}
        bouncesZoom={true}
        initialNumToRender={10}
        ListHeaderComponent={renderListHeader}
        renderItem={info => <WallectItem info={info} />}
        ItemSeparatorComponent={() => <View style={{height: 12}} />}
        keyExtractor={(item, index) => `${item.id}: ${index}`}
        ListFooterComponent={() => <View style={{height: 12}} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  name: {
    color: '#333',
    fontSize: x.scale(14),
  },
  value: {
    color: '#666',
    fontSize: x.scale(14),
  },
});

export default WalletScreen;
