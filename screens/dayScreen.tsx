import React, { Children } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Tile, NewButton, PageContainer } from '../components'

function DayScreen({ route, navigation }): JSX.Element {
    const { year, month, day } = route.params;
    const backgroundStyle = {
        backgroundColor: '#000',
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                <PageContainer>
                    <View>
                        <Text style={styles.textStyle}>{year} | {month} | {day}</Text>
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
});

export default DayScreen;
