import React from 'react';
import Home from './assets/icons/material-symbols_home.svg';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import { AlbumScreen, CreateAlbumScreen, ImageDetailScreen, ImagesScreen, MyFamilyScreen } from './screens/family';
import { CreateFolderScreen, LandingScreen, StartScreen } from './screens/home';
import { LoginScreen, ProfileScreen } from './screens/auth';

export type RootStackParamList = {
  Start: undefined;
  Login: undefined;
  BottomTabs: undefined;
  Home: undefined;
  CreateFolder: undefined;
  MyFamily: undefined;
  ImagesScreen: undefined;
  CreateAlbum: undefined;
  Albums: undefined;
  AlbumsDetail: undefined;
  Image: undefined;
  Profile: undefined;
};


const Tabs = createBottomTabNavigator<RootStackParamList>();

const BottomTabs = () => {
  return (
    <Tabs.Navigator initialRouteName="Start">
      <Tabs.Screen
        name="Start"
        component={StartScreen}
        options={{ headerShown: false, tabBarButton: () => null, tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false, tabBarButton: () => null, tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="Home"
        component={LandingScreen}
        options={{ headerShown: false,
          tabBarIcon: () =>  <Home />
         }}
      />
      <Tabs.Screen
        name="CreateFolder"
        component={CreateFolderScreen}
        options={{ headerShown: false, tabBarButton: () => null }}
      />
      <Tabs.Screen
        name="MyFamily"
        component={MyFamilyScreen}
        options={{ headerShown: false, tabBarButton: () => null }}
      />
      <Tabs.Screen
        name="CreateAlbum"
        component={CreateAlbumScreen}
        options={{ headerShown: false, tabBarButton: () => null }}
      />
      <Tabs.Screen
        name="Albums"
        component={ImagesScreen}
        options={{ headerShown: false, tabBarButton: () => null }}
      />
       <Tabs.Screen
        name="AlbumsDetail"
        component={AlbumScreen}
        options={{ headerShown: false, tabBarButton: () => null }}
      />
      <Tabs.Screen
        name="Image"
        component={ImageDetailScreen}
        options={{ headerShown: false, tabBarButton: () => null }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tabs.Navigator>
  );
};


function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
}

export default App;
