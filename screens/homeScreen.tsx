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
                        <Text style={styles.textStyle}>
                            HABIT TRACKER
                        </Text>
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
        color: '#fff'
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
    }
});

export default HomeScreen;
