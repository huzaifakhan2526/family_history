import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

interface ButtonSecondaryProps{
    title : string
}


const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({title}) => {
  return (
    <TouchableOpacity style={tw`bg-[#BF7C00] px-2 py-1 rounded-lg`}>
        <Text style={tw`text-white font-semibold text-sm  text-center`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonSecondary;
