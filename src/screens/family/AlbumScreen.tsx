import React from 'react';
import {  Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Topbar } from './components';
import { style } from 'twrnc';
import tw from '../../../tw';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type AlbumScreenProps = NativeStackScreenProps<RootStackParamList, 'AlbumsDetail'>

const albumNameStyle = style(tw`text-txtSecondary text-xl font-semibold mt-2`);
const albumStyle = style(tw`items-center w-100 my-5`);
const boxShadow = style(tw`shadow-lg`);
const ablumImageStyle = style(tw`h-30 w-30 rounded-full shadow-xl`);
const ctrStyle = style(tw`flex flex-row flex-wrap justify-between items-center`);
const boxStyle = style(tw`h-35 w-35 bg-card rounded-sm flex justify-center items-center shadow-xl m-5`);
const textStyle = style(tw`text-txtSecondary text-xs font-semibold m-1`);
const imgStyle = style(tw`w-[100%] h-26 rounded-t-sm`);

export const AlbumScreen = ({ navigation }: AlbumScreenProps) => {
    return (
        <SafeAreaView>
            <Topbar title="Images" />
            <View style={albumStyle}>
                <View style={boxShadow}>
                    <Image source={require('../../assets/images/profile101.jpg')} style={ablumImageStyle} />
                </View>
                <Text style={albumNameStyle}>Goa Trip</Text>
            </View>
            <Text style={textStyle}>Date - 7 Sep 24</Text>
            <View style={ctrStyle}>
                <TouchableOpacity onPress={() => navigation.navigate('Image')}>
                    <View style={boxStyle}>
                        <Image source={require('../../assets/images/img-105.png')} style={imgStyle} />
                        <Text style={textStyle}>Reviving the  memory of our first family  goa trip. so many memory related to that day.</Text>
                    </View>
                </TouchableOpacity>

                <View style={boxStyle}>
                    <Image source={require('../../assets/images/img-105.png')} style={imgStyle} />
                    <Text style={textStyle}>Reviving the  memory of our first family  goa trip. so many memory related to that day.</Text>
                </View>
                <View style={boxStyle}>
                    <Image source={require('../../assets/images/img-105.png')} style={imgStyle} />
                    <Text style={textStyle}>Reviving the  memory of our first family  goa trip. so many memory related to that day.</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};
