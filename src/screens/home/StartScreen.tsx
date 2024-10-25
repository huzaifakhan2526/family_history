import React from 'react';
import {  Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ButtonPrimary } from '../../components/common';


export default function StartScreen() {
    return (
        <SafeAreaView style={styles.safearea}>
            <Image source={require('../../assets/images/StartScreenImg101.png')}/>
            <View style={styles.container}>
                <Text style={styles.text}>Welcome Your personal space to store, organize, and cherish all your
                    family photos, documents, and memories in one secure place. Start preserving your
                    family history today!"
                </Text>
                <View style={styles.container2}><ButtonPrimary title={'Next'} /></View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safearea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        paddingHorizontal: 42,
    },
    text: {
        fontSize: 17,
        fontWeight: '700',
        fontFamily: 'popins',
        lineHeight: 34,
        textAlign: 'center',
        marginTop: 62,
        color: '#121212',
    },
    container2: {
        width: '100%',
        marginTop: 62,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});
