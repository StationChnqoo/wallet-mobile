import {RealBuyFund} from '@src/constants/Interfaces';
import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import {useState} from 'react';
import {
  Alert,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface MyProps {
  info: ListRenderItemInfo<RealBuyFund>;
}

const WallectItem = (props: MyProps) => {
  const {item, index} = props.info;
  const color = ['#666', x.Color.RED, x.Color.GREEN][item.status + 1];
  const [isShowMore, setIsShowMore] = useState(false);
  const {isDidiao} = useCaches();

  return (
    <View style={styles.card}>
      <View style={x.Styles.rowCenter('space-between')}>
        <Text
          style={{
            fontSize: x.scale(16),
            color: '#333',
            fontWeight: '500',
            flex: 1,
          }}
          numberOfLines={1}>
          {item.id} ·{' '}
          {isDidiao ? x.Strings.mask(item.title, 3, ' **** ') : item.title}
        </Text>
        <TouchableOpacity
          style={x.Styles.rowCenter('flex-start')}
          activeOpacity={x.Touchable.OPACITY}
          hitSlop={x.Touchable.hitlop()}
          onPress={() => {
            if (item.records.length == 0) {
              Alert.alert('提示 ', '当前持仓还没有记录 ~', [
                {onPress: () => {}, isPreferred: true, text: '确定'},
              ]);
            } else {
              setIsShowMore(!isShowMore);
            }
          }}>
          <Text
            style={{
              color: x.Colors.STOCK(item.rateToday),
              fontSize: x.scale(16),
              fontWeight: '500',
            }}>
            {item.rateToday}%
            {item.rateToday > 0 ? '↑' : item.rateToday < 0 ? '↓' : ''}
          </Text>
          <Image
            source={
              isShowMore
                ? require('@root/assets/common/arrow_up.png')
                : require('@root/assets/common/arrow_right.png')
            }
            style={{height: x.scale(16), width: x.scale(16), tintColor: '#999'}}
          />
        </TouchableOpacity>
      </View>
      <View style={{height: 6}} />
      <View style={x.Styles.rowCenter('space-between')}>
        <View>
          <Text style={styles.title}>阶段：{item.stage} / 12</Text>
          <View style={{height: 6}} />
          <Text style={styles.title}>骚操作次数：{item.records.length}</Text>
        </View>
        <View style={[styles.tag, {borderColor: color}]}>
          <Text style={{fontSize: x.scale(12), color}}>
            {['已停止', '已暂停', '进行中'][item.status + 1]}
          </Text>
        </View>
      </View>
      <View style={{height: 6}} />
      <View style={{}}>
        <View style={x.Styles.rowCenter('flex-start')}>
          <Text style={{color: '#333', fontSize: x.scale(14)}}>
            持仓信息：{item.price}
          </Text>
          <Text style={{color: '#999'}}> | </Text>
          <Text
            style={{
              fontSize: x.scale(14),
              color: x.Colors.STOCK(item.currentPrice - item.price),
            }}>
            {item.currentPrice}
          </Text>
          <Text style={{color: '#999'}}> | </Text>
          <Text
            style={{
              fontSize: x.scale(14),
              color: '#333',
            }}>
            {item.count}份
          </Text>
        </View>
      </View>
      <View style={{height: 6}} />
      <View style={x.Styles.rowCenter()}>
        <View style={x.Styles.rowCenter('flex-start')}>
          <Text style={{color: '#333', fontSize: x.scale(14)}}>持仓盈亏：</Text>
          <Text
            style={{
              fontSize: x.scale(14),
              color: x.Colors.STOCK(item.currentPrice - item.price),
            }}>
            {((item.currentPrice - item.price) * item.count).toFixed(2)}
            {item.currentPrice - item.price > 0
              ? '↑'
              : item.currentPrice - item.price < 0
              ? '↓'
              : ''}
          </Text>
        </View>
        <View style={x.Styles.rowCenter('flex-start')}>
          <Text style={{color: '#333', fontSize: x.scale(14)}}>当天盈亏：</Text>
          <Text
            style={{
              fontSize: x.scale(14),
              color: x.Colors.STOCK(item.rateToday),
            }}>
            {((item.price * item.count * item.rateToday) / 100).toFixed(2)}
            {item.rateToday > 0 ? '↑' : item.rateToday < 0 ? '↓' : ''}
          </Text>
        </View>
      </View>

      {item.records.length > 0 && isShowMore ? (
        <View style={{}}>
          <View
            style={{height: 1, backgroundColor: '#ddd', marginVertical: 12}}
          />
          {item.records.map((it, i) => (
            <View key={i} style={styles.item}>
              <Text style={{fontSize: x.scale(14), color: '#999'}}>
                {it.date}
              </Text>
              <Text
                style={{
                  fontSize: x.scale(14),
                  color: x.Colors.STOCK(it.value),
                }}>
                {it.value}
                {it.value > 0 ? '↑' : it.value < 0 ? '↓' : ''}
              </Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  title: {
    fontSize: x.scale(14),
    color: '#333',
  },
  tag: {
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
});

export default WallectItem;
