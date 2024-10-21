
import React, { Children } from 'react';
import type { PropsWithChildren } from 'react';
import {
    StyleSheet,
    Pressable,
    Text,
    TouchableOpacity
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import COLOR_MAP from '../constants/color_map';

type NewButtonProps = PropsWithChildren<{
    handlePress(): void;
}>;

function NewButton({ handlePress }: NewButtonProps): JSX.Element {
    return (
        <TouchableOpacity style={styles.newButton} onPress={handlePress}>
            <AntDesignIcon name="plus" color={COLOR_MAP["60"]} size={20} />
        </TouchableOpacity>);
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#fff',
        marginLeft: 12,
        fontFamily: 'Manrope-Medium'
    },
    newButton: {
        borderColor: COLOR_MAP["60"],
        borderWidth: 2,
        borderRadius: 8,
        paddingTop: 12,
        paddingBottom: 12,
        paddingRight: 12,
        paddingLeft: 12,
        display: 'flex',
        flexDirection: 'row'
    },
});

export default NewButton;
