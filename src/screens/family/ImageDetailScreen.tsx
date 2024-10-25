import React from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Topbar } from './components';
import { style } from 'twrnc';
import tw from '../../../tw';

const boxStyle = style(tw`h-80 w-80 bg-card rounded-sm flex justify-center items-center shadow-xl m-5`);
const textStyle = style(tw`text-txtSecondary text-xl font-semibold m-1`);
const imgStyle = style(tw`w-[100%] h-50 rounded-t-sm`);
const buttonStyle = style('bg-[#FFA500] w-30 py-1 rounded-lg shadow-xl mb-5 py-2');
const buttonTextStyle = style('text-sm text-white font-bold text-center');
const boxStyle2 = style(tw`flex flex-row justify-evenly mt-10`);

export const ImageDetailScreen = () => {
    return (
        <SafeAreaView>
            <Topbar title="Images" />
            <View>
                <View style={boxStyle}>
                    <Image source={require('../../assets/images/img-105.png')} style={imgStyle} />
                    <Text style={textStyle}>Reviving the  memory of our first family  goa trip. so many memory related to that day.</Text>
                </View>
            </View>
            <View style={boxStyle2}>
                <TouchableOpacity style={buttonStyle}>
                    <Text style={buttonTextStyle}>Download</Text>
                </TouchableOpacity>
                <TouchableOpacity style={buttonStyle}>
                    <Text style={buttonTextStyle}>Share</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
