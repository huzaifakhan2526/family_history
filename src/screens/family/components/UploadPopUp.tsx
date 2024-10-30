import React, { useState } from 'react';
import { Image, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { style } from 'twrnc';
import tw from '../../../../tw';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../../api/axiosInstance';
import Toast from 'react-native-toast-message';


const inputTextStyle = style('text-lg font-semibold text-black mt-3 mb-2');
const textStyle2 = style(tw`text-txtSecondary text-center font-semibold mt-2`);
const boxStyle = style(tw`bg-secondary w-80  justify-center items-center shadow-xl rounded-lg items-center p-10`);
const boxStyle2 = style(tw`border border-2 border-primary border-dashed rounded-lg items-center py-3 w-70`);
const buttonStyle = style('bg-[#FFA500] w-50 py-1 rounded-lg shadow-xl mb-5');
const buttonTextStyle = style('text-lg text-white font-bold text-center');
const noteBoxStyle = style(tw`border rounded-lg p-2 h-20 mb-20 w-70`);
const boxStyle3 = style(tw`flex items-center justify-center`);
const buttonStyle2 = style(tw`flex-1 items-center justify-center`);
const inputStyle = style('border w-70 rounded-lg p-0 pl-2 mt-2 mb-6');
const inputTextStyle2 = style('text-lg font-semibold text-black mt-5');


export const UploadPopUp = ({ visible, onClose, folderId, foldername }: { visible: boolean; onClose: () => void; folderId: string | null; foldername: string | null }) => {
  const [mediaName, setMediaName] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<Asset | null>(null);
  const [imageFileName, setImageFileName] = useState<string | any>(null);
  const [description, setDescription] = useState<string>('');

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
          text1: 'Media has been selected successefully',
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

  const add_folder_media = async () => {
    const id = await AsyncStorage.getItem('userId');
    const session = await AsyncStorage.getItem('userToken');

    try {
      const mediaData = {
        'user_id': id,
        'session_token': session,
        'folder_id': folderId,
        'media_name': mediaName,
        'url': imageFileName,
        'description': description,
        'media_type': 'IMAGE',
      };

      const res = await axiosInstance.post(
        'folder/add_folder_media',
        mediaData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (res.data.status) {
        Toast.show({
          type: 'success',
          text1: 'Media added successfuly',
          text2: 'You have added media in' + ' ' + foldername + ' folder',
        });
        setDescription('');
        setMediaName('');
        setSelectedImage(null);
        onClose();
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Media adding unsuccesseful',
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
            <Text style={inputTextStyle}>Upload Media</Text>
            <View style={boxStyle2}>
              <Image source={require('../../../assets/icons/ph_camera-fill.png')} />
              <Text style={textStyle2}>Upload from cloud or gallery</Text>
            </View>
          </TouchableOpacity>
          <View>
            <Text style={inputTextStyle2}>Enter a name for media?</Text>
            <TextInput value={mediaName || ''} placeholder="Name of the folder .." style={inputStyle} onChangeText={(text) => setMediaName(text)} />
          </View>
          <Text style={inputTextStyle}>Add a note?</Text>
          <TextInput placeholder="Add a note" style={noteBoxStyle} onChangeText={(text) => setDescription(text)} />
          <View style={boxStyle3}>
            <TouchableOpacity style={buttonStyle} onPress={add_folder_media}>
              <Text style={buttonTextStyle}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

