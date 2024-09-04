import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import BottomSheet from '@src/components/BottomSheet';
import x from '@src/constants/x';

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
    paddingHorizontal: x.scale(16),
    paddingVertical: x.scale(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: x.scale(18),
    color: '#333',
    fontWeight: '500',
  },
});

export default FilterModal;
