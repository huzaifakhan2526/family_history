import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { Topbar } from './components';
import { style } from 'twrnc';
import tw from '../../../tw';

const ctrStyle = style(tw`flex flex-row flex-wrap justify-between items-center mt-10`);
const boxStyle = style(tw`h-35 w-35 bg-ternary rounded-lg flex justify-center items-center shadow-xl m-5`);
const textStyle = style(tw`text-txtSecondary text-2lg font-semibold mt-2`);

export const MyFamilyScreen = () => {
    return (
        <SafeAreaView>
            <Topbar title="My Family" />
            <View style={ctrStyle}>
                <View style={boxStyle}>
                    <Image source={require('../../assets/images/album.png')} />
                    <Text style={textStyle}>Images</Text>
                </View>
                <View style={boxStyle}>
                    <Image source={require('../../assets/images/solar_document-bold.png')} />
                    <Text style={textStyle}>Documents</Text>
                </View>
                <View style={boxStyle}>
                    <Image source={require('../../assets/images/3417217.png')} style={tw`w-17 h-17`} />
                    <Text style={textStyle}>Images</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};
