import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
    Pressable
} from 'react-native';
import { PageContainer } from '../components'
import firestore from '@react-native-firebase/firestore';

function HabitsScreen(): JSX.Element {
    const backgroundStyle = {
        backgroundColor: '#000',
    };
    const [newHabit, setNewHabit] = useState('');

    const ref = firestore().collection('habits');

    async function addHabit() {
        await ref.add({
            title: newHabit,
            complete: false,
        });
        setNewHabit('');
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                <PageContainer>
                    <View>
                        <Text style={styles.textStyle}>Current Habits:</Text>
                    </View>
                    <View>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={text => setNewHabit(text)}
                            placeholder="Add a new habit"
                            placeholderTextColor='#A1A1AA'
                            value={newHabit}
                        />
                        <Pressable style={styles.buttonStyle} onPress={() => addHabit()}>
                            <Text style={styles.buttonTextStyle}>Add</Text>
                        </Pressable>
                    </View>
                </PageContainer>
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#fff',
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

export default HabitsScreen;
