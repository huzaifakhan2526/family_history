import React from 'react';
import { SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { style } from 'twrnc';
import tw from '../../../tw';
import { OtpInput } from 'react-native-otp-entry';
import { ProfilePicker } from './components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>



export const LoginScreen = ({navigation} : LoginScreenProps) => {

    return (
        <SafeAreaView style={tw`bg-secondary h-full`}>
            <StatusBar backgroundColor="#FFF6E6" />
            <View style={boxStyle}>
                <View style={tw`mt-20 mb-15`}>
                    <ProfilePicker />
                </View>
                <View>
                    <Text style={inputTextStyle}>Enter Email : </Text>
                    <TextInput
                        placeholder="Enter your email"
                        style={inputStyle}
                    />
                </View>
                <View style={boxStyle2}>
                    <Text style={inputTextStyle}>Enter OTP : </Text>
                    <OtpInput numberOfDigits={4}
                        theme={{
                            pinCodeContainerStyle: { height: 30, width: 35, borderColor: '#505050', marginHorizontal: 10, borderRadius: 8, backgroundColor: '#FFF' },
                            containerStyle: { width: 80, marginTop: 5 },
                        }}
                    />
                </View>
                <TouchableOpacity style={buttonStyle}>
                    <Text style={buttonTextStyle}>Resend OTP</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={buttonStyle2}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={buttonTextStyle2}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const boxStyle = style(tw`flex justify-center items-center`);
const boxStyle2 = style(tw`mb-10  w-65`);
const inputTextStyle = style('text-lg font-semibold text-black');
const inputStyle = style('border w-65 rounded-lg p-0 pl-2 mt-2 mb-6 bg-white');
const buttonStyle = style(tw`bg-primary w-30 py-2 rounded-lg shadow-xl`);
const buttonStyle2 = style(tw`bg-primary w-50 py-1 rounded-lg shadow-xl mt-15`);
const buttonTextStyle = style('text-sm text-white font-bold text-center');
const buttonTextStyle2 = style('text-lg text-white font-bold text-center');

