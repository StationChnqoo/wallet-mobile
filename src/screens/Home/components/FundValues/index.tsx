import {FundsValue} from '@src/constants/Interfaces';
import x from '@src/constants/x';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface MyProps {
  datas: FundsValue[];
}

const FundValues: React.FC<MyProps> = props => {
  const {datas} = props;

  const myColor = (n: number) => {
    let color = n > 0 ? x.Color.RED : n < 0 ? x.Color.GREEN : '#999';
    return color;
  };

  return datas.length > 0 ? (
    <View style={styles.view}>
      {datas.map((it, index) => (
        <View key={index} style={styles.viewItem}>
          <Text style={styles.textName}>{`${it.f57} · ${it.f58}`}</Text>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Text style={{color: '#666'}}>{(it.f43 / 100).toFixed(2)}</Text>
            <Text style={{color: '#999'}}> / </Text>
            <Text style={[styles.textZdf, {color: myColor(it.f170)}]}>
              {(it.f170 / 100).toFixed(2)}%
            </Text>
          </View>
        </View>
      ))}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: x.scale(2),
  },
  textName: {
    fontSize: x.scale(14),
    color: '#333',
    fontWeight: '500',
  },
  textZdf: {
    fontSize: x.scale(14),
    // fontFamily: 'Dosis',
  },
});

export default FundValues;
