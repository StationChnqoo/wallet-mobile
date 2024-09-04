import x from '@src/constants/x';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Card from '../Card';
import {useCaches} from '@src/stores';

interface MyProps {}

const Stocks: React.FC<MyProps> = props => {
  const [tab, setTab] = useState(0);
  const {} = props;
  const {theme} = useCaches();
  const [datas, setDatas] = useState(Array(5).fill(''));

  useEffect(() => {
    return function () {};
  }, []);

  return (
    <Card title={'我的持仓'}>
      <View>
        {datas.map((it, i) => (
          <View key={i} style={styles.view}>
            <View style={x.Styles.rowCenter()}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: '#333',
                    fontWeight: '500',
                    fontSize: x.scale(14),
                  }}>
                  富国中证煤炭指数（LOF）C
                </Text>
                <View style={{height: 4}} />
                <View style={[x.Styles.rowCenter('space-between')]}>
                  <Text style={{fontSize: x.scale(12), color: '#666'}}>
                    123456
                  </Text>
                  <Text style={{fontSize: x.scale(12), color: x.Color.RED}}>
                    {`¥${(Math.random() * Math.pow(10, 6)).toFixed(2)}`}
                  </Text>
                  <Text style={{fontSize: x.scale(12), color: x.Color.GREEN}}>
                    {`↑↓${(Math.random() * 100).toFixed(2)}%`}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: 1,
                  marginHorizontal: 12,
                  backgroundColor: '#ccc',
                  height: x.scale(32),
                }}
              />
              <View style={x.Styles.rowCenter()}>
                <TouchableOpacity
                  activeOpacity={x.Touchable.OPACITY}
                  onPress={() => {}}>
                  <Image
                    source={require('../../assets/edit.png')}
                    style={{
                      height: x.scale(18),
                      width: x.scale(18),
                      tintColor: theme,
                    }}
                  />
                </TouchableOpacity>
                <View style={{width: 12}} />
                <TouchableOpacity
                  activeOpacity={x.Touchable.OPACITY}
                  onPress={() => {}}>
                  <Image
                    source={require('../../assets/delete.png')}
                    style={{
                      height: x.scale(18),
                      width: x.scale(18),
                      tintColor: theme,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingVertical:6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    fontSize: x.scale(18),
    fontWeight: '500',
    color: '#333',
  },
});

export default Stocks;
