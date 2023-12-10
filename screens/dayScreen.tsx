import React, { Children, useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    FlatList,
    Pressable,
    Alert
} from 'react-native';
import { Tile, NewButton, PageContainer } from '../components'
import firestore from '@react-native-firebase/firestore';
import CheckBox from '@react-native-community/checkbox';

function DayHabit({ title, year, month, day }): JSX.Element {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const daysRef = firestore().collection('days');

    async function createOrUpdateDay(newValue: boolean) {
        const dayData = await daysRef
            .where('year', '==', year)
            .get().then(snapshot => {
                // The snapshot returned by `where().get()` does not have a `data()` reference since it returns multiple documents, it has `docs` property which is an array of all the documents matched
                snapshot.docs.forEach(doc => {
                    const docData = { ...doc.data(), id: doc.id };
                    console.log(docData);
                })
            })
        // Alert.alert("data", JSON.stringify(dayData))

        // await daysRef.add({
        //     title: title,
        //     complete: newValue,
        //     year: year,
        //     month: month,
        //     day: day
        // });
    }

    async function updateDay(newValue: boolean) {
        await daysRef.add({
            title: title,
            complete: newValue,
            year: year,
            month: month,
            day: day
        });
    }

    function handleTogglePress(newValue: boolean) {
        createOrUpdateDay(newValue)
        setToggleCheckBox(newValue);
        // if (newValue == true) {
        //     createOrUpdateDay(newValue)
        //     setToggleCheckBox(newValue);
        // } else if (newValue == false) {
        //     updateDay(newValue)
        //     setToggleCheckBox(newValue);
        // }
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
    const { year, month, day, userId } = route.params;
    const backgroundStyle = {
        backgroundColor: '#000',
    };

    const [habits, setHabits] = useState([]);

    const habitRef = firestore().collection('habits');

    useEffect(() => {
        habitRef
            .where('userId', '==', userId.toString())
            .get().then(querySnapshot => {
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
                            renderItem={({ item }) => <DayHabit title={item.title} year={year} month={month} day={day} />}
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
