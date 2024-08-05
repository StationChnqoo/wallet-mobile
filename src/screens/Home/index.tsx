import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import * as Types from '@src/constants/Interfaces';
import Services from '@src/constants/Services';
import {useInterval} from 'ahooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksProp} from '..';
import ETF from './components/ETF';
import FundCounts from './components/FundCounts';
import FundRanks from './components/FundRanks';
import FundTrends from './components/FundTrends';
import FundValues from './components/FundValues';
import SuggestTips from './components/SuggestTips';

interface MyProps {
  navigation?: RootStacksProp;
}

const HomeScreen: React.FC<MyProps> = props => {
  const [counts, setCounts] = useState<number[]>(Array(3).fill(1));
  const [timer, setTimer] = useState<undefined | number>(undefined);
  const [values, setValues] = useState<Types.FundsValue[]>([]);
  const [ranks, setRanks] = useState<Types.FundsRank[]>([]);
  const [trends, setTrends] = useState<number[][]>(Array(4).fill([]));
  const [etf, setEtf] = useState<Types.FundsValue[]>([]);

  const init = async () => {
    loadFundCounts();
    loadFundValues();
    loadFundRanks();
    loadFundTrends();
    loadEtfDetails();
  };
  useInterval(() => {
    init();
  }, timer);

  useFocusEffect(
    useCallback(() => {
      init();
      setTimer(60 * 1000);
      return function () {
        setTimer(undefined);
      };
    }, []),
  );

  const loadFundCounts = async () => {
    let result = await new Services().selectDfcfFundCounts();
    let datas: Types.FundsCount[] = result.data?.diff || [];
    setCounts([
      datas[0].f104 + datas[1].f104,
      datas[0].f105 + datas[1].f105,
      datas[0].f106 + datas[1].f106,
    ]);
  };

  const loadFundValues = async () => {
    let codes = ['1.000300', '0.399006', '1.000001', '0.399007'];
    let datas: Types.FundsValue[] = [];
    for (let i = 0; i < codes.length; i++) {
      let result = await new Services().selectDfcfFundValues(codes[i]);
      datas.push(result.data);
    }
    setValues(datas);
  };

  const loadFundRanks = async () => {
    let result = await new Services().selectDfcfFundRanks();
    let datas: Types.FundsRank[] = result.data?.diff || [];
    setRanks([...datas].sort((a, b) => b.f3 - a.f3));
  };

  const loadFundTrends = async () => {
    let codes = ['1.000300', '0.399006', '1.000001', '0.399007'];
    let _datas = [...trends];
    for (let i = 0; i < codes.length; i++) {
      let result = await new Services().selectDfcfFundTrends(codes[i]);
      let datas: string[] = result.data?.trends || [];
      let _trends = [...datas].map(it => {
        let s = it.split(',');
        return parseFloat(s[1]);
      });
      _datas[i] = _trends;
      setTrends(_datas);
    }
  };

  const loadEtfDetails = async () => {
    let codes = [
      '159649', // 国开债ETF
      '159972', // 5年地债ETF
      '511010', // 国债ETF
      '511020', // 活跃国债ETF
      '511030', // 公司债ETF
      '511060', // 5年地方债ETF
      '511090', // 30年国债ETF
      '511100', // 基准国债ETF
      '511220', // 城投债ETF
      '511260', // 十年国债ETF
      '511270', // 十年地方债ETF
    ];
    let datas = [];
    for (let i = 0; i < codes.length; i++) {
      let result = await new Services().selectEtfDetail(codes[i]);
      datas.push(result.data);
    }
    setEtf(datas);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f0f0f0'}}>
      <View
        style={{height: useSafeAreaInsets().top, backgroundColor: '#fff'}}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{paddingHorizontal: 15}}>
          <View style={{height: 12}} />
          {[
            <FundCounts datas={counts} />,
            <ETF datas={etf} />,
            <FundTrends datas={trends} values={values} />,
            // <FundValues datas={values} />,
            <FundRanks datas={ranks} />,
            <SuggestTips onClosePress={() => {}} />,
          ].map((it, i) => (
            <View key={i} style={{marginBottom: 12}}>
              {it}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
