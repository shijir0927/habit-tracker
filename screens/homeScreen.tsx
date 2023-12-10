import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Pressable,
    Alert,
    FlatList,
    Dimensions,
    Button
} from 'react-native';
import calendar from 'calendar-js';
import { Tile, NewButton, PageContainer } from '../components'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

function HomeScreen({ navigation, handleSignOutPress }): JSX.Element {
    const backgroundStyle = {
        backgroundColor: '#000',
    };
    const screenWidth = Dimensions.get("window").width;
    const numOfColumns = 7;
    const tileSize = (screenWidth - 64 - 56) / numOfColumns;

    const today = new Date();

    const [month, setMonth] = useState(today.getMonth() + 1)
    const [year, setYear] = useState(today.getFullYear())

    const handlePrevMonth = () => {
        if (month == 1) {
            setMonth(12);
            setYear(year => year - 1);
        } else {
            setMonth(currentMonth => currentMonth - 1)
        }
    }

    const handleNextMonth = () => {
        if (month == 12) {
            setMonth(1);
            setYear(year => year + 1);
        } else {
            setMonth(currentMonth => currentMonth + 1)
        }
    }

    const getNumberOfDays = (year: number, month: number) => {
        return calendar().of(year, month).days
    }

    const getCalendarData = () => {
        let data = [];
        for (let i = 1; i <= getNumberOfDays(year, month - 1); i++) {
            data.push({ year: year, month: month, day: i })
        }

        let firstWeekday = calendar().of(year, month - 1).firstWeekday

        for (let i = 1; i < firstWeekday; i++) {
            data.unshift({ year: 0, month: 0, day: 0 })
        }

        return data;
    }

    const renderItem = ({ item }) => {
        let color = '#A78BFA';

        if (item.year == 0 && item.month == 0 && item.day == 0) {
            color = '#18181B';
        }

        return (
            <Tile color={color}
                size={tileSize}
                isToday={today.getFullYear() == item.year && today.getMonth() + 1 == item.month && today.getDate() == item.day}
                handlePress={() => navigation.navigate('Day', {
                    year: year,
                    month: month,
                    day: item.day
                })} />
        );
    };

    const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            auth()
                .signOut()
                .then(() => Alert.alert('Your are signed out!'));
            handleSignOutPress();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <PageContainer>
                <View style={styles.headerContainer}>
                    <View>
                        <View style={styles.headerTiles}>
                            <Tile color={'#18181B'} handlePress={() => null} size={20} />
                            <Tile color={'#4C1D95'} handlePress={() => null} size={20} />
                            <Tile color={'#5B21B6'} handlePress={() => null} size={20} />
                            <Tile color={'#6D28D9'} handlePress={() => null} size={20} />
                            <Tile color={'#7C3AED'} handlePress={() => null} size={20} />
                            <Tile color={'#8B5CF6'} handlePress={() => null} size={20} />
                        </View>
                        <Text style={styles.headerTextStyle}>habits</Text>
                        <Button
                            onPress={() => signOut()}
                            title="LogOut"
                            color="red"
                        />
                    </View>

                    <NewButton handlePress={() => navigation.navigate('Habits')} />
                </View>

                <View style={styles.calendarContainer}>
                    <View style={styles.calendarNav}>
                        <Pressable onPress={() => handlePrevMonth()}>
                            <Text style={styles.textStyle}>{"<"}</Text>
                        </Pressable>
                        <Text style={styles.textStyle}>{month} {year}</Text>
                        <Pressable onPress={() => handleNextMonth()}>
                            <Text style={styles.textStyle}>{">"}</Text>
                        </Pressable>
                    </View>
                    <View style={styles.calendarWrapper}>
                        <View style={styles.calendarDayContainer}>
                            {DAYS.map((day) => {
                                return (
                                    <View style={{ width: tileSize, height: tileSize, ...styles.calendarDayWrapper }}>
                                        <Text style={styles.calendarDay}>{day}</Text>
                                    </View>
                                )
                            })}
                        </View>
                        <FlatList
                            data={getCalendarData()}
                            renderItem={renderItem}
                            keyExtractor={item => item.day}
                            numColumns={7}
                            key={7}
                        />
                    </View>
                </View>
            </PageContainer>
        </>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#fff',
        fontFamily: 'Inter-Medium',
        fontSize: 16
    },
    headerTextStyle: {
        color: '#fff',
        fontFamily: 'Inter-ExtraBold',
        fontSize: 32
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    calendarContainer: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    calendarNav: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8
    },
    calendarWrapper: {
        marginTop: 24,
    },
    headerTiles: {
        display: 'flex',
        flexDirection: 'row',
        gap: 2
    },
    calendarDayContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    calendarDay: {
        color: '#A1A1AA',
        fontSize: 24
    },
    calendarDayWrapper: {
        marginRight: 8,
        marginBottom: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default HomeScreen;
