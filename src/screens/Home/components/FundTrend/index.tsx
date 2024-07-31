import React from 'react';
import {Dimensions, processColor, StyleSheet, View} from 'react-native';
import {LineChart} from 'react-native-charts-wrapper';

interface MyProps {
  datas: number[];
}

const FundTrend: React.FC<MyProps> = props => {
  const {datas} = props;
  const y = {
    right: {
      enabled: false,
    },
    left: {
      enabled: true,
      drawGridLines: true,
      gridLineWidth: 1,
      drawAxisLine: false,
      drawLabels: true,
      labelCount: 2,
      labelCountForce: true,
      yOffset: 0,
      position: 'OUTSIDE_CHART',
      textSize: 10,
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
    <View style={styles.view}>
      <LineChart
        style={{flex: 1}}
        yAxis={y}
        xAxis={x}
        legend={{enabled: false}} // 隐藏颜色块的标记
        chartDescription={{text: '上证指数'}}
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
                    ? processColor('red')
                    : datas[datas.length - 1] < datas[0]
                    ? processColor('green')
                    : processColor('#999'),
              },
            },
          ],
        }}
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 4,
    height: Dimensions.get('screen').width / 3,
  },
  viewGroup: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  textGroupTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  textItemName: {
    fontSize: 14,
    flex: 1,
  },
});

export default FundTrend;
