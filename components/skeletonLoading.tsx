
import React from 'react';
import type { PropsWithChildren } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import COLOR_MAP from '../constants/color_map';
import SkeletonLoadingComponent from 'react-native-skeleton-loading'

type NewButtonProps = PropsWithChildren<{
    handlePress(): void;
}>;

function SkeletonLoading(): JSX.Element {
    return (
        <SkeletonLoadingComponent background={COLOR_MAP["0"]} highlight={"#A1A1AA"}>
            <View style={{ width: "100%", height: 200, backgroundColor: COLOR_MAP["0"], borderRadius: 10 }}>
            </View>
        </SkeletonLoadingComponent >
    );
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#fff'
    }
});

export default SkeletonLoading;
