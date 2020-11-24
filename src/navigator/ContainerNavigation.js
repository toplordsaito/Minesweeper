import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../scenes/Home.js";
import Offline from "../scenes/Offline.js";
import test from "../scenes/gamedemo.js";
import OnlineGame from "../scenes/gameonline.js";

import ResultScreen from "../scenes/ResultScreen.js";
import Online from "../scenes/Online.js";
import Lobby from "../scenes/Lobby.js";
import JoinLobby from "../scenes/JoinLobby.js";
import Tutorial from "../scenes/tutorial";
import SplashScreen from "../scenes/SplashScreen";
import Login from "../scenes/LoginScreen";
import LeaderBoard from "../scenes/LeaderBoard";
import Profile from "../scenes/Profile";
import Theme from "../scenes/ThemeSetting";
import { createStackNavigator } from "@react-navigation/stack";
function ContainerNavigation() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ title: "", headerTransparent: true }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "", headerTransparent: true }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "", headerTransparent: true }}
        />
        <Stack.Screen name="Offline" component={Offline} />
        <Stack.Screen
          name="OfflineGame"
          component={test}
          options={{ title: "", headerTransparent: true ,  headerLeft: () =>null}}
        />
        <Stack.Screen
          name="OnlineGame"
          component={OnlineGame}
          options={{ title: "", headerTransparent: true,  headerLeft: () =>null }}
        />
        <Stack.Screen name="Online" component={Online} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Lobby" component={Lobby} />
        <Stack.Screen name="Leaderboard" component={LeaderBoard} />
        <Stack.Screen name="Join Lobby" component={JoinLobby} />
        <Stack.Screen name="Tutorial" component={Tutorial} />
        <Stack.Screen name="Setting" component={Theme} />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ title: "", headerTransparent: true,  headerLeft: () =>null }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ContainerNavigation;
