import {Utils} from '@src/constants';
import {FundsValue} from '@src/constants/Interfaces';
import React from 'react';
import {processColor, StyleSheet, Text, View} from 'react-native';
import {LineChart} from 'react-native-charts-wrapper';
const utils = new Utils();

interface MyProps {
  title: string;
  datas: number[];
  fund: FundsValue;
}

const MyChart: React.FC<MyProps> = props => {
  const {title, datas, fund} = props;
  const myColor = (n: number) => {
    let color = n > 0 ? utils.Colors.RED : n < 0 ? utils.Colors.GREEN : '#999';
    return color;
  };

  const y = {
    right: {
      enabled: false,
    },
    left: {
      enabled: true,
      drawGridLines: false,
      gridLineWidth: 1,
      drawAxisLine: false,
      drawLabels: true,
      labelCountForce: true,
      yOffset: 0,
      labelCount: 6,
      position: 'OUTSIDE_CHART',
      textSize: utils.scale(10),
    },
  };
  const x = {
    enabled: false,
    drawAxisLine: true,
    drawGridLines: true,
    position: 'BOTTOM',
    labelCount: 6,
    // valueFormatter: [],
    // axisMinimum: -1,
    // axisMaximum: 7,
    avoidFirstLastClipping: true,
  };
  return datas.length > 0 ? (
    <View style={{width: (utils.SCREEN_WITH - 48) / 2 - 12}}>
      <View style={styles.view}>
        <Text
          style={{fontSize: utils.scale(14), color: '#333', fontWeight: '500'}}>
          {title}
        </Text>
        <Text
          style={{color: myColor(fund?.f170 || 0), fontSize: utils.scale(12)}}>
          {((fund?.f170 || 0) / 100).toFixed(2)}%
        </Text>
      </View>
      <View
        style={{
          height: utils.scale(88),
          flex: 1,
        }}>
        <LineChart
          style={{flex: 1, margin: 0, padding: 0}}
          yAxis={y}
          xAxis={x}
          legend={{enabled: false}} // 隐藏颜色块的标记
          chartDescription={{text: `${((fund?.f43 || 0) / 100).toFixed(2)}`}}
          scaleEnabled={false}
          data={{
            dataSets: [
              {
                values: datas,
                // label: '上证指数',
                config: {
                  lineWidth: 1,
                  drawCircles: false,
                  drawValues: false,
                  drawLabel: false,
                  drawFilled: false, // 取消颜色块
                  color:
                    datas[datas.length - 1] > datas[0]
                      ? processColor(utils.Colors.RED)
                      : datas[datas.length - 1] < datas[0]
                      ? processColor(utils.Colors.GREEN)
                      : processColor('#999'),
                },
              },
            ],
          }}
        />
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default MyChart;
