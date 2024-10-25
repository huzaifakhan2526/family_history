/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */


import React from 'react';
// import {  ImageDetailScreen } from './src/screens/family';
import { ProfileScreen } from './src/screens/auth';
// import { UploadPopUp } from './src/screens/family/components';

function App(): React.JSX.Element {

  return (
    <>
      <ProfileScreen />
    </>
  );
}


export default App;
