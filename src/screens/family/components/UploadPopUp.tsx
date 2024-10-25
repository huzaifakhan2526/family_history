import React from 'react';
import { Image, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { style } from 'twrnc';
import tw from '../../../../tw';


const inputTextStyle = style('text-lg font-semibold text-black mt-3 mb-2');
const textStyle2 = style(tw`text-txtSecondary text-center font-semibold mt-2`);
const boxStyle = style(tw`bg-secondary p-5 justify-center items-center shadow-xl rounded-lg`);
const boxStyle2 = style(tw`border border-2 border-primary border-dashed rounded-lg items-center py-3 w-80`);
const buttonStyle = style('bg-[#FFA500] w-50 py-1 rounded-lg shadow-xl mb-5');
const buttonTextStyle = style('text-lg text-white font-bold text-center');
const noteBoxStyle = style(tw`border rounded-lg p-2 h-20 mb-20 w-80`);
const boxStyle3 = style(tw`flex items-center justify-center`);


export const UploadPopUp = ({ visible, onClose }) => {
    return (
      <Modal visible={visible} transparent={true} animationType="fade">
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onPress={onClose}
          activeOpacity={1}
        >
          <View style={[boxStyle, { alignSelf: 'center', padding: 20 }]}>
            <Text style={inputTextStyle}>Upload Photos</Text>
            <View style={boxStyle2}>
              <Image source={require('../../../assets/icons/ph_camera-fill.png')} />
              <Text style={textStyle2}>Upload from cloud or gallery</Text>
            </View>
            <Text style={inputTextStyle}>Add a note?</Text>
            <TextInput placeholder="Add a note" style={noteBoxStyle} />
            <View style={boxStyle3}>
              <TouchableOpacity style={buttonStyle}>
                <Text style={buttonTextStyle}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
  
