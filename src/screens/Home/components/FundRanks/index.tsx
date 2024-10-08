import {FundsRank} from '@src/constants/Interfaces';
import x from '@src/constants/x';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface MyProps {
  datas: FundsRank[];
}

const FundRanks: React.FC<MyProps> = props => {
  const {datas} = props;

  const myColor = (n: number) => {
    let color = n > 0 ? x.Color.RED : n < 0 ? x.Color.GREEN : '#999';
    return color;
  };
  /**
   *
   * @param index
   * @param items
   */
  const loadGroup = (index: number, items: FundsRank[]) => {
    return (
      <View style={styles.viewGroup}>
        <Text style={styles.textGroupTitle}>{['涨', '跌'][index]}幅排行榜</Text>
        <View style={{height: 4}} />
        {items.map((it, index) => (
          <View key={index} style={styles.viewItem}>
            <Text
              style={[{color: myColor(it.f3)}, styles.textItemName]}
              numberOfLines={1}>{`${index + 1}. ${it.f14}`}</Text>
            <Text style={{color: myColor(it.f3)}}>{`${it.f3.toFixed(
              2,
            )}%`}</Text>
          </View>
        ))}
      </View>
    );
  };

  return datas.length > 0 ? (
    <View style={styles.view}>
      <View style={{flexDirection: 'row'}}>
        {loadGroup(0, datas.slice(0, 10))}
        <View style={{width: 16}} />
        {loadGroup(1, datas.slice(-10).reverse())}
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  view: {
    // backgroundColor: 'white',
    borderRadius: 8,
  },
  viewGroup: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  textGroupTitle: {
    fontSize: x.scale(16),
    fontWeight: '500',
    color: '#333',
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: x.scale(2),
  },
  textItemName: {
    fontSize: x.scale(14),
    flex: 1,
  },
});

export default FundRanks;
