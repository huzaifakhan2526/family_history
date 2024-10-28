import { Image, StatusBar, Text, View } from 'react-native';
import React from 'react';
import tw from '../../../../tw';
import NotificationBell from '../../../assets/icons/gravity-ui_bell-dot.svg';

export const Heading = () => {
    return (
        <View style={tw`bg-primary h-35 rounded-b-custom-radius`}>
             <StatusBar backgroundColor="#FFA500" />
            <View style={tw`flex items-center justify-end flex-row pr-1 pt-1`}>
                <View style={tw`bg-white mr-3 w-10 h-10 rounded-full flex items-center justify-center shadow-xl`}>
                    <NotificationBell />
                </View>
                <View>
                    <Image source={require('../../../assets/images/profile-img-102.png')} />
                </View>
            </View>
            <View style={tw`flex items-center justify-start absolute top-15`}>
                <Text style={tw`text-xl font-semibold text-txtPrimary leading-8`}>Welcome{'\n'}Mr Rahul</Text>
                <Image source={require('../../../assets/images/memoirly.png')}/>
            </View>
        </View>
    );
};

