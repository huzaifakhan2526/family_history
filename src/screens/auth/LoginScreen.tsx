import React from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import tw from 'twrnc';
import ProfilePicker from '../../components/ui/ProfilePicker';
import { OtpInput } from 'react-native-otp-entry';
import { ButtonPrimary } from '../../components/common';


export default function LoginScreen() {
    return (
        <SafeAreaView style={tw`bg-[#FFF6E6]`}>
            <View style={tw`h-full flex justify-center items-center`}>
                <View style={tw`mb-[106px]`}>
                    <ProfilePicker />
                </View>
                <View>
                    <Text style={tw`text-[16px] font-semibold mb-1`}>Enter Email : </Text>
                    <TextInput
                        placeholder="Enter your email"
                        style={tw`border border-[#505050] p-0 w-[310px] h-[38px] rounded p-1`}
                    />
                </View>
                <View style={tw`mt-5 mb-10  w-80`}>
                    <Text style={tw`text-[16px] font-semibold mb-1`}>Enter OTP : </Text>
                    <OtpInput numberOfDigits={4}
                        theme={{
                            pinCodeContainerStyle: { height: 35, width: 45, borderColor: '#505050', marginHorizontal: 10},
                            containerStyle: { width: 80 },
                        }}
                    />
                </View>
                <ButtonPrimary title={'Resend OTP'} />
                <View style={tw`m-10`}>
                    <ButtonPrimary title={'Login'} />
                </View>
            </View>
        </SafeAreaView>
    );
}
