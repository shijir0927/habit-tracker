
import React, { Children } from 'react';
import type { PropsWithChildren } from 'react';
import {
    StyleSheet,
    Pressable,
    Text,
    TouchableOpacity
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'

const PRIMARY_COLOR = '#8B5CF6';

type NewButtonProps = PropsWithChildren<{
    handlePress(): void;
}>;

function NewButton({ handlePress }: NewButtonProps): JSX.Element {
    return (
        <TouchableOpacity style={styles.newButton} onPress={handlePress}>
            <AntDesignIcon name="plus" color={PRIMARY_COLOR} size={20} />
            <Text style={styles.textStyle}>New</Text>
        </TouchableOpacity>);
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#fff',
        marginLeft: 16
    },
    newButton: {
        borderColor: PRIMARY_COLOR,
        borderWidth: 2,
        borderRadius: 8,
        paddingTop: 12,
        paddingBottom: 12,
        paddingRight: 16,
        paddingLeft: 16,
        display: 'flex',
        flexDirection: 'row'
    },
});

export default NewButton;
