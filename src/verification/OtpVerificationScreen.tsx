import React, { useState, forwardRef } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { style } from 'twrnc';
import tw from '../../tw';
import Toast from 'react-native-toast-message';
import axiosInstance from '../api/axiosInstance';
import { OtpInput } from 'react-native-otp-entry';

const ToastWrapper = forwardRef((props, ref) => {
    return <Toast ref={ref} {...props} />;
});

export const OtpVerificationScreen = ({ route }) => {
    const { data, username } = route.params; 
    // now i recieved username and data form the api named as send_otp here 
    const [otp, setOtp] = useState<string>('');

    const handleLogin = () => {
    };

    return (
        <SafeAreaView style={tw`bg-secondary h-full`}>
            <StatusBar backgroundColor="#FFF6E6" />
            <ScrollView>
                <View style={boxStyle}>
                    <View style={boxStyle2}>
                        <Text style={inputTextStyle}>Enter OTP:</Text>
                        <OtpInput
                            numberOfDigits={6}
                            onTextChange={(text) => setOtp(text)} 
                            theme={{
                                pinCodeContainerStyle: { height: 40, width: 35, borderColor: '#505050', marginHorizontal: 5, borderRadius: 8, backgroundColor: '#FFF' },
                                containerStyle: { width: 50, marginTop: 5 },
                                pinCodeTextStyle: { fontSize: 20, color: 'black' },
                                focusStickStyle: { height: 25 },
                            }}
                        />
                    </View>
                    <TouchableOpacity style={buttonStyle2} onPress={handleLogin}> 
                        <Text style={buttonTextStyle2}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <ToastWrapper />
        </SafeAreaView>
    );
};

const boxStyle = style(tw`flex justify-center items-center`);
const boxStyle2 = style(tw`mt-10 w-65`);
const inputTextStyle = style('text-lg font-semibold text-black');
const buttonStyle2 = style(tw`bg-primary w-50 py-1 rounded-lg shadow-xl mt-10`);
const buttonTextStyle2 = style('text-lg text-white font-bold text-center');
