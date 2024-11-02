import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from 'react-native';
import Navbar from '../../components/common/Navbar';
import tw from 'twrnc';
import Invite from '../../assets/icons/mdi_invite.svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import axiosInstance from '../../api/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';




type LandingScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>

export const LandingScreen = ({ navigation }: LandingScreenProps) => {

    const [folders, setFolders] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const [refreshing, setRefreshing] = useState(false);


    const onRefresh = () => {
        setRefreshing(true);
        get_folders(); // Call the function on refresh
    };
    const get_folders = async () => {
        try {
            setLoading(true);
            const jsonValue = await AsyncStorage.getItem('userData'); // Replace 'userData' with your actual key

            if (jsonValue) {
                const parsedData = JSON.parse(jsonValue); // Parse the JSON string
                const id = parsedData.user_id;
                const session = parsedData.session.session_token;

                const getFolderData = {
                    'user_id': id,
                    'session_token': session,
                    'parent_folder_id': '',
                };
                console.log('getfolder data', getFolderData);

                const res = await axiosInstance.post(
                    'folder/get_folders',
                    getFolderData,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }
                );

                const { data } = res.data;
                setFolders(data || []);
                console.log(folders);
            } else {
                console.log('No user data found');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setRefreshing(false); // Stop refreshing after data is loaded
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            get_folders(); // Fetch folders when the screen is focused
        }, [])
    );
    


    return (
        <SafeAreaView style={tw`flex-1`}>
            <Navbar />
            {loading ?
                (
                    <View style={tw`flex-1 justify-center items-center`}>
                        <ActivityIndicator size="large" color="#FFA500" />
                        <Text>Loading folders...</Text>
                    </View>
                ) : (
                    <View style={tw`mx-3 flex-1`}>
                        <View style={tw`w-30 mt-6 mb-10`}>
                            <TouchableOpacity style={tw`bg-[#BF7C00] px-2 py-1 rounded-lg shadow-xl`} onPress={() => navigation.navigate('CreateFolder')}>
                                <Text style={tw`text-white font-semibold text-sm  text-center`}>
                                    + Add new folder
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView 
                        contentContainerStyle={tw`pb-10`} 
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    >
                            {folders.map((items: any, index: number) => {
                                return (
                                    <View key={index} style={[tw`bg-[#FFF6E6] rounded-lg h-43 px-2 pt-3 mb-5`, styles.boxShadow]}>
                                        <Text style={tw`text-2xl text-[#FFA500] font-semibold`}>{items.folder_name}</Text>
                                        <TouchableOpacity style={tw`bg-[#FFA500] py-1 rounded-lg w-20 mt-2 mb-15`}>
                                            <Text style={tw`text-white font-semibold text-sm text-center`}>Owner</Text>
                                        </TouchableOpacity>
                                        <View style={tw`flex flex-row justify-between`}>
                                            <TouchableOpacity style={tw`bg-[#FFFFFF] px-1 py-1 rounded-lg w-20`} onPress={() => navigation.navigate('MyFamily', { folderId: items.folder_id, foldername: items.folder_name })}>
                                                <Text style={tw`text-[#BF7C00] font-semibold text-lg text-center`}>View</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={tw`bg-[#BF7C00] px-1 py-1 px-2 rounded-lg w-20 relative z-1 flex-row items-center justify-between`}>
                                                <Invite />
                                                <Text style={tw`text-white font-semibold text-lg text-center`}>Invite</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Image source={{ uri: items.folder_image }} style={tw`absolute z-0 top-12 left-55 w-30 h-30`} resizeMode="cover" />
                                    </View>
                                );
                            })}
                        </ScrollView>
                    </View>
                )
            }
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    boxShadow: {
        // For iOS
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 8,
        // For Android
        elevation: 3, // Adjust the elevation for the desired shadow effect
    },
});

