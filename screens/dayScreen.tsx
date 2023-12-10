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

function DayHabit({ title, year, month, day, userId, completed, handleProgressBar }): JSX.Element {
    const [toggleCheckBox, setToggleCheckBox] = useState(completed)

    const daysRef = firestore().collection('days');

    async function createOrUpdateDay(newValue: boolean) {
        const dayData = await daysRef
            .where('year', '==', year)
            .where('month', '==', month)
            .where('day', '==', day)
            .where('title', '==', title)
            .where('userId', '==', userId)
            .get().then(snapshot => {
                return snapshot.docs
            })

        if (dayData.length === 0) {
            //create a day document
            await daysRef.add({
                title: title,
                year: year,
                month: month,
                day: day,
                userId: userId,
                completed: newValue
            });
        } else {
            //update the day document
            await daysRef.doc(dayData[0].id).update({ "completed": newValue })
        }

    }

    function handleTogglePress(newValue: boolean) {
        createOrUpdateDay(newValue)
        setToggleCheckBox(newValue);
        handleProgressBar(newValue);
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
    const [progress, setProgress] = useState(0);
    const [allHabitsCount, setAllHabitsCount] = useState(0);
    const [completedHabitsCount, setCompletedHabitsCount] = useState(0);

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
                        title: title,
                        completed: true
                    });
                });

                setHabits(list);
                let allHabitsCount = list.length;
                let completedHabitsCount = list.filter((item) => item.completed == true).length
                let initialProgress = (completedHabitsCount / allHabitsCount) * 100;
                setAllHabitsCount(allHabitsCount);
                setCompletedHabitsCount(completedHabitsCount);
                setProgress(initialProgress);
            });
    }, []);

    const handleProgressBar = (newValue) => {
        if (newValue == true) {
            setCompletedHabitsCount((count) => count + 1);
            setProgress(((completedHabitsCount + 1) / allHabitsCount) * 100);
        } else {
            setCompletedHabitsCount((count) => count - 1);
            setProgress(((completedHabitsCount - 1) / allHabitsCount) * 100);
        }
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <PageContainer>
                <View>
                    <Text style={styles.headerStyle}>{month}/{day}</Text>
                    <ProgressBar progress={progress} />
                    <View style={{ marginTop: 24 }}>
                        <FlatList
                            style={{}}
                            data={habits}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) =>
                                <DayHabit title={item.title}
                                    year={year}
                                    month={month}
                                    day={day}
                                    userId={userId}
                                    completed={item.completed}
                                    handleProgressBar={(newValue) => handleProgressBar(newValue)}
                                />}
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
