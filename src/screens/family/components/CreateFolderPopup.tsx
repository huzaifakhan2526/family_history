import React, { useState } from 'react';
import { Image, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { style } from 'twrnc';
import tw from '../../../../tw';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../../api/axiosInstance';
import Toast from 'react-native-toast-message';


export const CreateFolderPopup = ({ visible, onClose, folderId, foldername }: { visible: boolean; onClose: () => void; folderId: string | null; foldername: string | null }) => {

  const [selectedImage, setSelectedImage] = useState<Asset | null>(null);
  const [imageFileName, setImageFileName] = useState<string | any>(null);
  const [folderName, setFolderName] = useState<string | null>(null);
  const [access, setAccess] = useState<string | null>(null);

  const handleImageSelect = async () => {
    let options = {
      storageOption: {
        path: 'image',
      },
    };

    await launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets) {
        const asset = response.assets[0];
        setSelectedImage(asset);
      }
    });

    upload_media();
  };

  const upload_media = async () => {
    const id = await AsyncStorage.getItem('userId');
    const session = await AsyncStorage.getItem('userToken');

    try {
      const fileFormData = new FormData();
      fileFormData.append('user_id', id);
      fileFormData.append('session_token', session);
      fileFormData.append('media', {
        uri: selectedImage?.uri,
        type: selectedImage?.type,
        name: selectedImage?.fileName,
      });

      console.log(fileFormData);

      const res = await axiosInstance.post(
        'folder/upload_media',
        fileFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const { file_name } = res.data.data;
      setImageFileName(file_name);
      if (res.data.status) {
        Toast.show({
          type: 'success',
          text1: 'Folder Cover is Selected',
          text2: 'Image will be used for folder background image',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Selection unsuccessesfull',
        text2: 'Please try again !!',
      });
    }
  };

  const create_folder = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      const storedUserId = await AsyncStorage.getItem('userId');
      const folderData = {
        'user_id': storedUserId,
        'session_token': storedToken,
        'image': imageFileName,
        'folder_name': folderName,
        'parent_folder_id': folderId,
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
          text2: 'You have added a new folder inside ' + foldername,
        });

        setAccess(null);
        setSelectedImage(null);
        setFolderName('');

        onClose();
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
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableOpacity
        style={buttonStyle2}
        onPress={onClose}
        activeOpacity={1}
      >
        <View style={boxStyle}>
          <TouchableOpacity onPress={handleImageSelect}>
            <Text style={inputTextStyle}>Upload folder cover photo</Text>
            <View style={boxStyle2}>
              <Image source={require('../../../assets/icons/ph_camera-fill.png')} />
              <Text style={textStyle2}>Upload from cloud or gallery</Text>
            </View>
          </TouchableOpacity>
          <View>
            <Text style={inputTextStyle2}>Enter a name for the folder?</Text>
            <TextInput value={folderName || ''} placeholder="Name of the folder .." style={inputStyle} onChangeText={(text) => setFolderName(text)} />
          </View>
          <View style={tw`mb-7 w-70`}>
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
          <View style={boxStyle3}>
            <TouchableOpacity style={buttonStyle} onPress={create_folder}>
              <Text style={buttonTextStyle}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};


const inputTextStyle = style('text-lg font-semibold text-black mt-3 mb-2');
const textStyle2 = style(tw`text-txtSecondary text-center font-semibold mt-2`);
const boxStyle = style(tw`bg-secondary w-80  justify-center items-center shadow-xl rounded-lg items-center p-10`);
const boxStyle2 = style(tw`border border-2 border-primary border-dashed rounded-lg items-center py-3 w-70`);
const buttonStyle = style('bg-[#FFA500] w-50 py-1 rounded-lg shadow-xl mb-5');
const buttonTextStyle = style('text-lg text-white font-bold text-center');
const boxStyle3 = style(tw`flex items-center justify-center`);
const buttonStyle2 = style(tw`flex-1 items-center justify-center`);
const inputStyle = style('border w-70 rounded-lg p-0 pl-2 mt-2 mb-6');
const inputTextStyle2 = style('text-lg font-semibold text-black mt-5');

