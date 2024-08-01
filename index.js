import React, {createContext, useEffect} from 'react';
import {AppRegistry, StatusBar, View} from 'react-native';
import {name as appName} from './app.json';
import Screens from './src/screens';
import {useStore} from './src/stores';

const StoreContext = createContext();

const Wallet = () => {
  useEffect(() => {}, []);

  return (
    <StoreContext.Provider value={useStore}>
      <View style={{flex: 1}}>
        <StatusBar
          translucent={true}
          barStyle={'dark-content'}
          backgroundColor={'white'}
        />
        <View style={{flex: 1, position: 'relative'}}>
          <Screens />
        </View>
      </View>
    </StoreContext.Provider>
  );
};

AppRegistry.registerComponent(appName, () => Wallet);
