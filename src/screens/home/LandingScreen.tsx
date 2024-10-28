import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Navbar from '../../components/common/Navbar';
import tw from 'twrnc';
import FolderDesign from '../../assets/icons/folderdesign.svg';
import Invite from '../../assets/icons/mdi_invite.svg';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type LandingScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>

export const LandingScreen = ({navigation} : LandingScreenProps) => {

    return (
        <SafeAreaView style={tw`flex-1`}>
            <Navbar />
            <View style={tw`mx-3 flex-1`}>
                <View style={tw`w-30 mt-6 mb-10`}>
                    <TouchableOpacity style={tw`bg-[#BF7C00] px-2 py-1 rounded-lg shadow-xl`} onPress={() => navigation.navigate('CreateFolder')}>
                        <Text style={tw`text-white font-semibold text-sm  text-center`}>
                            + Add new folder
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={tw`pb-10`}>
                    <View style={tw`bg-[#FFF6E6] rounded-lg h-43 px-2 pt-3 mb-5 shadow-xl`}>
                        <Text style={tw`text-2xl text-[#FFA500] font-semibold`}>My Family</Text>
                        <TouchableOpacity style={tw`bg-[#FFA500] py-1 rounded-lg w-20 mt-2 mb-15`}>
                            <Text style={tw`text-white font-semibold text-sm text-center`}>Owner</Text>
                        </TouchableOpacity>
                        <View style={tw`flex flex-row justify-between`}>
                            <TouchableOpacity style={tw`bg-[#FFFFFF] px-1 py-1 rounded-lg w-20`} onPress={() => navigation.navigate('MyFamily')}>
                                <Text style={tw`text-[#BF7C00] font-semibold text-lg text-center`}>View</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={tw`bg-[#BF7C00] px-1 py-1 px-2 rounded-lg w-20 relative z-1 flex-row items-center justify-between`}>
                                <Invite />
                                <Text style={tw`text-white font-semibold text-lg text-center`}>Invite</Text>
                            </TouchableOpacity>
                        </View>
                        <FolderDesign style={tw`absolute left-50 top-5 z-0`} />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

