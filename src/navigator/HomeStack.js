import * as React from 'react';
import  {createStackNavigator}  from '@react-navigation/stack';
import Home from '../scenes/Home.js';
const HomeStack = createStackNavigator();
const HomeStackScreen = ( navigation ) => (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home}  />
    </HomeStack.Navigator>
  );

export default HomeStackScreen;
