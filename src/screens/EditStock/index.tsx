import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';

import {RouteProp} from '@react-navigation/native';
import Button from '@src/components/Button';
import ToolBar from '@src/components/ToolBar';
import {FundsValue} from '@src/constants/Interfaces';
import Services from '@src/constants/Services';
import Toaster from '@src/constants/Toaster';
import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import {RootStacksParams, RootStacksProp} from '..';

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'EditStock'>;
}

const EditStock: React.FC<MyProps> = props => {
  const {navigation, route} = props;
  const {theme, carefulStocks, setCarefulStocks} = useCaches();
  const [id, setId] = useState(route.params?.id || '');
  const [stock, setStock] = useState<FundsValue>(Object.assign({}));
  const renderUpOrDown = (n: number) => {
    return n > 0 ? '↑' : n < 0 ? '↓' : '';
  };

  useEffect(() => {
    (async () => {
      let result = await new Services().selectDfcfFundValues(id);
      // console.log('setStock: ', result.data);
      setStock({...result.data});
    })();
  }, [id]);

  const onConfirmPress = () => {
    if (carefulStocks.some(it => it.f57 == stock.f57)) {
      Toaster.show('此股票已在自选列表中 ~');
    } else {
      setCarefulStocks([...carefulStocks, stock]);
      navigation.goBack();
    }
  };
  return (
    <View style={{flex: 1}}>
      <ToolBar
        title={'编辑'}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{height: 12}} />
      <View style={{paddingHorizontal: 12}}>
        <View style={[x.Styles.rowCenter()]}>
          <TextInput
            style={styles.input}
            placeholder={'请输入6位股票代码'}
            value={id}
            onChangeText={setId}
          />
          <View style={{width: 12}} />
          <Button
            title={'确定'}
            disabled={stock?.f57 ? false : true}
            onPress={onConfirmPress}
            style={{
              backgroundColor: theme,
              borderRadius: 12,
              paddingVertical: 4,
              paddingHorizontal: 12,
            }}
            textStyle={{color: '#fff'}}
          />
        </View>
        <View style={{height: 12}} />
        {stock?.f57 ? (
          <View style={styles.view}>
            <View style={x.Styles.rowCenter()}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: '#333',
                    fontWeight: '500',
                    fontSize: x.scale(14),
                  }}>
                  {stock.f58}
                </Text>
                <View style={{height: 4}} />
                <View style={[x.Styles.rowCenter('space-between')]}>
                  <Text style={{fontSize: x.scale(12), color: '#666'}}>
                    股票代码: {stock.f57}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: x.scale(12), color: '#333'}}>
                      {`${(stock.f43 / 1000).toFixed(3)}`}
                    </Text>
                    <Text style={{marginHorizontal: 6, color: '#999'}}>|</Text>
                    <Text style={{fontSize: x.scale(12), color: x.Color.GREEN}}>
                      {`${renderUpOrDown(stock.f170)}${(
                        stock.f170 / 100
                      ).toFixed(2)}%`}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    // margin: 12,
    fontSize: x.scale(16),
    paddingVertical: Platform.select({android: 2, ios: 6}),
    paddingHorizontal: 12,
    flex: 1,
  },
  view: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    // marginTop: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default EditStock;
