import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Utils} from '@src/constants';

const utils = new Utils();

interface MyProps {
  onSearchPress: () => void;
  onFilterPress: () => void;
  filterStatus: boolean;
}

const SearchBar: React.FC<MyProps> = props => {
  const {onSearchPress, onFilterPress, filterStatus} = props;

  return (
    <View style={styles.view}>
      <TouchableOpacity
        style={{flexDirection: 'row', flex: 1}}
        activeOpacity={utils.Config.TOUCHABLE_OPACITY}
        onPress={onSearchPress}>
        <View
          style={styles.textInput}
          // value={text}
          // onChangeText={onChange}
        >
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('./assets/zoom.png')}
              style={{
                height: utils.scale(18),
                width: utils.scale(18),
                tintColor: '#999',
              }}
            />
            <View style={{width: 4}} />
            <Text style={styles.textHint}>请输入关键字搜索</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                width: 1,
                backgroundColor: '#ccc',
                height: utils.scale(24),
                marginHorizontal: 12,
              }}
            />
            <Text style={styles.textHint}>搜索</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{width: 12}} />
      <TouchableOpacity
        onPress={onFilterPress}
        style={{flexDirection: 'row', alignItems: 'center'}}
        activeOpacity={utils.Config.TOUCHABLE_OPACITY}>
        <Text style={{fontSize: utils.scale(16), color: utils.Colors.BLUE}}>
          筛选
        </Text>
        <Image
          source={
            filterStatus
              ? require('@root/assets/common/arrow_up.png')
              : require('@root/assets/common/arrow_down.png')
          }
          style={{
            tintColor: utils.Colors.BLUE,
            height: utils.scale(16),
            width: utils.scale(16),
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: utils.scale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    fontSize: utils.scale(16),
    borderWidth: 1,
    borderRadius: utils.scale(10),
    // paddingVertical: Platform.select({android: 1, ios: 4}),
    // paddingVertical: 0,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    borderColor: '#eee',
    height: utils.scale(36),
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textHint: {
    fontSize: utils.scale(16),
    color: '#999',
  },
});

export default SearchBar;
