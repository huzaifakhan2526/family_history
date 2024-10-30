import React from 'react';
import { Image, ImageBackground, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { style } from 'twrnc';
import tw from '../../../tw';
import BackArrow from '../../assets/icons/ep_back.svg';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
// import { Loader } from '../../components/common';

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>


const topbarStyle = style(tw`h-55 rounded-b-custom-radius  flex flex-row items-start   pt-10`);
const textStyle = style(tw`text-xl text-white font-bold text-center w-[80%]`);
const boxStyle = style(tw`absolute top-30 left-34 items-center`);
const imgStyle = style(tw`h-30 w-30`);
const imgStyle2 = style(tw`h-5 w-5 mt-2`);
const textStyle2 = style(tw`text-txtSecondary text-base font-semibold mt-2 text-left`);
const textStyle3 = style(tw`text-[#3E3E3E] text-2lg font-semibold mt-2`);
const boxStyle2 = style(tw`mt-15 mx-8 py-5 rounded-lg`);
const boxStyle3 = style(tw`m-2 flex flex-row items-center justify-evenly`);
const buttonStyle = style('bg-[#FFA500] w-30 py-1 rounded-lg shadow-xl');
const buttonTextStyle = style('text-lg text-white font-bold text-center');
const btnCtr = style('items-center my-10');


export const ProfileScreen = ({navigation} : ProfileScreenProps) => {

    const handleLogout = async() => {
        try {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userId');
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'User Logged out succsesfully',
            });
            console.log('User Logged out succsesfully');
            navigation.navigate('Start');
        } catch (error) {
            console.log('Logout Unsuccesseful');
        }
    };

    return (
        <SafeAreaView>
            <StatusBar backgroundColor="#FFA500" />
            <ImageBackground source={require('../../assets/images/bgpattern.png')}>
                <View style={topbarStyle}>
                    <View style={tw`ml-2`}><BackArrow /></View>
                    <Text style={textStyle}>Profile</Text>
                </View>
                <View style={boxStyle}>
                    <Image source={require('../../assets/images/profile-img-102.png')} style={imgStyle} />
                    <Image source={require('../../assets/images/editicon.png')} style={imgStyle2} />
                </View>
            </ImageBackground>
            <View style={boxStyle2}>
                <View style={boxStyle3}><Text style={textStyle2}>Name</Text><Text style={textStyle2}>-</Text><Text style={textStyle3}>Rahul</Text></View>
                <View style={boxStyle3}><Text style={textStyle2}>Age</Text><Text style={textStyle2}>-</Text><Text style={textStyle3}>22</Text></View>
                <View style={boxStyle3}><Text style={textStyle2}>Mobile No.</Text><Text style={textStyle2}>-</Text><Text style={textStyle3}>123456789</Text></View>
                <View style={boxStyle3}><Text style={textStyle2}>Gender</Text><Text style={textStyle2}>-</Text><Text style={textStyle3}>Male</Text></View>
                <View style={boxStyle3}><Text style={textStyle2}>Email</Text><Text style={textStyle2}>-</Text><Text style={textStyle3}>xyz@gmail.com</Text></View>
                <View style={btnCtr}>
                    <TouchableOpacity style={buttonStyle} onPress={handleLogout}>
                        <Text style={buttonTextStyle}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};
