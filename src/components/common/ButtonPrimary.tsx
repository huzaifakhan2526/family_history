import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonPrimaryProps {
    title: string
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ title }) => {
    return (
        <TouchableOpacity style={styles.buttonStyle} >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#FFA500',
        padding: 5,
        borderRadius: 6,
        width: 100,
        shadowColor: '#565555',
        shadowOffset: {
            width: -2,
            height: 8,
        },
        shadowOpacity: 0,
        shadowRadius: 15,
        elevation: 16,
    },
    text: {
        color: '#ffffff',
        fontWeight: '700',
        fontFamily: 'popins',
        fontSize: 17,
        textAlign: 'center',
    },
},);

export default ButtonPrimary;
