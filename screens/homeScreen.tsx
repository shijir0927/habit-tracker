import React, { useState, useEffect } from 'react';
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
    Button,
    TouchableOpacity
} from 'react-native';
import calendar from 'calendar-js';
import { Tile, NewButton, PageContainer } from '../components'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import COLOR_MAP from '../constants/color_map';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'

function HomeScreen({ navigation }): JSX.Element {
    const backgroundStyle = {
        backgroundColor: '#000',
    };
    const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
    const today = new Date();

    const screenWidth = Dimensions.get("window").width;
    const numOfColumns = 7;
    const tileSize = (screenWidth - 64 - 56) / numOfColumns;


    const [month, setMonth] = useState(today.getMonth() + 1)
    const [year, setYear] = useState(today.getFullYear())
    const [loggedIn, setLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [calendarData, setCalendarData] = useState([]);

    const dayRef = firestore().collection('days');

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

    const getCalendarData = async () => {
        setIsLoading(true);
        let data = [];
        for (let i = 1; i <= getNumberOfDays(year, month - 1); i++) {
            let color = await calculateColor({ year: year, month: month, day: i })
            data.push({ year: year, month: month, day: i, color: color })
        }

        let firstWeekday = calendar().of(year, month - 1).firstWeekday

        for (let i = 1; i < firstWeekday; i++) {
            data.unshift({ year: 0, month: 0, day: 0 })
        }
        setCalendarData(data)
        setIsLoading(false);
        return data;
    }

    const get_percentage_of_completed_habits = async (item) => {
        return new Promise<number>(async (resolve, reject) => {
            let percent = 0;
            const daysSnapshot = await dayRef.where('userId', '==', userInfo.id)
                .where('year', '==', item.year)
                .where('month', '==', item.month)
                .where('day', '==', item.day)
                .get()

            if (daysSnapshot.docs !== undefined && daysSnapshot.docs.length > 0) {
                percent = (daysSnapshot.docs.map((record) => record.data().completed).filter((x) => x == true).length * 100) / 10
            }
            resolve(percent)
        });
    }

    const calculateColor = async (item) => {
        let color = COLOR_MAP["0"]

        if (item.year != 0 && item.month != 0 && item.day != 0) {
            let percentage_of_completed_habits = await get_percentage_of_completed_habits(item);
            if (percentage_of_completed_habits > 0 && percentage_of_completed_habits < 20) {
                percentage_of_completed_habits = 20;
            } else if (percentage_of_completed_habits > 20 && percentage_of_completed_habits < 40) {
                percentage_of_completed_habits = 40;
            } else if (percentage_of_completed_habits > 40 && percentage_of_completed_habits < 60) {
                percentage_of_completed_habits = 60;
            } else if (percentage_of_completed_habits > 60 && percentage_of_completed_habits < 80) {
                percentage_of_completed_habits = 80;
            } else if (percentage_of_completed_habits > 80) {
                percentage_of_completed_habits = 100;
            }
            color = COLOR_MAP[percentage_of_completed_habits]
        }

        return color
    }

    const renderItem = ({ item }) => {
        return (
            <Tile color={item.color}
                size={tileSize}
                isToday={today.getFullYear() == item.year && today.getMonth() + 1 == item.month && today.getDate() == item.day}
                handlePress={() => navigation.navigate('Day', {
                    year: year,
                    month: month,
                    day: item.day,
                    userId: userInfo.id
                })} />
        );
    };

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            const { accessToken, idToken, user } = response;
            setUserInfo(user);
            setLoggedIn(true);
            const credential = auth.GoogleAuthProvider.credential(
                idToken,
                accessToken,
            );
            await auth().signInWithCredential(credential);
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                Alert.alert('Cancel');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                Alert.alert('Signin in progress');
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
                // play services not available or outdated
            } else {
                // some other error happened
                console.log(error);
            }
        }
    };

    const handleLogOutPress = () => {
        Alert.alert(
            'Are you sure you want to log out?',
            '',
            [
                { text: 'Yes', onPress: () => signOut() },
                { text: 'No', onPress: () => console.log('No pressed') }
            ],
            { cancelable: false },
        );
    }

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            auth()
                .signOut()
                .then(() => console.log('Your are signed out!'));
            setLoggedIn(false);
            setUserInfo({});
        } catch (error) {
            console.error(error);
        }
    };

    const getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently()
            setUserInfo(userInfo.user)
            setLoggedIn(true)
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                setLoggedIn(false)
            } else {
                Alert.alert('There was an error loggin in: ', error.toString())
                setLoggedIn(false)
            }
        }
    }

    useEffect(() => {
        GoogleSignin.configure({
            webClientId://TODO move this to .env file
                '985723193964-0iqbolfe82pkudeedm0k986mc6v7c4tj.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });

        if (!loggedIn) {
            getCurrentUserInfo();
        } else {
            getCalendarData();
        }
    }, [year, month, loggedIn]);

    return (
        <>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <PageContainer>
                {!loggedIn && (<>
                    <View style={styles.signInContainer}>
                        <Text style={styles.logo}>Habits</Text>
                        <Pressable style={styles.signInButtonContainer} onPress={() => signIn()}>
                            <AntDesignIcon name='google' size={16} color={'white'} />
                            <Text style={styles.signInText}>SIGN IN WITH GOOGLE</Text>
                        </Pressable>
                    </View>
                </>)}
                {loggedIn && (
                    <View style={styles.wrapperStyle}>
                        <View>
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
                                </View>

                                <NewButton handlePress={() => navigation.navigate('Habits', { userId: userInfo.id })} />
                            </View>

                            <View style={styles.calendarContainer}>
                                <View style={styles.calendarNav}>
                                    <TouchableOpacity onPress={() => handlePrevMonth()}>
                                        <AntDesignIcon name="left" color={'#fff'} size={20} />
                                    </TouchableOpacity>
                                    <Text style={styles.textStyle}>{calendar().of(year, month - 1).month} {year} </Text>
                                    <TouchableOpacity onPress={() => handleNextMonth()}>
                                        <AntDesignIcon name="right" color={'#fff'} size={20} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.calendarWrapper}>
                                    <View style={styles.calendarDayContainer}>
                                        {DAYS.map((day, index) => {
                                            return (
                                                <View key={index} style={{ width: tileSize, height: tileSize, ...styles.calendarDayWrapper }}>
                                                    <Text style={styles.calendarDay}>{day}</Text>
                                                </View>
                                            )
                                        })}
                                    </View>
                                    {isLoading && <View><Text style={styles.textStyle}>Loading....</Text></View>}
                                    {!isLoading && calendarData && (
                                        <FlatList
                                            data={calendarData}
                                            renderItem={renderItem}
                                            keyExtractor={item => item.day}
                                            numColumns={7}
                                            key={7}
                                            style={styles.calenderFlatListContainer}
                                        />
                                    )}

                                </View>
                            </View>
                        </View>
                        <View style={styles.logOutContainer}>
                            <TouchableOpacity onPress={() => handleLogOutPress()}>
                                <AntDesignIcon name="logout" color={'red'} size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>

                )}
            </PageContainer>
        </>
    );
}

const styles = StyleSheet.create({
    signInContainer: {
        height: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signInButtonContainer: {
        borderRadius: 64,
        borderColor: '#fff',
        borderWidth: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    signInText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
        marginLeft: 32
    },
    wrapperStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '80%'
    },
    logo: {
        color: 'white',
        textAlign: 'center',
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 64
    },
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
    },
    calenderFlatListContainer: {
        flexGrow: 0
    },
    logOutContainer: {
        marginTop: 24,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default HomeScreen;
