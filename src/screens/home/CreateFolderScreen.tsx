import React, { forwardRef, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from '../../../tw';
import { Heading } from './components';
import { style } from 'twrnc';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import axiosInstance from '../../api/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Navbar from '../../components/common/Navbar';

const ToastWrapper = forwardRef((props, ref) => {
  return <Toast ref={ref} {...props} />;
});

type CreateFolderScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateFolder'>


export const CreateFolderScreen = ({ navigation }: CreateFolderScreenProps) => {

  const [folderName, setFolderName] = useState<string>('');
  const [access, setAccess] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Asset | null>(null);
  const [imageFileName, setImageFileName] = useState<string | any>(null);
  const [userData, setUserData] = useState({});
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('Submit to upload'); // State to manage the button text




  const handleImageSelect = async () => {
    setButtonDisabled(false);
    setUploadStatus('Submit to upload');
    const options = {
      mediaType: 'photo', // Add media type option
      includeBase64: false, // Do not include base64 data
    };


    await launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets) {
        const asset = response.assets[0];
        setSelectedImage(asset);
      }
    });
  };


  const upload_media = async () => {
    setButtonDisabled(true);
    setUploadStatus('Uploading...');
    try {
      const jsonValue = await AsyncStorage.getItem('userData'); // Replace 'userData' with your actual key
      if (jsonValue) {
        const parsedData = JSON.parse(jsonValue); // Parse the JSON string
        const storedUserId = parsedData.user_id;
        const storedToken = parsedData.session.session_token;
        const fileFormData = new FormData();
        fileFormData.append('user_id', storedUserId);
        fileFormData.append('session_token', storedToken);
        fileFormData.append('media', {
          uri: selectedImage?.uri,
          type: selectedImage?.type,
          name: selectedImage?.fileName,
        });
        const res = await axiosInstance.post(
          'folder/upload_media',
          fileFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            timeout: 10000,
          }
        );

        const { file_name } = res.data.data;
        setImageFileName(file_name);
        if (res.data.status) {
          setUploadStatus('Uploaded');
          Toast.show({
            type: 'success',
            text1: 'Folder Cover Selected',
            text2: 'Image will be used as the folder background.',
          });
        } else {
          setUploadStatus('Please retry');
          Toast.show({
            type: 'error',
            text1: 'Folder Cover Selection Failed',
            text2: 'Please try again.',
          });
        }
      }
    } catch (error) {
      console.log(error);
      setUploadStatus('Please retry');
      Toast.show({
        type: 'error',
        text1: 'Selection unsuccessesfull',
        text2: 'Please try again !!',
      });
    }
  };


  const create_folder = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      if (jsonValue) {
        const parsedData = JSON.parse(jsonValue); // Parse the JSON string
        const storedUserId = parsedData.user_id;
        const storedToken = parsedData.session.session_token;
        const folderData = {
          'user_id': storedUserId,
          'session_token': storedToken,
          'image': imageFileName,
          'folder_name': folderName,
          'parent_folder_id': '',
          'is_sharable': access,
        };
        console.log(folderData);

        const res = await axiosInstance.post(
          'folder/create_folder',
          folderData,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        if (res.data.status) {
          Toast.show({
            type: 'success',
            text1: 'Folder Created Successfully',
            text2: 'You have added a new folder',
          });

          setAccess(null);
          setSelectedImage(null);
          setFolderName('');

          navigation.navigate('Main');
        }
      }



    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong !!',
        text2: 'Please try again',
      });
    }
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Navbar />
      <ScrollView contentContainerStyle={tw`flex-grow`}>
        <View style={tw`flex items-center justify-center mx-4 mb-25`}>
          <View style={{ alignItems: 'center', paddingTop: 12 }}>
            {selectedImage ? (
              <>
                <Text style={{ color: '#000', marginBottom: 8 }}>Cover Image:</Text>
                <Image
                  source={{ uri: selectedImage.uri }}
                  style={{
                    width: 300,
                    height: 200,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: '#fff',
                    objectFit: 'contain',
                    backgroundColor: 'grey', // Set background color if needed
                  }} // Adjust dimensions as needed
                />
                <TouchableOpacity
                  style={[buttonStyle, { marginTop: 11 }, isButtonDisabled ? styles.disabledButton : {}]}
                  onPress={!isButtonDisabled ? upload_media : null}
                  disabled={isButtonDisabled} // Disables the button functionality
                >
                  <Text style={buttonTextStyle}>{uploadStatus}</Text>
                </TouchableOpacity>
              </>
            ) : null}

            <TouchableOpacity onPress={handleImageSelect} style={{ marginTop: selectedImage ? 12 : 0 }}>
              <View>
                <Text style={inputTextStyle2}>Upload Folder Cover Photo</Text>
                <View style={upladBox}>
                  <Text style={textStyle3}>+</Text>
                  <Text style={textStyle2}>Upload from cloud or gallery</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>



          <Text style={textStyle}>“Get started by creating a new album to keep all your images and documents neatly organized and accessible”</Text>
          <View style={tw`mt-7 w-[100%]`}>
            <View>
              <Text style={inputTextStyle}>Enter a name for folder?</Text>
              <TextInput value={folderName} placeholder="Name of the folder" placeholderTextColor="grey" style={[inputStyle, { color: '#000' }]} onChangeText={(text) => setFolderName(text)} value={folderName} />
            </View>
            <View style={tw`mb-7`}>
              <Text style={inputTextStyle}>Want to give access to others?</Text>
              <View style={tw`flex flex-row items-center justify-start`}>
                <TouchableOpacity style={tw`flex flex-row items-center mr-3`} onPress={() => setAccess('YES')}>
                  <View style={tw`border h-6 w-6 rounded-full flex items-center justify-center m-3`}>
                    {access === 'YES' &&
                      <View style={tw`h-3 w-3 rounded-full bg-primary`} />
                    }
                  </View>
                  <Text style={inputTextStyle}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`flex flex-row items-center`} onPress={() => setAccess('NO')}>
                  <View style={tw`border h-6 w-6 rounded-full flex items-center justify-center m-3`}>
                    {access === 'NO' &&
                      <View style={tw`h-3 w-3 rounded-full bg-primary`} />
                    }
                  </View>
                  <Text style={inputTextStyle}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity style={buttonStyle} onPress={create_folder}>
            <Text style={buttonTextStyle}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ToastWrapper />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  disabledButton: {
    backgroundColor: 'gray', // Change this to whatever color you want to indicate disabled
  },
  inputStyle: {
    color: 'black', // Set the text color to black
    borderWidth: 1, // Example border
    borderColor: '#ccc', // Example border color
    padding: 10, // Example padding
    borderRadius: 5, // Example border radius
  },
});

const textStyle = style('text-xl font-semibold text-black text-center');
const buttonStyle = style('bg-[#FFA500] w-50 py-1 rounded-lg shadow-xl');
const buttonTextStyle = style('text-lg text-white font-bold text-center');
const inputStyle = style('border w-60 rounded-lg p-0 pl-2 mt-2 mb-6');
const inputTextStyle = style('text-xl font-semibold text-black');
const inputTextStyle2 = style('text-xl font-semibold text-black text-center mt-10');
const upladBox = style(tw`border w-65 rounded-lg py-2 mt-2 mb-10`);
const textStyle2 = style(tw`text-txtSecondary text-center font-semibold`);
const textStyle3 = style(tw`text-txtSecondary text-center font-semibold text-xl`);


