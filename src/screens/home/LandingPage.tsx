import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Navbar from '../../components/common/Navbar';
import ButtonSecondary from '../../components/common/ButtonSecondary';
import tw from 'twrnc';
// import { ButtonPrimary } from '../../components/common';

export default function LandingPage() {
    return (
        <SafeAreaView style={tw`flex-1`}>
            <Navbar />
            <View style={tw`mx-3 flex-1`}>
                <View style={tw`w-30 mt-6 mb-10`}>
                    <ButtonSecondary title={'+ Add new folder'} />
                </View>
                <ScrollView contentContainerStyle={tw`pb-10`}>
                    <View style={tw`bg-[#FFF6E6] rounded-lg h-43 px-2 pt-3 mb-5`}>
                        <Text style={tw`text-2xl text-[#FFA500] font-semibold`}>My Family</Text>
                        <TouchableOpacity style={tw`bg-[#FFA500] py-1 rounded-lg w-20 mt-2 mb-15`}>
                            <Text style={tw`text-white font-semibold text-sm text-center`}>Owner</Text>
                        </TouchableOpacity>
                        <View style={tw`flex flex-row justify-between`}>
                            <TouchableOpacity style={tw`bg-[#FFFFFF] px-1 py-1 rounded-lg w-20`}>
                                <Text style={tw`text-[#BF7C00] font-semibold text-lg text-center`}>View</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={tw`bg-[#BF7C00] px-1 py-1 rounded-lg w-20`}>
                                <Text style={tw`text-white font-semibold text-lg text-center`}>Invite</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={tw`bg-[#FFF6E6] rounded-lg h-43 px-2 pt-3 mb-5`}>
                        <Text style={tw`text-2xl text-[#FFA500] font-semibold`}>My Family</Text>
                        <TouchableOpacity style={tw`bg-[#FFA500] py-1 rounded-lg w-20 mt-2 mb-15`}>
                            <Text style={tw`text-white font-semibold text-sm text-center`}>Owner</Text>
                        </TouchableOpacity>
                        <View style={tw`flex flex-row justify-between`}>
                            <TouchableOpacity style={tw`bg-[#FFFFFF] px-1 py-1 rounded-lg w-20`}>
                                <Text style={tw`text-[#BF7C00] font-semibold text-lg text-center`}>View</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={tw`bg-[#BF7C00] px-1 py-1 rounded-lg w-20`}>
                                <Text style={tw`text-white font-semibold text-lg text-center`}>Invite</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={tw`bg-[#FFF6E6] rounded-lg h-43 px-2 pt-3 mb-5`}>
                        <Text style={tw`text-2xl text-[#FFA500] font-semibold`}>My Family</Text>
                        <TouchableOpacity style={tw`bg-[#FFA500] py-1 rounded-lg w-20 mt-2 mb-15`}>
                            <Text style={tw`text-white font-semibold text-sm text-center`}>Owner</Text>
                        </TouchableOpacity>
                        <View style={tw`flex flex-row justify-between`}>
                            <TouchableOpacity style={tw`bg-[#FFFFFF] px-1 py-1 rounded-lg w-20`}>
                                <Text style={tw`text-[#BF7C00] font-semibold text-lg text-center`}>View</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={tw`bg-[#BF7C00] px-1 py-1 rounded-lg w-20`}>
                                <Text style={tw`text-white font-semibold text-lg text-center`}>Invite</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>

    );
}
