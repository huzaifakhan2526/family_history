import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Topbar } from './components';
import { style } from 'twrnc';
import tw from '../../../tw';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type CreateAlbumScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateAlbum'>

export const CreateAlbumScreen = ({navigation} : CreateAlbumScreenProps) => {
    const [selectedImage, setSelectedImage] = useState(true);

    return (
        <SafeAreaView>
            <Topbar title="Create an Album" />
            <View style={boxStyle}>
                <Text style={textStyle}>"To view and manage your content, please create a new album first."</Text>
                <View>
                    <View>
                        <Text style={inputTextStyle}>Name of the Album</Text>
                        <TextInput placeholder="Enter name of the album" style={inputStyle} />
                    </View>
                    <View style={tw`mb-7`}>
                        <Text style={inputTextStyle}>Select a Category</Text>
                        <View style={tw`flex flex-row items-center justify-start`}>
                            <TouchableOpacity style={tw`flex flex-row items-center mr-3`} onPress={() => setSelectedImage(true)}>
                                <View style={tw`border h-6 w-6 rounded-full flex items-center justify-center m-3`}>
                                    {selectedImage &&
                                        <View style={tw`h-3 w-3 rounded-full bg-primary`} />
                                    }
                                </View>
                                <Text style={inputTextStyle}>Place</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={tw`flex flex-row items-center`} onPress={() => setSelectedImage(false)}>
                                <View style={tw`border h-6 w-6 rounded-full flex items-center justify-center m-3`}>
                                    {!selectedImage &&
                                        <View style={tw`h-3 w-3 rounded-full bg-primary`} />
                                    }
                                </View>
                                <Text style={inputTextStyle}>Person</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text style={inputTextStyle}>Upload Cover Photo</Text>
                        <View style={upladBox}>
                            <Text style={textStyle3}>+</Text>
                            <Text style={textStyle2}>Upload from cloud or gallery</Text>
                        </View>
                    </View>
                    <View style={boxStyle2}>
                        <TouchableOpacity style={buttonStyle} onPress={() => navigation.navigate('Albums')}>
                            <Text style={buttonTextStyle}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};


const inputTextStyle = style('text-lg font-semibold text-black');
const buttonStyle = style('bg-[#FFA500] w-50 py-1 rounded-lg shadow-xl');
const buttonTextStyle = style('text-lg text-white font-bold text-center');
const inputStyle = style('border w-65 rounded-lg p-0 pl-2 mt-2 mb-6');
const textStyle = style('text-xl font-semibold text-black text-center mb-6');
const textStyle2 = style(tw`text-txtSecondary text-center font-semibold`);
const textStyle3 = style(tw`text-txtSecondary text-center font-semibold text-xl`);
const boxStyle = style(tw`bg-secondary my-10 mx-6 p-4 pb-10 rounded-lg`);
const upladBox = style(tw`border w-65 rounded-lg py-2 mt-2 mb-16`);
const boxStyle2 = style(tw`flex items-center justify-center`);
