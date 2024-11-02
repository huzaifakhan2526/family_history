import React, { forwardRef, useEffect, useState } from 'react';
import { Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { style } from 'twrnc';
import tw from '../../../tw';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

type StartScreenProps = NativeStackScreenProps<RootStackParamList, 'Start'>

const ToastWrapper = forwardRef((props, ref) => {
    return <Toast ref={ref} {...props} />;
});


export const StartScreen = ({ navigation }: StartScreenProps) => {
    const [token, setToken] = useState<string | null>(null);
    const route = useRoute();
    const isFocused = useIsFocused();

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedUserData = await AsyncStorage.getItem('userData');
                if(storedUserData){
                    const parsedData = JSON.parse(storedUserData); // Parse the JSON string
                    const id = parsedData.user_id;
                    const session = parsedData.session.session_token;
                    if(session){
                        setToken(session);
                    }
                    navigation.replace('Main');
                }
                if (storedUserData) {
                    console.log(storedUserData);
                    
                }
            } catch (error) {
                console.error('Failed to load user data', error);
            }
        };

        // Show logout toast if `logoutSuccess` param is present
        if (route.params?.logoutSuccess) {
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'User logged out successfully',
            });

            // Clean up `logoutSuccess` param after showing toast
            navigation.setParams({ logoutSuccess: undefined });
        }

        if (isFocused) {
            loadUserData();
        }
    }, [isFocused, route.params?.logoutSuccess]);

    return (
        <SafeAreaView style={tw`bg-white`}>
            <StatusBar backgroundColor="#FFF6E6" />
            <View style={boxStyle}>
                <Image source={require('../../assets/images/StartScreenImg101.png')} style={imgStyle} />
                <Text style={textStyle}>Welcome Your personal space to store, organize, and cherish all your
                    family photos, documents, and memories in one secure place. Start preserving your
                    family history today!
                </Text>
                <View style={boxStyle2}>
                    <TouchableOpacity style={buttonStyle} onPress={() => token ? navigation.navigate('Main') : navigation.replace('Login')}>
                        <Text style={buttonTextStyle}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ToastWrapper />
        </SafeAreaView>
    );
};

const imgStyle = style(tw`h-80 w-70`);
const boxStyle = style(tw`justify-center items-center  mx-5 h-[100%]`);
const textStyle = style(tw`text-txtSecondary text-base text-center font-bold leading-8 mt-15 mb-20s`);
const buttonStyle = style(tw`bg-primary w-25 py-1 rounded-lg shadow-xl`);
const buttonTextStyle = style('text-lg text-white font-bold text-center');
const boxStyle2 = style(tw`w-80 items-end justify-end`);

