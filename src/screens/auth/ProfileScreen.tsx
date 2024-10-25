import React from 'react';
import { Image, ImageBackground, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { style } from 'twrnc';
import tw from '../../../tw';
import BackArrow from '../../assets/icons/ep_back.svg';


const topbarStyle = style(tw`h-55 rounded-b-custom-radius  flex flex-row items-start   pt-10`);
const textStyle = style(tw`text-xl text-white font-bold text-center w-[80%]`);
const boxStyle = style(tw`absolute top-30 left-34 items-center`);
const imgStyle = style(tw`h-30 w-30`);
const imgStyle2 = style(tw`h-5 w-5 mt-2`);
const textStyle2 = style(tw`text-txtSecondary text-xl font-semibold mt-2`);
const textStyle3 = style(tw`text-txtSecondary text-lg font-semibold mt-2`);
const boxStyle2 = style(tw`border`);
const boxStyle3 = style(tw`border m-5 flex flex-row items-center`);

export const ProfileScreen = () => {
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
                <View><Text>Name</Text><Text>-</Text><Text>Rahul</Text></View>
                <View><Text>Name</Text><Text>-</Text><Text>Rahul</Text></View>
                <View><Text>Name</Text><Text>-</Text><Text>Rahul</Text></View>
                <View><Text>Name</Text><Text>-</Text><Text>Rahul</Text></View>
            </View>
        </SafeAreaView>
    );
}