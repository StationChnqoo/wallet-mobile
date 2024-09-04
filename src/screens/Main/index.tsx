import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React from 'react';
import {Image} from 'react-native';
import HomeScreen from '../Home';

import OrderScreen from '../Order';
import My from '../My';
import {useCaches} from '@src/stores';

const Tab = createBottomTabNavigator();

function MainScreen() {
  const {theme} = useCaches();
  const screens = [
    {
      name: 'Home',
      component: HomeScreen,
      icon: require('./assets/menu_home.png'),
      label: '首页',
    },
    {
      name: 'Hot',
      component: OrderScreen,
      icon: require('./assets/menu_order.png'),
      label: '账单',
    },
    {
      name: 'Message',
      component: HomeScreen,
      icon: require('./assets/menu_message.png'),
      label: '消息',
    },
    {
      name: 'Friends',
      component: HomeScreen,
      icon: require('./assets/menu_friends.png'),
      label: '社区',
    },
    {
      name: 'Me',
      component: My,
      icon: require('./assets/menu_me.png'),
      label: '我的',
    },
  ];
  return (
    <Tab.Navigator>
      {screens.map((it, i) => (
        <Tab.Screen
          name={it.name}
          key={i}
          component={it.component}
          options={{
            headerShown: false,
            tabBarLabel: it.label,
            tabBarActiveTintColor: theme,
            tabBarIcon: ({color}) => (
              <Image
                source={it.icon}
                style={{height: 24, width: 24, tintColor: color}}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default MainScreen;
