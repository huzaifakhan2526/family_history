import React from 'react';
import { Image, Text, View } from 'react-native';
import tw from 'twrnc';


export default function Navbar() {
    return (
        <View style={tw`bg-[#FFA500] h-35 rounded-b-2xl`}>
            <View style={tw`flex flex-row justify-end items-center pr-3 pt-1`}>
                <View style={tw`bg-white h-10 w-10 rounded-full flex items-center justify-center`}>
                    <Image source={require('../../assets/images/gravity-ui_bell-dot.png')} />
                </View>
                <View style={tw`h-15 w-15 rounded-full flex items-center justify-center ml-2`}>
                    <Image source={require('../../assets/images/3135715.png')} style={{ width: 55, height: 55 }} />
                </View>
            </View>
            <View style={tw`pl-3`}>
                <Text style={tw`text-white text-2xl`}>Welcome{'\n'} Mr Rahul{'\n'}<Text>memoirly</Text></Text>
            </View>
        </View>
    );
}
