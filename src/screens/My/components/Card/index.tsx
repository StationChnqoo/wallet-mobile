import x from '@src/constants/x';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface MyProps {
  children: React.ReactNode;
  title: string;
}

const Card: React.FC<MyProps> = props => {
  const [tab, setTab] = useState(0);
  const {children, title} = props;

  return (
    <View style={styles.view}>
      <Text style={styles.text}>{title}</Text>
      <View style={{height: 4}} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: x.scale(16),
    fontWeight: '500',
    color: '#333',
  },
});

export default Card;
