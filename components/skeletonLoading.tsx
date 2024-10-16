
import React from 'react';
import type { PropsWithChildren } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import COLOR_MAP from '../constants/color_map';
import SkeletonLoadingComponent from 'react-native-skeleton-loading/index'

type NewButtonProps = PropsWithChildren<{
    handlePress(): void;
}>;

function SkeletonLoading(): JSX.Element {
    return (
        <SkeletonLoadingComponent background={"#adadad"} highlight={"#ffffff"}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: 100, height: 100, backgroundColor: "#adadad", borderRadius: 10 }} />

                <View style={{ flex: 1, marginLeft: 10 }}>
                    <View style={{ backgroundColor: "#adadad", width: "50%", height: 10, marginBottom: 3, borderRadius: 5 }} />
                    <View style={{ backgroundColor: "#adadad", width: '20%', height: 8, borderRadius: 5 }} />
                    <View style={{ backgroundColor: "#adadad", width: '15%', height: 8, borderRadius: 5, marginTop: 3 }} />
                </View>
            </View>
        </SkeletonLoadingComponent>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#fff'
    }
});

export default SkeletonLoading;
