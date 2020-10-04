import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../scenes/Home.js';
import Offline from '../scenes/Offline.js';
import test from '../scenes/gamedemo.js'
import Tutorial from '../scenes/tutorial'
import  {createStackNavigator}  from '@react-navigation/stack';
function ContainerNavigation() {
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home}  options={{title: '', headerTransparent: true}}/>
          <Stack.Screen name="Offline" component={Offline} />
          <Stack.Screen name="OfflineGame" component={test}  options={{title: '', headerTransparent: true}} />
          <Stack.Screen name="Tutorial" component={Tutorial} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default ContainerNavigation;