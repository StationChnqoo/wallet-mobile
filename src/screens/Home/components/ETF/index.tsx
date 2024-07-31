import {Utils} from '@src/constants';
import React, {useEffect, useState} from 'react';
import {processColor, StyleSheet, Text, View} from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';

const utils = new Utils();

interface MyProps {
  datas: number[];
}

const ETF: React.FC<MyProps> = props => {
  const {datas} = props;

  const xAxis = {
    enabled: false,
  };
  const yAxis = {
    left: {
      drawLabels: false,
      drawAxisLine: false,
      drawGridLines: false,
      zeroLine: {
        enabled: true,
        lineWidth: 1,
      },
    },
    right: {
      enabled: false,
    },
  };

  const [average, setAverage] = useState(0);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < datas.length; i++) {
      sum += datas[i];
    }
    if (datas.length > 0) {
      setAverage(sum / datas.length);
    }
    return function () {};
  }, [datas]);

  return (
    <View style={styles.view}>
      <View style={{height: utils.scale(58), flexDirection: 'row'}}>
        <View>
          <Text style={styles.textTitle}>场内ETF</Text>
          <View style={{height: 4}} />
          <Text
            style={{fontSize: 12, color: '#999'}}>{`估算均值：${average.toFixed(
            2,
          )}%`}</Text>
        </View>
        <BarChart
          style={{flex: 1}}
          data={{
            dataSets: [
              {
                values: [...datas],
                // label: 'Zero line dataset',
                config: {
                  colors: [
                    ...datas.map(it =>
                      it > 0
                        ? processColor(utils.Colors.RED)
                        : it < 0
                        ? processColor(utils.Colors.GREEN)
                        : processColor('#999'),
                    ),
                  ],
                },
              },
            ],
          }}
          xAxis={xAxis}
          yAxis={yAxis}
          chartDescription={{text: ''}}
          legend={{enabled: false}}
        />
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
    height: 4,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  textTitle: {
    fontSize: utils.scale(16),
    fontWeight: '500',
    color: '#333',
  },
});

export default ETF;
