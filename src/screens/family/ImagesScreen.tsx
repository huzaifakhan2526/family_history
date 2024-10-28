import React, { useState } from 'react';
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Topbar, UploadPopUp } from './components';
import Search from '../../assets/icons/search.svg';
import { style } from 'twrnc';
import tw from '../../../tw';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type ImagesScreenProps = NativeStackScreenProps<RootStackParamList, 'Albums'>

const searchBox = style(tw`border flex flex-row items-center justify-between rounded-lg py-1 px-2 mx-4 mt-5 mb-10`);
const inputStyle = style(tw`w-60 p-0`);
const activeTabStyle = style(tw`text-primary underline text-xl font-semibold mx-5`);
const inacitveTabStyle = style(tw`text-txtSecondary text-xl font-semibold mx-5`);
const toggleStyle = style(tw`flex flex-row justify-evenly items-center w-40 mb-5`);
const albumTabStyle = style(tw`flex flex-row justify-evenly`);
const albumStyle = style(tw`items-center w-25`);
const ablumImageStyle = style(tw`h-20 w-20 rounded-full shadow-xl`);
const albumNameStyle = style(tw`text-txtSecondary text-2lg font-semibold mt-2`);
const buttonTextStyle = style('text-4xl text-white font-semibold text-center');
const addBtnStyle = style(tw`bg-primary h-10 w-10 rounded-full shadow-xl justify-center absolute top-150 left-75`);
const boxShadow = style(tw`shadow-lg`);



export const ImagesScreen = ({ navigation }: ImagesScreenProps) => {
    const [activeTab, setAcitveTab] = useState('Albums');
    const [popupVisibility, setPopupVisibilty] = useState(false);

    return (
        <SafeAreaView>
            <Topbar title="Images" />
            <View style={searchBox}>
                <TextInput placeholder="Enter Album Name, place , date etc" style={inputStyle} placeholderTextColor="#FFA500" />
                <Search />
            </View>
            <View style={tw`mx-4`}>
                <View style={toggleStyle}>
                    <TouchableOpacity onPress={() => setAcitveTab('Albums')}>
                        <Text style={activeTab === 'Albums' ? activeTabStyle : inacitveTabStyle}>Albums</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setAcitveTab('All')}>
                        <Text style={activeTab === 'All' ? activeTabStyle : inacitveTabStyle}>All</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {
                        activeTab === 'Albums' ? (
                            <View style={albumTabStyle}>
                                <TouchableOpacity onPress={() => navigation.navigate('AlbumsDetail')}>
                                    <View style={albumStyle}>
                                        <View style={boxShadow}>
                                            <Image source={require('../../assets/images/profile101.jpg')} style={ablumImageStyle} />
                                        </View>
                                        <Text style={albumNameStyle}>Goa Trip</Text>
                                    </View>
                                </TouchableOpacity>

                                <View style={albumStyle}>
                                    <Image source={require('../../assets/images/profile101.jpg')} style={ablumImageStyle} />
                                    <Text style={albumNameStyle}>Memories</Text>
                                </View>
                                <View style={albumStyle}>
                                    <Image source={require('../../assets/images/profile101.jpg')} style={ablumImageStyle} />
                                    <Text style={albumNameStyle}>LA Trip</Text>
                                </View>
                            </View>
                        ) : (
                            <View style={albumTabStyle}>
                                <Text>This is All Tab</Text>
                            </View>
                        )
                    }
                </View>
            </View>
            <View style={addBtnStyle}>
                <TouchableOpacity onPress={() => setPopupVisibilty(true)}>
                    <Text style={buttonTextStyle}>+</Text>
                </TouchableOpacity>
                <UploadPopUp visible={popupVisibility} onClose={() => setPopupVisibilty(false)} />
            </View>
        </SafeAreaView>
    );
};
