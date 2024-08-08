import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Utils} from '@src/constants';
import BottomSheet from '@src/components/BottomSheet';

const utils = new Utils();

interface MyProps {
  show: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<MyProps> = props => {
  const {onClose, show} = props;

  return (
    <BottomSheet show={show} onClose={onClose}>
      <View style={styles.view}>
        <Text style={styles.textTitle}>账单筛选</Text>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    paddingHorizontal: utils.scale(16),
    paddingVertical: utils.scale(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: utils.scale(18),
    color: '#333',
    fontWeight: '500',
  },
});

export default FilterModal;
