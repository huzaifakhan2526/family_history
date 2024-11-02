import React from 'react';
import { StatusBar, Text, View, TouchableOpacity } from 'react-native';
import { style } from 'twrnc';
import tw from '../../../../tw';
import BackArrow from '../../../assets/icons/ep_back.svg';
import { useNavigation } from '@react-navigation/native';

interface TopbarProps{
    title : string,
}


const topbarStyle = style(tw`bg-primary h-35 rounded-b-custom-radius  flex flex-row items-center`);
const textStyle = style(tw`text-xl text-white font-bold text-center w-[80%]`);


export const Topbar: React.FC<TopbarProps> = ({title}) => {
    const navigation = useNavigation(); // Get the navigation prop
    const handleBackPress = () => {
        navigation.goBack()// Navigate to Main screen
    };
    return (
        <>
            <StatusBar backgroundColor="#FFA500" />
            <View style={topbarStyle}>
                <TouchableOpacity onPress={handleBackPress} style={tw`ml-2`}><BackArrow /></TouchableOpacity>
                <Text style={textStyle}>{title}</Text>
            </View>
        </>
    );
};
