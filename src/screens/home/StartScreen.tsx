import React from 'react';
import { Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { style } from 'twrnc';
import tw from '../../../tw';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type StartScreenProps = NativeStackScreenProps<RootStackParamList, 'Start'>


export const StartScreen = ({navigation}: StartScreenProps) => {

    return (
        <SafeAreaView style={tw`bg-white`}>
            <StatusBar backgroundColor="#FFFFFF" />
            <View style={boxStyle}>
                <Image source={require('../../assets/images/StartScreenImg101.png')} style={imgStyle} />
                <Text style={textStyle}>Welcome Your personal space to store, organize, and cherish all your
                    family photos, documents, and memories in one secure place. Start preserving your
                    family history today!"
                </Text>
                <View style={boxStyle2}>
                    <TouchableOpacity style={buttonStyle}  onPress={() => navigation.navigate('Login')}>
                        <Text style={buttonTextStyle}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const imgStyle = style(tw`h-80 w-70`);
const boxStyle = style(tw`justify-center items-center  mx-5 h-[100%]`);
const textStyle = style(tw`text-txtSecondary text-base text-center font-bold leading-8 mt-15 mb-20s`);
const buttonStyle = style(tw`bg-primary w-25 py-1 rounded-lg shadow-xl`);
const buttonTextStyle = style('text-lg text-white font-bold text-center');
const boxStyle2 = style(tw`w-80 items-end justify-end`);

