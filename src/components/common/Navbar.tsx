import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Navbar() {
    const navigation = useNavigation();
    const [userData, setUserData] = useState({}); // Initialize as an empty object

    // Function to fetch the user data from AsyncStorage
    const fetchUserData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userData'); // Replace 'userData' with your actual key
            if (jsonValue) {
                const parsedData = JSON.parse(jsonValue);
                setUserData(parsedData); // Set parsed data to state
            } else {
                console.log('No user data found in AsyncStorage');
            }
        } catch (error) {
            console.error('Failed to fetch user data from AsyncStorage:', error);
        }
    };

    // Use useFocusEffect to refetch data whenever the screen gains focus
    useFocusEffect(
        React.useCallback(() => {
            fetchUserData();
        }, [])
    );
    const nameFromEmail = userData.email ? userData.email.split('@')[0] : '';


    return (
        <View style={[tw`bg-[#FFA500] h-35 rounded-b-2xl`, styles.topboxmain]}>
            <View style={tw`flex flex-row justify-end items-center pr-3 pt-1`}>
                <View style={tw`bg-white h-10 w-10 rounded-full flex items-center justify-center`}>
                    <Image source={require('../../assets/images/gravity-ui_bell-dot3.png')} style={{ width: 25, height: 25 }} />
                </View>
                <TouchableOpacity style={tw`h-15 w-15 rounded-full flex items-center justify-center ml-2`} onPress={() =>
                    navigation.navigate('Profile')}>
                    <Image source={require('../../assets/images/3135715.png')} style={{ width: 55, height: 55, borderRadius: 50, borderWidth: 4, borderColor: '#fff' }} />
                </TouchableOpacity>
            </View>
            <View style={[tw`pl-4`, styles.absoluteBox]}>
                <Text style={[tw`text-white text-2xl`, styles.robotoText]}>
                    Welcome{'\n'}
                    {nameFromEmail}{'\n'}
                    <Text style={styles.memoirly}>memoirly</Text>
                </Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    robotoText: {
        fontFamily: 'Roboto', // Ensure the font is available in your project
        fontSize: 24,
        fontWeight: 600
    },
    memoirly: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#FFFFFF',
        fontStyle: 'italic',
    },
    absoluteBox: {
        position: 'absolute',
        bottom: 0, // Adjust as needed
        left: 0, // Adjust as needed
        // You can set width, height, or other styles as needed
    },
    topboxmain: {
        position: 'relative'
    }
});
