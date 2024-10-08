import React, {useCallback, useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {PlanBuy, RealBuyFund} from '@src/constants/Interfaces';
import x from '@src/constants/x';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksProp} from '..';
import WallectItem from './components/Item';
import {MyWallet} from '@src/constants/Constants';

interface MyProps {
  navigation?: RootStacksProp;
}

const WalletScreen: React.FC<MyProps> = props => {
  const [datas, setDatas] = useState<RealBuyFund[]>([]);

  const renderListHeader = () => {
    return <View style={{height: 12}} />;
  };

  useFocusEffect(
    useCallback(() => {
      setDatas([...MyWallet]);
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
