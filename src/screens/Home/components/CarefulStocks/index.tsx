import {FundsValue} from '@src/constants/Interfaces';
import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface MyProps {
  datas: FundsValue[];
}

const CarefulStocks: React.FC<MyProps> = props => {
  const {datas} = props;
  const {isDidiao} = useCaches();
  const renderUpOrDown = (n: number) => {
    return n > 0 ? '↑' : n < 0 ? '↓' : '';
  };

  return (
    <View style={styles.view}>
      <View
        style={{
          position: 'relative',
        }}>
        <Text style={styles.textTitle}>持仓</Text>
        <View style={{height: 4}} />
        {datas.map((stock, i) => (
          <View style={styles.stock} key={i}>
            <Text
              style={{
                color: '#333',
                fontWeight: '500',
                fontSize: x.scale(14),
              }}>
              {isDidiao ? '******' : stock.f58}
            </Text>
            <View style={{height: 4}} />
            <View style={[x.Styles.rowCenter('space-between')]}>
              <Text style={{fontSize: x.scale(12), color: '#666'}}>
                股票代码: {isDidiao ? '******' : stock.f57}
              </Text>
              <Text style={{fontSize: x.scale(12), color: x.Color.RED}}>
                {`成交额: ${stock.f43}`}
              </Text>
              <Text style={{fontSize: x.scale(12), color: x.Color.GREEN}}>
                {`涨跌幅: ${renderUpOrDown(stock.f170)}${(
                  stock.f170 / 100
                ).toFixed(2)}%`}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
  },
  stock: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    // marginTop: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  viewCounts: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewProgressBar: {
    height: 4,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  textTitle: {
    fontSize: x.scale(16),
    fontWeight: '500',
    color: '#333',
  },
});

export default CarefulStocks;
