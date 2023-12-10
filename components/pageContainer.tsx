import React, { Children } from 'react';
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';

function PageContainer({ children }: any): JSX.Element {
    return (
        <View style={styles.pageContainer}>
            {children}
        </View>
    );
}
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    pageContainer: {
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 32,
        height: windowHeight,
        backgroundColor: 'black'
    },
    textStyle: {
        color: '#fff'
    }
});

export default PageContainer;
