import {Utils} from '@src/constants';
import {FundsValue} from '@src/constants/Interfaces';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

const utils = new Utils();

interface MyProps {
  datas: FundsValue[];
  show: boolean;
  onClosePress: () => void;
}

const ETFDetailModal: React.FC<MyProps> = props => {
  const {datas, show, onClosePress} = props;
  const myColor = (n: number) => {
    let color = n > 0 ? utils.Colors.RED : n < 0 ? utils.Colors.GREEN : '#999';
    return color;
  };

  return (
    <Modal
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      isVisible={show}
      onBackdropPress={onClosePress}>
      <View style={styles.view}>
        <View style={styles.items}>
          {datas.map((it, i) => (
            <View key={i} style={styles.item}>
              <Text style={{fontSize: utils.scale(14), color: '#333'}}>
                {it.f58}：
              </Text>
              <View style={{width: 4}} />
              <Text
                style={{fontSize: utils.scale(14), color: myColor(it.f170)}}>
                {it.f170 || 0}🥚
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    borderRadius: 12,
    backgroundColor: 'white',
    padding: 12,
    margin: utils.scale(12),
  },
  items: {
    flexDirection: 'row',
    backgroundColor: 'white',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 2,
    marginVertical: 4,
  },
});

export default ETFDetailModal;
