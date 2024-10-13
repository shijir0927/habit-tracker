
import React, { Children } from 'react';
import type { PropsWithChildren } from 'react';
import {
    StyleSheet,
    Pressable,
    View,
    Text
} from 'react-native';

type TabBarProps = PropsWithChildren<{
    state: string;
    description: string;
}>;

function TabBar({ state, description }: TabBarProps): JSX.Element {
    return (
        <View>
            <Text>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tile: {
        borderRadius: 4,
        marginBottom: 8,
        marginRight: 8
    }
});

export default TabBar;
