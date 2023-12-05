import React, { Children } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import calendar from 'calendar-js';
import { Tile, NewButton, PageContainer } from '../components'

function HomeScreen({ navigation }): JSX.Element {
    const backgroundStyle = {
        backgroundColor: '#000',
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
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
                        </View>

                        <NewButton handlePress={() => navigation.navigate('Habits')} />
                    </View>

                    <View style={styles.calendarContainer}>

                        {[...Array(calendar().of(2023, 10).days)].map((nil, index) => {
                            let day = index + 1
                            return (
                                <>
                                    <Text style={styles.textStyle}>{day}</Text>
                                    <Tile color={'#A78BFA'} handlePress={() => navigation.navigate('Day', {
                                        year: 2023,
                                        month: 11,
                                        day: day
                                    })} />
                                </>
                            );
                        })}
                    </View>
                </PageContainer>
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#fff',
        fontFamily: 'Inter-Medium',
        fontSize: 20
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
        justifyContent: 'space-between'
    },
    calendarContainer: {
        display: 'flex',
        flexDirection: 'row',
        rowGap: 3,
        justifyContent: 'space-between',
        marginTop: 24,
        flexWrap: 'wrap'
    },
    calendarColumnContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    headerTiles: {
        display: 'flex',
        flexDirection: 'row',
        gap: 2
    }
});

export default HomeScreen;
