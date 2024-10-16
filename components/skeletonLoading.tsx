
import React from 'react';
import type { PropsWithChildren } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import COLOR_MAP from '../constants/color_map';

type NewButtonProps = PropsWithChildren<{
    handlePress(): void;
}>;

function SkeletonLoading(): JSX.Element {
    return (
        <View><Text style={styles.textStyle}>Loading....</Text></View>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#fff'
    }
});

export default SkeletonLoading;
