import React, {createContext, useEffect} from 'react';
import {AppRegistry, StatusBar, View} from 'react-native';
import {name as appName} from './app.json';
import Screens from './src/screens';
import {useStore} from './src/stores';
import {RootSiblingParent} from 'react-native-root-siblings';

const StoreContext = createContext();

const Wallet = () => {
  useEffect(() => {}, []);

  return (
    <StoreContext.Provider value={useStore}>
      <RootSiblingParent>
        <View style={{flex: 1}}>
          {/* <StatusBar
          translucent={true}
          barStyle={'dark-content'}
          backgroundColor={'white'}
        /> */}
          <View style={{flex: 1, position: 'relative'}}>
            <Screens />
          </View>
        </View>
      </RootSiblingParent>
    </StoreContext.Provider>
  );
};

AppRegistry.registerComponent(appName, () => Wallet);
