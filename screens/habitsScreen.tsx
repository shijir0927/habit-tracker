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
import { firebase } from '../src/firebase/config';
import { getDatabase, ref, child, get } from "firebase/database";

function HabitsScreen(): JSX.Element {
    const backgroundStyle = {
        backgroundColor: '#000',
    };

    const habitRef = firebase.firestore().collection('habits');

    const [newHabit, setNewHabit] = useState('');

    const dbRef = ref(getDatabase());


    const onAddButtonPress = () => {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
            habit: 'drink water',
            createdAt: timestamp,
        };
        habitRef
            .add(data)
            .then(_doc => {
                setNewHabit('')
            })
            .catch((error) => {
                Alert.alert("title", error);
            });
    }

    const test = () => {
        console.log("starteddddddd")
        get(child(dbRef, `habits/1`)).then((snapshot) => {
            if (snapshot.exists()) {
                Alert.alert("data: ", snapshot.val());
            } else {
                Alert.alert("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
        console.log("endedddddd")
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
                        />
                        <Pressable style={styles.buttonStyle} onPress={test}>
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
