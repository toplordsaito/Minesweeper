import * as React from 'react';
import  {createStackNavigator}  from '@react-navigation/stack';
import Offline from '../scenes/Offline.js';
import test from '../scenes/gamedemo.js'
const OfflineStack = createStackNavigator();
const OfflineStackScreen = ( navigation ) => (
    <OfflineStack.Navigator>
      <OfflineStack.Screen name="Offline" component={Offline}  />
      <OfflineStack.Screen name="OfflineGame" component={test}  options={{title: '', headerTransparent: true}}/>
    </OfflineStack.Navigator>
  );

export default OfflineStackScreen;