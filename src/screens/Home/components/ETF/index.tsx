import {Utils} from '@src/constants';
import React, {useEffect, useState} from 'react';
import {
  Image,
  processColor,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';
import ETFDetailModal from '../ETFDetailModal';
import {FundsValue} from '@src/constants/Interfaces';

const utils = new Utils();

interface MyProps {
  datas: FundsValue[];
}

const ETF: React.FC<MyProps> = props => {
  const {datas} = props;
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);

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
  const [usefulDatas, setUsefulDatas] = useState([]);

  useEffect(() => {
    let sum = 0;
    let _datas = [...datas].filter(it => typeof it.f170 == 'number');

    for (let i = 0; i < _datas.length; i++) {
      sum += _datas[i].f170;
    }
    if (_datas.length > 0) {
      setAverage(sum / _datas.length);
    }
    setUsefulDatas(_datas);
    return function () {};
  }, [datas]);

  return (
    <View style={styles.view}>
      <View
        style={{
          height: utils.scale(58),
          flexDirection: 'row',
          position: 'relative',
        }}>
        <View>
          <Text style={styles.textTitle}>场内ETF</Text>
          <View style={{height: 4}} />
          <Text
            style={{fontSize: 12, color: '#999'}}>{`估算均值：${average.toFixed(
            2,
          )}%`}</Text>
          <Text
            style={{
              fontSize: 12,
              color: '#999',
            }}>{`有效数据：${usefulDatas.length} / ${datas.length}`}</Text>
        </View>

        <BarChart
          style={{flex: 1}}
          data={{
            dataSets: [
              {
                values: [...usefulDatas].map(it => it.f170),
                // label: 'Zero line dataset',
                config: {
                  colors: [
                    ...datas.map(it =>
                      it.f170 > 0
                        ? processColor(utils.Colors.RED)
                        : it.f170 < 0
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
          scaleEnabled={false}
          chartDescription={{text: ''}}
          legend={{enabled: false}}
        />
        <TouchableOpacity
          // style={{position: 'absolute', right: 0, top: 0}}
          onPress={() => {
            setIsShowDetailModal(!isShowDetailModal);
          }}
          activeOpacity={utils.Config.TOUCHABLE_OPACITY}
          hitSlop={{
            bottom: 12,
            top: 12,
            left: 12,
            right: 12,
          }}>
          <Image
            source={require('../assets/info.png')}
            style={{
              height: utils.scale(16),
              width: utils.scale(16),
              tintColor: '#666',
            }}
          />
        </TouchableOpacity>
      </View>
      <ETFDetailModal
        show={isShowDetailModal}
        datas={datas}
        onClosePress={() => {
          setIsShowDetailModal(!isShowDetailModal);
        }}
      />
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
