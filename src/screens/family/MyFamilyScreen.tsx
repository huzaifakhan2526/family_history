import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CreateFolderPopup, Topbar, UploadPopUp } from './components';
import { style } from 'twrnc';
import tw from '../../../tw';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../api/axiosInstance';
import { useFocusEffect } from '@react-navigation/native';


type MyFamilyScreenProps = NativeStackScreenProps<RootStackParamList, 'MyFamily'>

export const MyFamilyScreen = ({ navigation, route }: MyFamilyScreenProps) => {
    const [popupVisibility, setPopupVisibilty] = useState(false);
    const [createFolderPopupVisibility, setCreateFolderPopupVisibility] = useState(false);
    const { folderId, foldername, parentFolderId } = route.params;
    const [folders, setFolders] = useState<any>([]);
    const [media, setMedia] = useState<any>([]);
    const [activeTab, setAcitveTab] = useState('Folder');
    const [laoding, setLoading] = useState(true);



    const handleRouting = (buttonName) => {
        console.log(foldername);
        if(buttonName === "Media"){
            if(parentFolderId == null){
                navigation.navigate('CreateAlbum', {
                    folderId: folderId,
                    foldername: foldername,
                    parentFolderId: parentFolderId,
                });
            }
        } else if(buttonName === "Documents"){

        } else {

        }
    };


    // const get_folder_media = async () => {
    //     try {
    //         setLoading(true);
    //         const jsonValue = await AsyncStorage.getItem('userData'); // Replace 'userData' with your actual key
    //         if (jsonValue) {
    //             const parsedData = JSON.parse(jsonValue); // Parse the JSON string
    //             const id = parsedData.user_id;
    //             const session = parsedData.session.session_token;
    //             const getFolderData = {
    //                 'user_id': id,
    //                 'session_token': session,
    //                 'folder_id': folderId,
    //             };
    //             console.log('Media folder data', getFolderData);
    //             const res = await axiosInstance.post(
    //                 'folder/get_folder_media',
    //                 getFolderData,
    //                 {
    //                     headers: {
    //                         'Content-Type': 'application/x-www-form-urlencoded',
    //                     },
    //                 }
    //             );

    //             const { data } = res.data;
    //             console.log('Media', data);
    //             setMedia(data || []);
    //         }




    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };



    const get_folders = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userData'); // Replace 'userData' with your actual key
            if (jsonValue) {
                const parsedData = JSON.parse(jsonValue); // Parse the JSON string
                const id = parsedData.user_id;
                const session = parsedData.session.session_token;
                const getFolderData = {
                    'user_id': id,
                    'session_token': session,
                    'parent_folder_id': folderId,
                };
                console.log('getFolderData', getFolderData);

                const res = await axiosInstance.post(
                    'folder/get_folders',
                    getFolderData,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        timeout: 10000,
                    }
                );

                const { data } = res.data;
                setFolders(data || []);
                console.log('Folder Data', folders);
            }


        } catch (error) {
            console.log(error);
        }
    };

    // useFocusEffect(
    //     React.useCallback(() => {
    //         get_folders();
    //         get_folder_media(); // Fetch folders when the screen is focused
    //     }, [])
    // );

    return (
        <SafeAreaView>
            <Topbar title={foldername} />
            {/* <View>
                <View style={toggleStyle}>
                    <TouchableOpacity onPress={() => setAcitveTab('Folder')}>
                        <Text style={activeTab === 'Folder' ? activeTabStyle : inacitveTabStyle}>Folders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setAcitveTab('Media')}>
                        <Text style={activeTab === 'Media' ? activeTabStyle : inacitveTabStyle}>Media</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {activeTab === 'Folder' ? (
                <View style={ctrStyle}>
                    <Text>This is Folder Tab</Text>
                </View>
            ) : (
                <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
                    {
                        laoding ? (
                            <View style={tw`flex-1 justify-center items-center`}>
                                <ActivityIndicator size="large" color="#FFA500" />
                                <Text>Loading media...</Text>
                            </View>
                        ) : (
                            <View style={ctrStyle}>
                                {media.map((items, index) => {
                                    return (
                                        <TouchableOpacity key={index}>
                                            <View style={boxStyle}>
                                                <Image source={{ uri: items.url }} style={tw`w-20 h-20`} />
                                                <View style={tw`flex-row justify-between w-[90%] m-2`}>
                                                    <Text style={textStyle}>{items.media_name}</Text>
                                                    <Text style={textStyle}>{items.media_type}</Text>
                                                </View>
                                                <Text style={textStyle2}>{items.description}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })}

                            </View>
                        )
                    }

                </ScrollView>
            )}




            <View style={addBtnStyle}>
                <TouchableOpacity onPress={() => setCreateFolderPopupVisibility(true)} style={tw`justify-center items-center`}>
                    <Image source={require('../../assets/icons/folder-invoices.png')} style={tw`h-7 w-7`} />
                </TouchableOpacity>
                <CreateFolderPopup folderId={folderId} foldername={foldername} visible={createFolderPopupVisibility} onClose={() => setCreateFolderPopupVisibility(false)} />
            </View>
            <View style={addBtnStyle2}>
                <TouchableOpacity onPress={() => setPopupVisibilty(true)} style={tw`justify-center items-center`}>
                    <Text style={buttonTextStyle}>+</Text>
                </TouchableOpacity>
                <UploadPopUp folderId={folderId} foldername={foldername} visible={popupVisibility} onClose={() => setPopupVisibilty(false)} />
            </View> */}

            <View style={styles.row}>
                <TouchableOpacity style={styles.box} onPress={() => handleRouting('Media')}>
                    <Image source={require('../../assets/images/album.png')} style={styles.image} />
                    <Text style={styles.label}>Media</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box} onPress={() => handleRouting('Documents')}>
                    <Image source={require('../../assets/images/documents.png')} style={styles.image} />
                    <Text style={styles.label}>Documents</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity style={[styles.box, styles.singleBox]} onPress={() => handleRouting('Artifacts')}>
                    <Image source={require('../../assets/images/ArtifactForm.png')} style={styles.image} />
                    <Text style={styles.label}>Artifacts</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


const { width } = Dimensions.get('window');
const boxWidth = (width - 40) / 2;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f8f8',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10
    },
    box: {
        width: boxWidth,
        height: 150,
        backgroundColor: '#FFE3B0',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        shadowColor: 'rgba(0, 0, 0, 0.16)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
        // Box shadow for Android
        elevation: 4,
    },
    singleBox: {
        width: boxWidth,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
        objectFit: 'contain'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});

const ctrStyle = style(tw`flex flex-row flex-wrap justify-between items-center mt-5`);
const boxStyle = style(tw`h-35 w-35 bg-ternary rounded-lg flex justify-center items-center shadow-xl m-5`);
const textStyle = style(tw`text-txtSecondary text-sm font-semibold`);
const textStyle2 = style(tw`text-txtSecondary`);
const addBtnStyle = style(tw`bg-primary h-10 w-10 rounded-full shadow-xl justify-center absolute top-155 left-75`);
const addBtnStyle2 = style(tw`bg-primary h-10 w-10 rounded-full shadow-xl justify-center absolute top-140 left-75`);
const buttonTextStyle = style('text-4xl text-white font-semibold text-center');
const activeTabStyle = style(tw`text-primary underline text-xl font-semibold mx-5`);
const inacitveTabStyle = style(tw`text-txtSecondary text-xl font-semibold mx-5`);
const toggleStyle = style(tw`flex flex-row justify-evenly items-center w-100 mb-5 mt-10`);
