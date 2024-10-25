import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { style } from 'twrnc';
import tw from '../../../../tw';
import BackArrow from '../../../assets/icons/ep_back.svg';

interface TopbarProps{
    title : string,
}


const topbarStyle = style(tw`bg-primary h-25 rounded-b-custom-radius  flex flex-row items-center`);
const textStyle = style(tw`text-xl text-white font-bold text-center w-[80%]`);


export const Topbar: React.FC<TopbarProps> = ({title}) => {
    return (
        <>
            <StatusBar backgroundColor="#FFA500" />
            <View style={topbarStyle}>
                <View style={tw`ml-2`}><BackArrow /></View>
                <Text style={textStyle}>{title}</Text>
            </View>
        </>
    );
};
