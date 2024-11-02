import React, { useState } from 'react';
import { Image, ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { style } from 'twrnc';
import tw from '../../../tw';
import BackArrow from '../../assets/icons/ep_back.svg';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
// import { Loader } from '../../components/common';

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>


const topbarStyle = style(tw`h-30 rounded-b-custom-radius flex flex-row items-start pt-10`);
const textStyle = style(tw`text-xl text-white font-bold text-center w-[80%]`);
const boxStyle = style(tw`absolute top-30 left-34 items-center`);
const imgStyle = style(tw`h-30 w-30`);
const imgStyle2 = style(tw`h-5 w-5 mt-2`);
const textStyle2 = style(tw`text-txtSecondary text-base font-semibold text-left w-[20%] ml-[18%]`); // fixed width for alignment
const textStyle4 = style(tw`text-txtSecondary text-base font-semibold text-center w-[10%]`); // fixed width for alignment
const textStyle3 = style(tw`text-[#3E3E3E] text-2lg font-semibold flex-1 text-left`); // flexible width for spacing
const boxStyle2 = style(tw`mt-15 py-5 rounded-lg mx-auto w-full max-w-md flex flex-col`); // Center-aligned with max width
const boxStyle3 = style(tw`m-2 flex flex-row justify-between items-center w-full`); // 100% width, center-aligned, and vertical alignment

const separatorStyle = style(tw`mx-2`); // add margin for spacing
const buttonStyle = style('bg-[#FFA500] w-30 py-1 rounded-lg shadow-xl');
const buttonTextStyle = style('text-lg text-white font-bold text-center');
const btnCtr = style('items-center my-10');


const screenWidth = Dimensions.get('window').width;


export const ProfileScreen = ({ navigation }: ProfileScreenProps) => {

    const [userData, setUserData] = useState({});

    const fetchUserData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userData'); // Replace 'userData' with your actual key
            if (jsonValue != null) {
                const parsedData = JSON.parse(jsonValue);
                setUserData(parsedData); // Set user data to state
                console.log('Fetched user data:', parsedData);
            } else {
                setUserData(null); // Handle the case when no data is found
            }
        } catch (e) {
            console.error('Failed to fetch user data from AsyncStorage:', e);
            setUserData(null); // Handle any errors
        }
    };

    const handleBackPress = () => {
        navigation.navigate('Home'); // Replace 'MainScreen' with your actual main screen name
    };

    const handleLogout = async () => {
        try {
            // Clear all items from AsyncStorage to ensure complete logout
            await AsyncStorage.clear();
            navigation.reset({
                index: 0,
                routes: [{ name: 'Start', params: { logoutSuccess: true } }],
            });
        } catch (error) {
            console.error('Logout unsuccessful', error);
        }
    };


    useFocusEffect(
        React.useCallback(() => {
            fetchUserData();
        }, [])
    );



    return (
        <SafeAreaView>
            <StatusBar backgroundColor="#FFA500" />
            <ImageBackground source={require('../../assets/images/bgpattern.png')}>
                <View style={topbarStyle}>
                    <TouchableOpacity onPress={handleBackPress} style={tw`ml-2`}><BackArrow /></TouchableOpacity>
                    <Text style={textStyle}>Profile</Text>
                </View>
                <View style={styles.boxStyle2}>
                    <Image source={require('../../assets/images/3135715.png')} style={styles.imgStyle} />
                    {/* <Image source={require('../../assets/images/editicon.png')} style={imgStyle2} /> */}
                </View>
            </ImageBackground>
            {/* <View style={boxStyle2}>
                <View style={boxStyle3}>
                    <Text style={textStyle2}>Name</Text>
                    <Text style={textStyle4}>-</Text>
                    <Text style={textStyle3}>{userData.name || 'N/A'}</Text>
                </View>
                <View style={boxStyle3}>
                    <Text style={textStyle2}>Age</Text>
                    <Text style={textStyle4}>-</Text>
                    <Text style={textStyle3}>{userData.age || 'N/A'}</Text>
                </View>
                <View style={boxStyle3}>
                    <Text style={textStyle2}>Mobile No.</Text>
                    <Text style={textStyle4}>-</Text>
                    <Text style={textStyle3}>{userData.mobile_no || 'N/A'}</Text>
                </View>
                <View style={boxStyle3}>
                    <Text style={textStyle2}>Gender</Text>
                    <Text style={textStyle4}>-</Text>
                    <Text style={textStyle3}>{userData.gender || 'N/A'}</Text>
                </View>
                <View style={boxStyle3}>
                    <Text style={textStyle2}>Email</Text>
                    <Text style={textStyle4}>-</Text>
                    <Text style={textStyle3}>{userData.email || 'N/A'}</Text>
                </View>
                <View style={btnCtr}>
                    <TouchableOpacity style={buttonStyle} onPress={handleLogout}>
                        <Text style={buttonTextStyle}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View> */}
            <View style={styles.container}>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle2}>Name</Text>
                    <Text style={styles.textStyle4}>-</Text>
                    <Text style={styles.textStyle3}>{userData.name || 'N/A'}</Text>
                </View>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle2}>Age</Text>
                    <Text style={styles.textStyle4}>-</Text>
                    <Text style={styles.textStyle3}>{userData.age || 'N/A'}</Text>
                </View>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle2}>Mobile No.</Text>
                    <Text style={styles.textStyle4}>-</Text>
                    <Text style={styles.textStyle3}>{userData.mobile_no || 'N/A'}</Text>
                </View>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle2}>Gender</Text>
                    <Text style={styles.textStyle4}>-</Text>
                    <Text style={styles.textStyle3}>{userData.gender || 'N/A'}</Text>
                </View>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle2}>Email</Text>
                    <Text style={styles.textStyle4}>-</Text>
                    <Text style={styles.textStyle3}>{userData.email || 'N/A'}</Text>
                </View>
                <View style={btnCtr}>
                    <TouchableOpacity style={buttonStyle} onPress={handleLogout}>
                        <Text style={buttonTextStyle}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: screenWidth * 0.8,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 3, // For Android
        padding: 20,
        marginTop: 75, // Added margin top
        alignSelf: 'center',
    },
    boxStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10, // Space between each box
    },
    textStyle2: {
        fontWeight: 'bold',
        marginRight: 5,
        color: 'black',
        fontSize: 20,
        width: screenWidth * 0.25,
    },
    textStyle3: {
        flex: 1,
        color: '#3E3E3E',
        fontSize: 14
    },
    textStyle4: {
        marginRight: 5,
        color: '#3E3E3E',

    },
    btnCtr: {
        marginTop: 20,
        alignItems: 'center',
    },
    buttonStyle: {
        backgroundColor: '#007BFF',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonTextStyle: {
        color: '#fff',
        fontWeight: 'bold',
    },
    imgStyle: {
        width: 120, // Set desired width
        height: 120, // Set desired height
        borderRadius: 100, // Half of width/height for a circular effect
        borderWidth: 5, // Set the border width
        borderColor: '#fff', // Set the border color
      },

      boxStyle2: {
        alignItems: 'center', // Center image horizontally
        justifyContent: 'center', // Center image vertically if needed
      },
});