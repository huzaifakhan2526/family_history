import React from 'react';
import { Image, View } from 'react-native';
import tw from 'twrnc';
// import { launchImageLibrary } from 'react-native-image-picker';


export default function ProfilePicker() {
    // const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // const pickImage = () => {
    //     let options = {
    //         storageOption: {
    //             path: 'image',
    //         },
    //     };

    //     launchImageLibrary(options, (response) => {
    //         if (response.assets && response.assets.length > 0) {
    //             setSelectedImage(response.assets[0].uri || '');
    //         }
    //         console.log(selectedImage);
    //     });
    // };

    return (
        <View style={tw`border border-yellow-300 h-[120px] w-[120px] rounded-full flex items-center justify-end`}>
            <Image source={require('../../assets/images/3135715.png')}  style={{ width: 120, height: 120, borderRadius: 25 }} />
            <View style={tw`absolute top-26`}>
                <Image source={require('../../assets/icons/Vector.png')} />
            </View>
        </View>
    );
}

