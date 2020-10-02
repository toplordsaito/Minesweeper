import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import  HomeStackScreen  from './HomeStack.js'
import  OfflineStackScreen  from './OfflineStack.js'
import  {createStackNavigator}  from '@react-navigation/stack';
function ContainerNavigation() {
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeStackScreen}  options={{title: '', headerTransparent: true}}/>
          <Stack.Screen name="Offline" component={OfflineStackScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default ContainerNavigation;