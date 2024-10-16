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

function HabitsScreen({ route, navigation }): JSX.Element {
    const { userId } = route.params;
    const backgroundStyle = {
        backgroundColor: '#000',
    };
    const [newHabit, setNewHabit] = useState('');
    const [loading, setLoading] = useState(true);
    const [habits, setHabits] = useState([]);

    const ref = firestore().collection('habits');

    async function addHabit() {
        await ref.add({
            title: newHabit,
            userId: userId
        });
        setNewHabit('');
    }

    useEffect(() => {
        ref
            .where('userId', '==', userId.toString())
            .get()
            .then(querySnapshot => {
                const list = [];
                querySnapshot.forEach(doc => {
                    const { title } = doc.data();
                    list.push({
                        id: doc.id,
                        title: title
                    });
                });

                setHabits(list);

                if (loading) {
                    setLoading(false);
                }
            });
    }, [habits]);

    return (
        <SafeAreaView style={backgroundStyle}>
            <PageContainer>
                <View>
                    <Text style={styles.currentHabits}>Current Habits:</Text>
                    <FlatList
                        style={{}}
                        data={habits}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <Habit title={item.title} id={item.id} />}
                    />
                </View>
                <View>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={text => setNewHabit(text)}
                        placeholder="What do you want to do everyday?"
                        placeholderTextColor='#A1A1AA'
                        value={newHabit}
                    />
                    <Pressable style={styles.buttonStyle} onPress={() => addHabit()}>
                        <Text style={styles.buttonTextStyle}>Add</Text>
                    </Pressable>
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
        marginBottom: 24,
        fontFamily: 'Manrope-Medium'
    },
    buttonTextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 14,
        fontFamily: 'Manrope-Extrabold'
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
        color: '#fff',
        fontFamily: 'Manrope-Medium'
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
