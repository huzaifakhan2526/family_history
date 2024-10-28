import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { style } from 'twrnc';
import tw from '../../../../tw';
import Camera from '../../../assets/icons/camera.svg';
import { launchImageLibrary } from 'react-native-image-picker';


export const ProfilePicker = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const pickImage = () => {
        let options = {
            storageOption: {
                path: 'image',
            },
        };

        launchImageLibrary(options, (response) => {
            if (response.assets && response.assets.length > 0) {
                setSelectedImage(response.assets[0].uri || '');
            }
            console.log(selectedImage);
        });
    };

    return (
        <View style={boxStyle}>
            {/* <Image source={require('../../../assets/images/img-105.png')}  style={imgStyle} /> */}
            <TouchableOpacity onPress={pickImage}>
                <View style={boxStyle2}>
                    <Camera />
                </View>
            </TouchableOpacity>
        </View>
    );
};


const boxStyle = style(tw`h-30 w-30 rounded-full bg-white`);
const boxStyle2 = style(tw`absolute top-27 left-12`);
const imgStyle = style(tw`w-30 h-30 rounded-full`);


