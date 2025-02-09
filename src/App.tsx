import React from 'react';
import Home from './assets/icons/home.svg';
import Profile from './assets/icons/user-circle-thin.svg';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import { AlbumScreen, CreateAlbumScreen, ImageDetailScreen, ImagesScreen, MyFamilyScreen } from './screens/family';
import { CreateFolderScreen, LandingScreen, StartScreen } from './screens/home';
import { LoginScreen, ProfileScreen } from './screens/auth';
import { AuthProvider } from './context/AuthContext';
import Toast from 'react-native-toast-message';

export type RootStackParamList = {
  Start: undefined;
  Login: undefined;
  BottomTabs: undefined;
  Home: undefined;
  CreateFolder: undefined;
  MyFamily:  { folderId: string | null, foldername: string | null };
  ImagesScreen: undefined;
  CreateAlbum: undefined;
  Albums: undefined;
  AlbumsDetail: undefined;
  Image: undefined;
  Profile: undefined;
};



const renderHomeIcon = ({focused}) => {
  return (
    <Home width={30} height={30} fill={focused ? '#FFA500' : '#000000'} />
  );
};

const renderProfileIcon = ({focused}) => {
  return (
    <Profile width={30} height={30} fill={focused ? '#FFA500' :  '#000000'} />
  );
};

const Tabs = createBottomTabNavigator<RootStackParamList>();

const BottomTabs = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Start"
      screenOptions={{
        tabBarStyle: {
          borderColor: '#000000',
          borderTopWidth: 0,
          backgroundColor: '#FFF6E6',
          paddingVertical: 5,
        },
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: 600,
        },
        tabBarIconStyle: {
          fontSize: 20,
        },
        tabBarActiveTintColor: '#FFA500',
      }}
    >
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
        options={{
          headerShown: false,
          tabBarIcon: renderHomeIcon,
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
        initialParams={{folderId : null}}
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
        options={{ headerShown: false, tabBarIcon: renderProfileIcon }}
      />
    </Tabs.Navigator>
  );
};


function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
      <Toast />
    </AuthProvider>

  );
}

export default App;
