import React, { useState, forwardRef, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { style } from 'twrnc';
import tw from '../../tw';
import Toast from 'react-native-toast-message';
import axiosInstance from '../api/axiosInstance';
import { OtpInput } from 'react-native-otp-entry';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ToastWrapper = forwardRef((props, ref) => {
    return <Toast ref={ref} {...props} />;
});

export const OtpVerificationScreen = ({ route }) => {
    const navigation = useNavigation();
    const { data, username } = route.params; 
    // now i recieved username and data form the api named as send_otp here 
    // the variables are data and username
    
    const [otp, setOtp] = useState<string>('');
    useEffect(() => {
        console.log(data); // Log the data

        if (data && data.status) { // Check if data is defined and status is true
            Toast.show({
                type: 'success',
                text1: 'OTP Sent Successfully',
                text2: 'Please check your email',
                visibilityTime: 10000,
            });
        }
    }, [data]);

    const handleLogin = async () => {
        console.log('Otp', otp);
        console.log('Username', username);
    
        // Validate the OTP to ensure it's exactly 6 digits
        const isValidOtp = /^\d{6}$/.test(otp);
    
        if (isValidOtp) {
            try {
                // Prepare data to be sent in the API request
                const data = new URLSearchParams();
                data.append('username', username);
                data.append('otp', otp);
    
                const res = await axiosInstance.post('auth/login', data.toString(), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });
            
                // Log the entire response and the formatted version
                console.log(res);
                console.log('Stringified Response:', JSON.stringify(res.data.data, null, 2));
            
                // Check the status and data from the response
                if (res.data && res.data.status === false) {
                    // Handle specific error when OTP has already been used
                    const errorMessage = res.data.errormsg || 'OTP Verification Failed';
                    Toast.show({
                        type: 'error',
                        text1: errorMessage,
                        text2: 'Please try again with a valid OTP.',
                        visibilityTime: 5000,
                    });
                } else if (res.data && res.data.status === true) {
                    // Show success message if OTP is sent successfully
                    await AsyncStorage.setItem('userData', JSON.stringify(res.data.data));

                    Toast.show({
                        type: 'success',
                        text1: 'Login Successful',
                        text2: 'You have successfully logged in!',
                        visibilityTime: 5000,
                    });
                    navigation.reset({
                        index: 0, // This is the index of the active route after the reset
                        routes: [{ name: 'Main' }], // Define the new navigation stack
                    });
                } else {
                    // Handle unexpected response structure
                    Toast.show({
                        type: 'error',
                        text1: 'Unexpected response from the server.',
                        text2: 'Please try again later.',
                        visibilityTime: 5000,
                        onHide: () => {
                            navigation.replace('Login');
                        },
                    });
                }
            } catch (error) {
                // Handle any API errors
                Toast.show({
                    type: 'error',
                    text1: 'Cannot get OTP, try again!',
                });
            }
        } else {
            // Show error message if OTP is invalid
            Toast.show({
                type: 'error',
                text1: 'Invalid OTP',
                text2: 'Please enter a 6-digit OTP code.',
            });
        }
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
const boxStyle2 = style(tw`mt-40 w-65`);
const inputTextStyle = style('text-lg font-semibold text-black');
const buttonStyle2 = style(tw`bg-primary w-50 py-1 rounded-lg shadow-xl mt-10`);
const buttonTextStyle2 = style('text-lg text-white font-bold text-center');
