import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
    Pressable,
    FlatList
} from 'react-native';
import { PageContainer, Habit } from '../components'
import firestore from '@react-native-firebase/firestore';

function SettingsScreen({ route, navigation }): JSX.Element {
    const backgroundStyle = {
        backgroundColor: '#000',
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <PageContainer>
                <View>
                    <Text style={styles.currentHabits}>Setting</Text>
                </View>
            </PageContainer>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#fff',
    },
    currentHabits: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 24
    },
    buttonTextStyle: {
        color: '#fff',
        textAlign: 'center'
    },
    inputStyle: {
        borderColor: '#27272A',
        borderWidth: 2,
        borderRadius: 8,
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 16,
        paddingLeft: 16,
        backgroundColor: '#18181B',
        marginTop: 32,
        color: '#fff'
    },
    buttonStyle: {
        backgroundColor: '#16A34A',
        borderRadius: 8,
        paddingTop: 12,
        paddingBottom: 12,
        paddingRight: 16,
        paddingLeft: 16,
        marginTop: 16,
        display: 'flex',
        justifyContent: 'center'
    },
});

export default SettingsScreen;
