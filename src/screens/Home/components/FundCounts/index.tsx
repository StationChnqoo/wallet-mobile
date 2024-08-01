import {Utils} from '@src/constants';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface MyProps {
  datas: number[];
}

const FundCounts: React.FC<MyProps> = props => {
  const {datas} = props;
  const [sum, setSum] = useState(1);
  const utils = new Utils();

  useEffect(() => {
    setSum(datas.reduce((count, it) => count + it));
    return function () {};
  }, [datas]);

  const myPercent = (n: number) => n / sum;

  return (
    <View style={styles.view}>
      <Text
        style={{fontSize: utils.scale(16), fontWeight: '500', color: '#333'}}>
        A股市场
      </Text>
      <View style={{height: 5}} />
      <View style={styles.viewCounts}>
        {datas.map((it, index) => (
          <Text
            key={index}
            style={{
              fontSize: utils.scale(14),
              color: ['red', 'green', '#999'][index],
            }}>{`${it}家${['↑', '↓', ''][index]} ${myPercent(it * 100).toFixed(
            2,
          )}%`}</Text>
        ))}
      </View>
      <View style={{height: 10}} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {datas.map((it, index) => (
          <View
            key={index}
            style={[
              styles.viewProgressBar,
              {
                backgroundColor: [utils.Colors.RED, utils.Colors.GREEN, '#999'][
                  index
                ],
                flex: myPercent(it),
              },
            ]}
          />
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
  viewCounts: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewProgressBar: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2,
  },
});

export default FundCounts;
