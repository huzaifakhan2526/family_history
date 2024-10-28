import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from '../../../tw';
import { Heading } from './components';
import { style } from 'twrnc';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type CreateFolderScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateFolder'>


export const CreateFolderScreen = ({navigation} : CreateFolderScreenProps) => {

  const [access, setAccess] = useState(true);

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Heading />
      <ScrollView contentContainerStyle={tw`flex-grow`}>
        <View style={tw`flex items-center justify-center mx-4`}>
          <Image source={require('../../assets/images/img.png')} style={tw`w-40 h-45 mt-2 mb-4`} />
          <Text style={textStyle}>“Get started by creating a new album to keep all your images and documents neatly organized and accessible”</Text>
          <View style={tw`mt-7 w-[100%]`}>
            <View>
              <Text style={inputTextStyle}>Enter a name for folder?</Text>
              <TextInput placeholder="Name of the folder .." style={inputStyle} />
            </View>
            <View style={tw`mb-7`}>
              <Text style={inputTextStyle}>Want to give access to others?</Text>
              <View style={tw`flex flex-row items-center justify-start`}>
                <TouchableOpacity style={tw`flex flex-row items-center mr-3`} onPress={() => setAccess(true)}>
                  <View style={tw`border h-6 w-6 rounded-full flex items-center justify-center m-3`}>
                    {access &&
                      <View style={tw`h-3 w-3 rounded-full bg-primary`} />
                    }
                  </View>
                  <Text style={inputTextStyle}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`flex flex-row items-center`} onPress={() => setAccess(false)}>
                  <View style={tw`border h-6 w-6 rounded-full flex items-center justify-center m-3`}>
                    {!access &&
                      <View style={tw`h-3 w-3 rounded-full bg-primary`} />
                    }
                  </View>
                  <Text style={inputTextStyle}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity style={buttonStyle} onPress={() => navigation.navigate('Home')}>
            <Text style={buttonTextStyle}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const textStyle = style('text-xl font-semibold text-black text-center');
const buttonStyle = style('bg-[#FFA500] w-50 py-1 rounded-lg shadow-xl');
const buttonTextStyle = style('text-lg text-white font-bold text-center');
const inputStyle = style('border w-60 rounded-lg p-0 pl-2 mt-2 mb-6');
const inputTextStyle = style('text-xl font-semibold text-black');


