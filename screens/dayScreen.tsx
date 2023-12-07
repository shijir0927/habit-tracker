import React, { Children, useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    FlatList,
    Pressable
} from 'react-native';
import { Tile, NewButton, PageContainer } from '../components'
import firestore from '@react-native-firebase/firestore';
import CheckBox from '@react-native-community/checkbox';

function DayHabit({ title }): JSX.Element {

    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    function handleTogglePress(newValue) {
        setToggleCheckBox(newValue);
    }

    return (
        <View style={styles.dayHabitContainer}>
            <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => handleTogglePress(newValue)}
                onAnimationType={'bounce'}
                offAnimationType={'bounce'}
                animationDuration={0.2}
                style={{ width: 24, height: 24, margin: 2 }}
                lineWidth={3}
            />
            <Text style={styles.textStyle}>{title}</Text>
        </View>
    )
}

function ProgressBar({ progress }): JSX.Element {
    return (
        <View style={styles.progressContainer}>
            <View style={{ width: `${progress}%`, ...styles.progress }}></View>
        </View>
    )
}

function DayScreen({ route, navigation }): JSX.Element {
    const { year, month, day } = route.params;
    const backgroundStyle = {
        backgroundColor: '#000',
    };

    const [habits, setHabits] = useState([]);

    const habitRef = firestore().collection('habits');

    // async function addHabit() {
    //     await ref.add({
    //         title: newHabit,
    //         complete: false,
    //     });
    //     setNewHabit('');
    // }

    useEffect(() => {
        return habitRef.onSnapshot(querySnapshot => {
            const list = [];
            querySnapshot.forEach(doc => {
                const { title } = doc.data();
                list.push({
                    id: doc.id,
                    title: title
                });
            });

            setHabits(list);
        });
    }, []);

    // async function deleteHabit() {
    //     await firestore()
    //         .collection('habits')
    //         .doc(id)
    //         .delete()
    //         .then(() => {
    //             console.log('Habit deleted!');
    //         });
    // }

    return (
        <SafeAreaView style={backgroundStyle}>
            <PageContainer>
                <View>
                    <Text style={styles.headerStyle}>{month}/{day}</Text>
                    <ProgressBar progress={90} />
                    <View style={{ marginTop: 24 }}>
                        <FlatList
                            style={{}}
                            data={habits}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => <DayHabit title={item.title} />}
                        />
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500'
    },
    headerStyle: {
        color: '#fff',
        fontSize: 32,
        fontWeight: '600'
    },
    dayHabitContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 8,
        marginBottom: 12
    },
    progressContainer: {
        height: 10,
        backgroundColor: '#3F3F46',
        borderRadius: 12,
        marginTop: 24
    },
    progress: {
        height: 10,
        backgroundColor: '#7C3AED',
        borderRadius: 12
    }
});

export default DayScreen;
