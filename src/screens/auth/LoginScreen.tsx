// import React, { useState } from 'react';
// import { SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { style } from 'twrnc';
// import tw from '../../../tw';
// import { OtpInput } from 'react-native-otp-entry';
// import { ProfilePicker } from './components';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';
// import axiosInstance from '../../api/axiosInstance';
// import Toast from 'react-native-toast-message';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';

// type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>



// export const LoginScreen = ({ navigation }: LoginScreenProps) => {
//     const [email, setEmail] = useState<string>('');
//     const [otp, setOtp] = useState<string>('');


//     useFocusEffect(
//         React.useCallback(() => {
//             setEmail('');
//             setOtp('');
//         }, [])
//     );

//     const handleOTP = async () => {
//         const data = new URLSearchParams();
//         data.append('username', email);

//         try {
//             const res = await axiosInstance.post('auth/send_otp', data.toString(), {
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//             });

//             const newOtp = res.data.data.otp;
//             const getOtp = newOtp.toString();


//             if (res.data.status) {
//                 Toast.show({
//                     type: 'success',
//                     text1: getOtp,
//                     visibilityTime: 10000,
//                 });
//             }

//         } catch (error: any) {
//             Toast.show({
//                 type: 'error',
//                 text1: 'Cannot get OTP , try again !!',
//             });
//         }
//     };



//     const handleLogin = async () => {
//         const data = new URLSearchParams();
//         data.append('username', email);
//         data.append('otp', otp);

//         try {
//             const res = await axiosInstance.post('auth/login', data.toString(), {
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//             });

//             const { session_token } = res.data.data.session;
//             const { user_id } = res.data.data;
//             await AsyncStorage.setItem('userToken', session_token);
//             await AsyncStorage.setItem('userId', user_id.toString());

//             if (res.data.status) {
//                 Toast.show({
//                     type: 'success',
//                     text1: 'Login Successeful',
//                     visibilityTime: 3000,
//                 });
//             }

//             setOtp('');
//             setEmail('');

//             navigation.navigate('Home');
//         } catch (error) {
//             Toast.show({
//                 type: 'error',
//                 text1: 'Login Unsuccesseful',
//                 visibilityTime: 3000,
//             });
//         }
//     };

//     return (
//         <SafeAreaView style={tw`bg-secondary h-full`}>
//             <StatusBar backgroundColor="#FFF6E6" />
//             <ScrollView>
//                 <View style={boxStyle}>
//                     <View style={tw`mt-20 mb-15`}>
//                         <ProfilePicker />
//                     </View>
//                     <View>
//                         <Text style={inputTextStyle}>Enter Email : </Text>
//                         <TextInput
//                             placeholder="Enter your email"
//                             style={inputStyle}
//                             value={email}
//                             onChangeText={(text) => setEmail(text)}
//                         />
//                     </View>
//                     <TouchableOpacity style={buttonStyle} onPress={handleOTP}>
//                         <Text style={buttonTextStyle}>Send OTP</Text>
//                     </TouchableOpacity>
                    // <View style={boxStyle2}>
                    //     <Text style={inputTextStyle}>Enter OTP : </Text>
                    //     <OtpInput numberOfDigits={6}
                    //         onTextChange={(text) => setOtp(text)}
                    //         focusColor="grey"
                    //         theme={{
                    //             pinCodeContainerStyle: { height: 30, width: 35, borderColor: '#505050', marginHorizontal: 5, borderRadius: 8, backgroundColor: '#FFF' },
                    //             containerStyle: { width: 50, marginTop: 5 },
                    //             pinCodeTextStyle: { fontSize: 20 },
                    //             focusStickStyle: {height: 20},
                    //         }}
                    //     />
                    // </View>
//                     <TouchableOpacity
//                         style={buttonStyle2}
//                         onPress={(handleLogin)}
//                     >
//                         <Text style={buttonTextStyle2}>Login</Text>
//                     </TouchableOpacity>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// const boxStyle = style(tw`flex justify-center items-center`);
// const boxStyle2 = style(tw`mt-10  w-65`);
// const inputTextStyle = style('text-lg font-semibold text-black');
// const inputStyle = style('border w-65 rounded-lg p-0 pl-2 mt-2 mb-6 bg-white');
// const buttonStyle = style(tw`bg-primary w-30 py-2 rounded-lg shadow-xl`);
// const buttonStyle2 = style(tw`bg-primary w-50 py-1 rounded-lg shadow-xl mt-10`);
// const buttonTextStyle = style('text-sm text-white font-bold text-center');
// const buttonTextStyle2 = style('text-lg text-white font-bold text-center');





import React, { useState, forwardRef, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { style } from 'twrnc';
import tw from '../../../tw';
import { ProfilePicker } from './components';
import Toast from 'react-native-toast-message';
import axiosInstance from '../../api/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


const ToastWrapper = forwardRef((props, ref) => {
    return <Toast ref={ref} {...props} />;
});

export const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    const handleSendOtp = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            const data = new URLSearchParams();
            data.append('username', email); 
            try {
                const res = await axiosInstance.post('auth/send_otp', data.toString(), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });

                const newOtp = res.data.data.otp;
                const getOtp = newOtp.toString();

                if (res.data.status) {
                    // Show success message with the OTP
                    Toast.show({
                        type: 'success',
                        text1: 'OTP Sent Successfully',
                        text2: `Please check your email`,
                        visibilityTime: 10000,
                    });
                    navigation.navigate('OtpVerification', { 
                        data: res.data ,
                        username: email
                    });
                    
                }
            } catch (error) {
                // Handle any errors that occur during the API call
                Toast.show({
                    type: 'error',
                    text1: 'Cannot get OTP, try again !!',
                });
            }
        } else {
            // Show error message if email is invalid
            Toast.show({
                type: 'error',
                text1: 'Invalid Email',
                text2: 'Please enter a valid email address.',
            });
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            const loadUserData = async () => {
                try {
                    const storedUserData = await AsyncStorage.getItem('userData'); // Fetching userData
                    if (storedUserData) {
                        console.log('storedUserData:', storedUserData);
                        navigation.replace('Main'); // Navigate to Home if user data exists
                    }
                } catch (error) {
                    console.error('Failed to load user data', error);
                }
            };

            loadUserData(); // Call the loadUserData function here
        }, [navigation]) // Dependency array
    );


    return (
        <SafeAreaView style={tw`bg-secondary h-full`}>
            <StatusBar backgroundColor="#FFF6E6" />
            <ScrollView>
                <View style={boxStyle}>
                    <View style={tw`mt-20 mb-15`}>
                        <ProfilePicker />
                    </View>
                    <View>
                        <Text style={inputTextStyle}>Enter Email : </Text>
                        <TextInput
                            placeholder="Enter your email"
                            style={inputStyle}
                            placeholderTextColor="#A9A9A9" 
                            autoFocus={true}
                            value={email} 
                            onChangeText={setEmail} 
                        />
                    </View>
                    <TouchableOpacity style={buttonStyle} onPress={handleSendOtp}>
                        <Text style={buttonTextStyle}>Send OTP</Text>
                    </TouchableOpacity>
                    {/* <View style={boxStyle2}>
                        <Text style={inputTextStyle}>Enter OTP : </Text>
                        <OtpInput numberOfDigits={6}
                            onTextChange={(text) => setOtp(text)}
                            theme={{
                                pinCodeContainerStyle: { height: 40, width: 35, borderColor: '#505050', marginHorizontal: 5, borderRadius: 8, backgroundColor: '#FFF' },
                                containerStyle: { width: 50, marginTop: 5 },
                                pinCodeTextStyle: { fontSize: 20, color: 'black' },
                                focusStickStyle: {height: 25},
                            }}
                        />
                    </View>
                    <TouchableOpacity style={buttonStyle2}>
                        <Text style={buttonTextStyle2}>Login</Text>
                    </TouchableOpacity> */}
                </View>
            </ScrollView>
            <ToastWrapper />
        </SafeAreaView>
    );
};

const boxStyle = style(tw`flex justify-center items-center`);
const boxStyle2 = style(tw`mt-10 w-65`);
const inputTextStyle = style('text-lg font-semibold text-black');
const inputStyle = style('border w-65 rounded-lg p-0 pl-2 mt-2 mb-6 bg-white text-black');
const buttonStyle = style(tw`bg-primary w-30 py-2 rounded-lg shadow-xl`);
const buttonStyle2 = style(tw`bg-primary w-50 py-1 rounded-lg shadow-xl mt-10`);
const buttonTextStyle = style('text-sm text-white font-bold text-center');
const buttonTextStyle2 = style('text-lg text-white font-bold text-center');
const otpInputStyle = style('border w-65 mt-2'); // Custom style for OTP input