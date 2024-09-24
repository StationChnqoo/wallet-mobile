import x from '@src/constants/x';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Card from '../Card';
import {useCaches} from '@src/stores';

interface MyProps {
  onNewStockPress: () => void;
}

const Stocks: React.FC<MyProps> = props => {
  const [tab, setTab] = useState(0);
  const {onNewStockPress} = props;
  const {theme} = useCaches();
  const {carefulStocks, setCarefulStocks} = useCaches();
  const renderUpOrDown = (n: number) => {
    return n > 0 ? '↑' : n < 0 ? '↓' : '';
  };
  const onDeletePress = (index: number, code: string, name: string) => {
    Alert.alert(code, `确认删除${name}?`, [
      {text: '取消'},
      {
        text: '确认',
        onPress: () => {
          let stocks = [...carefulStocks];
          stocks.splice(index, 1);
          setCarefulStocks([...stocks]);
        },
      },
    ]);
  };
  useEffect(() => {
    return function () {};
  }, []);

  return (
    <Card
      title={'我的持仓'}
      moreView={
        <View>
          <TouchableOpacity
            onPress={onNewStockPress}
            activeOpacity={x.Touchable.OPACITY}>
            <Text style={{color: theme, fontSize: x.scale(14)}}>新增</Text>
          </TouchableOpacity>
        </View>
      }>
      <View>
        {carefulStocks.map((it, i) => (
          <View key={i} style={styles.view}>
            <View style={x.Styles.rowCenter()}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: '#333',
                    fontWeight: '500',
                    fontSize: x.scale(14),
                  }}>
                  {it.f58}
                </Text>
                <View style={{height: 4}} />
                <View style={[x.Styles.rowCenter('space-between')]}>
                  <Text style={{fontSize: x.scale(12), color: '#666'}}>
                    股票代号: {it.f57}
                  </Text>
                  <Text style={{fontSize: x.scale(12), color: x.Color.GREEN}}>
                    {`${renderUpOrDown(it.f170)}${(it.f170 / 100).toFixed(2)}%`}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: 1,
                  marginHorizontal: 12,
                  backgroundColor: '#ccc',
                  height: x.scale(32),
                }}
              />
              <View style={x.Styles.rowCenter()}>
                <TouchableOpacity
                  activeOpacity={x.Touchable.OPACITY}
                  onPress={() => {}}>
                  <Image
                    source={require('../../assets/edit.png')}
                    style={{
                      height: x.scale(18),
                      width: x.scale(18),
                      tintColor: theme,
                    }}
                  />
                </TouchableOpacity>
                <View style={{width: 12}} />
                <TouchableOpacity
                  activeOpacity={x.Touchable.OPACITY}
                  onPress={() => {
                    onDeletePress(i, it.f57, it.f58);
                  }}>
                  <Image
                    source={require('../../assets/delete.png')}
                    style={{
                      height: x.scale(18),
                      width: x.scale(18),
                      tintColor: theme,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    fontSize: x.scale(18),
    fontWeight: '500',
    color: '#333',
  },
});

export default Stocks;
