import React from 'react';
import {StyleSheet, View} from 'react-native';
import MyChart from './components/MyChart';
import * as Types from '@src/constants/Interfaces';

interface MyProps {
  datas: number[][];
  values: Types.FundsValue[];
}

const FundTrends: React.FC<MyProps> = props => {
  const {datas, values} = props;
  const titles = ['沪深300', '创业板指', '上证指数', '深证300'];
  return datas.length > 0 ? (
    <View style={styles.view}>
      <View style={styles.viewCharts}>
        {Array.from({length: 4}, (_, i) => (
          <MyChart
            key={i}
            title={titles[i]}
            datas={datas[i]}
            fund={values?.[i]}
          />
        ))}
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    // height: Dimensions.get('screen').width / 3,
  },
  viewCharts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default FundTrends;
