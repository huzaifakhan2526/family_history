import React, { useEffect } from 'react';
import Home from './assets/icons/home.svg';
import Profile from './assets/icons/user-circle-thin.svg';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { AlbumScreen, CreateAlbumScreen, ImageDetailScreen, ImagesScreen, MyFamilyScreen } from './screens/family';
import { CreateFolderScreen, LandingScreen, StartScreen } from './screens/home';
import { LoginScreen, ProfileScreen } from './screens/auth';
import { AuthProvider } from './context/AuthContext';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { OtpVerificationScreen } from './verification/OtpVerificationScreen';



export type RootStackParamList = {
  Start: undefined;
  Login: undefined;
  OtpVerification: undefined;
  BottomTabs: undefined;
  Home: undefined;
  CreateFolder: { folderId: string | null, foldername: string | null, parentFolderId: string | null };
  MyFamily: { folderId: string | null, foldername: string | null, parentFolderId: string | null };
  ImagesScreen: undefined;
  CreateAlbum: { folderId: string | null, foldername: string | null, parentFolderId: string | null };
  Albums: undefined;
  AlbumsDetail: undefined;
  Image: undefined;
  Profile: undefined;
  Main: undefined;
};



const renderHomeIcon = ({ focused }) => {
  return (
    <Home width={30} height={30} fill={focused ? '#FFA500' : '#000000'} />
  );
};

const renderProfileIcon = ({ focused }) => {
  return (
    <Profile width={30} height={30} fill={focused ? '#FFA500' : '#000000'} />
  );
};

const Tabs = createBottomTabNavigator<RootStackParamList>();

const Stack = createNativeStackNavigator<RootStackParamList>();


const TabNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          borderColor: '#000000',
          borderTopWidth: 0,
          backgroundColor: '#FFF6E6',
          paddingVertical: 5,
          height: 60,
          paddingBottom: 5
        },
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: 600,
        },
        tabBarIconStyle: {
          fontSize: 20,
        },
        tabBarActiveTintColor: '#FFA500',
      }}>
      <Tabs.Screen
        name="Home"
        component={LandingScreen}
        options={{
          headerShown: false,
          tabBarIcon: renderHomeIcon,
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: renderProfileIcon,
        }}
      />
    </Tabs.Navigator>
  );
};
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
          tabBarIcon: renderHomeIcon
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
        initialParams={{ folderId: null }}
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
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 1000);


    return () => clearTimeout(timer);
  }, []);
  return (
    // <AuthProvider>
    //   <NavigationContainer>
    //     <BottomTabs />
    //   </NavigationContainer>
    //   <Toast />
    // </AuthProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Start"
          component={StartScreen}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="OtpVerification"
          component={OtpVerificationScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="CreateAlbum"
          component={CreateAlbumScreen}
          options={{ animation: 'slide_from_right' }}
        />

        <Stack.Screen
          name="CreateFolder"
          component={CreateFolderScreen}
          options={{ animation: 'slide_from_bottom' }}
          initialParams={{ folderId: null, parentFolderId: null }}
        />
        <Stack.Screen 
        name="Main" 
        component={TabNavigator} 
        options={{ animation: 'slide_from_bottom' }}
        /> 
        <Stack.Screen 
        name="MyFamily" 
        component={MyFamilyScreen} 
        initialParams={{ folderId: null, parentFolderId: null }}
        options={{ animation: 'slide_from_right' }}
        /> 
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;
