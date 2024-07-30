import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import * as Types from '@src/constants/Interfaces';
import Services from '@src/constants/Services';
import {useInterval} from 'ahooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksProp} from '..';
import FundCounts from './components/FundCounts';

interface MyProps {
  navigation?: RootStacksProp;
}

const HomeScreen: React.FC<MyProps> = props => {
  const [counts, setCounts] = useState<number[]>(Array(3).fill(1));
  const [timer, setTimer] = useState<undefined | number>(undefined);

  useEffect(() => {
    return function () {};
  }, []);

  useInterval(() => {
    loadFundCounts();
  }, timer);

  useFocusEffect(
    useCallback(() => {
      setTimer(2000);
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

  return (
    <View style={{flex: 1, backgroundColor: '#f0f0f0'}}>
      <View
        style={{height: useSafeAreaInsets().top, backgroundColor: '#fff'}}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{paddingHorizontal: 15}}>
          <View style={{height: 12}} />
          <FundCounts datas={counts} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
