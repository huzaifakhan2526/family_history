import React from 'react';
import { Image, SafeAreaView, Text} from 'react-native';
import { style } from 'twrnc';
import tw from '../../../tw';


export const Loader = () => {
    return (
        <SafeAreaView style={boxStyle}>
            <Image source={require('../../assets/images/loader.gif')} style={gifStyle} />
            <Text style={textStyle}>Loading... Please wait while we set up your album for storing images and documents.</Text>
        </SafeAreaView>
    );
};

const boxStyle = style(tw`h-full items-center justify-center`);
const gifStyle = style(tw`w-70 h-70`);
const textStyle = style(tw`text-xl text-txtSecondary text-center font-bold`);
